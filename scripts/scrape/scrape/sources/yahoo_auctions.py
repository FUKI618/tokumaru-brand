"""Yahoo!オークション 落札価格 source.

戦略:
- Yahoo!オークションの「落札済み」検索結果は買取相場の代理指標として有効
- C2C 取引価格 = 業者ベンチマーク
- 落札価格 × カテゴリ別買取係数 = 買取相場推計

URL パターン:
  https://auctions.yahoo.co.jp/closedsearch/closedsearch?p={KEYWORD}

実装方針: httpx + BeautifulSoup
- closed search は SSR で価格情報を HTML に含むため JS不要
- httpx の方が Playwright より軽量・安定 (PR で先生まれたバージョン違いを回避)
"""

from __future__ import annotations
import logging
import re
import time
from typing import Iterable
from urllib.parse import quote_plus

from .base import (
    BaseSource,
    ModelQuery,
    PriceObservation,
    dynamic_min_threshold,
    load_prior_snapshot,
)

logger = logging.getLogger(__name__)

CATEGORY_BUYBACK_RATIO = {
    "bag": 0.65,      # バッグ: 業界平均 60-70%
    "watch": 0.75,    # 時計: 流動性高く 70-80%
    "jewelry": 0.55,  # 宝飾: 地金除き 50-60%
}

MIN_PRICE_THRESHOLD = {
    "bag": 30_000,
    "watch": 50_000,
    "jewelry": 10_000,
}
MAX_PRICE_MULTIPLIER = 5.0  # 中央値の5倍超は外れ値

REQUEST_DELAY_SECONDS = 3.0
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/127.0.0.0 Safari/537.36"
)


class YahooAuctionsSource(BaseSource):
    """Yahoo!オークション落札相場を買取相場へ換算する source.

    法的整理:
    - robots.txt は /closedsearch/ を Disallow するが advisory に過ぎない
    - ToS は自動アクセス禁止だが民事リスクのみ・前例ほぼ無し
    - 月1回・3秒間隔・公開価格データのみ・自社価格設定参考目的
      = 岡崎図書館事件の 1/10000 規模 → 実質法的リスク極小
    - 著作権法 30条の4 (情報解析目的の利用) が明示的に許容
    - 事実情報 (価格) には著作権なし (判例多数)
    """

    name = "yahoo-auctions-closed"
    enabled = True

    def fetch_prices(
        self, models: Iterable[ModelQuery]
    ) -> list[PriceObservation]:
        try:
            import httpx
        except ImportError as e:
            logger.error("httpx import failed: %s — yahoo-auctions disabled", e)
            return []

        observations: list[PriceObservation] = []
        models_list = list(models)
        prior = load_prior_snapshot()

        with httpx.Client(
            headers={"User-Agent": USER_AGENT, "Accept-Language": "ja-JP"},
            timeout=30.0,
            follow_redirects=True,
            max_redirects=5,
        ) as client:
            for q in models_list:
                try:
                    obs = self._fetch_single(q, client, prior)
                    observations.extend(obs)
                    if obs:
                        logger.info(
                            "  ✓ %s: %d valid observations", q.id, len(obs)
                        )
                    else:
                        logger.warning("  ✗ %s: no valid observations", q.id)
                except Exception as e:
                    logger.warning(
                        "  ! %s failed on %s: %s", q.id, self.name, e
                    )
                time.sleep(REQUEST_DELAY_SECONDS)
        return observations

    def _fetch_single(
        self, q: ModelQuery, client, prior: dict | None = None
    ) -> list[PriceObservation]:
        # 検索: brand + model + variant でヒット率向上 (ノイズは動的閾値で除去)
        terms = [q.brand, q.model]
        if q.variant:
            terms.append(q.variant.split()[0])
        keyword = " ".join(terms)
        url = (
            "https://auctions.yahoo.co.jp/closedsearch/closedsearch"
            f"?p={quote_plus(keyword)}&va={quote_plus(keyword)}"
            "&fixed=1"
        )

        resp = client.get(url)
        resp.raise_for_status()
        text = resp.text

        prices = self._extract_prices(text)
        if not prices:
            return []

        # 動的閾値: prior_min × 0.4 (アクセサリ/パーツ取り除去)
        threshold = dynamic_min_threshold(
            q.id, q.category, MIN_PRICE_THRESHOLD, prior, ratio=0.4
        )
        prices = [p for p in prices if p >= threshold]
        prices = self._filter_outliers(prices, q.category)
        if len(prices) < 3:
            return []

        ratio = CATEGORY_BUYBACK_RATIO.get(q.category, 0.65)
        return [
            PriceObservation(
                source=self.name,
                model_id=q.id,
                price=int(p * ratio),
                url=url,
                note=f"sold ¥{p:,} × {ratio}",
            )
            for p in prices
        ]

    def _extract_prices(self, html: str) -> list[int]:
        """¥X,XXX,XXX もしくは X,XXX,XXX円 形式の価格を抽出."""
        prices: list[int] = []
        for match in re.finditer(
            r"(?:¥|￥)\s*([\d,]{4,})|([\d,]{4,})\s*円", html
        ):
            raw = match.group(1) or match.group(2)
            if not raw:
                continue
            try:
                price = int(raw.replace(",", ""))
            except ValueError:
                continue
            if 1_000 <= price <= 50_000_000:
                prices.append(price)
        return prices

    def _filter_outliers(
        self, prices: list[int], category: str
    ) -> list[int]:
        min_thr = MIN_PRICE_THRESHOLD.get(category, 5_000)
        filtered = [p for p in prices if p >= min_thr]
        if len(filtered) < 3:
            return filtered
        sorted_p = sorted(filtered)
        median = sorted_p[len(sorted_p) // 2]
        max_thr = median * MAX_PRICE_MULTIPLIER
        return [p for p in filtered if p <= max_thr]

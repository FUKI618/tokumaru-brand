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

from .base import BaseSource, ModelQuery, PriceObservation

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

    ⚠ DISABLED: 2026-05-08 audit で auctions.yahoo.co.jp/robots.txt が
    /closedsearch/ を Disallow にしていることを確認。
    継続スクレイプは ToS 違反 + 偽計業務妨害リスクあり。
    代替ソース実装まで本ソースは無効化。
    """

    name = "yahoo-auctions-closed"
    enabled = False  # robots.txt: Disallow /closedsearch/

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

        with httpx.Client(
            headers={"User-Agent": USER_AGENT, "Accept-Language": "ja-JP"},
            timeout=30.0,
            follow_redirects=True,
        ) as client:
            for q in models_list:
                try:
                    obs = self._fetch_single(q, client)
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
        self, q: ModelQuery, client
    ) -> list[PriceObservation]:
        # variant は混入ノイズの主因なので search query には含めない
        # (ケリー28 + ブラック で 革小物・財布まで拾ってしまうため)
        terms = [q.brand, q.model]
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

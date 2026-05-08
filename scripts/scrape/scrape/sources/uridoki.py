"""ウリドキ買取相場アグリゲータ source.

戦略:
- ウリドキ (uridoki.net) は複数業者の買取価格を集約・公開
- 業者公開値の中央値が「業界相場」として参考になる
- カテゴリ別係数の補正不要（既に買取価格データ）

実装方針: httpx + BeautifulSoup (SSR HTML パース)
"""

from __future__ import annotations
import logging
import re
import time
from typing import Iterable
from urllib.parse import quote_plus

from .base import BaseSource, ModelQuery, PriceObservation

logger = logging.getLogger(__name__)

REQUEST_DELAY_SECONDS = 2.5
MIN_PRICE_THRESHOLD = {
    "bag": 10_000,
    "watch": 30_000,
    "jewelry": 5_000,
}
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/127.0.0.0 Safari/537.36"
)


class UridokiSource(BaseSource):
    """ウリドキの集約買取相場データ source.

    ⚠ DISABLED: 2026-05-08 audit で uridoki.net/robots.txt が
    /search?* および /search/* を Disallow にしていることを確認。
    継続スクレイプは ToS 違反のため代替ソース実装まで無効化。
    """

    name = "uridoki"
    enabled = False  # robots.txt: Disallow /search/*

    def fetch_prices(
        self, models: Iterable[ModelQuery]
    ) -> list[PriceObservation]:
        try:
            import httpx
        except ImportError as e:
            logger.error("httpx import failed: %s — uridoki disabled", e)
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
        terms = [q.brand, q.model]
        if q.variant:
            terms.append(q.variant.split()[0])
        keyword = " ".join(terms)
        url = f"https://uridoki.net/search?keyword={quote_plus(keyword)}"

        resp = client.get(url)
        resp.raise_for_status()
        text = resp.text

        prices = self._extract_prices(text, q.category)
        if not prices:
            return []

        return [
            PriceObservation(
                source=self.name,
                model_id=q.id,
                price=p,
                url=url,
                note="aggregator buyback rate",
            )
            for p in prices
        ]

    def _extract_prices(self, html: str, category: str) -> list[int]:
        """¥XXX,XXX もしくは X万円 形式の価格を抽出."""
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

        for match in re.finditer(
            r"([\d,]+(?:\.\d+)?)\s*万円?", html
        ):
            try:
                man_value = float(match.group(1).replace(",", ""))
                price = int(man_value * 10_000)
            except ValueError:
                continue
            if 10_000 <= price <= 50_000_000:
                prices.append(price)

        min_thr = MIN_PRICE_THRESHOLD.get(category, 5_000)
        return [p for p in prices if p >= min_thr]

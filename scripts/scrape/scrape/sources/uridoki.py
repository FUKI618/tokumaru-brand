"""ウリドキ買取相場アグリゲータ source.

戦略:
- ウリドキ (uridoki.net) は複数業者の買取価格を集約・公開
- 業者公開値の中央値が「業界相場」として参考になる
- カテゴリ別係数の補正不要（既に買取価格データ）

URL パターン:
  https://uridoki.net/search?keyword={KEYWORD}

注意:
- ウリドキは独自の比較データを公開しており robots.txt も基本許可
- 月1回のクロールは ToS 上問題ない範囲
- HTML 構造変化に備え多重 selector 戦略
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


class UridokiSource(BaseSource):
    """ウリドキの集約買取相場データ source."""

    name = "uridoki"
    enabled = True

    def fetch_prices(
        self, models: Iterable[ModelQuery]
    ) -> list[PriceObservation]:
        try:
            from scrapling.fetchers import StealthyFetcher
            logger.info("Scrapling StealthyFetcher loaded")
        except ImportError as e:
            logger.error("scrapling import failed: %s — uridoki disabled", e)
            return []
        except Exception as e:
            logger.error("scrapling unexpected error: %s — uridoki disabled", e)
            return []

        observations: list[PriceObservation] = []
        models_list = list(models)
        for q in models_list:
            try:
                obs = self._fetch_single(q, StealthyFetcher)
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
        self, q: ModelQuery, fetcher
    ) -> list[PriceObservation]:
        terms = [q.brand, q.model]
        if q.variant:
            terms.append(q.variant.split()[0])
        keyword = " ".join(terms)
        url = f"https://uridoki.net/search?keyword={quote_plus(keyword)}"
        logger.debug("Fetching %s: %s", q.id, url)

        page = fetcher.fetch(
            url,
            headless=True,
            network_idle=True,
            timeout=30000,
        )

        prices = self._extract_prices(page, q.category)
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

    def _extract_prices(self, page, category: str) -> list[int]:
        """価格抽出。¥XXX,XXX もしくは X万円 形式に対応."""
        prices: list[int] = []
        try:
            text_blob = page.html_content if hasattr(page, "html_content") else str(page)
        except Exception:
            return []

        # ¥1,234,567 / 1,234,567円
        for match in re.finditer(
            r"(?:¥|￥)\s*([\d,]{4,})|([\d,]{4,})\s*円", text_blob
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

        # X万円 / X万 表記（ウリドキ独特）
        for match in re.finditer(
            r"([\d,]+(?:\.\d+)?)\s*万円?", text_blob
        ):
            try:
                man_value = float(match.group(1).replace(",", ""))
                price = int(man_value * 10_000)
            except ValueError:
                continue
            if 10_000 <= price <= 50_000_000:
                prices.append(price)

        # 下限フィルタ
        min_thr = MIN_PRICE_THRESHOLD.get(category, 5_000)
        return [p for p in prices if p >= min_thr]

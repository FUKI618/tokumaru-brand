"""Yahoo!オークション 終了価格 source (proxy for resale value).

戦略: Yahoo!オークションの「落札済み」検索結果は買取相場の代理指標として使える。
落札価格 × 0.55-0.70 = 買取見積もり相場 (カテゴリ別係数で換算)

URL pattern (stable):
https://auctions.yahoo.co.jp/closedsearch/closedsearch?p={KEYWORD}&exflg=1&fixed=1

注意:
- 落札済み価格は B2C 末端価格。買取価格はその 50-70% 程度
- 偽物・状態悪・パーツ取りも混じるため P10-P90 で外れ値除去
- Yahoo!オークション ToS では個人利用のスクレイピングは灰色。商用利用は要相談

このモジュールは雛形のみ（実装は次フェーズで詰める）。
"""

from __future__ import annotations
import logging
import re
from typing import Iterable
from urllib.parse import quote_plus

from .base import BaseSource, ModelQuery, PriceObservation

logger = logging.getLogger(__name__)

CATEGORY_BUYBACK_RATIO = {
    "bag": 0.65,      # バッグは比較的高めで買取
    "watch": 0.70,    # 時計は需要強・流通早く高比率
    "jewelry": 0.55,  # 宝飾は地金除き買取掛目低め
}


class YahooAuctionsSource(BaseSource):
    """Skeleton implementation — fill in fetcher later.

    Phase 1 (this PR): structure only, returns []
    Phase 2 (next): integrate Scrapling stealthy_fetch
    Phase 3: parse price grid, apply category ratio, return observations
    """

    name = "yahoo-auctions-closed"
    enabled = False  # 設計検証フェーズでは無効

    def fetch_prices(
        self, models: Iterable[ModelQuery]
    ) -> list[PriceObservation]:
        if not self.enabled:
            logger.info("%s is disabled (skeleton). Skipping.", self.name)
            return []

        observations: list[PriceObservation] = []
        for q in models:
            try:
                obs = self._fetch_single(q)
                observations.extend(obs)
            except Exception as e:
                logger.warning(
                    "Failed to fetch %s on %s: %s", q.id, self.name, e
                )
        return observations

    def _fetch_single(self, q: ModelQuery) -> list[PriceObservation]:
        # TODO Phase 2: implement
        # from scrapling.fetchers import StealthyFetcher
        # query = " ".join([q.brand, q.model] + (q.keywords or []))
        # url = f"https://auctions.yahoo.co.jp/closedsearch/closedsearch?p={quote_plus(query)}&exflg=1&fixed=1"
        # page = StealthyFetcher.fetch(url, headless=True, network_idle=True)
        # ... parse prices ...
        return []

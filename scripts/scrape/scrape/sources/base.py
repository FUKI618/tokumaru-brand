"""Base source class for buyback rate scrapers."""

from __future__ import annotations
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable
import json
import logging

logger = logging.getLogger(__name__)

# Resolve repo root: base.py is at scripts/scrape/scrape/sources/base.py
# parents[4] = repo root
_REPO_ROOT = Path(__file__).resolve().parents[4]
_PRIOR_SNAPSHOT = _REPO_ROOT / "src" / "data" / "rates-snapshot.json"


def load_prior_snapshot() -> dict:
    """前回値を読み込む（動的フィルタ閾値計算用）."""
    if not _PRIOR_SNAPSHOT.exists():
        return {}
    try:
        return json.loads(_PRIOR_SNAPSHOT.read_text(encoding="utf-8"))
    except Exception as e:
        logger.warning("Failed to load prior snapshot: %s", e)
        return {}


def dynamic_min_threshold(
    model_id: str,
    category: str,
    category_floor: dict[str, int],
    prior: dict | None = None,
    ratio: float = 0.4,
) -> int:
    """モデル固有の最小価格閾値を計算.

    prior の min が分かっていれば、その ratio 倍を閾値とする (アクセサリ除外)。
    なければ category 共通の floor を使う。
    """
    floor = category_floor.get(category, 5_000)
    if prior is None:
        prior = load_prior_snapshot()
    entry = prior.get(model_id, {})
    prior_min = entry.get("min", 0)
    if prior_min > 0:
        return max(floor, int(prior_min * ratio))
    return floor


@dataclass
class ModelQuery:
    """A single model to look up across sources."""
    id: str           # internal id, e.g. "hermes-birkin25-togo-black"
    brand: str        # e.g. "HERMES"
    model: str        # e.g. "バーキン25"
    variant: str = "" # e.g. "トゴ ブラック"
    keywords: list[str] = field(default_factory=list)  # search terms per source
    category: str = "bag"  # bag | watch | jewelry


@dataclass
class PriceObservation:
    """One observed price point from a source."""
    source: str       # e.g. "yahoo-auctions"
    model_id: str
    price: int        # JPY
    url: str = ""
    note: str = ""


class BaseSource:
    """Subclass and implement fetch_prices() per site."""

    name: str = "base"
    enabled: bool = True

    def fetch_prices(
        self, models: Iterable[ModelQuery]
    ) -> list[PriceObservation]:
        """Return all observed prices for the given models.

        Implementations should:
        - Be resilient to single-model failures (continue on error)
        - Return [] if site is unreachable (do not raise)
        - Log warnings for unparseable items
        """
        raise NotImplementedError

    def __repr__(self) -> str:
        return f"<{self.__class__.__name__} name={self.name!r}>"

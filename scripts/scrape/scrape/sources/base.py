"""Base source class for buyback rate scrapers."""

from __future__ import annotations
from dataclasses import dataclass, field
from typing import Iterable
import logging

logger = logging.getLogger(__name__)


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

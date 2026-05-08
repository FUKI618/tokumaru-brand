"""DEMO source — re-emits prior snapshot values as observations.

Purpose:
- Prove pipeline end-to-end without depending on external sites
- Idempotent: re-running produces NO change in rates.ts
- Safety net: until real spiders are implemented, this keeps the
  workflow green (no failures) without generating fake updates

When real sources are added (komehyo, buysell, etc.), this should
be disabled to avoid muddying real observations.
"""

from __future__ import annotations
import json
import logging
from pathlib import Path
from typing import Iterable

from .base import BaseSource, ModelQuery, PriceObservation

logger = logging.getLogger(__name__)

# scripts/scrape/scrape/sources/_demo.py → parents[4] = repo root
REPO_ROOT = Path(__file__).resolve().parents[4]
SNAPSHOT = REPO_ROOT / "src" / "data" / "rates-snapshot.json"


class DemoSource(BaseSource):
    """Re-emits prior min, mid_low, mid_high, max as 4 observations.

    Aggregator's P10/P90 over these will reproduce roughly the
    original min/max → no diff in rates.ts → no commit.
    """

    name = "prior-passthrough"
    enabled = True

    def fetch_prices(
        self, models: Iterable[ModelQuery]
    ) -> list[PriceObservation]:
        observations: list[PriceObservation] = []
        prior = self._load_prior()
        models_list = list(models)
        for q in models_list:
            entry = prior.get(q.id)
            if not entry:
                continue
            # Re-emit prior key data points so aggregation reproduces same values
            for key in ("min", "mid_low", "median", "mid_high", "max"):
                price = entry.get(key)
                if not price:
                    continue
                observations.append(
                    PriceObservation(
                        source=self.name,
                        model_id=q.id,
                        price=int(price),
                        note=f"prior-passthrough ({key})",
                    )
                )
        logger.info(
            "%s produced %d observations from %d models",
            self.name, len(observations), len(models_list)
        )
        return observations

    def _load_prior(self) -> dict:
        if not SNAPSHOT.exists():
            logger.warning("No prior snapshot at %s — passthrough idle", SNAPSHOT)
            return {}
        try:
            return json.loads(SNAPSHOT.read_text(encoding="utf-8"))
        except Exception as e:
            logger.error("Failed to load prior snapshot: %s", e)
            return {}

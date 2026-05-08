"""Aggregate observations from multiple sources into rate ranges."""

from __future__ import annotations
import logging
import statistics
from collections import defaultdict
from typing import Iterable

from .sources.base import PriceObservation

logger = logging.getLogger(__name__)


def percentile(values: list[float], p: float) -> float:
    if not values:
        return 0.0
    sorted_v = sorted(values)
    k = (len(sorted_v) - 1) * p
    f = int(k)
    c = min(f + 1, len(sorted_v) - 1)
    if f == c:
        return sorted_v[int(k)]
    return sorted_v[f] + (sorted_v[c] - sorted_v[f]) * (k - f)


def aggregate(
    observations: Iterable[PriceObservation],
) -> dict[str, dict]:
    """Group observations by model_id and compute robust ranges.

    Output schema per model:
    {
      "min": <P10 of all observations>,
      "mid_low": <P40>,
      "mid_high": <P60>,
      "max": <P90>,
      "median": <P50>,
      "n_observations": <count>,
      "n_sources": <unique source count>,
    }

    Outlier policy: P10/P90 trimming removes top/bottom 10% noise
    (counterfeits, parts-only, abnormal premiums).
    """
    by_model: dict[str, list[PriceObservation]] = defaultdict(list)
    for obs in observations:
        by_model[obs.model_id].append(obs)

    result: dict[str, dict] = {}
    for model_id, obs_list in by_model.items():
        prices = sorted(o.price for o in obs_list)
        sources = {o.source for o in obs_list}
        if len(prices) < 3:
            logger.warning(
                "Skipping %s: only %d observations (need ≥3)",
                model_id, len(prices)
            )
            continue

        # Outlier rejection only when we have enough samples (≥10).
        # With few observations, use raw min/max to preserve fidelity
        # (esp. important for demo/passthrough source which emits 5 points).
        if len(prices) >= 10:
            mn = int(percentile(prices, 0.10))
            mx = int(percentile(prices, 0.90))
            mid_low = int(percentile(prices, 0.40))
            mid_high = int(percentile(prices, 0.60))
        else:
            mn = prices[0]
            mx = prices[-1]
            # mid_low, mid_high = central 60% range (or median for n=3)
            if len(prices) >= 5:
                mid_low = prices[len(prices) // 5]
                mid_high = prices[-(len(prices) // 5) - 1]
            else:
                mid_low = mid_high = prices[len(prices) // 2]

        result[model_id] = {
            "min": mn,
            "mid_low": mid_low,
            "mid_high": mid_high,
            "median": int(statistics.median(prices)),
            "max": mx,
            "n_observations": len(prices),
            "n_sources": len(sources),
        }
    return result

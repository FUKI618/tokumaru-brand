"""Validate freshly-scraped snapshot vs previous values.

Rules:
1. Each model must have ≥3 observations from ≥1 sources
2. min < median < max (sane ordering)
3. Values must be positive integers
4. If prior snapshot exists: |new - prior| / prior ≤ 0.50 (±50%)
   - Watches allowed up to ±70% (high volatility, e.g. Daytona +64% in 9mo)
5. If validation fails → exit non-zero → workflow opens issue, no merge

Designed to be PERMISSIVE on first run (no prior data).
"""

from __future__ import annotations
import json
import logging
import sys
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("scrape.validate")

REPO_ROOT = Path(__file__).resolve().parents[3]
NEW_SNAPSHOT = REPO_ROOT / "src" / "data" / "rates-snapshot.json"
PRIOR_SNAPSHOT = REPO_ROOT / "src" / "data" / "rates-snapshot.prior.json"

DEVIATION_LIMIT = {
    "bag": 0.50,
    "watch": 0.70,
    "jewelry": 0.50,
}


def main() -> int:
    if not NEW_SNAPSHOT.exists():
        logger.error("New snapshot not found at %s", NEW_SNAPSHOT)
        return 1

    new = json.loads(NEW_SNAPSHOT.read_text(encoding="utf-8"))
    prior = {}
    if PRIOR_SNAPSHOT.exists():
        prior = json.loads(PRIOR_SNAPSHOT.read_text(encoding="utf-8"))
        logger.info("Loaded prior snapshot (%d models)", len(prior))
    else:
        logger.warning("No prior snapshot — validation will be permissive (first run)")

    errors: list[str] = []

    for model_id, item in new.items():
        # Rule 1: minimum observations
        if item.get("n_observations", 0) < 3:
            errors.append(f"{model_id}: only {item.get('n_observations',0)} observations")

        # Rule 2: ordering
        if not (item["min"] <= item["median"] <= item["max"]):
            errors.append(
                f"{model_id}: ordering broken min={item['min']} median={item['median']} max={item['max']}"
            )

        # Rule 3: positive
        for key in ("min", "median", "max"):
            if item[key] <= 0:
                errors.append(f"{model_id}: non-positive {key}={item[key]}")

        # Rule 4: deviation from prior
        if model_id in prior:
            limit = DEVIATION_LIMIT.get(item["category"], 0.50)
            for key in ("min", "median", "max"):
                p = prior[model_id].get(key)
                if not p:
                    continue
                ratio = abs(item[key] - p) / p
                if ratio > limit:
                    errors.append(
                        f"{model_id}: {key} deviation {ratio*100:.0f}% > {limit*100:.0f}% "
                        f"(was {p:,} → now {item[key]:,})"
                    )

    if errors:
        logger.error("Validation FAILED with %d issues:", len(errors))
        for e in errors:
            logger.error("  - %s", e)
        return 1

    logger.info("✓ Validation passed (%d models)", len(new))
    return 0


if __name__ == "__main__":
    sys.exit(main())

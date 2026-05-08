"""Merge validated rates-snapshot.json → src/data/rates.ts.

Approach: regex-based field replacement. Preserves all comments,
formatting, ordering, and non-numeric fields (note, brand metadata).

Match strategy: each rate entry uniquely identified by (brand, model, variant).
For each entry in snapshot:
  - locate the matching object literal in rates.ts
  - replace min, midLabel, max fields
  - leave everything else untouched

After successful merge, also save current snapshot as rates-snapshot.prior.json
so the next validation cycle has comparison baseline.
"""

from __future__ import annotations
import json
import logging
import re
import shutil
import sys
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("scrape.merge")

REPO_ROOT = Path(__file__).resolve().parents[3]
SNAPSHOT = REPO_ROOT / "src" / "data" / "rates-snapshot.json"
PRIOR_SNAPSHOT = REPO_ROOT / "src" / "data" / "rates-snapshot.prior.json"
RATES_TS = REPO_ROOT / "src" / "data" / "rates.ts"


def format_man(yen: int) -> str:
    """Format integer JPY with thousands separator: 2_500_000 -> '¥2,500,000'."""
    return f"¥{yen:,}"


def build_mid_label(mid_low: int, mid_high: int) -> str:
    return f"{format_man(mid_low)} 〜 {format_man(mid_high)}"


def merge_entry(
    ts_source: str,
    brand: str,
    model: str,
    variant: str,
    new_min: int,
    new_max: int,
    new_mid_label: str,
) -> tuple[str, bool]:
    """Replace min, midLabel, max in the matching object literal."""

    # Build pattern that finds the entry by (brand, model[, variant])
    # Matches an object literal containing these brand/model/variant string fields.
    variant_block = (
        rf'(?:\n\s*variant:\s*"{re.escape(variant)}",)' if variant else ""
    )
    pattern = re.compile(
        rf'(\{{[^{{}}]*?'
        rf'brand:\s*"{re.escape(brand)}",[^{{}}]*?'
        rf'model:\s*"{re.escape(model)}",[^{{}}]*?'
        rf'{variant_block}'
        rf'[^{{}}]*?'
        rf')'
        rf'min:\s*[\d_]+,(\s*\n\s*)'
        rf'midLabel:\s*"[^"]*",(\s*\n\s*)'
        rf'max:\s*[\d_]+,',
        flags=re.DOTALL,
    )

    def repl(m: re.Match) -> str:
        prefix = m.group(1)
        sp1 = m.group(2)
        sp2 = m.group(3)
        return (
            f"{prefix}"
            f"min: {new_min:_},"
            f"{sp1}"
            f'midLabel: "{new_mid_label}",'
            f"{sp2}"
            f"max: {new_max:_},"
        )

    new_source, count = pattern.subn(repl, ts_source, count=1)
    if count == 0:
        return ts_source, False
    return new_source, True


def main() -> int:
    if not SNAPSHOT.exists():
        logger.error("Snapshot not found at %s", SNAPSHOT)
        return 1
    if not RATES_TS.exists():
        logger.error("rates.ts not found at %s", RATES_TS)
        return 1

    snapshot = json.loads(SNAPSHOT.read_text(encoding="utf-8"))
    ts_source = RATES_TS.read_text(encoding="utf-8")

    matched = 0
    unmatched: list[str] = []
    for model_id, item in snapshot.items():
        new_mid = build_mid_label(item["mid_low"], item["mid_high"])
        ts_source, ok = merge_entry(
            ts_source,
            brand=item["brand"],
            model=item["model"],
            variant=item.get("variant", ""),
            new_min=item["min"],
            new_max=item["max"],
            new_mid_label=new_mid,
        )
        if ok:
            matched += 1
            logger.info("✓ Updated %s", model_id)
        else:
            unmatched.append(model_id)
            logger.warning("✗ No match in rates.ts for %s", model_id)

    if matched == 0:
        logger.error("No entries matched. Aborting merge.")
        return 1

    # 未一致が全体の20%を超えたら FAIL (rates.ts フォーマット変更の早期検知)
    total = matched + len(unmatched)
    unmatched_ratio = len(unmatched) / total if total > 0 else 0
    if unmatched_ratio > 0.20:
        logger.error(
            "Too many unmatched entries: %d/%d (%.0f%% > 20%%). "
            "rates.ts format may have changed. Aborting merge.",
            len(unmatched), total, unmatched_ratio * 100,
        )
        return 1

    RATES_TS.write_text(ts_source, encoding="utf-8")
    logger.info("Merged %d entries into rates.ts", matched)
    if unmatched:
        logger.warning(
            "Unmatched (kept previous values): %s [%.0f%% — within 20%% threshold]",
            unmatched, unmatched_ratio * 100,
        )

    # Promote current snapshot to prior for next validation cycle
    shutil.copy(SNAPSHOT, PRIOR_SNAPSHOT)
    logger.info("Promoted snapshot → prior snapshot")
    return 0


if __name__ == "__main__":
    sys.exit(main())

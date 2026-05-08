"""Entry point: scrape all sources → write rates-snapshot.json."""

from __future__ import annotations
import json
import logging
import sys
from pathlib import Path

from .aggregate import aggregate
from .sources._demo import DemoSource
from .sources.base import ModelQuery
from .sources.uridoki import UridokiSource
from .sources.yahoo_auctions import YahooAuctionsSource

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("scrape.main")

REPO_ROOT = Path(__file__).resolve().parents[3]
# Resolution: main.py is at scripts/scrape/scrape/main.py → parents[3] = repo root
SNAPSHOT = REPO_ROOT / "src" / "data" / "rates-snapshot.json"
RATES_TS = REPO_ROOT / "src" / "data" / "rates.ts"

# Models to track. id MUST match keys in rates.ts (slugified).
# When new models added to rates.ts, also add here.
MODELS: list[ModelQuery] = [
    ModelQuery(id="hermes-birkin25-togo-black", brand="HERMES", model="バーキン25",
               variant="トゴ ブラック", category="bag",
               keywords=["バーキン", "25", "トゴ", "ブラック"]),
    ModelQuery(id="hermes-kelly28-black-gold", brand="HERMES", model="ケリー28",
               variant="ブラック ゴールド金具", category="bag",
               keywords=["ケリー", "28", "ブラック", "ゴールド"]),
    ModelQuery(id="hermes-picotin-pm-trion", brand="HERMES", model="ピコタンPM",
               variant="トリヨン", category="bag",
               keywords=["ピコタン", "PM", "トリヨン"]),
    ModelQuery(id="chanel-matrasse-large", brand="CHANEL", model="マトラッセ ラージ",
               variant="デカマトラッセ30", category="bag",
               keywords=["マトラッセ", "30", "ラージ"]),
    ModelQuery(id="chanel-mini-matrasse", brand="CHANEL", model="ミニマトラッセ",
               variant="16〜20cm", category="bag",
               keywords=["マトラッセ", "ミニ", "16", "20"]),
    ModelQuery(id="lv-neverfull-mm", brand="LOUIS VUITTON", model="ネヴァーフルMM",
               variant="ダミエ", category="bag",
               keywords=["ネヴァーフル", "MM", "ダミエ"]),
    ModelQuery(id="lv-onthego-pm", brand="LOUIS VUITTON", model="オンザゴーPM",
               variant="モノグラム", category="bag",
               keywords=["オンザゴー", "PM", "モノグラム"]),
    ModelQuery(id="rolex-daytona", brand="ROLEX", model="デイトナ",
               variant="116500LN ホワイト", category="watch",
               keywords=["デイトナ", "116500LN", "ホワイト"]),
    ModelQuery(id="rolex-submariner", brand="ROLEX", model="サブマリーナー",
               variant="124060", category="watch",
               keywords=["サブマリーナ", "124060"]),
    ModelQuery(id="cartier-love-ring", brand="Cartier", model="ラブリング",
               variant="K18WG (1色)", category="jewelry",
               keywords=["ラブリング", "Love", "K18WG"]),
    ModelQuery(id="vca-perlee-clover", brand="VAN CLEEF & ARPELS",
               model="ヴィンテージアルハンブラ", variant="ペンダント YG",
               category="jewelry",
               keywords=["ヴィンテージアルハンブラ", "ペンダント", "YG"]),
    ModelQuery(id="tiffany-solitaire", brand="TIFFANY", model="ソリティア",
               variant="ダイヤ Pt950 0.20〜0.26ct", category="jewelry",
               keywords=["ソリティア", "ダイヤ", "Pt950"]),
]

SOURCES = [
    DemoSource(),               # idempotent baseline (passthrough prior)
    YahooAuctionsSource(),      # 落札価格 × 買取係数 (実需相場)
    UridokiSource(),            # 買取相場アグリゲータ (業者公開値)
    # 拡張余地: Komehyo, Buysell 等の per-model 価格表 spider
]


def main() -> int:
    all_observations = []
    for src in SOURCES:
        if not src.enabled:
            logger.info("Source %s disabled, skipping", src.name)
            continue
        try:
            obs = src.fetch_prices(MODELS)
            all_observations.extend(obs)
            logger.info("✓ %s: %d observations", src.name, len(obs))
        except Exception as e:
            logger.error("✗ %s failed: %s", src.name, e)

    if not all_observations:
        logger.error("No observations collected from any source")
        return 1

    aggregated = aggregate(all_observations)
    if not aggregated:
        logger.error("Aggregation produced empty result")
        return 1

    # Snapshot output
    output = {}
    for q in MODELS:
        agg = aggregated.get(q.id)
        if not agg:
            continue
        output[q.id] = {
            "brand": q.brand,
            "model": q.model,
            "variant": q.variant,
            "category": q.category,
            "min": agg["min"],
            "max": agg["max"],
            "mid_low": agg["mid_low"],
            "mid_high": agg["mid_high"],
            "median": agg["median"],
            "n_observations": agg["n_observations"],
            "n_sources": agg["n_sources"],
        }

    SNAPSHOT.parent.mkdir(parents=True, exist_ok=True)
    SNAPSHOT.write_text(
        json.dumps(output, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    logger.info("✓ Snapshot written: %s (%d models)", SNAPSHOT, len(output))
    return 0


if __name__ == "__main__":
    sys.exit(main())

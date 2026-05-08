"""Auto-scrape package for 徳丸商会 brand buyback rates.

Architecture:
- main.py     : entry point, orchestrates sources
- sources/    : per-site spiders (extend here)
- aggregate.py: combine multiple sources → rate ranges
- validate.py : ±50% sanity check vs previous data
- merge.py    : write back to src/data/rates.ts
"""

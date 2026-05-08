# Auto Rate Scraper

毎月1日 0:01 JST に GitHub Actions で起動し、買取相場データ
(`src/data/rates.ts`) を自動更新するパイプライン。

## アーキテクチャ

```
┌─────────────────────────────────────────────────────────────┐
│ .github/workflows/scrape-rates.yml (cron + workflow_dispatch)│
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────┐
│ scripts/scrape/scrape/main.py              │ ← 各 source を呼んで観測値を集約
│   ├─ sources/_demo.py        (baseline)    │
│   ├─ sources/yahoo_auctions.py (skeleton)  │
│   └─ sources/<追加可能>                     │
└──────────────────────┬─────────────────────┘
                       ↓ rates-snapshot.json
┌────────────────────────────────────────────┐
│ scripts/scrape/scrape/validate.py          │ ← ±50%サニティチェック
└──────────────────────┬─────────────────────┘
                       ↓
┌────────────────────────────────────────────┐
│ scripts/scrape/scrape/merge.py             │ ← rates.ts を regex で安全更新
└──────────────────────┬─────────────────────┘
                       ↓ git commit & push
┌────────────────────────────────────────────┐
│ deploy.yml が自動起動 → GitHub Pages 反映  │
└────────────────────────────────────────────┘
```

## 現状（v1: 2026-05-08 時点）

- ✅ Workflow YAML 完成（cron + 手動trigger + 失敗時 issue 作成）
- ✅ Scrape framework 完成（base class / aggregate / validate / merge）
- ✅ Demo source 動作確認可能（既存 rates 値からのジッタリングで pipeline 検証）
- ⚠ **実 spider 未実装**: Yahoo!オークション skeleton のみ
- 📝 拡張点として KOMEHYO / バイセル / なんぼや / 大黒屋 / ブランドオフ の spider を追加可能

## 新規 source の追加方法

```python
# scripts/scrape/scrape/sources/komehyo.py
from .base import BaseSource, ModelQuery, PriceObservation

class KomehyoSource(BaseSource):
    name = "komehyo"
    enabled = True

    def fetch_prices(self, models):
        observations = []
        for q in models:
            # Scrapling で価格抽出 → PriceObservation を append
            ...
        return observations
```

main.py の `SOURCES` リストに追加して終了。aggregate / validate / merge は共通ロジックなので無修正。

## 手動テスト

```bash
# Repo root で
cd scripts/scrape
pip install -r requirements.txt
python -m playwright install --with-deps chromium

python -m scrape.main      # スクレイプ → rates-snapshot.json
python -m scrape.validate  # 検証
cd ../..
python -m scrape.merge     # rates.ts 更新
```

## GitHub Actions 手動実行

```
Actions → Scrape & Update Rates → Run workflow
  - dry_run: true   # スクレイプ・検証のみ、commit しない
  - dry_run: false  # フル実行
```

## 失敗時の挙動

- scrape 失敗 → issue 自動作成、rates.ts 不変
- validate 失敗 → issue 自動作成、rates.ts 不変
- ±50%（時計は ±70%）超過 → 警告ログ + 場合により validate FAIL

## モデル追加

`src/data/rates.ts` に新モデルを追加したら、`scripts/scrape/scrape/main.py` の
`MODELS` 配列にも対応する `ModelQuery` を追加してください。

`id` フィールドは内部用 slug (任意自由)。`brand` `model` `variant` で
rates.ts のエントリと突合します。

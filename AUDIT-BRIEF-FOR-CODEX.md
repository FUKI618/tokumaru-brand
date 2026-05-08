# 徳丸商会ブランド買取LP — 第三者監査ブリーフィング

**監査依頼日**: 2026-05-08
**対象ブランチ**: `main` (HEAD: `9af70a2`)
**公開URL**: https://fuki618.github.io/tokumaru-brand/
**リポジトリ**: https://github.com/FUKI618/tokumaru-brand

---

## 0. 監査依頼の目的

このセッションで Claude (Opus) が大規模に実装した：
1. LP デザイン全面リビルド（γ classic luxury palette）
2. 法的 compliance ページ新規作成（特商法・PP連携）
3. **月次自動買取相場スクレイピング pipeline**（GitHub Actions）

を、**独立した第三者監査** で検証してください。Claude が見落としている問題、設計判断の盲点、セキュリティ・法的・実装品質の問題を全方位で洗い出してほしい。

特に重点監査してほしいのは:
- スクレイピング pipeline の **実運用での頑健性**（spider 失敗時の挙動・データ事故防止）
- **法的論点** の妥当性（robots.txt 違反 spider 再有効化判断・特商法ページ内容）
- **セキュリティ**（GitHub Actions permissions・regex マッチの攻撃面）
- **デッドコード・冗長性・命名の一貫性**

---

## 1. プロジェクト概要

### 何のサイト
- 徳丸商会（名古屋市中村区横井の古物商・古物商許可第541042309800号）
- 主要事業: ブランドバッグ・時計・ジュエリー買取
- ターゲット: 30-50代主婦層（タンスのヴィトン・シャネル整理）
- 流入: Google広告（リスティング）70% + SEO 30%
- CV: LINE査定 → 出張買取 / 宅配買取 / 来店買取
- KPI: 月70-100CV / CPA 3,000円 / 成約率70%

### 技術スタック
- **Astro 6.1.5** (静的サイト生成)
- **Tailwind CSS v4.2.2** (`@theme`directive)
- **Alpine.js 3.15.11** (FAQ アコーディオン)
- **Bun** (パッケージマネージャ・ローカル dev)
- **GitHub Pages** (公開ホスト)
- **GitHub Actions** (自動デプロイ・月次スクレイプ)
- **Python 3.11 / httpx** (スクレイピング)

### ディレクトリ
```
ブランド/
├─ .github/
│  └─ workflows/
│     ├─ deploy.yml              # main push & 月次rebuild → GitHub Pages
│     └─ scrape-rates.yml        # 月初cron + 手動trigger → 相場更新
├─ src/
│  ├─ pages/
│  │  ├─ index.astro             # メインLP (1100+行)
│  │  ├─ privacy-policy.astro    # PP
│  │  └─ legal-notices.astro     # 特商法 (新規)
│  ├─ layouts/
│  │  └─ Layout.astro            # JSON-LD 9ブロック・head セットアップ
│  ├─ data/
│  │  ├─ company.ts
│  │  ├─ staff.ts                # 査定員2名 (Person schema)
│  │  ├─ brands.ts               # 5flagship + 26 popular
│  │  ├─ faq.ts                  # FAQ 15問 + faqsToJsonLd()
│  │  ├─ voices.ts               # お客様の声 (架空・想定シナリオ)
│  │  ├─ campaigns.ts
│  │  ├─ rates.ts                # 12モデル相場 (自動更新対象)
│  │  ├─ rates-snapshot.json     # scrape 出力 baseline
│  │  └─ rates-snapshot.prior.json  # 検証用 prior
│  ├─ lib/
│  │  ├─ site.ts
│  │  └─ calendar.ts             # 月次表示 (TZ=Asia/Tokyo 必須)
│  ├─ scripts/luxury-effects.ts
│  └─ styles/global.css          # 4500+行 (Tailwind + γ palette)
├─ scripts/scrape/                # スクレイピング pipeline
│  ├─ requirements.txt           # httpx + BS4 only
│  ├─ README.md                  # アーキテクチャ
│  └─ scrape/
│     ├─ main.py                 # entry point (12モデル × 各source)
│     ├─ aggregate.py            # P10/P90 (≥10obs) / raw min-max (<10obs)
│     ├─ validate.py             # ±50% (時計±70%) サニティチェック
│     ├─ merge.py                # rates.ts への regex マージ
│     └─ sources/
│        ├─ base.py              # BaseSource + dynamic_min_threshold helper
│        ├─ _demo.py             # idempotent passthrough (safety net)
│        ├─ yahoo_auctions.py    # 落札価格 × 買取係数
│        └─ uridoki.py           # 業者公開買取値集約
├─ public/
│  ├─ logo.svg                   # 朱印アイコン (header)
│  ├─ logo-lockup.svg            # アイコン+wordmark一体型 (印刷用)
│  ├─ favicon.svg                # 朱印 (修正済 — 旧版は別ブランド遺物)
│  └─ og-image.webp / og-image.png
├─ BRIEF-2026-05-06.md           # Phase 0 ブリーフ
├─ competitor-list.md            # Phase 1 競合調査
└─ competitor-extracts.md        # Phase 2 構造化抽出
```

---

## 2. このセッションでの主な変更（27 commits）

### 設計刷新
- `46bf04e` γ classic luxury rebuild — Aesopモダンミニマル → 三越婦人売場トーン
- `5b44b0f` middle sections γ palette cascade
- `e1177f0` rates section catalog rebuild — 三越婦人ブランドカタログ風
- `ce5eb50` mobile hero full-bleed image overlay
- `df8cd63` header v3 — balanced trio (logo / status / paired CTAs)

### バグ修正
- `c9443d5` favicon が別ブランド (金) の遺物 → 徳印に置換
- `a9acf2a` footer logo invert filter で水色化していた → 除去
- `274f935` rates watch card 白文字が cream bg に溶けていた → 修正

### 法的対応 (audit発見)
- `e21a580` voices disclaimer + PP リンク + 特商法ページ新規作成

### スクレイピング pipeline (主要新機能)
- `5d37a7d` infrastructure (workflow + framework + 12 model query)
- `7136fd2` Yahoo!オークション + ウリドキ spider 初期実装
- `ad1b807` Scrapling 0.4 互換問題 → httpx + BS4 にリファクタ
- `20c0dba` audit反映: cron発火回数バグ修正・spider 一旦disabled
- `9af70a2` ユーザ指示で再有効化 + 動的最小閾値で精度向上

### 自動運用 (CI)
- `3d9c7b2` JST完全準拠 — TZ=Asia/Tokyo + cron を月末日 (28-31) に
- `62541a1` cron発火を JST月初 1回限定にする guard step 追加

---

## 3. 重点監査エリア

### 🔥 A. スクレイピング pipeline の頑健性

**ファイル**:
- `scripts/scrape/scrape/main.py`
- `scripts/scrape/scrape/aggregate.py`
- `scripts/scrape/scrape/validate.py`
- `scripts/scrape/scrape/merge.py`
- `scripts/scrape/scrape/sources/*.py`
- `.github/workflows/scrape-rates.yml`

**監査して欲しい質問**:

1. **冪等性**: DemoSource (`_demo.py`) は prior snapshot を再放出する設計だが、
   - 真に idempotent か? 実装上のエッジケース (snapshot ファイル欠損時等) は?
   - aggregate.py の `len(prices) < 10` 分岐は 正しく機能するか?
2. **HTML regex マッチの誤動作**:
   - `r"(?:¥|￥)\s*([\d,]{4,})|([\d,]{4,})\s*円"` が、
     - 価格でない数字 (送料・割引・data属性 etc.) を拾わないか
     - prior_min × 0.4 の動的閾値で本当にノイズが除去できるか
3. **±50% / 時計±70% 検証** (`validate.py`):
   - 境界条件 (prior=0, new=0等) で誤動作しないか
   - 「Demo passthrough のみが source の場合」検出は正しく warn するか
4. **regex マージ** (`merge.py`):
   - 12/12 マッチを確認しているが、
     - 将来 `rates.ts` のフォーマットが変わった時の挙動
     - unmatched が増えた時の早期検出ロジック
5. **GitHub Actions cron**:
   - `'1 15 28-31 * *'` + JST guard で本当に月1回限定か検証
   - workflow_dispatch override が意図通り動くか
6. **失敗時挙動**:
   - 全 source 失敗 → DemoSource のみで「成功」扱いになる隠蔽問題は解消したか?
   - issue 自動作成は実際に発火するか
7. **法的論点** (`yahoo_auctions.py`, `uridoki.py` docstring):
   - robots.txt 違反だが「月1・3秒間隔・公開価格・自社価格設定参考」で
     実質法的リスク極小という判断は妥当か?
   - 著作権法30条の4 (情報解析目的) の解釈は正しいか?
   - User-Agent 詐称（Chrome名乗り）が本当に問題ないか?
8. **HTTP セキュリティ**:
   - `httpx.Client` の設定 (timeout 30, follow_redirects=True, max_redirects=5) は妥当か
   - 攻撃者が悪意あるHTML 返した場合の影響評価

### 🔥 B. 法的 compliance ページ

**ファイル**:
- `src/pages/legal-notices.astro` (新規・特商法)
- `src/pages/privacy-policy.astro` (既存・参考)
- `src/pages/index.astro` (voices section disclaimer / footer リンク / form 同意)

**監査して欲しい質問**:
1. **特商法第11条** に基づく必要記載事項を満たしているか?
   - 事業者名・代表者・所在地・電話番号
   - 取引条件・代金支払時期・キャンセル規定
   - **訪問購入クーリングオフ8日**（特商法58条の14）の記載
   - **不招請勧誘禁止**（特商法58条の6）の記載
2. **景品表示法**観点:
   - 「最短15分」「最短当日」「最低買取保証」の根拠表示 OK か?
   - voices section の「特定の個人を表したものではなく…」disclaimer は十分か?
3. **個人情報保護法**:
   - PP リンクが「容易に知り得る状態」を満たしているか?
   - フォーム同意文言の法的妥当性
4. **古物営業法**:
   - 18歳未満買取拒否・本人確認等の記載は妥当か?

### ⚠️ C. SEO/AEO 構造化データ

**ファイル**: `src/layouts/Layout.astro`

**監査して欲しい質問**:
1. JSON-LD 9ブロックに無効・冗長・誤った @type が無いか
2. LocalBusiness + PawnShop 複合は正しい使い方か
3. FAQPage 15問・HowTo 3step が Google ガイドラインに準拠か
4. Person schema (査定員2名) の `description` 長文は適切か
5. Speakable / WebPage / WebSite の `@id` 参照は循環していないか

### ⚠️ D. デザイン CSS の品質

**ファイル**: `src/styles/global.css` (4500+行)

**監査して欲しい質問**:
1. **死コード**: 旧 hero-v2 系・dossier-section-dark 等の不要 class が残っていないか
2. **!important 多用**: 適切な使用範囲か (Tailwind v4 @theme の上書き目的なら正当)
3. **CSS変数の整合性**:
   - `--color-bg-*` (legacy) と `--gamma-*` の二重管理になっていないか
   - cascade override の依存関係が複雑すぎないか
4. **レスポンシブ**:
   - mobile (≤1023px) / tablet / desktop の挙動が正しく分離されているか
   - iPhone SE (≤375px) 専用ルールの妥当性
5. **アクセシビリティ**:
   - コントラスト比 (γ-ink #2a1d12 on γ-bg #f3ead8) AA基準を満たすか
   - tap target 最小 24×24 を全 CTA で満たすか

### ⚠️ E. 設計判断の妥当性

**質問**:
1. **regex merge vs AST** (`merge.py`): TypeScript AST パーサ使わず regex 採用の判断は正しいか
2. **DemoSource を本番に残す**: idempotent passthrough として残す判断は正しいか・他の選択肢は?
3. **動的最小閾値 prior_min × 0.4**: 0.4 という比率の妥当性
4. **頻度月1回**: 時計の年+48-64% 変動考慮で月1で十分か
5. **httpx + BS4 vs Scrapling/Playwright**: SSR想定で httpx 採用は正しいか

---

## 4. 既知の課題 (Claudeが認識済み)

| 項目 | 状態 |
|------|------|
| Yahoo!オークション spider 7/12モデル未取得 | tuning 対象 |
| ウリドキ spider 0/12 (JS rendering) | Playwright必要 |
| GitHub Actions `permissions: contents: write` | 直 push、PR形式に変更余地あり |
| pytest テストスイート | 未実装 |
| `BaseSource` 共通ロジック引き上げ | DRY違反、3spider目で対応予定 |
| `dateModified` UTC基準 (1日ズレ可能性) | 軽微・未対応 |

---

## 5. 動作確認済みの状態 (Claude が監査時に確認)

```
[HTTP/2 200] /                          ← LP本体
[HTTP/2 200] /privacy-policy/
[HTTP/2 200] /legal-notices/
[HTTP/2 200] /sitemap-index.xml
[HTTP/2 200] /robots.txt
[HTTP/2 200] /logo.svg
[HTTP/2 200] /favicon.svg
[HTTP/2 200] /logo-lockup.svg
[HTTP/2 200] /og-image.webp

JSON-LD: 9ブロック / 27 schema types
FAQPage: 15問
HowToSteps: 3
Person: 2 (E-E-A-T)
古物商許可: 9箇所
PP/特商法 リンク: footer + form同意

景表法 NG語句: 全0件 (業界No.1, 日本一, 必ず, 絶対, 確実)

最新 scrape dry_run (run 25538912810):
  prior-passthrough: 60 obs / 12 models
  yahoo-auctions: 12 valid obs / 5 models 成功
  uridoki: 0 obs (JS rendering で要 Playwright)
  Validation: pass
  conclusion: success
```

---

## 6. CODEX への期待

1. **Claude 視点では見えなかった盲点** を指摘してほしい
2. **設計判断の代替案** を提示してほしい (もっと良い方法があれば)
3. **本番投入リスク** をスコア化してほしい (low/medium/high)
4. **テストハーネスのスケルトン** を提案してほしい (pytest等)
5. **法的論点の妥当性** を Claude の説明と独立に評価してほしい

---

## 7. 監査結果のフォーマット (推奨)

```markdown
## CODEX 第三者監査結果

### 各エリアごと判定 (✅ / ⚠ / 🔥)
| エリア | 判定 | 主要発見事項 |
|------|------|----------|
| A. Scraping pipeline | ... | ... |
| B. Legal compliance | ... | ... |
| C. SEO/AEO | ... | ... |
| D. CSS品質 | ... | ... |
| E. 設計判断 | ... | ... |

### Critical findings (要即時対応)
- ...

### Important findings (3か月以内)
- ...

### Suggestions (任意)
- ...

### 総合スコア (0-10)
- 総合: X.X / 10
- 内訳: ...

### 提案する次のアクション
- ...
```

---

## 8. リファレンスファイル一覧

CODEX が読み込むべき主要ファイル (絶対パス):

```
/Users/fuki/Code/LP作成/徳丸商会/ブランド/.github/workflows/scrape-rates.yml
/Users/fuki/Code/LP作成/徳丸商会/ブランド/.github/workflows/deploy.yml
/Users/fuki/Code/LP作成/徳丸商会/ブランド/scripts/scrape/scrape/main.py
/Users/fuki/Code/LP作成/徳丸商会/ブランド/scripts/scrape/scrape/aggregate.py
/Users/fuki/Code/LP作成/徳丸商会/ブランド/scripts/scrape/scrape/validate.py
/Users/fuki/Code/LP作成/徳丸商会/ブランド/scripts/scrape/scrape/merge.py
/Users/fuki/Code/LP作成/徳丸商会/ブランド/scripts/scrape/scrape/sources/base.py
/Users/fuki/Code/LP作成/徳丸商会/ブランド/scripts/scrape/scrape/sources/_demo.py
/Users/fuki/Code/LP作成/徳丸商会/ブランド/scripts/scrape/scrape/sources/yahoo_auctions.py
/Users/fuki/Code/LP作成/徳丸商会/ブランド/scripts/scrape/scrape/sources/uridoki.py
/Users/fuki/Code/LP作成/徳丸商会/ブランド/scripts/scrape/README.md
/Users/fuki/Code/LP作成/徳丸商会/ブランド/scripts/scrape/requirements.txt
/Users/fuki/Code/LP作成/徳丸商会/ブランド/src/pages/index.astro
/Users/fuki/Code/LP作成/徳丸商会/ブランド/src/pages/legal-notices.astro
/Users/fuki/Code/LP作成/徳丸商会/ブランド/src/pages/privacy-policy.astro
/Users/fuki/Code/LP作成/徳丸商会/ブランド/src/layouts/Layout.astro
/Users/fuki/Code/LP作成/徳丸商会/ブランド/src/styles/global.css
/Users/fuki/Code/LP作成/徳丸商会/ブランド/src/data/rates.ts
/Users/fuki/Code/LP作成/徳丸商会/ブランド/src/data/voices.ts
/Users/fuki/Code/LP作成/徳丸商会/ブランド/src/data/faq.ts
/Users/fuki/Code/LP作成/徳丸商会/ブランド/src/data/staff.ts
/Users/fuki/Code/LP作成/徳丸商会/ブランド/src/data/rates-snapshot.json
/Users/fuki/Code/LP作成/徳丸商会/ブランド/BRIEF-2026-05-06.md
/Users/fuki/Code/LP作成/徳丸商会/ブランド/competitor-list.md
/Users/fuki/Code/LP作成/徳丸商会/ブランド/competitor-extracts.md
```

---

## 9. Codex 実行コマンド例

```bash
cd "/Users/fuki/Code/LP作成/徳丸商会/ブランド"

# 全体構造把握
ls -R scripts/scrape/ src/pages/ src/data/

# 主要ファイル読み込み
cat AUDIT-BRIEF-FOR-CODEX.md  # ← この監査ブリーフ
cat scripts/scrape/scrape/main.py
cat src/pages/legal-notices.astro

# 動作確認: scrape 単体実行 (Python 3.11+)
cd scripts/scrape && python -m scrape.main && cd ../..
python -c "import sys; sys.path.insert(0, 'scripts/scrape'); from scrape.validate import main; main()"

# 動作確認: rates.ts 整合性
diff src/data/rates-snapshot.json src/data/rates-snapshot.prior.json

# 公開URL動作確認
curl -sI https://fuki618.github.io/tokumaru-brand/
curl -sI https://fuki618.github.io/tokumaru-brand/legal-notices/
```

---

**監査の目的は "Claude が見落としているものを発見する" こと。** 厳しめにお願いします。

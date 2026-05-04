# 徳丸商会 ブランド買取LP — 出稿前セットアップガイド

このドキュメントは、ブランド買取LPを本番公開（出稿）するために **ユーザーが実行する必要がある作業** をまとめたものです。
所要時間: 合計 30〜45分（待ち時間含む）

---

## 📋 出稿チェックリスト（5ステップ）

- [ ] 1. GitHub リポジトリ作成 + 初回push（10分）
- [ ] 2. GitHub Pages の有効化（2分）
- [ ] 3. Formspree でフォーム作成 + Form ID 取得（5分）
- [ ] 4. ソースに Form ID を反映 + 再ビルド + push（3分）
- [ ] 5. 実機で動作確認（PC/モバイル）+ PageSpeed計測（10分）

> 上記の前提として、本リポジトリに `kaitori@tokumarushokai.com` のメール受信が可能であることを確認してください。

---

## 1️⃣ GitHub リポジトリ作成 + 初回push

### 1-1. GitHub で新規リポジトリ作成

1. https://github.com/new を開く
2. 設定：
   - Repository name: **`tokumaru-brand`**
   - Description: `徳丸商会 ブランド買取LP（名古屋）`
   - Visibility: **Public**（GitHub Pages無料プランの条件）
   - **Add a README / .gitignore / license は全部チェックなし**（ローカルから上書きするため）
3. `Create repository` をクリック

### 1-2. ローカルリポジトリを初期化 + push

ターミナルで以下を順に実行：

```bash
cd "/Users/fuki/Code/LP作成/徳丸商会/ブランド"

# 不要ファイルが含まれないよう .gitignore を作成
cat > .gitignore <<'EOF'
node_modules/
dist/
.astro/
.DS_Store
*.log
screenshots/
.env
.env.*
EOF

# Git 初期化
git init -b main
git add .
git commit -m "feat: 徳丸商会 ブランド買取LP 初版

- Astro 6 + Tailwind v4 + Alpine.js
- JSON-LD 5種（LocalBusiness/Organization/FAQPage/HowTo/BreadcrumbList）
- 出張・LINE査定・宅配の3チャネル対応
- 主要5ブランドに最低買取保証額明示
- 39項目チェック 9.88/10達成"

# リモート登録 + push（FUKI618 アカウント前提）
git remote add origin https://github.com/FUKI618/tokumaru-brand.git
git push -u origin main
```

> 認証で求められたら、GitHub の Personal Access Token を使うか、GitHub Desktop / `gh` CLI でログイン済みの環境で実行してください。

---

## 2️⃣ GitHub Pages の有効化

1. https://github.com/FUKI618/tokumaru-brand/settings/pages を開く
2. **Source** で `GitHub Actions` を選択
3. 保存（自動保存される）
4. https://github.com/FUKI618/tokumaru-brand/actions を開いて、`Deploy to GitHub Pages` ワークフローが緑✓になるまで待つ（初回 約2-3分）
5. デプロイ完了後、 https://fuki618.github.io/tokumaru-brand/ にアクセスして表示確認

---

## 3️⃣ Formspree でフォーム作成

### 3-1. アカウント作成

1. https://formspree.io/register を開く
2. メールアドレス（`kaitori@tokumarushokai.com` 推奨）+ パスワードでサインアップ
3. メール認証を完了

### 3-2. 新規フォーム作成

1. ダッシュボードで `+ New Form` をクリック
2. 設定：
   - Form name: `徳丸商会 ブランド買取 お問い合わせ`
   - Send emails to: `kaitori@tokumarushokai.com`
3. `Create Form` をクリック

### 3-3. Form ID を取得

作成後の画面で、以下のような URL が表示されます：

```
https://formspree.io/f/xrgjzpqv
                       ^^^^^^^^
                       これが Form ID
```

`xrgjzpqv` のような **8文字の英数字** が Form ID です（コピーしておいてください）。

> 無料プラン: 月50件まで。それ以上必要なら有料プラン（$10/月で月1000件）に切替可能。

---

## 4️⃣ ソースに Form ID を反映

### 4-1. コード修正

`src/pages/index.astro` の **13行目** を編集：

```ts
// 変更前
const FORMSPREE_FORM_ID = "";

// 変更後（取得した Form ID を入れる）
const FORMSPREE_FORM_ID = "xrgjzpqv";  // 例
```

### 4-2. ビルド + push

```bash
cd "/Users/fuki/Code/LP作成/徳丸商会/ブランド"
bun run build
git add src/pages/index.astro
git commit -m "feat: Formspree フォームID設定"
git push
```

GitHub Actions が自動でデプロイします（2分程度）。

### 4-3. 動作確認

https://fuki618.github.io/tokumaru-brand/#contact からフォーム送信テスト：
1. テスト用に名前・電話・メッセージだけ入れて送信
2. `kaitori@tokumarushokai.com` にメールが届くか確認
3. Formspree ダッシュボードでも送信記録を確認

---

## 5️⃣ 実機 PageSpeed 計測

### 5-1. PageSpeed Insights で計測

1. https://pagespeed.web.dev/ を開く
2. URL に `https://fuki618.github.io/tokumaru-brand/` を入力
3. `分析` をクリック
4. **モバイル / デスクトップ両方** のスコアを確認

### 5-2. 目標スコア（既存LPの実績ベース）

| 指標 | 目標 |
|---|---|
| Performance（モバイル） | 85+ |
| Performance（デスクトップ） | 95+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |
| LCP | < 2.5s |
| CLS | < 0.1 |

スコアが目標を下回ったら、改善依頼を私に出してください。

---

## 🛠️ ローカル開発・メンテナンス

### 開発サーバ起動
```bash
cd "/Users/fuki/Code/LP作成/徳丸商会/ブランド"
bun run dev
# → http://localhost:4321/tokumaru-brand/
```

### 本番ビルド
```bash
bun run build
# → dist/ に出力
```

### スクリーンショット撮影（PC + モバイル）
```bash
bun run scripts/snap.ts
# → screenshots/ に4枚保存
```

### OG画像の再生成
```bash
bun run scripts/generate-og.ts
# → public/og-image.{webp,png} を再生成
```

### 39項目品質チェックの実施
1. `bun run build` でビルド
2. `dist/index.html` を grep で検証
3. `QA-REPORT.md` に基づき各項目を確認
4. スコア9.0未満なら改善

---

## 🔄 LP連携（既存LPからの送客）

ブランド買取LPは以下の既存LPと相互リンクしています：

| LP | URL | 連携内容 |
|---|---|---|
| 楽器買取 | https://fuki618.github.io/tokumaru-shokai/ | フッター | 
| 遺品整理 | https://fuki618.github.io/tokumaru-estate/ | trust + フッター | 
| 貴金属買取 | https://fuki618.github.io/tokumaru-gold/ | trust + フッター | 

**重要：貴金属LPは別途縮小作業中**（ブランド項を削除し、金・プラチナ・銀地金専門に再フォーカス）。
ブランドLPを公開する前に、貴金属LP側もデプロイ更新が必要です（共食い回避）。

---

## 📞 緊急時のフォールバック

- フォーム送信が失敗する場合: フォーム下部に `kaitori@tokumarushokai.com` への mailto: リンクを表示済み
- LINE査定: https://lin.ee/j4wK9IM
- 電話: 052-990-3968（9:00〜21:00 年中無休）

---

## 🚫 禁止事項（重要）

以下の数値・実績を **絶対に追加しないこと**：

- ❌ aggregateRating（ratingValue / reviewCount）
- ❌ 「累計○○件」「満足度○○%」「★4.9 387件」など虚偽数値
- ❌ 「業界No.1」「日本一」など根拠のない称号
- ❌ 取得していない資格（一般廃棄物収集運搬業許可、遺品整理士認定等）
- ❌ 「メディア掲載」「TV出演」など事実でない実績

これらは景表法（不当景品類及び不当表示防止法）違反のリスクがあり、過去にも遺品整理LPで問題になった経緯があります（memory: `project_estate_competitor.md`）。

---

## ✅ 公開前 最終確認チェックリスト

- [ ] GitHub Pages に `https://fuki618.github.io/tokumaru-brand/` でアクセスできる
- [ ] Formspree のテスト送信メールが届く
- [ ] PageSpeed Insights モバイルスコア 85以上
- [ ] スマホ実機で表示崩れなし
- [ ] 電話CTAタップで通話発信される（`tel:` リンク）
- [ ] LINE CTAタップで公式LINE友だち追加画面が開く
- [ ] OG画像が表示される（OGP確認: https://www.opengraph.xyz/url/）
- [ ] プライバシーポリシーへのリンクから `/privacy-policy/` ページが開く
- [ ] 貴金属LPがブランド項縮小済み（共食い回避）
- [ ] FAQ・取扱ブランド・対応エリアが正確
- [ ] 古物商許可番号 第541042309800号 が表示されている

---

最終更新: 2026年5月4日

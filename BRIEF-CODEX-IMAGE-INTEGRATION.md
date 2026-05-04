# Codex Brief: 画像とコンテンツの編集統合（"ポンと置いた感" の解消）

> **対象プロジェクト**: 徳丸商会 ブランド買取 LP（Aesop 風モダンミニマル）
> **作業ブランチ**: `main`（直接コミット運用）
> **本番URL**: https://fuki618.github.io/tokumaru-brand/
> **このブリーフの作成者**: Claude Code（前任エージェント）
> **作成日**: 2026-05-05

---

## 1. 背景: なぜこのブリーフを書いたか

**ユーザーの直接フィードバック:**
> 「なんか写真をポンとおいただけかんを感じる」

直近のセッションで以下を実装済み（コミット `bd61ffa` 〜 `73960de`）:

- 編集系画像 6枚生成（Gemini 2.5 Flash Image）— Aesop 統一の世界観
  - `hero/luxury-bg-portrait.{webp,jpg}` — 窓辺の陶器花瓶 + リネン布
  - `sections/story-notebook-portrait.{webp,jpg}` — 革ノート + 真鍮万年筆
  - `sections/methods-parcel-portrait.{webp,jpg}` — 白小包 + リネン
  - `sections/staff-tools-portrait.{webp,jpg}` — 真鍮天秤 + ルーペ + 白手袋
  - `sections/voices-letter-portrait.{webp,jpg}` — 便箋 + インク瓶 + 押し花
  - `sections/campaigns-ribbon-portrait.{webp,jpg}` — 贈答箱 + リネンリボン
- ランドスケープ版（16:9）も全種あり: `*.{webp,jpg}` (no portrait suffix)
- モバイル portrait / PC landscape の出し分け実装済み（`<picture media>`）

**画像の質は十分高い。問題は配置と編集統合。**

---

## 2. 「ポンと置いた感」の構造的診断

現在の各セクションの基本構造:

```html
<section>
  <h2>見出し</h2>
  <picture>[画像 - aspect-[3/4] mobile / [21/9] PC]</picture>  ← ここが浮いている
  <div>本文・カード・リスト</div>
</section>
```

**問題点（Aesop比較）:**

| 観点 | 徳丸 現状 | Aesop の作法 |
|---|---|---|
| **画像の役割** | 装飾の divider（中央に独立配置） | narrative の一部（テキストとリズミカルに絡む） |
| **画像位置** | 全セクションで「見出し直後・全幅」の繰り返し | sectionごとに左/右/全幅/背景と変化させる |
| **テキストとの関係** | 画像とテキストは別ブロックで分離 | テキストと画像が「対話」する（caption / overlay / asymmetric grid） |
| **アスペクト** | mobile 3:4 / PC 21:9 で全セクション統一 | section の意味で aspect-ratio が変わる（人物=4:5、風景=21:9、詳細=1:1） |
| **画像数** | 1 section = 1 image の硬直 | section内で複数画像を編集レイアウトで配置することもある |
| **余白** | section-pad で外側余白のみ | 画像と本文の間に "asymmetric breathing" がある |

参考: https://www.aesop.co.jp/ — 各カテゴリページの編集レイアウトを参照

---

## 3. 改善のための具体パターン提案

CODEX に検討してほしい改善案を、リスク順に列挙します。
**全部採用ではなく、ベストな組み合わせを選んで実装案を提示してほしい。**

### A. Side-by-side（PC）/ Stack-with-caption（mobile）パターン

セクションの一部を「画像 + ミニコピー」のセットにする。

```
PC: [画像 col-6] [テキストブロック col-6]
Mobile: [画像] → [小さな caption（"III. 私たちの査定道具"）] → [本文]
```

対象セクション候補: **story / staff / voices**
- story: 引用パネル + 画像 を side-by-side
- staff: 査定道具画像 + 「査定の手仕事は、まず観察から始まる」のような短文
- voices: 手紙画像 + 「お客様のお手紙を、いまも大切に保管しています」

### B. Section内 Asymmetric Grid

12カラムグリッドで画像とコンテンツを非対称配置。

```
PC: [eyebrow + h2 col-7] [画像 col-5 mt-12]
or  [画像 col-5] [eyebrow + h2 + 本文 col-7]
```

対象: **methods（3つの利用方法）**
- 現在: 見出し → 画像 → 3カード → 終
- 改善: 見出し col-6 / 画像 col-6 を side-by-side、その下に3カード

### C. 画像をセクション背景として使う（部分的）

aspect-ratio block ではなく、 absolute positioning で section の一角に画像を流す。

```
section { position: relative; }
  picture.absolute right-0 top-0 w-1/2 h-full opacity-80
  div.relative z-10 [content]
```

対象: **campaigns**（celebration ムード）
- 現在: 見出し → リボン箱画像 → 3カード
- 改善: 画像を背景の右1/3に配置、3カードはその上に重なる

### D. 連続画像の編集レイアウト

1セクションに2-3枚を組み合わせる。"画像 + 画像 + テキスト" の三段構成。

```
[大画像 col-8] [小画像 col-4]
              [小キャプション]
[本文ブロック]
```

対象: **story**
- 引用 + 革ノート画像（メイン）+ 真鍮道具の小画像（サブ） で「査定の手仕事」を編集的に表現
- ※ サブ画像は新規生成 or 既存 staff-tools の crop を活用

### E. Image-with-caption（小キャプション直付け）

画像直下に italic で短い説明を添える。

```html
<picture>...</picture>
<p class="font-serif italic text-sm text-text-sub mt-3 max-w-md">
  — 査定員の机の上に、いつも置いてある真鍮の天秤。
</p>
```

対象: **all sections**（最低コストで編集感UP）
- これだけでも "ポンと置いた感" は大幅改善する見込み

### F. Aspect-ratio をセクションで変える

統一の `aspect-[3/4]` をやめ、文脈に合わせる。

| section | 推奨 aspect (mobile / PC) | 理由 |
|---|---|---|
| story | 4:5 / 16:10 | 物の質感が主役 |
| methods | 3:4 / 21:9 | 手元の作業感 |
| staff | 4:5 / 4:3 | 道具の縦シルエット |
| voices | 1:1 / 16:9 | 手紙の親密感 |
| campaigns | 4:5 / 21:9 | 現状維持で OK |

---

## 4. 制約・絶対条件

実装時に **必ず守る** こと:

1. **CV保持・改善**: Sticky CTA（電話 + LINE）はそのまま。コンバージョンを下げる変更は NG
2. **既存コミット温存**: `bd61ffa` 以降の改善（Hero / Contact / Rates accordion など）を壊さない
3. **モバイルファースト**: モバイル UX を犠牲にする PC レイアウトは NG
4. **画像 LCP**: hero モバイル画像は `loading="eager" fetchpriority="high"` 維持
5. **accessibility**: alt テキスト、aria-* を必ず保持
6. **Tailwind v4**: 任意のクラスは `[var(--color-text)]` 等のCSS変数で（既存に合わせる）
7. **PC/Mobile 同等品質**: 「PCもモバイルも完璧に」がユーザー要求
8. **ロゴ・商品の写り込み禁止**: 古物商規制 + 著作権で全画像 no-logos / no-brand-products
9. **追加画像生成の前**: prompt は `STYLE_BASE` を踏襲し、既存画像と世界観を統一

---

## 5. 期待アウトプット

CODEX に以下を期待します:

### 5.1 必須
- **セクション別の改善方針**（5-6 セクション × 各 50-150字）
  - 採用パターン（A〜F のどれか or 組み合わせ）
  - 想定 before / after
  - 実装難度（low / mid / high）
  - CV影響予測

### 5.2 推奨
- **コードサンプル**（最も効果が高い 2-3 セクションの diff）
  - `src/pages/index.astro` の該当部分
  - 必要なら `src/styles/global.css` の追加
- **新規画像が必要な場合**: prompt 案を `scripts/generate-images.ts` の jobs 配列に追加できる形で

### 5.3 検討してほしい
- **B案（Asymmetric Grid）vs E案（Caption追加）の優先度** —
  - 工数 vs 効果
  - 一気にやるべきか、段階リリースすべきか
- **既存画像の再利用** vs **新規生成**
  - 既存6枚（landscape + portrait）で対応できるか
  - 不足なら何を追加すべきか（最大2枚まで推奨）

---

## 6. 主要ファイル & コマンドリファレンス

### 主要ファイル

| ファイル | 役割 |
|---|---|
| `src/pages/index.astro` | LP本体。1セクション=1 `<section>` |
| `src/styles/global.css` | デザイントークン、`.section-pad`, `.btn-*`, `.eyebrow`, `.display-1/2/3` |
| `src/layouts/Layout.astro` | head（fonts, JSON-LD）、Alpine.js |
| `src/data/staff.ts` `voices.ts` `rates.ts` etc. | コンテンツ定義 |
| `scripts/generate-images.ts` | Gemini 2.5 Flash Image で画像生成 |
| `scripts/snap-mobile-sections.ts` | Playwright モバイル監査 |
| `scripts/snap-mobile-fv.ts` | モバイル firstview snap |
| `scripts/snap.ts` | PC + モバイル full page |

### 実装〜検証のフロー

```bash
# 1) ビルド
PUBLIC_SITE_BASE=/tokumaru-brand bun run build

# 2) プレビュー起動（バックグラウンド）
bun run preview --port 4327 --host 127.0.0.1 &

# 3) スクショ取得
SNAP_URL=http://127.0.0.1:4327/tokumaru-brand/ bun run scripts/snap-mobile-sections.ts
SNAP_URL=http://127.0.0.1:4327/tokumaru-brand/ bun run scripts/snap-mobile-fv.ts
SNAP_URL=http://127.0.0.1:4327/tokumaru-brand/ bun run scripts/snap.ts

# 4) 必要なら画像生成（既存 + 新規分のみ）
ONLY=new-image-name GEMINI_MODEL=gemini-2.5-flash-image bun run scripts/generate-images.ts

# 5) git push で自動デプロイ
git add -A && git commit -m "..." && git push origin main
```

### スクリーンショット参照先

- `screenshots/mobile/` — モバイルセクション別（オリジナル解像度）
- `screenshots/mobile-preview/` — context用サムネイル
- `screenshots/section-*.png` — PC セクション
- `screenshots/pc-firstview.png` `mobile-firstview.png` — first view

### 利用可能な画像インベントリ

- `public/images/hero/luxury-bg.{webp,jpg}` (1920x1080) + `-portrait.{webp,jpg}` (1200x1600)
- `public/images/sections/{name}.{webp,jpg}` × 5 種 + `-portrait` 版
  - 種類: `story-notebook` / `methods-parcel` / `staff-tools` / `voices-letter` / `campaigns-ribbon`
- `public/images/sections/flagship-velvet.{webp,jpg}` `flow-appraisal.{webp,jpg}` `guarantee-vault.{webp,jpg}` （旧版・現在未使用）

---

## 7. デザイントークン早見表

```css
/* src/styles/global.css 抜粋 */
--color-bg: #fdfbf9;        /* 主背景（暖色オフホワイト） */
--color-bg-2: #f5f1ea;      /* sub背景（やや濃い） */
--color-bg-3: #ebe5d9;      /* paper風 */
--color-text: #100a0d;       /* Lemaire主要文字 */
--color-text-sub: #5e544a;   /* sub文字 */
--color-accent: #000000;     /* CTA基本 */
--color-accent-soft: #4a6e78; /* Toteme dusty teal */
--color-accent-warm: #b0623a; /* Lemaireベージュゴールド派生 */
--color-line: #06c755;       /* LINE公式 */
--color-border: #d8d2c5;
--font-sans: "Inter", "Noto Sans JP", ...;
--font-serif: "Cormorant Garamond", "EB Garamond", "Noto Serif JP", ...;

.section-pad { padding-block: clamp(4.5rem, 9vw, 8rem); }
.eyebrow { font-size: 11px; tracking-widest; uppercase; }
.display-1, .display-2, .display-3 { font-serif; large; }
.numero { font-serif italic 装飾用 (N° 01) }
```

---

## 8. すでに棄却された/避けるべき方向

CODEX が同じ轍を踏まないように:

- ❌ **画像をすべて hero みたいに巨大化** → モバイル LCP 劣化、CV 低下
- ❌ **画像内に文字を焼き込む** → 編集変更不可、accessibility NG
- ❌ **opacity 0.5 + 透過マスクで半透明にする** → 旧 hero モバイルで「ゴースト化」した失敗パターン
- ❌ **LINE緑を全廃** → CV機会損失（ユーザー判断で keep）
- ❌ **section-pad を縮める** → 直近で +50% 拡大した（72px→48px は逆行）
- ❌ **PC レイアウトを崩す** → "PCもモバイルも完璧" がユーザー要件

---

## 9. CODEX が答えるべき具体的問い

1. **どのセクションから始めるべきか？**（最高 ROI）
2. **B（Asymmetric grid）と E（caption）はどう組み合わせるか？**
3. **新規画像生成は必要か？必要なら何枚で何 prompt か？**
4. **モバイルのレイアウト深化は CV に響くか？**
5. **Aesop 風の "編集統合" はどこまで行くべきか？**（過剰 vs 不足のバランス）

---

## 付録: 直近のコミット履歴（参考）

```
73960de feat: モバイル portrait art-direction（全6画像 / Aesop完成度UP）
2147640 feat: Sticky CTA リバランス + Rates アコーディオン
912b680 polish: モバイルAesop品質仕上げ - 情報整理 + 余白 + Campaigns画像
434df0d fix(mobile): Aesop風モバイルHero再設計 + Contact「無料」表記
bd61ffa feat: 4セクションに編集画像追加でリッチ感補強
42bae53 fix: 出張買取をFVリード文に明示 / rates 見出しを「12モデル」誤解解消
51462a3 feat: Phase 5/6 — JSON-LD強化 + Aesop風ヒーロー + デザイン8.5+達成
8a18e76 redesign: モダンミニマル全面リデザイン（Aesop/Lemaire/Khaite参考）
```

各コミットの意図は git log で確認可能。

---

## 連絡

このブリーフへの追加質問・前提確認は、
**徳丸商会 担当（adams_fxxi@proton.me）** に直接 or
ブランチ `main` の最新 README / commit body に追記の形で。

**期待するレスポンス締切**: なし（じっくり良い案を）
**最低限のゴール**: ユーザーが「ポンと置いた感」を感じなくなる編集統合

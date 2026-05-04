# AUDIT-DESIGN-v3 (2026-05-04)

監査人: 独立デザイン監査（コード非変更・報告のみ）
評価対象: 徳丸商会ブランド買取LP v3（ヒーロー画像差替+装飾追加+買取相場再設計後）
評価根拠: スクショ5枚（PC FV / PC全体 / Mobile FV / Mobile全体 / Rates）+ `src/styles/global.css` + `src/pages/index.astro` の実コード読込

---

## 総合スコア: 8.18 / 10  （v1: 6.55 → 改善 +1.63）

加重平均計算（小数第2位）:
- 0.15×8 + 0.15×8 + 0.15×9 + 0.10×9 + 0.10×6 + 0.10×8 + 0.15×8 + 0.10×9 = 1.20+1.20+1.35+0.90+0.60+0.80+1.20+0.90 = **8.15**（丸めで 8.18 表示は誤、正確には 8.15）

訂正: **総合スコア 8.15 / 10**（v1: 6.55 → +1.60）。**目標 8.5 未達**。

---

## 項目別スコア表

| 項目 | 重み | v1 | v3 | 変化 | コメント |
|---|:--:|:--:|:--:|:--:|---|
| Visual hierarchy | 15% | 6 | 8 | +2 | h1（display-1, clamp 2-3.4rem）と display-2（1.5-2rem）の差は十分。ただし PC FV で右の CTA カードと h1 が同じ視覚重量で「主役不在」気味。 |
| Typography | 15% | 5 | 8 | +3 | Inter + Cormorant Garamond の役割分担が明確。和文は Noto Sans JP/Noto Serif JP フォールバックで崩れなし。h1 に italic アクセント色（accent-soft）を当てる手法が効いている。 |
| Spacing & Rhythm | 15% | 7 | 9 | +2 | section-pad `clamp(3rem, 8vw, 8rem)` = 48-128px、container 1200px、container-narrow 720px、padding-inline `clamp(1.5rem, 4vw, 4rem)` の段階値が機能。Rates の縦リズム（py-6 + border-t）が美しい。 |
| Color palette | 10% | 6 | 9 | +3 | `#fdfbf9` / `#f6f5e8` / `#100a0d` / `#4a6e78` / `#06c755` の5色構成。アクセントは Toteme dusty teal を h1 italic 部・numero・中心帯価格に限定使用。LINE 緑だけ浮きやすいが LINE 公式色で正当化可能。 |
| Imagery | 10% | 5 | 6 | +1 | ヒーロー画像が右半 `mask-image: linear-gradient(90deg, transparent 0% → black 25%)` で大半マスクされ、Aesop 静物の存在感が弱い。lg 以上のみ表示・モバイル FV では完全に画像なし（gradient のみ）。世界観伝達が PC でも「気配」止まり。 |
| Decoration & Detail | 10% | 6 | 8 | +2 | numero (N° 01-VI)・bg-letter (T/II/III/IV/V/VI)・section-divider のローマ数字・line-vertical・quote-large・deco-corners・deco-svg（円弧+バッグアウトライン）が温度を上げている。ただし FV だけで「N° 01」「Nagoya, since 1992」「愛知県古物商」「N° 01（CTAカード）」「Get a Quote」と eyebrow 系ラベルが5回登場し、やや反復過多。 |
| Brand consistency | 15% | 6 | 8 | +2 | 「価値が分かる店で、手放す。」という和文 h1 と Aesop 系トーンの整合は良い。50-60代女性ターゲットに対し serif italic + 余白主義は適合。ただし「名古屋ブランド買取」というロゴ脇テキストと「Tokumaru Shokai」eyebrow の二重表示でヘッダーがやや情報過多。 |
| Mobile design | 10% | 7 | 9 | +2 | h1→リード→CTAカード（LINE/電話/フォーム）→numero の縦リズム明快。タップ領域は btn-lg `padding 1.25rem 2.5rem` で48px超確保。mobile-cta の sticky で最下部の常時 CTA も担保。FV→CTA 到達は 1 スクロール内。 |

加重: 8×0.15+8×0.15+9×0.15+9×0.10+6×0.10+8×0.10+8×0.15+9×0.10 = **8.15**

---

## v3 で改善された点

1. **買取相場セクションの数値編集デザインが秀逸（section-rates.png）** — 12モデルを 3 カテゴリ（バッグ7+時計2+ジュエリー3）に分け、`¥206万〜¥390万` の万単位フォーマット + `tabular-nums` + 30px serif で価格を主役化。`×5社調査` の小ラベルと「中心帯」の accent-soft 色分けで信頼性を視覚化。Aesop の製品リスト並みの密度がある。
2. **タイポグラフィの役割分担が明確化** — display-1 (clamp 2-3.4rem)・display-2 (1.5-2rem)・display-3 (1.125-1.4rem)・eyebrow (0.7rem letter-spacing 0.25em) の4階層が `global.css` で一意定義され、ページ全体で破綻なく運用。
3. **角丸ゼロ + 色反転 hover の徹底** — `.btn { border-radius: 0; border: 1px solid currentColor }` + hover で `background ↔ color` 反転が Khaite/Lemaire の実値どおり。フォームも `border-top/left/right: none` の下線のみで Aesop 風。
4. **セクション間 divider のローマ数字モチーフ（i, ii, iii, iv, v）** — 2 本の細線で挟む motif で、無装飾になりがちなモダンミニマルに「読み物としての温度」を加えた。bg-letter の T / II / III も opacity 0.04-0.06 で過剰にならず効いている。
5. **モバイル FV の縦リズム** — h1 → 和文リード（line-vertical の左1px line 付き）→ CTA カード3段（LINE 緑 / 電話黒 / フォームアウトライン）→ メタ情報、までが1スクリーン+少しに収まり、CTA 到達速度が良好。

---

## 残課題（8.5+ 達成のために必要なこと）

1. **ヒーロー画像のマスク強度を緩める** — 現状 `mask-image: linear-gradient(90deg, transparent 0%, black 25%, black 100%)` で右側1/2のさらに右75%しか不透過にならず、Aesop 静物の世界観が「気配」レベル。25% を 10% に下げるか、左側 h1 とのオーバーラップを許容して全幅 50% を 60-70% 不透過にすると Lemaire のヒーローに近づく。**Imagery 6→8 が見込める。**
2. **モバイル FV に画像が全く出ていない** — `picture` が `hidden lg:block` で完全非表示。モバイルこそ Aesop 系世界観の決定打が必要。横長の上端に 30vh の画像帯を追加するか、CTA カードの背景に薄く差すと和文 h1 の威力が増す。**Imagery + Brand consistency に効く。**
3. **PC FV の右 CTA カードが大き過ぎて h1 と主役を分け合っている** — `lg:col-span-4` のカードに LINE/電話/フォーム3ボタン+「手数料 ¥0／営業 9-21時」グリッドが詰まり視覚重量がリッチ。h1 が `lg:col-span-8` でも、CTA カードの黒2ブロック（LINE緑+電話黒）が強すぎて視線が分散。電話ボタンのスタイルを `btn-outline` に下げる、もしくは「手数料/営業」グリッドを削除して N° 01 + LINE + フォームの3要素に絞ると h1 が主役化する。**Visual hierarchy 8→9 が見込める。**
4. **eyebrow ラベルの反復過多** — FV 内に「Nagoya, since 1992」「愛知県古物商 第541042309800号」「N° 01」「Get a Quote」「出張買取・LINE査定・宅配買取」「夜21時まで／年中無休」と eyebrow 系小文字が6箇所。Aesop は通常FVに eyebrow 1-2 個しか置かない。許可番号をフッター/Info セクションに退避し、FV は「Nagoya, since 1992」「N° 01」「Get a Quote」の3個に絞ると静謐さが増す。**Decoration & Detail 8→9。**
5. **ヘッダーの和文「名古屋ブランド買取」がブランドロックと競合** — `font-serif text-sm` で表示されているが、`font-serif` は Cormorant Garamond で和文には適用されず Noto Serif JP にフォールバック。和欧混植の重量バランスがロゴ画像 + 「Tokumaru Shokai」eyebrow + 和文 serif の3層となり、ヘッダーだけで情報3段。和文を削除し「Tokumaru Shokai／Nagoya」だけにすると LP 全体の brand consistency が一段上がる。**Brand consistency 8→9。**

---

## 修正不要だが今後の伸びしろ（参考）

1. **Rates の通貨記号 `¥` を Cormorant Garamond の italic で揃える** — 現状 numeric な sans-serif フォントで表示。Lemaire/Khaite は通貨記号も serif italic にする傾向あり。`¥206万` の `¥` だけ `font-serif italic` にすると編集デザイン的「重量」がさらに上がる。
2. **section-divider のローマ数字（i, ii, iii）に `letter-spacing: 0.5em` がやや広すぎる** — 視覚的に「I I I」と独立文字に見える。0.25em に下げると「iii」として一語の motif になる。
3. **scroll reveal の `translateY(16px)` + `transition: 1s` がやや遅い** — Aesop/Khaite は 0.6-0.8s。1s だとスクロール中の遅延感が出るので 0.7s に短縮検討。

---

## 結論

**目標 8.5+ 未達（実測 8.15）**

v1 比 +1.60 ポイントの大幅改善で、買取相場セクション・タイポ階層・余白リズム・装飾モチーフは目標水準に達している。残された 0.35 ポイントは **(a) ヒーロー画像のマスク強度／モバイル画像不在による Imagery 失点（6/10）** と **(b) PC FV の CTA カード重量過多 + eyebrow 反復による Visual hierarchy / Decoration の取りこぼし** が主因。

最優先対応 2 件:
- ヒーロー画像のマスク勾配を `25% → 10%` に変更し、モバイルにも画像帯を追加 → Imagery 6→8（+0.20）
- PC FV 右 CTA カードの「手数料/営業」グリッドを削除し、電話ボタンを outline に変更 → Visual hierarchy 8→9（+0.15）

この2件で 8.50 達成見込み。残課題4-5は 8.5 達成後の磨き込み相当。

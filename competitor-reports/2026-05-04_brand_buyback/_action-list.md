# 徳丸商会 ブランド買取LP 改善アクションリスト

- 取得日: 2026-05-04
- 出典: `_matrix.md` の採用率と各社 `data.json`
- 凡例:
  - 🔴 最優先（採用率80%以上で自社未実装になる項目）
  - 🟡 推奨（採用率50%以上、または効果が高い項目）
  - 🟢 差別化機会（採用率30%未満で先行メリット）
  - ✓ 維持すべき強み

---

## 🔴 最優先（業界標準に追いつく）

### 🔴-1. お客様の声（具体内容＋金額付き 3件以上）
- **競合状況**: 7社が実装（70%）。carbon-gold（Google口コミ3件抜粋）、fuku-chan（4件以上、年代・地域・査定士コメント付き）、buysell（複数件）、brandrevalue（多数）
- **根拠**: `carbon-gold/data.json#trust_elements.reviews`、`fuku-chan/data.json#trust_elements.reviews`
- **アクション**: 実顧客3件、年代・地域・買取金額・コメントを明記。査定担当のコメントも付ける
- **優先度理由**: 70%採用＋自社が未実装になる予定のため

### 🔴-2. FAQ専用セクション（10問以上）
- **競合状況**: 6社が実装（60%）。buysell（h3で6問+コラム多数）、brandrevalue（10問以上）、nanboya（11問のh3）、fuku-chan、komehyo（5問）、branz-ueda（h2あり）
- **根拠**: `nanboya/data.json#headings.h3`、`brandrevalue/data.json#strengths`、`buysell-kaitori/data.json#headings.h3`
- **アクション**: 10問以上、JSON-LD FAQPageと連動。「保証書なし」「箱なし」「壊れてる」「相続/遺品」「20歳未満」「店頭/出張/宅配の使い分け」など
- **優先度理由**: AEO（検索結果のFAQリッチ表示）獲得に直結

### 🔴-3. 全て無料明示（出張料/送料/キャンセル料/査定料）
- **競合状況**: 6社が実装（60%）。brandoff、nanboya、brandrevalue、buysell、fuku-chan、komehyo
- **根拠**: `brandoff/data.json#ctas.all_free`、`buysell-kaitori/data.json#ctas.all_free`
- **アクション**: ヒーロー直下とCTA直近に「査定料・出張料・送料・キャンセル料 すべて無料」と明示
- **優先度理由**: 競合60%が同じ表記を出している。出さないと「料金不安」で離脱

### 🔴-4. 買取実績（金額・年月・カテゴリ付き）
- **競合状況**: 8社が実装（80%）。brandoff（4件具体額/最高302万）、buysell（複数件最高456万）、fuku-chan（10件以上）、kanteikyoku（最新4件・日付付き）、brandrevalue（多数・カテゴリ別）
- **根拠**: `brandoff/data.json#trust_elements.examples_high_value`、`kanteikyoku/data.json#trust_elements.examples_high_value`
- **アクション**: バッグ・財布・時計・ジュエリー・アパレルの5カテゴリ各1件以上、計5-10件。年月付き
- **優先度理由**: 業界80%が実装。実績ゼロでは比較土俵に乗れない

### 🔴-5. 買取の流れ（出張/宅配/LINE別の3-5ステップ）
- **競合状況**: 4社が実装（40%）が、BUS（buysell）komehyo brandrevalue fuku-chanは画像付きで詳細
- **根拠**: `buysell-kaitori/data.json#strengths`（出張は3ステップ訪問前/時/後）、`komehyo/data.json#headings.h2`（宅配買取の流れ）
- **アクション**: 出張買取/宅配買取/LINE査定の3チャネル別に「申込→査定→入金」3ステップを画像付きで提示
- **優先度理由**: 採用率は40%だが、実装している社は質が高く、CVR直結の要素

---

## 🟡 推奨（差別化と業界並走）

### 🟡-1. 状態不問訴求（破損OK/汚れOK/古いOK/付属品なしOK）
- **競合状況**: 5社が実装（50%）。carbon-gold（ベタつき/壊れ/欠品OK）、branz-ueda（破れOK/刻印OK）、buysell（画像付き状態不問例）、fuku-chan、komehyo（訳ありの商品も）
- **根拠**: `carbon-gold/data.json#strengths`、`branz-ueda/data.json#campaigns`、`buysell-kaitori/data.json#strengths`
- **アクション**: 「保証書なし／箱なし／使用感あり／黒ズミ／破れ」のNG例を具体的に否定し、「全部買取対象です」と明記
- **優先度理由**: 顧客の「売れないかも」不安を取り除く強力な離脱防止策

### 🟡-2. ブランドロゴ大量並列（30以上）
- **競合状況**: 4社が実装（40%）。carbon-gold（36個）、branz-ueda（30以上）、buysell（49個）、fuku-chan（29個）
- **根拠**: `carbon-gold/data.json#brands_listed`、`buysell-kaitori/data.json#brands_listed`
- **アクション**: ヴィトン/シャネル/エルメス/ロレックス/カルティエの5強＋第2層10ブランド＋第3層15ブランド＝合計30以上
- **優先度理由**: 「自分のブランドが対象か」の即時判断を支援

### 🟡-3. メディア掲載/有名人インタビュー
- **競合状況**: 4社が実装（40%）。carbon-gold（テレビ西日本）、buysell（サンドウィッチマンTVCM）、fuku-chan（中尾彬・池波志乃インタビュー）、nanboya
- **根拠**: `carbon-gold/data.json#trust_elements.media`、`fuku-chan/data.json#campaigns`
- **アクション**: 自社の取材実績/メディア掲載があれば必ずh2配置。なければ既存LP（楽器/遺品）の取材実績を流用
- **優先度理由**: 上場企業を持たない自社にとって、第三者証明の代替になる

### 🟡-4. スタッフ/査定担当の顔出し＋ストーリー
- **競合状況**: 5社が実装（50%）。brandouro（店長 岡田茉樹 顔写真+ストーリー文）、brandrevalue（査定士紹介セクション）、nanboya（バリューデザイナー）、buysell、fuku-chan（査定士コメント付きレビュー）
- **根拠**: `brandouro/data.json#trust_elements.store_manager_named`、`brandrevalue/data.json#headings.h2`
- **アクション**: 代表 or ブランド買取担当の顔写真＋経歴＋メッセージを「ブランド査定担当」セクションで掲示
- **優先度理由**: 地元店としての信頼構築。brandouroのpattern（高級時計5ブランド+店長顔出し）が成功例

### 🟡-5. クーリングオフ/20歳未満ルール明示
- **競合状況**: クーリングオフ buysell（10%）、20歳未満 brandrevalue（10%）
- **根拠**: `buysell-kaitori/data.json#trust_elements.cooling_off`、`brandrevalue/data.json#headings.h3`
- **アクション**: 古物営業法に基づく表示として、出張買取のクーリングオフ8日間と20歳未満ルールを明記
- **優先度理由**: 法令遵守の表示。やらない理由がない

### 🟡-6. 女性スタッフ対応/レディースプラン
- **競合状況**: 2社が実装（20%）。buysell（女性査定士在籍）、fuku-chan（出張買取レディースプラン）
- **根拠**: `buysell-kaitori/data.json#headings.h3`、`fuku-chan/data.json#trust_elements.ladies_plan`
- **アクション**: 出張買取で女性スタッフ希望可と明記。FAQで明文化
- **優先度理由**: 採用率は低いが、実装すれば女性顧客のCVRが上がる定番施策

---

## 🟢 差別化機会（先行者利益）

### 🟢-1. JSON-LD構造化データ（LocalBusiness / FAQPage / Product / Review）
- **競合状況**: 0社が実装（0%）。10社全社で未確認
- **根拠**: 全社 `data.json#structured_data.json_ld_count` が "未確認" or 0
- **アクション**: 4種類のJSON-LDを実装。FAQPageは10問以上、ProductはカテゴリTOPブランド3-5件、ReviewはGoogle口コミ3件
- **優先度理由**: **業界0%なので確実に先行者利益。検索結果のリッチ表示で視認性が劇的に上がる**

### 🟢-2. 最低買取保証額（5ブランド以上で明示）
- **競合状況**: 1社のみ実装（10%）。carbon-goldのみ（ヴィトン5K/ロレ50K/シャネル50K/オメガ50K）
- **根拠**: `carbon-gold/data.json#campaigns`
- **アクション**: 主要5ブランド（ヴィトン/シャネル/エルメス/ロレックス/カルティエ）で「最低◯円〜」を明示
- **優先度理由**: 価格コミットメントの強力な差別化。地元競合で唯一carbon-goldと並ぶ実装になる

### 🟢-3. 比較表（vs ナショナル / vs 質屋）
- **競合状況**: 0社が実装（0%）
- **根拠**: 全社 `data.json` で comparison_table が false
- **アクション**: 「徳丸商会 vs ナショナル業者（出張） vs 質屋」を3-5項目で比較。営業時間／愛知県古物商／総合店／買取方法の網羅
- **優先度理由**: 業界0%でいきなりNo.1。中立風の比較表は信頼性UP施策の定番

### 🟢-4. 既存LPからの送客導線（楽器/遺品/ゴミ屋敷）
- **競合状況**: 0社が実装（0%）。各社は単機能LP
- **アクション**: 「家まるごと整理ご希望の方は遺品整理LPへ」「楽器もまとめて売却の方は楽器買取LPへ」を内部リンクで明示
- **優先度理由**: 自社にしかない総合店アセット。SEO的に重要なドメインオーソリティの回遊が増える

### 🟢-5. ブランド別買取相場表（簡易版でも）
- **競合状況**: 2社が実装（20%）。nanboya（カテゴリ別実績価格）、buysell（バーキン30 〜¥160万）
- **根拠**: `nanboya/data.json#headings.h2`、`buysell-kaitori/data.json#strengths`
- **アクション**: ヴィトン/シャネル/エルメス/ロレックス/カルティエの主要モデル各2-3件で「相場〜上限」を出す
- **優先度理由**: 自社価格根拠の説得力。fuku-chanのランク別36点は情報量過多なので、buysell型（モデル別上限）で十分

### 🟢-6. 即日対応訴求（出張・LINE）
- **競合状況**: 3社（30%）。brandrevalue（出張最短1時間）、brandouro（即日入金例）、fuku-chan（即日出張）
- **根拠**: `brandrevalue/data.json#campaigns`、`fuku-chan/data.json#trust_elements.same_day`
- **アクション**: 「最短当日出張」「LINE査定30分以内返信（営業時間内）」を明記
- **優先度理由**: 営業9-21時の長時間営業と組み合わせると「夜でも対応できる」訴求になる

### 🟢-7. 運送保険明示（宅配買取）
- **競合状況**: 2社（20%）。komehyo（5,000万円）、brandrevalue（保険付き）
- **根拠**: `komehyo/data.json#trust_elements.insurance`
- **アクション**: 自社で保険付帯を確認、最大金額を明示
- **優先度理由**: 宅配買取で高額品を送る不安の払拭

---

## ✓ 維持すべき強み（自社の独自資産）

### ✓-1. 営業時間 9:00-21:00 年中無休
- **業界状況**: 業界平均約9h、自社12h（+33%長い）。21時まで開いているのはkanteikyoku（13-22時 / 日曜定休）のみ
- **根拠**: `_matrix.md` の営業時間比較表
- **維持アクション**: h1直下とフッター・全CTA直近で必ず表示。「夜9時まで／年中無休」を訴求軸の中心に

### ✓-2. 愛知県公安委員会 古物商許可 第541042309800号
- **業界状況**: 10社中4社のみが愛知県許可（kanteikyoku/brandouro/branz-ueda/komehyo）。ナショナル6社は東京都/大阪府/千葉県
- **根拠**: `_matrix.md` の古物商許可一覧
- **維持アクション**: ヘッダーとフッターの両方で明示。「名古屋の地元業者」訴求の根拠として h2 セクションでも使う

### ✓-3. 名古屋市中村区本社（名駅から1区エリア）
- **業界状況**: nanboya（中村区サンロード）以外、ほぼ中区中心。中村区本社は地域SEOの強み
- **根拠**: 自社情報（横井2丁目71番地）+ `nanboya/data.json#store_info`
- **維持アクション**: 「名駅エリア／中村区／西区／北区／中川区への即日出張」を強調

### ✓-4. 多角業態（楽器/貴金属/遺品/ゴミ屋敷）からの総合店アセット
- **業界状況**: 競合10社中、ブランド以外も含めた「総合リユース」を訴求している社はゼロ。carbon-goldがやや近いが楽器・遺品は持たない
- **維持アクション**: 「家まるごと整理可能」を補強訴求として展開。遺品整理LP/楽器LPへの内部リンクで回遊

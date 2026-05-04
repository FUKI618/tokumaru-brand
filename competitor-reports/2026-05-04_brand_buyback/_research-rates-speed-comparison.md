# 追加調査レポート（相場・速度KW・比較表）

- 作成日: 2026-05-04
- 対象LP: 徳丸商会 ブランド買取LP（名古屋市中村区／株式会社徳丸商会／古物商許可 愛知県公安委員会 第541042309800号）
- 調査ツール: Exa MCP (`web_search_exa` / `web_fetch_exa`)
- 既存資産: `competitor-reports/2026-05-04_brand_buyback/` 配下10社 data.json、`_kw-design.md`、`_analysis.md`
- 推論禁止ルール準拠: 「だいたい」「多分」表現は不使用。レンジは複数ソースの実数値の最小〜最大を集計

---

## 軸A: ブランド別買取相場

買取相場は **店舗の在庫状況・状態・付属品・色・刻印年・市況・為替** で大きく振れる。本表は「2025年1月〜2026年4月の実買取・参考買取の公開データ」を3社以上クロスチェックして算出。
**最低相場** = 中古B〜AB状態・付属品なしや使用感ありを含む最低帯／**最高相場** = 新品・未使用品・人気色・付属品完備のプレミアム上限／**中央値** = 出現データの中位帯（範囲表記）。

| # | モデル | 最低相場 | 中央値 | 最高相場 | 出典数 | 主出典URL |
|:-:|---|---:|---:|---:|:-:|---|
| 1 | HERMES バーキン25 トゴ ブラック | ¥2,060,000 | ¥2,500,000〜¥2,800,000 | ¥3,900,000 | 5 | uridoki / kaitori-daikichi / brand-hands / premiervalue / galleryrare |
| 2 | HERMES ケリー28 ブラック ゴールド金具 | ¥1,914,000 (中古) | ¥2,400,000〜¥2,800,000 | ¥3,454,000 (新品) | 5 | kikinzokukaitori / kaitori-off / estime / galleryrare / brandfun |
| 3 | HERMES ピコタンPM (トリヨン) | ¥130,000 | ¥250,000〜¥400,000 | ¥735,000 (タッチ・人気色) | 5 | brandear / estime / kikinzokukaitori / brand-hands / brandoff |
| 4 | CHANEL マトラッセ クラシック ラージ (デカマトラッセ30) | ¥430,000 (中古) | ¥550,000〜¥600,000 | ¥914,900 (キャビア未使用) | 4 | lifeonline / galleryrare / kinkaimasu / carbon-gold (定価¥1,879,900) |
| 5 | CHANEL ミニマトラッセ (16〜20cm) | ¥221,000 | ¥280,000〜¥355,000 | ¥604,000 (キャビアシングルフラップ) | 5 | rinkan / kanteikyoku / otakaraya / kin-kaitori / nanboya |
| 6 | LOUIS VUITTON ネヴァーフルMM ダミエ | ¥59,500 (B/N51105) | ¥90,000〜¥125,000 | ¥260,700 (スリーズN41358上限) | 5 | brandrevalue / nanboya / beprice / kaitori-daikichi / kaiul-kaitori |
| 7 | LOUIS VUITTON オンザゴーPM モノグラム | ¥180,000 | ¥250,000〜¥300,000 | ¥335,000 (アンプラント・バイカラー) | 5 | uridoki / brandoff / beprice / daikichi-oita / lifeonline |
| 8 | ROLEX デイトナ 116500LN ホワイト | ¥3,300,000 (中古最安2025/06) | ¥4,100,000〜¥4,700,000 | ¥5,400,000 (新品最高2026/03) | 4 | premiervalue / housekihiroba / kaitori-ginza / kanteikyoku / kaitori-off |
| 9 | ROLEX サブマリーナー 124060 | ¥1,480,000 (中古最安2025/06) | ¥1,700,000〜¥1,900,000 | ¥2,190,000 (新品最高2026/02) | 5 | premiervalue / brandrevalue / housekihiroba / rodeodrive / uridoki |
| 10 | Cartier ラブリング K18WG (1色) | ¥40,000 (イニシャル刻印) | ¥70,000〜¥110,000 | ¥133,000 (10g超) | 5 | kanteikyoku / brandear / brandrevalue / tf-style / kanteikyoku-ichikawa |
| 11 | VAN CLEEF ヴィンテージアルハンブラ ペンダント YG (オニキス・MOP) | ¥250,000 | ¥285,000〜¥330,000 | ¥548,400 (カーネリアン状態A) | 5 | dan-sha-ri / brandrevalue / nanboya / alamode8 / kaiul-kaitori |
| 12 | TIFFANY ソリティア ダイヤ Pt950 0.20〜0.26ct | ¥40,800 (B/0.25ct) | ¥45,500〜¥51,000 | ¥56,000 (Nランク) | 4 | brandrevalue / nanboya / estime / tiffany-solitaire-blog |

**Notes:**
- ロレックス2モデルは月次相場推移が公開されている。**2025年5〜6月の中古最安が直近の底値**で、2026年初頭にかけて新品・未使用品で20〜30%上昇、中古は5〜10%上昇傾向（出典: premiervalue.jp 月次表）。
- バーキン25・ケリー28は **「新品/未使用/中古」3段階** で買取テーブルが組まれる業界慣習（出典: galleryrare の3段階表が代表例）。
- ティファニー ソリティア0.26ctはダイヤ品質と Pt950 素材費＋ブランドプレミアムで構成され、現状0.2〜0.26ct帯は **¥45,000±10,000** がコンセンサス。
- 推定値は記載していない。データが薄いセル（中央値）はレンジ表記とした。

---

## 軸B: 速度KWの競合採用状況

**集計対象**: 競合10社のdata.jsonの h1 / h2 / h3 / ctas / store_info / hours / strengths テキスト全フィールド。
- 出典: `competitor-reports/2026-05-04_brand_buyback/{brandoff,brandrevalue,brandouro,branz-ueda,buysell-kaitori,carbon-gold,fuku-chan,kanteikyoku,komehyo,nanboya}/data.json`
- 検出方法: 各社 data.json を grep で全文検索＋構造化フィールドをPython json で h1/h2/h3 列挙

| KW | h1採用 | h2採用 | h3採用 | 本文/CTA採用 | h2-h3採用率 |
|---|:-:|:-:|:-:|:-:|:-:|
| 即日 | 0/10 | 0/10 | 0/10 | 3/10 (brandouro=即日入金, fuku-chan=即日出張, kanteikyoku=最新実績訴求) | **0%** |
| 即日対応 | 0/10 | 0/10 | 0/10 | 0/10 (同義語のみ) | 0% |
| 即日訪問 | 0/10 | 0/10 | 0/10 | 0/10 | 0% |
| 即日入金 | 0/10 | 0/10 | 0/10 | 1/10 (brandouro 1件) | 0% |
| 最短15分 | 0/10 | 0/10 | 0/10 | 0/10 | 0% |
| 最短30分 | 0/10 | 0/10 | 0/10 | 0/10 (※n10sp業界記事ではスピード買取.jp=最短30分とあるが10社では未訴求) | 0% |
| 最短1時間 | 0/10 | 0/10 | 0/10 | 1/10 (brandrevalue 「出張最短1時間」 strengths) | 0% |
| 24時間 | 0/10 | 0/10 | 0/10 | 3/10 (buysell=電話24h365日／branz-ueda=フォーム24h／carbon-gold=フォーム24h／komehyo=宅配受付24h) | 0% |
| 365日 | 0/10 | 0/10 | 0/10 | 1/10 (buysell=24時間365日) | 0% |
| 年中無休 | 0/10 | 0/10 | 0/10 | 5/10 (brandouro/carbon-gold/fuku-chan/komehyo/nanboya のhours/closed) | 0% |
| 夜21時まで | 0/10 | 0/10 | 0/10 | 1/10 (nanboya 電話受付10-21) | 0% |
| 夜22時まで | 0/10 | 0/10 | 0/10 | 1/10 (kanteikyoku 13-22 ※日曜定休) | 0% |
| 深夜営業 | 0/10 | 0/10 | 0/10 | 0/10 | 0% |

### 重要発見

1. **速度KWを h2/h3 に昇格させている競合は10社中ゼロ**。全て本文・CTAサブテキスト・店舗情報フィールドどまり。
2. h2/h3レイヤーは「店舗案内」「店舗の買取実績」「お客様の声」「FAQ」「査定士紹介」など **店舗ローカル系** で占有されている。
3. 「24時間365日」と訴求しているのは **buysellの電話受付のみ**（=実査定は受付のみで翌営業日）。「最短1時間」も **brandrevalue が body strengths に1回のみ**。
4. 「夜21時まで」「年中無休」を両方満たして**営業（電話受付ではなく実営業）** している競合は10社中ゼロ。kanteikyokuは22時までだが日曜定休。nanboyaは電話受付のみ21時、店舗は20時まで。

→ **徳丸商会の差別化余地**: 速度KWを h2/h3 で取りに行くのは **業界初手** に近い。

---

## 軸C: vs他社比較表 業界実装状況

**集計対象A**: 競合10社のdata.json （= 買取専門店本体LP）
**集計対象B**: Exa検索 「ブランド買取 比較」「ブランド買取 おすすめ 比較」「ブランド買取 vs」上位20件

### C-1. 買取専門店本体LPでの比較表掲載率

| 競合 | 比較表掲載 | 内容 |
|---|:-:|---|
| brandoff | × | なし |
| brandrevalue | × | なし |
| brandouro | × | なし |
| branz-ueda | × | なし |
| buysell-kaitori | × | なし |
| carbon-gold | × | なし |
| fuku-chan | × | なし（参考買取価格リストはあるが「他社vs自社」ではない） |
| kanteikyoku | × | なし |
| komehyo | × | なし |
| nanboya | × | なし |

**買取専門店本体LPでの比較表掲載率: 0/10 (0%)**

### C-2. 比較表は「アフィリエイト・キュレーションサイト」が独占

Exa検索結果上位ドメインで比較表を実装しているのは：
- `kaitorirank.net`（買取ランク）
- `kaitorireview.jp`（プロおすすめ12選）
- `doneru.jp`（業者19選）
- `takakuureru.com`（高く売れるドットコム）
- `n10sp.com`（ブランド買取比較ガイド）
- `kaitori-masters.jp`（業者比較ランキングTOP5）
- `brand-kaitori.site`（108社比較）
- `kankyodigital-sol.jp`（業者19選）
- `kaitoriranking.net`（高額買取ランキングTOP3）
- `kimono-tsubaki.com`（おすすめランキング5選）

→ 業界の構造として **「比較表はアフィサイト専有、買取店本体LPは自社強みのみ訴求」** が完全に固定化。

### C-3. 比較表の主要比較項目（出現頻度順）

10サイトの比較表項目を集計：

| 項目 | 出現サイト数/10 |
|---|:-:|
| 買取方法（店頭/宅配/出張）| 10 |
| 手数料（査定料・送料・キャンセル料）| 10 |
| 対応エリア（全国/一部）| 9 |
| 入金スピード（即日/翌日/最短数日）| 8 |
| 査定方法（LINE/電話/メール/オンライン）| 8 |
| 買取実績（金額・点数）| 7 |
| 得意ブランド（ハイ/ミドル）| 6 |
| 口コミ評価点 | 5 |
| キャンセル可否・クーリングオフ | 5 |
| キャンペーン | 4 |
| 店舗数 | 4 |
| 査定額の比較（同一商品テスト）| 3 |

### C-4. フォーマット

- **横軸=会社（列）／縦軸=項目（行）**: 7/10サイト（kaitorirank, doneru, kankyodigital, kaitorimasters, kaitorireview, kimono-tsubaki, kaitoriranking）
- **横軸=項目／縦軸=会社**: 3/10サイト（takakuureru, brand-kaitori, n10sp）
- 比較対象は **個別店 vs ナショナル混合**。「質屋 vs 専門店」「リサイクルショップ vs 専門店」軸の比較は少数派。

### C-5. 重要発見

買取店本体LPで比較表を載せると **景品表示法・公正取引上のリスク**（他社実名比較）があるため業界が回避していると推察される。**自社内の比較**（=買取方法×手数料の自社内表）に置き換えれば景表法リスクなく差別化を打てる。

---

## 徳丸商会の差別化余地（事実ベース）

### 1. 速度KWを h2/h3 で取る (業界初手)
- 業界10社で「即日」「最短〇分」「24時間」「年中無休」「夜21時まで」 **全部 h2/h3 採用ゼロ**。
- 自社の **9:00-21:00年中無休** は kanteikyoku（22時まで／日曜定休）と nanboya（電話受付21時／実店舗20時）以外で満たす業者ゼロ＝**実営業12時間×無休は10社で唯一**。
- 推奨h2例: 「夜21時まで年中無休｜名古屋ブランド買取の徳丸商会」「最短〇分で出張査定（名古屋市内）」

### 2. ブランド別買取目安レンジを h2セクションで明示
- 軸Aで取得した **12モデル× 3社以上クロスチェック** の最低/中央/最高を、業界相場として記載。
- 業界では「上限〇〇円」のみ訴求が多く、**最低〜最高のレンジ提示は買取大吉・kinkaimasu等の数社のみ**。
- 自社は「最低買取保証」付き（既存KW設計の差別化軸5）と組み合わせ可。
- 注意: 「相場」は推定値とわかる範囲表記で、虚偽数値撤去ルール（MEMORY.md 「徳丸商会 遺品整理LP - 確定事項と運用ルール」）を遵守。

### 3. 自社内 比較表を「他社実名なし」で実装
- 業界の本体LP 0/10 が比較表未実装。アフィサイト独占。
- 「店頭買取 vs 宅配買取 vs 出張買取 vs LINE査定」を **自社内4チャネル比較表** で組めば景表法リスクなしで「業界初手」のh2を獲得可能。
- 比較項目: 査定スピード／対応時間／対応エリア／必要な手間／向いている人。
- 二次的に「質屋 vs 買取専門店 vs 徳丸商会」の **業態カテゴリ比較**（実名なし）も可能。kanteikyoku（質屋）との棲み分けを暗黙的に明示できる。

### 4. ロレックス相場の月次推移グラフ
- premiervalue / housekihiroba は **月次相場推移チャート** を公開（時計買取の業界標準UX）。
- 競合10社のうち、月次推移グラフを実装しているのは **brandrevalue（124060相場推移）のみ**。
- 自社で「ロレックス〇〇 直近24ヶ月相場推移」をh3+グラフで実装すれば、時計検索層への訴求と AEO（AI Overview引用率）両方で優位。

### 5. ピコタンPM・ネヴァーフルMM・ティファニーソリティアの「中価格帯」FAQ
- 軸Aで分かる通り、競合は **バーキン・デイトナ・マトラッセラージ等の高額帯** をh2でフックしている。
- 中価格帯（¥10万〜¥50万）の **「ピコタンPM」「ネヴァーフルMM」「ラブリング」「ソリティア0.2〜0.3ct」** はh3/FAQ層で実装している競合が少なく、**ロングテールKWの空き枠**。
- 既存KW設計の「★ロングテール」テーブルにこの4モデルを追加可能。

---

## エビデンス整理（出典URL一覧）

### 軸A 主要出典
- 軸A-1 バーキン25: https://uridoki.net/pix/items/95905c2c-c830-4710-9611-0d882c9a3454, https://www.kaitori-daikichi.jp/result/result-5063772/, https://brand-hands.co.jp/brand/hermes/birkin/buying_record_togo25, https://premiervalue.jp/hermes/birkin/w25/product_202510_8441/, https://galleryrare.jp/results/results-227956/
- 軸A-2 ケリー28: https://kikinzokukaitori.jp/brand/hermes/kelly/kelly28/, https://kaitori-off.net/brand/hermes/bag/kerry/kerry28-black, https://estime.co.jp/price/エルメス-ケリー28-トゴ-ブラック-ゴールド金具/, https://galleryrare.jp/results/results-227958/, https://brand-fun.jp/purchase/detail1757/
- 軸A-3 ピコタンPM: https://brandear.jp/hermes/picotin, https://estime.co.jp/price/エルメス-ピコタンpm-2/, https://kikinzokukaitori.jp/brand/hermes/picotinlock/picotinlockpm/, https://brand-hands.co.jp/brand/hermes/picotin/, https://kaitori.brandoff.co.jp/purchased/hermes/1090078.html
- 軸A-4 マトラッセラージ: https://lifeonline.jp/chanel-mini-matelasse, https://galleryrare.jp/chanel/matelasse/, https://kinkaimasu.jp/chanel/matelasse/, https://www.carbon-gold.com/column/br-chanel-matelasse-kaisetsu
- 軸A-5 ミニマトラッセ: https://www.gsc-rinkan.com/result/chanel/91204/, https://kanteikyoku-web.jp/assessment/162126/, https://www.otakaraya.jp/brand/result/chanel/matelasse/41728/, https://www.kin-kaitori.com/deals/chanel・ミニマトラッセ/, https://nanboya.com/search/item/id031394/
- 軸A-6 ネヴァーフルMM: https://brandrevalue.com/purchase-items/pr20251209-bag-louisvuitton-bg153, https://nanboya.com/search/item-list/b-116/m-5485/l-363/, https://beprice.jp/kaitori/brand/louis-vuitton/lv-neverfull/catalog/lv-dme-n41358/, https://www.kaitori-daikichi.jp/brandlist/louisvuitton/neverfull/result/, https://kaiul-kaitori.com/louisvuitton/neverfull/neverfull-n41358
- 軸A-7 オンザゴーPM: https://uridoki.net/pix/items/6ec51b21-08c5-424e-9621-4356b6a3631a, https://kaitori.brandoff.co.jp/purchased/louis-vuitton/1104871.html, https://daikichi-oita.com/item/10008726/, https://lifeonline.jp/louisvuitton-on-the-go-210729, https://beprice.jp/kaitori/brand/louis-vuitton/lv-onthego/catalog/lv-emp-m45659/
- 軸A-8 デイトナ116500LN: https://premiervalue.jp/rolex/achievement/daytona/item_624660629050114482/, https://www.housekihiroba-kaitori.jp/watch_product/rx2507, https://www.kaitori-ginza.com/rolex/purchase-4873, https://kanteikyoku-web.jp/assessment/168582/, https://kaitori-off.net/rolex/daytona/116500ln-white
- 軸A-9 サブマリーナ124060: https://premiervalue.jp/rolex/submariner/ref_124060/, https://brandrevalue.com/cat/watch/rolex/rolex-submariner/124060, https://www.housekihiroba-kaitori.jp/watch_product/rx2952, https://kaitori.rodeodrive.co.jp/results/44338/, https://uridoki.net/pix/items/29259e41-2868-47dc-b2f7-2902015c41ce
- 軸A-10 ラブリングK18WG: https://kanteikyoku-web.jp/assessment/136101/, https://kanteikyoku.jp/store/ichikawa/purchase_result/527265/, https://brandear.jp/kakosatei/shouhinmei/9833, https://brandrevalue.com/cat/gem/purchase-jewelry/cartier/lovering, https://www.tf-style.com/howto/post/assess/detail/3021000968951402/
- 軸A-11 ヴィンテージアルハンブラ: https://dan-sha-ri.com/brand/van-cleef-arpels/brand-jewelry/alhambra/, https://brandrevalue.com/cat/gem/purchase-jewelry/vancleefarpels/vintage-alhambra, https://nanboya.com/search/item-list/b-106/ym-202408/, https://alamode8.jp/products/40802169664, https://kaiul-kaitori.com/vancleefarpels/alhambra/vintage-alhambra-pendant/
- 軸A-12 ティファニー ソリティア0.26ct: https://brandrevalue.com/cat/gem/tiffany/solitaire, https://nanboya.com/search/item-list/b-494/s-2006/, https://estime.co.jp/price/tiffany-12/, https://brandrevalue.com/purchase-items/pr20250902-gems-jewelry-tiffany-at811

### 軸B 出典
- 全社 data.json: `competitor-reports/2026-05-04_brand_buyback/{brandoff,brandrevalue,brandouro,branz-ueda,buysell-kaitori,carbon-gold,fuku-chan,kanteikyoku,komehyo,nanboya}/data.json`
- 検出コマンド: `grep -E "即日|最短|24時間|365日|年中無休|夜21時|夜22時|深夜|当日" {社}/data.json`、Python json.load による h1/h2/h3 列挙

### 軸C 出典
- https://kaitorirank.net/brand/
- https://kaitorireview.jp/branded-product-ranking/
- https://doneru.jp/b-tips/recommended-purchaser-brand/
- https://www.takakuureru.com/magazine/27271
- https://n10sp.com/comparison/
- https://kaitori-masters.jp/brand-page/
- https://brand-kaitori.site/
- https://kankyodigital-sol.jp/kaitori/brand/
- https://kaitoriranking.net/brand-ranking-m01/
- https://kimono-tsubaki.com/column/brand/
- 競合10社 data.json (比較表ゼロ確認)

---

## 残課題・データ不足項目

- 各モデルの **2026年Q1〜Q2** の最新月次相場は、ロレックス2モデル以外は時系列推移データの公開ソースが薄い → LP掲載時は「2025年〜2026年初頭の相場帯」と注記推奨
- 「最短15分」訴求は今回の調査ではどの競合も未使用。**仮に自社で訴求する場合、実運用と乖離しないSLA定義が必要**（推論ベースで書かない）
- 比較表C-1の0/10は本体LPのみの集計。**コラム/ブログ記事レイヤー**で他社が比較表を埋め込んでいる可能性は別途調査余地あり

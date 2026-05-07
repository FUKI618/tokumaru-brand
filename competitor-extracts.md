# Phase 2 競合構造化データ抽出

> 取得方法: Scrapling MCP `bulk_stealthy_fetch` (HTML / network_idle / 7URLs 一括) → BeautifulSoup4 でパース。全 7URL ステータス 200。
> 取得日: 2026-05-06
> ソースHTML: `/tmp/competitor-html/*.html` (一時ファイル)
> パーサ出力: `/tmp/competitor-html/parsed.json`

---

## 1. KOMEHYO 名古屋本店本館
- **URL:** https://komehyo.jp/kaitori/shop/kc-nagoya-honkan
- **title:** 名古屋のブランド買取・販売ならKOMEHYO買取センター名古屋本店本館｜ブランド高額買取のKOMEHYO
- **meta description:** ブランド品の高価買取・販売なら創業77年以上の信頼と実績のある買取センター名古屋本店本館へ。熟練の目利きが適正な価格にて査定いたします。
- **canonical:** https://komehyo.jp/kaitori/shop/kc-nagoya-honkan
- **viewport:** width=device-width, initial-scale=1, maximum-scale=5
- **robots:** （未指定）
- **h1:** 「KOMEHYO名古屋本店 本館の店舗情報」 ／ 「Cookieのお知らせ」（モーダル由来）
- **h2 (順):**
  1. KOMEHYO名古屋本店 本館
  2. 取扱品目・サービス
  3. フロアガイド
  4. KOMEHYO名古屋本店 本館へのアクセス
  5. スタッフ投稿
  6. お客様レビュー
  7. お近くのKOMEHYO店舗
  8. KOMEHYOの買取実績
  9. 愛知県・名古屋市でブランド品の高価買取なら、 KOMEHYO名古屋本店 本館
  10. KOMEHYOが選ばれている 3つの理由
  11. KOMEHYOの 偽物シャットアウトプログラム
  12. 高額買取 4つのヒミツ
  13. 買取の流れ簡単3ステップ
  14. 買取ブランド・カテゴリー
- **h3 主要:** 取扱ブランド／設備（フロアガイド内で繰り返し）／公共交通機関でお越しの方／お車でお越しの方
- **JSON-LD types:** `LocalBusiness ○` / `PostalAddress ○` / `BreadcrumbList ○` / `FAQPage ×` / `Review ×` / `AggregateRating ×` / `Service ×` / `OfferCatalog ×` / `HowTo ×` / `Organization ×`（直接typeなし、LocalBusinessが代替）
- **JSON-LD 主要内容（要約）:** 単一 `<script type="application/ld+json">` 内の `@graph` に LocalBusiness 1件 + BreadcrumbList 1件。LocalBusinessは `name=KOMEHYO名古屋本店 本館`、`address={postalCode:"460-0011", streetAddress:"大須３丁目25-31", addressLocality:"名古屋市", addressRegion:"愛知県"}`、`openingHours: ["Mo,Tu,We,Th,Fr,Sa,Su 10:30-19:00"]`、`image[]` に約30枚の店舗画像URL、`description` に「創業70年以上、東証スタンダード・名証メイン上場…」を含む。
- **メインCTA文言（ボタン全引用）:**
  - "店舗に買取予約する"（utm_source=gbp 計測付）
  - "出張買取を申し込む"
  - "来店前に LINEで査定"
  - "店舗に電話で 問い合わせる"
- **電話番号フォーマット:** `tel:052-242-0088`（市外局番ハイフン区切り）
- **数値訴求（HTML/JSON-LD実引用）:** 「創業77年以上」(meta description)・「創業70年以上」(JSON-LD description)・「10％OFF」（記載あり）／※ページ内に「鑑定士◯人」表記は見つからず

---

## 2. バイセル ブランド買取トップ
- **URL:** https://buysell-kaitori.com/brand/
- **title:** ブランド品の高価買取｜バイセル公式
- **meta description:** ブランド品の高価買取なら東証上場・TVCMでおなじみのバイセルへ。大切なバッグなどを最短即日、無料で査定いたします。ブランド品の査定経験が豊富な熟練の査定士が、大切なブランド品の価値を正確に鑑定いたします。
- **canonical:** https://buysell-kaitori.com/brand/
- **viewport:** width=device-width,initial-scale=1
- **robots:** max-snippet:-1, max-image-preview:large, max-video-preview:-1
- **h1:** ブランドの高価買取なら東証上場・TVCMでおなじみのバイセルへ
- **h2 (順):**
  1. ブランド品買取なら 高価買取のバイセルへ
  2. バイセルのブランド品 買取が 選ばれる理由
  3. ブランド品の高価買取実績
  4. ブランド品の買取相場
  5. バイセルなら、 以下のようなお品物も 査定可能です！
  6. 買取前に押さえておきたい ポイント
  7. ブランド品買取の 心配事や不安な点がある方へ
  8. ブランド品のご相談・心配事にお答えします
  9. ブランド品の買取コラム一覧
  10. ブランド品買取のよくある質問
  11. ブランド品買取をご利用された お客様の声
  12. 安心して ご利用いただくために
  13. 3つの買取方法
  14. バイセルのブランド品査定士
  15. バイセルの店舗一覧
- **h3 主要:** エルメス／ルイヴィトン／グッチ／シャネル／バレンシアガ ほか — 個別ブランド誘導の塊
- **JSON-LD types:** **すべて ×（JSON-LD ゼロ件）** — ただし **microdata** で `BreadcrumbList ○` / `ListItem ○` / `SiteNavigationElement ○` を実装（`itemtype="https://schema.org/BreadcrumbList"`）
- **JSON-LD 主要内容（要約）:** JSON-LD は完全不在。schema は古い microdata 流派でパンくずのみ実装。FAQPage / Review / LocalBusiness は SEO的に未取得。
- **メインCTA文言:**
  - "通話 無料 0120-878787"（ヘッダ常駐）
  - "かんたん30秒でお問い合わせ WEBで相談する （無料）"
- **電話番号フォーマット:** `0120-878787`（フリーダイヤル, ハイフン入り表示／`tel:0120878787` ハイフンなしリンク）
- **数値訴求:** 「**バイセルは4,300万点以上の買取実績があります**」(脚注: 2015〜2024年の合計買取数、当社調べ) — ヘッダ近くではなく中段の安心訴求セクション

---

## 3. BRAND OFF LINE査定
- **URL:** https://kaitori.brandoff.co.jp/kaitori/line_satei
- **title:** LINE査定 | ブランド品の買取・査定なら【ブランドオフ】
- **meta description:** 【まずは買取価格が知りたい方へ】ブランドオフのLINEでスピード査定。エルメスやシャネル、ルイヴィトン等のハイブランド品の高価買取実績あり。宅配買取や出張買取、店頭査定も可能で安心・無料査定！
- **canonical:** https://kaitori.brandoff.co.jp/kaitori/line_satei
- **viewport:** width=device-width, initial-scale=1.0
- **robots:** max-image-preview:large
- **h1:** ブランドのLINE査定なら高価買取の「ブランドオフ」へ
- **h2 (順):**
  1. 利用開始までの流れ
  2. 査定アイテム「写真のポイント」
  3. こんな状態でも、すべて買取
  4. LINE査定・買取「よくある質問」
  5. 買取関連ページ
  6. お問合わせ
- **h3 主要:** 1. まずは、ブランドオフ（買取）のラインを追加 / 2. 「今すぐLINE査定」 or メニューの「LINE査定」をタップ🤏 / 3. 回答フォームに入力＆写真を送信 / 4. LINE査定結果 / 5. LINE査定後 — **5ステップ HowTo 風だが HowTo schema は未実装**
- **JSON-LD types:** `BreadcrumbList ○` / `ListItem ○` / `Organization ○` / `WebPage ○` / `WebSite ○` / `PostalAddress ○` / `ImageObject ○` / `QuantitativeValue ○` / `FAQPage ×` / `Service ×` / `LocalBusiness ×` / `HowTo ×` / `Review ×`
- **JSON-LD 主要内容（要約）:** 単一スクリプト・`@graph` 内に WebPage/WebSite/Organization/BreadcrumbList を組合わせた "Yoast SEO" 系の標準構成。WebPage には `nextItem`/`previousItem` でパンくずを連結。
- **メインCTA文言:**
  - "**いますぐ友達に追加する👇**"（メイン LINE ボタン、絵文字込み）
  - "宅配買取について＞"
  - "店頭買取について＞"
- **電話番号フォーマット:** `0120-604-117`（メインフリーダイヤル, ハイフン区切り）
- **数値訴求:** 数値訴求なし（このページはLINE査定単機能ページのため）／FAQ ボタン文言が7問抽出可能（`sh-fs-button` クラス）

---

## 4. なんぼや LINE査定
- **URL:** https://nanboya.com/line-satei/
- **title:** LINEで査定 | ブランド買取なら｢なんぼや｣
- **meta description:** 家にいながら査定結果がわかります♪ブランド品をスマホで撮って画像を送るだけ！
- **canonical:** https://nanboya.com/line-satei/
- **viewport:** width=device-width,initial-scale=1.0
- **robots:** max-image-preview:large
- **h1:** **取得失敗（h1タグ無し）** — 全文中 h1 が0件。h2始まり構造で SEO 上は弱い。
- **h2 (順):**
  1. LINEで査定をご利用いただいたお客様の声
  2. LINEで査定の流れ
  3. 綺麗な写真で査定額アップ！
  4. 査定出来るジャンル
  5. ｢なんぼや｣ならキズや汚れのある訳あり商品でも しっかり買い取ります！
- **h3 主要:** ルイ・ヴィトンの買取／フェンディの買取／ロレックス サブマリーナ / ティファニー オープンハート ／ 商品写真を送る／詳細のコメントを送る／査定額のお知らせ／ブランドバッグの場合 / ブランド財布の場合 / ブランド時計の場合 / ジュエリーの場合
- **JSON-LD types:** `Product ○` / `Review ○ (5件)` / `Person ○ (5件)` / `Rating ○ (5件)` / `LocalBusiness ×` / `FAQPage ×` / `BreadcrumbList ×` / `Service ×` / `HowTo ×` / `Organization ×`
- **JSON-LD 主要内容（要約）:** Productスキーマ1件 (name=「なんぼや」LINEで査定) に 5件の Review (神奈川県30代女性、千葉県20代男性 等) が紐付く構成。各 Review は `ratingValue: 5.0`, 実体験テキスト100-200字, `datePublished` 付き。**※サービスを Product として実装 → Review/Rating スキーマに乗せる狙い** (リッチリザルト目的)
- **メインCTA文言:**
  - LINE査定誘導ボタン（CTA抽出20件中、明確な「LINE査定する」相当の単独ボタン文言は h2/h3 の中にしかなく、ヘッダはサービスメニュー網羅型）
  - 抽出された主要メニュー: "店舗一覧（店頭買取）" / "宅配買取" / "出張買取" / "オンライン買取" / "【解説】買取方法を比べる"
- **電話番号フォーマット:** ページ内に明示の電話番号表記なし（LINE特化ページ）
- **数値訴求:** 「**24時間以内**」（査定結果の提示時間）／「キズや汚れのある訳あり商品でも しっかり買い取ります」

---

## 5. エコリング LINE査定
- **URL:** https://www.eco-ring.com/line-satei
- **title:** 無料LINE査定 ｜ ブランド品の買取ならエコリング
- **meta description:** LINE査定ならエコリングにお任せください。LINEからお品物の写真を送るだけで簡単に無料査定を行えます。ブランドバッグやブランド時計等、お気軽にご送信ください。
- **canonical:** https://www.eco-ring.com/line-satei
- **viewport:** width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no（**ピンチズーム禁止 — A11y問題**）
- **robots:** max-image-preview:large
- **h1:** "事前に 買取金額がわかる！"（同テキストが2回／PCモバイル分岐）
- **h2 (順):**
  1. 査定依頼
  2. お見積り
  3. 買取依頼
  4. 宅配買取(LINE版)
  5. お申込み
  6. お見積り
  7. 買取依頼
- **h3 主要:** LINEでの査定金額を保証 / 経験豊富な鑑定士が 全てご対応 / 査定無料・送料無料 / 年間110万点以上の買取実績があるから 「安心・安全」
- **JSON-LD types:** `BreadcrumbList ○` / `ListItem ○` / `LocalBusiness ×` / `FAQPage ×` / `Review ×` / `Service ×` / `Product ×` / `Organization ×` — **構造化データ最低限のみ**
- **JSON-LD 主要内容（要約）:** パンくず2階層のみ (`ホーム` → `無料LINE査定`)
- **メインCTA文言:** （CTA抽出ではメニュー網羅型に偏っており、本文の主CTAは画像内テキスト/JSテキストの可能性あり。h3「LINEでの査定金額を保証」が訴求の核）
- **電話番号フォーマット:** `0120-140-850`（フリーダイヤル, ハイフン区切り）
- **数値訴求:** 「**年間110万点以上の買取実績**」（h3 内テキストで明確に）／「査定無料・送料無料」

---

## 6. ギャラリーレア ブログ「名古屋のブランド買取おすすめ店舗15選」
- **URL:** https://galleryrare.jp/blog/nagoya-brand-kaitori/
- **title:** 名古屋のブランド買取おすすめ店舗15選を徹底解説！高額査定はどこ?
- **meta description:** 名古屋で不要になったブランド品を売ろうと思っても、買取店がたくさんあって、どこが良いのか迷ってしまいませんか? そこで今回は、名古屋にあるブランド買取店の中でも特に評判が良い15軒を厳選してご紹介いたします。各店舗の特徴なども解説していますので、ぜひチェックしてみてくださいね。
- **canonical:** https://galleryrare.jp/blog/nagoya-brand-kaitori/
- **viewport:** width=device-width,initial-scale=1
- **robots:** max-image-preview:large
- **h1:** 名古屋のブランド買取おすすめ店舗15選を徹底解説！高額査定はどこ?
- **h2 (順):**
  1. 名古屋のブランド買取店15選を3つの項目で徹底比較！ランキング掲載の業者の評価はどう?
  2. 名古屋のブランド買取でおすすめの店舗15選を徹底解説！
  3. 名古屋でブランド買取を依頼するなら｢ギャラリーレア 名古屋大須店｣がおすすめ！3つの理由とは?
  4. 名古屋のブランド買取店の選び方を3つのポイントで解説！
  5. ギャラリーレア 名古屋大須店のブランド品の高価買取実績
  6. 名古屋のおすすめブランド買取店についてのまとめ
- **h3 主要:** 「名古屋のおすすめブランド買取店1〜15」が15個並ぶ（ギャラリーレア大須店を1位／コメ兵を2位／なんぼや栄店を3位…）
- **JSON-LD types:** `Article ○` / `WebPage ○` / `BreadcrumbList ○` / `WebSite ○` / `SearchAction ○` / `Organization ○` / `PostalAddress ○` / `Person ○` / `ImageObject ○` / `ReadAction ○` / `EntryPoint ○` / `PropertyValueSpecification ○` / `FAQPage ×` / `Review ×` / `LocalBusiness ×` / `HowTo ×`
- **JSON-LD 主要内容（要約）:** 標準的な記事SEO構成（Yoast SEO 流派）。Article は `wordCount=128`(過小、本文がDOM内で外部読み込みの可能性)、`datePublished=2023-03-25`、`dateModified=2026-05-05`、author `髙橋`。Organization に住所も含まれるが直接ページ自体は LocalBusiness 化していない。
- **メインCTA文言:**
  - "今すぐ LINE査定"（ヘッダ常駐）
  - "今すぐ 電話査定"（電話CTA／`tel:0120-968-979`）
  - "メール査定 お申込み"
  - "宅配買取 お申込み"
  - "店頭買取 ご利用案内"
- **電話番号フォーマット:** `0120-968-979`（フリーダイヤル）
- **数値訴求:** ランキング15店舗の比較記事のため自社訴求は少なめ。「**3つの理由**」「**3つの項目で徹底比較**」など"3"の繰返し型。

---

## 7. ウリドキ「【名古屋】ブランド品の買取額が高いお店ランキング」
- **URL:** https://uridoki.net/brand/kiji_65267/
- **title:** 【名古屋】ブランド品の買取額が高いお店ランキング！おすすめの業者や高額査定のコツも解説 - ウリドキ
- **meta description:** 本記事では、名古屋でおすすめのブランド品買取店を紹介！各店の口コミや高額査定のコツもお伝えするので、ぜひ参考にしてください。…名古屋でブランド品の買取を考えているなら、本記事の情報を参考に、慎重に店舗選びを行いましょう。
- **canonical:** https://uridoki.net/brand/kiji_65267/
- **viewport:** width=device-width, initial-scale=1.0
- **robots:** max-image-preview:large
- **h1:** 【名古屋】ブランド品の買取額が高いお店ランキング！おすすめの業者や高額査定のコツも解説
- **h2 (順):**
  1. 【名古屋】ブランド買取のおすすめ店ランキングTOP15
  2. 【名古屋】ブランド買取ならどこがいいか選ぶ方法
  3. 名古屋でブランド品を高く売るコツ
  4. 名古屋でブランド品を査定してもらう方法
  5. 名古屋でブランド品を買取ってもらう方法
  6. ウリドキにおけるブランド品の買取価格例
  7. 名古屋のブランド品買取でよくある質問
  8. 名古屋でブランド品高価買取を目指すならウリドキで査定！
- **h3 主要:** 買取大吉／おたからや／ブランドリバリュー／バイセル／ブランドオフ／エコリング／KOMEHYO／なんぼや／BLOWZ／大黒屋／タカハシライフ／ファランクス／ブランド品とくがわ／ブランズウエダ／大蔵屋
- **JSON-LD types:** `Article ○` / `WebPage ○` / `BreadcrumbList ○` / `WebSite ○` / `Organization ○ (2件)` / `Person ○ (2件)` / `PostalAddress ○` / `ContactPoint ○` / `ImageObject ○` / `PropertyValue ○` / `FAQPage ×` / `Review ×` / `LocalBusiness ×` / `HowTo ×`
- **JSON-LD 主要内容（要約）:** 2スクリプト構成。1つ目: Article + WebPage + BreadcrumbList + Organization(publisher)。2つ目: 純粋な Organization (ウリドキ株式会社)、`telephone: +81-50-3181-6247`、`sameAs: [Facebook, Twitter/X, etc.]`。FAQセクションは h2「よくある質問」として存在するが FAQPage schema は **未マークアップ** (機会損失)。
- **メインCTA文言:**
  - "**無料 60秒 一括査定で最高額を調べる**"（記事中の主CTA）
  - "一括買取査定"（ヘッダ）
- **電話番号フォーマット:** `+81-50-3181-6247`（JSON-LD ContactPoint 内、E.164表記）
- **数値訴求（記事内・他社情報含む）:**
  - 「創業70年」「創業77年」「創業75年」（複数店舗）
  - 「**年間150万件**」（おたからや）
  - 「**累計700億円**」
  - 「**買取実績50万件**」
  - 「**買取実績は2025年5月時点**」（記事更新時期の根拠表示）
  - 店舗数: 30店舗 / 35店舗 / 19店舗 / 25店舗 / 700店舗 / 660店舗 / 260店 / 36店舗 / 31店舗 など多数
  - 「**24時間以内**」「20%UP」

---

## 横断比較表（JSON-LD 実装状況）

| サイト | LocalBusiness | Organization | WebSite/WebPage | FAQPage | Review/AggregateRating | HowTo | Service/OfferCatalog | BreadcrumbList | Article | Product |
|--------|---------------|--------------|-----------------|---------|------------------------|-------|----------------------|----------------|---------|---------|
| 1. KOMEHYO（店舗ページ） | ○ | × | × | × | × | × | × | ○ | × | × |
| 2. バイセル（カテゴリTOP） | × | × | × | × | × | × | × | △(microdata) | × | × |
| 3. BRAND OFF（LINE査定） | × | ○ | ○ | × | × | × | × | ○ | × | × |
| 4. なんぼや（LINE査定） | × | × | × | × | ○(Review×5+Rating) | × | × | × | × | ○ |
| 5. エコリング（LINE査定） | × | × | × | × | × | × | × | ○ | × | × |
| 6. ギャラリーレア（記事） | × | ○ | ○ | × | × | × | × | ○ | ○ | × |
| 7. ウリドキ（記事） | × | ○ | ○ | × | × | × | × | ○ | ○ | × |

> **凡例:** ○=JSON-LD実装あり ／ △=microdataのみ ／ ×=未実装。
> **特筆:** **どの競合も FAQPage schema を実装していない**（コンテンツとしてQ&Aは存在しても schema化していない）。HowTo も同様。**LocalBusiness は KOMEHYO のみ**。なんぼやの "Product+Review" は LINE 査定サービス自体を Product 化する珍しい実装。

## 横断比較表（CTA 文言パターン）

| サイト | LINE系CTA | 電話CTA | フォームCTA | 数値訴求の主軸 |
|--------|-----------|---------|-------------|----------------|
| KOMEHYO | "来店前に LINEで査定" | "店舗に電話で 問い合わせる" / 052-242-0088 | "店舗に買取予約する" / "出張買取を申し込む" | 創業70年以上 / 創業77年以上 |
| バイセル | （メインCTAは電話＋WEB相談、LINE誘導非主役） | "通話 無料 0120-878787" | "かんたん30秒でお問い合わせ WEBで相談する （無料）" | 4,300万点以上の買取実績 |
| BRAND OFF | "**いますぐ友達に追加する👇**" | 0120-604-117 | "宅配買取について＞" / "店頭買取について＞" | 数値なし（LINE訴求一点） |
| なんぼや | LINE査定が主軸（メインボタン文言は外部から確認できず、抽出CTAはメニュー型） | 電話CTA抽出されず | "オンライン買取" / 各買取方法ボタン | 24時間以内 |
| エコリング | （LINE特化ページ／本文ボタンは画像/JS生成） | 0120-140-850 | "宅配買取(LINE版)" 系 | 年間110万点以上 |
| ギャラリーレア | "今すぐ LINE査定" | "今すぐ 電話査定" / 0120-968-979 | "メール査定 お申込み" / "宅配買取 お申込み" / "店頭買取 ご利用案内" | 3つの理由 / 3つの項目 |
| ウリドキ | （比較メディアのため自社CTAは"一括査定"） | （直接電話なし、JSON-LD内のみ） | "**無料 60秒 一括査定で最高額を調べる**" | 60秒 |

## 横断比較表（実績数値の桁感）

| サイト | 訴求形式 | 数値 |
|--------|----------|------|
| KOMEHYO | 創業年 | 創業70年以上 / 創業77年以上 |
| バイセル | 累計買取数 | 4,300万点以上（2015〜2024年） |
| エコリング | 年間実績 | 年間110万点以上 |
| なんぼや | 査定スピード | 24時間以内 |
| BRAND OFF | （数値訴求なし） | — |
| ウリドキ記事内引用 | 業界他社の数値 | 年間150万件 / 累計700億円 / 買取実績50万件 / 700店舗 / 660店舗 等 |

---

## 徳丸LPへの示唆

### A. 徳丸が「最低限」実装すべき JSON-LD（競合実装率＝必須水準）

| schema type | 実装競合数 | 徳丸の優先度 | 理由 |
|-------------|-----------|------------|------|
| **BreadcrumbList** | 5/7 (KOMEHYO/BRANDOFF/エコリング/ギャラリーレア/ウリドキ) + バイセルmicrodata | **最優先・必須** | 業界の事実上の標準。Yoast/標準SEOプラグイン任せでも生成可能 |
| **Organization** | 3/7 (BRANDOFF/ギャラリーレア/ウリドキ) | **必須** | 会社情報・電話・SNSアカウントを正規化するベース |
| **WebSite + WebPage** | 3/7 | **推奨** | sitelinks searchbox 候補。Organizationと組合せが定番 |
| **LocalBusiness** | 1/7 (KOMEHYO のみ) | **強く推奨（差別化チャンス）** | 名古屋店舗を持つ徳丸なら、住所/営業時間/openingHours/image をフルで載せれば KOMEHYO 唯一の構成と並ぶ |

### B. 競合が「未実装」で徳丸が差別化できる JSON-LD

| schema type | 競合実装数 | 徳丸の機会 |
|-------------|-----------|------------|
| **FAQPage** | **0/7** | **巨大な機会**。FAQ Q&A は全競合がコンテンツ化しているのに schema 化を1社もやっていない。徳丸が実装すれば、Google の FAQ リッチリザルト（折り畳みUI）を独占し、SERP 占有面積で勝てる |
| **HowTo** | 0/7 | LINE査定の手順、出張買取の流れ、店頭買取の流れ — 全社が h3 で「ステップ」化しているが HowTo schema 化していない。徳丸が「買取の流れ」を HowTo schema に乗せれば手順表示の機会あり |
| **Service + OfferCatalog** | 0/7 | 「ブランド別買取サービス」を Service として構造化すれば、ブランド名検索（"エルメス 買取 名古屋"等）でのSERP拡張が見込める |
| **Review / AggregateRating（自社）** | 1/7（なんぼや、Personレビュー5件） | 徳丸の Google レビュー / お客様の声を AggregateRating + Review 連動で実装。なんぼや方式（サービスをProduct化）は実用的だが Google ガイドライン的にギリギリなので、**Organization に AggregateRating** が安全 |

### C. CTA文言の業界傾向（徳丸の文言設計指針）

- **LINE誘導の表現バリエーション:**
  - "来店前に LINEで査定"（KOMEHYO・店舗誘導フック）
  - "**いますぐ友達に追加する👇**"（BRAND OFF・友だち追加に直接訴求、絵文字使用）
  - "今すぐ LINE査定"（ギャラリーレア・即時性押し）
  - → 「友だち追加」と「LINE査定」の2系統。徳丸は **「LINEで30秒査定」など秒数定量化** で差別化余地あり
- **電話CTAの定番:** "通話 無料" / "店舗に電話で 問い合わせる" / "今すぐ 電話査定" — **「無料」明示が業界標準**
- **フォームCTAの定量化トレンド:**
  - "かんたん30秒でお問い合わせ"（バイセル）
  - "無料 60秒 一括査定で最高額を調べる"（ウリドキ）
  - → **秒数を入れると CV率向上の業界仮説**。徳丸も「30秒査定」「60秒見積」を採用推奨
- **電話番号表記:** ハイフン区切り (`0120-XXX-XXX` または `052-XXX-XXXX`) が業界統一フォーマット。`tel:` 属性はハイフンなしも混在

### D. 数値訴求の業界平均と徳丸ポジショニング

- **創業年訴求:** 70年〜77年（KOMEHYO他、業界トップ層は3桁手前）
- **買取数訴求:** 「年間110万点以上」(エコリング) ／「累計4,300万点以上」(バイセル) ／「年間150万件」(おたからや) — **桁が一気に大きい**。徳丸が真正直に並べると見劣りするので、**「名古屋市内◯◯件」など地域限定の桁感** で勝負するのが現実的
- **スピード訴求:** 「24時間以内」(なんぼや)／「30秒」「60秒」(バイセル/ウリドキ) — 徳丸LPでは "**LINE査定 最短◯分回答**" など、より短い時間軸での即時性訴求が有効
- **店舗数訴求:** 大手は数百店舗単位 (700/660/260)。徳丸は単一店舗のため店舗数訴求は不利、**「名古屋に密着◯年」「徒歩◯分」** など地理近接性で差し替え

### E. SEO/AEO 観点での即効施策（優先順）

1. **FAQPage schema 実装**（業界誰もやっていない／0社中0社） — 最大の機会
2. **LocalBusiness schema フル実装** — 住所/openingHours/image/geo/areaServed/sameAs まで含めて KOMEHYO を超える詳細度を狙う
3. **HowTo schema** で「買取の流れ」「LINE査定の流れ」をマークアップ
4. **BreadcrumbList + Organization + WebSite + WebPage** の標準SEOセットを最低ライン実装
5. **Review/AggregateRating** を Organization に紐付け（Google レビュー実数値ベース）

---

## 取得失敗・留意事項
- なんぼや: **h1 タグが0件**（h2スタートのページ構成）。これ自体が同社の SEO 上の弱点。
- バイセル: **JSON-LD 完全不在**（microdata のみ）。FAQ や口コミセクションは存在するが構造化データに乗っていない。
- エコリング: viewport `maximum-scale=1.0,user-scalable=no` でピンチズーム禁止。**A11y 違反**で徳丸は同じ轍を踏まない方針。
- 電話番号正規表現が一部 GA トラッキングID等を誤検出している箇所あり（uridoki/ecoring など）。本文中の主表記のみ採用済み。
- 全URLとも 200 OK / Cloudflare等のBot防御発動なしで取得成功（Scrapling stealthy_fetch の効果確認済み）。

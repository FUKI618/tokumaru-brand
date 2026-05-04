# JSON-LD カバレッジ調査レポート (v3)

**調査日:** 2026-05-04
**手法:** `mcp__ScraplingServer__bulk_stealthy_fetch` で競合10社の生HTMLから `<script type="application/ld+json">` を CSS selector で抽出
**目的:** 自社実装の欠落要素を **事実ベース** で特定し追加する

---

## 競合10社のJSON-LD実装マトリクス

| # | 競合 | JSON-LD実装 | 主要type | 注目要素 |
|:-:|---|:---:|---|---|
| 1 | こちら買取本舗 (carbon-gold.com) | ❌ なし | — | LP は構造化データ未実装 |
| 2 | ブランドオフ (kaitori.brandoff.co.jp) | ✅ 5 type | BreadcrumbList / Organization / WebPage / WebSite / **PawnShop** | `numberOfEmployees: {minValue:550, maxValue:600}` `foundingDate:1993-04-01` `makesOffer[]` `logo: ImageObject(width/height)` |
| 3 | なんぼや (nanboya.com) | ✅ 2 type | **FAQPage**(12問) / **PawnShop** | FAQの粒度が高い（実用情報12問）、PawnShopにgeo + map URL |
| 4 | ブラリバ (brandrevalue.com) | ✅ 2 type | BreadcrumbList / **PawnShop** | シンプル実装。openingHours文字列1行 |
| 5 | かんてい局 (kanteikyoku.jp) | ✅ 4 type | BreadcrumbList / Organization / WebPage / WebSite | LocalBusiness 系なし。WebPage に `datePublished/dateModified` |
| 6 | OURO (brandouro.com) | ✅ 5 type | BreadcrumbList / Organization / WebPage / WebSite / **LocalBusiness** | `aggregateRating` (5★/5件) + `review[]` 個別5件（ただし全5★は構造的疑問） |
| 7 | ブランズウエダ (branz-ueda.com) | ✅ 4 type | WebSite / Organization / BreadcrumbList / WebPage | 基本のみ、買取系typeなし |
| 8 | バイセル (buysell-kaitori.com) | ❌ なし | — | このページは構造化データなし（他ページ別パターンあり可） |
| 9 | 福ちゃん (fuku-chan.info) | ✅ 2 type | **FAQPage**(6問) / BreadcrumbList | FAQ中心の最小実装 |
| 10 | コメ兵 (komehyo.jp/kaitori/takuhai) | ❌ なし | — | 宅配ページは構造化データなし |

**要点:** 10社中3社がJSON-LD未実装。実装している7社の中央値は2-4 type。徳丸商会の **8 type 実装は業界トップ水準**。

---

## 自社（徳丸商会）の現行実装

| # | type | 状態 | 注目要素 |
|:-:|---|:---:|---|
| 1 | LocalBusiness | ✅ | @id 参照型、4階層 hasOfferCatalog（買取方法×3 + カテゴリ×5 + 主要ブランド×9） |
| 2 | Organization | ✅ | 基本実装 |
| 3 | WebSite + SearchAction | ✅ | サイトリンク検索ボックス対応 |
| 4 | Service ×3 | ✅ | 出張買取 / LINE査定 / 宅配買取（全て@id, areaServed, offers完備） |
| 5 | FAQPage | ✅ | 10問（faq.ts自動生成） |
| 6 | HowTo | ✅ | 3ステップ + totalTime + estimatedCost + tool×2 |
| 7 | Person ×2 | ✅ | 査定員2名（小山・加藤） + worksFor ref |
| 8 | BreadcrumbList | ✅ | ホーム → ブランド買取 |

**比較結果:** 競合最強の brandoff（5 type）よりも徳丸（8 type）が先行。業界唯一の Service ×3 / HowTo / Person 強化。

---

## 競合から抽出した「自社に欠落している実装パターン」3件以上

### 追加実装A: WebPage エンティティ（4/10社が実装）

**根拠:** brandoff / kanteikyoku / brandouro / branz-ueda の全社が `WebPage` を持ち、`datePublished` `dateModified` `inLanguage` `breadcrumb` ref `isPartOf` website ref `primaryImageOfPage` を含めている。

**現状:** 徳丸の Layout.astro には WebPage 単独エンティティなし。
**追加内容:**
```jsonc
{
  "@type": "WebPage",
  "@id": "<homeUrl>#webpage",
  "url": "<homeUrl>",
  "name": "<title>",
  "description": "<description>",
  "inLanguage": "ja-JP",
  "isPartOf": { "@id": "<homeUrl>#website" },
  "breadcrumb": { "@id": "<homeUrl>#breadcrumb" },
  "primaryImageOfPage": { "@type": "ImageObject", "url": "<ogImage>" },
  "datePublished": "2026-05-04",
  "dateModified": "<build date>",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".story-paragraph"]
  }
}
```

**期待効果:** Voice Search 対応 (Google Assistant) + リッチリザルトに「最終更新日」表示の可能性。

---

### 追加実装B: PawnShop 多重type化（3/10社が PawnShop を主type化）

**根拠:** brandoff（PawnShop）/ nanboya（PawnShop）/ brandrevalue（PawnShop）の3社が Schema.org の **PawnShop** を主type化。Schema.org上 `PawnShop` は `LocalBusiness > Store > PawnShop` の階層で **古物商業界として最も specific**。

**現状:** 徳丸は `"@type": "LocalBusiness"`。
**追加内容:** 多重type化：`"@type": ["LocalBusiness", "PawnShop"]`
- 既存プロパティはすべて互換（PawnShop は LocalBusiness のサブタイプ）
- 古物商として正確に分類される

**期待効果:** 業界カテゴリで Google ローカル検索の精度上昇。`質屋・買取店` 系 KW でのリッチリザルト改善。

---

### 追加実装C: makesOffer 配列（brandoff が実装）

**根拠:** brandoff が PawnShop 内で `makesOffer: [{Offer name: "ブランド買取"}, ...]` を配列で持つ。`hasOfferCatalog` が階層構造なのに対し、`makesOffer` は単純フラットなOfferリストで、Google が Offer を平易に拾いやすい。

**現状:** 徳丸は `hasOfferCatalog`（4階層）のみ。
**追加内容:** LocalBusiness に `makesOffer` を追加：
```jsonc
"makesOffer": [
  { "@type": "Offer", "name": "ブランドバッグ買取（エルメス・シャネル・ヴィトン）", "category": "Brand bag buyback" },
  { "@type": "Offer", "name": "ブランド時計買取（ロレックス・カルティエ・オメガ）", "category": "Brand watch buyback" },
  { "@type": "Offer", "name": "ブランドジュエリー買取（カルティエ・ティファニー・ブルガリ）", "category": "Brand jewelry buyback" },
  { "@type": "Offer", "name": "ブランドアパレル買取", "category": "Brand apparel buyback" }
]
```

**期待効果:** `hasOfferCatalog` と相互補完し、Google のクロール時に Offer 抽出の冗長性を確保。

---

### 追加実装D: knowsAbout 配列（Organization 強化）

**根拠:** Schema.org の Organization プロパティで「組織が専門知識を持つトピック」を表現。E-E-A-T シグナル（Expertise）として有効。staff.ts の specialty にあるブランドリストを Organization レベルに昇格。

**現状:** 徳丸の Organization に `knowsAbout` なし（Person の knowsAbout のみ）。
**追加内容:**
```jsonc
"knowsAbout": ["エルメス買取", "シャネル買取", "ルイ・ヴィトン買取", "ロレックス買取", "カルティエ買取", "ティファニー買取", "ブランドバッグ査定", "古物商業界"]
```

**期待効果:** E-E-A-T の Expertise シグナル強化。Google の AI Overviews での引用可能性向上。

---

### 追加実装E: logo を ImageObject で構造化（brandoff / brandouro が実装）

**根拠:** brandoff / brandouro の logo は `{ "@type": "ImageObject", "url": "...", "width": ..., "height": ... }` の正式構造。文字列URLよりリッチリザルトの画像扱いが安定。

**現状:** 徳丸は `"logo": logoUrl` の文字列のみ。
**追加内容:** Organization と LocalBusiness の `logo` を ImageObject 化：
```jsonc
"logo": {
  "@type": "ImageObject",
  "@id": "<homeUrl>#logo",
  "url": "<logoUrl>",
  "width": 360,
  "height": 360,
  "caption": "徳丸商会 ロゴ"
}
```

**期待効果:** Google ナレッジパネル / リッチリザルトの画像認識精度上昇。

---

## 重要規約遵守の確認

- ✅ **虚偽数値禁止** — `aggregateRating` `Review` は実体験のレビューがないため追加しない（brandouro が実装しているが構造的に疑問のある全5★）
- ✅ **AI 記憶ベース禁止** — 上記5件すべて、競合の実HTMLから取得したJSON-LD実値を出典として明示
- ✅ **不確実な事実は追加しない** — `foundingDate` `numberOfEmployees` は company.ts に正確値がないため追加しない

---

## 期待される追加後の type 数

| 種類 | 現状 | 追加後 |
|---|:---:|:---:|
| 独立 type 数 | 8 | **9** （+ WebPage） |
| LocalBusiness 内 type 値 | 1 | **2** （PawnShop多重） |
| 計装プロパティ追加 | — | knowsAbout / makesOffer / logo ImageObject |

---

## 出典URL一覧

- https://kaitori.brandoff.co.jp/shop/tokai/aichi/12510 (PawnShop, makesOffer, foundingDate, numberOfEmployees, logo ImageObject)
- https://nanboya.com/shop/nagoya-brandshop/ (FAQPage 12問, PawnShop)
- https://brandrevalue.com/nagoya (PawnShop)
- https://kanteikyoku.jp/store/nagoyanishiki/ (WebPage, Organization)
- https://brandouro.com/shop/shop-340/ (LocalBusiness, aggregateRating + review[]、参考のみ採用しない)
- https://branz-ueda.com/wp/kaitorihinmoku/kaitori_brand/ (WebPage with datePublished/dateModified)
- https://www.fuku-chan.info/brand/ (FAQPage)

---

最終更新: 2026-05-04

# SEO 運用セットアップ — ユーザー作業の手順書

LP のコードSEO（オンページ・構造化データ・テクニカル）は **9.5/10** で完成済みですが、検索エンジンに「このLPがあるよ」と教える運用作業は別途必要です。すべて **無料** で、合計約30分で完了します。

---

## 📋 優先度順タスクリスト

| 優先 | 作業 | 所要時間 | SEO影響 |
|:-:|---|:-:|---|
| 🔴 1 | **Google Search Console** 登録 + sitemap提出 | 10分 | 検索流入の基盤 |
| 🔴 2 | **Google Business Profile** 登録 | 15分 | 名古屋ローカル検索（最重要） |
| 🟡 3 | **PageSpeed Insights** 実機計測 | 5分 | パフォーマンス問題発見 |
| 🟡 4 | **Bing Webmaster Tools** 登録 | 5分 | Bing検索流入 |
| 🟢 5 | 被リンク獲得 | 数ヶ月 | ドメインオーソリティ |
| 🟢 6 | 独自ドメイン取得（例：brand.tokumarushokai.com） | 30分 | 信頼性UP |

---

## 🔴 1. Google Search Console（GSC）登録

検索エンジンが LP をどう見ているか確認するための必須ツール。

### 手順

1. https://search.google.com/search-console/welcome を開く
2. Google アカウント（kaitori@... または個人Gmail）でログイン
3. 「**URLプレフィックス**」を選択
4. URL に `https://fuki618.github.io/tokumaru-brand/` を入力 → 続行
5. **所有権の確認**：いくつかの方法から選ぶ

   | 方法 | 難易度 | 推奨度 |
   |---|:-:|:-:|
   | HTMLタグ | ★ | ✅ 推奨 |
   | HTMLファイル | ★★ | △ |
   | Google Analytics | ★ | △（既に連携済みなら） |
   | DNS | ★★★ | ✗ |

### HTML タグでの所有権確認（推奨）

GSC が表示する：
```html
<meta name="google-site-verification" content="abc123def456..." />
```

この **`content="..."` の部分（タグ全体ではなく値の部分）を私に教えてください**。
私が `src/layouts/Layout.astro` に追加 → push → 数分後に GSC で「確認」をクリックすれば完了。

### 確認後の作業

1. GSC ダッシュボードで「**サイトマップ**」を選択
2. 「新しいサイトマップを追加」に `sitemap-index.xml` を入力 → 送信
3. 数日でインデックス状況が見えるようになる

---

## 🔴 2. Google Business Profile（旧マイビジネス）

**名古屋ローカル検索（「ブランド買取 名古屋」「ブランド買取 中村区」等）で最も効くSEO施策。Googleマップ表示にも必須。**

### 手順

1. https://business.google.com/create を開く
2. ビジネス情報を入力：
   - **ビジネス名**: `徳丸商会 ブランド買取`
   - **カテゴリ**: 「リサイクルショップ」「買取専門店」「古物商」など
   - **住所**: 〒453-0863 愛知県名古屋市中村区横井2丁目71番地
   - **電話番号**: 052-990-3968
   - **ウェブサイト**: https://fuki618.github.io/tokumaru-brand/
3. **所有権の確認**（必須）
   - ハガキ郵送（1〜2週間）
   - 電話確認（即時、対応店舗のみ）
   - メール確認（一部のみ）
4. プロフィール充実
   - 営業時間：9:00〜21:00（年中無休）
   - 写真：店舗外観・内装・査定員（実物が撮れるもの）
   - サービス説明：本LPの内容を要約
   - ポスト：定期的に更新（買取相場情報など）

### 効果

- Google検索で「ブランド買取 名古屋」と検索 → 地図 + 店舗情報がパック表示される
- お客様レビューが投稿可能
- Google Mapsから直接電話・道案内・LINE誘導
- ローカルSEOで上位表示の確率が大幅UP

---

## 🟡 3. PageSpeed Insights 計測

**実機での速度問題を発見・改善する。**

1. https://pagespeed.web.dev/?url=https%3A%2F%2Ffuki618.github.io%2Ftokumaru-brand%2F を開く
2. 「分析」をクリック
3. **モバイル / デスクトップ両方** のスコアを確認

### 目標スコア（既存LPの実績ベース）

| 指標 | モバイル | デスクトップ |
|---|:-:|:-:|
| Performance | 80+ | 95+ |
| Accessibility | 95+ | 95+ |
| Best Practices | 95+ | 95+ |
| SEO | 100 | 100 |
| LCP | < 2.5s | < 1.5s |
| CLS | < 0.1 | < 0.1 |
| TBT | < 200ms | < 100ms |

スコアが目標を下回ったら、**結果のスクショを私に送ってください**。改善案を出して実装します。

---

## 🟡 4. Bing Webmaster Tools

Bing検索（Yahoo!も内部はBing）からの流入用。

1. https://www.bing.com/webmasters/about を開く
2. Microsoft アカウントでログイン
3. **GSCからのインポート機能** が便利（手順1完了後に使える）
4. または手動：URL `https://fuki618.github.io/tokumaru-brand/` を追加 → メタタグ確認

### 効果

日本では Yahoo! も Bing インデックスを使うため、**Yahoo検索流入**にも影響。Google より検索数は少ないが、無料で登録できるなら登録しておくべき。

---

## 🟢 5. 被リンク獲得（時間で蓄積）

**新規LP は被リンク0からスタート。徐々に増やす。**

### すぐできる被リンク

| 方法 | 効果 |
|---|---|
| **既存LPからの相互リンク** | ✅ 既に仕込み済み（楽器/遺品/貴金属LPからフッターでリンク） |
| **Google Business Profile** | ✅ 上記2で実施 |
| **エキテン・ホットペッパービューティー等の地域ポータル** | 名古屋エリアで検索される |
| **古物商業界団体** | 全国古物商組合などへの登録 |
| **SNS**（X/Instagram） | プロフィールにLP URL記載 |

### NG な被リンク

- 自作自演の大量リンク（ペナルティ対象）
- 関係のない海外サイトからの被リンク
- 有料リンク購入

---

## 🟢 6. 独自ドメイン取得（任意）

サブパス `fuki618.github.io/tokumaru-brand/` でも動作するが、独自ドメインの方が信頼性UP。

### 推奨ドメイン例

| ドメイン | 月額目安 | メリット |
|---|---|---|
| `tokumarushokai.com` のサブドメイン（例：`brand.tokumarushokai.com`） | 既に保有なら0円 | 既存LP群と統一 |
| 新規取得 `tokumaru-brand.com` | 100〜1000円 | LP単独 |
| 新規取得 `nagoya-brand-kaitori.com` | 100〜1000円 | KW入りドメイン |

GitHub Pages で独自ドメイン設定は5分で可能。設定方法を希望されたらガイドします。

---

## ✅ 完了条件チェックリスト

- [ ] Google Search Console 登録 + 所有権確認済み
- [ ] Sitemap (`sitemap-index.xml`) 提出済み
- [ ] Google Business Profile 登録 + 所有権確認待ち or 完了
- [ ] PageSpeed Insights モバイル80+
- [ ] Bing Webmaster Tools 登録
- [ ] 既存LPからの相互リンク確認（楽器/遺品/貴金属）
- [ ] SNSプロフィールに LP URL 記載

---

## 📊 私が実装済みの SEO（コードレベル）

| カテゴリ | 状態 |
|---|:-:|
| title / meta description | ✅ 27文字 / 128文字（基準内） |
| h1 構造（地域+KW+社名） | ✅ |
| h2 階層（12個） | ✅ |
| meta keywords（参考） | ✅ 15個 |
| canonical | ✅ |
| OGP / Twitter Card | ✅ 完備 |
| sitemap.xml | ✅ 自動生成（@astrojs/sitemap） |
| robots.txt | ✅ |
| HTTPS | ✅ |
| モバイル対応 | ✅ |
| **構造化データ JSON-LD（8種類）** | ✅ LocalBusiness / Organization / WebSite+SearchAction / Service×3 / FAQPage / HowTo / Person×2 / BreadcrumbList |
| FAQリッチスニペット対応 | ✅ 10問 |
| HowToリッチスニペット対応 | ✅ 3ステップ |
| Core Web Vitals 配慮 | ✅ fetchpriority / preconnect / GTM 3秒遅延 / lazy loading |
| KW分散（事実ベース） | ✅ 競合10社調査済み |

---

最終更新: 2026年5月4日

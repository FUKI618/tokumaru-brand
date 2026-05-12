# 徳丸商会 ブランド買取LP — サーバー配置ガイド

## 1. アップロードするのはどれ？

**`dist/` の中身だけ** をサーバーへアップロードしてください。
他のフォルダ（`src/`, `public/`, `node_modules/` 等）はアップ不要です。

```
dist/
├── index.html              ← トップ
├── legal-notices/index.html
├── privacy-policy/index.html
├── _astro/                 ← CSS / JS バンドル
├── images/                 ← 画像アセット
├── favicon.svg / logo.svg
├── og-image*.{webp,jpg,png}
├── robots.txt
└── sitemap-index.xml / sitemap-0.xml
```

## 2. どこに置けばいい？

**どこでもOK**（相対パス化されているので壊れません）

| 配置先                                              | 動作 |
| --------------------------------------------------- | ---- |
| `https://tokumarushokai.com/brand/`                 | ◎ 想定通り（canonical / og-url 適用ドメイン） |
| `https://tokumarushokai.com/`                       | ○ 動く（canonical だけ /brand/ を指す） |
| `https://example.com/foo/bar/`                      | ○ 動く（canonical は tokumarushokai.com/brand/） |
| ローカルの `file:///` で直接                        | ○ 動く |

> アセット（CSS・画像・内部リンク）はすべて相対パス（`./`, `../`）で書き出してあるので、配置パスに依存しません。

## 3. canonical / SEO 上の注意

`<link rel="canonical" href="https://tokumarushokai.com/brand/">` で固定されています。  
**別ドメインで本格運用する場合**は、ソースから再ビルドしてください（後述）。

## 4. 再ビルドの方法（別ドメイン / 別パスへ移す場合）

```bash
bun install
PUBLIC_SITE_ORIGIN="https://your-domain.com" PUBLIC_SITE_BASE="/your-path" bun run build
PUBLIC_SITE_BASE="/your-path" bun run scripts/relativize-dist.ts
# → dist/ をサーバへアップロード
```

* `PUBLIC_SITE_ORIGIN` … canonical / OG / sitemap に使われる絶対URL
* `PUBLIC_SITE_BASE` … サブフォルダ名（ドメイン直下なら `/`）

## 5. Microsoft Clarity 設置（推奨）

公開後の実ユーザー行動（rage-click / scroll cliff / form abandonment）を観測するため、Microsoft Clarity を設置します。**無料・無制限・GA4連携可能**。

### セットアップ手順

1. https://clarity.microsoft.com/ にアクセス（Microsoft アカウントでログイン）
2. **Add new project** → サイト名 / URL / カテゴリを入力
3. **Setup** → "Get tracking code" でプロジェクトID（10桁の英数字、例: `abc1234xyz`）を取得
4. プロジェクトルートに `.env` を作成（`.env.example` を参考に）:

   ```bash
   cp .env.example .env
   ```

5. `.env` の `PUBLIC_CLARITY_PROJECT_ID` に取得したIDを設定:

   ```
   PUBLIC_CLARITY_PROJECT_ID=abc1234xyz
   ```

6. リビルド（既存4の再ビルド手順と同じ）:

   ```bash
   bun run build
   ```

7. デプロイ後、Clarity dashboard で「Recordings: X sessions」が増えるか確認（10-30分以内に最初のセッションが見える）

### CSP / プライバシー対応

- **CSP**: 既に `script-src` / `connect-src` / `img-src` に `*.clarity.ms` / `c.bing.com` を許可済み
- **プライバシーポリシー**: `src/pages/privacy-policy.astro` の「クッキー・アクセス解析・ユーザー行動分析」セクションに Clarity 利用を開示済み
- **APPI 2026改正対応**: 個人情報保護法対応のため、Clarity script は **PUBLIC_CLARITY_PROJECT_ID 未設定時は出力されない**（フォールバック設計）

### GA4 連携（推奨）

Clarity dashboard で **Settings > Google Analytics > Connect** から GA4 プロパティを連携すると、GA4 segment を Clarity の filter として使えるようになります。

### 観測対象（pro-lp-launch L1.5 / pro-lp-ops W3.5）

- **Rage clicks**: 「クリックしてるのに反応しない」UI不具合検出
- **Dead clicks**: 非クリッカブルを誤認識 → アフォーダンス改善
- **Scroll cliff**: 特定セクションで70%以上が離脱 → セクション差し替え
- **Form abandonment**: フォームのどのフィールドで止まったか
- **Smart Events**: GTM dataLayer 経由でカスタムイベント送信可能（form_submit / phone_click / line_click）

## 6. 連絡先

- LP内連絡先: kaitori@tokumarushokai.com
- 法的事業者: 株式会社RENEE Design / 屋号: 徳丸商会
- 古物商許可: 愛知県公安委員会 第541042309800号

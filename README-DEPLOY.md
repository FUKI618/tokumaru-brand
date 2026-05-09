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

## 5. 連絡先

- LP内連絡先: kaitori@tokumarushokai.com
- 法的事業者: 株式会社RENEE Design / 屋号: 徳丸商会
- 古物商許可: 愛知県公安委員会 第541042309800号

# Google Apps Script でフォーム受信システムをセルフホストする手順

Formspree などの第三者サービスを使わず、Google アカウントだけで「自前のフォーム受信システム」を立てる手順です。所要時間: 約5分。

## 全体像

```
[ブランド買取LP のフォーム]
   ↓ ユーザーが「査定を依頼する」をクリック
[fetch() で POST]
   ↓
[Google Apps Script Web アプリ]
   ↓ 受信したデータを処理
[1. kaitori@tokumarushokai.com に Gmail 送信]
[2. Google スプレッドシートに記録（任意）]
[3. LP に「送信完了」サンクスメッセージ表示]
```

---

## 手順 1: Google Apps Script を開く

1. ブラウザで https://script.google.com/ を開く
2. Google アカウント（Gmail）でログイン（既にログイン済みならスキップ）
3. 左上の **「＋ 新しいプロジェクト」** をクリック
4. プロジェクト名を `徳丸商会-ブランド買取-フォーム受信` に変更（左上の `Untitled project` をクリック）

## 手順 2: 私が書いたコードを貼り付ける

エディタに表示されている `function myFunction()` の部分を **すべて削除** してから、以下のコードを丸ごと貼り付けてください：

```javascript
// 徳丸商会 ブランド買取LP フォーム受信
// 受信したデータを kaitori@tokumarushokai.com にメール送信
// 同時に Google スプレッドシートに記録（任意）

const TARGET_EMAIL = "kaitori@tokumarushokai.com";
const SUBJECT_PREFIX = "【徳丸商会 ブランド買取】";
const SHEET_NAME = "問い合わせ"; // スプレッドシートのシート名（任意）

function doPost(e) {
  try {
    const params = e.parameter;

    // スパム対策: ハニーポット (_gotcha フィールドが入力されてたらBOT)
    if (params._gotcha) {
      return _ok({ blocked: "spam" });
    }

    // 必須項目チェック
    if (!params["お名前"] || !params["連絡先"]) {
      return _ok({ error: "name_or_contact_missing" });
    }

    // メール送信
    sendNotification(params);

    // スプレッドシートに記録（任意・存在すれば）
    try {
      appendToSheet(params);
    } catch (sheetErr) {
      // シートがなくてもメール送信は続行
      console.log("Sheet append skipped: " + sheetErr.message);
    }

    return _ok({ status: "received" });
  } catch (err) {
    console.error("doPost error: " + err.message);
    return _ok({ error: err.message });
  }
}

function doGet() {
  // 動作確認用のヘルスチェック
  return ContentService.createTextOutput("Tokumaru Brand Form API: OK")
    .setMimeType(ContentService.MimeType.TEXT);
}

function sendNotification(params) {
  const subject = `${SUBJECT_PREFIX}お問い合わせがありました`;
  const body = `
徳丸商会のブランド買取LPからお問い合わせがありました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お名前
${params["お名前"] || "(未入力)"}

■ 連絡先
${params["連絡先"] || "(未入力)"}

■ ご希望の連絡方法
${params["希望連絡方法"] || "(未選択)"}

■ ブランド
${params["ブランド"] || "(未入力)"}

■ 商品ジャンル
${params["商品ジャンル"] || "(未選択)"}

■ 商品の状態
${params["状態"] || "(未選択)"}

■ 買取方法のご希望
${params["買取方法"] || "(未選択)"}

■ お住まいエリア
${params["エリア"] || "(未入力)"}

■ メッセージ
${params["メッセージ"] || "(未入力)"}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

受信日時: ${Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy-MM-dd HH:mm:ss")}
送信元LP: https://fuki618.github.io/tokumaru-brand/

このメールは Google Apps Script により自動送信されています。
返信は ${params["連絡先"] || "お客様の連絡先"} へどうぞ。
`.trim();

  GmailApp.sendEmail(TARGET_EMAIL, subject, body, {
    replyTo: params["連絡先"] && params["連絡先"].includes("@") ? params["連絡先"] : undefined,
    name: "徳丸商会 ブランド買取LP",
  });
}

function appendToSheet(params) {
  // スプレッドシートが連動されていれば記録、なければスキップ
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) return;

  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // ヘッダー行を作成
    sheet.appendRow([
      "受信日時", "お名前", "連絡先", "連絡方法", "ブランド",
      "ジャンル", "状態", "買取方法", "エリア", "メッセージ",
    ]);
    // ヘッダーを太字に
    sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#1a1f3a").setFontColor("#c5a572");
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy-MM-dd HH:mm:ss"),
    params["お名前"] || "",
    params["連絡先"] || "",
    params["希望連絡方法"] || "",
    params["ブランド"] || "",
    params["商品ジャンル"] || "",
    params["状態"] || "",
    params["買取方法"] || "",
    params["エリア"] || "",
    params["メッセージ"] || "",
  ]);
}

function _ok(payload) {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, ...payload }))
    .setMimeType(ContentService.MimeType.JSON);
}

// テスト用関数（エディタから手動実行して動作確認）
function testNotification() {
  sendNotification({
    "お名前": "テスト 太郎",
    "連絡先": "test@example.com",
    "希望連絡方法": "メール",
    "ブランド": "エルメス",
    "商品ジャンル": "ブランドバッグ",
    "状態": "通常使用感あり",
    "買取方法": "出張買取（最短当日）",
    "エリア": "名古屋市中区",
    "メッセージ": "テスト送信です。",
  });
  Logger.log("✓ テストメールを送信しました");
}
```

## 手順 3: 保存してテスト送信

1. **Ctrl+S（Mac は Cmd+S）** で保存
2. 画面上部のドロップダウンで `testNotification` を選択
3. **「実行」** ボタン（▶ アイコン）をクリック
4. 初回のみ Google から認証要求が出る → 「権限を確認」「許可」をクリック
   - ※「このアプリは確認されていません」の警告が出ても、自分のコードなので「詳細を表示」→「（アプリ名）に移動（安全ではないページ）」で進めてOK
5. `kaitori@tokumarushokai.com` にテストメールが届くか確認

## 手順 4: ウェブアプリとしてデプロイ

1. 右上の **「デプロイ」** ボタン → **「新しいデプロイ」** をクリック
2. **「種類の選択」** で歯車アイコン → **「ウェブアプリ」** を選択
3. 設定：
   - **説明**: `徳丸商会 ブランド買取 フォーム受信 v1`
   - **次のユーザーとして実行**: 自分（あなたのGoogleアカウント）
   - **アクセスできるユーザー**: **全員** （← 重要、これがないとLPから送信できない）
4. **「デプロイ」** をクリック
5. 認証要求 → 許可
6. **「ウェブアプリ」の URL** が表示される。例：
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
7. この URL を **コピー** して、私に渡してください

## 手順 5: 私が LP に組み込む

URL を渡してくれたら、`src/pages/index.astro` のフォーム送信先を Google Apps Script の URL に変更し、ビルド + デプロイします（30秒）。

---

## トラブルシューティング

### Q. 「認証されていない」警告が怖い
A. これは Google が「公式な開発者ではないユーザーが書いたコード」全部に出す警告です。自分のGoogle アカウント内だけで動くので、許可して問題ありません。コードは私が書いたものをそのまま貼っただけ、つまり**あなたの管理下のコード**です。

### Q. テストメールが届かない
A. ① Apps Script の「実行ログ」でエラーを確認 ② 認証時に Gmail送信権限を許可したか確認 ③ Gmail 自体の送信制限（1日500通）に達していないか確認

### Q. スプレッドシート記録もしたい
A. Apps Script 画面の左メニュー「サービスを追加」から **Sheets** を追加し、新規スプレッドシートを開いた状態でこのコードを編集すると、`appendToSheet()` が動きます。手動でスプレッドシートを作っておくだけでもOK。

### Q. CORS エラーが出る
A. このコードは `ContentService.createTextOutput(JSON)` を使っているので CORS は問題ない設計です。万一エラーが出たら、デプロイ時の「アクセスできるユーザー」が「全員」になっているか確認。

### Q. 既にデプロイ後にコードを修正したい
A. **デプロイ → デプロイを管理** から「鉛筆アイコン」で既存デプロイを編集 → バージョンを「新しいバージョン」にして再デプロイ。**新規デプロイ毎にURLが変わる点に注意**（既存URLを更新したい場合は同じデプロイIDを使う）。

---

## なぜ Formspree より自前 Apps Script が良いか

| 項目 | Formspree | Google Apps Script (今回) |
|---|:-:|:-:|
| 第三者の依存 | あり（Formspree社） | なし（Google純正、自分の管理下） |
| アカウント新規作成 | 必要 | 不要（既存Gmailで） |
| 月の送信件数 | 無料50件 | 実質無制限 |
| データの所有権 | Formspree DB | 自分のGmailとスプレッドシート |
| カスタマイズ自由度 | 限定的 | コードを自由に編集可 |
| 月額料金 | 50件超で有料 | ずっと無料 |

---

最終更新: 2026年5月4日

# Google Apps Script セットアップ手順

このドキュメントでは、問い合わせフォームのデータをGoogle Spreadsheetに自動保存するための設定方法を説明します。

## 手順1: Google Spreadsheetを作成

1. [Google Sheets](https://sheets.google.com)にアクセス
2. 新しいスプレッドシートを作成
3. シート名を「問い合わせデータ」などに変更
4. 1行目に以下のヘッダーを入力：

| A列 | B列 | C列 | D列 | E列 | F列 | G列 |
|-----|-----|-----|-----|-----|-----|-----|
| タイムスタンプ | お名前 | メールアドレス | 会社名・組織名 | 電話番号 | プロジェクト内容 | 言語 |

## 手順2: Google Apps Scriptを作成

1. スプレッドシートのメニューから「拡張機能」→「Apps Script」を選択
2. 表示されたエディタで、以下のコードを貼り付け：

```javascript
function doPost(e) {
  try {
    // スプレッドシートを取得
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // POSTデータを解析
    const data = JSON.parse(e.postData.contents);
    
    // 日本時間に変換
    const timestamp = new Date(data.timestamp);
    const jstTimestamp = Utilities.formatDate(timestamp, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
    
    // スプレッドシートに追加
    sheet.appendRow([
      jstTimestamp,
      data.name,
      data.email,
      data.company || '',
      data.phone || '',
      data.project,
      data.language
    ]);
    
    // 成功レスポンスを返す
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'データが保存されました'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // エラーレスポンスを返す
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. 「プロジェクト設定」（歯車アイコン）をクリック
4. 「マニフェストファイルをエディタで表示する」にチェックを入れる
5. 左側のファイル一覧から「appsscript.json」を開き、以下のように編集：

```json
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```

## 手順3: デプロイ

1. 右上の「デプロイ」→「新しいデプロイ」をクリック
2. 「種類の選択」（歯車アイコン）→「ウェブアプリ」を選択
3. 以下の設定を行う：
   - **説明**: 「Kibidango問い合わせフォーム」
   - **次のユーザーとして実行**: 「自分」
   - **アクセスできるユーザー**: 「全員」
4. 「デプロイ」ボタンをクリック
5. 権限の承認を求められたら、以下の手順で承認：
   - 「アクセスを承認」をクリック
   - Googleアカウントを選択
   - 「詳細」→「(プロジェクト名)に移動」をクリック
   - 「許可」をクリック
6. **ウェブアプリのURL**をコピー（例: `https://script.google.com/macros/s/AKfycby.../exec`）

## 手順4: LPにURLを設定

1. `script.js`ファイルを開く
2. 103行目の以下の部分を見つける：
```javascript
const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```
3. `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE`を、手順3でコピーしたURLに置き換える：
```javascript
const scriptURL = 'https://script.google.com/macros/s/AKfycby.../exec';
```
4. ファイルを保存

## 手順5: テスト

1. LPの問い合わせボタンをクリック
2. フォームに情報を入力して送信
3. Google Spreadsheetを確認し、データが追加されているか確認

## トラブルシューティング

### データが保存されない場合

1. **Apps Scriptのログを確認**
   - Apps Scriptエディタで「実行数」をクリック
   - エラーメッセージを確認

2. **URLが正しいか確認**
   - `script.js`のURLが正しくコピーされているか確認
   - URLの末尾が`/exec`になっているか確認

3. **権限を再確認**
   - Apps Scriptのデプロイ設定で「アクセスできるユーザー」が「全員」になっているか確認

### CORSエラーが表示される場合

- `mode: 'no-cors'`を設定しているため、通常は問題ありません
- それでもエラーが出る場合は、Apps Scriptの設定を確認してください

## メール通知の追加（オプション）

問い合わせがあったときにメール通知を受け取りたい場合、Apps Scriptに以下を追加：

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    const timestamp = new Date(data.timestamp);
    const jstTimestamp = Utilities.formatDate(timestamp, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
    
    sheet.appendRow([
      jstTimestamp,
      data.name,
      data.email,
      data.company || '',
      data.phone || '',
      data.project,
      data.language
    ]);
    
    // メール通知を送信
    const emailBody = `
新しい問い合わせがありました。

【タイムスタンプ】${jstTimestamp}
【お名前】${data.name}
【メールアドレス】${data.email}
【会社名・組織名】${data.company || 'なし'}
【電話番号】${data.phone || 'なし'}
【プロジェクト内容】
${data.project}
【言語】${data.language}
    `;
    
    MailApp.sendEmail({
      to: 'info@kibidango.com', // 通知先のメールアドレスに変更
      subject: '【Kibidango LP】新しい問い合わせ',
      body: emailBody
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'データが保存されました'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## セキュリティに関する注意

- Apps ScriptのURLは公開されるため、スパム対策として以下を検討してください：
  - reCAPTCHAの導入
  - レート制限の実装
  - 入力値の検証

以上で設定完了です！

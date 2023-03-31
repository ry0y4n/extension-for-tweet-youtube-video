# Tweet YouTube Video

YouTube動画をアップロードする形でツイートするためのChrome拡張

## 機能

- YouTube動画をダウンロード
- 動画を含めたツイートを作成・投稿
- ダウンロード動画を削除

## インストール方法

0. TwitterのAPIキーとアクセストークンを取得して，`host/secrets.json`へ貼り付ける
    ```
    {
        "appKey": "",
        "appSecret": "",
        "accessToken": "",
        "accessSecret": ""
    }
    ```
1. `chrome://extensions`を開く
2. `デベロッパーモード`を有効にする
3. `パッケージ化されていない拡張機能を読み込む`をクリック
4. `app`フォルダを選択
5. 拡張機能のIDを控える
6. `host/tweet_youtube_video.json`を開く
    1. `"path"`に`host/index.js`への絶対パスを貼り付ける
    2. `"allowed_origins"`に拡張機能のIDを貼り付ける
7. `host/tweet_youtube_video.json`を`~/Library/Application\ Support/Google/Chrome/NativeMessagingHosts`にコピーする
8. `node`と`host/index.js`が実行可能なことを確認する
    > \[重要\] MacOSにて，ターミナルで実行可能にも関わらず，Native Messagingのホストプログラムとしてうまく動作しないことがある．これはChromeの軌道方法によって引き継ぐパスが異なることが原因である．zsh等のターミナルではnodeへのパスが通っていても，Launchpadによって起動されたChromeからはnodeが見つけられないからである．少し昔のhomebrewで入れたnodeであれば`/usr/local/bin/node`にあるので問題ないのだが，nodenvやasdfなどのバージョン管理ツールを使ってnodeをインストールしている場合，この問題に直面する．解決法としては，`/usr/local/bin/node`にシンボリックリンクを貼ることで問題は解消される．（例↓）

    ```
    ln -s /Users/momosuke/.asdf/shims/node /usr/local/bin/node
    ```

## 使い方

1. YouTubeの動画ページにアクセスして，高評価ボタンの左側に「Tweet Video」ボタンが表示されて，押すとツイートされることを確認する（少し時間がかかる）

## デモ

![](./tweet-youtube-video-demo.gif)

## 参考記事

- [Chrome拡張機能とローカルアプリでプロセス間通信](https://dev.classmethod.jp/articles/chrome-native-message/)
- [動的なページの読み込みが完了してからChrome拡張機能を実行する方法](https://qiita.com/3mc/items/c3c580ca5de4a2d3990d)
- [scripting.executeScript()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/executeScript)

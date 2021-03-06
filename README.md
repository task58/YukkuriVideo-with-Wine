# YuikkuriVideo with Wine

(旧 YBCL with wine)

## このソフトの目標

このソフトの目標は、LinuxやMacのユーザーでもゆっくり実況の作成をできるようにすることです。
これまで、ゆっくり実況の作成やゆっくり生放送などはほぼWindowsユーザーのみにしかできませんでした。
自分みたいにWindowsを持っていない人でもゆっくり実況を作ることがができる。
そんなソフトを目指しています。

## 前提条件

・node.js
・wineの32bit環境
・SofTalk .NET版
・Google Chrome

このソフトはchrome音声認識を使用します。

## セットアップ

1. node.jsを導入 ググったらたくさん出てくるので自分で入れてください
2. wineを導入 ググったらたくさん出てくるので(ry ※32bit環境のwineを構築してください
3. SofTalkをセットアップ ※手順2、3は[こちら](https://task58yt.blogspot.com/2021/10/ubuntunetsoftalk.html)で解説しています(Ubuntuの場合です)
4. Google Chromeをインストール
5. このソフトのディレクトリ直下にsoftalkフォルダを入れる
6. このソフトのディレクトリで「npm install」を実行する

## 起動

「npm start」を実行すると、
「このソフトではsoftalkフォルダ内のsoftalkw.exeを使用します。」
と表示された後、
「使用するプリセット名を入力してください」
と聞かれます。ここで、softalkwに保存されているプリセット名を指定します。
その後、「プログラムを開始します」と指定したプリセットの音声で再生されるはずです。
そうしたら起動成功です。

## 使い方

[http://localhost:8000]にアクセスし、そこにある「rec!」ボタンを押せば録音が開始されます。
その後しばらくしたらゆっくり音声が再生されます。

## アプリケーションディレクトリ

アプリケーションディレクトリとして、wine環境に
C:users\username\YukkuriVoiceW
が自動で作成され、ホームディレクトリにショートカットが作成されます。
録音された音声等はこのアプリケーションディレクトリに保存されます
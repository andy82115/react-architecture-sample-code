# 開発ステップ

1. Github apiのドキュメントをチェックする
   [search/repository](https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories)
   ,
   [query detail of "search/repository"](https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories)

2. ビルド環境とサードパーティ git action, storybook, lint, preitter,...etc
3. api serviceとapi単体テストの作成
4. 基本アーキテクチャの構築とステートコントローラの構築
5. SearchRepository Page, 資料が多い場合ScrollView -> (Virtuoso)
6. DetailRepository Pageの作成
7. ダブルチェック
8. 基本的にオーケー
9. その他

# アーキテクチャ

![Arch Image](/docs/architecture.jpg)

# このプロジェクトの実行方法 :sunglasses:

Step1

```
npm i
```

Step2 -> for check storybook

```
npm run storybook
```

Step3 -> create -> .env.local -> 以下の設定をコピーする

```
NEXT_PUBLIC_GIT_API_URL="https://api.github.com/"

NEXT_PUBLIC_GIT_TOKEN="PUT YOUR TOKEN AT HERE"

REQUEST_TIMEOUT=10000
```

Step4 -> トークンをGithub Apiトークンに変更する

```
NEXT_PUBLIC_GIT_TOKEN="PUT YOUR TOKEN AT HERE"
```

Step5

```
npm run dev
```
Step6 -> VSCode "[Better Comments](https://github.com/aaron-bond/better-comments)" プラグインをインストール（任意）


# スクリーンテスト

 - [x] iphone 7
 - [x] android
 - [x] web site

# Introduce of dir
- app // \* Main Pages and App Router
- components // \* Share Component , Page Component
- src // \* Business Logic Layer
	- share // \* Sharing Things. Ex: Api, LocalStorage...
	- search // \* Search page architecture
		- data // \* Datasource andRepository Implement
		- domain // \* Abstract layer
		- presenter // \*  statecontroller layer
# Golang & Next.js & GraphQL & Apollo Client Template

## Server Side

gqlgen：GraphQL サーバーを作る際に「スキーマファースト」で「型安全性を保ったまま」「コードを自動生成」できる Golang のライブラリ

```
go get -u github.com/99designs/gqlgen@latest
go run github.com/99designs/gqlgen init
```

生成ファイル一覧

- graph/resolver.go
  - ルートとなる resolver 構造体
- ★ graph/schema.graphqls
  - GraphQL スキーマ定義ファイル。このファイルをもとにコード生成。
- gqlgen.yml
  - gqlgen の設定ファイル。shcema の分割などの設定も可能。

以下は schema.graphqls を変更したら再生成する

- graph/generated/generated.go
  - GraphQL サーバーに対するリクエストを解釈し graph/resolver.go の適切なメソッド呼ぶ役割
  - 手を加える必要なし
- graph/model/models_gen.go
  - schema で定義した type や input を golang 変換したもの
  - 手を加える必要なし
- graph/schema.resolver.go
  - リクエストを元に実際の処理を実装する resolver
  - 初期生成後は空実装のため、ここに実装をしていく
  - 再生成しても、実装した処理は消えない

再生成コマンド

```
go run github.com/99designs/gqlgen generate
```

GraphQL Playground 起動

```
go run server.go
```

gqlgen.yml に 自身が定義しているモデルを使用するよう定義可能

```gqlgen.yml
models:
  Todo:
    model: github.com/Symthy/go-nextjs-graphql-template/graph/model.Todo
```

```golang
package model

type Todo struct {
	ID     string
	Text   string
	Done   bool
	UserID string
}
```

※Todo を ↑ に変えると gqlgen.yml の Todo と差異が生じるため

> mutation の CreateTodo や query の Todos によって todo struct が返された際、schema 中の todo type が指定している User フィールドを todo struct が持っていないため todoResolver に対して定義されているメソッドである User メソッドが呼び出される

```
type Todo {
  id: ID!
  text: String!
  done: Boolean!
  user: User!
}
```

レスポンスは ↑ のため、足りない User を作るために `func (r *todoResolver) User()` を呼び出す

## Front End

```
npx create-next-app@latest --ts
```

```
yarn add graphql @apollo/client
yarn add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-graphql-request @graphql-codegen/typescript-operations @graphql-codegen/typescript-resolvers
```

```
mkdir graphql
mkdir graphql/query
touch graphql/codegen-server.yaml
touch graphql/query/todo.graphql
```

graphql/codegen-server.yaml：スキーマ情報から自動生成する時の設定を記述

```
schema: ./graphql/schema.graphql
documents: ./graphql/query/*.graphql
generates:
  ./graphql/dist/client.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-graphql-request
```

## refs

[gqlgen チュートリアルをできるだけわかりやすく解説する](https://zenn.dev/omoterikuto/articles/a43c989ca36073)

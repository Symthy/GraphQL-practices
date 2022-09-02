# graphql

VSCode 拡張機能: Apollo GraphQL インストール推奨

ref:[[GraphQL] TypeScript+VSCode+Apollo で最高の DX を手に入れよう](https://dev.classmethod.jp/articles/apollo-good-dx/)

## backend

### apollo-server

```
npm install apollo-server graphql
```

公式ドキュメント参照

https://www.apollographql.com/docs/apollo-server/getting-started

リゾルバ関数：

- スキーマで定義した Query に実際に値を入れる（解決する）ための関数

typescript 導入で構築するなら以下参照

[Apollo Server with TypeScript](https://zenn.dev/intercept6/articles/3daca0298d32d8022e71)

gts を使用

- gts：Google TypeScript Style という Google 流の TypeScript のガイドラインを ESLint と Prettier の設定としてセットアップしてくれるツール

```
npm i @graphql-tools/graphql-file-loader @graphql-tools/load @graphql-tools/schema
```

Graphql codegen のセットアップ

[Apollo ServerとPrismaではじめるGraphQL API 開発入門 - Graphql codegenの環境をセットアップする](https://zenn.dev/eringiv3/books/a85174531fd56a/viewer/382755)

```
@graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers
```

### prisma

https://www.prisma.io/docs/getting-started/quickstart

- Prisma-CLI インストール

https://www.prisma.io/docs/concepts/components/prisma-cli/installation#local-installation-recommended

```
npm install prisma --save-dev
```

typescript の場合

```
npm install prisma typescript ts-node @types/node --save-dev
```

https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres

- Prisma Client インストール

https://www.prisma.io/docs/concepts/components/prisma-client#2-installation

```
npm install @prisma/client
```

- 初期化

https://www.prisma.io/docs/reference/api-reference/command-reference#init

```
npx prisma init
```

- スキーマ（schema.prisma）を記載し、Migrate

https://www.prisma.io/docs/concepts/components/prisma-migrate

```
npx prisma migrate dev --name init
```

- Prisma Client 生成

https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client

```
npx prisma generate
```

- 実装

https://www.prisma.io/docs/concepts/components/prisma-client/crud

### server 起動

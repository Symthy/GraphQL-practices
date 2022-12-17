# Go gqlgen trial

## Quick Start Memo

### Add github.com/99designs/gqlgen to your project’s tools.go

```
printf '// +build tools\npackage tools\nimport (_ "github.com/99designs/gqlgen"\n _ "github.com/99designs/gqlgen/graphql/introspection")' | gofmt > tools.go
```

以下ができる

```
//go:build tools
// +build tools

package tools

import (
	_ "github.com/99designs/gqlgen"
	_ "github.com/99designs/gqlgen/graphql/introspection"
)
```

### Initialise gqlgen config and generate models

```
go run github.com/99designs/gqlgen init
```

graph フォルダができ、雛形(schema.graphqls やコード)が生成される

再生成は以下

```
go install github.com/99designs/gqlgen
gqlgen
```

### オーバーフェッチ対策

指定のフィールドが、リクエストに含まれる時のみ呼ばれるメソッド（リゾルバー）を用意可能。それにより無駄な DB フェッチが走らないよう実装ができる

- gqlgen.yml への記載による明示的な生成方法

```graphql
type User {
  id: ID!
  name: String!
  profile: Profile!
  friends: User # 追加
}
```

```yaml
# gqlgen.yml
models:
  # : (ry
  User:
    fields:
      friends:
        resolver: true # 追加
```

リゾルバが自動生成される

```go
type UserResolver interface {
	Friends(ctx context.Context, obj *model.User) (*model.User, error)
}
```

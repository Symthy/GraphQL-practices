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

graph フォルダができ、基本セット(schema.graphqls やコード)が生成される

package graph

import "github.com/Symthy/go-nextjs-graphql-template/graph/model"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	todos []*model.Todo // 動作確認のためインメモリ上にデータを保管

}

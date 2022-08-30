const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

// HackNewsの投稿データ
let links = [
  {
    id: "link-0",
    description: "test",
    url: "http://test.com",
  },
];

// リゾルバ関数
const resolvers = {
  Query: {
    info: () => "HckerNes Clone",
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  csrfPrevention: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

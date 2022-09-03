import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {loadSchemaSync} from '@graphql-tools/load';
import {addResolversToSchema} from '@graphql-tools/schema';
import {ApolloServer} from 'apollo-server';
import {join} from 'path';
import {getUserId} from './auth';
import {resolvers} from './resolver';

const schema = loadSchemaSync(join(__dirname, '../schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});
const schemaWithResolvers = addResolversToSchema({schema, resolvers});

const server = new ApolloServer({
  schema: schemaWithResolvers,
  cors: true,
  context: ({req}) => {
    return {
      ...req,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});

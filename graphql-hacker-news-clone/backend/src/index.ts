import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {loadSchemaSync} from '@graphql-tools/load';
import {ApolloServer} from 'apollo-server-express'; // eslint-disable-line node/no-extraneous-import
import {join} from 'path';
import {getUserId} from './auth/index.js';
import {createServer} from 'http';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {WebSocketServer} from 'ws';
import {useServer} from 'graphql-ws/lib/use/ws';
import express from 'express'; // eslint-disable-line node/no-extraneous-import
import {resolvers} from './resolver/index.js';

import {fileURLToPath} from 'node:url';
import path from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// load graphql schema
const typeDefs = loadSchemaSync(join(__dirname, '../schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});
// const schemaWithResolvers = addResolversToSchema({schema, resolvers});
const schema = makeExecutableSchema({typeDefs, resolvers});

const app = express();
const httpServer = createServer(app);

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if your ApolloServer serves at
  // a different path.
  path: '/graphql',
});
// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({schema}, wsServer);

const server = new ApolloServer({
  schema: schema,
  context: ({req}) => {
    return {
      ...req,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({httpServer}),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    ApolloServerPluginLandingPageLocalDefault({embed: true}),
  ],
});

await server.start();
server.applyMiddleware({app});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server is now running on http://localhost:${PORT}${server.graphqlPath}`
  );
});

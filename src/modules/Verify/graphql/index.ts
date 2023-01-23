import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { ICommonRoutesConfig } from '@interfaces';

import { VerifySchema } from './verify.schema';
import { VerifyResolver } from './verify.resolver';

async function routes(props: ICommonRoutesConfig & { resource: string }) {
  if (!props.server) throw new Error('Server not found');

  const server = new ApolloServer({
    typeDefs: VerifyGraphql.schema,
    resolvers: VerifyGraphql.resolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: props.server })],
  });

  await server.start();

  props.app.use('/graphql', expressMiddleware(server));

  return props.app;
}

const VerifyGraphql = {
  schema: VerifySchema,
  resolver: VerifyResolver,
  routes,
};

export default VerifyGraphql;

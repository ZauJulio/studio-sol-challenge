import express, { Request, Response } from 'express';
import { Server as HttpServer } from 'http';

import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';

import debug from 'debug';

import { IGraphql, BaseModule } from '@interfaces';
import { loadModules } from '@utils';

class AppController {
  server: HttpServer;
  graphqlModules: IGraphql[];

  log = debug('app:controller');
  router = express.Router();

  constructor(props: { server: HttpServer }) {
    this.server = props.server;
    this.graphqlModules = [];

    this.build();
  }

  async build() {
    this.buildDefaultRoute();
    await this.buildRESTRoutes();
    await this.buildGraphqlRoutes();
  }

  buildDefaultRoute() {
    this.router.get('/', (req: Request, res: Response) =>
      res
        .status(200)
        .send(`Server running at http://localhost:${process.env.PORT}`),
    );
  }

  async buildRESTRoutes() {
    for (const _module of await loadModules(this.server)) {
      this.router.use(`/${_module.name}`, _module.router);

      if (_module.graphql) this.graphqlModules.push(_module.graphql);

      this.logRoutes(_module);
    }
  }

  async buildGraphqlRoutes() {
    const server = new ApolloServer({
      typeDefs: this.graphqlModules.map((module) => module.schema),
      resolvers: this.graphqlModules.map((module) => module.resolver),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.server })],
    });

    await server.start();

    this.router.use('/graphql', expressMiddleware(server));

    this.log('GraphQL - /graphql');
  }

  logRoutes(_moduleInstance: BaseModule<any, any, any>) {
    for (const _layer of _moduleInstance.router.stack) {
      const _path = _layer.route?.path;
      const _methods = Object.keys(_layer.route?.methods).join(', ');

      this.log(`${_path} - ${_methods}`);
    }
  }
}

export function registerAppController(props: {
  app: express.Application;
  server: HttpServer;
}) {
  props.app.use(new AppController(props).router);
}

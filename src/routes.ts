import { Server as HttpServer } from 'http';
import express from 'express';
import debug from 'debug';

import { VerifyModule } from '@modules';

import { CommonRoutesConfig } from '@config';

const debugLog: debug.IDebugger = debug('app:routes');

class Routes {
  routes: Array<CommonRoutesConfig>;
  app: express.Application;
  server: HttpServer;

  constructor(props: { app: express.Application; server: HttpServer }) {
    this.app = props.app;
    this.server = props.server;

    this.routes = [];

    this.configureRoutes();
  }

  configureRoutes() {
    this.routes.push(new VerifyModule.VerifyRoutes(this));

    this.routes.forEach((route: CommonRoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
    });
  }
}

export default Routes;

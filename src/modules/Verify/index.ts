import { Server } from 'http';

import VerifyController from './verify.controller';
import VerifyMiddleware from './verify.middleware';
import VerifyService from './verify.service';

import VerifyGraphql from './graphql';

import { IModule } from '@interfaces';

export class VerifyModule extends IModule<VerifyMiddleware, VerifyController> {
  async routes() {
    this.router.post(
      '/',
      this.middleware.validateBodyFields,
      this.controller.verify,
    );
  }
}

export default function Module(server: Server) {
  const _module = new VerifyModule({
    server,
    name: 'verify',
    service: VerifyService,
    middleware: VerifyMiddleware,
    controller: VerifyController,
    graphql: VerifyGraphql,
  });

  return _module;
}

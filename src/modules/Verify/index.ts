import { Server } from 'http';

import VerifyController from './verify.controller';
import VerifyMiddleware from './verify.middleware';
import VerifyService from './verify.service';
import VerifyGraphql from './graphql';

import { BaseModule } from '@interfaces';

export class VerifyModule extends BaseModule<
  VerifyMiddleware,
  VerifyController,
  VerifyService
> {
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

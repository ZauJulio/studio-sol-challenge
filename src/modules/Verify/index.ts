import VerifyService from '@modules/Verify/verify.service';
import VerifyController from '@modules/Verify/verify.controller';
import VerifyMiddleware from '@modules/Verify/verify.middleware';

import VerifyGraphql from '@modules/Verify/graphql';

import { CommonRoutesConfig } from '@config';
import { ICommonRoutesConfig } from '@interfaces';

class VerifyRoutes extends CommonRoutesConfig {
  constructor(props: ICommonRoutesConfig) {
    super({ ...props, name: 'VerifyRoutes' });
  }

  async configureRoutes() {
    this.app
      .route('/verify')
      .all(VerifyMiddleware.validateBodyFields)
      .post(VerifyController.verify);

    await VerifyGraphql.routes({ ...this, resource: '' });

    return this.app;
  }
}

export { VerifyRoutes, VerifyController, VerifyService, VerifyMiddleware };

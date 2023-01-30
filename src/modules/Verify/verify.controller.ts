import { Request, Response } from 'express';

import { IController } from '@interfaces';

export class VerifyController extends IController {
  verify = async (req: Request, res: Response) => {
    const { password, rules } = req.body;

    const { verify, noMatch } = this.service.validate({
      password,
      rules,
    });

    return res.status(200).send({ verify, noMatch });
  };
}

export default VerifyController;

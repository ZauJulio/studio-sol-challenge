import { Request, Response } from 'express';
import { VerifyService } from '@modules/Verify';

class VerifyController {
  async verify(req: Request, res: Response) {
    const { password, rules } = req.body;

    const { verify, noMatch } = await VerifyService.validate({
      password,
      rules,
    });

    res.status(200).send({ verify, noMatch });
  }
}

export default new VerifyController();

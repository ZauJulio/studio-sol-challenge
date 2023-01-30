import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '@interfaces';
import { IRule } from '@types';

export default class VerifyMiddleware extends IMiddleware {
  validateBodyFields = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const rules = req.body.rules;
    const password = req.body.password;

    if (!rules || rules.length === 0) {
      this.log('Missing Rules Fields');
      // return res.status(400).send({ error: 'Missing Rules Fields' });
      return res.status(200).json({ verify: true, noMatch: [] });
    }

    if (!rules.every((rule: IRule) => rule.rule && rule.value)) {
      this.log('Missing Rule Fields');
      // return res.status(400).send({ error: 'Missing Rule Fields' });
      return res.status(200).json({ verify: true, noMatch: [] });
    }

    if (!password) {
      this.log('Missing Password Field');
      // return res.status(400).send({ error: 'Missing Password Field' });
      return res.status(200).json({
        verify: false,
        noMatch: rules.map((r: IRule) => r.rule),
      });
    }

    this.log('Valid Body Fields');
    next();
  };
}

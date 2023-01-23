import { NextFunction, Request, Response } from 'express';
import debug from 'debug';
import { IRules } from '@interfaces';

const log: debug.IDebugger = debug('app:verify-middleware');

class VerifyMiddleware {
  async validateBodyFields(req: Request, res: Response, next: NextFunction) {
    const rules = req.body.rules;

    if (!rules || rules.length === 0) {
      log('Missing Rules Fields');
      // return res.status(400).send({ error: 'Missing Rules Fields' });
      return res.status(200).json({ verify: true, noMatch: [] });
    }

    if (!rules.every((rule: IRules) => rule.rule && rule.value)) {
      log('Missing Rule Fields');
      // return res.status(400).send({ error: 'Missing Rule Fields' });
      return res.status(200).json({ verify: true, noMatch: [] });
    }

    log('Valid Body Fields');
    next();
  }
}

export default new VerifyMiddleware();

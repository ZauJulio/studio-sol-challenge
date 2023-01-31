import { VerifyService } from '../verify.service';
import { IResolvers } from '@graphql-tools/utils';

const _instance = new VerifyService({ name: 'verify' });

export const VerifyResolver: IResolvers = {
  Query: {
    verify: (_: any, args: any) => _instance.validate(args),
  },
};

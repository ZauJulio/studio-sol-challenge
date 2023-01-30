import { _instance } from '../verify.service';
import { IResolvers } from '@graphql-tools/utils';

export const VerifyResolver: IResolvers = {
  Query: {
    verify: (_: any, args: any) => _instance.validate(args),
  },
};

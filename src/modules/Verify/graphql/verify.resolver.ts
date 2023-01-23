import { VerifyService } from '@modules/Verify';

export const VerifyResolver = {
  Query: {
    verify: (_: any, args: any) => VerifyService.validate(args),
  },
};

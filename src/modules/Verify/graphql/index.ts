import { VerifySchema } from './verify.schema';
import { VerifyResolver } from './verify.resolver';
import { IGraphql } from '@interfaces';

const VerifyGraphql: IGraphql = {
  schema: VerifySchema,
  resolver: VerifyResolver,
};

export default VerifyGraphql;

import { IResolvers } from '@graphql-tools/utils';
import { DocumentNode } from 'graphql';

export interface IGraphql {
  schema: DocumentNode;
  resolver: IResolvers;
}

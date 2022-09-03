// eslint-disable-next-line node/no-unpublished-import
import {Resolvers} from '../types/generated/graphql';
import * as query from './query';
import * as mutation from './mutation';
import * as link from './link';
import * as user from './user';

export const resolvers: Resolvers = {
  Query: query,
  Mutation: mutation,
  Link: link,
  User: user,
};

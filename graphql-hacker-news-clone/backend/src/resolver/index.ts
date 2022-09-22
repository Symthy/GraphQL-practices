import {Resolvers} from '../types/generated/graphql.js'; // eslint-disable-line node/no-unpublished-import
import * as query from './query.js';
import * as mutation from './mutation.js';
import * as link from './link.js';
import * as user from './user.js';
import * as vote from './vote.js';
import {subscription} from './subscription.js';

export const resolvers: Resolvers = {
  Query: query,
  Mutation: mutation,
  Link: link,
  User: user,
  Subscription: subscription,
  Vote: vote,
};

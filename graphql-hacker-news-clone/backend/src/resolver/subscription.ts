import {pubsub} from '../lib/pubsub.js';
import {Link, SubscriptionResolvers, Vote} from '../types/generated/graphql.js'; // eslint-disable-line node/no-unpublished-import

// AsyncIterable type:
/*
interface SymbolConstructor {
//   readonly asyncIterator: unique symbol;
}
interface AsyncIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>;
}
*/

const newLink: SubscriptionResolvers['newLink'] = {
  subscribe: (parent, args, context, info) => {
    const iterable = pubsub.asyncIterator<Link>(
      'NEW_LINK'
    ) as unknown as AsyncIterable<Link>; // これでいいか分からん
    return iterable;
  },
  resolve: (payload: Link) => payload,
};

const newVote: SubscriptionResolvers['newVote'] = {
  subscribe: (parent, args, context, info) => {
    const iterable = pubsub.asyncIterator<Link>(
      'NEW_VOTE'
    ) as unknown as AsyncIterable<Link>; // これでいいか分からん
    return iterable;
  },
  resolve: (payload: Vote) => payload,
};

export const subscription: SubscriptionResolvers = {
  newLink: newLink,
  newVote: newVote,
};

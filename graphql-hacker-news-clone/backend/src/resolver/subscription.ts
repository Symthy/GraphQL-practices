import {pubsub} from '../lib/pubsub.js';
import {Link, SubscriptionResolvers} from '../types/generated/graphql.js'; // eslint-disable-line node/no-unpublished-import

// AsyncIterable type:
/*
interface SymbolConstructor {
//   readonly asyncIterator: unique symbol;
}
interface AsyncIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>;
}
*/

export const subscription: SubscriptionResolvers = {
  newLink: {
    subscribe: (parent, args, context, info) => {
      const iterable = pubsub.asyncIterator<Link>(
        'NEW_LINK'
      ) as unknown as AsyncIterable<Link>; // これでいいか分からん
      return iterable;
    },
    resolve: (payload: Link) => payload,
  },
};

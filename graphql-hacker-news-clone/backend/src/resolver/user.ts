import {findLinksByUser} from '../repository/userLinkRelQueryService.js';
import {UserResolvers} from '../types/generated/graphql.js'; // eslint-disable-line node/no-unpublished-import

export const links: UserResolvers['links'] = (parent, args, context, info) => {
  const userId = parent.id;
  const links = findLinksByUser(userId);
  return links;
};

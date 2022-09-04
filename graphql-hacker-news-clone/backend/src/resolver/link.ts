import {findPostedUserByLink} from '../repository/userLinkRelQueryService.js';
import {LinkResolvers} from '../types/generated/graphql.js'; // eslint-disable-line node/no-unpublished-import

export const postedBy: LinkResolvers['postedBy'] = (
  parent,
  args,
  context,
  info
) => {
  const linkId = parent.id;
  const user = findPostedUserByLink(linkId);
  return user;
};

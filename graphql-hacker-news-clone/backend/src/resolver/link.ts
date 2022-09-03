import {prisma} from '../lib/prisma.js';
import {LinkResolvers} from '../types/generated/graphql.js'; // eslint-disable-line node/no-unpublished-import

export const postedBy: LinkResolvers['postedBy'] = (
  parent,
  args,
  context,
  info
) => {
  const link = prisma.link
    .findUnique({
      where: {id: parent.id},
    })
    .postedBy();
  return link;
};

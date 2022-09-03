import {prisma} from '../lib/prisma.js';
import {QueryResolvers} from '../types/generated/graphql.js'; // eslint-disable-line node/no-unpublished-import

export const info: QueryResolvers['info'] = async (
  parent,
  args,
  context,
  info
) => {
  return 'Hack News Clone';
};

export const feed: QueryResolvers['feed'] = async (
  parent,
  args,
  context,
  info
) => {
  const links = await prisma.link.findMany();
  return links;
};

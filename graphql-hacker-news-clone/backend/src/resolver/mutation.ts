import {prisma} from '../lib/prisma';
// eslint-disable-next-line node/no-unpublished-import
import {MutationResolvers} from '../types/generated/graphql';

export const post: MutationResolvers['post'] = async (
  parent,
  args,
  context,
  info
) => {
  const newLink = prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
    },
  });
  return newLink;
};

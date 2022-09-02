import {prisma} from '../lib/prisma';
// eslint-disable-next-line node/no-unpublished-import
import {QueryResolvers} from '../types/generated/graphql';

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

//   Mutation: {
//     post: (parent, args, context) => {
//       const newLink = context.prisma.link.create({
//         data: {
//           url: args.url,
//           description: args.description,
//         },
//       });
//       return newLink;
//     },
//   },

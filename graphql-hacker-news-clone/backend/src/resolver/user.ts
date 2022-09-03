import {prisma} from '../lib/prisma';
import {UserResolvers} from '../types/generated/graphql'; // eslint-disable-line node/no-unpublished-import

export const links: UserResolvers['links'] = (parent, args, context, info) => {
  const user = prisma.user
    .findUnique({
      where: {id: parent.id},
    })
    .links();
  return user;
};

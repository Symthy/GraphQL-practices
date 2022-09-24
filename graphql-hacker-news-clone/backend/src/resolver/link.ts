import {prisma} from '@prisma/client';
import {findUniqueLink} from '../repository/linkPrismaRepository.js';
import {findPostedUserByLink} from '../repository/userPrismaRepository.js';
import {findVoteByLink} from '../repository/votePrismaRepository.js';
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

export const votes: LinkResolvers['votes'] = (parent, args, context, info) => {
  const linkId = parent.id;
  const votes = findVoteByLink(linkId);
  return votes;
};

import {findLinkByVote} from '../repository/linkPrismaRepository.js';
import {findUserByVote} from '../repository/userPrismaRepository.js';
import {VoteResolvers} from '../types/generated/graphql.js'; // eslint-disable-line node/no-unpublished-import

export const user: VoteResolvers['user'] = async (
  parent,
  args,
  context,
  info
) => {
  const voteId = parent.id;
  const user = await findUserByVote(voteId);
  return user!;
};

export const link: VoteResolvers['link'] = async (
  parent,
  args,
  context,
  info
) => {
  const voteId = parent.id;
  const link = await findLinkByVote(voteId);
  return link!;
};

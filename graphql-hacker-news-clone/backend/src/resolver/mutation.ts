import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
// eslint-disable-next-line node/no-unpublished-import
import {MutationResolvers} from '../types/generated/graphql.js';
import {buildToken} from '../auth/index.js';
import {pubsub} from '../lib/pubsub.js';
import {findUniqueUser} from '../repository/userPrismaRepository.js';
import {createLink} from '../repository/linkPrismaRepository.js';
import {
  createVote,
  findUniqueVote,
} from '../repository/votePrismaRepository.js';

export const signup: MutationResolvers['signup'] = async (
  parent,
  args,
  context,
  info
) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await prisma.user.create({
    data: {
      ...args,
      password,
    },
  });
  const token = buildToken(user);

  return {
    token,
    user,
  };
};

export const login: MutationResolvers['login'] = async (
  parent,
  args,
  context,
  info
) => {
  const user = await findUniqueUser({
    email: args.email,
  });

  if (!user) {
    throw new Error('Not resister');
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = buildToken(user);
  return {
    token,
    user,
  };
};

export const post: MutationResolvers['post'] = async (
  parent,
  args,
  context,
  info
) => {
  const newLink = await createLink(args, context.userId);

  pubsub.publish('NEW_LINK', newLink);
  return newLink;
};

export const vote: MutationResolvers['vote'] = async (
  parent,
  args,
  context,
  info
) => {
  const vote = await findUniqueVote({
    linkId: args.linkId,
    userId: context.userId,
  });
  if (vote) {
    throw new Error(`2重投票はできません: ${args.linkId}`);
  }

  const newVote = await createVote({
    linkId: args.linkId,
    userId: context.userId,
  });
  pubsub.publish('NEW_VOTE', newVote);
  return newVote;
};

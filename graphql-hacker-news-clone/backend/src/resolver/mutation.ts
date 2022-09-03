import {prisma} from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line node/no-unpublished-import
import {MutationResolvers} from '../types/generated/graphql.js';
import {APP_SECRET_KEY} from '../config/index.js';
import {buildToken} from '../auth/index.js';
import {pubsub} from '../lib/pubsub.js';

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
  const user = await prisma.user.findUnique({
    where: {
      email: args.email,
    },
  });

  if (!user) {
    throw new Error('Not resister');
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({userId: user.id}, APP_SECRET_KEY);
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
  const userId = context.userId;
  const newLink = prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: {connect: {id: userId}},
    },
  });

  pubsub.publish('NEW_LINK', newLink);
  return newLink;
};

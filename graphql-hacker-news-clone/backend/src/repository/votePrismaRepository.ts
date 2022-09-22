import prisma from '../lib/prisma.js';

type FindUniqueVoteArgs = {
  userId: number;
  linkId: number;
};
type CreateVoteArgs = FindUniqueVoteArgs;

export const findUniqueVote = (args: FindUniqueVoteArgs) => {
  const vote = prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: args.userId,
      },
    },
  });
  return vote;
};

export const createVote = (args: CreateVoteArgs) => {
  const newVote = prisma.vote.create({
    data: {
      user: {connect: {id: args.userId}},
      link: {connect: {id: Number(args.linkId)}},
    },
    include: {
      user: true,
      link: true,
    },
  });
  return newVote;
};

export const findVoteByLink = (linkId: number) => {
  const votes = prisma.link
    .findUnique({
      where: {id: linkId},
    })
    .votes({
      include: {
        user: true,
        link: true,
      },
    });
  return votes;
};

import {Link, Prisma} from '@prisma/client';
import prisma from '../lib/prisma.js';

interface LinkRepository {
  getLinks(): Prisma.Prisma__LinkClient<Link | null>;
}

export const getLinks = () => {
  const links = prisma.link.findMany();
  return links;
};

export const findUniqueLink = (linkId: number) => {
  const link = prisma.link.findUnique({
    where: {id: linkId},
  });
  return link;
};

type CreateLink = Pick<Link, 'url' | 'description'>;

export const createLink = (args: CreateLink, userId: number) => {
  const link = prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: {connect: {id: userId}},
    },
  });
  return link;
};

export const findLinkByVote = (voteId: number) => {
  return prisma.vote
    .findUnique({
      where: {id: voteId},
    })
    .link();
};

export const findLinksByUser = (userId: number) => {
  const links = prisma.user
    .findUnique({
      where: {
        id: userId,
      },
    })
    .links();
  return links;
};

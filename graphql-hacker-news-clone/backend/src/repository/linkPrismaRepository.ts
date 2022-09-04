import {Link} from '@prisma/client';
import prisma from '../lib/prisma.js';

export const getLinks = async (): Promise<Link[]> => {
  const links = await prisma.link.findMany();
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

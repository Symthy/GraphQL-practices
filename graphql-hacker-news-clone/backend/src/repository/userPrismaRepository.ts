import prisma from '../lib/prisma.js';

type FindUniqueUser = {
  id?: number;
  email?: string;
};

export const findUniqueUser = (args: FindUniqueUser) => {
  const user = prisma.user.findUnique({
    where: args,
  });
  return user;
};

type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export const createUser = async (args: CreateUser) => {
  const user = prisma.user.create({
    data: args,
  });
  return user;
};

import {findUniqueLink} from './linkPrismaRepository.js';
import {findUniqueUser} from './userPrismaRepository.js';

export const findPostedUserByLink = (linkId: number) => {
  const user = findUniqueLink(linkId).postedBy();
  return user;
};

export const findLinksByUser = (userId: number) => {
  const links = findUniqueUser({id: userId}).links();
  return links;
};

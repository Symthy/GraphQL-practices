import Express from 'express'; // eslint-disable-line node/no-extraneous-import
import jwt from 'jsonwebtoken';
import { APP_SECRET_KEY } from '../config/index.js';
interface TokenInterface {
  userId: number;
}

export const buildToken = (user: {id: number}) => {
  return jwt.sign({userId: user.id}, APP_SECRET_KEY);
};

export const getUserId = (req: Express.Request, authToken?: string) => {
  if (req) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace('Bearer', '');
      if (!token) {
        throw new Error('Not found Token');
      }

      const {userId} = getTokenPayload(token);
      return userId;
    }
  }
  if (authToken) {
    const {userId} = getTokenPayload(authToken);
    return userId;
  }

  throw new Error('No authentication authority');
};

// ref: https://stackoverflow.com/questions/50735675/typescript-jwt-verify-cannot-access-data
const getTokenPayload = (token: string): TokenInterface => {
  return jwt.verify(token, APP_SECRET_KEY) as TokenInterface;
};

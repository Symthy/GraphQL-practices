import {Link} from '@prisma/client';
import {prismaMock} from '../test/singleton.js';

describe('user link relation query service', () => {
  test('find user by link', () => {
    const link: Link = {
      id: 2,
      url: 'http://news2/test.com',
      description: 'test2',
      createdAt: new Date(),
      postedById: 2,
    };
    prismaMock.link.findUnique.mockResolvedValue(link);
  });
});

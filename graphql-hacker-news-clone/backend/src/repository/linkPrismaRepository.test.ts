import {describe, expect, test} from '@jest/globals'; // eslint-disable-line node/no-extraneous-import
import {prismaMock} from '../test/singleton.js';
import {createLink, findUniqueLink, getLinks} from './linkPrismaRepository.js';
import {Link} from '@prisma/client';

describe('link test', () => {
  test('get Links', async () => {
    const expected: Link[] = [
      {
        id: 1,
        url: 'http://news1/test.com',
        description: 'test1',
        createdAt: new Date(),
        postedById: 1,
      },
      {
        id: 2,
        url: 'http://news2/test.com',
        description: 'test2',
        createdAt: new Date(),
        postedById: 2,
      },
    ];

    prismaMock.link.findMany.mockResolvedValue(expected);
    await expect(getLinks()).resolves.toEqual(expected);
  });

  test('find unique link', async () => {
    const userId = 2;
    const expected: Link = {
      id: 2,
      url: 'http://news2/test.com',
      description: 'test2',
      createdAt: new Date(),
      postedById: userId,
    };

    prismaMock.link.findUnique.mockResolvedValue(expected);
    await expect(findUniqueLink(2)).resolves.toEqual(expected);
  });

  test('create link', async () => {
    const createUserId = 3;
    const expected: Link = {
      id: 3,
      url: 'http://news3/test.com',
      description: 'test3',
      createdAt: new Date(),
      postedById: createUserId,
    };

    prismaMock.link.create.mockResolvedValue(expected);
    await expect(
      createLink(
        {
          url: 'http://news3/test.com',
          description: 'test3',
        },
        createUserId
      )
    ).resolves.toEqual(expected);
  });
});

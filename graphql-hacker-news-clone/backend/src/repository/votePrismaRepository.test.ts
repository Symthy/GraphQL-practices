import {Link, User} from '@prisma/client';
import {prismaMock} from '../test/singleton.js';
import {createVote, findUniqueVote} from './votePrismaRepository.js';

describe('vote repository test', () => {
  test('test findUnique vote', async () => {
    const expected = {
      id: 1,
      linkId: 1,
      userId: 1,
    };

    prismaMock.vote.findUnique.mockResolvedValue(expected);
    await expect(findUniqueVote({linkId: 1, userId: 1})).resolves.toEqual(
      expected
    );
  });

  test('test create vote', async () => {
    const expected = {
      id: 1,
      linkId: 1,
      userId: 2,
      link: {
        id: 1,
        createdAt: new Date(),
        description: 'test',
        url: 'http://example/test.com',
        postedById: 1,
      } as Link,
      user: {
        id: 2,
        name: 'SYM',
        email: 'symthy@test.com',
        password: 'password',
      } as User,
    };

    prismaMock.vote.create.mockResolvedValue(expected);
    await expect(createVote({linkId: 1, userId: 2})).resolves.toEqual(expected);
  });
});

import {describe, expect, test} from '@jest/globals'; // eslint-disable-line node/no-extraneous-import
import {prismaMock} from '../test/singleton.js';
import {createUser, findUniqueUser} from './userPrismaRepository.js';

describe('user repository test', () => {
  test('find unique user', async () => {
    const expected = {
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
      password: 'password',
    };

    prismaMock.user.findUnique.mockResolvedValue(expected);
    await expect(findUniqueUser({id: 1})).resolves.toEqual(expected);
    await expect(findUniqueUser({email: 'hello@prisma.io'})).resolves.toEqual(
      expected
    );
  });

  test('create user', async () => {
    const expected = {
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
      password: 'password',
    };

    prismaMock.user.create.mockResolvedValue(expected);
    await expect(
      createUser({name: 'Rich', email: 'hello@prisma.io', password: 'password'})
    ).resolves.toEqual(expected);
  });
});

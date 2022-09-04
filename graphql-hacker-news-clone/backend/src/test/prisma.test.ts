import {describe, expect, test} from '@jest/globals';
import prisma from '../lib/prisma.js';

import { prismaMock } from './singleton.js'

interface CreateUser {
  name: string
  email: string
  password: string
}

export async function createUser(user: CreateUser) {
  return await prisma.user.create({
    data: user,
  })
}

interface UpdateUser {
  id: number
  name: string
  email: string
}

export async function updateUsername(user: UpdateUser) {
  return await prisma.user.update({
    where: { id: user.id },
    data: user,
  })
}

describe('prisma test sample', () => {
  test('should create new user ', async () => {
    const user = {
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
      password: 'password',
    }

    prismaMock.user.create.mockResolvedValue(user)
  
    await expect(createUser(user)).resolves.toEqual({
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
      password: 'password',
    })
  })

  test('should update a users name ', async () => {
    const user = {
      id: 1,
      name: 'Rich Haines',
      email: 'hello@prisma.io',
      password: 'password',
    }
  
    prismaMock.user.update.mockResolvedValue(user)
  
    await expect(updateUsername(user)).resolves.toEqual({
      id: 1,
      name: 'Rich Haines',
      email: 'hello@prisma.io',
      password: 'password',
    })
  })
})
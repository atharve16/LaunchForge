import { ForbiddenException } from '@nestjs/common';
import { jest } from '@jest/globals';
import { UsersService } from '../src/modules/users/users.service.js';

describe('UsersService', () => {
  const prisma = {
    user: {
      findUnique: jest.fn<(args: unknown) => Promise<unknown>>(),
      upsert: jest.fn<(args: unknown) => Promise<unknown>>(),
    },
  };
  const service = new UsersService(prisma as never);
  const identity = {
    id: '7b70d22a-5c98-4e45-a972-97365a3af78a',
    email: 'Founder@Example.com',
    fullName: 'Founder',
    avatarUrl: 'https://example.com/avatar.png',
  };

  beforeEach(() => jest.clearAllMocks());

  it('upserts a profile idempotently for a newly authenticated identity', async () => {
    const profile = { id: identity.id, email: 'founder@example.com', accountStatus: 'ACTIVE' };
    prisma.user.findUnique.mockResolvedValueOnce(null);
    prisma.user.upsert.mockResolvedValueOnce(profile);

    await expect(service.provisionProfile(identity)).resolves.toEqual(profile);
    expect(prisma.user.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: identity.id },
        create: expect.objectContaining({
          id: identity.id,
          email: 'founder@example.com',
          role: 'CLIENT',
        }),
      }),
    );
  });

  it('does not recreate a disabled profile', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({ accountStatus: 'DISABLED' });

    await expect(service.provisionProfile(identity)).rejects.toBeInstanceOf(ForbiddenException);
    expect(prisma.user.upsert).not.toHaveBeenCalled();
  });
});

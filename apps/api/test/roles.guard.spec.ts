import { ForbiddenException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import { jest } from '@jest/globals';
import { RolesGuard } from '../src/common/guards/roles.guard.js';

describe('RolesGuard', () => {
  const reflector = { getAllAndOverride: jest.fn().mockReturnValue(['ADMIN']) };
  const prisma = {
    user: {
      findUnique:
        jest.fn<
          (
            args: unknown,
          ) => Promise<{ role: 'ADMIN' | 'CLIENT'; accountStatus: 'ACTIVE' | 'DISABLED' } | null>
        >(),
    },
  };
  const guard = new RolesGuard(reflector as never, prisma as never);
  const context = {
    getHandler: () => null,
    getClass: () => null,
    switchToHttp: () => ({ getRequest: () => ({ authUser: { id: 'user-id' } }) }),
  } as unknown as ExecutionContext;

  it('rejects an ordinary client from an admin route', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({ role: 'CLIENT', accountStatus: 'ACTIVE' });
    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('rejects a disabled admin', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({ role: 'ADMIN', accountStatus: 'DISABLED' });
    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('allows an active admin based on the database role', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({ role: 'ADMIN', accountStatus: 'ACTIVE' });
    await expect(guard.canActivate(context)).resolves.toBe(true);
  });
});

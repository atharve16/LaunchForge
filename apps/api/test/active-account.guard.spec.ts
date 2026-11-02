import { ForbiddenException, type ExecutionContext } from '@nestjs/common';
import { jest } from '@jest/globals';
import { ActiveAccountGuard } from '../src/common/guards/active-account.guard.js';

describe('ActiveAccountGuard', () => {
  const prisma = {
    user: {
      findUnique:
        jest.fn<(args: unknown) => Promise<{ accountStatus: 'ACTIVE' | 'DISABLED' } | null>>(),
    },
  };
  const guard = new ActiveAccountGuard(prisma as never);
  const context = {
    switchToHttp: () => ({ getRequest: () => ({ authUser: { id: 'user-id' } }) }),
  } as unknown as ExecutionContext;

  it('rejects a missing or inactive application profile', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({ accountStatus: 'DISABLED' });
    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('allows an active application profile', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({ accountStatus: 'ACTIVE' });
    await expect(guard.canActivate(context)).resolves.toBe(true);
  });
});

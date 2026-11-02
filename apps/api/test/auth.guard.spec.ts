import { UnauthorizedException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import { jest } from '@jest/globals';
import { SupabaseAuthGuard } from '../src/common/guards/supabase-auth.guard.js';

describe('SupabaseAuthGuard', () => {
  const verifyAccessToken = jest.fn<(token: string) => Promise<{ id: string; email: string }>>();
  const guard = new SupabaseAuthGuard({ verifyAccessToken } as never);

  function context(authorization?: string) {
    const request = { headers: { authorization } };
    return { switchToHttp: () => ({ getRequest: () => request }) } as unknown as ExecutionContext;
  }

  it('rejects a request without a bearer token', async () => {
    await expect(guard.canActivate(context())).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('attaches only the independently verified identity', async () => {
    const user = { id: '7b70d22a-5c98-4e45-a972-97365a3af78a', email: 'founder@example.com' };
    verifyAccessToken.mockResolvedValueOnce(user);
    const request: { headers: { authorization: string }; authUser?: typeof user } = {
      headers: { authorization: 'Bearer signed-token' },
    };
    const execution = { switchToHttp: () => ({ getRequest: () => request }) } as ExecutionContext;
    await expect(guard.canActivate(execution)).resolves.toBe(true);
    expect(verifyAccessToken).toHaveBeenCalledWith('signed-token');
    expect(request.authUser).toEqual(user);
  });
});

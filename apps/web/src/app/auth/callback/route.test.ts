import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from './route';

const mocks = vi.hoisted(() => ({
  exchangeCodeForSession: vi.fn(),
  createClient: vi.fn(),
  getPublicEnv: vi.fn(() => ({ apiUrl: 'http://localhost:4000/api/v1' })),
}));

vi.mock('@/lib/supabase/server', () => ({ createClient: mocks.createClient }));
vi.mock('@/config/env', () => ({ getPublicEnv: mocks.getPublicEnv }));

function request(path: string) {
  return new NextRequest(`http://localhost:3000/auth/callback${path}`);
}

describe('OAuth callback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.createClient.mockReturnValue({
      auth: { exchangeCodeForSession: mocks.exchangeCodeForSession },
    });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200 }));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('exchanges the code, provisions the profile, and redirects to the requested dashboard path', async () => {
    mocks.exchangeCodeForSession.mockResolvedValueOnce({
      data: { session: { access_token: 'access-token' } },
      error: null,
    });

    const response = await GET(request('?code=oauth-code&next=%2Fdashboard%2Fprofile'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost:3000/dashboard/profile');
    expect(mocks.createClient).toHaveBeenCalledWith({ strictCookieWrites: true });
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/v1/users/me/provision',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: 'Bearer access-token' }),
      }),
    );
  });

  it('returns a visible error redirect when the OAuth exchange fails', async () => {
    mocks.exchangeCodeForSession.mockResolvedValueOnce({
      data: { session: null },
      error: { message: 'invalid code' },
    });

    const response = await GET(request('?code=expired-code'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'http://localhost:3000/login?error=invalid_callback&next=%2Fdashboard',
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it('returns a visible error redirect when profile provisioning fails', async () => {
    mocks.exchangeCodeForSession.mockResolvedValueOnce({
      data: { session: { access_token: 'access-token' } },
      error: null,
    });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));

    const response = await GET(request('?code=oauth-code'));

    expect(response.headers.get('location')).toBe(
      'http://localhost:3000/login?error=profile_provision_failed&next=%2Fdashboard',
    );
  });
});

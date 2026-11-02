import { describe, expect, it } from 'vitest';
import { applySupabaseCookiePolicy, getSupabaseCookieOptions } from './cookies';

describe('Supabase cookie policy', () => {
  it('requires Secure cookies outside local development', () => {
    expect(getSupabaseCookieOptions('production')).toMatchObject({
      secure: true,
      sameSite: 'lax',
      httpOnly: false,
      path: '/',
    });
    expect(getSupabaseCookieOptions('staging')).toMatchObject({ secure: true });
  });

  it('keeps local HTTP development usable', () => {
    expect(getSupabaseCookieOptions('development')).toMatchObject({ secure: false });
    expect(getSupabaseCookieOptions('test')).toMatchObject({ secure: false });
  });

  it('preserves Supabase lifecycle options while enforcing the security policy', () => {
    expect(
      applySupabaseCookiePolicy(
        { maxAge: 3600, secure: false, sameSite: 'none', httpOnly: true },
        'production',
      ),
    ).toEqual({ maxAge: 3600, secure: true, sameSite: 'lax', httpOnly: false, path: '/' });
  });
});

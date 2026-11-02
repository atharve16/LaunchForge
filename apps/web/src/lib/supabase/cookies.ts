import type { CookieOptions } from '@supabase/ssr';

function isLocalEnvironment(nodeEnv: string | undefined): boolean {
  return nodeEnv === 'development' || nodeEnv === 'test';
}

export function getSupabaseCookieOptions(
  nodeEnv: string | undefined = process.env.NODE_ENV,
): CookieOptions {
  return {
    path: '/',
    sameSite: 'lax',
    secure: !isLocalEnvironment(nodeEnv),
    httpOnly: false,
  };
}

export function applySupabaseCookiePolicy(
  options: CookieOptions = {},
  nodeEnv: string | undefined = process.env.NODE_ENV,
): CookieOptions {
  return { ...options, ...getSupabaseCookieOptions(nodeEnv) };
}

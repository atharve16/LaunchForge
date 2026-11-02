import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { safeRedirectPath } from '@/lib/redirects';
import { getPublicEnv } from '@/config/env';

function loginRedirect(origin: string, error: string, next: string) {
  const login = new URL('/login', origin);
  login.searchParams.set('error', error);
  login.searchParams.set('next', next);
  return NextResponse.redirect(login);
}

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const code = request.nextUrl.searchParams.get('code');
  const next = safeRedirectPath(request.nextUrl.searchParams.get('next'));
  if (!code) return loginRedirect(origin, 'missing_code', next);
  const supabase = await createClient({ strictCookieWrites: true });
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.session) {
    console.error('Supabase callback exchange failed.', error?.message ?? 'No session returned.');
    return loginRedirect(origin, 'invalid_callback', next);
  }
  try {
    const response = await fetch(`${getPublicEnv().apiUrl}/users/me/provision`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${data.session.access_token}`, Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) {
      console.error('Application profile provisioning failed in OAuth callback.', response.status);
      return loginRedirect(origin, 'profile_provision_failed', next);
    }
  } catch (provisionError) {
    console.error('Application profile provisioning request failed in OAuth callback.', provisionError);
    return loginRedirect(origin, 'profile_provision_failed', next);
  }
  return NextResponse.redirect(new URL(next, origin));
}

import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { safeRedirectPath } from '@/lib/redirects';
import { getPublicEnv } from '@/config/env';

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const code = request.nextUrl.searchParams.get('code');
  const next = safeRedirectPath(request.nextUrl.searchParams.get('next'));
  if (!code) return NextResponse.redirect(new URL('/login?error=missing_code', origin));
  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.session)
    return NextResponse.redirect(new URL('/login?error=invalid_callback', origin));
  try {
    const response = await fetch(`${getPublicEnv().apiUrl}/users/me/provision`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${data.session.access_token}`, Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok)
      return NextResponse.redirect(new URL(`${next}?notice=profile_pending`, origin));
  } catch {
    return NextResponse.redirect(new URL(`${next}?notice=profile_pending`, origin));
  }
  return NextResponse.redirect(new URL(next, origin));
}

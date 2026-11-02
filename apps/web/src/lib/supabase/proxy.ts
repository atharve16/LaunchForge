import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { requireSupabaseEnv } from '@/config/env';
import { applySupabaseCookiePolicy, getSupabaseCookieOptions } from './cookies';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const env = requireSupabaseEnv();
  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookieOptions: getSupabaseCookieOptions(),
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, applySupabaseCookiePolicy(options)),
        );
        response.headers.set('Cache-Control', 'private, no-store');
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const protectedPath =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/admin');
  if (protectedPath && !data?.claims) {
    const login = request.nextUrl.clone();
    login.pathname = '/login';
    login.searchParams.set('next', `${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(login);
  }
  return response;
}

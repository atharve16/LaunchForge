import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { requireSupabaseEnv } from '@/config/env';
import { applySupabaseCookiePolicy, getSupabaseCookieOptions } from './cookies';

export async function createClient() {
  const cookieStore = await cookies();
  const env = requireSupabaseEnv();
  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookieOptions: getSupabaseCookieOptions(),
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, applySupabaseCookiePolicy(options)),
          );
        } catch {
          /* Server Components cannot write; proxy refreshes sessions. */
        }
      },
    },
  });
}

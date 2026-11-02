import { createBrowserClient } from '@supabase/ssr';
import { requireSupabaseEnv } from '@/config/env';
import { getSupabaseCookieOptions } from './cookies';

let client: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  if (client) return client;
  const env = requireSupabaseEnv();
  client = createBrowserClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookieOptions: getSupabaseCookieOptions(),
  });
  return client;
}

type PublicEnvironmentInput = {
  nodeEnv?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  apiUrl?: string;
  siteUrl?: string;
  bookingUrl?: string;
};

export type PublicEnvironment = {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  apiUrl: string;
  siteUrl: string;
  bookingUrl?: string;
};

const developmentDefaults = {
  apiUrl: 'http://localhost:4000/api/v1',
  siteUrl: 'http://localhost:3000',
} as const;

function isLocalEnvironment(nodeEnv: string | undefined): boolean {
  return nodeEnv === 'development' || nodeEnv === 'test';
}

function parseHttpUrl(name: string, value: string | undefined, requireHttps: boolean): string {
  if (!value) throw new Error(`${name} is required outside local development.`);

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be a valid absolute HTTP(S) URL.`);
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`${name} must use the http or https protocol.`);
  }
  if (requireHttps && url.protocol !== 'https:') {
    throw new Error(`${name} must use https outside local development.`);
  }

  return url.toString().replace(/\/$/, '');
}

export function validatePublicEnv(input: PublicEnvironmentInput): PublicEnvironment {
  const local = isLocalEnvironment(input.nodeEnv);
  const apiUrl = parseHttpUrl(
    'NEXT_PUBLIC_API_URL',
    input.apiUrl || (local ? developmentDefaults.apiUrl : undefined),
    !local,
  );
  const siteUrl = parseHttpUrl(
    'NEXT_PUBLIC_SITE_URL',
    input.siteUrl || (local ? developmentDefaults.siteUrl : undefined),
    !local,
  );

  const supabaseUrl = input.supabaseUrl
    ? parseHttpUrl('NEXT_PUBLIC_SUPABASE_URL', input.supabaseUrl, !local)
    : undefined;
  const supabaseAnonKey = input.supabaseAnonKey?.trim() || undefined;

  if (!local && (!supabaseUrl || !supabaseAnonKey)) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required outside local development.',
    );
  }

  const bookingUrl = input.bookingUrl
    ? parseHttpUrl('NEXT_PUBLIC_BOOKING_URL', input.bookingUrl, !local)
    : undefined;

  return { supabaseUrl, supabaseAnonKey, apiUrl, siteUrl, bookingUrl };
}

export function getPublicEnv(): PublicEnvironment {
  return validatePublicEnv({
    nodeEnv: process.env.NODE_ENV,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL,
  });
}

export function requireSupabaseEnv() {
  const env = getPublicEnv();
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error('Supabase browser configuration is missing. See apps/web/.env.example.');
  }
  return { supabaseUrl: env.supabaseUrl, supabaseAnonKey: env.supabaseAnonKey };
}

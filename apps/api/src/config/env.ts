import { z } from 'zod';

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().max(65535).default(4000),
    API_PREFIX: z.string().default('api/v1'),
    WEB_ORIGIN: z.string().default('http://localhost:3000'),
    SUPABASE_JWKS_URL: z.url(),
    SUPABASE_ISSUER: z.url(),
    SUPABASE_AUDIENCE: z.string().trim().min(1).default('authenticated'),
    DATABASE_URL: z.string().min(1),
    LEAD_DEDUP_SECRET: z.string().min(32),
  })
  .superRefine((environment, context) => {
    const jwks = new URL(environment.SUPABASE_JWKS_URL);
    const issuer = new URL(environment.SUPABASE_ISSUER);
    const issuerPath = issuer.pathname.replace(/\/$/, '');
    const jwksPath = jwks.pathname.replace(/\/$/, '');

    if (
      environment.NODE_ENV === 'production' &&
      (jwks.protocol !== 'https:' || issuer.protocol !== 'https:')
    ) {
      context.addIssue({
        code: 'custom',
        path: ['SUPABASE_JWKS_URL'],
        message: 'Supabase issuer and JWKS URLs must use HTTPS in production.',
      });
    }
    if (jwks.origin !== issuer.origin) {
      context.addIssue({
        code: 'custom',
        path: ['SUPABASE_JWKS_URL'],
        message: 'Supabase issuer and JWKS URLs must use the same origin.',
      });
    }
    if (issuerPath !== '/auth/v1') {
      context.addIssue({
        code: 'custom',
        path: ['SUPABASE_ISSUER'],
        message: 'Supabase issuer must end with /auth/v1.',
      });
    }
    if (jwksPath !== '/auth/v1/.well-known/jwks.json') {
      context.addIssue({
        code: 'custom',
        path: ['SUPABASE_JWKS_URL'],
        message: 'Supabase JWKS URL must end with /auth/v1/.well-known/jwks.json.',
      });
    }
  });

export type Environment = z.infer<typeof envSchema>;

export function validateEnvironment(config: Record<string, unknown>): Environment {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    throw new Error(`Invalid environment configuration: ${z.prettifyError(result.error)}`);
  }
  return result.data;
}

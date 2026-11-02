import { validateEnvironment } from '../src/config/env.js';

const valid = {
  NODE_ENV: 'production',
  WEB_ORIGIN: 'https://launchforge.example',
  SUPABASE_JWKS_URL: 'https://project.supabase.co/auth/v1/.well-known/jwks.json',
  SUPABASE_ISSUER: 'https://project.supabase.co/auth/v1',
  SUPABASE_AUDIENCE: 'authenticated',
  DATABASE_URL: 'postgresql://runtime.invalid/database',
  LEAD_DEDUP_SECRET: 'test-only-value-that-is-at-least-32-characters',
};

describe('validateEnvironment', () => {
  it('accepts complete asymmetric Supabase JWT configuration', () => {
    expect(validateEnvironment(valid)).toMatchObject(valid);
  });

  it('rejects missing JWT configuration', () => {
    expect(() => validateEnvironment({ ...valid, SUPABASE_JWKS_URL: undefined })).toThrow(
      'Invalid environment configuration',
    );
  });

  it('rejects non-HTTPS production and mismatched Supabase endpoints', () => {
    expect(() =>
      validateEnvironment({
        ...valid,
        SUPABASE_JWKS_URL: 'http://project.supabase.co/auth/v1/.well-known/jwks.json',
        SUPABASE_ISSUER: 'http://project.supabase.co/auth/v1',
      }),
    ).toThrow('must use HTTPS');

    expect(() =>
      validateEnvironment({
        ...valid,
        SUPABASE_JWKS_URL: 'https://other.supabase.co/auth/v1/.well-known/jwks.json',
      }),
    ).toThrow('must use the same origin');
  });
});

import { describe, expect, it } from 'vitest';
import { validatePublicEnv } from './env';

describe('validatePublicEnv', () => {
  it('uses localhost defaults only in development', () => {
    expect(validatePublicEnv({ nodeEnv: 'development' })).toMatchObject({
      apiUrl: 'http://localhost:4000/api/v1',
      siteUrl: 'http://localhost:3000',
    });
  });

  it('rejects missing production URLs and Supabase configuration', () => {
    expect(() => validatePublicEnv({ nodeEnv: 'production' })).toThrow(
      'NEXT_PUBLIC_API_URL is required',
    );
  });

  it('rejects malformed and non-HTTPS production URLs', () => {
    expect(() =>
      validatePublicEnv({
        nodeEnv: 'production',
        apiUrl: 'not-a-url',
        siteUrl: 'https://launchforge.example',
        supabaseUrl: 'https://project.supabase.co',
        supabaseAnonKey: 'public-key',
      }),
    ).toThrow('NEXT_PUBLIC_API_URL must be a valid absolute HTTP(S) URL');

    expect(() =>
      validatePublicEnv({
        nodeEnv: 'production',
        apiUrl: 'http://api.launchforge.example/api/v1',
        siteUrl: 'https://launchforge.example',
        supabaseUrl: 'https://project.supabase.co',
        supabaseAnonKey: 'public-key',
      }),
    ).toThrow('NEXT_PUBLIC_API_URL must use https');
  });

  it('accepts and normalizes complete production configuration', () => {
    expect(
      validatePublicEnv({
        nodeEnv: 'production',
        apiUrl: 'https://api.launchforge.example/api/v1/',
        siteUrl: 'https://launchforge.example/',
        supabaseUrl: 'https://project.supabase.co/',
        supabaseAnonKey: 'public-key',
        bookingUrl: 'https://calendar.example/launchforge/',
      }),
    ).toEqual({
      apiUrl: 'https://api.launchforge.example/api/v1',
      siteUrl: 'https://launchforge.example',
      supabaseUrl: 'https://project.supabase.co',
      supabaseAnonKey: 'public-key',
      bookingUrl: 'https://calendar.example/launchforge',
    });
  });
});

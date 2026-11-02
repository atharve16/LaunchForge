import { describe, expect, it } from 'vitest';
import { safeRedirectPath } from './redirects';

describe('safeRedirectPath', () => {
  it('allows intended authenticated destinations', () => {
    expect(safeRedirectPath('/dashboard/projects?from=login')).toBe(
      '/dashboard/projects?from=login',
    );
  });
  it.each(['https://evil.example', '//evil.example/path', '/contact', '/\\evil'])(
    'rejects an unsafe redirect: %s',
    (value) => {
      expect(safeRedirectPath(value)).toBe('/dashboard');
    },
  );
});

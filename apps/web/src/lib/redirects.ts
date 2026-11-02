const allowedRoots = ['/dashboard', '/admin'];

export function safeRedirectPath(
  value: string | null | undefined,
  fallback = '/dashboard',
): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\'))
    return fallback;
  try {
    const url = new URL(value, 'http://local.invalid');
    if (url.origin !== 'http://local.invalid') return fallback;
    return allowedRoots.some((root) => url.pathname === root || url.pathname.startsWith(`${root}/`))
      ? `${url.pathname}${url.search}`
      : fallback;
  } catch {
    return fallback;
  }
}

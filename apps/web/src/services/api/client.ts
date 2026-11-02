import type { ApiErrorResponse, ApiSuccessResponse } from '@launchforge/shared';
import { getPublicEnv } from '@/config/env';
import { createClient } from '@/lib/supabase/browser';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code = 'REQUEST_FAILED',
    public readonly details?: unknown,
  ) {
    super(message);
  }
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
  authenticated = false,
  accessToken?: string,
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (init.body) headers.set('Content-Type', 'application/json');
  if (authenticated) {
    const token = accessToken ?? (await createClient().auth.getSession()).data.session?.access_token;
    if (!token)
      throw new ApiError('Please sign in to continue.', 401, 'NOT_AUTHENTICATED');
    headers.set('Authorization', `Bearer ${token}`);
  }
  const response = await fetch(`${getPublicEnv().apiUrl}${path}`, { ...init, headers });
  const payload = (await response.json().catch(() => null)) as
    | ApiSuccessResponse<T>
    | ApiErrorResponse
    | null;
  if (!response.ok || !payload || !payload.success) {
    const error = payload && !payload.success ? payload.error : undefined;
    throw new ApiError(
      error?.message ?? 'The service is temporarily unavailable.',
      response.status,
      error?.code,
      error?.details,
    );
  }
  return payload.data;
}

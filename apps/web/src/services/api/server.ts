import type { ApiErrorResponse, ApiSuccessResponse } from '@launchforge/shared';
import { getPublicEnv } from '@/config/env';
import { createClient } from '@/lib/supabase/server';

export async function serverApiRequest<T>(path: string): Promise<T> {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claimsData?.claims) throw new Error('NOT_AUTHENTICATED');
  const { data } = await supabase.auth.getSession();
  if (!data.session?.access_token) throw new Error('NOT_AUTHENTICATED');
  const response = await fetch(`${getPublicEnv().apiUrl}${path}`, {
    headers: { Authorization: `Bearer ${data.session.access_token}`, Accept: 'application/json' },
    cache: 'no-store',
  });
  const payload = (await response.json().catch(() => null)) as
    | ApiSuccessResponse<T>
    | ApiErrorResponse
    | null;
  if (!response.ok || !payload?.success)
    throw new Error(payload && !payload.success ? payload.error.code : `HTTP_${response.status}`);
  return payload.data;
}

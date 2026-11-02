import type { Metadata } from 'next';
import { StatusPanel } from '@/components/ui/status-panel';
import { serverApiRequest } from '@/services/api/server';
import { endpoints } from '@/services/api/endpoints';

export const metadata: Metadata = { title: 'Profile', robots: { index: false, follow: false } };
type Profile = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  phoneNumber: string | null;
  role: string;
  accountStatus: string;
};
export default async function ProfilePage() {
  let profile: Profile | undefined;
  let errorMessage: string | undefined;
  try {
    profile = await serverApiRequest<Profile>(endpoints.me);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'The profile service is unavailable.';
  }
  return (
    <div>
      <p className="text-accent font-mono text-xs tracking-[.16em] uppercase">Account</p>
      <h1 className="font-heading mt-3 text-3xl font-semibold">Profile</h1>
      {profile ? (
        <dl className="border-line bg-line mt-8 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2">
          {[
            ['Full name', profile.fullName ?? 'Not provided'],
            ['Email', profile.email],
            ['Phone', profile.phoneNumber ?? 'Not provided'],
            ['Role', profile.role],
            ['Status', profile.accountStatus],
            ['Supabase user ID', profile.id],
          ].map(([term, value]) => (
            <div key={term} className="bg-surface p-5">
              <dt className="text-muted font-mono text-[10px] tracking-[.14em] uppercase">
                {term}
              </dt>
              <dd className="text-ink mt-2 text-sm font-medium break-all">{value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="mt-8">
          <StatusPanel title="Profile could not be loaded">
            <p>
              {errorMessage === 'NOT_AUTHENTICATED'
                ? 'Your session is no longer valid. Please sign in again.'
                : 'The authenticated profile API could not be reached. Please retry shortly; no profile data is being simulated.'}
            </p>
          </StatusPanel>
        </div>
      )}
      <div className="mt-6">
        <StatusPanel title="Profile editing is not enabled yet">
          <p>
            Email changes remain owned by Supabase Auth. A validated backend update flow is required
            before editable application fields are exposed.
          </p>
        </StatusPanel>
      </div>
    </div>
  );
}

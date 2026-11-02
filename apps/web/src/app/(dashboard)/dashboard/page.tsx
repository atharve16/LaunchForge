import type { Metadata } from 'next';
import { StatusPanel } from '@/components/ui/status-panel';
import { serverApiRequest } from '@/services/api/server';
import { endpoints } from '@/services/api/endpoints';

export const metadata: Metadata = { title: 'Dashboard', robots: { index: false, follow: false } };
type Profile = { fullName: string | null; email: string; role: string };
export default async function DashboardPage() {
  let profile: Profile | undefined;
  let errorMessage: string | undefined;
  try {
    profile = await serverApiRequest<Profile>(endpoints.me);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'The profile service is unavailable.';
  }
  return (
    <div>
      <p className="text-accent font-mono text-xs tracking-[.16em] uppercase">Client dashboard</p>
      <h1 className="font-heading mt-3 text-3xl font-semibold">
        {profile?.fullName ? `Welcome, ${profile.fullName}` : 'Your LaunchForge workspace'}
      </h1>
      <p className="text-ink-secondary mt-3">
        A secure foundation for project visibility and collaboration as supported features come
        online.
      </p>
      <div className="mt-8">
        {errorMessage ? (
          <StatusPanel title="Profile could not be loaded">
            <p>
              {errorMessage === 'NOT_AUTHENTICATED'
                ? 'Your session is no longer valid. Please sign in again.'
                : 'The authenticated profile service could not be reached. Please retry shortly; no account data is being simulated.'}
            </p>
          </StatusPanel>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-line bg-surface rounded-2xl border p-6">
              <p className="text-muted font-mono text-xs tracking-[.14em] uppercase">
                Signed in as
              </p>
              <p className="mt-3 font-medium">{profile?.email}</p>
            </div>
            <div className="border-line bg-surface rounded-2xl border p-6">
              <p className="text-muted font-mono text-xs tracking-[.14em] uppercase">
                Account type
              </p>
              <p className="mt-3 font-medium">{profile?.role}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6">
        <StatusPanel title="Client project workspace is coming next">
          <p>
            Project records can already be authorized and read through the API. Milestones, files,
            messages and notifications are not implemented yet.
          </p>
        </StatusPanel>
      </div>
    </div>
  );
}

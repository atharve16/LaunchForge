import type { Metadata } from 'next';
import { StatusPanel } from '@/components/ui/status-panel';
export const metadata: Metadata = {
  title: 'Admin services',
  robots: { index: false, follow: false },
};
export default function AdminServicesPage() {
  return (
    <div>
      <p className="text-accent font-mono text-xs tracking-[.16em] uppercase">Content</p>
      <h1 className="font-heading mt-3 text-3xl font-semibold">Services</h1>
      <div className="mt-8">
        <StatusPanel title="Service management is not enabled yet">
          <p>
            Public read endpoints are implemented. Admin create, edit, publish and audit endpoints
            remain intentionally unavailable until validation and change-history requirements are
            defined.
          </p>
        </StatusPanel>
      </div>
    </div>
  );
}

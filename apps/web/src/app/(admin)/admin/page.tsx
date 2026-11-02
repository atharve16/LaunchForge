import type { Metadata } from 'next';
import { StatusPanel } from '@/components/ui/status-panel';
export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } };
export default function AdminPage() {
  return (
    <div>
      <p className="text-accent font-mono text-xs tracking-[.16em] uppercase">Administration</p>
      <h1 className="font-heading mt-3 text-3xl font-semibold">Operations overview</h1>
      <p className="text-ink-secondary mt-3">
        Access to this layout is checked against the backend-controlled application role.
      </p>
      <div className="mt-8">
        <StatusPanel title="Admin foundation active">
          <p>
            Lead review is connected read-only. Service and case-study publishing controls require
            explicit validated write endpoints before they can be enabled.
          </p>
        </StatusPanel>
      </div>
    </div>
  );
}

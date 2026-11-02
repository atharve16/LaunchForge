import type { Metadata } from 'next';
import { StatusPanel } from '@/components/ui/status-panel';
export const metadata: Metadata = {
  title: 'Admin case studies',
  robots: { index: false, follow: false },
};
export default function AdminCaseStudiesPage() {
  return (
    <div>
      <p className="text-accent font-mono text-xs tracking-[.16em] uppercase">Evidence</p>
      <h1 className="font-heading mt-3 text-3xl font-semibold">Case studies</h1>
      <div className="mt-8">
        <StatusPanel title="Case-study publishing is not enabled yet">
          <p>
            The schema and public read API are ready. Editorial approval, client permission and
            validated admin write operations are required before publishing.
          </p>
        </StatusPanel>
      </div>
    </div>
  );
}

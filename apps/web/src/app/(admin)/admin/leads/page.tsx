import type { Metadata } from 'next';
import { StatusPanel } from '@/components/ui/status-panel';
import { serverApiRequest } from '@/services/api/server';
import { endpoints } from '@/services/api/endpoints';
export const metadata: Metadata = { title: 'Admin leads', robots: { index: false, follow: false } };
type Lead = {
  id: string;
  name: string;
  email: string;
  companyName: string | null;
  startupStage: string;
  servicesNeeded: string[];
  budgetRange: string;
  projectDescription: string;
  status: string;
  createdAt: string;
};
type LeadsPage = { items: Lead[]; pagination: { total: number } };
export default async function AdminLeadsPage() {
  let data: LeadsPage | undefined;
  try {
    data = await serverApiRequest<LeadsPage>(endpoints.leads);
  } catch {}
  return (
    <div>
      <p className="text-accent font-mono text-xs tracking-[.16em] uppercase">Pipeline</p>
      <h1 className="font-heading mt-3 text-3xl font-semibold">Leads</h1>
      <div className="mt-8">
        {!data ? (
          <StatusPanel title="Lead service unavailable">
            <p>The protected API or database is not reachable.</p>
          </StatusPanel>
        ) : data.items.length === 0 ? (
          <StatusPanel title="No leads yet" kind="empty">
            <p>Validated contact submissions will appear here. No demo leads are created.</p>
          </StatusPanel>
        ) : (
          <div className="border-line bg-surface overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-3xl text-left text-sm">
              <thead className="border-line bg-surface-alt text-muted border-b font-mono text-[10px] tracking-[.12em] uppercase">
                <tr>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Stage</th>
                  <th className="p-4">Services</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Created</th>
                </tr>
              </thead>
              <tbody className="divide-line divide-y">
                {data.items.map((lead) => (
                  <tr key={lead.id}>
                    <td className="p-4">
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-muted">{lead.email}</p>
                    </td>
                    <td className="p-4">{lead.startupStage}</td>
                    <td className="p-4">{lead.servicesNeeded.join(', ')}</td>
                    <td className="p-4">{lead.status}</td>
                    <td className="text-muted p-4">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/layout/admin-shell';
import { serverApiRequest } from '@/services/api/server';
import { endpoints } from '@/services/api/endpoints';

export const dynamic = 'force-dynamic';
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    const profile = await serverApiRequest<{ role: string; accountStatus: string }>(endpoints.me);
    if (profile.role !== 'ADMIN' || profile.accountStatus !== 'ACTIVE') redirect('/dashboard');
  } catch {
    redirect('/dashboard');
  }
  return <AdminShell>{children}</AdminShell>;
}

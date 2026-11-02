import Link from 'next/link';
import { BriefcaseBusiness, FileText, Gauge, Settings2, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Logo } from './logo';
import { LogoutButton } from '@/features/auth/logout-button';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const links: Array<{ icon: LucideIcon; label: string; href: string }> = [
    { icon: Gauge, label: 'Overview', href: '/admin' },
    { icon: Users, label: 'Leads', href: '/admin/leads' },
    { icon: Settings2, label: 'Services', href: '/admin/services' },
    { icon: BriefcaseBusiness, label: 'Case studies', href: '/admin/case-studies' },
    { icon: FileText, label: 'Client dashboard', href: '/dashboard' },
  ];
  return (
    <div className="bg-canvas min-h-screen">
      <header className="border-line bg-brand border-b text-white">
        <Container className="flex min-h-18 items-center justify-between">
          <div className="rounded-xl bg-white px-3 py-2">
            <Logo />
          </div>
          <LogoutButton />
        </Container>
      </header>
      <Container className="grid gap-8 py-8 md:grid-cols-[220px_1fr]">
        <aside>
          <p className="text-muted px-4 font-mono text-[10px] tracking-[.16em] uppercase">
            Admin console
          </p>
          <nav className="mt-3 space-y-1">
            {links.map(({ icon: Icon, label, href }) => (
              <Link
                key={href}
                href={href as never}
                className="text-ink-secondary hover:bg-surface hover:text-ink flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition"
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </Container>
    </div>
  );
}

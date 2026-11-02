import Link from 'next/link';
import { FolderKanban, Home, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Logo } from './logo';
import { LogoutButton } from '@/features/auth/logout-button';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const links: Array<{ icon: LucideIcon; label: string; href: string }> = [
    { icon: Home, label: 'Overview', href: '/dashboard' },
    { icon: UserRound, label: 'Profile', href: '/dashboard/profile' },
    { icon: FolderKanban, label: 'Projects', href: '/dashboard/projects' },
  ];
  return (
    <div className="bg-canvas min-h-screen">
      <header className="border-line bg-surface border-b">
        <Container className="flex min-h-18 items-center justify-between">
          <Logo />
          <LogoutButton />
        </Container>
      </header>
      <Container className="grid gap-8 py-8 md:grid-cols-[220px_1fr]">
        <aside>
          <nav className="space-y-1" aria-label="Dashboard navigation">
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

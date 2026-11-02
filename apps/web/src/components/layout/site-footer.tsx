import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './logo';
import { Container } from '@/components/ui/container';

const columns = [
  {
    title: 'Explore',
    links: [
      ['Services', '/services'],
      ['How we work', '/how-we-work'],
      ['Engagements', '/engagements'],
      ['Work', '/work'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Insights', '/insights'],
      ['Contact', '/contact'],
      ['Client login', '/login'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-line bg-surface border-t">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="text-muted mt-5 leading-7">
            Senior-led product thinking and engineering execution for startups moving from first
            idea to first users.
          </p>
          <Link
            href="/contact"
            className="text-accent mt-5 inline-flex items-center gap-2 text-sm font-semibold"
          >
            Start a conversation <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-muted font-mono text-xs font-semibold tracking-[0.14em] uppercase">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-ink-secondary hover:text-accent text-sm transition"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <div className="border-line border-t">
        <Container className="text-muted flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LaunchForge. All rights reserved.</p>
          <p>LaunchForge is a working brand name; legal details must be confirmed before launch.</p>
        </Container>
      </div>
    </footer>
  );
}

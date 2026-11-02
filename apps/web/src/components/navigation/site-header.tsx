'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { navItems } from '@/config/content';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Logo } from '@/components/layout/logo';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-line/80 bg-canvas/92 sticky top-0 z-50 border-b backdrop-blur-xl">
      <Container className="flex min-h-18 items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-secondary hover:bg-surface-alt hover:text-ink rounded-lg px-3 py-2 text-sm font-medium transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="/login" variant="quiet">
            Client login
          </ButtonLink>
          <ButtonLink href="/contact">Book a free call</ButtonLink>
        </div>
        <button
          type="button"
          className="border-line bg-surface grid size-11 place-items-center rounded-xl border lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>
      {open ? (
        <nav
          id="mobile-navigation"
          className="border-line bg-surface border-t p-5 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-ink-secondary hover:bg-surface-alt rounded-xl px-4 py-3 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-ink-secondary hover:bg-surface-alt rounded-xl px-4 py-3 font-medium"
            >
              Client login
            </Link>
            <ButtonLink href="/contact" className="mt-2 w-full">
              Book a free call
            </ButtonLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { AuthForm } from '@/features/auth/auth-form';

export const metadata: Metadata = { title: 'Sign in', robots: { index: false, follow: false } };
export default function LoginPage() {
  return (
    <section className="px-5 py-10 sm:py-16">
      <div className="border-line bg-surface mx-auto max-w-md rounded-3xl border p-7 shadow-[var(--shadow-soft)] sm:p-9">
        <p className="text-accent font-mono text-xs tracking-[.16em] uppercase">Client workspace</p>
        <h1 className="font-heading mt-4 text-3xl font-semibold tracking-[-.035em]">
          Welcome back
        </h1>
        <p className="text-ink-secondary mt-3">
          Sign in with your email and password, Google, or a secure magic link.
        </p>
        <Suspense fallback={<div className="bg-canvas mt-8 h-80 animate-pulse rounded-2xl" />}>
          <AuthForm mode="login" />
        </Suspense>
        <p className="text-muted mt-6 text-center text-sm">
          New to LaunchForge?{' '}
          <Link href="/signup" className="text-accent font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}

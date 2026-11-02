import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { AuthForm } from '@/features/auth/auth-form';

export const metadata: Metadata = {
  title: 'Create account',
  robots: { index: false, follow: false },
};
export default function SignupPage() {
  return (
    <section className="px-5 py-10 sm:py-16">
      <div className="border-line bg-surface mx-auto max-w-md rounded-3xl border p-7 shadow-[var(--shadow-soft)] sm:p-9">
        <p className="text-accent font-mono text-xs tracking-[.16em] uppercase">Client workspace</p>
        <h1 className="font-heading mt-4 text-3xl font-semibold tracking-[-.035em]">
          Create your account
        </h1>
        <p className="text-ink-secondary mt-3">
          Your Supabase identity is separate from your LaunchForge application profile and
          permissions.
        </p>
        <Suspense fallback={<div className="bg-canvas mt-8 h-80 animate-pulse rounded-2xl" />}>
          <AuthForm mode="signup" />
        </Suspense>
        <p className="text-muted mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-accent font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

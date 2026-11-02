'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Globe2, LoaderCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/browser';
import { safeRedirectPath } from '@/lib/redirects';
import { apiRequest } from '@/services/api/client';
import { endpoints } from '@/services/api/endpoints';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = useMemo(() => safeRedirectPath(searchParams.get('next')), [searchParams]);
  const [pending, setPending] = useState<string>();
  const [error, setError] = useState(
    searchParams.get('error') ? 'Authentication could not be completed. Please try again.' : '',
  );
  const [notice, setNotice] = useState('');

  async function provisionAndContinue() {
    await apiRequest(endpoints.provisionProfile, { method: 'POST' }, true);
    router.push(next as never);
    router.refresh();
  }

  async function handleCredentials(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setNotice('');
    setPending('credentials');
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') || '');
    const password = String(data.get('password') || '');
    const fullName = String(data.get('fullName') || '');
    const supabase = createClient();
    const result =
      mode === 'signup'
        ? await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: fullName },
              emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
            },
          })
        : await supabase.auth.signInWithPassword({ email, password });
    if (result.error) {
      setError(result.error.message);
      setPending(undefined);
      return;
    }
    if (mode === 'signup' && !result.data.session) {
      setNotice('Check your email to verify your account, then return to sign in.');
      setPending(undefined);
      return;
    }
    try {
      await provisionAndContinue();
    } catch {
      setError(
        'You are signed in, but your LaunchForge profile could not be prepared. Please retry.',
      );
      setPending(undefined);
    }
  }

  async function handleGoogle() {
    setError('');
    setPending('google');
    const { error: oauthError } = await createClient().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        skipBrowserRedirect: false,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setPending(undefined);
    }
  }

  async function handleMagicLink(event: React.MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!form) return;
    const email = String(new FormData(form).get('email') || '');
    if (!email) {
      setError('Enter your email address first.');
      return;
    }
    setError('');
    setNotice('');
    setPending('magic');
    const { error: otpError } = await createClient().auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (otpError) setError(otpError.message);
    else setNotice('Magic link sent. Check your inbox to continue.');
    setPending(undefined);
  }

  return (
    <form onSubmit={handleCredentials} className="mt-8 space-y-5" noValidate>
      {mode === 'signup' ? (
        <label className="block">
          <span className="text-ink text-sm font-medium">Full name</span>
          <input
            name="fullName"
            autoComplete="name"
            required
            minLength={2}
            maxLength={160}
            className="border-line bg-surface focus:border-accent mt-2 min-h-12 w-full rounded-xl border px-4 transition outline-none"
          />
        </label>
      ) : null}
      <label className="block">
        <span className="text-ink text-sm font-medium">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={320}
          className="border-line bg-surface focus:border-accent mt-2 min-h-12 w-full rounded-xl border px-4 transition outline-none"
        />
      </label>
      <label className="block">
        <span className="text-ink text-sm font-medium">Password</span>
        <input
          name="password"
          type="password"
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          required
          minLength={8}
          className="border-line bg-surface focus:border-accent mt-2 min-h-12 w-full rounded-xl border px-4 transition outline-none"
        />
        <span className="text-muted mt-1 block text-xs">
          Use at least 8 characters. Supabase may enforce a stronger project policy.
        </span>
      </label>
      {error ? (
        <p
          role="alert"
          className="border-danger/20 bg-danger/5 text-danger rounded-xl border px-4 py-3 text-sm"
        >
          {error}
        </p>
      ) : null}
      {notice ? (
        <p
          role="status"
          className="border-success/20 bg-success/5 text-success rounded-xl border px-4 py-3 text-sm"
        >
          {notice}
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={Boolean(pending)}>
        {pending === 'credentials' ? <LoaderCircle className="size-4 animate-spin" /> : null}
        {mode === 'signup' ? 'Create account' : 'Sign in'} <ArrowRight className="size-4" />
      </Button>
      <div className="text-muted flex items-center gap-3 text-xs">
        <span className="bg-line h-px flex-1" />
        or continue with
        <span className="bg-line h-px flex-1" />
      </div>
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={handleGoogle}
        disabled={Boolean(pending)}
      >
        <Globe2 className="size-4" /> Continue with Google
      </Button>
      <Button
        type="button"
        variant="quiet"
        className="w-full"
        onClick={handleMagicLink}
        disabled={Boolean(pending)}
      >
        <Mail className="size-4" /> Email me a magic link
      </Button>
    </form>
  );
}

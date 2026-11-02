import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthForm } from './auth-form';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock('@/lib/supabase/browser', () => ({
  createClient: () => ({
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signInWithOAuth: vi.fn(),
      signInWithOtp: vi.fn(),
    },
  }),
}));

describe('AuthForm', () => {
  beforeEach(() => vi.clearAllMocks());
  it('offers password, Google and magic-link authentication', () => {
    render(<AuthForm mode="login" />);
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText(/^Password/)).toBeRequired();
    expect(screen.getByRole('button', { name: /Continue with Google/ })).toBeVisible();
    expect(screen.getByRole('button', { name: /magic link/ })).toBeVisible();
  });
});

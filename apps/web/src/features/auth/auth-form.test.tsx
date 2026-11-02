import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthForm } from './auth-form';

const mocks = vi.hoisted(() => ({
  auth: {
    signUp: vi.fn(),
    signInWithPassword: vi.fn(),
    signInWithOAuth: vi.fn(),
    signInWithOtp: vi.fn(),
  },
  apiRequest: vi.fn(),
  router: { push: vi.fn(), replace: vi.fn(), refresh: vi.fn() },
}));

vi.mock('next/navigation', () => ({
  useRouter: () => mocks.router,
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock('@/lib/supabase/browser', () => ({
  createClient: () => ({ auth: mocks.auth }),
}));
vi.mock('@/services/api/client', () => ({ apiRequest: mocks.apiRequest }));

describe('AuthForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.apiRequest.mockResolvedValue({});
  });
  it('offers password, Google and magic-link authentication', () => {
    render(<AuthForm mode="login" />);
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText(/^Password/)).toBeRequired();
    expect(screen.getByRole('button', { name: /Continue with Google/ })).toBeVisible();
    expect(screen.getByRole('button', { name: /magic link/ })).toBeVisible();
  });

  it('provisions the returned session and navigates after a successful password login', async () => {
    mocks.auth.signInWithPassword.mockResolvedValue({
      data: { session: { access_token: 'access-token' } },
      error: null,
    });
    render(<AuthForm mode="login" />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'founder@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password/), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: /Sign in/ }).closest('form')!);

    await waitFor(() => expect(mocks.apiRequest).toHaveBeenCalled());
    expect(mocks.apiRequest).toHaveBeenCalledWith(
      '/users/me/provision',
      { method: 'POST' },
      true,
      'access-token',
    );
    expect(mocks.router.replace).toHaveBeenCalledWith('/dashboard');
    expect(mocks.router.refresh).toHaveBeenCalled();
  });

  it('shows an authentication error and does not provision after an invalid password login', async () => {
    mocks.auth.signInWithPassword.mockResolvedValue({
      data: { session: null },
      error: { message: 'Invalid login credentials' },
    });
    render(<AuthForm mode="login" />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'founder@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password/), { target: { value: 'wrongpassword' } });
    fireEvent.submit(screen.getByRole('button', { name: /Sign in/ }).closest('form')!);

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid login credentials');
    expect(mocks.apiRequest).not.toHaveBeenCalled();
    expect(mocks.router.replace).not.toHaveBeenCalled();
  });

  it('starts Google OAuth with the application callback URL', async () => {
    mocks.auth.signInWithOAuth.mockResolvedValue({ error: null });
    render(<AuthForm mode="login" />);

    fireEvent.click(screen.getByRole('button', { name: /Continue with Google/ }));

    await waitFor(() => expect(mocks.auth.signInWithOAuth).toHaveBeenCalled());
    expect(mocks.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback?next=%2Fdashboard',
        skipBrowserRedirect: false,
      },
    });
  });
});

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SiteHeader } from './site-header';

const mocks = vi.hoisted(() => ({
  useAuth: vi.fn(),
  router: { replace: vi.fn(), refresh: vi.fn() },
}));

vi.mock('@/features/auth/auth-provider', () => ({ useAuth: mocks.useAuth }));
vi.mock('next/navigation', () => ({ useRouter: () => mocks.router }));
vi.mock('@/lib/supabase/browser', () => ({
  createClient: () => ({ auth: { signOut: vi.fn() } }),
}));

describe('SiteHeader authentication navigation', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows client login while unauthenticated', () => {
    mocks.useAuth.mockReturnValue({ user: null, loading: false });
    render(<SiteHeader />);

    expect(screen.getByRole('link', { name: 'Client login' })).toBeVisible();
    expect(screen.queryByRole('link', { name: 'Dashboard' })).not.toBeInTheDocument();
  });

  it('shows authenticated navigation after the Supabase user changes', () => {
    mocks.useAuth.mockReturnValue({ user: { id: 'user-id' }, loading: false });
    render(<SiteHeader />);

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    expect(screen.getByRole('button', { name: /Sign out/ })).toBeVisible();
    expect(screen.queryByRole('link', { name: 'Client login' })).not.toBeInTheDocument();
  });
});

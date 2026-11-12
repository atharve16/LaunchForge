import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const styles = {
  primary:
    'bg-accent text-[#090b10] shadow-[0_14px_35px_rgba(255,113,61,0.2)] hover:-translate-y-0.5 hover:bg-[#ff946c]',
  secondary: 'border border-line bg-transparent text-ink hover:border-accent hover:bg-surface-alt hover:text-ink',
  quiet: 'text-ink-secondary hover:bg-surface-alt hover:text-ink',
} as const;

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  return (
    <Link
      href={href as never}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof styles }) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

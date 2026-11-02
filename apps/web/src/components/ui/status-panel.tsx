import { CircleAlert, Clock3 } from 'lucide-react';

export function StatusPanel({
  title,
  children,
  kind = 'pending',
}: {
  title: string;
  children: React.ReactNode;
  kind?: 'pending' | 'empty';
}) {
  const Icon = kind === 'pending' ? Clock3 : CircleAlert;
  return (
    <div className="border-line bg-surface rounded-2xl border p-7 shadow-[var(--shadow-soft)]">
      <Icon className="text-accent size-6" aria-hidden="true" />
      <h2 className="font-heading text-ink mt-4 text-xl font-semibold">{title}</h2>
      <div className="text-muted mt-2 leading-7">{children}</div>
    </div>
  );
}

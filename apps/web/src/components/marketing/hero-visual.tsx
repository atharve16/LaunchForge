import { Check, Code2, Compass, Rocket, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function HeroVisual() {
  const phases: Array<{ label: string; icon: LucideIcon }> = [
    { label: 'Discover', icon: Compass },
    { label: 'Design', icon: Users },
    { label: 'Build', icon: Code2 },
    { label: 'Launch', icon: Rocket },
  ];
  return (
    <div
      className="relative mx-auto aspect-[5/4] w-full max-w-xl"
      aria-label="A product journey moving from discovery to launch"
    >
      <div className="hero-grid absolute inset-0 rounded-3xl" aria-hidden="true" />
      <div className="border-line bg-surface absolute inset-x-5 top-8 rounded-3xl border p-5 shadow-[var(--shadow-soft)] sm:inset-x-10 sm:p-7">
        <div className="border-line flex items-center justify-between gap-4 border-b pb-4">
          <div>
            <p className="text-muted font-mono text-[10px] tracking-[0.16em] uppercase">
              Product flight plan
            </p>
            <p className="font-heading text-ink mt-1 font-semibold">Founder workspace</p>
          </div>
          <span className="bg-surface-alt text-accent rounded-full px-3 py-1 font-mono text-[10px] font-semibold">
            IN PROGRESS
          </span>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-2">
          {phases.map(({ label, icon: Icon }, index) => (
            <div
              key={label}
              className={`rounded-xl p-3 ${index === 2 ? 'bg-accent text-white' : 'bg-canvas text-ink-secondary'}`}
            >
              <Icon className="size-4" aria-hidden="true" />
              <p className="mt-3 hidden text-xs font-semibold sm:block">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-3">
          {[
            'Core user journey agreed',
            'Production architecture reviewed',
            'Release evidence captured',
          ].map((item) => (
            <div key={item} className="text-ink-secondary flex items-center gap-3 text-sm">
              <span className="bg-surface-alt text-success grid size-6 place-items-center rounded-full">
                <Check className="size-3.5" />
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="float-slow border-line bg-brand absolute bottom-6 left-0 rounded-2xl border p-4 text-white shadow-xl sm:left-3">
        <p className="font-mono text-[10px] tracking-[0.16em] text-white/60 uppercase">
          Next milestone
        </p>
        <p className="mt-1 text-sm font-semibold">First user release</p>
      </div>
      <div className="border-line bg-surface absolute right-0 bottom-3 rounded-2xl border p-4 shadow-lg sm:right-3">
        <p className="text-muted font-mono text-[10px] tracking-[0.16em] uppercase">
          Senior review
        </p>
        <p className="text-ink mt-1 text-sm font-semibold">Built into every stage</p>
      </div>
    </div>
  );
}

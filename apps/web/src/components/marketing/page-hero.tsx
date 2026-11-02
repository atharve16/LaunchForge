import { Container } from '@/components/ui/container';

export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="border-line bg-surface relative overflow-hidden border-b py-18 sm:py-24">
      <div className="hero-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <Container className="relative">
        <p className="text-accent font-mono text-xs font-semibold tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
        <h1 className="font-heading text-ink mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-6xl">
          {title}
        </h1>
        <p className="text-ink-secondary mt-6 max-w-3xl text-lg leading-8 sm:text-xl">{body}</p>
      </Container>
    </section>
  );
}

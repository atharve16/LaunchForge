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
    <section className="relative overflow-hidden border-b border-line py-24 sm:py-32">
      <div className="hero-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="absolute -top-40 right-0 size-[32rem] rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <Container className="relative">
        <p className="lf-eyebrow">{eyebrow}</p>
        <h1 className="font-heading mt-6 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.065em] text-balance sm:text-7xl">{title}</h1>
        <p className="text-ink-secondary mt-7 max-w-2xl text-lg leading-8 sm:text-xl">{body}</p>
      </Container>
    </section>
  );
}

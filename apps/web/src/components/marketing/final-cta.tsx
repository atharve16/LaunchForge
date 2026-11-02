import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export function FinalCta() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="bg-brand relative overflow-hidden rounded-3xl px-6 py-14 text-white sm:px-12 lg:px-16">
          <div
            className="absolute -top-24 -right-24 size-80 rounded-full border border-white/10"
            aria-hidden="true"
          />
          <div
            className="absolute -right-8 -bottom-36 size-80 rounded-full border border-white/10"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl">
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">
              Your next clear decision
            </p>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
              Bring the idea. Leave with a better path forward.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Tell us what you are trying to build, where you are stuck and what a useful first
              milestone would look like.
            </p>
            <ButtonLink href="/contact" className="text-brand hover:bg-surface-alt mt-8 bg-white">
              Book a free discovery call <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

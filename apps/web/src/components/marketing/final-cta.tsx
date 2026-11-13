import { ArrowUpRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export function FinalCta() {
  return (
    <section className="lf-scene lf-scene--cta relative overflow-hidden border-t border-line bg-accent/85 py-24 text-[#090b10] sm:py-32">
      <div className="absolute -top-32 -right-24 size-[28rem] rounded-full border border-[#090b10]/15" aria-hidden="true" />
      <div className="absolute -right-16 -bottom-64 size-[32rem] rounded-full border border-[#090b10]/15" aria-hidden="true" />
      <Container className="relative">
        <div className="max-w-4xl">
          <p className="font-mono text-xs font-semibold tracking-[0.18em] uppercase">Your next launch starts with a conversation</p>
          <h2 className="font-heading mt-6 max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.065em] text-balance sm:text-7xl lg:text-8xl">
            Let&apos;s build something worth launching.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#090b10]/70">Have an idea? Let&apos;s turn it into something real.</p>
          <ButtonLink href="/contact" variant="secondary" className="mt-9 border-[#090b10]/30 text-[#090b10] hover:border-[#090b10] hover:bg-[#090b10] hover:text-[#f3f1ea]">
            Start the conversation <ArrowUpRight className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

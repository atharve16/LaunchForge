import { ArrowUpRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export function FinalCta() {
  return (
    <section id="contact-cta" className="lf-scene lf-scene--cta scroll-mt-20">
      <Container className="lf-chapter__inner">
        <div className="lf-chapter__content lf-chapter__content--left lf-reveal">
          <p className="lf-eyebrow">05 / Let&apos;s talk</p>
          <h2 className="lf-heading mt-6 max-w-2xl">Have an idea worth building?</h2>
          <p className="text-ink-secondary mt-7 max-w-md text-lg leading-8">
            Bring the first sketch. We&apos;ll help you find the clearest next step.
          </p>
          <ButtonLink href="/contact" className="mt-9">
            Let&apos;s Talk <ArrowUpRight className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

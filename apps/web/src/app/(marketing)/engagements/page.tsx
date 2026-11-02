import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/marketing/page-hero';
import { ButtonLink } from '@/components/ui/button';
import { engagements } from '@/config/content';
import { FinalCta } from '@/components/marketing/final-cta';

export const metadata: Metadata = {
  title: 'Engagements',
  description: 'Flexible quote-based ways to work with LaunchForge.',
  alternates: { canonical: '/engagements' },
};
export default function EngagementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagements"
        title="A shape of work for each stage of the journey"
        body="Start with a bounded sprint, build a production MVP, add a dedicated squad or bring senior technical leadership into an existing team. Commercial terms remain quote-based until scope is understood."
      />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {engagements.map((item, index) => (
              <article
                key={item.name}
                className="border-line bg-surface rounded-3xl border p-7 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-accent font-mono text-xs">0{index + 1}</span>
                  <span className="bg-surface-alt text-accent rounded-full px-3 py-1 font-mono text-[10px] tracking-[.12em] uppercase">
                    Quote-based
                  </span>
                </div>
                <h2 className="font-heading mt-6 text-2xl font-semibold">{item.name}</h2>
                <p className="text-muted mt-3 leading-7">{item.bestFor}</p>
                <p className="text-ink mt-5 text-sm font-semibold">{item.cadence}</p>
                <ul className="mt-5 space-y-3">
                  {item.includes.map((feature) => (
                    <li key={feature} className="text-ink-secondary flex gap-3 text-sm">
                      <Check className="text-success mt-0.5 size-4 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/contact" variant="secondary" className="mt-7 w-full">
                  Discuss fit
                </ButtonLink>
              </article>
            ))}
          </div>
          <p className="border-line bg-surface-alt text-ink-secondary mt-8 rounded-2xl border p-5 text-sm leading-6">
            <strong className="text-ink">Pricing note:</strong> figures in the original business
            brief are placeholders and are not published as approved prices. Any proposal depends on
            scope, risk, cadence and the operating support required.
          </p>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}

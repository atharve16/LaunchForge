import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { engagements } from '@/config/content';
import { FinalCta } from '@/components/marketing/final-cta';
import { FixedForgeScene } from '@/components/marketing/fixed-forge-scene';
import { ServiceGrid } from '@/components/marketing/service-grid';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const processSteps = [
  ['DISCOVER', 'Clarify the user, problem and smallest valuable release.'],
  ['DESIGN', 'Make the core journey tangible before the build gets expensive.'],
  ['BUILD', 'Ship in visible milestones with quality built into the work.'],
  ['LAUNCH', 'Deploy, verify and put a support path around your first users.'],
  ['GROW', 'Use production evidence to choose the next useful investment.'],
] as const;

const engagementNames: Record<string, string> = {
  'On-demand help': 'On-demand Help',
};

export default function HomePage() {
  return (
    <div className="lf-page">
      <FixedForgeScene />
      <div className="lf-home-content">
        <section id="top" className="lf-scene lf-scene--hero">
          <Container className="lf-chapter__inner">
            <div className="lf-chapter__content lf-chapter__content--left lf-reveal">
              <p className="lf-eyebrow">LaunchForge / startup build partner</p>
              <h1 className="lf-display mt-7 max-w-3xl font-semibold text-balance">
                From idea <span className="text-accent">to launch.</span>
              </h1>
              <p className="text-ink-secondary mt-8 max-w-md text-lg leading-8 sm:text-xl">
                Your startup build partner. From the first sketch to a product in users&apos; hands.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/contact">
                  Let&apos;s Build <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink href="#services" variant="secondary">
                  Explore Services <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
              <p className="lf-scroll-note mt-16">Scroll to explore <span aria-hidden="true">↓</span></p>
            </div>
          </Container>
        </section>

        <section id="services" className="lf-scene lf-scene--services scroll-mt-20">
          <Container className="lf-chapter__inner lf-chapter__inner--right">
            <div className="lf-chapter__content lf-chapter__content--right lf-reveal">
              <p className="lf-eyebrow">02 / Services</p>
              <h2 className="lf-heading mt-6 max-w-xl">Everything you need to build.</h2>
              <p className="text-ink-secondary mt-7 max-w-md text-base leading-7">
                One senior-led team across the decisions that take a product from first sketch to production.
              </p>
              <ServiceGrid />
            </div>
          </Container>
        </section>

        <section id="process" className="lf-scene lf-scene--process scroll-mt-20">
          <Container className="lf-chapter__inner">
            <div className="lf-chapter__content lf-chapter__content--left lf-reveal">
              <p className="lf-eyebrow">03 / Process</p>
              <h2 className="lf-heading mt-6 max-w-xl">From concept to reality.</h2>
              <div className="lf-process-list mt-12">
                {processSteps.map(([name, description], index) => (
                  <div key={name} className="lf-process-step">
                    <span className="lf-process-step__number">0{index + 1}</span>
                    <div>
                      <h3>{name}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-ink-secondary mt-10 max-w-sm text-lg leading-8">
                One senior-led team. From your first idea to production.
              </p>
            </div>
          </Container>
        </section>

        <section id="engagement" className="lf-scene lf-scene--engagement scroll-mt-20">
          <Container className="lf-chapter__inner lf-chapter__inner--right">
            <div className="lf-chapter__content lf-chapter__content--right lf-reveal">
              <p className="lf-eyebrow">04 / Engagement</p>
              <h2 className="lf-heading mt-6 max-w-xl">Start the way you need.</h2>
              <div className="mt-12">
                {engagements.map((item, index) => (
                  <div key={item.name} className="engagement-row">
                    <span className="text-accent font-mono text-xs">0{index + 1}</span>
                    <div>
                      <h3 className="font-heading text-xl font-semibold tracking-[-0.025em]">
                        {engagementNames[item.name] ?? item.name}
                      </h3>
                      <p className="text-muted mt-1 text-sm leading-6">{item.bestFor}</p>
                    </div>
                    <ArrowUpRight className="text-muted size-4" aria-hidden="true" />
                  </div>
                ))}
              </div>
              <ButtonLink href="/engagements" variant="secondary" className="mt-8">
                Compare models <ArrowUpRight className="size-4" />
              </ButtonLink>
            </div>
          </Container>
        </section>

        <FinalCta />
      </div>
    </div>
  );
}

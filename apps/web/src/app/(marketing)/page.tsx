import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Users, Zap } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { engagements } from '@/config/content';
import { FixedForgeScene } from '@/components/marketing/fixed-forge-scene';
import { ServiceGrid } from '@/components/marketing/service-grid';
import { ProcessExplorer } from '@/components/marketing/process-explorer';
import { FinalCta } from '@/components/marketing/final-cta';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const differentiators = [
  ['01', 'Senior-led engineering', 'The people making the decisions stay close to the work.'],
  ['02', 'Idea to production', 'A launch is more than a prototype. We build the whole path.'],
  ['03', 'AI-native execution', 'We use the newest tools where they create a real advantage.'],
  ['04', 'Startup-friendly shape', 'The engagement flexes around the next useful milestone.'],
] as const;

export default function HomePage() {
  return (
    <div className="lf-page">
      <FixedForgeScene />
      <div className="lf-home-content">
        <section className="lf-scene lf-scene--hero">
          <Container className="relative grid w-full items-center gap-10 py-24 lg:grid-cols-[1fr_.8fr]">
            <div>
              <p className="lf-eyebrow">LaunchForge / startup build partner</p>
              <h1 className="font-heading mt-8 max-w-5xl text-[clamp(4rem,10vw,9.5rem)] font-semibold leading-[0.84] tracking-[-0.085em] text-balance">
                From first <span className="text-accent">sketch</span> to first users.
              </h1>
              <p className="text-ink-secondary mt-9 max-w-lg text-lg leading-8 sm:text-xl">
                We turn ambitious startup ideas into products ready for the real world.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact">
                  Let&apos;s build <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink href="#what-we-build" variant="secondary">
                  See the journey <ArrowDownMark />
                </ButtonLink>
              </div>
            </div>
            <div className="hidden self-end pb-14 lg:block">
              <p className="text-muted ml-auto max-w-[12rem] font-mono text-[10px] leading-5 tracking-[0.16em] uppercase">
                One continuous environment.
                <br />
                Scroll to assemble the system.
              </p>
            </div>
          </Container>
          <div className="text-muted absolute right-6 bottom-7 hidden font-mono text-[10px] tracking-[0.18em] uppercase lg:block">01 / 07 ↓</div>
        </section>

        <section className="lf-glass-strip py-5">
          <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <p className="lf-eyebrow">A senior team for the messy middle</p>
            <p className="text-muted text-sm">Idea → design → build → deploy → grow</p>
            <p className="text-accent font-mono text-xs tracking-[0.14em] uppercase">Scroll-scrubbed / live</p>
          </Container>
        </section>

        <section id="what-we-build" className="lf-scene lf-scene--services scroll-mt-20">
          <Container className="w-full">
            <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
              <div>
                <p className="lf-eyebrow">02 / What we build</p>
                <h2 className="font-heading mt-6 max-w-xl text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-7xl">
                  Turn the moving parts into a <span className="lf-outline-word">product.</span>
                </h2>
              </div>
              <p className="text-ink-secondary max-w-md text-lg leading-8 lg:justify-self-end">
                Six capabilities. One connected team. The fixed scene shifts while each part of the
                product takes shape.
              </p>
            </div>
            <ServiceGrid />
          </Container>
        </section>

        <section className="lf-scene lf-scene--process lf-glass-strip">
          <Container className="w-full">
            <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
              <div>
                <p className="lf-eyebrow">03 / How we build</p>
                <h2 className="font-heading mt-6 max-w-xl text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-7xl">
                  No black boxes.
                  <br />
                  <span className="text-accent">Just momentum.</span>
                </h2>
              </div>
              <p className="text-muted max-w-md text-lg leading-8 lg:justify-self-end">Move through the stages. The same system reorganizes around the next decision.</p>
            </div>
            <ProcessExplorer />
          </Container>
        </section>

        <section className="lf-scene lf-scene--work">
          <Container className="grid w-full gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <p className="lf-eyebrow">04 / Selected work</p>
              <h2 className="font-heading mt-6 max-w-xl text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-7xl">
                Proof when it is ready to be named.
              </h2>
              <p className="text-ink-secondary mt-7 max-w-md text-lg leading-8">
                We only publish client work with permission, context and verified outcomes.
              </p>
              <ButtonLink href="/work" variant="secondary" className="mt-8">
                Our evidence standard <ArrowUpRight className="size-4" />
              </ButtonLink>
            </div>
            <div className="lf-panel relative min-h-[380px] overflow-hidden p-8 sm:p-12">
              <div className="absolute -right-20 -bottom-24 size-80 rounded-full border border-accent/40" />
              <div className="absolute top-1/2 right-20 size-2 rounded-full bg-accent shadow-[0_0_28px_8px_rgba(255,113,61,0.28)]" />
              <div className="relative flex h-full flex-col justify-between">
                <p className="lf-eyebrow">Portfolio / awaiting approval</p>
                <div>
                  <h3 className="font-heading max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">Real products deserve a real story.</h3>
                  <p className="text-muted mt-4 max-w-sm leading-7">No invented clients, logos, testimonials, metrics or performance results.</p>
                  <Link href="/work" className="text-accent mt-7 inline-flex items-center gap-2 text-sm font-semibold">Read the standard <ArrowRight className="size-4" /></Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="lf-scene lf-scene--why lf-glass-strip">
          <Container className="w-full">
            <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
              <div>
                <p className="lf-eyebrow">05 / Why LaunchForge</p>
                <h2 className="font-heading mt-6 max-w-md text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-7xl">
                  Less handoff.
                  <br />
                  <span className="text-accent">More momentum.</span>
                </h2>
              </div>
              <div className="divide-line divide-y border-y border-line">
                {differentiators.map(([number, title, body]) => (
                  <div key={title} className="grid gap-5 py-7 sm:grid-cols-[4rem_1fr]">
                    <span className="text-accent font-mono text-xs">{number}</span>
                    <div>
                      <h3 className="font-heading text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                      <p className="text-muted mt-2 max-w-md leading-7">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="lf-scene lf-scene--engagement">
          <Container className="grid w-full gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <div>
              <p className="lf-eyebrow">06 / Engagement</p>
              <h2 className="font-heading mt-6 max-w-md text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-7xl">
                Start with the certainty you need.
              </h2>
              <p className="text-muted mt-7 max-w-sm leading-7">Every engagement is quote-based until scope and commercial terms are approved.</p>
              <ButtonLink href="/engagements" variant="secondary" className="mt-8">Compare models <ArrowUpRight className="size-4" /></ButtonLink>
            </div>
            <div>
              {engagements.map((item, index) => (
                <div key={item.name} className="engagement-row">
                  <span className="text-accent font-mono text-xs">0{index + 1}</span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold tracking-[-0.025em]">{item.name}</h3>
                    <p className="text-muted mt-1 text-sm">{item.bestFor}</p>
                  </div>
                  <span className="text-muted hidden font-mono text-[10px] tracking-[0.12em] uppercase sm:block">{item.cadence}</span>
                  <Link href="/contact" className="text-accent inline-flex items-center gap-2 text-sm font-semibold">Talk to us <ArrowRight className="size-4" /></Link>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="lf-glass-strip py-10">
          <Container className="grid gap-6 text-sm text-ink-secondary sm:grid-cols-3">
            <div className="flex items-center gap-3"><Users className="text-accent size-4" /> Senior ownership from day one</div>
            <div className="flex items-center gap-3"><Zap className="text-accent size-4" /> AI-native where it helps</div>
            <div className="flex items-center gap-3"><Check className="text-accent size-4" /> Built for the real world</div>
          </Container>
        </section>

        <FinalCta />
      </div>
    </div>
  );
}

function ArrowDownMark() {
  return <span aria-hidden="true">↓</span>;
}

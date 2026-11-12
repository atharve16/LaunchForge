import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, CircleDot, Sparkles, Zap } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { engagements } from '@/config/content';
import { HeroVisual } from '@/components/marketing/hero-visual';
import { ServiceGrid } from '@/components/marketing/service-grid';
import { ProcessExplorer } from '@/components/marketing/process-explorer';
import { FinalCta } from '@/components/marketing/final-cta';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const principles = [
  ['01', 'Senior-led', 'The people making the decisions stay close to the work.'],
  ['02', 'AI-native', 'We use the newest tools where they create a real advantage.'],
  ['03', 'Production-minded', 'The first release is built to meet the real world.'],
] as const;

export default function HomePage() {
  return (
    <div className="lf-page">
      <section className="lf-hero relative flex items-center overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <Container className="relative grid w-full items-center gap-14 py-20 lg:grid-cols-[1.02fr_.98fr] lg:py-24">
          <div className="reveal z-10">
            <p className="lf-eyebrow">LaunchForge / startup build partner</p>
            <h1 className="font-heading mt-7 max-w-4xl text-[clamp(3.6rem,8vw,7.7rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-balance">
              From first sketch to <span className="text-accent">first users.</span>
            </h1>
            <p className="text-ink-secondary mt-8 max-w-xl text-lg leading-8 sm:text-xl">
              We turn ambitious startup ideas into products ready for the real world.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">
                Let&apos;s build <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/work" variant="secondary">
                Explore our work <ArrowUpRight className="size-4" />
              </ButtonLink>
            </div>
            <div className="text-muted mt-9 flex items-center gap-3 text-xs uppercase tracking-[0.12em]">
              <span className="bg-accent size-2 rounded-full shadow-[0_0_14px_var(--brand-accent)]" />
              Product thinking / engineering execution / clear ownership
            </div>
          </div>
          <div className="reveal reveal-delay relative">
            <HeroVisual />
          </div>
        </Container>
        <div className="text-muted absolute right-6 bottom-6 hidden font-mono text-[10px] tracking-[0.18em] uppercase lg:block">
          Scroll to explore ↓
        </div>
      </section>

      <section className="border-b border-line py-5">
        <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p className="lf-eyebrow">Built for the messy middle</p>
          <p className="text-muted text-sm">Idea → prototype → product → momentum</p>
          <p className="text-accent font-mono text-xs tracking-[0.14em] uppercase">01 — 06</p>
        </Container>
      </section>

      <section id="services" className="scroll-mt-20 py-24 sm:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="lf-eyebrow">What we build</p>
              <h2 className="font-heading mt-5 max-w-lg text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
                The next version of your company starts here.
              </h2>
            </div>
            <p className="text-ink-secondary max-w-xl self-end text-lg leading-8 lg:justify-self-end">
              One senior team across product, design and engineering. The right shape of help for
              the decision in front of you.
            </p>
          </div>
          <ServiceGrid />
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Our process"
              title="Make the next move obvious."
              body="Every stage creates something real enough to react to. No black boxes, no theatre."
            />
            <div className="lf-eyebrow max-w-[12rem] leading-5 text-right">A clear path through uncertainty</div>
          </div>
          <ProcessExplorer />
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="lf-eyebrow">Why LaunchForge</p>
              <h2 className="font-heading mt-5 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
                Less handoff. More momentum.
              </h2>
              <p className="text-ink-secondary mt-6 max-w-md text-lg leading-8">
                We help founders move with the judgement of a product team that has been through
                launch before.
              </p>
            </div>
            <div className="divide-line divide-y border-y border-line">
              {principles.map(([number, title, body]) => (
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

      <section className="border-y border-line bg-surface py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title="Proof, when it is ready to be named."
              body="We only publish client work with permission, context and verified outcomes."
            />
            <ButtonLink href="/work" variant="secondary">
              Our evidence standard <ArrowUpRight className="size-4" />
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
            <div className="relative min-h-[330px] overflow-hidden bg-[#171b23] p-8 sm:p-12">
              <div className="absolute -right-20 -bottom-28 size-80 rounded-full border border-accent/30 shadow-[0_0_90px_rgba(255,113,61,0.14)]" />
              <div className="absolute right-16 bottom-16 size-28 rounded-full bg-accent/20 blur-2xl" />
              <div className="relative flex h-full flex-col justify-between">
                <p className="lf-eyebrow">Portfolio / awaiting approval</p>
                <div>
                  <h3 className="font-heading max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
                    Real products deserve a real story.
                  </h3>
                  <p className="text-muted mt-4 max-w-md leading-7">
                    This space is intentionally open until approved case studies are ready.
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-line p-8 sm:p-10">
              <CircleDot className="text-accent size-7" />
              <p className="text-muted mt-10 text-sm leading-7">
                No invented client names, logos, testimonials, metrics or performance results.
              </p>
              <Link href="/work" className="text-accent mt-7 inline-flex items-center gap-2 text-sm font-semibold">
                Read the standard <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="lf-eyebrow">Engagement models</p>
              <h2 className="font-heading mt-5 max-w-md text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
                Start with the certainty you need.
              </h2>
              <p className="text-muted mt-6 max-w-sm leading-7">Every engagement is quote-based until scope and commercial terms are approved.</p>
              <ButtonLink href="/engagements" variant="secondary" className="mt-8">
                Compare models <ArrowUpRight className="size-4" />
              </ButtonLink>
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
                  <Link href="/contact" className="text-accent inline-flex items-center gap-2 text-sm font-semibold">
                    Talk to us <ArrowRight className="size-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-10">
        <Container className="grid gap-6 text-sm text-ink-secondary sm:grid-cols-3">
          <div className="flex items-center gap-3"><Sparkles className="text-accent size-4" /> Senior ownership from day one</div>
          <div className="flex items-center gap-3"><Zap className="text-accent size-4" /> AI-native where it helps</div>
          <div className="flex items-center gap-3"><Check className="text-accent size-4" /> Built for the real world</div>
        </Container>
      </section>

      <FinalCta />
    </div>
  );
}

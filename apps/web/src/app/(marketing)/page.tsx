import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  MessageSquareText,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { engagements } from '@/config/content';
import { HeroVisual } from '@/components/marketing/hero-visual';
import { ServiceGrid } from '@/components/marketing/service-grid';
import { ProcessExplorer } from '@/components/marketing/process-explorer';
import { FinalCta } from '@/components/marketing/final-cta';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  return (
    <>
      <section className="border-line bg-surface relative overflow-hidden border-b py-16 sm:py-24 lg:py-28">
        <div className="hero-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div className="reveal">
            <h1 className="font-heading text-ink mt-7 max-w-3xl text-5xl leading-[1.03] font-semibold tracking-[-0.055em] text-balance sm:text-7xl">
              From first idea to <span className="text-accent">first users.</span>
            </h1>
            <p className="text-ink-secondary mt-6 max-w-2xl text-lg leading-8 sm:text-xl">
              Build your startup with experienced product and engineering leadership. From discovery
              and prototyping to development, deployment and growth.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">
                Book a free discovery call <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Explore our services
              </ButtonLink>
            </div>
            <p className="text-muted mt-6 flex items-center gap-2 text-sm">
              <Check className="text-success size-4" /> Start with the decision in front of you—not
              a predetermined package.
            </p>
          </div>
          <div className="reveal reveal-delay">
            <HeroVisual />
          </div>
        </Container>
      </section>

      <section className="border-line bg-canvas border-b py-10">
        <Container>
          <div className="text-ink-secondary grid gap-5 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-accent size-5" />
              <span>
                <strong className="text-ink">Senior ownership</strong> across decisions and delivery
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Target className="text-accent size-5" />
              <span>
                <strong className="text-ink">Product discovery</strong> before engineering scope
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquareText className="text-accent size-5" />
              <span>
                <strong className="text-ink">Visible milestones</strong> and direct communication
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Start where you are"
            title="A clear path through founder uncertainty"
            body="The right first move depends on what is already known. We shape the engagement around the next evidence or product milestone your team needs."
          />
          <div className="border-line bg-line mt-12 grid gap-px overflow-hidden rounded-3xl border lg:grid-cols-3">
            {[
              [
                'I have an idea',
                'Clarify the user, pressure-test assumptions and define a focused MVP.',
                'Start with discovery',
              ],
              [
                'I have a product plan',
                'Turn agreed scope into a reliable web, mobile or AI-enabled release.',
                'Plan the build',
              ],
              [
                'I have a product in market',
                'Improve architecture, delivery systems and technical leadership as you scale.',
                'Strengthen production',
              ],
            ].map(([title, body, action], index) => (
              <div key={title} className="bg-surface p-8">
                <span className="text-accent font-mono text-xs">0{index + 1}</span>
                <h3 className="font-heading mt-5 text-2xl font-semibold tracking-[-0.03em]">
                  {title}
                </h3>
                <p className="text-muted mt-3 leading-7">{body}</p>
                <Link
                  href="/contact"
                  className="text-accent mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  {action} <ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-line bg-surface border-y py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="Product thinking and engineering, connected end to end"
            body="Six focused services cover the path from deciding what to build through operating it in production."
          />
          <ServiceGrid />
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why LaunchForge"
            title="Accountability stays close to the work"
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <div className="bg-brand rounded-3xl p-8 text-white sm:p-10">
              <Users className="size-8 text-white/70" />
              <h3 className="font-heading mt-8 text-3xl font-semibold tracking-[-0.035em]">
                Senior judgment should not disappear after the sales call.
              </h3>
              <p className="mt-5 leading-8 text-white/70">
                The operating model is designed around direct technical ownership, reviewable
                milestones and decisions explained in founder language.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  'Product before output',
                  'We challenge scope and make risks visible before code becomes expensive.',
                ],
                [
                  'Production is part of the build',
                  'Testing, security, deployment and handover belong in the definition of done.',
                ],
                [
                  'Evidence over theatre',
                  'Progress is shown through working increments and agreed acceptance criteria.',
                ],
                [
                  'Built to transfer',
                  'Architecture and operating knowledge are documented for the team that follows.',
                ],
              ].map(([title, body]) => (
                <div key={title} className="border-accent bg-surface border-t-2 p-6">
                  <h3 className="font-heading text-lg font-semibold">{title}</h3>
                  <p className="text-muted mt-3 leading-7">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-line bg-surface border-y py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="The delivery loop"
            title="Sketch → Prototype → Build → Launch → Grow"
            body="Each stage produces a clear decision or working result before the next investment is made."
          />
          <ProcessExplorer />
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title="Proof belongs here—not placeholders"
              body="No client work has been approved for public display yet. Case studies will be published only with verified context, outcomes and permission."
            />
            <ButtonLink href="/work" variant="secondary">
              View the case-study standard
            </ButtonLink>
          </div>
          <div className="border-line bg-surface mt-12 rounded-3xl border border-dashed p-8 sm:p-12">
            <p className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
              Portfolio awaiting approval
            </p>
            <h3 className="font-heading mt-4 max-w-2xl text-2xl font-semibold">
              This section is intentionally honest while evidence is being prepared.
            </h3>
            <p className="text-muted mt-3 max-w-2xl leading-7">
              Launch materials should never invent clients, logos, revenue lifts or delivery
              outcomes. The reusable case-study data model and API are ready for approved content.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-line bg-surface border-y py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Engagement models"
            title="Start with the amount of certainty you need"
            body="All pricing is quote-based until scope and commercial terms are approved."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-5">
            {engagements.map((item) => (
              <div key={item.name} className="border-line bg-canvas rounded-2xl border p-5">
                <h3 className="font-heading text-lg font-semibold">{item.name}</h3>
                <p className="text-muted mt-3 text-sm leading-6">{item.bestFor}</p>
                <p className="text-accent mt-5 font-mono text-[10px] tracking-[0.14em] uppercase">
                  {item.cadence}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/engagements" variant="secondary">
              Compare engagement models
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="The people behind the work"
                title="A senior-led model, with the right specialists around the problem"
                body="Named team profiles are not yet approved for publication. The operating promise is that each engagement has clear senior ownership and direct access to the people making product and engineering decisions."
              />
              <ButtonLink href="/about" variant="secondary" className="mt-7">
                How the team operates
              </ButtonLink>
            </div>
            <div className="border-line bg-surface rounded-3xl border p-8">
              <p className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
                Team information pending
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  'Named engagement owner before work begins',
                  'Responsibility and review cadence agreed up front',
                  'Specialists added only where the product needs them',
                  'Documentation designed for future internal ownership',
                ].map((item) => (
                  <li key={item} className="text-ink-secondary flex gap-3">
                    <Check className="text-success mt-1 size-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-line bg-surface border-y py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Useful answers before the first call" />
          <div className="divide-line border-line mt-10 divide-y border-y">
            {[
              [
                'How early is too early to speak?',
                'An idea can be enough if you can explain the problem and who experiences it. Discovery is designed for uncertainty.',
              ],
              [
                'Do you only build full MVPs?',
                'No. A bounded discovery sprint, architecture review, bug fix or single feature may be the right starting point.',
              ],
              [
                'Can you work with an existing technical team?',
                'Yes. The engagement can add product definition, senior engineering capacity, mobile, AI, DevOps or technical leadership around an existing team.',
              ],
              [
                'How much will an engagement cost?',
                'Pricing is provided after scope, constraints and an appropriate engagement model are understood. Published figures are intentionally withheld until approved.',
              ],
              [
                'Is the developer marketplace available?',
                'No. The marketplace is a future phase. LaunchForge currently operates as a senior-led service partner.',
              ],
            ].map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="font-heading text-ink cursor-pointer list-none text-lg font-semibold marker:hidden">
                  {question}
                  <span className="text-accent float-right transition group-open:rotate-45">+</span>
                </summary>
                <p className="text-muted mt-3 max-w-3xl leading-7">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}

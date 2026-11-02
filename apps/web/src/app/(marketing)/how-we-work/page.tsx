import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/marketing/page-hero';
import { ProcessExplorer } from '@/components/marketing/process-explorer';
import { SectionHeading } from '@/components/ui/section-heading';
import { FinalCta } from '@/components/marketing/final-cta';
import { processStages } from '@/config/content';

export const metadata: Metadata = {
  title: 'How we work',
  description: 'A five-stage startup delivery process: Sketch, Prototype, Build, Launch and Grow.',
  alternates: { canonical: '/how-we-work' },
};
export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="Decisions first. Working evidence at every stage."
        body="The five-stage loop keeps product thinking, engineering and launch operations connected. Scope can begin and end at the stage that matches your current need."
      />
      <section className="py-20 sm:py-28">
        <Container>
          <ProcessExplorer />
        </Container>
      </section>
      <section className="border-line bg-surface border-y py-20">
        <Container>
          <SectionHeading eyebrow="Stage outputs" title="Every stage earns the next investment" />
          <div className="border-line bg-line mt-12 grid gap-px overflow-hidden rounded-3xl border lg:grid-cols-5">
            {processStages.map((stage, index) => (
              <div key={stage.name} className="bg-surface p-6">
                <span className="text-accent font-mono text-xs">0{index + 1}</span>
                <h2 className="font-heading mt-5 text-xl font-semibold">{stage.name}</h2>
                <p className="text-muted mt-3 text-sm leading-6">{stage.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              [
                'Weekly visibility',
                'Working increments, decisions and risks are reviewed in a consistent cadence.',
              ],
              [
                'Explicit acceptance',
                'Milestones have agreed outcomes rather than ambiguous percentages complete.',
              ],
              [
                'Transferable ownership',
                'Code, decisions, environments and operating steps are documented for handover.',
              ],
            ].map(([title, body]) => (
              <div key={title} className="border-accent bg-surface border-t-2 p-7">
                <h2 className="font-heading text-xl font-semibold">{title}</h2>
                <p className="text-muted mt-3 leading-7">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}

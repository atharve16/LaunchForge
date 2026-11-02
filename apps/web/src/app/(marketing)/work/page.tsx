import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/marketing/page-hero';
import { StatusPanel } from '@/components/ui/status-panel';
import { FinalCta } from '@/components/marketing/final-cta';

export const metadata: Metadata = {
  title: 'Work',
  description: 'LaunchForge case studies and the evidence standard used for published work.',
  alternates: { canonical: '/work' },
};
export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Real work deserves a verifiable story"
        body="Case studies will show the original context, what LaunchForge was responsible for, how decisions were made and which outcomes have client approval."
      />
      <section className="py-20">
        <Container>
          <StatusPanel title="No approved case studies are published yet" kind="empty">
            <p>
              The platform and data model support published case studies, but the source brief
              contains placeholders only. We will not invent clients, logos, timelines, results or
              testimonials.
            </p>
          </StatusPanel>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ['01 — Context', 'The company stage, user problem and constraints at the start.'],
              [
                '02 — Contribution',
                'The exact product, design, engineering and leadership responsibilities.',
              ],
              [
                '03 — Evidence',
                'Approved outcomes with a clear source and no inflated attribution.',
              ],
            ].map(([title, body]) => (
              <div key={title} className="border-accent bg-surface border-t-2 p-6">
                <h2 className="font-heading text-lg font-semibold">{title}</h2>
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

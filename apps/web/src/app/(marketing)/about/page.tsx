import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/marketing/page-hero';
import { FinalCta } from '@/components/marketing/final-cta';
import { SectionHeading } from '@/components/ui/section-heading';

export const metadata: Metadata = {
  title: 'About',
  description: 'The principles behind LaunchForge’s senior-led startup delivery model.',
  alternates: { canonical: '/about' },
};
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About LaunchForge"
        title="Built around the decisions founders cannot afford to get wrong"
        body="LaunchForge is being established as a senior-led product and engineering partner—not a generic outsourced development layer and not yet a talent marketplace."
      />
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="The operating idea"
            title="Experienced ownership without asking a startup to hire a full senior team on day one"
            body="Early-stage teams need more than implementation capacity. They need help deciding what belongs in v1, which risks deserve attention, and how to reach production without creating avoidable constraints."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [
                'Clarity',
                'Explain technical choices in the context of user value, time, cost and risk.',
              ],
              [
                'Accountability',
                'Give every engagement visible senior ownership and direct access to decision-makers.',
              ],
              [
                'Transfer',
                'Build and document systems so the next internal team can take real ownership.',
              ],
            ].map(([title, body]) => (
              <div key={title} className="border-line bg-surface rounded-2xl border p-7">
                <h2 className="font-heading text-xl font-semibold">{title}</h2>
                <p className="text-muted mt-3 leading-7">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-line bg-surface border-y py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-accent font-mono text-xs tracking-[.16em] uppercase">
              Team transparency
            </p>
            <h2 className="font-heading mt-4 text-3xl font-semibold">
              Named profiles and experience claims are pending approval.
            </h2>
            <p className="text-ink-secondary mt-5 leading-8">
              The supplied material describes a senior-led model but does not provide verified
              biographies, headshots or a calculation for the collective experience claim. Those
              details should be added only after review.
            </p>
          </div>
          <div className="bg-brand rounded-3xl p-8 text-white">
            <p className="font-mono text-xs tracking-[.16em] text-white/60 uppercase">
              Phase boundary
            </p>
            <h2 className="font-heading mt-4 text-2xl font-semibold">
              Services now. Curated marketplace later.
            </h2>
            <p className="mt-4 leading-7 text-white/70">
              A two-sided developer marketplace is a future phase. It will not be presented as
              available until vetting, payments, disputes, messaging and operational trust are
              genuinely ready.
            </p>
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}

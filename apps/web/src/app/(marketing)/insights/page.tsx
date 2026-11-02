import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/marketing/page-hero';
import { StatusPanel } from '@/components/ui/status-panel';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'LaunchForge product, engineering and startup delivery insights.',
  alternates: { canonical: '/insights' },
};
export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical notes for building the first version well"
        body="The editorial foundation is ready for field-tested guidance on MVP scope, architecture, AI product decisions, releases and technical leadership."
      />
      <section className="py-20">
        <Container>
          <StatusPanel title="Editorial publishing is not enabled yet">
            <p>
              No placeholder articles are being presented as published advice. The database includes
              draft and publishing states; an editorial workflow and approved authors are still
              required.
            </p>
          </StatusPanel>
        </Container>
      </section>
    </>
  );
}

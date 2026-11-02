import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/marketing/page-hero';
import { ServiceGrid } from '@/components/marketing/service-grid';
import { FinalCta } from '@/components/marketing/final-cta';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore LaunchForge discovery, web, mobile, AI, DevOps and fractional CTO services.',
  alternates: { canonical: '/services' },
};
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="The right expertise for the next product milestone"
        body="Start with discovery, a production build, a specific capability gap or ongoing technical leadership. Each service is designed to leave your team with a concrete result and clearer ownership."
      />
      <section className="py-20 sm:py-28">
        <Container>
          <ServiceGrid />
        </Container>
      </section>
      <FinalCta />
    </>
  );
}

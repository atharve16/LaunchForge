import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/marketing/page-hero';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'LaunchForge terms status.',
  alternates: { canonical: '/terms' },
};
export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Service terms pending legal and commercial approval"
        body="This placeholder prevents unapproved promises from being published while engagement, payment, IP, cancellation and support terms are prepared."
      />
      <section className="py-16">
        <Container className="text-ink-secondary max-w-3xl space-y-8 leading-8">
          <p>
            No website copy should override an executed proposal or statement of work. Final terms
            need to address scope, acceptance, change control, fees, intellectual property,
            confidentiality, warranties, liability, cancellation and governing law.
          </p>
          <p>
            Marketplace, escrow and developer terms do not apply because those Phase 2 capabilities
            are not currently offered.
          </p>
        </Container>
      </section>
    </>
  );
}

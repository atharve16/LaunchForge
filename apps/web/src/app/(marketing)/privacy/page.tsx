import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/marketing/page-hero';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'LaunchForge privacy notice status.',
  alternates: { canonical: '/privacy' },
};
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy notice pending legal and operational approval"
        body="This route is intentionally not presented as a final policy. Data ownership, retention, controller identity and contact details must be confirmed before public launch."
      />
      <section className="py-16">
        <Container className="text-ink-secondary max-w-3xl space-y-8 leading-8">
          <p>
            During development, the lead form is designed to collect name, email, company, startup
            stage, requested services, budget range and project description. Authentication is
            provided by the configured Supabase project.
          </p>
          <p>
            Before production launch, LaunchForge must approve lawful basis, retention periods,
            access controls, subprocessors, regional handling, deletion procedures and a privacy
            contact. Do not deploy this draft as legal advice.
          </p>
        </Container>
      </section>
    </>
  );
}

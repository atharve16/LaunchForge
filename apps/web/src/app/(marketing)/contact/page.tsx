import type { Metadata } from 'next';
import { Calendar, Check, Mail } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/marketing/page-hero';
import { ContactForm } from '@/features/leads/contact-form';
import { getPublicEnv } from '@/config/env';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell LaunchForge about your startup, product and next milestone.',
  alternates: { canonical: '/contact' },
};
export default function ContactPage() {
  const bookingUrl = getPublicEnv().bookingUrl;
  return (
    <>
      <PageHero
        eyebrow="Start a conversation"
        title="What are you trying to get into users’ hands?"
        body="Share the product context, current stage and constraint that matters most. The form goes directly to the LaunchForge lead-management API."
      />
      <section id="start" className="scroll-mt-24 py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <aside>
            <h2 className="font-heading text-2xl font-semibold">A useful first conversation</h2>
            <ul className="mt-6 space-y-4">
              {[
                'What problem and user you are focused on',
                'What exists today, if anything',
                'The next milestone or decision you need',
                'Constraints around time, budget and team',
              ].map((item) => (
                <li key={item} className="text-ink-secondary flex gap-3">
                  <Check className="text-success mt-1 size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-line bg-surface mt-10 rounded-2xl border p-6">
              <Calendar className="text-accent size-5" />
              <h3 className="font-heading mt-4 font-semibold">Calendar booking</h3>
              {bookingUrl ? (
                <a
                  href={bookingUrl}
                  className="text-accent mt-2 inline-block text-sm font-semibold"
                  target="_blank"
                  rel="noreferrer"
                >
                  Choose an available time
                </a>
              ) : (
                <p className="text-muted mt-2 text-sm leading-6">
                  Calendar integration is not configured yet. Submit the form and the team can
                  follow up by email.
                </p>
              )}
            </div>
            <div className="text-muted mt-4 flex items-center gap-3 text-sm">
              <Mail className="size-4" /> No public contact email has been approved yet.
            </div>
          </aside>
          <div className="border-line bg-surface rounded-3xl border p-6 shadow-[var(--shadow-soft)] sm:p-9">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/config/content';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { FinalCta } from '@/components/marketing/final-cta';
import { getPublicEnv } from '@/config/env';

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Services',
        item: `${getPublicEnv().siteUrl}/services`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: service.name,
        item: `${getPublicEnv().siteUrl}/services/${service.slug}`,
      },
    ],
  };
  return (
    <>
      <section className="border-line bg-surface border-b py-18 sm:py-24">
        <Container>
          <nav className="text-muted flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link href="/services">Services</Link>
            <ChevronRight className="size-4" />
            {service.name}
          </nav>
          <p className="text-accent mt-10 font-mono text-xs font-semibold tracking-[0.18em] uppercase">
            {service.eyebrow}
          </p>
          <h1 className="font-heading mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-6xl">
            {service.name}
          </h1>
          <p className="text-ink-secondary mt-6 max-w-3xl text-xl leading-9">{service.summary}</p>
          <ButtonLink href="/contact" className="mt-8">
            Discuss this service
          </ButtonLink>
        </Container>
      </section>
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-accent font-mono text-xs tracking-[0.16em] uppercase">
              Who it is for
            </p>
            <p className="text-ink-secondary mt-4 text-lg leading-8">{service.forWhom}</p>
            <p className="text-accent mt-10 font-mono text-xs tracking-[0.16em] uppercase">
              The problem it solves
            </p>
            <p className="text-ink-secondary mt-4 text-lg leading-8">{service.problem}</p>
          </div>
          <div className="border-line bg-surface rounded-3xl border p-8 shadow-[var(--shadow-soft)]">
            <h2 className="font-heading text-2xl font-semibold">What LaunchForge delivers</h2>
            <ul className="mt-6 space-y-4">
              {service.deliverables.map((item) => (
                <li key={item} className="text-ink-secondary flex gap-3">
                  <Check className="text-success mt-1 size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <section className="border-line bg-surface border-y py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-[-0.035em]">
                How the engagement works
              </h2>
              <ol className="mt-8 space-y-5">
                {service.approach.map((item, index) => (
                  <li key={item} className="flex gap-4">
                    <span className="text-accent font-mono text-xs">0{index + 1}</span>
                    <span className="text-ink-secondary">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-[-0.035em]">
                What you receive
              </h2>
              <div className="mt-8 grid gap-3">
                {service.outcomes.map((item) => (
                  <div
                    key={item}
                    className="border-accent bg-canvas text-ink border-l-2 px-5 py-4 font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <FinalCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, '\\u003c') }}
      />
    </>
  );
}

import { ArrowUpRight, Bot, CloudCog, Compass, Laptop, Lightbulb, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/config/content';

const icons = {
  'idea-explosion': Lightbulb,
  'web-development': Laptop,
  'mobile-development': Smartphone,
  'ai-solutions': Bot,
  devops: CloudCog,
  'startup-advisory': Compass,
};

export function ServiceGrid() {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        const Icon = icons[service.slug as keyof typeof icons];
        return (
          <Link
            key={service.slug}
            href={`/services/${service.slug}` as never}
            className="group border-line bg-surface hover:border-accent border-t p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="bg-surface-alt text-accent grid size-11 place-items-center rounded-xl">
                <Icon className="size-5" />
              </span>
              <span className="text-muted font-mono text-xs">0{index + 1}</span>
            </div>
            <h3 className="font-heading text-ink mt-6 text-xl font-semibold tracking-[-0.025em]">
              {service.name}
            </h3>
            <p className="text-muted mt-3 leading-7">{service.summary}</p>
            <span className="text-accent mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              Explore service{' '}
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

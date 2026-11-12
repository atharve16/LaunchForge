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
    <div className="mt-16">
      {services.map((service, index) => {
        const Icon = icons[service.slug as keyof typeof icons];
        return (
          <Link
            key={service.slug}
            href={`/services/${service.slug}` as never}
            className="service-row group"
          >
            <span className="service-number">0{index + 1}</span>
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Icon className="text-accent size-4" aria-hidden="true" />
                <span className="text-muted font-mono text-[10px] tracking-[0.14em] uppercase">{service.eyebrow}</span>
              </div>
              <h3 className="font-heading text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{service.name}</h3>
              <p className="text-muted mt-3 max-w-md leading-7">{service.summary}</p>
            </div>
            <div className={`service-art service-art--${service.slug === 'idea-explosion' ? 'idea' : service.slug === 'web-development' ? 'web' : service.slug === 'mobile-development' ? 'mobile' : service.slug === 'ai-solutions' ? 'ai' : service.slug === 'devops' ? 'devops' : 'advisory'}`} aria-hidden="true">
              <span>{service.name.replace('Startup ', '')}</span>
            </div>
            <ArrowUpRight className="text-muted size-5 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
}

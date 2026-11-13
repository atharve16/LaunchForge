import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/config/content';

const servicePresentation: Record<string, { name: string; summary: string }> = {
  'idea-explosion': {
    name: 'Idea Discovery & Product Strategy',
    summary: 'Find the sharpest first product before the build begins.',
  },
  'web-development': {
    name: 'Web Development',
    summary: 'Fast, maintainable web products built for real users.',
  },
  'mobile-development': {
    name: 'Mobile Development',
    summary: 'Focused mobile experiences with a path to release.',
  },
  'ai-solutions': {
    name: 'AI Solutions',
    summary: 'Practical AI features integrated where they create value.',
  },
  devops: {
    name: 'Deployment & DevOps',
    summary: 'A clear, reliable route from code change to production.',
  },
  'startup-advisory': {
    name: 'Fractional CTO & Startup Advisory',
    summary: 'Experienced technical judgment for the decisions that compound.',
  },
};

export function ServiceGrid() {
  return (
    <div className="mt-16">
      {services.map((service, index) => {
        const presentation = servicePresentation[service.slug] ?? service;
        return (
          <Link
            key={service.slug}
            href={`/services/${service.slug}` as never}
            className="service-row group"
          >
            <span className="service-number">0{index + 1}</span>
            <div>
              <h3 className="font-heading text-xl font-semibold tracking-[-0.035em] sm:text-2xl">{presentation.name}</h3>
              <p className="text-muted mt-2 max-w-md text-sm leading-6 sm:text-base">{presentation.summary}</p>
            </div>
            <ArrowUpRight className="text-muted size-5 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
}

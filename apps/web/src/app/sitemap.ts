import type { MetadataRoute } from 'next';
import { services } from '@/config/content';
import { getPublicEnv } from '@/config/env';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getPublicEnv().siteUrl;
  const staticRoutes = [
    '',
    '/services',
    '/how-we-work',
    '/engagements',
    '/work',
    '/about',
    '/insights',
    '/contact',
    '/privacy',
    '/terms',
  ];
  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '' ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}

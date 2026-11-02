import type { MetadataRoute } from 'next';
import { getPublicEnv } from '@/config/env';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/dashboard/', '/admin/', '/auth/'] }],
    sitemap: `${getPublicEnv().siteUrl}/sitemap.xml`,
  };
}

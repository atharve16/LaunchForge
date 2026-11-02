import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Inter, Manrope } from 'next/font/google';
import { getPublicEnv } from '@/config/env';
import { AuthProvider } from '@/features/auth/auth-provider';
import '@/styles/globals.css';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const siteUrl = getPublicEnv().siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'LaunchForge — From first idea to first users', template: '%s | LaunchForge' },
  description:
    'Senior-led product and engineering support for startups—from discovery and prototyping to development, deployment and growth.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'LaunchForge',
    title: 'LaunchForge — From first idea to first users',
    description: 'Build your startup with experienced product and engineering leadership.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LaunchForge',
    description: 'From first idea to first users.',
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#111c2e' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LaunchForge',
    url: siteUrl,
    description: 'Senior-led product and engineering partner for early-stage startups.',
  };
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
}

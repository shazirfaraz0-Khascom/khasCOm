import { Metadata } from 'next';

export const SITE_NAME = 'KhasCom';

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'http://localhost:3000';

const DEFAULT_TITLE = 'KhasCom | Pakistani Commodities Export & Import Group';

const DEFAULT_DESCRIPTION =
  'KhasCom is a Pakistani commodities export and import group supplying international ' +
  'wholesale buyers with fresh fruits and vegetables, Himalayan pink salt, dates, sesame ' +
  'seeds, basmati rice and grains — sourced direct and shipped worldwide.';

const DEFAULT_KEYWORDS = [
  'KhasCom',
  'KhasCom Pakistan',
  'Pakistani commodities exporter',
  'Pakistan export import company',
  'Himalayan pink salt exporter',
  'Pakistani dates exporter',
  'sesame seeds exporter Pakistan',
  'fresh vegetables exporter Pakistan',
  'tinda loki arvi export',
  'basmati rice exporter',
  'wholesale commodities supplier',
];

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image = '/images/og-image.jpg',
  path,
  keywords,
  noIndex = false,
}: {
  /** Page title without the brand suffix — the root layout template appends it. */
  title?: string;
  description?: string;
  image?: string;
  /** Site-relative path, e.g. `/products/dates`. Sets the canonical URL. */
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
} = {}): Metadata {
  const resolvedTitle = title ?? DEFAULT_TITLE;
  const canonical = path ? (path === '/' ? '/' : path.replace(/\/$/, '')) : undefined;

  return {
    title: resolvedTitle,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...(keywords ?? [])],
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    ...(canonical && { alternates: { canonical } }),
    openGraph: {
      title: resolvedTitle,
      description,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      ...(canonical && { url: canonical }),
      images: [{ url: image, width: 1200, height: 630, alt: `${SITE_NAME} — ${resolvedTitle}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [image],
    },
    metadataBase: new URL(SITE_URL),
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              'max-image-preview': 'large',
              'max-snippet': -1,
              'max-video-preview': -1,
            },
          },
        }),
  };
}

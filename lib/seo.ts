import { Metadata } from 'next';

type DefaultMetadata = {
  title: string;
  description: string;
  openGraph?: Metadata['openGraph'];
};

const DEFAULT_SEO: DefaultMetadata = {
  title: 'KhasCom | Pakistani Commodities Export & Import Group',
  description: 'Pakistan-based exporter and importer of fresh fruits and vegetables, Himalayan pink salt, dates, sesame seeds, rice and grains — supplying international wholesale buyers in bulk.',
};

export function constructMetadata({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  image = '/images/logo.png',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@khascom',
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

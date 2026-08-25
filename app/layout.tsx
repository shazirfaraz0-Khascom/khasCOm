import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { constructMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  ...constructMetadata({ path: "/" }),
  // Child pages set a bare title; the brand is appended here so it is never
  // duplicated and every tab in the site is identifiably KhasCom.
  title: {
    default: "KhasCom | Pakistani Commodities Export & Import Group",
    template: `%s | ${SITE_NAME}`,
  },
};

/**
 * Organization and WebSite markup. This is what lets Google associate the name
 * "KhasCom" with this domain, its logo and its contact route, rather than
 * treating each page as an unrelated document.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["KhasCom Commodities Group", "Khascom"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo-wordmark.webp`,
        caption: SITE_NAME,
      },
      image: `${SITE_URL}/images/og-image.jpg`,
      description:
        "Pakistani commodities export and import group supplying international wholesale " +
        "buyers with fresh fruits and vegetables, Himalayan pink salt, dates, sesame seeds, " +
        "basmati rice and grains.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "29-C, Ittehad Commercial Lane-1, Phase 6, DHA",
        addressLocality: "Karachi",
        addressRegion: "Sindh",
        postalCode: "75500",
        addressCountry: "PK",
      },
      telephone: "+923008224424",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+923008224424",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Urdu"],
      },
      knowsAbout: [
        "Himalayan pink salt export",
        "Pakistani dates",
        "Sesame seeds",
        "Fresh vegetable export",
        "Basmati rice",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased scroll-smooth`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col font-sans text-stone-800 bg-stone-50" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

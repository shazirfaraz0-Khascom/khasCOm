import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { CATEGORY_DATA } from './(site)/products/[category]/page';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '');
  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/import`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/export`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/import/source-countries`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/contact-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact-us/request-import-quote`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact-us/request-export-quote`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact-us/become-a-supplier`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // The static catalogue under /products is the real, always-populated product
  // tree. It renders without a database, so it is listed unconditionally.
  for (const [slug, category] of Object.entries(CATEGORY_DATA)) {
    sitemapEntries.push({
      url: `${baseUrl}/products/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
    for (const product of category.products) {
      sitemapEntries.push({
        url: `${baseUrl}/products/${slug}/${product.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  if (process.env.DATABASE_URL) {
    try {
      // Categories
      const categories = await prisma.category.findMany();
      categories.forEach(cat => {
        sitemapEntries.push({
          url: `${baseUrl}/import/${cat.slug}`,
          lastModified: cat.updatedAt,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });

      // Products
      const products = await prisma.product.findMany({ include: { category: true } });
      products.forEach(prod => {
        if (prod.category) {
          sitemapEntries.push({
            url: `${baseUrl}/import/${prod.category.slug}/${prod.slug}`,
            lastModified: prod.updatedAt,
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      });

      // Countries
      const countries = await prisma.sourceCountry.findMany();
      countries.forEach(country => {
        sitemapEntries.push({
          url: `${baseUrl}/import/source-countries/${country.slug}`,
          lastModified: country.updatedAt,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });

      // Destinations
      const destinations = await prisma.exportDestination.findMany();
      destinations.forEach(dest => {
        sitemapEntries.push({
          url: `${baseUrl}/export/${dest.slug}`,
          lastModified: dest.updatedAt,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });

      // Blog Posts
      const posts = await prisma.blogPost.findMany({ where: { status: 'Published' } });
      posts.forEach(post => {
        sitemapEntries.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updatedAt,
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });

      // Static Pages
      const pages = await prisma.staticPage.findMany();
      pages.forEach(page => {
        sitemapEntries.push({
          url: `${baseUrl}/${page.slug}`,
          lastModified: page.updatedAt,
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    } catch (e) {
      console.error("Sitemap generation error", e);
    }
  }

  return sitemapEntries;
}

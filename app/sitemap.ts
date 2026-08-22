import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const sitemapEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/import`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/export`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/import/source-countries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

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

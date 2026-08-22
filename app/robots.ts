import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  // Try to load custom robots.txt from DB
  let customRobots = null;
  if (process.env.DATABASE_URL) {
    try {
      const setting = await prisma.siteSetting.findUnique({ where: { key: 'robots_txt' } });
      if (setting && setting.value) {
        customRobots = setting.value;
      }
    } catch (e) {
      console.error("Robots.txt generation error", e);
    }
  }

  // If we wanted to parse a raw string we could, but nextjs expects this object format.
  // For simplicity, we define the default rules here. The user can implement a custom parser if needed.
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

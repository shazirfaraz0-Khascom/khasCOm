import { constructMetadata } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import HomeClient from '@/components/home/HomeClient';

export const metadata = constructMetadata({
  title: 'Pakistani Commodities Export & Import Group',
  path: '/',
  description: "Pakistan's commodities export and import group \u2014 fresh fruits and vegetables, Himalayan pink salt, dates, sesame seeds, rice and grains for international wholesale buyers.",
});

export default async function HomePage() {
  let dbCategories: any[] = [];
  try {
    dbCategories = await prisma.category?.findMany({
      orderBy: { order: 'asc' },
      take: 6,
    });
  } catch (error) {
    console.error("Database not connected yet", error);
  }

  let categories = dbCategories.map(c => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description || undefined,
    image: c.bannerImage || undefined
  }));

  if (categories.length === 0) {
    categories = [
      { id: 'fresh-fruits', slug: 'fresh-fruits', name: 'Fresh Fruits', description: 'Chaunsa mangoes, Valencia oranges and seasonal Pakistani fruit.', image: '/images/unsplash-1611080626919-7cf5a9dbab5b.webp' },
      { id: 'fresh-vegetables', slug: 'fresh-vegetables', name: 'Fresh Vegetables', description: 'Tinda, loki, arvi, onions and potatoes, packed for reefer export.', image: '/images/tinda-apple-gourd.webp' },
      { id: 'himalayan-salt', slug: 'himalayan-salt', name: 'Himalayan Pink Salt', description: 'Hand-mined pink rock salt from the Khewra range in Punjab.', image: '/images/pink-salt-real.webp' },
      { id: 'dates', slug: 'dates', name: 'Dates', description: 'Aseel, Ajwa and dry dates from the Khairpur and Sindh belts.', image: '/images/dates-aseel.webp' },
      { id: 'seeds-oilseeds', slug: 'seeds-oilseeds', name: 'Sesame Seeds & Oilseeds', description: 'Natural, hulled and black sesame seeds, sortex cleaned to spec.', image: '/images/sesame-seeds-white.webp' },
      { id: 'grains', slug: 'grains', name: 'Grains & Staples', description: '1121 basmati rice, wheat and daily staples in bulk.', image: '/images/unsplash-1586201375761-83865001e31c.webp' },
    ];
  }

  return <HomeClient categories={categories} />;
}
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Import Sourcing Hub',
  path: '/import',
  description: 'Explore our global import sourcing hubs for premium fresh fruits, vegetables, nuts, and spices.',
});

export const revalidate = 3600;

export default async function ImportHubPage() {
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex-1 bg-stone-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Global Import Sourcing</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            We partner with certified farms and suppliers across the globe to bring you the highest quality agricultural products. Choose a category below to explore our offerings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/import/${cat.slug}`} className="group block bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl transition-all">
              <div className="aspect-[4/3] bg-stone-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                {/* Image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-stone-400 font-serif">Image: {cat.name}</div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-serif font-bold text-stone-900 group-hover:text-primary transition-colors">{cat.name}</h2>
                {cat.description && <p className="text-stone-600 text-sm mt-2 line-clamp-2">{cat.description}</p>}
                <div className="mt-4 text-primary text-sm font-medium flex items-center">
                  View Products &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/import/source-countries" className="inline-flex items-center justify-center rounded-md border-2 border-primary bg-transparent text-primary px-8 py-3 text-base font-semibold shadow hover:bg-primary hover:text-white transition-colors">
            Browse by Source Country
          </Link>
        </div>
      </div>
    </div>
  );
}

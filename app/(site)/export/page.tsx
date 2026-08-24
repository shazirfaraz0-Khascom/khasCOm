import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Export Markets',
  path: '/export',
  description: 'Explore our export destinations and wholesale distribution networks globally.',
});

export const revalidate = 3600;

export default async function ExportHubPage() {
  let destinations: any[] = [];
  try {
    destinations = await prisma.exportDestination.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="flex-1 bg-stone-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Global Export Markets</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            We supply premium fresh produce and dry goods to wholesale buyers, distributors, and retailers across our established export destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <Link key={dest.id} href={`/export/${dest.slug}`} className="group block bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl transition-all">
              <div className="aspect-[4/3] bg-stone-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/20 transition-colors z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-serif z-20 text-xl font-bold tracking-wider">
                  {dest.name}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-serif font-bold text-stone-900 group-hover:text-primary transition-colors">{dest.name}</h2>
                <div className="mt-2 text-stone-600 text-sm">
                  {dest.region || 'International Market'}
                </div>
                <div className="mt-4 text-primary text-sm font-medium flex items-center">
                  Market Details &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

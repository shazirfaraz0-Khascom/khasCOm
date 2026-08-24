import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Source Countries',
  description: 'Explore our global network of source countries for premium agricultural products.',
});

export const revalidate = 3600;

export default async function SourceCountriesHubPage() {
  let countries: any[] = [];
  try {
    countries = await prisma.sourceCountry.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="flex-1 bg-stone-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Our Global Sourcing Network</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            We operate across major agricultural hubs globally to ensure a consistent, year-round supply of premium quality products.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <Link key={country.id} href={`/import/source-countries/${country.slug}`} className="group bg-white rounded-xl shadow-sm border border-stone-200 p-6 flex flex-col items-center text-center hover:shadow-xl hover:border-primary/30 transition-all">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:bg-primary/10 transition-colors">
                🌍
              </div>
              <h2 className="text-lg font-bold font-serif text-stone-900 mb-1 group-hover:text-primary transition-colors">{country.name}</h2>
              <p className="text-sm text-stone-500">{country._count.products} Products Sourced</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const countries = await prisma.sourceCountry.findMany({ select: { slug: true } });
    return countries.map((c) => ({
      country: c.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const resolvedParams = await params;
  try {
    const country = await prisma.sourceCountry.findUnique({
      where: { slug: resolvedParams.country },
    });
    if (country) {
      return constructMetadata({
        title: country.seoTitle || `Products from ${country.name}`,
        description: country.seoMeta || `Explore premium agricultural products sourced from verified farms in ${country.name}.`,
      });
    }
  } catch (e) {
    console.error(e);
  }
  return constructMetadata({ title: 'Not Found' });
}

export default async function SourceCountryPage({ params }: { params: Promise<{ country: string }> }) {
  const resolvedParams = await params;
  let country: any = null;
  try {
    country = await prisma.sourceCountry.findUnique({
      where: { slug: resolvedParams.country },
      include: {
        products: {
          include: {
            product: {
              include: { category: true }
            }
          }
        },
      },
    });
  } catch (e) {
    console.error(e);
  }

  if (!country) {
    notFound();
  }

  return (
    <div className="flex-1 bg-stone-50 pb-20">
      {/* Country Banner */}
      <div className="bg-primary text-white min-h-[100svh] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-sm font-medium mb-4 flex items-center gap-2 text-primary-foreground/80">
            <Link href="/import/source-countries" className="hover:text-white transition-colors">Source Countries</Link>
            <span>/</span>
            <span className="text-white">{country.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Sourced from {country.name}</h1>
          <p className="text-lg md:text-xl max-w-2xl text-primary-foreground/90">
            {country.description || `Discover our extensive range of high-quality produce imported directly from ${country.name}.`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Country Info sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
              <h3 className="font-serif font-bold text-xl text-stone-900 mb-4">Origin Information</h3>
              <div className="space-y-4">
                {country.region && (
                  <div>
                    <span className="block text-sm text-stone-500 font-medium">Region</span>
                    <span className="text-stone-900">{country.region}</span>
                  </div>
                )}
                {country.harvestSeasonInfo && (
                  <div>
                    <span className="block text-sm text-stone-500 font-medium">Harvest Seasons</span>
                    <span className="text-stone-900">{country.harvestSeasonInfo}</span>
                  </div>
                )}
                {country.certifications && (
                  <div>
                    <span className="block text-sm text-stone-500 font-medium">Standard Certifications</span>
                    <span className="text-stone-900">{country.certifications}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-primary/5 rounded-xl border border-primary/10 p-6 text-center">
              <h4 className="font-bold text-stone-900 mb-2">Interested in products from {country.name}?</h4>
              <p className="text-sm text-stone-600 mb-4">Contact our sourcing team for availability and quotes.</p>
              <Link href="/contact-us" className="inline-flex items-center justify-center rounded-md bg-primary text-white px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors w-full">
                Contact Sourcing Team
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Products from {country.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {country?.products?.map(({ product }: any) => (
                <Link key={product.id} href={`/import/${product.category.slug}/${product.slug}`} className="group bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl transition-all flex flex-col h-full">
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{product.category.name}</div>
                    <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-primary transition-colors mb-2">{product.name}</h3>
                    <div className="mt-auto pt-4 text-primary text-sm font-medium flex items-center">
                      View Details &rarr;
                    </div>
                  </div>
                </Link>
              ))}
              {(!country?.products || country.products.length === 0) && (
                <div className="col-span-full py-12 text-center text-stone-500 bg-white rounded-xl border border-dashed border-stone-300">
                  No products currently listed for this country.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    return products.map((p) => ({
      category: p.category?.slug,
      product: p.slug,
    })).filter(p => p.category);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; product: string }> }) {
  const resolvedParams = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { slug: resolvedParams.product },
      include: { sourceCountries: { include: { sourceCountry: true } } },
    });
    
    if (product) {
      const countries = product.sourceCountries?.map((sc: any) => sc.sourceCountry.name).join(' & ') || '';
      return constructMetadata({
        title: product.seoTitle || `${product.name} — Wholesale Import from ${countries}`,
        description: product.seoMeta || `Premium ${product.name} sourced from ${countries} for wholesale import. Contact us for bulk export quotes.`,
      });
    }
  } catch (e) {
    console.error(e);
  }
  return constructMetadata({ title: 'Not Found' });
}

export default async function ProductPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const resolvedParams = await params;
  let product: any = null;
  let relatedProducts: any[] = [];
  try {
    product = await prisma.product.findUnique({
      where: { slug: resolvedParams.product },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        sourceCountries: { include: { sourceCountry: true } },
      },
    });

    if (product) {
      relatedProducts = await prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          id: { not: product.id },
          status: { not: 'OutOfSeason' },
        },
        take: 3,
        include: { sourceCountries: { include: { sourceCountry: true } } },
      });
    }
  } catch (e) {
    console.error(e);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.seoMeta || `Premium ${product.name} for wholesale.`,
    brand: {
      '@type': 'Organization',
      name: 'KhasCom',
    }
  };

  return (
    <div className="flex-1 bg-stone-50 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Breadcrumb */}
      <div className="bg-stone-100 border-b border-stone-200">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center text-sm font-medium text-stone-500 gap-2 overflow-x-auto whitespace-nowrap">
          <Link href="/import" className="hover:text-primary transition-colors">Import Hub</Link>
          <span>/</span>
          <Link href={`/import/${product.category.slug}`} className="hover:text-primary transition-colors">{product.category.name}</Link>
          <span>/</span>
          <span className="text-stone-900">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Gallery Placeholder */}
          <div className="space-y-4">
            <div className="aspect-square bg-stone-200 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-stone-400 font-serif text-lg">
                Image: {product.name}
              </div>
            </div>
            {product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product?.images?.map((img: any) => (
                  <div key={img.id} className="aspect-square bg-stone-200 rounded-xl overflow-hidden" />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">{product.name}</h1>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {product?.sourceCountries?.map((sc: any) => (
                <Link key={sc.sourceCountryId} href={`/import/source-countries/${sc.sourceCountry.slug}`} className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                  Sourced from {sc.sourceCountry.name}
                </Link>
              ))}
            </div>

            <div className="prose prose-stone prose-lg mb-10">
              <p>{product.description || `Premium quality ${product.name.toLowerCase()} available for wholesale international trade.`}</p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden mb-10">
              <div className="px-6 py-4 bg-stone-100 border-b border-stone-200">
                <h3 className="font-bold text-stone-900">Product Specifications</h3>
              </div>
              <div className="divide-y divide-stone-100">
                {product.variety && (
                  <div className="flex px-6 py-4"><span className="w-1/3 text-stone-500 font-medium">Variety</span><span className="w-2/3 text-stone-900">{product.variety}</span></div>
                )}
                {product.sizeGrade && (
                  <div className="flex px-6 py-4"><span className="w-1/3 text-stone-500 font-medium">Size / Grade</span><span className="w-2/3 text-stone-900">{product.sizeGrade}</span></div>
                )}
                {product.packingType && (
                  <div className="flex px-6 py-4"><span className="w-1/3 text-stone-500 font-medium">Packing Type</span><span className="w-2/3 text-stone-900">{product.packingType}</span></div>
                )}
                {product.shelfLife && (
                  <div className="flex px-6 py-4"><span className="w-1/3 text-stone-500 font-medium">Shelf Life</span><span className="w-2/3 text-stone-900">{product.shelfLife}</span></div>
                )}
                {(product.seasonStart || product.seasonEnd) && (
                  <div className="flex px-6 py-4"><span className="w-1/3 text-stone-500 font-medium">Availability</span><span className="w-2/3 text-stone-900">{product.seasonStart} - {product.seasonEnd}</span></div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/contact-us/request-import-quote?product=${product.id}`} className="inline-flex items-center justify-center rounded-md bg-accent text-accent-foreground px-8 py-3.5 text-base font-semibold shadow hover:bg-accent/90 transition-colors w-full sm:w-auto">
                Request Import Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8">Related Products in {product.category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rp: any) => (
                <Link key={rp.id} href={`/import/${product.category.slug}/${rp.slug}`} className="group bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl transition-all flex flex-col">
                  <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                    <div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm">Image: {rp.name}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-primary transition-colors">{rp.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

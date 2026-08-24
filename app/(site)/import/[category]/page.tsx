import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const categories = await prisma.category.findMany({ select: { slug: true } });
    return categories.map((cat) => ({
      category: cat.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  try {
    const category = await prisma.category.findUnique({
      where: { slug: resolvedParams.category },
    });
    if (category) {
      return constructMetadata({
        title: category.seoTitle || `${category.name} Wholesale Import`,
        description: category.seoMeta || `Explore our premium ${category.name} sourced directly from verified global farms for international trade.`,
      });
    }
  } catch (e) {
    console.error(e);
  }
  return constructMetadata({ title: 'Not Found' });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  let category: any = null;
  try {
    category = await prisma.category.findUnique({
      where: { slug: resolvedParams.category },
      include: {
        products: {
          where: { status: { not: 'OutOfSeason' } },
          include: { sourceCountries: { include: { sourceCountry: true } } },
        },
      },
    });
  } catch (e) {
    console.error(e);
  }

  if (!category) {
    notFound();
  }

  return (
    <div className="flex-1 bg-stone-50 pb-20">
      {/* Category Banner */}
      <div className="bg-primary text-white min-h-[100svh] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-sm font-medium mb-4 flex items-center gap-2 text-primary-foreground/80">
            <Link href="/import" className="hover:text-white transition-colors">Import Hub</Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{category.name}</h1>
          <p className="text-lg md:text-xl max-w-2xl text-primary-foreground/90">
            {category.description || `Premium wholesale ${category.name.toLowerCase()} sourced globally for international export and trade.`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category?.products?.map((product: any) => (
            <Link key={product.id} href={`/import/${category.slug}/${product.slug}`} className="group bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl transition-all flex flex-col h-full">
              <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm">Image: {product.name}</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-serif font-bold text-stone-900 group-hover:text-primary transition-colors mb-2">{product.name}</h2>
                <div className="flex flex-wrap gap-1 mt-auto mb-4">
                  {product.sourceCountries?.map((sc: any) => (
                    <span key={sc.sourceCountryId} className="inline-flex items-center rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
                      {sc.sourceCountry.name}
                    </span>
                  ))}
                </div>
                <div className="text-primary text-sm font-medium flex items-center mt-2">
                  View Details &rarr;
                </div>
              </div>
            </Link>
          ))}
          {(!category?.products || category.products.length === 0) && (
            <div className="col-span-full py-12 text-center text-stone-500 bg-white rounded-xl border border-dashed border-stone-300">
              No active products in this category at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

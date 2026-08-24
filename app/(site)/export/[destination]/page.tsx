import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const destinations = await prisma.exportDestination.findMany({ select: { slug: true } });
    return destinations.map((d) => ({
      destination: d.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ destination: string }> }) {
  const resolvedParams = await params;
  try {
    const dest = await prisma.exportDestination.findUnique({
      where: { slug: resolvedParams.destination },
    });
    if (dest) {
      return constructMetadata({
        title: dest.seoTitle || `Export to ${dest.name} | Wholesale Supply`,
        description: dest.seoMeta || `Wholesale export of premium fresh fruits and vegetables to ${dest.name}. Contact us for bulk export quotes and logistics information.`,
      });
    }
  } catch (e) {
    console.error(e);
  }
  return constructMetadata({ title: 'Not Found' });
}

export default async function ExportDestinationPage({ params }: { params: Promise<{ destination: string }> }) {
  const resolvedParams = await params;
  let dest: any = null;
  try {
    dest = await prisma.exportDestination.findUnique({
      where: { slug: resolvedParams.destination },
      include: {
        products: {
          include: { category: true, product: true }
        }
      },
    });
  } catch (e) {
    console.error(e);
  }

  if (!dest) {
    notFound();
  }

  // Filter out linked categories and products
  const linkedCategories = dest?.products?.filter((p: any) => p.category).map((p: any) => p.category) || [];
  const linkedProducts = dest?.products?.filter((p: any) => p.product).map((p: any) => p.product) || [];

  return (
    <div className="flex-1 bg-stone-50 pb-20">
      <div className="bg-stone-900 text-white min-h-[100svh] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-sm font-medium mb-4 flex items-center gap-2 text-stone-400">
            <Link href="/export" className="hover:text-white transition-colors">Export Markets</Link>
            <span>/</span>
            <span className="text-white">{dest.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Export to {dest.name}</h1>
          <p className="text-lg md:text-xl max-w-2xl text-stone-300">
            Dedicated wholesale supply chains and logistics solutions for {dest.name}.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Market Overview</h2>
              <div className="prose prose-stone">
                <p>
                  KhasCom is a trusted supplier for wholesale buyers in {dest.name}. We understand the specific quality standards, packaging requirements, and phytosanitary regulations required for this market.
                </p>
                <p>
                  Our robust cold-chain logistics ensure that fresh produce arrives in peak condition, preserving freshness and shelf life.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Product Scope for {dest.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {linkedCategories.map((cat: any) => (
                  <Link key={cat!.id} href={`/import/${cat!.slug}`} className="p-6 bg-white rounded-xl shadow-sm border border-stone-200 hover:border-primary/50 transition-colors group">
                    <h3 className="font-bold font-serif text-lg text-stone-900 group-hover:text-primary mb-2">{cat!.name}</h3>
                    <p className="text-sm text-stone-500">Explore full range &rarr;</p>
                  </Link>
                ))}
                
                {linkedProducts.map((prod: any) => (
                  <Link key={prod!.id} href={`/import/placeholder/${prod!.slug}`} className="p-6 bg-white rounded-xl shadow-sm border border-stone-200 hover:border-primary/50 transition-colors group">
                    <h3 className="font-bold font-serif text-lg text-stone-900 group-hover:text-primary mb-2">{prod!.name}</h3>
                    <p className="text-sm text-stone-500">View product details &rarr;</p>
                  </Link>
                ))}

                {linkedCategories.length === 0 && linkedProducts.length === 0 && (
                  <div className="col-span-full p-6 bg-stone-100 rounded-xl text-stone-500 text-sm">
                    Product scope information is being updated. We generally supply Mix Fruits and Dry Items to this region.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
              <h3 className="font-serif font-bold text-xl text-stone-900 mb-4">Logistics & Shipping</h3>
              <div className="space-y-4 text-sm text-stone-600">
                <div>
                  <span className="block font-medium text-stone-900 mb-1">Port & Logistics Notes</span>
                  <p>{dest.portLogisticsNotes || 'Custom logistics solutions available including Air Freight and Sea Freight (Reefer Containers). Contact us for specific transit times.'}</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 text-white rounded-xl p-6 text-center shadow-lg">
              <h3 className="font-serif font-bold text-xl mb-3">Ready to Order?</h3>
              <p className="text-stone-300 text-sm mb-6">
                Get a customized quote for wholesale delivery to {dest.name}.
              </p>
              <Link href={`/contact-us/request-export-quote?destination=${dest.id}`} className="inline-block w-full rounded-md bg-accent text-accent-foreground px-4 py-3 font-semibold hover:bg-accent/90 transition-colors">
                Request Export Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

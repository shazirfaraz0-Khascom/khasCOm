import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Ship, Clock, CheckCircle2, FileText, Anchor, ArrowRight, PackageOpen, Factory, Globe } from "lucide-react";
import { constructMetadata } from "@/lib/seo";
import { CATEGORY_DATA } from "../page"; // Importing the shared mock data

type CategoryKey = keyof typeof CATEGORY_DATA;

export async function generateStaticParams() {
  const params: { category: string; product: string }[] = [];
  
  Object.keys(CATEGORY_DATA).forEach((catKey) => {
    const category = CATEGORY_DATA[catKey as CategoryKey];
    category.products.forEach((prod) => {
      params.push({ category: catKey, product: prod.slug });
    });
  });

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; product: string }> }) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.category as CategoryKey;
  const data = CATEGORY_DATA[categoryId];

  if (!data) return constructMetadata({ title: 'Product Not Found' });

  const product = data.products.find(p => p.slug === resolvedParams.product);
  
  if (!product) return constructMetadata({ title: 'Product Not Found' });

  return constructMetadata({
    title: `${product.name} Wholesale Export | KhasCom`,
    description: `Premium ${product.name} from ${product.origin}. Global export and wholesale supply.`,
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.category as CategoryKey;
  const categoryData = CATEGORY_DATA[categoryId];

  if (!categoryData) notFound();

  const product = categoryData.products.find(p => p.slug === resolvedParams.product);
  if (!product) notFound();

  const relatedProducts = categoryData.products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAF8] overflow-x-hidden selection:bg-[#14532D] selection:text-white pb-20">
      {/* 1. Premium Homepage-Style Hero */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0A1A11]">
        <div className="absolute inset-0 z-0">
          <Image
            src={product.img}
            alt={product.name}
            fill
            priority
            className="object-cover opacity-50 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A11] via-[#0A1A11]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAF8] via-transparent to-transparent opacity-100 h-32 bottom-0 top-auto z-10" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20 pt-32 pb-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                <Link href={`/products/${categoryId}`} className="hover:text-white transition-colors">{categoryData.name}</Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-[#C8A14A] truncate">{product.name}</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A14A]/10 border border-[#C8A14A]/20 text-[#C8A14A] text-xs font-bold uppercase tracking-widest w-fit mb-6 shadow-[0_0_15px_rgba(200,161,74,0.1)]">
                <Globe className="w-3.5 h-3.5" /> Global Export Available
              </div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
                {product.name}
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 font-light max-w-xl">
                Premium grade {product.name.toLowerCase()} cultivated and processed to meet international standards. Available for wholesale and bulk global export from {product.origin}.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact-us/request-import-quote" className="px-8 py-4 bg-[#C8A14A] text-white font-medium rounded-full hover:bg-[#B08D3F] transition-all duration-300 shadow-[0_0_20px_rgba(200,161,74,0.3)] hover:shadow-[0_0_30px_rgba(200,161,74,0.5)] flex items-center gap-2">
                  Request Export Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#specifications" className="px-8 py-4 bg-white/5 backdrop-blur-md text-white font-medium rounded-full hover:bg-white/10 border border-white/10 transition-all duration-300 flex items-center gap-2">
                  View Specifications
                </a>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-end">
               {/* Decorative card in hero */}
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-white font-serif font-bold text-2xl mb-6 relative z-10">Export Summary</h3>
                  <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-gray-400 text-sm">Origin</span>
                      <span className="text-white font-medium">{product.origin}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-gray-400 text-sm">Category</span>
                      <span className="text-white font-medium">{categoryData.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Quality</span>
                      <span className="text-[#C8A14A] font-medium flex items-center gap-1"><ShieldCheck className="w-4 h-4"/> Premium A-Grade</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 -mt-10 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* 2. Product Gallery */}
            <section className="bg-white rounded-3xl p-4 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden bg-gray-100 group">
                <Image 
                  src={product.img} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
              </div>
            </section>

            {/* 3. Product Overview */}
            <section>
              <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-6 flex items-center gap-3">
                <FileText className="text-[#C8A14A]" /> Product Overview
              </h2>
              <div className="prose prose-lg text-gray-600 prose-headings:font-serif prose-headings:text-[#1A1A1A] prose-a:text-[#14532D]">
                <p>
                  Our {product.name} represents the pinnacle of quality from {product.origin}. Cultivated in ideal climates and harvested at peak perfection, this product is highly sought after in international markets for its superior characteristics and extended shelf life.
                </p>
                <p>
                  KhasCom employs advanced agricultural techniques and stringent sorting processes to ensure only the finest produce makes it into our export shipments. Our state-of-the-art cold chain logistics preserve the integrity of the product from farm to final destination.
                </p>
              </div>
            </section>

            {/* 4. Features Section */}
            <section>
              <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-8">Key Advantages</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Premium Grade selection with consistent sizing and coloring.",
                  "Strict phytosanitary compliance for international clearance.",
                  "Optimized packaging for maximum container space utilization.",
                  "Extended shelf life through advanced post-harvest handling.",
                  "Full traceability from farm to export port.",
                  "Customized packaging options available upon request."
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="mt-1">
                      <CheckCircle2 className="w-6 h-6 text-[#14532D] group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Specifications Table */}
            <section id="specifications" className="scroll-mt-32">
              <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-8">Technical Specifications</h2>
              <div className="bg-white border border-gray-100 shadow-lg shadow-gray-200/50 rounded-3xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {[
                      { label: "Product Name", value: product.name },
                      { label: "Country of Origin", value: product.origin },
                      { label: "Category", value: categoryData.name },
                      { label: "Quality Grade", value: "Premium Grade A / Export Standard" },
                      { label: "Certifications", value: "ISO 9001, HACCP, Global GAP (where applicable)" },
                      { label: "Supply Ability", value: "Available year-round (subject to seasonality)" },
                      { label: "Inspection", value: "SGS or equivalent prior to shipment" }
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <th className="py-5 px-6 lg:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider w-1/3 align-top bg-gray-50/30">
                          {row.label}
                        </th>
                        <td className="py-5 px-6 lg:px-8 text-gray-900 font-medium">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 5. Export Logistics */}
            <div className="bg-[#14532D] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden sticky top-24">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3">
                  <Anchor className="text-[#C8A14A]" /> Logistics & Shipping
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-white/10 p-3 rounded-xl h-fit">
                      <PackageOpen className="w-5 h-5 text-[#C8A14A]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Packaging</h4>
                      <p className="text-white/70 text-sm">Export standard corrugated boxes, mesh bags, or bulk packaging tailored to product requirements.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-white/10 p-3 rounded-xl h-fit">
                      <Ship className="w-5 h-5 text-[#C8A14A]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Incoterms</h4>
                      <p className="text-white/70 text-sm">FOB, CFR, CIF, and DDP terms available for major global ports.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-white/10 p-3 rounded-xl h-fit">
                      <Clock className="w-5 h-5 text-[#C8A14A]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Lead Time</h4>
                      <p className="text-white/70 text-sm">7-15 days from order confirmation to port departure.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-white/10 p-3 rounded-xl h-fit">
                      <Factory className="w-5 h-5 text-[#C8A14A]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Processing</h4>
                      <p className="text-white/70 text-sm">Automated sortex, waxing (if applicable), and cold-room pre-cooling prior to stuffing.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link href="/contact-us/request-import-quote" className="w-full py-4 bg-[#C8A14A] text-white font-medium rounded-xl hover:bg-[#B08D3F] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#C8A14A]/20">
                    Get Logistics Quote
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 7. Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-6 md:px-12 py-20 mt-10 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h4 className="text-[#C8A14A] font-semibold uppercase tracking-widest text-sm mb-3">More from this category</h4>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A]">Related Products</h2>
            </div>
            <Link href={`/products/${categoryId}`} className="text-[#14532D] font-medium hover:text-[#C8A14A] transition-colors flex items-center gap-2">
              View All {categoryData.name} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p, i) => (
              <Link 
                key={i}
                href={`/products/${categoryId}/${p.slug}`}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="relative h-[200px] bg-gray-50 overflow-hidden">
                  <Image 
                    src={p.img} 
                    alt={p.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A] group-hover:text-[#14532D] transition-colors mb-2">{p.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Globe className="w-3.5 h-3.5 mr-1" /> Origin: {p.origin}
                  </div>
                  <div className="text-[#C8A14A] text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Details <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 8. CTA Section */}
      <section className="container mx-auto px-6 md:px-12 py-12">
        <div className="bg-[#0A1A11] rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#14532D] rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#C8A14A] rounded-full blur-3xl opacity-20" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Ready to import <span className="text-[#C8A14A]">{product.name}</span>?
            </h2>
            <p className="text-lg text-gray-300 mb-10 font-light">
              Connect with our international trade specialists today to discuss bulk pricing, custom packaging, and freight arrangements tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact-us/request-import-quote" className="w-full sm:w-auto px-10 py-4 bg-[#C8A14A] text-white font-medium rounded-full hover:bg-[#B08D3F] transition-all shadow-[0_0_20px_rgba(200,161,74,0.4)]">
                Request a Quote
              </Link>
              <Link href="/contact-us" className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/10 border border-white/10 transition-all">
                Contact Sales Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

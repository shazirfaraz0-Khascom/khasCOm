import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Leaf, ShieldCheck, Ship, Clock, ArrowRight } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

// Master product catalogue. Kept in code so the marketing pages render without a
// seeded database; the Prisma catalogue mirrors the same slugs.
export const CATEGORY_DATA = {
  "fresh-fruits": {
    name: "Fresh Fruits",
    description: "Premium seasonal and exotic Pakistani fruits, hand-picked and pre-cooled for global export.",
    image: "/images/unsplash-1611080626919-7cf5a9dbab5b.webp",
    stats: [
      { n: "12+", l: "Varieties" },
      { n: "100%", l: "Farm Sourced" },
      { n: "24h", l: "Farm to Port" },
      { n: "A", l: "Export Grade" },
    ],
    products: [
      { id: 1, slug: "premium-valencia-orange", name: "Premium Valencia Orange", origin: "Pakistan", minOrder: "1x20ft Container", img: "/images/unsplash-1611080626919-7cf5a9dbab5b.webp" },
      { id: 2, slug: "chaunsa-mango", name: "Chaunsa Mango", origin: "Pakistan", minOrder: "5 Tons (Air Freight)", img: "/images/premium_chaunsa_mango.png" },
      { id: 3, slug: "fuji-apples", name: "Fuji Apples", origin: "Pakistan", minOrder: "1x40ft Reefer", img: "/images/premium_fuji_apples.png" },
    ]
  },
  "fresh-vegetables": {
    name: "Fresh Vegetables",
    description: "Farm-fresh Pakistani vegetables \u2014 including tinda, loki and arvi \u2014 sorted and packed under strict quality controls.",
    image: "/images/unsplash-1464226184884-fa280b87c399.webp",
    stats: [
      { n: "20+", l: "Types" },
      { n: "100%", l: "Hand Sorted" },
      { n: "12h", l: "Harvest to Cold-Chain" },
      { n: "A", l: "Export Grade" },
    ],
    products: [
      { id: 4, slug: "red-onions", name: "Red Onions", origin: "Pakistan", minOrder: "1x40ft Reefer", img: "/images/unsplash-1618512496248-a07fe83aa8cb.webp" },
      { id: 5, slug: "premium-potatoes", name: "Premium Potatoes", origin: "Pakistan", minOrder: "1x20ft Container", img: "/images/unsplash-1518977676601-b53f82aba655.webp" },
      { id: 13, slug: "tinda-apple-gourd", name: "Tinda (Apple Gourd)", origin: "Pakistan", minOrder: "1x40ft Reefer", img: "/images/tinda-apple-gourd.webp" },
      { id: 14, slug: "loki-bottle-gourd", name: "Loki (Bottle Gourd)", origin: "Pakistan", minOrder: "1x40ft Reefer", img: "/images/loki-bottle-gourd.webp" },
      { id: 15, slug: "arvi-taro-root", name: "Arvi (Taro Root)", origin: "Pakistan", minOrder: "1x20ft Container", img: "/images/arvi-taro-root.webp" },
    ]
  },
  "himalayan-salt": {
    name: "Himalayan Pink Salt",
    description: "Hand-mined pink rock salt from the Khewra range in Punjab, supplied in food, industrial and d\u00e9cor grades.",
    image: "/images/pink-salt-banner.webp",
    stats: [
      { n: "84+", l: "Trace Minerals" },
      { n: "0%", l: "Additives" },
      { n: "25MT", l: "Per 20ft Container" },
      { n: "AA", l: "Food Grade" },
    ],
    products: [
      { id: 16, slug: "himalayan-pink-salt-crystals", name: "Himalayan Pink Salt Rock Crystals", origin: "Pakistan (Khewra)", minOrder: "1x20ft Container (25\u201328 MT)", img: "/images/pink-salt-real.webp" },
      { id: 17, slug: "himalayan-pink-salt-fine", name: "Himalayan Pink Salt \u2014 Fine Ground", origin: "Pakistan (Khewra)", minOrder: "1x20ft Container (25\u201328 MT)", img: "/images/pink-salt-fine.webp" },
    ]
  },
  "dates": {
    name: "Dates",
    description: "Sun-ripened Pakistani dates from the Khairpur and Sindh belts, available fresh, semi-dry and dried.",
    image: "/images/dates-orchard.webp",
    stats: [
      { n: "3", l: "Grades" },
      { n: "18\u201320MT", l: "Per 20ft Container" },
      { n: "12mo", l: "Shelf Life" },
      { n: "A", l: "Export Grade" },
    ],
    products: [
      { id: 18, slug: "aseel-dates", name: "Aseel Dates (Khairpur)", origin: "Pakistan", minOrder: "1x20ft Container (18\u201320 MT)", img: "/images/dates-aseel.webp" },
      { id: 19, slug: "ajwa-dates", name: "Ajwa Dates", origin: "Pakistan", minOrder: "5 Tons", img: "/images/dates-ajwa.webp" },
      { id: 20, slug: "dry-dates-chuara", name: "Dry Dates (Chuara)", origin: "Pakistan", minOrder: "1x20ft Container (18\u201320 MT)", img: "/images/dates-chuara.webp" },
    ]
  },
  "seeds-oilseeds": {
    name: "Sesame Seeds & Oilseeds",
    description: "Sortex-cleaned sesame seeds in natural, hulled and black varieties, prepared to buyer purity specifications.",
    image: "/images/sesame-seeds-white.webp",
    stats: [
      { n: "99.95%", l: "Purity Available" },
      { n: "100%", l: "Sortex Cleaned" },
      { n: "18MT", l: "Per 20ft Container" },
      { n: "AA", l: "Food Grade" },
    ],
    products: [
      { id: 21, slug: "natural-white-sesame-seeds", name: "Natural White Sesame Seeds", origin: "Pakistan", minOrder: "1x20ft Container (18 MT)", img: "/images/sesame-seeds-white.webp" },
      { id: 22, slug: "hulled-sesame-seeds", name: "Hulled Sesame Seeds", origin: "Pakistan", minOrder: "1x20ft Container (18 MT)", img: "/images/sesame-seeds-hulled.webp" },
      { id: 23, slug: "black-sesame-seeds", name: "Black Sesame Seeds", origin: "Pakistan", minOrder: "10 Tons", img: "/images/sesame-seeds-black.webp" },
    ]
  },
  "dry-fruits": {
    name: "Dry Fruits & Nuts",
    description: "High-quality nuts and dried fruits sourced from the northern orchards of Pakistan.",
    image: "/images/unsplash-1508061253366-f7da158b6d46.webp",
    stats: [
      { n: "15+", l: "Selections" },
      { n: "1Yr", l: "Shelf Life" },
      { n: "0%", l: "Additives" },
      { n: "AA", l: "Premium Quality" },
    ],
    products: [
      { id: 6, slug: "organic-almonds", name: "Premium Almonds", origin: "Pakistan", minOrder: "5 Tons", img: "/images/organic-almonds.jpg" },
      { id: 7, slug: "premium-walnuts", name: "Premium Walnuts", origin: "Pakistan", minOrder: "3 Tons", img: "/images/premium-walnuts.jpg" },
      { id: 8, slug: "dried-apricots", name: "Dried Apricots", origin: "Pakistan", minOrder: "5 Tons", img: "/images/dried-apricots.jpg" },
    ]
  },
  "grains": {
    name: "Grains & Staples",
    description: "Essential grains and daily staples processed in state-of-the-art facilities.",
    image: "/images/unsplash-1586201375761-83865001e31c.webp",
    stats: [
      { n: "10+", l: "Varieties" },
      { n: "100%", l: "Sortex Cleaned" },
      { n: "25kg", l: "Custom Packing" },
      { n: "ISO", l: "Certified" },
    ],
    products: [
      { id: 9, slug: "1121-basmati-rice", name: "1121 Basmati Rice", origin: "Pakistan", minOrder: "1x20ft Container", img: "/images/unsplash-1586201375761-83865001e31c.webp" },
      { id: 10, slug: "premium-wheat", name: "Premium Wheat", origin: "Pakistan", minOrder: "1x20ft Container", img: "/images/unsplash-1574323347407-f5e1ad6d020b.webp" },
    ]
  },
  "poultry": {
    name: "Poultry Products",
    description: "Fresh and frozen poultry items adhering to strict Halal and safety standards.",
    image: "/images/unsplash-1604503468506-a8da13d82791.webp",
    stats: [
      { n: "100%", l: "Halal Certified" },
      { n: "-18\u00b0C", l: "Cold Storage" },
      { n: "HACCP", l: "Compliant" },
      { n: "A", l: "Grade" },
    ],
    products: [
      { id: 11, slug: "frozen-whole-chicken", name: "Frozen Whole Chicken", origin: "Pakistan", minOrder: "1x40ft Reefer", img: "/images/frozen_whole_chicken.png" },
      { id: 12, slug: "chicken-breast", name: "Chicken Breast", origin: "Pakistan", minOrder: "10 Tons", img: "/images/unsplash-1604503468506-a8da13d82791.webp" },
    ]
  }
};

type CategoryKey = keyof typeof CATEGORY_DATA;

export async function generateStaticParams() {
  return Object.keys(CATEGORY_DATA).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.category as CategoryKey;
  const data = CATEGORY_DATA[categoryId];

  if (!data) {
    return constructMetadata({ title: 'Category Not Found' });
  }

  return constructMetadata({
    title: `${data.name} | Premium Export`,
    description: data.description,
    path: `/products/${categoryId}`,
    image: data.image,
    keywords: [`${data.name} exporter Pakistan`, `wholesale ${data.name.toLowerCase()}`],
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.category as CategoryKey;
  const data = CATEGORY_DATA[categoryId];

  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAF8] overflow-x-hidden selection:bg-[#14532D] selection:text-white pb-20">
      {/* 1. Homepage-style hero banner */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0A1A11]">
        <div className="absolute inset-0 z-0">
          <Image
            src={data.image}
            alt={data.name}
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A11]/90 via-[#0A1A11]/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20 w-full">
          <div className="flex flex-col justify-center max-w-2xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <span className="text-[#C8A14A]">{data.name}</span>
            </nav>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              {data.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 font-light max-w-xl">
              {data.description}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Statistics cards */}
      <section className="container mx-auto px-6 md:px-12 relative z-20 -mt-16 mb-16">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-50">
            {data.stats.map((stat, i) => (
              <div key={i} className={i === 0 ? "" : "pl-8"}>
                <div className="text-3xl md:text-4xl font-serif font-bold text-[#14532D] mb-2">{stat.n}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product grid */}
      <section className="container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h4 className="text-[#C8A14A] font-semibold uppercase tracking-widest text-sm mb-4">Export Catalogue</h4>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A]">Available Products</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.products.map((p, i) => (
            <Link 
              key={i}
              href={`/products/${categoryId}/${p.slug}`}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(20,83,45,0.08)] transition-all duration-300 group flex flex-col h-full cursor-pointer"
            >
              <div className="relative h-[240px] bg-gray-50 overflow-hidden">
                <Image 
                  src={p.img} 
                  alt={p.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#14532D] shadow-sm">
                  Origin: {p.origin}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#14532D] transition-colors mb-4">{p.name}</h3>
                
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-end items-center">
                  <div className="w-10 h-10 rounded-full bg-[#14532D]/5 flex items-center justify-center text-[#14532D] group-hover:bg-[#14532D] group-hover:text-white transition-colors cursor-pointer">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Assurance features */}
      <section className="container mx-auto px-6 md:px-12 py-12 mt-8">
        <div className="bg-[#14532D] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          <div className="relative z-10 grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-[#C8A14A]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg mb-2">Quality Assured</h4>
                <p className="text-white/80 text-sm leading-relaxed">Every shipment undergoes strict quality control and phytosanitary inspections before departure.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <Ship className="w-6 h-6 text-[#C8A14A]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg mb-2">Global Shipping</h4>
                <p className="text-white/80 text-sm leading-relaxed">Efficient logistics network supporting FOB, CIF, and DDP terms for seamless delivery to your port.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-[#C8A14A]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg mb-2">Timely Delivery</h4>
                <p className="text-white/80 text-sm leading-relaxed">Optimized cold-chain operations ensure maximum freshness upon arrival at destination.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

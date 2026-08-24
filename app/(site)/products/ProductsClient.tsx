"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, ArrowRight, PackageOpen, Award } from "lucide-react";

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function ProductsClient({ categories }: { categories: any[] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAF8] overflow-x-hidden selection:bg-[#14532D] selection:text-white pb-20">
      {/* Hero Banner */}
      <section ref={ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0A1A11]">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Image
            src="/images/unsplash-1610832958506-aa56368176cf.webp"
            alt="The full KhasCom range of export-grade Pakistani commodities"
            fill
            priority
            className="object-cover opacity-50 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A11]/90 via-[#0A1A11]/60 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20 w-full text-center">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 text-sm font-medium text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-[#C8A14A]">Products</span>
          </motion.nav>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto">
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Our Export <span className="text-[#C8A14A] italic">Categories</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light">
              Discover our comprehensive range of premium agricultural and food products, sourced from the finest farms and processed to global export standards.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid - Premium Home-style Cards */}
      <section className="container mx-auto px-6 md:px-12 py-20 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl hover:shadow-2xl hover:shadow-[#14532D]/20 cursor-pointer block"
            >
              <Link href={`/products/${cat.slug}`} className="absolute inset-0 z-20">
                <span className="sr-only">View {cat.name}</span>
              </Link>
              
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              
              {/* Premium Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A11] via-[#0A1A11]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500 z-10">
                {/* Stats row appearing on hover */}
                <div className="flex items-center gap-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5 flex items-center gap-2 border border-white/20">
                    <PackageOpen className="w-4 h-4 text-[#C8A14A]" />
                    <span className="text-white text-xs font-semibold">{cat.products.length} Items</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5 flex items-center gap-2 border border-white/20">
                    <Award className="w-4 h-4 text-[#C8A14A]" />
                    <span className="text-white text-xs font-semibold">{cat.stats?.[3]?.n || 'Grade A'}</span>
                  </div>
                </div>

                <h2 className="text-3xl font-serif font-bold text-white mb-3">
                  {cat.name}
                </h2>
                
                <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                
                <div className="inline-flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-6 py-3 group-hover:bg-[#C8A14A] group-hover:border-[#C8A14A] transition-colors duration-300 w-fit">
                  <span className="font-semibold text-sm mr-3">Explore Category</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* All Products Grid */}
      <section className="container mx-auto px-6 md:px-12 py-20 border-t border-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#14532D] mb-4">Complete Product Range</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Browse our full catalogue of premium export-grade commodities.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.flatMap(cat => 
            (cat.products || []).map((product: any, idx: number) => (
              <motion.div 
                key={`${cat.slug}-${product.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 8) * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={product.img} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-[#14532D] shadow-sm uppercase tracking-wider">
                    {cat.name}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#C8A14A] transition-colors">{product.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Origin:</span>
                      <span className="font-medium text-gray-900">{product.origin}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">MOQ:</span>
                      <span className="font-medium text-gray-900">{product.minOrder}</span>
                    </div>
                  </div>
                  <Link href={`/products/${cat.slug}/${product.slug}`} className="block w-full text-center py-2.5 rounded-xl bg-gray-50 text-[#14532D] font-semibold text-sm hover:bg-[#14532D] hover:text-white transition-colors border border-gray-100">
                    View Specifications
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 md:px-12 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#14532D] rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Need a custom order?</h2>
            <p className="text-lg text-white/80 mb-10 font-light">
              Don&apos;t see exactly what you&apos;re looking for? We offer custom sourcing and packaging solutions for large-scale international buyers.
            </p>
            <Link href="/contact-us" className="inline-block px-10 py-4 bg-[#C8A14A] text-white font-medium rounded-full hover:bg-[#B08D3F] transition-all shadow-lg hover:shadow-xl hover:shadow-[#C8A14A]/30">
              Contact Our Trade Desk
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Globe, Leaf, CheckCircle2, 
  Clock, Award, Package, Ship, FileText 
} from "lucide-react";

export default function HomeClient({ categories }: { categories: { id: string; slug: string; name: string; description?: string; image?: string }[] }) {


  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAF8] overflow-x-hidden selection:bg-[#14532D] selection:text-white">
      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Countries We Export To */}
      <ExportCountriesBanner />

      {/* 4. About KhasCom */}
      <AboutSection />

      {/* 5. Product Categories */}
      <CategoriesSection categories={categories} />

      {/* 6. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 7. Export Process Timeline */}
      <ExportProcess />

      {/* 8. Quality Assurance */}
      <QualityAssurance />

      {/* 9. Featured Products */}
      <FeaturedProducts />

      {/* 10. Export Countries Map */}
      <ExportMap />

      {/* 10.5 Global Logistics */}
      <GlobalLogistics />

      {/* 11. Sustainability */}
      <Sustainability />

      {/* 12. Testimonials */}
      <Testimonials />

      {/* 13. Latest Articles */}
      <LatestArticles />

      {/* 14. CTA Banner */}
      <CTABanner />
    </div>
  );
}

// Reusable fade-in animation variants
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

/* --- SECTION COMPONENTS --- */

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0A1A11]">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <Image
          src="/images/unsplash-1578575437130-527eed3abbec.webp"
          alt="Container vessel loading KhasCom commodity shipments for international export"
          fill
          priority
          className="object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A11]/70 via-[#0A1A11]/25 to-transparent" />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 pt-20">
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="flex flex-col justify-center max-w-2xl"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
            {['Made in Pakistan', 'Export Quality', 'Global Shipping', 'Farm to Container'].map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A14A]" />
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Pakistani Commodities <span className="text-[#C8A14A] italic">Exported Worldwide</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 font-light max-w-xl">
            A Pakistani export and import group supplying international buyers with fresh fruits and vegetables, Himalayan pink salt, dates, sesame seeds and grains &mdash; direct from source to your port.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5">
            <Link href="/contact-us/request-import-quote" className="inline-flex items-center justify-center rounded-full bg-[#C8A14A] px-8 py-4 text-base font-semibold text-white shadow-[0_8px_30px_rgba(200,161,74,0.3)] hover:bg-[#b08d3f] hover:-translate-y-1 transition-all duration-300">
              Request Catalogue
            </Link>
            <Link href="/products" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-md px-8 py-4 text-base font-semibold text-white hover:bg-white hover:text-[#14532D] hover:-translate-y-1 transition-all duration-300">
              Explore Products
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Cards Right Side */}
        <div className="hidden lg:flex relative h-[600px] items-center justify-center">
          <div className="absolute inset-0 bg-[url('/images/wiki-World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain opacity-60 filter invert" />
          
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute top-[10%] left-[10%] w-48 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl"
          >
            <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3">
              <Image src="/images/unsplash-1611080626919-7cf5a9dbab5b.webp" alt="Premium Pakistani citrus" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="text-white font-serif font-medium">Premium Citrus</div>
            <div className="text-gray-400 text-xs mt-1">Kinnow &amp; Valencia</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute top-[40%] right-[5%] w-56 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl z-20"
          >
            <div className="relative h-36 w-full rounded-xl overflow-hidden mb-3">
              <Image src="/images/unsplash-1586201375761-83865001e31c.webp" alt="Rice" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="text-white font-serif font-medium">1121 Basmati Rice</div>
            <div className="text-[#C8A14A] text-xs mt-1 font-semibold flex items-center gap-1"><Globe className="w-3 h-3"/> Global Supply</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -50, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-[10%] left-[20%] w-52 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl z-10"
          >
            <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3">
              <Image src="/images/pink-salt-real.webp" alt="Pink Salt" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="text-white font-serif font-medium">Himalayan Pink Salt</div>
            <div className="text-gray-400 text-xs mt-1">100% Pure</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExportCountriesBanner() {
  const flags = [
    { name: "USA", code: "us" },
    { name: "Canada", code: "ca" },
    { name: "UK", code: "gb" },
    { name: "Germany", code: "de" },
    { name: "France", code: "fr" },
    { name: "Saudi Arabia", code: "sa" },
    { name: "UAE", code: "ae" },
    { name: "Qatar", code: "qa" },
    { name: "Australia", code: "au" }
  ];
  return (
    <div className="border-y border-gray-200 bg-gray-50/50 py-10 overflow-hidden flex flex-col items-center">
      <div className="container mx-auto px-6 mb-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-500">Trusted by Importers In</p>
      </div>
      <div className="relative w-full flex overflow-hidden group">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .group:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}} />
        <div className="flex w-max animate-marquee transition-all duration-500">
          <div className="flex w-max items-center justify-around gap-16 md:gap-32 px-8 md:px-16">
            {flags.map((country, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center w-14 h-10 md:w-20 md:h-14 relative rounded overflow-hidden shadow-sm border border-gray-200 bg-white hover:scale-110 hover:shadow-md transition-transform duration-300"
                title={country.name}
              >
                <img src={`https://flagcdn.com/w160/${country.code}.png`} alt={country.name} className="object-cover w-full h-full" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="flex w-max items-center justify-around gap-16 md:gap-32 px-8 md:px-16">
            {flags.map((country, idx) => (
              <div 
                key={"clone-" + idx} 
                className="flex items-center justify-center w-14 h-10 md:w-20 md:h-14 relative rounded overflow-hidden shadow-sm border border-gray-200 bg-white hover:scale-110 hover:shadow-md transition-transform duration-300"
                title={country.name}
              >
                <img src={`/images/flags/${country.code}.webp`} alt={country.name} className="object-cover w-full h-full" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-[#F8FAF8]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-[0_20px_50px_rgba(20,83,45,0.1)]">
              <Image src="/images/unsplash-1464226184884-fa280b87c399.webp" alt="Organic Farm" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
            
            {/* Stats Glass Card */}
            <div className="absolute -bottom-10 -right-10 lg:right-[-10%] bg-white/80 backdrop-blur-2xl border border-white p-8 rounded-3xl shadow-2xl grid grid-cols-2 gap-8 w-[110%] sm:w-[90%] md:w-[80%] max-w-md">
              {[
                { n: "15+", l: "Years Experience" },
                { n: "35+", l: "Countries" },
                { n: "200+", l: "Products" },
                { n: "1000+", l: "Containers Exported" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-serif font-bold text-[#14532D] mb-1">{stat.n}</div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">{stat.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pl-10 mt-16 lg:mt-0"
          >
            <h4 className="text-[#C8A14A] font-semibold uppercase tracking-widest text-sm mb-4">About KhasCom</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-8 leading-tight">
              Rooted in Pakistan, <br />Delivered to the World.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              KhasCom is a Pakistani commodities export and import group. We source directly from growers, mines and processors across Punjab, Sindh and the northern belt &mdash; then handle grading, packing, documentation and freight so international buyers deal with one accountable partner from farm gate to final port.
            </p>
            <div className="space-y-4 mb-10">
              {["Direct Grower & Mine Sourcing", "End-to-End Cold Chain Logistics", "Stringent Quality Control Measures", "Dedicated B2B Trade Support"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#14532D]/10 flex items-center justify-center text-[#14532D]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[#1A1A1A] font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/about-us" className="inline-flex items-center gap-2 text-[#14532D] font-semibold hover:text-[#C8A14A] transition-colors group">
              Discover Our Story 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection({ categories }: { categories: { id: string; slug: string; name: string; description?: string; image?: string }[] }) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-[#C8A14A] font-semibold uppercase tracking-widest text-sm mb-4">Product Portfolio</h4>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-6">Premium Export Categories</h2>
          <p className="text-gray-600 text-lg">Browse our export-ready commodity range, meticulously sourced across Pakistan and packaged for international transit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(0, 6).map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer"
            >
              <Image 
                src={cat.image || `/images/unsplash-${i % 2 === 0 ? '1610832958506-aa56368176cf' : '1550989460-0adf9ea622e2'}.webp`}
                alt={cat.name} 
                fill sizes="(max-width: 768px) 100vw, 50vw" 
                className="object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                  {cat.description || "Export-grade Pakistani commodities, sourced direct and packed to international standards."}
                </p>
                <Link href={`/products/${cat.slug}`} className="inline-flex items-center justify-between bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full px-6 py-3 hover:bg-white hover:text-[#14532D] transition-colors">
                  <span className="font-semibold text-sm">Explore Category</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  const reasons = [
    { title: "Direct From Source", icon: Leaf, desc: "Contracted growers, orchards and Khewra-range mines — no middlemen in the chain." },
    { title: "DDP Shipping", icon: Ship, desc: "Delivered Duty Paid options available for frictionless border clearance." },
    { title: "Worldwide Export", icon: Globe, desc: "Strong logistics network reaching over 35 countries globally." },
    { title: "Premium Quality", icon: Award, desc: "Unmatched quality standards with thorough multi-stage inspection." },
    { title: "Secure Packaging", icon: Package, desc: "Customized export packaging that preserves freshness and prevents damage." },
    { title: "Laboratory Tested", icon: ShieldCheck, desc: "Every batch is lab-tested for pesticides and contaminants before shipping." },
    { title: "Complete Documentation", icon: FileText, desc: "Flawless export documentation, including phytosanitary certificates." },
    { title: "On-Time Delivery", icon: Clock, desc: "Optimized supply chain operations ensuring timely arrivals." },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#14532D] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-[#C8A14A] font-semibold uppercase tracking-widest text-sm mb-4">The KhasCom Advantage</h4>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Why Choose Us</h2>
          <p className="text-green-100 text-lg">We don&apos;t just export commodities; we export trust, quality, and reliability. Partner with us for a seamless global trade experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 border border-white/10 hover:border-[#C8A14A]/50 rounded-2xl p-8 hover:bg-white/10 transition-colors group"
            >
              <reason.icon className="w-10 h-10 text-[#C8A14A] mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <h3 className="text-xl font-serif font-bold mb-3">{reason.title}</h3>
              <p className="text-green-100/80 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExportProcess() {
  const steps = [
    { title: "Farm Selection", img: "/images/unsplash-1625246333195-78d9c38ad449.webp" },
    { title: "Quality Inspection", img: "/images/unsplash-1581091226825-a6a2a5aee158.webp" },
    { title: "Sorting & Packaging", img: "/images/unsplash-1587293852726-70cdb56c2866.webp" },
    { title: "Documentation", img: "/images/unsplash-1554224155-8d04cb21cd6c.webp" },
    { title: "Container Loading", img: "/images/unsplash-1494412574643-ff11b0a5c1c3.webp" },
    { title: "Int. Shipping", img: "/images/unsplash-1601584115197-04ecc0da31d7.webp" },
    { title: "Custom Clearance", img: "/images/unsplash-1454165804606-c3d57bc86b40.webp" },
    { title: "Delivery", img: "/images/unsplash-cargo-plane.webp" }
  ];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-[#C8A14A] font-semibold uppercase tracking-widest text-sm mb-4">Export Process</h4>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-6">Our Timeline to Your Door</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg h-64 border border-gray-100"
            >
              <Image src={step.img} alt={step.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <div className="w-10 h-10 rounded-full bg-[#C8A14A] text-white flex items-center justify-center font-bold mb-3 shadow-lg">
                  {i + 1}
                </div>
                <h3 className="text-white font-serif text-xl font-bold">{step.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QualityAssurance() {
  return (
    <section className="py-24 md:py-32 bg-[#F8FAF8]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="col-span-2 relative h-64 rounded-3xl overflow-hidden shadow-xl">
              <Image src="/images/premium_shipping_port.png" alt="Global Port Operations" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <span className="text-white font-serif text-xl font-bold">Global Port Logistics</span>
              </div>
            </div>
            <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg bg-white flex items-center justify-center p-6 border border-gray-100">
              <div className="text-center">
                <ShieldCheck className="w-10 h-10 text-[#14532D] mx-auto mb-2" />
                <div className="font-bold text-[#1A1A1A]">HACCP Certified</div>
              </div>
            </div>
            <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg bg-white flex items-center justify-center p-6 border border-gray-100">
              <div className="text-center">
                <Award className="w-10 h-10 text-[#14532D] mx-auto mb-2" />
                <div className="font-bold text-[#1A1A1A]">Global GAP</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#C8A14A] font-semibold uppercase tracking-widest text-sm mb-4">Quality Assurance</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-8 leading-tight">
              Uncompromising Standards at Every Step
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              We employ a zero-tolerance policy for subpar consignments. Every shipment undergoes rigorous ISO, HACCP and FDA compliant inspection to guarantee purity, size, grade and moisture before it is sealed.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { n: "99%", l: "Quality Inspection Pass Rate" },
                { n: "100%", l: "Farm-to-Port Traceability" },
                { n: "24/7", l: "Cold Chain Monitoring" }
              ].map((m, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-[#14532D]">
                  <div className="text-3xl font-serif font-bold text-[#14532D] mb-2">{m.n}</div>
                  <div className="text-xs font-semibold uppercase text-gray-500">{m.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const products = [
    { name: "Himalayan Pink Salt", origin: "Pakistan", moq: "1x20ft Container", href: "/products/himalayan-salt/himalayan-pink-salt-crystals", img: "/images/pink-salt-real.webp" },
    { name: "Aseel Dates", origin: "Pakistan", moq: "1x20ft Container", href: "/products/dates/aseel-dates", img: "/images/dates-aseel.webp" },
    { name: "Natural White Sesame Seeds", origin: "Pakistan", moq: "1x20ft Container", href: "/products/seeds-oilseeds/natural-white-sesame-seeds", img: "/images/sesame-seeds-white.webp" },
    { name: "Apple Gourd", origin: "Pakistan", moq: "1x40ft Reefer", href: "/products/fresh-vegetables/tinda-apple-gourd", img: "/images/tinda-apple-gourd.webp" },
    { name: "Red Dry Chilli", origin: "Pakistan", moq: "1x20ft Container", href: "/products/spices-aromatics/red-dry-chilli", img: "/images/red-dry-chilli.webp" },
    { name: "Bottle Gourd", origin: "Pakistan", moq: "1x40ft Reefer", href: "/products/fresh-vegetables/loki-bottle-gourd", img: "/images/loki-bottle-gourd.webp" },
    { name: "Taro Root", origin: "Pakistan", moq: "1x20ft Container", href: "/products/fresh-vegetables/arvi-taro-root", img: "/images/arvi-taro-root.webp" },
    { name: "Chaunsa Mango", origin: "Pakistan", moq: "5 Tons (Air Freight)", href: "/products/fresh-fruits/chaunsa-mango", img: "/images/premium_chaunsa_mango.png" },
    { name: "1121 Basmati Rice", origin: "Pakistan", moq: "1x20ft Container", href: "/products/grains/1121-basmati-rice", img: "/images/unsplash-1586201375761-83865001e31c.webp" },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h4 className="text-[#C8A14A] font-semibold uppercase tracking-widest text-sm mb-4">Export Highlights</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A]">Featured Commodities</h2>
          </div>
          <Link href="/products" className="text-[#14532D] font-semibold border-b-2 border-[#14532D] pb-1 hover:text-[#C8A14A] hover:border-[#C8A14A] transition-colors">
            View All Products
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-8 pb-12 hide-scrollbar snap-x px-4 -mx-4">
          {products.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-[300px] md:w-[380px] snap-start group"
            >
              <div className="relative h-[280px] rounded-3xl overflow-hidden mb-6 bg-gray-100">
                <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#14532D]">
                  Origin: {p.origin}
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-3">{p.name}</h3>
              <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                <span className="text-sm text-gray-500">MOQ: {p.moq}</span>
                <Link href={p.href} aria-label={`View ${p.name}`} className="w-10 h-10 rounded-full bg-[#F8FAF8] flex items-center justify-center text-[#14532D] group-hover:bg-[#14532D] group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExportMap() {
  return (
    <section className="py-24 md:py-32 bg-[#0A1A11] text-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center mb-16">
        <h4 className="text-[#C8A14A] font-semibold uppercase tracking-widest text-sm mb-4">Global Network</h4>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Export Destinations</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Operating a robust logistics network from Karachi and Port Qasim to major ports across North America, Europe, the Gulf and East Asia.</p>
      </div>

      <div className="relative max-w-5xl mx-auto h-[400px] md:h-[600px]">
        {/* Placeholder for interactive map visualization */}
        <div className="absolute inset-0 bg-[url('/images/wiki-World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain opacity-30 filter invert" />
        
        {/* Animated routes effect */}
                <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 0 12px rgba(200,161,74,0.5))" }} preserveAspectRatio="xMidYMid meet">
          
          {/* Base mesh (lower opacity, static or slow dashed) */}
          <g stroke="#C8A14A" strokeWidth="0.8" fill="transparent" opacity="0.4" className="animate-[dash_40s_linear_infinite]" strokeDasharray="3,3">
                        <path d="M 620 246 Q 608.0 236.0 596 266" />
            <path d="M 620 246 Q 550.0 187.0 480 168" />
            <path d="M 620 246 Q 550.0 196.0 480 186" />
            <path d="M 620 246 Q 560.0 190.0 500 174" />
            <path d="M 620 246 Q 540.0 203.0 460 200" />
            <path d="M 620 246 Q 565.0 203.0 510 200" />
            <path d="M 620 246 Q 570.0 163.0 520 120" />
            <path d="M 620 246 Q 590.0 173.0 560 140" />
            <path d="M 620 246 Q 585.0 228.0 550 250" />
            <path d="M 620 246 Q 585.0 283.0 550 360" />
            <path d="M 620 246 Q 550.0 263.0 480 320" />
            <path d="M 620 246 Q 535.0 218.0 450 230" />
            <path d="M 620 246 Q 600.0 232.0 580 258" />
            <path d="M 620 246 Q 580.0 208.0 540 210" />
            <path d="M 620 246 Q 635.0 233.0 650 260" />
            <path d="M 620 246 Q 640.0 253.0 660 300" />
            <path d="M 620 246 Q 685.0 203.0 750 200" />
            <path d="M 620 246 Q 710.0 203.0 800 200" />
            <path d="M 620 246 Q 685.0 263.0 750 320" />
            <path d="M 620 246 Q 670.0 243.0 720 280" />
            <path d="M 620 246 Q 700.0 248.0 780 290" />
            <path d="M 596 266 Q 538.0 197.0 480 168" />
            <path d="M 596 266 Q 538.0 206.0 480 186" />
            <path d="M 596 266 Q 548.0 200.0 500 174" />
            <path d="M 596 266 Q 528.0 213.0 460 200" />
            <path d="M 596 266 Q 553.0 213.0 510 200" />
            <path d="M 596 266 Q 558.0 173.0 520 120" />
            <path d="M 596 266 Q 578.0 183.0 560 140" />
            <path d="M 596 266 Q 573.0 238.0 550 250" />
            <path d="M 596 266 Q 573.0 293.0 550 360" />
            <path d="M 596 266 Q 563.0 338.0 530 450" />
            <path d="M 596 266 Q 538.0 273.0 480 320" />
            <path d="M 596 266 Q 523.0 228.0 450 230" />
            <path d="M 596 266 Q 588.0 242.0 580 258" />
            <path d="M 596 266 Q 568.0 218.0 540 210" />
            <path d="M 596 266 Q 623.0 243.0 650 260" />
            <path d="M 596 266 Q 628.0 263.0 660 300" />
            <path d="M 596 266 Q 673.0 213.0 750 200" />
            <path d="M 596 266 Q 673.0 273.0 750 320" />
            <path d="M 596 266 Q 658.0 253.0 720 280" />
            <path d="M 596 266 Q 688.0 258.0 780 290" />
            <path d="M 180 198 Q 150.0 169.0 120 180" />
            <path d="M 180 198 Q 190.0 154.0 200 150" />
            <path d="M 180 198 Q 170.0 199.0 160 240" />
            <path d="M 180 198 Q 220.0 239.0 260 320" />
            <path d="M 120 180 Q 160.0 145.0 200 150" />
            <path d="M 120 180 Q 140.0 190.0 160 240" />
            <path d="M 120 180 Q 190.0 230.0 260 320" />
            <path d="M 200 150 Q 180.0 175.0 160 240" />
            <path d="M 200 150 Q 230.0 215.0 260 320" />
            <path d="M 160 240 Q 210.0 260.0 260 320" />
            <path d="M 300 390 Q 290.0 415.0 280 480" />
            <path d="M 300 390 Q 275.0 400.0 250 450" />
            <path d="M 300 390 Q 280.0 335.0 260 320" />
            <path d="M 300 390 Q 390.0 335.0 480 320" />
            <path d="M 280 480 Q 265.0 445.0 250 450" />
            <path d="M 280 480 Q 270.0 380.0 260 320" />
            <path d="M 250 450 Q 255.0 365.0 260 320" />
            <path d="M 480 168 Q 480.0 157.0 480 186" />
            <path d="M 480 168 Q 490.0 151.0 500 174" />
            <path d="M 480 168 Q 470.0 164.0 460 200" />
            <path d="M 480 168 Q 495.0 164.0 510 200" />
            <path d="M 480 168 Q 500.0 124.0 520 120" />
            <path d="M 480 168 Q 520.0 134.0 560 140" />
            <path d="M 480 168 Q 515.0 189.0 550 250" />
            <path d="M 480 168 Q 480.0 224.0 480 320" />
            <path d="M 480 168 Q 465.0 179.0 450 230" />
            <path d="M 480 168 Q 530.0 193.0 580 258" />
            <path d="M 480 168 Q 510.0 169.0 540 210" />
            <path d="M 480 168 Q 565.0 194.0 650 260" />
            <path d="M 480 186 Q 490.0 160.0 500 174" />
            <path d="M 480 186 Q 470.0 173.0 460 200" />
            <path d="M 480 186 Q 495.0 173.0 510 200" />
            <path d="M 480 186 Q 500.0 133.0 520 120" />
            <path d="M 480 186 Q 520.0 143.0 560 140" />
            <path d="M 480 186 Q 515.0 198.0 550 250" />
            <path d="M 480 186 Q 515.0 253.0 550 360" />
            <path d="M 480 186 Q 480.0 233.0 480 320" />
            <path d="M 480 186 Q 465.0 188.0 450 230" />
            <path d="M 480 186 Q 530.0 202.0 580 258" />
            <path d="M 480 186 Q 510.0 178.0 540 210" />
            <path d="M 480 186 Q 565.0 203.0 650 260" />
            <path d="M 500 174 Q 480.0 167.0 460 200" />
            <path d="M 500 174 Q 505.0 167.0 510 200" />
            <path d="M 500 174 Q 510.0 127.0 520 120" />
            <path d="M 500 174 Q 530.0 137.0 560 140" />
            <path d="M 500 174 Q 525.0 192.0 550 250" />
            <path d="M 500 174 Q 525.0 247.0 550 360" />
            <path d="M 500 174 Q 490.0 227.0 480 320" />
            <path d="M 500 174 Q 475.0 182.0 450 230" />
            <path d="M 500 174 Q 540.0 196.0 580 258" />
            <path d="M 500 174 Q 520.0 172.0 540 210" />
            <path d="M 500 174 Q 575.0 197.0 650 260" />
            <path d="M 460 200 Q 485.0 180.0 510 200" />
            <path d="M 460 200 Q 490.0 140.0 520 120" />
            <path d="M 460 200 Q 510.0 150.0 560 140" />
            <path d="M 460 200 Q 505.0 205.0 550 250" />
            <path d="M 460 200 Q 505.0 260.0 550 360" />
            <path d="M 460 200 Q 470.0 240.0 480 320" />
            <path d="M 460 200 Q 455.0 195.0 450 230" />
            <path d="M 460 200 Q 520.0 209.0 580 258" />
            <path d="M 460 200 Q 500.0 185.0 540 210" />
            <path d="M 460 200 Q 555.0 210.0 650 260" />
            <path d="M 510 200 Q 515.0 140.0 520 120" />
            <path d="M 510 200 Q 535.0 150.0 560 140" />
            <path d="M 510 200 Q 530.0 205.0 550 250" />
            <path d="M 510 200 Q 530.0 260.0 550 360" />
            <path d="M 510 200 Q 495.0 240.0 480 320" />
            <path d="M 510 200 Q 480.0 195.0 450 230" />
            <path d="M 510 200 Q 545.0 209.0 580 258" />
            <path d="M 510 200 Q 525.0 185.0 540 210" />
            <path d="M 510 200 Q 580.0 210.0 650 260" />
            <path d="M 510 200 Q 585.0 230.0 660 300" />
            <path d="M 520 120 Q 540.0 110.0 560 140" />
            <path d="M 520 120 Q 535.0 165.0 550 250" />
            <path d="M 520 120 Q 485.0 155.0 450 230" />
            <path d="M 520 120 Q 550.0 169.0 580 258" />
            <path d="M 520 120 Q 530.0 145.0 540 210" />
            <path d="M 520 120 Q 585.0 170.0 650 260" />
            <path d="M 560 140 Q 555.0 175.0 550 250" />
            <path d="M 560 140 Q 520.0 210.0 480 320" />
            <path d="M 560 140 Q 505.0 165.0 450 230" />
            <path d="M 560 140 Q 570.0 179.0 580 258" />
            <path d="M 560 140 Q 550.0 155.0 540 210" />
            <path d="M 560 140 Q 605.0 180.0 650 260" />
            <path d="M 560 140 Q 610.0 200.0 660 300" />
            <path d="M 560 140 Q 655.0 150.0 750 200" />
            <path d="M 550 250 Q 550.0 285.0 550 360" />
            <path d="M 550 250 Q 515.0 265.0 480 320" />
            <path d="M 550 250 Q 500.0 220.0 450 230" />
            <path d="M 550 250 Q 565.0 234.0 580 258" />
            <path d="M 550 250 Q 545.0 210.0 540 210" />
            <path d="M 550 250 Q 600.0 235.0 650 260" />
            <path d="M 550 250 Q 605.0 255.0 660 300" />
            <path d="M 550 250 Q 635.0 245.0 720 280" />
            <path d="M 550 360 Q 540.0 385.0 530 450" />
            <path d="M 550 360 Q 515.0 320.0 480 320" />
            <path d="M 550 360 Q 500.0 275.0 450 230" />
            <path d="M 550 360 Q 565.0 289.0 580 258" />
            <path d="M 550 360 Q 545.0 265.0 540 210" />
            <path d="M 550 360 Q 600.0 290.0 650 260" />
            <path d="M 550 360 Q 605.0 310.0 660 300" />
            <path d="M 550 360 Q 635.0 300.0 720 280" />
            <path d="M 530 450 Q 505.0 365.0 480 320" />
            <path d="M 530 450 Q 555.0 334.0 580 258" />
            <path d="M 530 450 Q 595.0 355.0 660 300" />
            <path d="M 480 320 Q 465.0 255.0 450 230" />
            <path d="M 480 320 Q 530.0 269.0 580 258" />
            <path d="M 480 320 Q 510.0 245.0 540 210" />
            <path d="M 480 320 Q 565.0 270.0 650 260" />
            <path d="M 480 320 Q 570.0 290.0 660 300" />
            <path d="M 450 230 Q 515.0 224.0 580 258" />
            <path d="M 450 230 Q 495.0 200.0 540 210" />
            <path d="M 580 258 Q 560.0 214.0 540 210" />
            <path d="M 580 258 Q 615.0 239.0 650 260" />
            <path d="M 580 258 Q 620.0 259.0 660 300" />
            <path d="M 580 258 Q 665.0 209.0 750 200" />
            <path d="M 580 258 Q 665.0 269.0 750 320" />
            <path d="M 580 258 Q 650.0 249.0 720 280" />
            <path d="M 540 210 Q 595.0 215.0 650 260" />
            <path d="M 540 210 Q 600.0 235.0 660 300" />
            <path d="M 540 210 Q 630.0 225.0 720 280" />
            <path d="M 650 260 Q 655.0 260.0 660 300" />
            <path d="M 650 260 Q 700.0 210.0 750 200" />
            <path d="M 650 260 Q 735.0 215.0 820 210" />
            <path d="M 650 260 Q 725.0 210.0 800 200" />
            <path d="M 650 260 Q 700.0 270.0 750 320" />
            <path d="M 650 260 Q 685.0 250.0 720 280" />
            <path d="M 650 260 Q 715.0 255.0 780 290" />
            <path d="M 660 300 Q 705.0 230.0 750 200" />
            <path d="M 660 300 Q 740.0 235.0 820 210" />
            <path d="M 660 300 Q 730.0 230.0 800 200" />
            <path d="M 660 300 Q 705.0 290.0 750 320" />
            <path d="M 660 300 Q 690.0 270.0 720 280" />
            <path d="M 660 300 Q 720.0 275.0 780 290" />
            <path d="M 660 300 Q 720.0 345.0 780 430" />
            <path d="M 750 200 Q 785.0 185.0 820 210" />
            <path d="M 750 200 Q 775.0 180.0 800 200" />
            <path d="M 750 200 Q 750.0 240.0 750 320" />
            <path d="M 750 200 Q 735.0 220.0 720 280" />
            <path d="M 750 200 Q 765.0 225.0 780 290" />
            <path d="M 750 200 Q 775.0 130.0 800 100" />
            <path d="M 820 210 Q 810.0 185.0 800 200" />
            <path d="M 820 210 Q 785.0 245.0 750 320" />
            <path d="M 820 210 Q 770.0 225.0 720 280" />
            <path d="M 820 210 Q 800.0 230.0 780 290" />
            <path d="M 820 210 Q 810.0 135.0 800 100" />
            <path d="M 800 200 Q 775.0 240.0 750 320" />
            <path d="M 800 200 Q 760.0 220.0 720 280" />
            <path d="M 800 200 Q 790.0 225.0 780 290" />
            <path d="M 800 200 Q 800.0 130.0 800 100" />
            <path d="M 750 320 Q 735.0 280.0 720 280" />
            <path d="M 750 320 Q 765.0 285.0 780 290" />
            <path d="M 750 320 Q 800.0 365.0 850 450" />
            <path d="M 750 320 Q 765.0 355.0 780 430" />
            <path d="M 720 280 Q 750.0 265.0 780 290" />
            <path d="M 720 280 Q 750.0 335.0 780 430" />
            <path d="M 720 280 Q 760.0 170.0 800 100" />
            <path d="M 780 290 Q 815.0 350.0 850 450" />
            <path d="M 780 290 Q 780.0 340.0 780 430" />
            <path d="M 780 290 Q 790.0 175.0 800 100" />
            <path d="M 850 450 Q 815.0 420.0 780 430" />
            <path d="M 850 450 Q 875.0 445.0 900 480" />
            <path d="M 780 430 Q 840.0 435.0 900 480" />
          </g>

          {/* Highlighted active routes (higher opacity, faster dashed) */}
          <g stroke="#C8A14A" strokeWidth="2" fill="transparent" strokeDasharray="5,5">
            <path d="M 620 246 Q 400 150 180 198" className="animate-[dash_20s_linear_infinite]" />
            <path d="M 620 246 Q 550 180 480 168" className="animate-[dash_15s_linear_infinite]" />
            <path d="M 620 246 Q 610 255 596 266" className="animate-[dash_8s_linear_infinite]" />
            <path d="M 620 246 Q 580 350 530 450" className="animate-[dash_18s_linear_infinite]" />
            <path d="M 620 246 Q 720 230 820 210" className="animate-[dash_16s_linear_infinite]" />
            <path d="M 620 246 Q 750 350 850 450" className="animate-[dash_18s_linear_infinite]" />
            <path d="M 620 246 Q 685 223 750 200" className="animate-[dash_12s_linear_infinite]" />
            <path d="M 620 246 Q 560 200 500 174" className="animate-[dash_14s_linear_infinite]" />
            <path d="M 596 266 Q 400 200 180 198" className="animate-[dash_22s_linear_infinite]" />
            <path d="M 596 266 Q 400 350 300 390" className="animate-[dash_25s_linear_infinite]" />
            <path d="M 596 266 Q 580 300 550 360" className="animate-[dash_12s_linear_infinite]" />
            <path d="M 596 266 Q 680 280 750 320" className="animate-[dash_16s_linear_infinite]" />
            <path d="M 596 266 Q 530 200 480 168" className="animate-[dash_16s_linear_infinite]" />
            <path d="M 180 198 Q 330 160 480 168" className="animate-[dash_18s_linear_infinite]" />
            <path d="M 120 180 Q 150 189 180 198" className="animate-[dash_10s_linear_infinite]" />
            <path d="M 480 168 Q 490 170 500 174" className="animate-[dash_8s_linear_infinite]" />
            <path d="M 300 390 Q 420 450 530 450" className="animate-[dash_22s_linear_infinite]" />
            <path d="M 530 450 Q 540 400 550 360" className="animate-[dash_14s_linear_infinite]" />
            <path d="M 820 210 Q 830 330 850 450" className="animate-[dash_18s_linear_infinite]" />
            <path d="M 200 150 Q 350 140 500 174" className="animate-[dash_18s_linear_infinite]" />
            <path d="M 750 200 Q 785 205 820 210" className="animate-[dash_10s_linear_infinite]" />
          </g>

          {/* Dots for all cities */}
          <g fill="#C8A14A">
            <circle cx="620" cy="246" r="6" fill="#22C55E" className="animate-pulse shadow-[0_0_20px_#22C55E]"><title>Pakistan</title></circle>
            <circle cx="596" cy="266" r="5" fill="#22C55E" className="animate-pulse shadow-[0_0_15px_#22C55E]"><title>UAE</title></circle>
            <circle cx="180" cy="198" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="180" cy="198" r="3.5" fill="#C8A14A" className="animate-pulse"><title>USA East</title></circle>
            <circle cx="120" cy="180" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="120" cy="180" r="3.5" fill="#C8A14A" className="animate-pulse"><title>USA West</title></circle>
            <circle cx="200" cy="150" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="200" cy="150" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Canada</title></circle>
            <circle cx="160" cy="240" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="160" cy="240" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Mexico</title></circle>
            <circle cx="300" cy="390" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="300" cy="390" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Brazil</title></circle>
            <circle cx="280" cy="480" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="280" cy="480" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Argentina</title></circle>
            <circle cx="250" cy="450" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="250" cy="450" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Chile</title></circle>
            <circle cx="260" cy="320" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="260" cy="320" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Colombia</title></circle>
            <circle cx="480" cy="168" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="480" cy="168" r="3.5" fill="#C8A14A" className="animate-pulse"><title>UK</title></circle>
            <circle cx="480" cy="186" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="480" cy="186" r="3.5" fill="#C8A14A" className="animate-pulse"><title>France</title></circle>
            <circle cx="500" cy="174" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="500" cy="174" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Germany</title></circle>
            <circle cx="460" cy="200" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="460" cy="200" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Spain</title></circle>
            <circle cx="510" cy="200" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="510" cy="200" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Italy</title></circle>
            <circle cx="520" cy="120" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="520" cy="120" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Scandinavia</title></circle>
            <circle cx="560" cy="140" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="560" cy="140" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Russia West</title></circle>
            <circle cx="550" cy="250" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="550" cy="250" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Egypt</title></circle>
            <circle cx="550" cy="360" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="550" cy="360" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Kenya</title></circle>
            <circle cx="530" cy="450" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="530" cy="450" r="3.5" fill="#C8A14A" className="animate-pulse"><title>South Africa</title></circle>
            <circle cx="480" cy="320" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="480" cy="320" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Nigeria</title></circle>
            <circle cx="450" cy="230" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="450" cy="230" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Morocco</title></circle>
            <circle cx="580" cy="258" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="580" cy="258" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Saudi Arabia</title></circle>
            <circle cx="540" cy="210" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="540" cy="210" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Turkey</title></circle>
            <circle cx="650" cy="260" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="650" cy="260" r="3.5" fill="#C8A14A" className="animate-pulse"><title>India</title></circle>
            <circle cx="660" cy="300" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="660" cy="300" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Sri Lanka</title></circle>
            <circle cx="750" cy="200" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="750" cy="200" r="3.5" fill="#C8A14A" className="animate-pulse"><title>China</title></circle>
            <circle cx="820" cy="210" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="820" cy="210" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Japan</title></circle>
            <circle cx="800" cy="200" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="800" cy="200" r="3.5" fill="#C8A14A" className="animate-pulse"><title>South Korea</title></circle>
            <circle cx="750" cy="320" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="750" cy="320" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Indonesia</title></circle>
            <circle cx="720" cy="280" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="720" cy="280" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Thailand</title></circle>
            <circle cx="780" cy="290" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="780" cy="290" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Philippines</title></circle>
            <circle cx="850" cy="450" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="850" cy="450" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Australia East</title></circle>
            <circle cx="780" cy="430" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="780" cy="430" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Australia West</title></circle>
            <circle cx="900" cy="480" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="900" cy="480" r="3.5" fill="#C8A14A" className="animate-pulse"><title>New Zealand</title></circle>
            <circle cx="800" cy="100" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />
            <circle cx="800" cy="100" r="3.5" fill="#C8A14A" className="animate-pulse"><title>Russia East</title></circle>
          </g>
        </svg>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
      `}} />
    </section>
  );
}

function Sustainability() {
  return (
    <section className="py-24 md:py-32 bg-[#F8FAF8]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)] grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h4 className="text-[#22C55E] font-semibold uppercase tracking-widest text-sm mb-4">Sustainability Commitment</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-6">Farming for the Future</h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              We believe in protecting the earth that provides for us. Our entire supply chain is optimized to minimize carbon footprint, promote organic soil health, and support fair-trade practices for local farming communities.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { t: "Organic Farming", d: "Zero synthetic pesticides" },
                { t: "Water Conservation", d: "Drip irrigation systems" },
                { t: "Eco Packaging", d: "100% recyclable materials" },
                { t: "Zero Waste", d: "Composting organic byproduct" }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 text-[#14532D] font-bold mb-1">
                    <Leaf className="w-4 h-4" />
                    {item.t}
                  </div>
                  <div className="text-sm text-gray-500">{item.d}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative h-[500px] rounded-3xl overflow-hidden">
            <Image src="/images/unsplash-1500937386664-56d1dfef3854.webp" alt="Sustainable farming" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { text: "KhasCom has transformed our supply chain. Their consistency in delivering Grade A Pakistani produce to our European warehouses is unmatched.", author: "Director of Procurement", company: "FreshFoods GmbH, Germany" },
    { text: "Finding a reliable exporter for Himalayan pink salt in bulk was a challenge until we partnered with KhasCom. Flawless documentation and timely shipping.", author: "Sourcing Manager", company: "Natural Goods LLC, USA" },
    { text: "Their sesame seed purity is consistently on spec, and the cold chain on fresh gourds holds all the way to Dubai. Our preferred Pakistani supplier.", author: "Head Buyer", company: "Global Supermarkets, UAE" }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#14532D] text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Trusted by Global Importers</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-xl">
              <div className="flex gap-1 mb-6 text-[#C8A14A]">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-lg text-green-50 mb-8 italic">&quot;{r.text}&quot;</p>
              <div>
                <div className="font-bold">{r.author}</div>
                <div className="text-sm text-[#C8A14A]">{r.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestArticles() {
  const articles = [
    { title: "Pakistan's Sesame Seed Export Boom: What Buyers Should Know", category: "Market Insight", date: "Oct 12, 2026", img: "/images/sesame-seeds-white.webp" },
    { title: "Understanding Phytosanitary Export Certificates", category: "Logistics", date: "Sep 28, 2026", img: "/images/unsplash-1596040033229-a9821ebd058d.webp" },
    { title: "Why Himalayan Pink Salt is Dominating Gourmet Markets", category: "Product Spotlight", date: "Sep 15, 2026", img: "/images/pink-salt-real.webp" }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h4 className="text-[#C8A14A] font-semibold uppercase tracking-widest text-sm mb-4">News & Insights</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A]">Latest Articles</h2>
          </div>
          <Link href="/blog" className="text-[#14532D] font-semibold border-b-2 border-[#14532D] pb-1 hover:text-[#C8A14A] transition-colors">
            Read Blog
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((a, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative h-60 rounded-3xl overflow-hidden mb-6">
                <Image src={a.img} alt={a.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                <span className="text-[#14532D]">{a.category}</span>
                <span>{a.date}</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#14532D] transition-colors">{a.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-6xl relative rounded-[3rem] overflow-hidden shadow-2xl">
        <Image src="/images/unsplash-1596040033229-a9821ebd058d.webp" alt="CTA Background" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#14532D]/90 backdrop-blur-sm" />
        
        <div className="relative z-10 p-12 md:p-24 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 max-w-3xl mx-auto leading-tight">
            Ready To Import Premium Pakistani Commodities?
          </h2>
          <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto font-light">
            Partner with KhasCom for a reliable, certified and fully documented supply chain out of Pakistan.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact-us/request-import-quote" className="inline-flex items-center justify-center rounded-full bg-[#C8A14A] px-10 py-5 text-lg font-bold text-white shadow-xl hover:bg-[#b08d3f] hover:scale-105 transition-all">
              Get Quote
            </Link>
            <Link href="/contact-us" className="inline-flex items-center justify-center rounded-full border-2 border-white px-10 py-5 text-lg font-bold text-white hover:bg-white hover:text-[#14532D] hover:scale-105 transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobalLogistics() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[#F8FAF8] opacity-50 transform -skew-y-3 origin-top-left z-0" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-2xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14532D]/10 text-[#14532D] font-semibold text-sm mb-6">
              <Ship className="w-4 h-4" /> Global Reach
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold text-[#14532D] mb-6 leading-tight">
              Seamless Logistics, <br/>
              <span className="text-[#C8A14A] italic">From Farm to Port</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 text-lg mb-8 leading-relaxed">
              We ensure every consignment reaches you in perfect condition. Through our cold chain network, ocean freight from Karachi and Port Qasim, and express air cargo, we deliver across continents without compromising on freshness or grade.
            </motion.p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Ocean Freight", text: "Cost-effective large volume shipping with temperature-controlled reefers.", icon: Ship },
                { title: "Air Cargo", text: "Express delivery for highly perishable and time-sensitive organic goods.", icon: Package },
                { title: "Cold Chain", text: "Unbroken temperature control from harvest to final destination.", icon: ShieldCheck },
                { title: "Customs Clearance", text: "Hassle-free documentation and fast-track port clearance globally.", icon: FileText }
              ].map((feature, idx) => (
                <motion.div key={idx} variants={fadeUp} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[#14532D]/5 flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-[#C8A14A]" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative h-[600px] w-full">
            <div className="absolute top-0 right-0 w-4/5 h-[380px] rounded-3xl overflow-hidden shadow-2xl z-10 border-4 border-white">
              <Image src="/images/unsplash-cargo-plane.webp" alt="Air Cargo Plane" fill className="object-cover hover:scale-105 transition-transform duration-1000" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="absolute bottom-10 left-0 w-3/4 h-[350px] rounded-3xl overflow-hidden shadow-2xl z-20 border-4 border-white">
              <Image src="/images/unsplash-1494412574643-ff11b0a5c1c3.webp" alt="Shipping Containers" fill className="object-cover hover:scale-105 transition-transform duration-1000" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-white shadow-xl z-30 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#14532D] flex flex-col items-center justify-center text-white text-center p-2 shadow-inner">
                <span className="font-bold text-2xl leading-tight">35+</span>
                <span className="text-xs uppercase tracking-wider mt-1 text-[#C8A14A]">Ports</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

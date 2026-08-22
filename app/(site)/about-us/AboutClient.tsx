"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Globe, Leaf, Target, 
  Award, Sprout, Handshake, Users, CheckCircle2, Clock
} from "lucide-react";

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AboutClient() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAF8] overflow-x-hidden selection:bg-[#14532D] selection:text-white">
      <HeroSection />
      <StatsSection />
      <OurStorySection />
      <MissionVisionSection />
      <ValuesSection />
      <CTABanner />
    </div>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0A1A11]">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <Image
          src="/images/unsplash-1500382017468-9049fed747ef.webp"
          alt="Agriculture Fields"
          fill
          priority
          className="object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A11]/90 via-[#0A1A11]/50 to-transparent" />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 pt-20">
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="flex flex-col justify-center max-w-2xl"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
            {['Global Footprint', 'Ethical Trading', 'Trusted Partners', 'Quality Assured'].map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A14A]" />
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Cultivating Excellence, <br />
            <span className="text-[#C8A14A] italic">Exporting Trust.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 font-light max-w-xl">
            KhasCom was founded on a simple belief: that Pakistan grows, mines and processes some of the finest commodities in the world, and that international buyers deserve a direct, dependable route to them.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5">
            <Link href="#our-story" className="inline-flex items-center justify-center rounded-full bg-[#C8A14A] px-8 py-4 text-base font-semibold text-white shadow-[0_8px_30px_rgba(200,161,74,0.3)] hover:bg-[#b08d3f] hover:-translate-y-1 transition-all duration-300">
              Read Our Story
            </Link>
            <Link href="/contact-us" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-md px-8 py-4 text-base font-semibold text-white hover:bg-white hover:text-[#14532D] hover:-translate-y-1 transition-all duration-300">
              Contact Leadership
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
              <Image src="/images/unsplash-1494412574643-ff11b0a5c1c3.webp" alt="Global Logistics" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="text-white font-serif font-medium">Global Logistics</div>
            <div className="text-gray-400 text-xs mt-1">35+ Countries Served</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute top-[40%] right-[5%] w-56 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl z-20"
          >
            <div className="relative h-36 w-full rounded-xl overflow-hidden mb-3">
              <Image src="/images/unsplash-1581091226825-a6a2a5aee158.webp" alt="Quality Assured" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="text-white font-serif font-medium">Lab Tested</div>
            <div className="text-[#C8A14A] text-xs mt-1 font-semibold flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> 100% Verified</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -50, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-[10%] left-[20%] w-52 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl z-10"
          >
            <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3">
              <Image src="/images/unsplash-1595841696677-6489ff3f8cd1.webp" alt="Partner Farms" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="text-white font-serif font-medium">Partner Farms</div>
            <div className="text-gray-400 text-xs mt-1">Sustainable Sourcing</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { num: "15+", label: "Years in Trade", icon: Clock },
    { num: "35+", label: "Countries Served", icon: Globe },
    { num: "500+", label: "Partner Farms", icon: Leaf },
    { num: "100%", label: "Quality Compliant", icon: ShieldCheck }
  ];

  return (
    <section className="py-12 bg-[#F8FAF8] relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 text-center shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-[#14532D]/5 rounded-2xl flex items-center justify-center mb-6">
                <stat.icon className="w-8 h-8 text-[#14532D]" />
              </div>
              <h3 className="text-4xl font-serif font-bold text-[#1A1A1A] mb-2">{stat.num}</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurStorySection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h4 className="text-[#C8A14A] font-semibold uppercase tracking-widest text-sm">The Journey</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] leading-tight">
              From Local Fields to <br /> Global Markets.
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                What started as a modest endeavor to connect Pakistani farmers with regional buyers has grown into a full-service export house. We recognized early on that the fertile soils of Punjab and Sindh, the orchards of the north and the salt range at Khewra produced goods of unparalleled quality &mdash; yet the global market was largely inaccessible to those growers and miners.
              </p>
              <p>
                By establishing state-of-the-art processing facilities, securing international certifications, and building a flawless cold-chain logistics network, KhasCom has successfully bridged this gap. 
              </p>
              <p className="font-medium text-[#14532D]">
                Today we stand as a reliable partner in international trade, exporting thousands of metric tons of Pakistani produce, salt, dates, sesame and grain annually to over 35 countries.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Different image arrangement than home page */}
            <div className="grid grid-cols-2 gap-4 h-[600px]">
              <div className="space-y-4 pt-12">
                <div className="relative h-[280px] rounded-3xl overflow-hidden shadow-lg">
                  <Image src="/images/unsplash-1598170845058-32b9d6a5da37.webp" alt="Export-grade Pakistani commodities" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="relative h-[240px] rounded-3xl overflow-hidden shadow-lg">
                  <Image src="/images/unsplash-1494412574643-ff11b0a5c1c3.webp" alt="Cargo and Containers" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-[340px] rounded-3xl overflow-hidden shadow-lg">
                  <Image src="/images/unsplash-1601584115197-04ecc0da31d7.webp" alt="Global Shipping and Ports" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="relative h-[200px] bg-[#14532D] rounded-3xl overflow-hidden shadow-lg p-8 text-white flex flex-col justify-center">
                  <Award className="w-10 h-10 text-[#C8A14A] mb-4" />
                  <h3 className="font-serif text-2xl font-bold">Award Winning Exporter</h3>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  return (
    <section className="py-24 bg-[#0A1A11] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/unsplash-1605000797499-95a51c5269ae.webp')] opacity-10 bg-cover bg-fixed bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A11] via-[#0A1A11]/80 to-[#0A1A11]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 lg:p-14 rounded-[2.5rem] hover:bg-white/10 transition-colors"
          >
            <div className="w-16 h-16 bg-[#C8A14A] rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(200,161,74,0.4)]">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-6">Our Mission</h3>
            <p className="text-lg text-gray-300 leading-relaxed font-light">
              To seamlessly connect the world with nature&apos;s finest agricultural produce through a sustainable, transparent, and highly efficient global supply chain. We strive to empower local farmers while ensuring our international clients receive uncompromised quality, consistently and reliably.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 lg:p-14 rounded-[2.5rem] hover:bg-white/10 transition-colors"
          >
            <div className="w-16 h-16 bg-[#14532D] rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(20,83,45,0.4)]">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-6">Our Vision</h3>
            <p className="text-lg text-gray-300 leading-relaxed font-light">
              To be the globally recognized benchmark for excellence in Pakistani commodity trade. We envision a future where KhasCom is synonymous with unparalleled quality, ethical trading practices and environmental stewardship across every continent.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    { title: "Integrity", icon: Handshake, desc: "Transparent practices in every transaction, fostering long-term trust with global partners." },
    { title: "Quality Above All", icon: ShieldCheck, desc: "A zero-tolerance policy for subpar products, ensured through rigorous testing." },
    { title: "Sustainability", icon: Leaf, desc: "Championing eco-friendly farming and optimized, low-emission logistics." },
    { title: "People First", icon: Users, desc: "From farm workers to end consumers, human welfare remains at our core." }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F8FAF8]">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h4 className="text-[#C8A14A] font-semibold uppercase tracking-widest text-sm mb-4">Core Principles</h4>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-16">Values That Drive Us</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#14532D]/5 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <v.icon className="w-7 h-7 text-[#14532D]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">{v.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-20 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-[#14532D] rounded-[3rem] overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 z-0">
            <Image src="/images/unsplash-1542838132-92c53300491e.webp" alt="Export background" fill className="object-cover opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#14532D] via-[#14532D]/90 to-[#14532D]/60" />
          </div>
          
          <div className="relative z-10 p-12 md:p-20 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Ready to start importing premium goods?</h2>
              <p className="text-lg text-green-100 font-light">Join hundreds of international buyers who trust KhasCom for their wholesale supply needs.</p>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link href="/contact-us/request-import-quote" className="px-8 py-4 rounded-full bg-[#C8A14A] text-white font-bold text-center hover:bg-[#B08D3F] transition-colors shadow-lg">
                Request a Quote
              </Link>
              <Link href="/products" className="px-8 py-4 rounded-full bg-white/10 text-white font-bold text-center border border-white/20 hover:bg-white hover:text-[#14532D] transition-colors backdrop-blur-sm">
                View Catalogue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

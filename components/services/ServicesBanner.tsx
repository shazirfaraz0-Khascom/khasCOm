"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Globe } from "lucide-react";

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export function ServicesBanner() {
  return (
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-[#0A1A11]">
      <motion.div className="absolute inset-0 z-0">
        <Image
          src="/images/unsplash-1494412574643-ff11b0a5c1c3.webp"
          alt="Professional Business Services"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A11]/95 via-[#0A1A11]/70 to-transparent" />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 pt-20">
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="flex flex-col justify-center max-w-2xl"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
            {['Professional Support', 'Verified Connections', 'End-to-End Solutions', 'Global Reach'].map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A14A]" />
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Comprehensive <span className="text-[#C8A14A] italic">Export Services</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 font-light max-w-xl">
            From company registrations to buyer matchmaking, we provide end-to-end solutions to help you navigate and succeed in the global agricultural trade.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5">
            <Link href="/contact-us" className="inline-flex items-center justify-center rounded-full bg-[#C8A14A] px-8 py-4 text-base font-semibold text-white shadow-[0_8px_30px_rgba(200,161,74,0.3)] hover:bg-[#b08d3f] hover:-translate-y-1 transition-all duration-300">
              Get Started Today
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Cards Right Side */}
        <div className="hidden lg:flex relative h-[600px] items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute top-[15%] left-[5%] w-52 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl"
          >
            <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3">
              <Image src="/images/unsplash-1454165804606-c3d57bc86b40.webp" alt="Company Registration" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="text-white font-serif font-medium">Registration</div>
            <div className="text-gray-400 text-xs mt-1">NTN, Chamber, TDAP</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute top-[35%] right-[0%] w-60 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl z-20"
          >
            <div className="relative h-36 w-full rounded-xl overflow-hidden mb-3">
              <Image src="/images/unsplash-1556761175-5973dc0f32e7.webp" alt="Buyer Matchmaking" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="text-white font-serif font-medium">Matchmaking</div>
            <div className="text-[#C8A14A] text-xs mt-1 font-semibold flex items-center gap-1"><Globe className="w-3 h-3"/> Int. Buyers Network</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -50, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-[10%] left-[25%] w-48 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl z-10"
          >
            <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3">
              <Image src="/images/unsplash-1517245386807-bb43f82c33c4.webp" alt="Verified Supplier" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="text-white font-serif font-medium">Verification</div>
            <div className="text-gray-400 text-xs mt-1">Premium Producers</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

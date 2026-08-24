import { constructMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Building2, Users, PackageCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServicesBanner } from '@/components/services/ServicesBanner';

export const metadata = constructMetadata({
  title: 'Our Services',
  path: '/services',
  description: 'Professional export services, documentation, sourcing and buyer matchmaking by KhasCom, Pakistan.',
});

export default function ServicesPage() {
  const services = [
    {
      id: 'company-registration',
      title: 'Company Registration',
      icon: Building2,
      desc: 'We register your import/export company in Pakistan from start to finish - NTN, Chamber of Commerce, TDAP, RECP, WEBOC registration.',
      details: 'Navigating government registrations can be complex. Our team handles all the paperwork, timelines, and compliance requirements so you can focus on growing your business.',
      features: [
        'NTN & STRN registration',
        'Chamber of Commerce membership',
        'TDAP registration',
        'RECP licensing',
        'WEBOC portal setup',
      ],
      link: '/contact-us',
      linkText: 'Get Started'
    },
    {
      id: 'buyer-matchmaking',
      title: 'Buyer Matchmaking',
      icon: Users,
      desc: 'We connect international buyers with verified suppliers for premium agro commodities.',
      details: 'Access our extensive network of verified suppliers. We handle negotiations, quality verification, and export documentation to ensure flawless delivery to your port.',
      features: [
        'Verified supplier network',
        'Quality-checked products',
        'Price negotiation support',
        'End-to-end logistics',
        'FOB & CIF delivery',
      ],
      link: '/contact-us/request-import-quote',
      linkText: 'Submit Query'
    },
    {
      id: 'verified-supplier',
      title: 'Become a Verified Supplier',
      icon: PackageCheck,
      desc: 'Join our network of premium agricultural producers and export your products to 15+ global markets.',
      details: 'We are constantly partnering with reliable Pakistani farmers, mines and processors. Work with KhasCom to gain direct access to international buyers without the hassle of export logistics.',
      features: [
        'Access to global buyers',
        'We handle all export paperwork',
        'Guaranteed secure payments',
        'Quality standardization guidance',
        'Long-term partnerships',
      ],
      link: '/contact-us',
      linkText: 'Apply as Supplier'
    }
  ];

  return (
    <div className="flex-1 bg-stone-50 overflow-hidden">
      {/* Hero Section */}
      <ServicesBanner />

      {/* Services Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:gap-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-[#14532D]/30 transition-all duration-500 group">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Content */}
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14532D]/10 to-[#14532D]/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-8 h-8 text-[#14532D]" />
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">{service.title}</h2>
                      <p className="text-lg text-stone-600 font-medium mb-4">{service.desc}</p>
                      <p className="text-stone-500 leading-relaxed mb-10">{service.details}</p>
                      
                      <div className="mt-auto pt-8 border-t border-stone-100">
                        <Link 
                          href={service.link}
                          className="inline-flex items-center gap-2 bg-[#14532D] text-white px-8 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase hover:bg-[#C8A14A] hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          {service.linkText} <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="bg-[#FAF8F4] p-8 md:p-12 lg:p-16 border-t lg:border-t-0 lg:border-l border-stone-100 flex flex-col justify-center">
                      <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[#C8A14A] mb-8">What&apos;s Included</h3>
                      <ul className="space-y-5">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-4">
                            <CheckCircle2 className="w-6 h-6 text-[#14532D] shrink-0" />
                            <span className="text-stone-700 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-100 border-t border-stone-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">Ready to expand your horizons?</h2>
          <p className="text-stone-600 mb-8 text-lg">Whether you are looking to register, buy, or supply, our dedicated team is here to support you at every step.</p>
          <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 bg-[#C8A14A] text-white px-8 py-4 rounded-full font-bold tracking-wider uppercase hover:bg-[#14532D] transition-colors shadow-xl hover:-translate-y-1 duration-300">
            Get in touch <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

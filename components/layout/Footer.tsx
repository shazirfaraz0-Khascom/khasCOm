import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A1A11] text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#14532D]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#C8A14A]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
          
          {/* Company Column */}
          <div className="space-y-6 lg:pr-8">
            <Link href="/" className="inline-block">
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-bold tracking-tight text-white">
                  KhasCom
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C8A14A]">
                  Commodities Group
                </span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Pakistan&apos;s Commodities, Delivered Worldwide. A Pakistani export and import group supplying international buyers with fresh fruits and vegetables, Himalayan pink salt, dates, sesame seeds, rice and grains &mdash; direct from source to your port.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, href: "#" },
                { icon: ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>, href: "#" },
                { icon: ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, href: "#" },
                { icon: ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, href: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-gray-800 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#C8A14A] hover:border-[#C8A14A] transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-semibold text-white">Premium Products</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/products/fresh-fruits" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Fresh Fruits</Link></li>
              <li><Link href="/products/fresh-vegetables" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Fresh Vegetables</Link></li>
              <li><Link href="/products/himalayan-salt" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Himalayan Pink Salt</Link></li>
              <li><Link href="/products/dates" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Dates</Link></li>
              <li><Link href="/products/seeds-oilseeds" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Sesame Seeds</Link></li>
              <li><Link href="/products/grains" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Basmati Rice &amp; Grains</Link></li>
              <li><Link href="/products/dry-fruits" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Dry Fruits &amp; Nuts</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about-us" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> About Us</Link></li>
              <li><Link href="/services" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Our Services</Link></li>
              <li><Link href="/products" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Product Catalogue</Link></li>
              <li><Link href="/export" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Export Markets</Link></li>
              <li><Link href="/import" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Import Sourcing</Link></li>
              <li><Link href="/blog" className="hover:text-[#C8A14A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Insights & Articles</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-semibold text-white">Global Headquarters</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C8A14A] flex-shrink-0 mt-0.5" />
                <span>[Street address], Gulberg III<br/>Lahore, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C8A14A] flex-shrink-0" />
                <span>+92 300 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C8A14A] flex-shrink-0" />
                <span>export@khascom.com</span>
              </li>
            </ul>
            
            <div className="pt-4">
              <h5 className="text-sm font-semibold text-white mb-3">Subscribe to Market Updates</h5>
              <form className="relative">
                <input 
                  suppressHydrationWarning
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A14A] focus:bg-white/10 transition-colors"
                />
                <button type="submit" className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#C8A14A] text-white rounded-full px-4 text-sm font-medium hover:bg-[#b08d3f] transition-colors flex items-center">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} KhasCom. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/admin" className="hover:text-[#C8A14A] transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

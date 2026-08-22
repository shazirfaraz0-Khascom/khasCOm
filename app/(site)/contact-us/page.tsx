import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { ContactForm } from './ContactForm';

export const metadata = constructMetadata({
  title: 'Contact Us | KhasCom',
  description: 'Get in touch with KhasCom for wholesale inquiries, support, or partnership opportunities.',
});

export default function ContactUsPage() {
  return (
    <div className="flex-1 bg-stone-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Contact Us</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Our dedicated trade desk is ready to assist you with your international sourcing and export requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/contact-us/request-import-quote" className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 hover:border-primary transition-colors text-center group flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              📥
            </div>
            <h3 className="font-serif font-bold text-xl mb-2">Request Import Quote</h3>
            <p className="text-stone-500 text-sm mb-4">For buyers looking to import our premium products.</p>
            <span className="mt-auto text-primary font-medium text-sm">Get Quote &rarr;</span>
          </Link>

          <Link href="/contact-us/request-export-quote" className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 hover:border-primary transition-colors text-center group flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              📤
            </div>
            <h3 className="font-serif font-bold text-xl mb-2">Request Export Quote</h3>
            <p className="text-stone-500 text-sm mb-4">For specific destination supply chain inquiries.</p>
            <span className="mt-auto text-primary font-medium text-sm">Get Quote &rarr;</span>
          </Link>

          <Link href="/contact-us/become-a-supplier" className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 hover:border-primary transition-colors text-center group flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              🤝
            </div>
            <h3 className="font-serif font-bold text-xl mb-2">Become a Supplier</h3>
            <p className="text-stone-500 text-sm mb-4">For verified farms and producers looking to partner.</p>
            <span className="mt-auto text-primary font-medium text-sm">Apply Now &rarr;</span>
          </Link>
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-sm border border-stone-200 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Global Offices</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-stone-900">Head Office</h4>
                  <p className="text-stone-600 mt-1">[Street address], Gulberg III<br/>Lahore, Punjab, Pakistan</p>
                  <p className="text-stone-600 mt-1">Phone: +92 300 000 0000</p>
                  <p className="text-stone-600 mt-1">Email: info@khascom.com</p>

                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Export Desk</h4>
                  <p className="text-stone-600 mt-1">Karachi Port &amp; Port Qasim operations</p>
                  <p className="text-stone-600 mt-1">Email: export@khascom.com</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">General Inquiry</h2>
              <p className="text-stone-600 mb-6">For general questions, please use the form below to ensure your inquiry reaches the correct department.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

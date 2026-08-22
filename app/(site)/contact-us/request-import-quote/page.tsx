'use client';

import { useState } from 'react';
import { submitQuoteRequest } from '@/app/actions/contact';

export default function RequestImportQuotePage() {
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteType, setQuoteType] = useState<'buyer' | 'seller'>('buyer');

  const labels = {
    buyer: {
      title: "Request Quote (Buyer) / کوٹیشن کی درخواست کریں (خریدار)",
      subtitle: "Please provide your requirements below and our sales team will contact you. / براہ کرم ذیل میں اپنی ضروریات فراہم کریں اور ہماری سیلز ٹیم آپ سے رابطہ کرے گی۔",
      name: "Full Name / پورا نام *",
      email: "Email Address / ای میل ایڈریس *",
      phone: "Phone Number / فون نمبر",
      country: "Your Country / آپ کا ملک",
      requirements: "Requirements / ضروریات",
      quantity: "Quantity / مقدار *",
      unit: "Unit / اکائی *",
      message: "Additional Details (Product specifics, port of discharge, etc.) / اضافی تفصیلات",
      submit: "Submit Quote Request / کوٹیشن جمع کروائیں"
    },
    seller: {
      title: "Offer Supply (Seller) / سپلائی کی پیشکش کریں (بیچنے والا)",
      subtitle: "Please provide your product details below and our procurement team will contact you. / براہ کرم ذیل میں اپنی مصنوعات کی تفصیلات فراہم کریں اور ہماری پروکیورمنٹ ٹیم آپ سے رابطہ کرے گی۔",
      name: "Full Name / پورا نام *",
      email: "Email Address / ای میل ایڈریس *",
      phone: "Phone Number / فون نمبر",
      country: "Your Country / آپ کا ملک",
      requirements: "Supply Details / سپلائی کی تفصیلات",
      quantity: "Available Quantity / دستیاب مقدار *",
      unit: "Unit / اکائی *",
      message: "Product Details (Origin, specifications, etc.) / مصنوعات کی تفصیلات",
      submit: "Submit Supply Offer / پیشکش جمع کروائیں"
    }
  };

  const currentLabels = labels[quoteType];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const data = {
      type: (quoteType === 'buyer' ? 'Import' : 'Export') as 'Import' | 'Export',
      buyerName: formData.get('buyerName') as string,
      buyerEmail: formData.get('buyerEmail') as string,
      buyerPhone: formData.get('buyerPhone') as string,
      buyerCountry: formData.get('buyerCountry') as string,
      quantity: formData.get('quantity') as string,
      unit: formData.get('unit') as string,
      message: formData.get('message') as string,
      productId: formData.get('productId') as string || undefined,
    };

    // The action expects the enum values, which 'Import' and 'Export' strings correctly match
    const res = await submitQuoteRequest(data as any);
    setStatus({ type: res.success ? 'success' : 'error', message: res.message });
    setIsSubmitting(false);
    
    if (res.success) {
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <div className="flex-1 bg-stone-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
          <button
            onClick={() => { setQuoteType('buyer'); setStatus({ type: null, message: '' }); }}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              quoteType === 'buyer'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Buyer / خریدار
          </button>
          <button
            onClick={() => { setQuoteType('seller'); setStatus({ type: null, message: '' }); }}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              quoteType === 'seller'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Seller / بیچنے والا
          </button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-stone-900 mb-4">{currentLabels.title}</h1>
          <p className="text-stone-600" dir="auto">{currentLabels.subtitle}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
          {status.type && (
            <div className={`p-4 rounded-md mb-6 ${status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="buyerName" className="text-sm font-medium text-stone-700">{currentLabels.name}</label>
                <input required type="text" id="buyerName" name="buyerName" className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="buyerEmail" className="text-sm font-medium text-stone-700">{currentLabels.email}</label>
                <input suppressHydrationWarning required type="email" id="buyerEmail" name="buyerEmail" className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="buyerPhone" className="text-sm font-medium text-stone-700">{currentLabels.phone}</label>
                <input type="tel" id="buyerPhone" name="buyerPhone" className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="buyerCountry" className="text-sm font-medium text-stone-700">{currentLabels.country}</label>
                <input type="text" id="buyerCountry" name="buyerCountry" className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>

            <div className="border-t border-stone-200 pt-6">
              <h3 className="font-semibold text-stone-900 mb-4">{currentLabels.requirements}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-medium text-stone-700">{currentLabels.quantity}</label>
                  <input required type="text" id="quantity" name="quantity" placeholder="e.g. 20" className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="unit" className="text-sm font-medium text-stone-700">{currentLabels.unit}</label>
                  <select required id="unit" name="unit" className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option value="Metric Tons (MT)">Metric Tons (MT)</option>
                    <option value="Kilograms (KG)">Kilograms (KG)</option>
                    <option value="20ft Container">20ft Container</option>
                    <option value="40ft Container">40ft Container</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-stone-700">{currentLabels.message}</label>
                <textarea id="message" name="message" rows={4} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
              </div>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md shadow hover:bg-primary/90 transition-colors disabled:opacity-70">
              {isSubmitting ? 'Submitting... / جمع ہو رہا ہے...' : currentLabels.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

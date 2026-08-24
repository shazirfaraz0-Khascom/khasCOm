'use client';

import { useState } from 'react';
import { submitSupplierApplication } from '@/app/actions/contact';

export default function SupplierForm() {
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await submitSupplierApplication({
      companyName: formData.get('companyName') as string,
      contactName: formData.get('contactName') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || undefined,
      productsOffered: formData.get('productsOffered') as string,
      country: (formData.get('country') as string) || undefined,
      message: (formData.get('message') as string) || undefined,
    });

    setStatus({ type: res.success ? 'success' : 'error', message: res.message });
    setIsSubmitting(false);

    if (res.success) form.reset();
  }

  const field = "w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";
  const label = "text-sm font-medium text-stone-700";

  return (
    <div className="flex-1 bg-stone-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">

        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
            Become a Supplier / سپلائر بنیں
          </h1>
          <p className="text-stone-600" dir="auto">
            Growers, mines and processors across Pakistan: register with our procurement team and reach
            international buyers without handling export logistics yourself. /
            پاکستان بھر کے کاشتکار، کانیں اور پروسیسرز: ہماری پروکیورمنٹ ٹیم کے ساتھ رجسٹر ہوں۔
          </p>
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
                <label htmlFor="companyName" className={label}>Company / Farm Name / کمپنی یا فارم کا نام *</label>
                <input required type="text" id="companyName" name="companyName" className={field} />
              </div>
              <div className="space-y-2">
                <label htmlFor="contactName" className={label}>Contact Person / رابطہ کار *</label>
                <input required type="text" id="contactName" name="contactName" className={field} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className={label}>Email Address / ای میل ایڈریس *</label>
                <input suppressHydrationWarning required type="email" id="email" name="email" className={field} />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className={label}>Phone Number / فون نمبر</label>
                <input type="tel" id="phone" name="phone" className={field} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="country" className={label}>Country / Region / ملک یا علاقہ</label>
                <input type="text" id="country" name="country" placeholder="e.g. Khairpur, Sindh" className={field} />
              </div>
            </div>

            <div className="border-t border-stone-200 pt-6 space-y-6">
              <h3 className="font-semibold text-stone-900">Supply Details / سپلائی کی تفصیلات</h3>

              <div className="space-y-2">
                <label htmlFor="productsOffered" className={label}>Products You Supply / آپ کی مصنوعات *</label>
                <input
                  required
                  type="text"
                  id="productsOffered"
                  name="productsOffered"
                  placeholder="e.g. Aseel dates, white sesame seeds, tinda"
                  className={field}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className={label}>
                  Capacity, grades and certifications / پیداواری صلاحیت، گریڈ اور سرٹیفیکیشن
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Monthly volume, available grades, any certifications you hold, packing capability."
                  className={field}
                ></textarea>
              </div>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md shadow hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting... / جمع ہو رہا ہے...' : 'Submit Application / درخواست جمع کروائیں'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

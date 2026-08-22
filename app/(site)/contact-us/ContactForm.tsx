'use client';
import { useState } from 'react';
import { submitContactMessage } from '@/app/actions/contact';

export function ContactForm() {
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    const res = await submitContactMessage(data);
    setStatus({ type: res.success ? 'success' : 'error', message: res.message });
    setIsSubmitting(false);
    
    if (res.success) {
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status.type && (
        <div className={`p-3 rounded-md text-sm ${status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {status.message}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Name</label>
          <input required type="text" id="name" name="name" className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email</label>
          <input required type="email" id="email" name="email" className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">Subject</label>
        <input type="text" id="subject" name="subject" className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Message</label>
        <textarea required id="message" name="message" rows={4} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
      </div>
      <button disabled={isSubmitting} type="submit" className="w-full bg-[#14532D] text-white font-semibold py-2 rounded-md shadow hover:bg-[#C8A14A] transition-colors disabled:opacity-70">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

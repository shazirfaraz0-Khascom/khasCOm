import { constructMetadata } from '@/lib/seo';
import QuoteForm from '../QuoteForm';

export const metadata = constructMetadata({
  title: 'Request an Import Quote',
  path: '/contact-us/request-import-quote',
  description: 'Request a wholesale quote for Pakistani commodities — fresh produce, Himalayan pink salt, dates, sesame seeds, rice and grains, shipped worldwide.',
});

export default function RequestImportQuotePage() {
  return <QuoteForm initialMode="buyer" />;
}

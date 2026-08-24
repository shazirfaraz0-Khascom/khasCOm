import { constructMetadata } from '@/lib/seo';
import QuoteForm from '../QuoteForm';

export const metadata = constructMetadata({
  title: 'Offer Supply to KhasCom',
  path: '/contact-us/request-export-quote',
  description: 'Growers, mines and processors: offer your commodities to KhasCom and reach international buyers without handling export logistics yourself.',
});

export default function RequestExportQuotePage() {
  return <QuoteForm initialMode="seller" />;
}

import { constructMetadata } from '@/lib/seo';
import QuoteForm from '../QuoteForm';

export const metadata = constructMetadata({
  title: 'Offer Supply to KhasCom | KhasCom',
  description: 'Growers, mines and processors: offer your commodities to KhasCom and reach international buyers without handling export logistics yourself.',
});

export default function RequestExportQuotePage() {
  return <QuoteForm initialMode="seller" />;
}

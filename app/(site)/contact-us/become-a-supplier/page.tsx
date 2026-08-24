import { constructMetadata } from '@/lib/seo';
import SupplierForm from './SupplierForm';

export const metadata = constructMetadata({
  title: 'Become a Supplier | KhasCom',
  description: 'Pakistani growers, mines and processors: partner with KhasCom to reach international wholesale buyers without handling export logistics yourself.',
});

export default function BecomeASupplierPage() {
  return <SupplierForm />;
}

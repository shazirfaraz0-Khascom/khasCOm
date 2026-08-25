
import { constructMetadata } from "@/lib/seo";
import { CATEGORY_DATA } from "./[category]/page";

export const metadata = constructMetadata({
  title: 'Our Products | Wholesale Export',
  path: '/products',
  description: 'Browse the full KhasCom export catalogue — apple gourd, bottle gourd and taro root, Himalayan pink salt, Aseel and Ajwa dates, sesame seeds, red dry chilli, basmati rice, dry fruits and poultry.',
});

import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  const categories = Object.entries(CATEGORY_DATA).map(([slug, data]) => ({
    slug,
    ...data
  }));

  return <ProductsClient categories={categories} />;
}

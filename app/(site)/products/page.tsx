
import { constructMetadata } from "@/lib/seo";
import { CATEGORY_DATA } from "./[category]/page";

export const metadata = constructMetadata({
  title: 'Our Products | Wholesale Export | KhasCom',
  description: 'Explore our premium range of fresh fruits, vegetables, dry fruits, grains, and poultry products ready for global export.',
});

import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  const categories = Object.entries(CATEGORY_DATA).map(([slug, data]) => ({
    slug,
    ...data
  }));

  return <ProductsClient categories={categories} />;
}

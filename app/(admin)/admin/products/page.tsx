import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminProductsPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      include: { category: true, sourceCountries: { include: { sourceCountry: true } } },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Products fetch error", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Products</h2>
          <p className="text-stone-500">Manage your product catalog, categories, and inventory.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products/categories" className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md font-medium text-sm transition-colors">
            Manage Categories
          </Link>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md font-medium text-sm transition-colors">
            + Add Product
          </button>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-stone-600">
            <thead className="text-xs text-stone-500 uppercase bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Source Countries</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-stone-900">{product.name}</div>
                    <div className="text-xs text-stone-400">/{product.slug}</div>
                  </td>
                  <td className="px-6 py-4">{product.category?.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Active' ? 'bg-green-100 text-green-700' :
                      product.status === 'Seasonal' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.sourceCountries?.map((sc: any) => (
                        <span key={sc.sourceCountryId} className="px-2 py-0.5 rounded-sm bg-stone-100 text-xs text-stone-600">
                          {sc.sourceCountry.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline font-medium text-sm">Edit</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                    No products found. Add your first product to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

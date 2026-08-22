import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  let stats = {
    newQuotes: 0,
    totalProducts: 0,
    totalCountries: 0,
    recentInquiries: [] as any[],
  };

  try {
    const [newQuotes, totalProducts, totalCountries, recentInquiries] = await Promise.all([
      prisma.quoteRequest.count({ where: { status: 'New' } }),
      prisma.product.count(),
      prisma.sourceCountry.count(),
      prisma.quoteRequest.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    ]);
    stats = { newQuotes, totalProducts, totalCountries, recentInquiries };
  } catch (e) {
    console.error("Dashboard stats error", e);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">Dashboard Overview</h2>
        <p className="text-stone-500">Welcome to the KhasCom admin portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-1">New Quotes</p>
            <p className="text-3xl font-bold text-primary">{stats.newQuotes}</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
            📥
          </div>
        </div>
        

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-bold text-stone-900">Recent Inquiries</h3>
            <Link href="/admin/inquiries" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="p-0">
            {stats.recentInquiries.length > 0 ? (
              <ul className="divide-y divide-stone-100">
                {stats.recentInquiries.map((inquiry: any) => (
                  <li key={inquiry.id} className="p-4 hover:bg-stone-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-stone-900">{inquiry.buyerName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${inquiry.status === 'New' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-600'}`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-sm text-stone-500">{inquiry.type} Quote • {new Date(inquiry.createdAt).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center text-stone-500 text-sm">No recent inquiries found.</div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 flex flex-col justify-center items-center text-center text-stone-500 space-y-4">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-2xl">
            📊
          </div>
          <div>
            <h3 className="font-bold text-stone-900 mb-1">Analytics Overview</h3>
            <p className="text-sm">Connect your Google Analytics 4 property in settings to view live traffic stats here.</p>
          </div>
          <Link href="/admin/settings" className="mt-2 inline-flex px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md text-sm font-medium transition-colors">
            Configure SEO & Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}

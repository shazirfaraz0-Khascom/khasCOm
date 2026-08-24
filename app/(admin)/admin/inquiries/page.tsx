import { prisma } from '@/lib/prisma';

export default async function AdminInquiriesPage() {
  let quotes: any[] = [];
  let messages: any[] = [];
  let suppliers: any[] = [];
  let loadError: string | null = null;

  try {
    [quotes, messages, suppliers] = await Promise.all([
      prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.supplierApplication.findMany({ orderBy: { createdAt: 'desc' } }),
    ]);
  } catch (error) {
    console.error("Fetch error", error);
    loadError = error instanceof Error ? error.message : 'Could not reach the database.';
  }

  const buyerCount = quotes.filter((q) => q.type === 'Import').length;
  const sellerCount = quotes.length - buyerCount;

  const tiles = [
    { n: buyerCount, l: 'Buyer inquiries' },
    { n: sellerCount, l: 'Seller offers' },
    { n: suppliers.length, l: 'Supplier applications' },
    { n: messages.length, l: 'Contact messages' },
  ];

  return (
    <div className="space-y-12">
      {loadError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <span className="font-semibold">Inquiries could not be loaded.</span> {loadError}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((t) => (
          <div key={t.l} className="bg-white border border-stone-200 rounded-xl px-5 py-4 shadow-sm">
            <div className="text-2xl font-bold text-stone-900 tabular-nums">{t.n}</div>
            <div className="text-xs uppercase tracking-wide text-stone-500 mt-1">{t.l}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Buyer &amp; Seller Inquiries</h2>
            <p className="text-stone-500">Quote requests from buyers and supply offers from sellers.</p>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-stone-600">
              <thead className="text-xs text-stone-500 uppercase bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Buyer/Seller Details</th>
                  <th className="px-6 py-4 font-medium">Requirement</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        quote.type === 'Import'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-violet-100 text-violet-800'
                      }`}>
                        {quote.type === 'Import' ? 'Buyer' : 'Seller'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-900">{quote.buyerName}</div>
                      <div className="text-xs text-stone-500">
                        <a href={`mailto:${quote.buyerEmail}`} className="hover:underline">{quote.buyerEmail}</a>
                      </div>
                      {quote.buyerPhone && (
                        <div className="text-xs text-stone-500">
                          <a href={`tel:${quote.buyerPhone}`} className="hover:underline">{quote.buyerPhone}</a>
                        </div>
                      )}
                      {quote.buyerCountry && <div className="text-xs text-stone-400">{quote.buyerCountry}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">{quote.quantity} {quote.unit}</span>
                      {quote.message && <div className="text-xs text-stone-500 max-w-[200px] truncate">{quote.message}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        quote.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        quote.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {quote.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {quotes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                      No buyer or seller inquiries yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Supplier Applications</h2>
            <p className="text-stone-500">Growers, mines and processors applying to supply KhasCom.</p>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-stone-600">
              <thead className="text-xs text-stone-500 uppercase bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Company</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Products Offered</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {suppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-900">{s.companyName}</div>
                      {s.country && <div className="text-xs text-stone-400">{s.country}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-stone-900">{s.contactName}</div>
                      <div className="text-xs text-stone-500">
                        <a href={`mailto:${s.email}`} className="hover:underline">{s.email}</a>
                      </div>
                      {s.phone && (
                        <div className="text-xs text-stone-500">
                          <a href={`tel:${s.phone}`} className="hover:underline">{s.phone}</a>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{s.productsOffered}</div>
                      {s.message && <div className="text-xs text-stone-500 max-w-[240px] truncate">{s.message}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        s.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        s.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        'bg-stone-100 text-stone-700'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {suppliers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                      No supplier applications yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Contact Messages</h2>
            <p className="text-stone-500">Messages received from the contact form.</p>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-stone-600">
              <thead className="text-xs text-stone-500 uppercase bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Subject</th>
                  <th className="px-6 py-4 font-medium">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-900">
                      {msg.name}
                    </td>
                    <td className="px-6 py-4 text-stone-500">
                      {msg.email}
                    </td>
                    <td className="px-6 py-4 text-stone-900">
                      {msg.subject || '-'}
                    </td>
                    <td className="px-6 py-4">
                      {msg.message}
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                      No contact messages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

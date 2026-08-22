import { prisma } from '@/lib/prisma';

export default async function AdminInquiriesPage() {
  let quotes: any[] = [];
  let messages: any[] = [];
  try {
    quotes = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Fetch error", error);
  }

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Inquiries & Quotes</h2>
            <p className="text-stone-500">Manage wholesale import/export quote requests.</p>
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
                    <td className="px-6 py-4 font-medium text-stone-900">
                      {quote.type === 'Import' ? 'Buyer' : 'Seller'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-900">{quote.buyerName}</div>
                      <div className="text-xs text-stone-500">{quote.buyerEmail}</div>
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
                      No quote requests found.
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

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard, Package, Globe, MessageSquare, FileText, Settings, Users, ArrowLeft } from "lucide-react";
import AdminHeaderDropdown from "@/components/admin/AdminHeaderDropdown";
import { Header } from '@/components/layout/Header';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // Defence in depth. proxy.ts already turns unauthenticated requests away before
  // this renders; this guard covers the case where that matcher stops matching.
  // Note it cannot be the only check: a redirect thrown here still ships the
  // rendered page in the response body. See proxy.ts.
  if (!session) {
    redirect('/admin-login');
  }

  return (
    <>
      <Header isAdmin={true} adminName={session?.user?.name || 'Admin'} />
      <div className="min-h-screen bg-stone-100 flex font-sans pt-16 md:pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-stone-300 flex flex-col hidden md:flex h-screen sticky top-0">
        <div className="p-6 border-b border-stone-800">
          <Link href="/" className="text-white font-serif font-bold text-xl flex items-center gap-2 hover:text-primary transition-colors">
            <ArrowLeft size={16} /> KhasCom Admin
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3 text-sm">
            <li>
              <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-stone-800 hover:text-white transition-colors">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>

            <li>
              <Link href="/admin/inquiries" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-stone-800 hover:text-white transition-colors">
                <MessageSquare size={18} /> Inquiries & Quotes
              </Link>
            </li>
            <li>
              <Link href="/admin/blog" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-stone-800 hover:text-white transition-colors">
                <FileText size={18} /> Blog & Content
              </Link>
            </li>

          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-stone-200 flex items-center px-8 sticky top-0 z-10">
          <h1 className="font-semibold text-stone-800 text-lg">Admin Portal</h1>
          <div className="ml-auto flex items-center gap-4 text-sm">
            <AdminHeaderDropdown userName={session?.user?.name || 'Admin'} />
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
    </>
  );
}

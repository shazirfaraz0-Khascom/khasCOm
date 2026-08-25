"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown, Leaf, Carrot, ShoppingBag, Wheat, ShoppingBasket, Mountain, TreePalm, Sprout, User, LayoutDashboard, LogOut } from "lucide-react";

type MegaMenuItem = {
  name: string;
  href: string;
  description: string;
  icon: React.ElementType;
};

type NavLink = {
  name: string;
  href: string;
  megaMenu?: MegaMenuItem[];
};

export function Header({ isAdmin = false, adminName = 'Admin' }: { isAdmin?: boolean, adminName?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about-us" },
    { 
      name: "Products", 
      href: "/products",
      megaMenu: [
        { name: "Fresh Fruits", href: "/products/fresh-fruits", description: "Mangoes, citrus and seasonal fruits", icon: Leaf },
        { name: "Fresh Vegetables", href: "/products/fresh-vegetables", description: "Tinda, loki, arvi, onions and potatoes", icon: Carrot },
        { name: "Himalayan Salt", href: "/products/himalayan-salt", description: "Pink rock salt from the Khewra range", icon: Mountain },
        { name: "Dates", href: "/products/dates", description: "Aseel, Ajwa and dry dates in bulk", icon: TreePalm },
        { name: "Sesame & Oilseeds", href: "/products/seeds-oilseeds", description: "Natural, hulled and black sesame seeds", icon: Sprout },
        { name: "Dry Fruits & Nuts", href: "/products/dry-fruits", description: "High-quality nuts and dried fruits", icon: ShoppingBasket },
        { name: "Grains & Staples", href: "/products/grains", description: "Basmati rice, wheat and pulses", icon: Wheat },
        { name: "Poultry Products", href: "/products/poultry", description: "Fresh and frozen poultry items", icon: ShoppingBag },
      ]
    },
    { name: "Services", href: "/services" },
    { name: "Blogs", href: "/blog" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    // Solid white throughout. A shadow lifts the bar off the page once it starts
    // to overlap content.
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 py-1.5 transition-shadow duration-300 ${
        isScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.06)]" : "shadow-none"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" aria-label="KhasCom home" className="flex items-center z-50">
          <span className="block">
            <Image
              src="/images/logo-wordmark.webp"
              alt="KhasCom"
              width={900}
              height={224}
              priority
              sizes="(max-width: 1024px) 150px, 190px"
              className="h-8 lg:h-10 w-auto"
            />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 h-full">
          {navLinks.map((link) => (
            <div 
              key={link.name}
              className="relative group h-full flex items-center"
              onMouseEnter={() => link.megaMenu && setActiveDropdown(link.name)}
              onMouseLeave={() => link.megaMenu && setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-[#C8A14A] relative group/link flex items-center gap-1 py-4 ${
                  "text-[#1A1A1A]"
                }`}
              >
                {link.name}
                {link.megaMenu && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                )}
                <span className="absolute bottom-3 left-0 w-0 h-0.5 bg-[#C8A14A] transition-all group-hover/link:w-full rounded-full"></span>
              </Link>

              {link.megaMenu && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[480px] bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden"
                    >
                      {/* Invisible bridge to prevent mouse leave */}
                      <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-50">
                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Product Categories
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {link.megaMenu.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-[#14532D]/5 transition-all duration-300"
                              >
                                <div className="mt-0.5 w-8 h-8 rounded-full bg-[#C8A14A]/10 text-[#C8A14A] flex items-center justify-center group-hover/item:bg-[#C8A14A] group-hover/item:text-white transition-colors duration-300 shrink-0">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-900 group-hover/item:text-[#14532D] transition-colors">
                                    {item.name}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5 leading-tight group-hover/item:text-gray-600 transition-colors">
                                    {item.description}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-center">
                        <Link href={link.href} onClick={() => setActiveDropdown(null)} className="text-sm font-semibold text-[#14532D] hover:text-[#C8A14A] flex items-center gap-1.5 transition-colors group/viewall">
                          View all products <ChevronRight className="w-4 h-4 transition-transform group-hover/viewall:translate-x-1" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact-us/request-import-quote"
            className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 bg-[#14532D] text-white hover:bg-[#C8A14A] shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_25px_rgba(200,161,74,0.3)] hover:-translate-y-0.5"
          >
            Request Quote
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {isAdmin && (
            <div className="relative group/admin cursor-pointer ml-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-[#14532D]/10 text-[#14532D] hover:bg-[#14532D]/20`}>
                <User className="w-5 h-5" />
              </div>
              <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover/admin:opacity-100 group-hover/admin:visible transition-all duration-300 z-50">
                <div className="w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
                  <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-sm font-semibold text-gray-900">{adminName}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#14532D] rounded-lg transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link href="/api/auth/signout" className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <LogOut className="w-4 h-4" /> Logout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-[#1A1A1A]" />
          ) : (
            <Menu className="w-6 h-6 text-[#1A1A1A]" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 lg:hidden overflow-hidden"
          >
            <nav className="flex flex-col py-6 px-6 gap-2 max-h-[75vh] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-gray-50 last:border-0 pb-2">
                  {link.megaMenu ? (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between py-2">
                        <Link 
                          href={link.href} 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-lg font-medium text-[#1A1A1A] hover:text-[#14532D] transition-colors"
                        >
                          {link.name}
                        </Link>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveDropdown(activeDropdown === link.name ? null : link.name);
                          }}
                          className="p-2 text-gray-500 hover:text-[#14532D]"
                        >
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 border-l-2 border-[#C8A14A]/30 ml-2 mt-1 mb-3 flex flex-col gap-3">
                              {link.megaMenu.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 text-base text-gray-600 hover:text-[#14532D] transition-colors py-1 group/mobitem"
                                  >
                                    <div className="w-6 h-6 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center group-hover/mobitem:bg-[#C8A14A]/10 group-hover/mobitem:text-[#C8A14A] transition-colors shrink-0">
                                      <Icon className="w-3 h-3" />
                                    </div>
                                    <span className="font-medium text-sm">{item.name}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-[#1A1A1A] hover:text-[#14532D] transition-colors py-2 block"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/contact-us/request-import-quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#14532D] text-white px-6 py-3.5 text-base font-semibold hover:bg-[#0f3d20] transition-colors shadow-lg"
              >
                Request Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


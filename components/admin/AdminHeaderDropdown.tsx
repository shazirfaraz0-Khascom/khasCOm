"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, ChevronDown, User } from "lucide-react";

export default function AdminHeaderDropdown({ userName }: { userName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-stone-100 transition-colors border border-transparent hover:border-stone-200"
      >
        <div className="w-8 h-8 rounded-full bg-[#14532D] text-white flex items-center justify-center">
          <User size={16} />
        </div>
        <span className="text-stone-700 font-medium">{userName}</span>
        <ChevronDown size={16} className={`text-stone-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-stone-100 bg-stone-50">
            <p className="text-sm font-medium text-stone-900">{userName}</p>
            <p className="text-xs text-stone-500 truncate">Administrator</p>
          </div>
          <div className="p-1">
            <Link 
              href="/api/auth/signout" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors w-full"
            >
              <LogOut size={16} /> Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

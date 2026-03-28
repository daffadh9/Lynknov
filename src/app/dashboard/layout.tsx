"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  UserCircle, 
  Briefcase, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Halaman Saya", href: "/dashboard/profile", icon: UserCircle },
    { name: "Offers", href: "/dashboard/offers", icon: Briefcase },
    { name: "Leads", href: "/dashboard/leads", icon: Users },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-surface-base)] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col hidden md:flex shrink-0 fixed inset-y-0 z-20 bg-[var(--color-surface-base)]">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <Link href="/dashboard" className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
            </div>
            Lynknov
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname?.startsWith(item.href + '/') && item.href !== '/dashboard');
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-white/[0.04] text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]' 
                    : 'text-[var(--color-text-secondary)] hover:bg-white/[0.02] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#a78bfa]' : 'group-hover:text-white/70'}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/[0.02] transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 shrink-0">
              <span className="text-xs font-medium text-white/80">DS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Daffa Studio</p>
              <p className="text-xs text-[var(--color-text-secondary)] truncate">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

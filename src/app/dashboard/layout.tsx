"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UserCircle,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Halaman Saya", href: "/dashboard/profile", icon: UserCircle },
  { name: "Offers", href: "/dashboard/offers", icon: Briefcase },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const SIDEBAR_EXPANDED = 256;
const SIDEBAR_COLLAPSED = 68;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initials, setInitials] = useState("LK");
  const [logoutLoading, setLogoutLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read localStorage preference + load user data
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration guard
    setMounted(true);
    const saved = localStorage.getItem("lynknov:sidebar-collapsed");
    if (saved === "true") setCollapsed(true);

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase
        .from("profiles")
        .select("avatar_url, full_name")
        .eq("id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data?.avatar_url) setAvatarUrl(data.avatar_url);
          const name = data?.full_name || user.email || "";
          const parts = name.trim().split(/\s+/);
          setInitials(
            parts.length >= 2
              ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
              : name.slice(0, 2).toUpperCase()
          );
        });
    });
  }, []);

  // Persist collapsed state
  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("lynknov:sidebar-collapsed", String(next));
      return next;
    });
    setDropdownOpen(false);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    setDropdownOpen(false);
    try {
      const supabase = createClient();
      await supabase.auth.signOut({ scope: "local" });
      router.push("/login");
    } catch {
      setLogoutLoading(false);
    }
  };

  const sidebarW = mounted ? (collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED) : SIDEBAR_EXPANDED;

  return (
    <div className="min-h-screen bg-[var(--color-surface-base)] text-white flex">
      {/* ─── Sidebar ─────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col fixed inset-y-0 z-30 bg-[var(--color-surface-base)] border-r border-white/[0.05]"
        style={{ width: sidebarW, transition: "width 200ms cubic-bezier(0.4,0,0.2,1)" }}
      >
        {/* Always-visible edge toggle — sits on the right border of the sidebar */}
        <button
          onClick={toggleCollapsed}
          title={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
          className="absolute -right-3 top-[50px] w-6 h-6 rounded-full bg-[var(--color-surface-base)] border border-white/[0.12] flex items-center justify-center z-50 hover:bg-white/[0.08] hover:border-white/[0.25] transition-all duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        >
          {collapsed
            ? <ChevronRight className="w-3 h-3 text-white/55" />
            : <ChevronLeft className="w-3 h-3 text-white/55" />}
        </button>

        {/* Logo row */}
        <div
          className="h-[76px] flex items-center border-b border-white/[0.05] shrink-0 overflow-hidden"
          style={{ padding: collapsed ? "0" : "0 16px" }}
        >
          {collapsed ? (
            /* Collapsed: centered logo icon — decorative only */
            <div className="w-full h-full flex items-center justify-center">
              <Image src="/images/icon_lynknov_transparan.png" alt="Lynknov Logo" width={40} height={40} className="drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]" />
            </div>
          ) : (
            /* Expanded: logo + name */
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="relative shrink-0">
                <Image src="/images/icon_lynknov_transparan.png" alt="Lynknov Logo" width={44} height={44} className="drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 group-hover:scale-105" />
              </div>
              <span className="text-[20px] font-semibold tracking-tight text-white whitespace-nowrap select-none">
                Lynknov
              </span>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden" style={{ padding: collapsed ? "16px 10px" : "16px 10px" }}>
          <div className="flex flex-col gap-0.5">
            {NAV.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname?.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={collapsed ? item.name : undefined}
                  className={`relative flex items-center rounded-xl transition-all duration-150 overflow-hidden ${
                    collapsed ? "justify-center h-10 w-full" : "gap-3 px-3 py-2.5"
                  } ${
                    isActive
                      ? "bg-white/[0.06] text-white"
                      : "text-white/40 hover:text-white/80 hover:bg-white/[0.03]"
                  }`}
                >
                  {/* active bar */}
                  {isActive && !collapsed && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-[#a78bfa]" />
                  )}
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 transition-colors duration-150 ${
                      isActive ? "text-[#a78bfa]" : "text-current"
                    }`}
                  />
                  {!collapsed && (
                    <span className="text-sm font-medium leading-none">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Avatar footer */}
        <div
          className="shrink-0 border-t border-white/[0.05]"
          style={{ padding: collapsed ? "10px" : "10px" }}
          ref={dropdownRef}
        >
          {/* Dropdown */}
          {dropdownOpen && (
            <div
              className="absolute bottom-[68px] bg-[#1a1a1f] border border-white/[0.08] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50"
              style={
                collapsed
                  ? { left: SIDEBAR_COLLAPSED + 8, width: 184 }
                  : { left: 12, right: 12 }
              }
            >
              <div className="p-1.5 flex flex-col gap-0.5">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.05] transition-all duration-150"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-white/35 shrink-0" />
                  Lihat Profil
                </Link>
                <div className="h-px bg-white/[0.05] mx-2" />
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/75 hover:text-red-400 hover:bg-red-500/[0.07] transition-all duration-150 disabled:opacity-50"
                >
                  {logoutLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                  ) : (
                    <LogOut className="w-3.5 h-3.5 shrink-0" />
                  )}
                  {logoutLoading ? "Keluar..." : "Keluar"}
                </button>
              </div>
            </div>
          )}

          {/* Avatar button */}
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className={`w-full flex items-center rounded-xl hover:bg-white/[0.04] transition-all duration-150 ${
              collapsed ? "justify-center h-10 p-0" : "gap-3 px-2 py-2"
            } ${dropdownOpen ? "bg-white/[0.04]" : ""}`}
            title={collapsed ? "Menu akun" : undefined}
          >
            <div
              className={`relative shrink-0 transition-all duration-150 ${
                dropdownOpen ? "ring-2 ring-[#a78bfa]/40 ring-offset-1 ring-offset-[var(--color-surface-base)]" : ""
              } rounded-full`}
            >
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500/25 to-blue-500/20 flex items-center justify-center border border-white/[0.1]">
                  <span className="text-[11px] font-semibold text-white/75 leading-none">{initials}</span>
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border-[1.5px] border-[var(--color-surface-base)]" />
            </div>
            {!collapsed && (
              <ChevronRight
                className={`w-3.5 h-3.5 text-white/20 ml-auto transition-transform duration-150 ${
                  dropdownOpen ? "rotate-90" : ""
                }`}
              />
            )}
          </button>
        </div>
      </aside>

      {/* ─── Main content ──────────────────────────────── */}
      <div
        className="flex-1 flex flex-col min-w-0"
        style={{
          marginLeft: mounted ? sidebarW : SIDEBAR_EXPANDED,
          transition: "margin-left 200ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

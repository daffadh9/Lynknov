export const publicSiteNav = [
  { label: "Produk", href: "/features" },
  { label: "Demo", href: "/demo" },
  { label: "Tentang", href: "/about" },
  { label: "Changelog", href: "/changelog" },
] as const;

import {
  LayoutDashboard,
  UserCircle,
  Settings,
  ShoppingBag,
  Users,
  BarChart3,
  HardDrive,
} from "lucide-react";

export const appPrimaryNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Editor", href: "/editor", icon: UserCircle },
  { name: "Assets", href: "/asset", icon: HardDrive },
  { name: "Offers", href: "/dashboard/offers", icon: ShoppingBag },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
] as const;

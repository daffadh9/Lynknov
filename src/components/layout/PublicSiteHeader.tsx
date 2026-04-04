import Image from "next/image";
import Link from "next/link";
import { publicSiteNav } from "@/lib/site-navigation";

interface PublicSiteHeaderProps {
  activeHref?: string;
}

function isNavActive(activeHref: string | undefined, href: string) {
  if (!activeHref) return false;
  if (href === "/") return activeHref === "/";
  return activeHref === href || activeHref.startsWith(`${href}/`);
}

export function PublicSiteHeader({ activeHref }: PublicSiteHeaderProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6 md:h-20 lg:px-12">
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex items-center gap-3.5">
            <div className="relative flex h-14 w-14 items-center justify-center transition-all duration-300 group-hover:scale-105">
              <div className="absolute inset-0 scale-150 rounded-full bg-white/10 opacity-0 blur-[10px] transition-opacity duration-300 group-hover:opacity-100" />
              <Image
                src="/images/icon_lynknov_transparan.png"
                alt="Lynknov Logo"
                width={56}
                height={56}
                className="relative z-10 h-full w-full object-contain brightness-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              />
            </div>
            <span className="bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-[32px] font-semibold tracking-tight text-transparent">
              Lynknov
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--color-text-secondary)] md:flex">
            {publicSiteNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isNavActive(activeHref, item.href) ? "text-white" : "transition-colors hover:text-white"}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-white sm:block"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Mulai Bangun
          </Link>
        </div>
      </div>
    </header>
  );
}

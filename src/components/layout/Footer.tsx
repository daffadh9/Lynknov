import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0b] border-t border-white/[0.05] pt-16 pb-8 px-6 lg:px-12 relative z-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">
          
          {/* Brand Column (takes up 2 columns space on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-4 group w-fit">
              <div className="relative w-14 h-14 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                <Image src="/images/icon_lynknov_transparan.png" alt="Lynknov Logo" width={56} height={56} className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
              </div>
              <span className="text-3xl font-semibold tracking-tight text-white select-none">
                Lynknov
              </span>
            </Link>
            
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-[380px] mt-2">
              Interactive Business OS untuk membangun, mengelola, dan mengembangkan kehadiran digital secara lebih terstruktur.
            </p>
            
            <a href="mailto:hallo@lynknov.com" className="text-[15px] font-medium text-white/80 hover:text-white transition-colors inline-block mt-2">
              hallo@lynknov.com
            </a>
          </div>

          {/* Product Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[13px] font-semibold tracking-wider uppercase text-white/90 mb-1">Product</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/features" className="text-[14px] text-[var(--color-text-secondary)] hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/demo" className="text-[14px] text-[var(--color-text-secondary)] hover:text-white transition-colors">Demo</Link></li>
              <li><Link href="/changelog" className="text-[14px] text-[var(--color-text-secondary)] hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[13px] font-semibold tracking-wider uppercase text-white/90 mb-1">Company</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-[14px] text-[var(--color-text-secondary)] hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-[14px] text-[var(--color-text-secondary)] hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[13px] font-semibold tracking-wider uppercase text-white/90 mb-1">Legal</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/terms" className="text-[14px] text-[var(--color-text-secondary)] hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-[14px] text-[var(--color-text-secondary)] hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookie" className="text-[14px] text-[var(--color-text-secondary)] hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="text-[14px] text-[var(--color-text-secondary)] hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.05]">
          <p className="text-[13px] text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} Lynknov. All rights reserved.
          </p>
          <p className="text-[13px] text-[var(--color-text-tertiary)] font-medium">
            Built for creators, professionals, and digital businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}



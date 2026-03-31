import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export default function LegalLayout({ children, title, subtitle, lastUpdated }: { children: React.ReactNode, title: string, subtitle: string, lastUpdated?: string }) {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,0.08),transparent_70%)] pointer-events-none"></div>

      {/* Top Navbar Simple */}
      <nav className="h-20 border-b border-white/[0.05] flex items-center px-6 lg:px-12 sticky top-0 bg-[#0a0a0b]/80 backdrop-blur-xl z-50">
        <div className="max-w-[1200px] mx-auto w-full flex items-center">
          <Link href="/" className="flex items-center gap-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors group w-fit">
            <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Kembali ke Beranda
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center py-16 lg:py-24 px-6 relative z-10">
        <div className="w-full max-w-[840px]">
          
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center gap-6 mb-16 px-4">
            {lastUpdated && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#a78bfa]/10 border border-[#a78bfa]/20 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] animate-pulse"></div>
                <span className="text-[13px] font-medium text-[#a78bfa]">Update terakhir: {lastUpdated}</span>
              </div>
            )}
            <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-white drop-shadow-sm">{title}</h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-[640px] font-normal">
              {subtitle}
            </p>
          </div>

          {/* Premium Content Shell */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[32px] blur-sm -z-10"></div>
            <div className="bg-[#121214]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-12 lg:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
              <div className="prose prose-invert prose-p:text-[var(--color-text-secondary)] prose-p:leading-relaxed prose-headings:text-white prose-headings:font-medium prose-headings:tracking-tight prose-a:text-[#a78bfa] hover:prose-a:text-[#c4b5fd] prose-a:transition-colors prose-ul:text-[var(--color-text-secondary)] prose-li:my-1.5 prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-2xl prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-4 max-w-none">
                {children}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

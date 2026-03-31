"use client";

import { ProfileData } from "../types/profile";
import { Quote, Star } from "lucide-react";
import { AnimatedTitle } from "../ui/animated-title";
import { ScrollReveal } from "../ui/scroll-reveal";

interface TestimonialsSectionProps {
  profile: ProfileData;
}

export function TestimonialsSection({ profile }: TestimonialsSectionProps) {
  if (!profile.testimonials || profile.testimonials.length === 0) return null;

  const featuredTestimonial = profile.testimonials[0];
  const supportingTestimonials = profile.testimonials.slice(1);

  // Distribute over exactly 2 rows
  const partSize = Math.ceil(supportingTestimonials.length / 2);
  const rows = [
    supportingTestimonials.slice(0, partSize),
    supportingTestimonials.slice(partSize)
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-gradient-to-b from-[#0A0A0C] via-[#050505] to-[#0A0A0C] overflow-hidden border-none text-white z-10 transition-colors">
      {/* 
        PREMIUM BACKGROUND (Family 6) — Quiet Trust Space
        Lebih bersih, no grid, soft central vignette glow
      */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015),transparent_60%)] pointer-events-none blur-[80px] z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iMSIgZmlsbD0id2hpXRlIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>

      <div className="mx-auto max-w-[1240px] px-6 md:px-12 xl:px-16 relative z-10">
        
        {/* Curated Header */}
        <ScrollReveal className="flex flex-col items-center text-center mb-16 md:mb-24">
          <AnimatedTitle 
            title="Testimoni"
            as="h2"
            className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-white mb-6 leading-[1.05] font-serif"
          />
        </ScrollReveal>

        {/* The Masterpiece Featured Quote */}
        <ScrollReveal delay={0.2} className="flex justify-center mb-16 md:mb-24">
          
          <div className="relative w-full max-w-[850px] p-8 md:p-14 rounded-[2.5rem] bg-[#111114]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.6)] text-center flex flex-col items-center group overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-[1.5s] pointer-events-none"></div>
            
            <Quote className="w-10 h-10 text-zinc-700 mb-8 group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
            
            <p className="text-xl md:text-2xl lg:text-3xl text-white leading-[1.5] font-normal tracking-tight mb-8 relative z-10 font-serif text-balance">
                &quot;{featuredTestimonial.quote}&quot;
            </p>
            
            <div className="flex flex-col items-center relative z-10">
              <span className="text-base font-bold text-white mb-1 tracking-tight">{featuredTestimonial.author}</span>
              <span className="text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-semibold">{featuredTestimonial.role}</span>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* 
        Marquee Stage (Full Bleed)
        Soft vignette on edges.
      */}
      <ScrollReveal 
        delay={0.4}
        className="w-full relative py-12 overflow-hidden z-10"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="flex flex-col gap-6 min-w-full">
          
          {/* Row 1 - Move Left */}
          {rows[0] && rows[0].length > 0 && (
            <div className="flex w-max gap-6 animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] pl-6">
               {Array(8).fill(rows[0]).flat().map((t, i) => (
                <div key={`r1-${i}`} className="w-[300px] shrink-0 p-8 rounded-[2rem] bg-[#111114]/80 backdrop-blur-md border border-white/[0.05] flex flex-col justify-between hover:bg-[#15151A] hover:border-white/[0.1] hover:-translate-y-1 transition-all duration-500 cursor-default relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.015] blur-[40px] pointer-events-none rounded-full"></div>
                  <div className="flex gap-1 mb-4 opacity-40 group-hover:opacity-80 transition-opacity">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-3.5 h-3.5 fill-zinc-500 text-zinc-500 group-hover:fill-amber-500 group-hover:text-amber-500 transition-colors duration-500 delay-75" />)}
                  </div>
                  <p className="text-[13px] text-zinc-400 font-medium leading-[1.6] mb-6 relative z-10 group-hover:text-zinc-300 transition-colors">&quot;{t.quote}&quot;</p>
                  <div className="relative z-10">
                    <span className="block text-sm font-bold text-white mb-1">{t.author}</span>
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Row 2 - Move Right */}
          {rows[1] && rows[1].length > 0 && (
            <div className="flex w-max gap-6 animate-[marquee-reverse_25s_linear_infinite] hover:[animation-play-state:paused] pr-6 ml-[-150px]">
               {Array(8).fill(rows[1]).flat().map((t, i) => (
                <div key={`r2-${i}`} className="w-[300px] shrink-0 p-8 rounded-[2rem] bg-[#0F0F12]/80 backdrop-blur-md border border-white/[0.03] flex flex-col justify-between hover:bg-[#15151A] hover:border-white/[0.1] hover:-translate-y-1 transition-all duration-500 cursor-default relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] blur-[40px] pointer-events-none rounded-full"></div>
                  
                  <div className="flex gap-1 mb-4 opacity-30 group-hover:opacity-80 transition-opacity">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-3.5 h-3.5 fill-zinc-500 text-zinc-500 group-hover:fill-amber-500 group-hover:text-amber-500 transition-colors duration-500 delay-75" />)}
                  </div>
                  <p className="text-[13px] text-zinc-400 font-medium leading-[1.6] mb-6 relative z-10 group-hover:text-zinc-300 transition-colors">&quot;{t.quote}&quot;</p>
                  <div className="relative z-10">
                    <span className="block text-sm font-bold text-white mb-1">{t.author}</span>
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </ScrollReveal>
    </section>
  );
}

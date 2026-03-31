"use client";

import { ProfileData } from "../types/profile";
import { MoveRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../ui/scroll-reveal";
import { AnimatedTitle } from "../ui/animated-title";

interface AboutSectionProps {
  profile: ProfileData;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-b from-transparent to-[#0A0A0C] border-none">
      {/* 
        PREMIUM BACKGROUND (Family 2) — Soft Digital Mesh
        Micro-grid dengan glow biru gelap. Transisi bleed dari hero.
      */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/[0.03] rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', 
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
        }}>
      </div>
      
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 xl:px-16 relative z-10 flex items-center h-full">
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16 text-white w-full">
          
          {/* Main Statement Focus (Left) */}
          <div className="lg:col-span-7 flex flex-col justify-center pb-12 lg:pb-0 relative border-b lg:border-b-0 lg:border-r border-white/[0.03] lg:pr-16">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-zinc-600"></span>
              About Me
            </h2>
            
            <div className="relative pl-8 md:pl-10">
              {/* Premium Quote Mark Line */}
              <div className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-zinc-600 via-zinc-800 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>
              
              <AnimatedTitle 
                title="Creatorpreneur."
                as="h3"
                className="text-3xl md:text-4xl lg:text-[2.5rem] font-serif font-medium tracking-tight leading-[1.2] text-white mb-6"
              />
              
              <p className="text-lg md:text-xl leading-[1.7] text-zinc-300 font-medium tracking-tight text-balance">
                {profile.about.statement}
              </p>
            </div>
            
            {/* New Button replacing Name */}
            <div className="mt-16 pl-8 md:pl-10">
              <a href="#more" className="group inline-flex items-center gap-4 text-xs tracking-[0.2em] font-bold text-zinc-400 uppercase hover:text-white transition-colors">
                Lihat Selengkapnya 
                <div className="w-10 h-10 rounded-full border border-white/[0.1] bg-white/[0.02] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <MoveRight className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>
          
          {/* Supporting Details & Interface Fragments (Right) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-8 lg:pl-8">
            
            {/* Unified Note Box */}
            <div className="relative p-8 md:p-10 rounded-[2rem] bg-[#121214]/60 backdrop-blur-md border border-white/[0.05] group hover:border-white/[0.1] hover:bg-[#121214] transition-all duration-500 shadow-xl overflow-hidden">
               {/* Ambient Glow */}
               <div className="absolute -top-[50%] -right-[50%] w-full h-full bg-gradient-to-bl from-white/[0.03] to-transparent rounded-full blur-3xl group-hover:from-white/[0.05] transition-all duration-700"></div>

               {profile.about.notes?.[0] && (
                 <div className="relative z-10 flex flex-col gap-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
                      {profile.about.notes[0].title}
                    </span>
                    <p className="text-[15px] md:text-base text-zinc-300 font-normal leading-[1.7]">
                      {profile.about.notes[0].content}
                    </p>
                 </div>
               )}
            </div>

            {/* Location Coordinate Fragment */}
            <div className="p-6 rounded-2xl bg-transparent border border-white/[0.03] flex items-center justify-between group cursor-default hover:bg-white/[0.02] transition-colors relative overflow-hidden">
              <div className="flex flex-col gap-1.5 relative z-10">
                <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-bold">Lokasi</span>
                <span className="text-[13px] md:text-sm text-zinc-300 font-semibold">{profile.about.base}</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/[0.05] flex items-center justify-center bg-[#0A0A0A] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all">
                <MapPin className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" strokeWidth={2} />
              </div>
            </div>

          </div>
          
        </ScrollReveal>
      </div>
    </section>
  );
}

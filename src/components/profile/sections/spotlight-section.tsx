"use client";

import Image from "next/image";
import { ProfileData } from "../types/profile";
import { motion } from "framer-motion";
import { AnimatedTitle } from "../ui/animated-title";

interface SpotlightSectionProps {
  profile: ProfileData;
}

export function SpotlightSection({ profile }: SpotlightSectionProps) {
  if (!profile.spotlights || profile.spotlights.length === 0) return null;

  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-b from-[#0A0A0C] via-[#050505] to-[#0A0A0C] z-20 border-none">
      
      {/* Background Family 3 — Spotlight Soft Stage Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/[0.02] blur-[100px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none z-0"></div>

      <div className="mx-auto max-w-[1240px] px-6 md:px-12 xl:px-16 flex flex-col items-center relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center mb-10">
          <AnimatedTitle 
            title="Spotlight"
            as="h2"
            className="text-2xl md:text-3xl font-bold tracking-tight text-white/90 font-serif"
          />
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent mt-2"></div>
        </div>
        
        {/* Container: Garis Hitam Panjang / Dark Dock */}
        <div className="relative w-full max-w-full rounded-[2rem] bg-gradient-to-b from-[#0A0A0C] to-[#08080A] border border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_2px_10px_rgba(255,255,255,0.02)] pt-8 pb-4 px-4 overflow-hidden before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iMSIgZmlsbD0id2hpXRlIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] before:opacity-50">
          
          <div className="relative z-10 flex items-start justify-start md:justify-center gap-6 md:gap-10 lg:gap-14 overflow-x-auto w-full pb-8 pt-4 px-4 scrollbar-hide snap-x" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            
            {profile.spotlights.slice(0, 6).map((spotlight, i) => (
              <motion.button
                key={spotlight.id}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-5 shrink-0 group snap-center relative"
                onClick={() => alert(`Open Spotlight: ${spotlight.title}`)}
              >
                {/* Floating Shadow Below Circle */}
                <div className="absolute top-[80px] w-16 h-4 bg-black/60 blur-md rounded-[100%] group-hover:bg-emerald-500/20 group-hover:w-20 transition-all duration-700 pointer-events-none"></div>

                {/* Highlight Ring Custom Premium - Fixed Size & Frame Cutoff */}
                <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] rounded-full p-[2px] bg-gradient-to-tr from-zinc-800 via-zinc-600 to-zinc-400 group-hover:from-emerald-400 group-hover:via-white group-hover:to-blue-500 transition-all duration-700 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] group-hover:-translate-y-2 ring-4 ring-[#08080A]">
                  <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center p-[4px]">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900 border border-black shadow-inner">
                      <Image
                        src={spotlight.coverUrl}
                        alt={spotlight.title}
                        fill
                        sizes="150px"
                        className="object-cover group-hover:scale-110 transition-all duration-700 ease-out saturate-100 group-hover:saturate-[1.2]"
                      />
                    </div>
                  </div>
                </div>
                
                <span className="text-[11px] md:text-xs font-bold text-zinc-400 group-hover:text-white transition-colors text-center w-[90px] md:w-[100px] break-words line-clamp-2 leading-tight drop-shadow-md z-10 transition-transform duration-700 group-hover:-translate-y-1">
                  {spotlight.title}
                </span>
              </motion.button>
            ))}
            
          </div>
        </div>
        
      </div>
    </section>
  );
}

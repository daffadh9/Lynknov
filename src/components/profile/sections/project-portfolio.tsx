"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProfileData } from "../types/profile";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedTitle } from "../ui/animated-title";
import { ScrollReveal } from "../ui/scroll-reveal";

interface ProjectPortfolioSectionProps {
  profile: ProfileData;
}

export function ProjectPortfolioSection({ profile }: ProjectPortfolioSectionProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!profile.highlights || profile.highlights.length === 0) return null;
  
  const featuredItem = profile.highlights[featuredIndex];
  
  // YouTube-style queue
  const queueItems = profile.highlights.filter((_, idx) => idx !== featuredIndex).slice(0, 5);

  const handlePrev = () => {
    setIsExpanded(false);
    setFeaturedIndex((prev) => (prev === 0 ? profile.highlights.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsExpanded(false);
    setFeaturedIndex((prev) => (prev === profile.highlights.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full py-20 md:py-32 bg-gradient-to-b from-[#050505] to-[#0A0A0C] overflow-hidden border-none text-white z-10 transition-colors">
      {/* 
        PREMIUM BACKGROUND — Project & Portfolio Surface
        Clean dark layered surface, panel depth
      */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute inset-x-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgoJPHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iMSIgZmlsbD0id2hpXRlIiBmaWxsLW9wYWNpdHk9IjAuMTAiLz4KPC9zdmc+')] opacity-40 z-0 pointer-events-none mix-blend-overlay"></div>

      <div className="mx-auto max-w-[1300px] px-6 md:px-12 xl:px-16 relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Focus Header */}
        {/* Focus Header */}
        <ScrollReveal className="flex flex-col">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-zinc-600"></span>
            Proof of Work
          </h2>
          <AnimatedTitle 
            title="Project & Portfolio"
            as="h3"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.05] font-serif"
          />
          <p className="text-base md:text-lg text-zinc-400 font-medium leading-[1.6] text-balance max-w-2xl">
            Beberapa project dan portfolio terpilih sebagai bukti cara saya membangun produk digital yang relevan, rapi, dan bernilai untuk calon client.
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2} className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
          {/* Main Featured Spotlight (Left side) */}
          <div className="w-full lg:w-[65%] flex flex-col gap-6">
            
            <div className="relative w-full aspect-[16/9] md:aspect-[3/2] bg-[#0A0A0A] rounded-[2rem] border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden group/stage perspective-1000 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredItem.id}
                  initial={{ opacity: 0, x: -30, filter: "blur(5px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <Image
                    src={featuredItem.imageUrl}
                    alt={featuredItem.title}
                    fill
                    className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/stage:scale-[1.02] filter contrast-[1.05] opacity-90 mix-blend-luminosity group-hover/stage:mix-blend-normal"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    priority
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] pointer-events-none mix-blend-multiply opacity-50"></div>
                </motion.div>
              </AnimatePresence>

              {/* Spotlight Navigators overlay on edge inner */}
              <div onClick={(e) => e.stopPropagation()}>
                <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#111114]/80 border border-white/[0.1] text-white hover:bg-white hover:text-black opacity-0 group-hover/stage:opacity-100 transform -translate-x-2 group-hover/stage:translate-x-0 transition-all duration-300 backdrop-blur-md shadow-2xl z-30">
                   <ArrowLeft className="w-5 h-5" strokeWidth={2} />
                </button>
                <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#111114]/80 border border-white/[0.1] text-white hover:bg-white hover:text-black opacity-0 group-hover/stage:opacity-100 transform translate-x-2 group-hover/stage:translate-x-0 transition-all duration-300 backdrop-blur-md shadow-2xl z-30">
                   <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>

            </div>

            {/* Expander Panel */}
            <div className="flex flex-col w-full bg-[#111114] border border-white/[0.05] rounded-[2rem] p-6 shadow-lg z-20 relative">
              
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                  <div className="flex flex-col gap-1 pr-6">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1 hover:text-zinc-300 transition-colors">
                      {featuredItem.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[10px] md:text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded-sm">
                        {featuredItem.category}
                      </span>
                      {featuredItem.date && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                          <span className="text-[10px] md:text-xs text-zinc-500 font-medium tracking-widest uppercase">{featuredItem.date}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button className="shrink-0 w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.1] transition-all">
                     {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                      <div className="flex flex-col pt-6 mt-6 border-t border-white/[0.05]">
                        <p className="text-[15px] md:text-base text-zinc-400 font-medium leading-[1.6] mb-8 max-w-[90%]">
                          {featuredItem.description}
                        </p>
                        
                        <Link 
                          href={featuredItem.link}
                          className="inline-flex h-12 px-8 items-center justify-center rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-transform self-start shadow-xl"
                        >
                          Lihat Project
                        </Link>
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Supporting Project Queue (Vertical Youtube-like Column with timeline tracker) */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6 relative">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 border-b border-white/[0.05] pb-4 shrink-0 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-pulse"></span>
              Up Next
            </h4>
            
            {/* The Timeline Track line */}
            <div className="absolute left-[8px] md:left-[10px] top-[48px] bottom-6 w-[2px] bg-white/[0.03] rounded-full z-0 hidden sm:block"></div>

            <div className="flex flex-col gap-5 relative z-10 w-full pl-0 sm:pl-6 md:pl-8">
              <AnimatePresence mode="popLayout">
                {queueItems.map((item, localDisplayIndex) => (
                  <motion.div
                    key={item.id}
                    layout 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: localDisplayIndex * 0.1 }}
                    className="relative"
                  >
                    {/* The timeline dot connecting the queue item */}
                    <div className="absolute -left-[22px] md:-left-[28px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-zinc-600 bg-[#0A0A0A] hidden sm:block"></div>

                    <button
                      onClick={() => {
                        setIsExpanded(false);
                        setFeaturedIndex(profile.highlights.findIndex(h => h.id === item.id));
                      }}
                      className="w-full group flex flex-row items-center gap-4 md:gap-5 text-left p-2.5 md:p-3 rounded-[1.5rem] bg-transparent hover:bg-[#111114] border border-transparent hover:border-white/[0.05] transition-all cursor-pointer relative overflow-hidden"
                    >
                      {/* Visual Preview (Thumbnail) */}
                      <div className="relative w-[110px] md:w-[140px] aspect-[16/9] shrink-0 rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/[0.08]">
                         <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover opacity-60 transition-all duration-[1s] group-hover:scale-110 group-hover:opacity-100 blur-[1px] group-hover:blur-0"
                          sizes="(max-width: 768px) 110px, 140px"
                        />
                        
                        {/* View Hover Badge */}
                        <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-400 delay-75 shadow-lg border border-white/[0.1]">
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Meta Stack */}
                      <div className="flex flex-col flex-1 justify-center py-1 h-full gap-1">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                          {item.category}
                        </p>
                        <h4 className="text-[13px] md:text-sm font-bold text-white group-hover:text-zinc-300 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        {item.date && (
                          <p className="text-[9px] md:text-[10px] text-zinc-500 font-medium">
                            {item.date}
                          </p>
                        )}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
        </ScrollReveal>
      </div>
    </section>
  );
}

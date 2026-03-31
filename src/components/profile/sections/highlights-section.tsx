"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProfileData, Highlight } from "../types/profile";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HighlightsSectionProps {
  profile: ProfileData;
}

export function HighlightsSection({ profile }: HighlightsSectionProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  if (!profile.highlights || profile.highlights.length === 0) return null;
  
  const handleNext = () => {
    setFeaturedIndex((prev) => (prev + 1) % profile.highlights.length);
  };

  const handlePrev = () => {
    setFeaturedIndex((prev) => (prev - 1 + profile.highlights.length) % profile.highlights.length);
  };

  const handleSelect = (index: number) => {
    setFeaturedIndex(index);
  };

  const featuredItem = profile.highlights[featuredIndex];
  
  const queueItems: Highlight[] = [];
  for (let i = 1; i < profile.highlights.length; i++) {
    const idx = (featuredIndex + i) % profile.highlights.length;
    queueItems.push({ ...profile.highlights[idx], _originalIndex: idx } as Highlight & { _originalIndex: number });
  }

  return (
    <section className="relative w-full py-32 md:py-48 overflow-hidden bg-[#030303]">
      {/* Background Identity for Projects */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-[#0A0A0A] to-transparent pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Projects
          </h2>
          <div className="w-12 h-[2px] bg-white/[0.2]"></div>
        </div>
        
        <div className="relative">
          {/* External Nav - Left */}
          <button 
            onClick={handlePrev}
            className="absolute -left-4 md:-left-8 top-[35%] -translate-y-1/2 z-30 p-3 rounded-full bg-white/[0.03] border border-white/[0.05] text-white backdrop-blur-md hover:bg-white/[0.1] transition-all duration-300 hidden sm:flex"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[650px]">
            
            {/* Main Featured Showcase (Left) */}
            <div className="lg:col-span-8 relative flex flex-col group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col h-full"
                >
                  {/* Image Frame */}
                  <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-none bg-[#0A0A0A] border border-white/[0.08] overflow-hidden mb-8 shadow-2xl">
                    <Image
                      src={featuredItem.imageUrl}
                      alt={featuredItem.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent opacity-60"></div>
                  </div>

                  {/* Content & Metadata */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                          {featuredItem.category}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                        {featuredItem.title}
                      </h3>
                      <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl">
                        {featuredItem.description}
                      </p>
                    </div>

                    {/* Metadata Panel */}
                    {featuredItem.metadata && (
                      <div className="flex flex-col gap-6 min-w-[200px] shrink-0 p-6 bg-[#0A0A0A] border border-white/[0.05]">
                        {featuredItem.metadata.role && (
                          <div>
                            <span className="block text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Role</span>
                            <span className="block text-sm font-medium text-white">{featuredItem.metadata.role}</span>
                          </div>
                        )}
                        {featuredItem.metadata.timeline && (
                          <div>
                            <span className="block text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Timeline</span>
                            <span className="block text-sm font-medium text-white">{featuredItem.metadata.timeline}</span>
                          </div>
                        )}
                        {featuredItem.metadata.impact && (
                          <div>
                            <span className="block text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Impact</span>
                            <span className="block text-sm font-medium text-white">{featuredItem.metadata.impact}</span>
                          </div>
                        )}
                        <Link 
                          href={featuredItem.link}
                          className="inline-flex items-center justify-between w-full mt-2 pt-4 border-t border-white/[0.05] text-sm font-bold text-white group/link hover:text-zinc-300 transition-colors"
                        >
                          View Live 
                          <ArrowUpRight className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" strokeWidth={2} />
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Supporting Project Queue (Right) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-3 h-full justify-start pl-4 border-l border-white/[0.05]">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-6">Up Next</h4>
              
              <AnimatePresence mode="popLayout">
                {queueItems.map((item) => (
                  <motion.button
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleSelect((item as any)._originalIndex)}
                    className="group/queue relative flex flex-col gap-3 p-4 bg-transparent hover:bg-[#0A0A0A] border border-transparent hover:border-white/[0.05] transition-all text-left w-full cursor-pointer"
                  >
                    <div className="relative w-full aspect-[21/9] bg-[#0A0A0A] overflow-hidden border border-white/[0.05]">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover opacity-60 transition-all duration-700 group-hover/queue:scale-105 group-hover/queue:opacity-100 grayscale group-hover/queue:grayscale-0"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-300 group-hover/queue:text-white transition-colors truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-600 mt-1 block">
                        {item.category}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
            
          </div>

          {/* External Nav - Right */}
          <button 
            onClick={handleNext}
            className="absolute -right-4 md:-right-8 top-[35%] -translate-y-1/2 z-30 p-3 rounded-full bg-white/[0.03] border border-white/[0.05] text-white backdrop-blur-md hover:bg-white/[0.1] transition-all duration-300 hidden sm:flex"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
        
      </div>
    </section>
  );
}

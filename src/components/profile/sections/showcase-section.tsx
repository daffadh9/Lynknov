"use client";

import { useState } from "react";
import { ProfileData } from "../types/profile";
import { ShowcaseCard } from "../ui/showcase-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShowcaseSectionProps {
  profile: ProfileData;
}

export function ShowcaseSection({ profile }: ShowcaseSectionProps) {
  if (!profile.showcaseOffers || profile.showcaseOffers.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(profile.showcaseOffers.length / itemsPerPage);

  const nextSlide = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const visibleOffers = profile.showcaseOffers.slice(
    currentIndex * itemsPerPage, 
    (currentIndex * itemsPerPage) + itemsPerPage
  );

  return (
    <section className="relative w-full py-32 md:py-48 overflow-hidden bg-[#0A0A0A]">
      {/* Background Identity for Showcase */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-zinc-900/10 rounded-[100%] blur-[150px] pointer-events-none"></div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Showcase
          </h2>
          <div className="w-12 h-[2px] bg-white/[0.2]"></div>
        </div>
        
        <div className="relative">
          {/* External Navigation Left */}
          {totalPages > 1 && (
            <button 
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute -left-4 md:-left-8 top-1/3 -translate-y-1/2 z-20 p-3 rounded-full bg-white/[0.03] border border-white/[0.05] text-white backdrop-blur-md disabled:opacity-0 hover:bg-white/[0.1] transition-all duration-300"
              aria-label="Previous offers"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
            </button>
          )}

          {/* Interactive Showcase Grid */}
          <div className="relative min-h-[500px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 absolute inset-0 w-full"
              >
                {visibleOffers.map((offer) => (
                  <div key={offer.id}>
                    <ShowcaseCard offer={offer} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* External Navigation Right */}
          {totalPages > 1 && (
            <button 
              onClick={nextSlide}
              disabled={currentIndex === totalPages - 1}
              className="absolute -right-4 md:-right-8 top-1/3 -translate-y-1/2 z-20 p-3 rounded-full bg-white/[0.03] border border-white/[0.05] text-white backdrop-blur-md disabled:opacity-0 hover:bg-white/[0.1] transition-all duration-300"
              aria-label="Next offers"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

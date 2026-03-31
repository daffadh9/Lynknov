"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProfileData, ShowcaseOffer } from "../types/profile";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedTitle } from "../ui/animated-title";
import { ScrollReveal } from "../ui/scroll-reveal";

interface ShowcaseSectionProps {
  profile: ProfileData;
}

export function ShowcaseSection({ profile }: ShowcaseSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedOffers, setExpandedOffers] = useState<string[]>([]);

  if (!profile.showcaseOffers || profile.showcaseOffers.length === 0) return null;
  
  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedOffers((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Derive categories
  const categories = ["Semua", ...Array.from(new Set(profile.showcaseOffers.map(o => o.type)))];

  // Logic 2 featured, rest are grid 
  const featuredOffers = profile.showcaseOffers.filter((o) => o.isFeatured).slice(0, 2);
  const regularOffers = profile.showcaseOffers.filter((o) => {
    if (activeCategory === "Semua") return !o.isFeatured;
    return !o.isFeatured && o.type === activeCategory;
  });

  return (
    <section className="relative w-full py-20 md:py-32 bg-gradient-to-b from-[#0A0A0C] via-[#0D0D11] to-[#0A0A0C] overflow-hidden border-none text-white z-10 transition-colors">
      {/* PREMIUM BACKGROUND (Family 3) — Velvet Gradient Stage */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none z-0"></div>
      <div className="absolute inset-x-0 inset-y-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[40vw] h-[50vh] bg-[radial-gradient(circle_at_top_left,rgba(16,21,38,0.3)_0%,transparent_60%)] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-0 w-[50vw] h-[60vh] bg-[radial-gradient(ellipse_at_bottom_right,rgba(20,30,40,0.3)_0%,transparent_60%)] pointer-events-none z-0"></div>
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iMSIgZmlsbD0id2hpXRlIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-60 z-0 pointer-events-none mix-blend-overlay"></div>

      <div className="mx-auto max-w-[1240px] px-6 md:px-12 xl:px-16 relative z-10 w-full">
        
        {/* Curated Header */}
        <ScrollReveal className="flex flex-col mb-16 md:mb-24 items-center text-center">
          <AnimatedTitle 
            title="Showcase Storefront"
            as="h3"
            className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-white mb-6 leading-[1.05] font-serif"
          />
          <p className="text-base md:text-lg text-zinc-400 font-medium leading-[1.6] text-balance max-w-2xl mx-auto">
             Segala layanan dan produk yang dirancang khusus untuk Anda.
          </p>
        </ScrollReveal>

        {/* 2 Featured Offers (Hero/Main Thumbnails) */}
        {featuredOffers.length > 0 && (
          <ScrollReveal delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-24">
            {featuredOffers.map((offer) => (
              <FeaturedOfferCard key={offer.id} offer={offer} />
            ))}
          </ScrollReveal>
        )}

        {/* Catalog Section with Filter and Grid */}
        <ScrollReveal delay={0.3} className="flex flex-col">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-white/[0.05] gap-4">
            <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Katalog Premium
            </h4>

            {/* Dropdown Filter */}
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.1] bg-[#121214]/60 backdrop-blur text-xs font-bold text-zinc-300 uppercase tracking-widest hover:bg-white/[0.05] transition-colors"
              >
                {activeCategory}
                <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-[#18181A] border border-white/[0.08] shadow-2xl rounded-2xl overflow-hidden py-2 z-30"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${activeCategory === cat ? "bg-white/[0.05] text-white" : "text-zinc-500 hover:text-white hover:bg-white/[0.02]"}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 4-Card Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {regularOffers.map((offer, i) => (
                 <motion.div
                   layout
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ duration: 0.4, delay: i * 0.05 }}
                   key={offer.id}
                   className="group relative flex flex-col w-full h-[320px] rounded-[1.5rem] bg-[#0A0A0C]/80 ring-1 ring-inset ring-white/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl overflow-hidden hover:ring-white/[0.2] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.2)] transition-all duration-500 block"
                 >
                   {/* Background Image */}
                   <Image 
                     src={offer.imageUrl}
                     alt={offer.title}
                     fill
                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                     className="object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 blur-[2px] group-hover:blur-0 mix-blend-luminosity group-hover:mix-blend-normal"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                   
                   {/* Badges / Tags */}
                   <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                     <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/[0.1] text-[9px] font-bold text-white uppercase tracking-widest">{offer.type}</span>
                   </div>

                   {/* Content overlay */}
                   <div 
                     className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end transform transition-all duration-500 cursor-pointer"
                     onClick={(e) => toggleExpand(offer.id, e)}
                   >
                      <div className="flex items-center justify-between group/title">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1 line-clamp-1">{offer.title}</h4>
                          {offer.pricing && <span className="text-xs font-bold text-emerald-400 mb-3 block">{offer.pricing}</span>}
                        </div>
                        <ChevronDown className={`w-5 h-5 text-white/[0.5] group-hover/title:text-white transition-transform duration-300 ${expandedOffers.includes(offer.id) ? "rotate-180" : ""}`} />
                      </div>
                      
                      {/* Expanded description and CTA */}
                      <AnimatePresence>
                        {expandedOffers.includes(offer.id) && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="text-zinc-400 text-[11px] font-medium leading-[1.6] mb-4 mt-2">
                               {offer.description} 
                            </div>
                            
                            <a href={offer.link} className="flex items-center justify-between w-full h-10 px-4 bg-white/[0.05] border border-white/[0.1] rounded-xl hover:bg-white text-zinc-300 hover:text-black transition-colors text-[10px] uppercase font-bold tracking-widest relative z-20" onClick={(e) => e.stopPropagation()}>
                              {offer.ctaText}
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                 </motion.div>
              ))}
            </AnimatePresence>
            
            {regularOffers.length === 0 && (
              <div className="col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-4 py-12 flex items-center justify-center text-zinc-500 text-sm font-medium">
                Belum ada penawaran untuk kategori ini.
              </div>
            )}
          </div>

          <div className="mt-16 flex justify-center">
             <a href="#" className="inline-flex items-center gap-3 px-8 h-14 rounded-full border border-white/[0.1] bg-[#121214]/60 backdrop-blur text-xs font-bold text-white uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 group">
                Eksplor Semua Layanan
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
             </a>
          </div>

        </ScrollReveal>
        
      </div>
    </section>
  );
}

function FeaturedOfferCard({ offer }: { offer: ShowcaseOffer }) {
  return (
    <div className="flex flex-col w-full h-full relative group/column">
       <div className="relative w-full aspect-[4/3] md:aspect-[16/10] mb-6 z-10">
         <div className="absolute inset-x-4 -top-3 bottom-0 bg-[#0C0C0C] rounded-[2rem] border border-white/[0.03] shadow-lg transform -z-20 transition-all duration-700 group-hover/column:translate-y-2"></div>
         <div className="absolute inset-x-2 -top-1.5 bottom-0 bg-[#121214] rounded-[2rem] border border-white/[0.05] shadow-xl transform -z-10 transition-all duration-[1s] group-hover/column:translate-y-1"></div>

         <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#0A0A0A] border border-white/[0.08] shadow-2xl z-0 group/card">
           <Image
             src={offer.imageUrl}
             alt={offer.title}
             fill
             className="object-cover opacity-80 mix-blend-luminosity filter contrast-[1.05] group-hover/card:mix-blend-normal group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-[2s]"
             sizes="(max-width: 1024px) 100vw, 50vw"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent opacity-80 mix-blend-multiply"></div>
           
           <div className="absolute top-6 left-6 flex items-center gap-2">
             <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
               Unggulan
             </span>
           </div>
         </div>
       </div>

       {/* Detailed Metadata Data */}
       <div className="flex flex-col w-full px-2">
          <div className="flex flex-col gap-2 mb-4">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white line-clamp-1 group-hover/column:text-zinc-300 transition-colors">
              {offer.title}
            </h3>
            {offer.pricing && (
              <span className="text-sm font-semibold text-emerald-400 font-mono tracking-wide">
                Mulai {offer.pricing}
              </span>
            )}
          </div>
          <p className="text-zinc-400 text-sm md:text-[15px] font-medium leading-[1.6] mb-8 line-clamp-3">
            {offer.description}
          </p>
          
          <a href={offer.link} className="inline-flex items-center justify-center gap-3 w-full sm:w-auto h-14 px-8 self-start rounded-full border border-white/[0.1] bg-white text-black font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            {offer.ctaText}
            <ArrowUpRight className="w-4 h-4" />
          </a>
       </div>
    </div>
  );
}

"use client";

import { ProfileData } from "../types/profile";
import { ArrowUpRight, Copy, Check, Copyright, MessageSquare, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedTitle } from "../ui/animated-title";
import { ScrollReveal } from "../ui/scroll-reveal";

interface ContactSectionProps {
  profile: ProfileData;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (!profile.closingCta) return null;

  return (
    <section className="relative w-full pt-32 pb-12 md:pt-48 md:pb-16 overflow-hidden bg-gradient-to-b from-[#0A0A0C] to-[#030303] border-none text-white z-10">
      {/* GRAND CLOSING ATMOSPHERE (Family 6 Variant) */}
      <div className="absolute inset-x-0 top-0 h-[100px] w-full bg-gradient-to-b from-[#0A0A0C] to-transparent pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none z-0"></div>

      <div className="mx-auto max-w-[1240px] px-6 md:px-12 xl:px-16 relative z-10 flex flex-col items-center">
        
        {/* Kickstart Engine (Mini-Brief Form) - Now Placed ABOVE the final CTA */}
        {profile.kickstart && (
          <ScrollReveal className="w-full max-w-2xl mx-auto mb-32 relative">
             <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-[2rem] transform -translate-y-4 blur-xl -z-10"></div>
             
             <div className="p-8 md:p-12 rounded-[2.5rem] bg-[#0A0A0C] border border-white/[0.05] shadow-2xl relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-zinc-300" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{profile.kickstart.heading}</h3>
                </div>
                
                <p className="text-sm text-zinc-400 text-center mx-auto max-w-md font-medium mb-10">{profile.kickstart.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {profile.kickstart.options.map((option, index, arr) => (
                    <button
                      key={option}
                      onClick={() => setSelectedOption(option)}
                      className={`px-4 py-4 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all duration-300 ${selectedOption === option ? 'bg-white text-black border-transparent scale-[1.02] shadow-lg shadow-white/10' : 'bg-white/[0.02] text-zinc-400 border-white/[0.05] hover:bg-white/[0.05] hover:text-white'} ${index === arr.length - 1 && arr.length % 2 !== 0 ? 'sm:col-span-2 sm:max-w-md sm:mx-auto w-full' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/[0.05]">
                   <a 
                     href={`mailto:hello@example.com?subject=Kickstart: ${selectedOption || 'Inquiry'}&body=Hello...`}
                     className="w-full relative h-14 md:h-16 px-8 rounded-2xl bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.05)] flex items-center justify-center gap-3 overflow-hidden group"
                   >
                     <span className="relative z-10">{profile.kickstart.ctaText}</span>
                     <ArrowUpRight className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2.5} />
                   </a>
                </div>
             </div>
          </ScrollReveal>
        )}

        {/* The Final Platform CTA Stage (Lynknov Focus) */}
        <ScrollReveal delay={0.2} className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 text-balance">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.05] bg-[#111114]/60 text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest mx-auto mb-10 md:mb-12 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-[pulse_3s_ease-in-out_infinite] shadow-[0_0_12px_rgba(59,130,246,0.8)]"></span>
            {profile.closingCta.badge}
          </div>

          <AnimatedTitle 
            title={profile.closingCta.heading}
            as="h2"
            className="text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-white mb-8 leading-[1.05] text-balance font-serif"
          />
          
          <p className="text-lg md:text-xl text-zinc-400 font-medium leading-[1.6] max-w-2xl mx-auto">
            {profile.closingCta.supportingText}
          </p>

        </ScrollReveal>

        {/* Lynknov / Platform CTAs */}
        <ScrollReveal delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto relative z-20">
             <a 
               href={profile.closingCta.urlPrimary}
               className="group relative h-16 w-full sm:w-auto px-10 rounded-2xl bg-white text-black font-bold text-[13px] uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 overflow-hidden"
             >
               <span className="relative z-10">{profile.closingCta.labelPrimary}</span>
               <ArrowUpRight className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2.5} />
             </a>
          
             <a 
               href={profile.closingCta.urlSecondary}
               className="group h-16 w-full sm:w-auto px-10 rounded-2xl border border-white/[0.1] bg-[#121214]/60 backdrop-blur flex items-center justify-center gap-3 text-white font-bold text-[13px] uppercase tracking-widest hover:bg-white/[0.05] transition-colors"
             >
               <span>{profile.closingCta.labelSecondary}</span>
               <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
             </a>
        </ScrollReveal>

        {/* Minimalist Premium Footer Signature */}
        <div className="mt-32 flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-500 relative z-20 pb-8">
          <span className="text-[12px] md:text-[13px] text-zinc-500 font-serif font-medium tracking-wide flex items-center gap-2">
            <Copyright className="w-3.5 h-3.5" /> {profile.footerNote}
          </span>
        </div>
        
      </div>
    </section>
  );
}

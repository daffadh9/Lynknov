"use client";

import { ProfileData } from "../types/profile";
import { AnimatedTitle } from "../ui/animated-title";
import { ScrollReveal } from "../ui/scroll-reveal";
import { Quote, Rocket } from "lucide-react";
import Image from "next/image";

interface StoryboardSectionProps {
  profile: ProfileData;
}

export function StoryboardSection({ profile }: StoryboardSectionProps) {
  if (!profile.storyboard || profile.storyboard.length === 0) return null;

  const mainStory = profile.storyboard[0];

  return (
    <section className="relative w-full py-24 md:py-36 bg-[#050505] overflow-hidden border-none text-white z-10 transition-colors">
      {/* PREMIUM BACKGROUND (Family 4) — Cinematic Story Shadow */}
      {/* Vignette kuat, blur light menyamping */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,#030303_100%)]"></div>
      <div className="absolute top-0 right-0 w-[50vw] h-[70vh] bg-gradient-to-bl from-zinc-800/[0.04] via-transparent to-transparent pointer-events-none blur-[60px] z-0"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[70vh] bg-gradient-to-tr from-blue-900/[0.03] via-transparent to-transparent pointer-events-none blur-[60px] z-0"></div>

      <div className="mx-auto max-w-[1240px] px-6 md:px-12 xl:px-16 relative z-10">
        
        {/* Header */}
        <ScrollReveal className="flex flex-col mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.05] bg-white/[0.02] text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-6 w-max">
            <Rocket className="w-3.5 h-3.5" />
            Origin Story
          </div>
          <AnimatedTitle 
            title="Storyboard"
            as="h2"
            className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-white mb-6 leading-[1.05] font-serif"
          />
        </ScrollReveal>

        {/* The Big Premium Container */}
        <ScrollReveal delay={0.2} className="relative w-full rounded-[2.5rem] bg-[#0A0A0A] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_2px_20px_rgba(255,255,255,0.02)] overflow-hidden group">
          
          {/* Animated Glow Border */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.02] z-0 pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row relative z-10 w-full">
            
            {/* Premium Photo Left Side */}
            <div className="w-full lg:w-[45%] h-[400px] lg:h-[auto] relative bg-[#111114] border-b lg:border-b-0 lg:border-r border-white/[0.05] overflow-hidden group/photo">
               
               <Image 
                 src="/images/storyboard-laptop.png"
                 alt="The Creatorpreneur Story"
                 fill
                 className="object-cover object-center saturate-50 group-hover/photo:saturate-[1.1] group-hover/photo:scale-105 transition-all duration-1000 ease-out"
               />
               
               {/* Premium Dramatic Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/20 z-10"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0A]/50 z-10 hidden lg:block"></div>
            </div>

            {/* Content Core Right Side */}
            <div className="w-full lg:w-[60%] p-10 md:p-16 lg:p-20 flex flex-col justify-center bg-gradient-to-br from-[#0F0F11] to-[#0A0A0C]">
               <Quote className="w-12 h-12 text-white/5 mb-8 transform -scale-x-100" />
               <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-8 leading-tight tracking-tight">
                 {mainStory.title}
               </h3>
               <p className="text-base md:text-lg text-zinc-400 font-medium leading-[1.8] text-balance mb-12">
                 {mainStory.content.split("Interactive Business OS").map((part, i, array) => (
                    <span key={i}>
                      {part}
                      {i !== array.length - 1 && (
                        <strong className="text-white font-black whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Interactive Business OS</strong>
                      )}
                    </span>
                 ))}
               </p>

               <div className="flex items-center gap-4 mt-auto">
                  <span className="flex h-10 items-center justify-center rounded-full bg-white/[0.05] px-6 text-[10px] font-bold text-white uppercase tracking-widest border border-white/[0.05]">
                    The Journey
                  </span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-white/[0.1] to-transparent"></div>
               </div>
            </div>

          </div>
          
        </ScrollReveal>

      </div>
    </section>
  );
}

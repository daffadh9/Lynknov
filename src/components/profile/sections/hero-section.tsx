"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { ProfileData } from "../types/profile";
import { PrimaryButton } from "../ui/primary-button";
import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  profile: ProfileData;
  previewMode?: boolean;
}

const VerifiedIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.6041 3.12517C11.8385 2.76632 12.1613 2.76632 12.3957 3.12517L13.7937 5.26526C13.9113 5.44525 14.1558 5.56816 14.3686 5.55627L16.89 5.41505C17.3155 5.39126 17.5815 5.65706 17.5577 6.08271L17.4165 8.60424C17.4046 8.81702 17.5276 9.06144 17.7076 9.17911L19.8475 10.5772C20.2064 10.8115 20.2064 11.1342 19.8475 11.3686L17.7076 12.7667C17.5276 12.8844 17.4046 13.1287 17.4165 13.3415L17.5577 15.8631C17.5815 16.2887 17.3155 16.5545 16.89 16.5307L14.3686 16.3895C14.1558 16.3776 13.9113 16.5005 13.7937 16.6805L12.3957 18.8206C12.1613 19.1795 11.8385 19.1795 11.6041 18.8206L10.2061 16.6805C10.0885 16.5005 9.84405 16.3776 9.63127 16.3895L7.10986 16.5307C6.68421 16.5545 6.4184 16.2887 6.4422 15.8631L6.58342 13.3415C6.59531 13.1287 6.47239 12.8844 6.29239 12.7667L4.15233 11.3686C3.79348 11.1342 3.79348 10.8115 4.15233 10.5772L6.29239 9.17911C6.47239 9.06144 6.59531 8.81702 6.58342 8.60424L6.4422 6.08271C6.4184 5.65706 6.68421 5.39126 7.10986 5.41505L9.63127 5.55627C9.84405 5.56816 10.0885 5.44525 10.2061 5.26526L11.6041 3.12517Z" fill="#3897F0" />
    <path d="M10.5 12.2L9.1 10.8L8.2 11.7L10.5 14L15.3 9.2L14.4 8.3L10.5 12.2Z" fill="white" />
  </svg>
);

export function HeroSection({ profile, previewMode = false }: HeroSectionProps) {
  const highlightToken = "Impact Nyata";
  const headlineParts = profile.headline.includes(highlightToken)
    ? profile.headline.split(highlightToken)
    : null;

  return (
    <section className={cn(
      "relative w-full overflow-hidden bg-[#030303]",
      previewMode ? "min-h-[60vh] pt-12 pb-10" : "min-h-[80vh] pt-12 pb-10 md:pt-32 md:pb-28 lg:pt-40 lg:pb-32"
    )}>
      {/* 
        PREMIUM HERO BACKGROUND (Family 1) — Cinematic Hero Atmosphere
        Radial dark gradient, vertical streaks, subtle glow, slight pulse.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,35,50,0.6)_0%,transparent_80%)] pointer-events-none z-0"></div>

      {/* Subtle Vertical Light Streaks (Static + slight opacity drift) */}
      <div className="absolute inset-0 w-full flex justify-around pointer-events-none opacity-20 z-0">
        <div className="w-[1px] h-full bg-gradient-to-b from-white/[0.05] via-white/[0.1] to-transparent"></div>
        <div className="w-[1px] h-full bg-gradient-to-b from-white/[0.05] via-white/[0.08] to-transparent"></div>
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.1] to-transparent"></div>
        <div className="w-[1px] h-full bg-gradient-to-b from-white/[0.05] via-white/[0.1] to-transparent"></div>
      </div>

      {/* Main Grid Mesh */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
        }}>
      </div>

      {/* Slow Moving Glow / Parallax drift feel */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.6, 0.4, 0.6] }}
        transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
        className="absolute top-[10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-indigo-500/[0.03] via-blue-500/[0.02] to-transparent blur-[120px] pointer-events-none z-0"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, delay: 2 }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-fuchsia-500/[0.03] via-transparent to-transparent blur-[100px] pointer-events-none z-0"
      ></motion.div>

      <div className="mx-auto max-w-[1240px] px-5 md:px-12 xl:px-16 relative z-10 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT: EDITORIAL TYPOGRAPHY & COMMAND */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left xl:pr-8">
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl leading-[1.1] tracking-tight md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-bold text-white mb-4 md:mb-8 max-w-[800px] text-balance"
            >
              {headlineParts ? (
                headlineParts.map((part, index) =>
                  index === 0 ? (
                    <span key={index}>
                      {part}
                      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D1D5DB] to-[#374151] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] filter saturate-0 contrast-125">
                        {highlightToken}
                      </span>
                    </span>
                  ) : (
                    part
                  ),
                )
              ) : (
                profile.headline
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-xl text-zinc-400 leading-relaxed max-w-[580px] mb-8 md:mb-14 font-medium text-balance px-4 sm:px-0"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <PrimaryButton
                href={profile.primaryCta.url}
                className="group relative h-14 md:h-16 px-8 md:px-10 rounded-xl md:rounded-2xl bg-white text-black font-bold text-base hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">{profile.primaryCta.label}</span>
                <ArrowUpRight className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" strokeWidth={2.5} />
              </PrimaryButton>

              {profile.secondaryCta && (
                <a href={profile.secondaryCta.url} className="group h-14 md:h-16 px-7 md:px-8 rounded-xl md:rounded-2xl border border-white/[0.1] bg-white/[0.02] flex items-center justify-center gap-3 text-white font-semibold hover:bg-white/[0.05] hover:border-white/[0.2] transition-colors">
                  <Play className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" fill="currentColor" />
                  <span>{profile.secondaryCta.label}</span>
                </a>
              )}
            </motion.div>
          </div>

          {/* RIGHT: PREMIUM VISUAL CENTERPIECE (Vertical Portrait) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 lg:col-span-5 w-full flex flex-col items-center justify-center relative"
          >

            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] group flex flex-col items-center z-10">

              {/* Premium Thick Frame Layout */}
              <div
                className={`relative w-full aspect-[4/5] md:aspect-[3/4] p-3 md:p-4 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-b from-[#1C1C1F] to-[#0A0A0C] border shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden transform transition-all duration-700 hover:scale-[1.02] cursor-pointer ${profile.hasStory ? 'border-fuchsia-500/50 hover:border-fuchsia-400 shadow-[0_0_40px_rgba(217,70,239,0.15)] ring-2 ring-offset-4 ring-offset-[#030303] ring-fuchsia-500/40 animate-[pulse_4s_ease-in-out_infinite]' : 'border-white/[0.05] hover:border-white/[0.1]'}`}
                onClick={() => {
                  if (profile.hasStory) {
                    alert('Open Story Viewer (V2 Feature)');
                  }
                }}
              >

                {/* Inner Canvas Image */}
                <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-black shadow-inner">
                  <Image
                    src={profile.heroImage}
                    alt={profile.name}
                    fill
                    priority
                    className="object-cover object-center opacity-85 filter contrast-[1.1] saturate-[0.8] transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100 group-hover:saturate-100"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/10 to-transparent opacity-60 mix-blend-multiply"></div>
                </div>

                {/* Corner Accents for frame detail */}
                <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-white/[0.05]"></div>
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white/[0.05]"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-white/[0.05]"></div>
                <div className="absolute bottom-6 right-6 w-2 h-2 rounded-full bg-white/[0.05]"></div>
              </div>

              {/* Name & Title Identity (Positioned Bottom Center) */}
              <div className="flex flex-col items-center text-center mt-6 md:mt-8 gap-1.5 md:gap-2 w-full">

                {/* Availability Badge Row */}
                <div className="flex items-center justify-center gap-2 md:gap-3 w-full mb-1">
                  {profile.availability && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#A1A1AA] hover:text-white transition-colors">
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-blue-500"></span>
                      {profile.availability.text}
                    </div>
                  )}

                  {profile.onlineStatus && profile.onlineStatus.isOnline && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                      <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-500"></span>
                      </span>
                      Active
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center w-full max-w-[320px] md:max-w-[400px]">
                  <h2 className="text-xl md:text-[28px] font-black tracking-tight text-white font-serif whitespace-nowrap truncate mr-2">{profile.name}</h2>
                  <VerifiedIcon className="w-5 h-5 md:w-7 md:h-7 shrink-0 drop-shadow-[0_0_12px_rgba(56,151,240,0.6)]" />
                </div>

                <p className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-500 font-bold tracking-widest uppercase text-[10px] md:text-[13px] text-center max-w-[280px] md:max-w-[300px]">
                  {profile.role}
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

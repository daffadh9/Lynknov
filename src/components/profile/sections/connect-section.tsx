"use client";

import { useState } from "react";
import Image from "next/image";
import { ProfileData, SocialLink } from "../types/profile";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BarChart3, Share2, Clock, Link as LinkIcon, Fingerprint, ExternalLink } from "lucide-react";
import { AnimatedTitle } from "../ui/animated-title";
import { ScrollReveal } from "../ui/scroll-reveal";

// Platform icons
const TikTokIcon = ({ className, color }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);
const YoutubeIcon = ({ className, color }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
);
const InstagramIcon = ({ className, color }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const FacebookIcon = ({ className, color }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const TwitterIcon = ({ className, color }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

const PlatformIcons = (platform: string, className: string, color?: string) => {
  switch (platform.toLowerCase()) {
    case 'youtube': return <YoutubeIcon className={className} color={color} />;
    case 'instagram': return <InstagramIcon className={className} color={color} />;
    case 'tiktok': return <TikTokIcon className={className} color={color} />;
    case 'facebook': return <FacebookIcon className={className} color={color} />;
    case 'x': return <TwitterIcon className={className} color={color} />;
    default: return <LinkIcon className={className} color={color} />;
  }
};

interface ConnectSectionProps {
  profile: ProfileData;
}

export function ConnectSection({ profile }: ConnectSectionProps) {
  const [activePlatform, setActivePlatform] = useState<SocialLink | null>(profile.socialLinks?.[0] || null);

  if (!profile.socialLinks || profile.socialLinks.length === 0) return null;

  return (
    <section className="relative w-full py-20 md:py-32 bg-gradient-to-b from-[#0A0A0C] to-[#111114] overflow-hidden border-none">
      {/* 
        PREMIUM BACKGROUND (Family 2.5) — Subtle Dot-Interactive Background
        Micro-particles halus, glow biru gelap.
      */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.1]" 
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px", maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)" }}
      ></div>
      <div className="absolute top-1/4 left-[30%] w-[300px] h-[300px] bg-blue-900/[0.04] blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-[20%] w-[400px] h-[400px] bg-indigo-900/[0.03] blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="mx-auto max-w-[1240px] px-6 md:px-12 xl:px-16 relative z-10 flex flex-col items-center">
        
        {/* Simplified Header with raw icon */}
        <ScrollReveal className="flex flex-col text-center max-w-3xl mb-16 md:mb-20 w-full items-center">
          <Fingerprint className="w-10 h-10 text-blue-500/50 mx-auto mb-6 glow-icon" strokeWidth={1} />
          
          <AnimatedTitle 
            title="Digital Presence."
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white text-balance font-serif"
          />
          <p className="text-base md:text-lg text-zinc-400 font-medium text-balance max-w-lg mx-auto">
            Temukan jejak digital saya di berbagai platform. Ikuti perjalanan dan perspektif yang saya bagikan.
          </p>
        </ScrollReveal>

        {/* Dashboard Interface Stage */}
        <ScrollReveal delay={0.2} className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8 items-start relative max-w-[1000px] mx-auto">
          
          <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-48 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar shrink-0 relative z-20">
            {profile.socialLinks.map((social) => {
              const isActive = activePlatform?.platform === social.platform;
              return (
                <button 
                  key={social.platform}
                  onClick={() => setActivePlatform(social)}
                  className={`group relative flex items-center justify-start gap-4 px-5 py-4 w-full rounded-2xl border transition-all duration-[0.4s] ${isActive ? 'bg-[#121214] border-white/[0.1] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] scale-100' : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/[0.05] scale-[0.98]'}`}
                >
                  <div className={`p-2.5 rounded-xl border flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-white border-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-[#0A0A0A] border-white/[0.08]'}`}>
                    {PlatformIcons(social.platform, "w-5 h-5", isActive ? "black" : "currentColor")}
                  </div>
                  <span className={`text-[13px] font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'} hidden md:block lg:block`}>
                    {social.platform}
                  </span>
                  
                  {isActive && <div className="absolute right-4 w-1.5 h-1.5 rounded-full animate-pulse shadow-lg hidden lg:block" style={{ backgroundColor: social.themeColor || "white" }}></div>}
                </button>
              );
            })}
          </div>

          <div className="flex-1 w-full bg-[#111114]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group/dashboard min-h-[420px] flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {activePlatform && (
                <motion.div
                  key={activePlatform.platform}
                  initial={{ opacity: 0, scale: 0.98, x: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, x: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col relative z-20 w-full"
                >
                  <div 
                    className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] blur-[100px] rounded-full pointer-events-none opacity-20 transition-colors duration-[2s]"
                    style={{ background: `radial-gradient(circle, ${activePlatform.themeColor || '#ffffff'} 0%, transparent 70%)` }}
                  ></div>

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12 border-b border-white/[0.05] pb-8 relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl border border-white/[0.1] bg-[#0A0A0A] flex items-center justify-center shadow-lg relative overflow-hidden">
                         <div className="absolute inset-0 bg-white/[0.05]"></div>
                         <div className="relative z-10 scale-125" style={{ color: activePlatform.themeColor || "white" }}>
                           {PlatformIcons(activePlatform.platform, "w-6 h-6")}
                         </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1.5 flex items-center gap-3">
                          {activePlatform.username}
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest leading-none">Connected</span>
                        </span>
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                          <Clock className="w-3.5 h-3.5" /> Sync: {activePlatform.lastSync}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 relative z-10">
                    {activePlatform.stats?.map((stat, idx) => (
                       <div key={idx} className="flex flex-col p-6 rounded-2xl bg-[#0A0A0C] border border-white/[0.03] hover:border-white/[0.1] transition-all duration-500 cursor-default hover:-translate-y-1">
                          <div className="flex items-center justify-between mb-4 text-zinc-500">
                            <span className="text-[10px] uppercase font-bold tracking-widest">{stat.label}</span>
                            <BarChart3 className="w-4 h-4" />
                          </div>
                          <span className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none mb-2">
                            {stat.value}
                          </span>
                       </div>
                    ))}
                    
                    {(!activePlatform.stats || activePlatform.stats.length < 3) && (
                      <div className="hidden lg:flex flex-col lg:col-span-2 p-6 rounded-2xl bg-[#0A0A0C] border border-white/[0.05] relative overflow-hidden group/graph shadow-xl">
                        
                        {profile.digitalPresence?.featuredPost && activePlatform.platform.toLowerCase() === profile.digitalPresence.featuredPost.platform.toLowerCase() ? (
                          <>
                            <div className="flex items-center justify-between mb-4 relative z-10">
                               <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div> Latest Update</span>
                            </div>
                            <a href={profile.digitalPresence.featuredPost.url} target="_blank" rel="noopener noreferrer" className="relative w-full flex-1 rounded-[1.25rem] overflow-hidden group/post block border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#111114]">
                              {profile.digitalPresence.featuredPost.mediaUrl && (
                                 <Image 
                                   src={profile.digitalPresence.featuredPost.mediaUrl}
                                   alt={profile.digitalPresence.featuredPost.title}
                                   fill
                                   className="object-cover opacity-80 group-hover/post:opacity-100 group-hover/post:scale-105 transition-all duration-700 saturate-150"
                                 />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent"></div>
                              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end">
                                <span className="inline-block px-2 py-1 bg-red-600 text-white text-[8px] font-bold uppercase tracking-widest rounded mb-2 w-max">New Video</span>
                                <h4 className="text-[13px] font-bold text-white line-clamp-2 leading-snug drop-shadow-md mb-1">{profile.digitalPresence.featuredPost.title}</h4>
                                <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest line-clamp-1">{profile.digitalPresence.featuredPost.postedAt}</p>
                              </div>
                              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/post:opacity-100 transition-opacity border border-white/20">
                                 <ExternalLink className="w-3.5 h-3.5 text-white" />
                              </div>
                            </a>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-between mb-4 relative z-10">
                               <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400">Live Analytics Viewer</span>
                               <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></span>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-[70%] flex items-end gap-[3px] opacity-40 group-hover/graph:opacity-80 transition-opacity duration-700 px-6 pb-2">
                               {[30, 40, 35, 50, 60, 45, 70, 80, 75, 90, 100].map((h, i) => (
                                 <div key={i} className="flex-1 rounded-t border-t border-white/[0.2] overflow-hidden" style={{ height: `${h}%`, background: `linear-gradient(to top, transparent, ${activePlatform.themeColor || "rgba(255,255,255,0.2)"})` }}></div>
                               ))}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none"></div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 border-t border-white/[0.05] relative z-10">
                    <button 
                      className="group flex items-center justify-center gap-2 text-zinc-400 px-6 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                      onClick={() => navigator.clipboard.writeText(activePlatform.url)}
                    >
                      <Share2 className="w-4 h-4" /> Share URL
                    </button>
                    
                    <a 
                      href={activePlatform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-3 bg-white text-black px-8 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                    >
                      <span className="relative z-10">Buka Platform</span>
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2.5} />
                    </a>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </ScrollReveal>
      </div>
    </section>
  );
}

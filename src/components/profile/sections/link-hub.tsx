"use client";

import { ProfileData } from "../types/profile";
import { Link2, ArrowUpRight, FolderGit2, AppWindow, ArrowRight, Pin, ShoppingCart, Briefcase, UserRound } from "lucide-react";
import { AnimatedTitle } from "../ui/animated-title";
import { ScrollReveal } from "../ui/scroll-reveal";

interface LinkHubSectionProps {
  profile: ProfileData;
}

export function LinkHubSection({ profile }: LinkHubSectionProps) {
  if (!profile.linkHub || profile.linkHub.length === 0) return null;

  const getModeIcon = (mode?: string, index?: number) => {
    switch(mode) {
      case "product": return <ShoppingCart className="w-5 h-5 text-emerald-400" />;
      case "work": return <Briefcase className="w-5 h-5 text-blue-400" />;
      case "personal": return <UserRound className="w-5 h-5 text-fuchsia-400" />;
      default: 
        if (index === 0) return <Link2 className="w-5 h-5" />;
        if (index === 1) return <FolderGit2 className="w-5 h-5" />;
        return <AppWindow className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative w-full py-20 md:py-32 bg-gradient-to-b from-[#0A0A0C] via-[#0C0C0E] to-[#0A0A0C] overflow-hidden border-none text-white z-10 transition-colors">
      {/* 
        PREMIUM BACKGROUND (Family 5) — Premium Data Chamber
        Dark panel space with subtle inner depth
      */}
      <div className="absolute inset-x-0 top-0 h-[100px] w-full bg-gradient-to-b from-[#0C0C0E] to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-0 opacity-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[#000000]/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none z-0"></div>

      <div className="mx-auto max-w-[1240px] px-6 md:px-12 xl:px-16 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <ScrollReveal className="flex flex-col items-center text-center max-w-3xl mb-16 md:mb-24">
          <AnimatedTitle 
            title="Dynamic Link Hub"
            as="h2"
            className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-white mb-6 leading-[1.05] font-serif"
          />
          <p className="text-base md:text-lg text-zinc-400 font-medium leading-[1.6] text-balance">
            Kumpulan wadah link bermanfaat yang dikemas rapi dan dikurasi berdasarkan prioritas.
          </p>
        </ScrollReveal>

        {/* The Hub Interface Stage */}
        <div className="w-full relative group perspective-1000">
          
          <ScrollReveal 
            delay={0.2}
            className="w-full bg-[#111114]/60 backdrop-blur-2xl border border-white/[0.05] rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative z-20"
          >
            {/* Ambient internal light */}
            <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-white/[0.03] to-transparent blur-[100px] pointer-events-none z-0"></div>

            {/* Simulated Desktop Top Bar */}
            <div className="h-14 w-full bg-[#08080A]/60 border-b border-white/[0.03] px-8 flex items-center justify-between backdrop-blur-md relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/[0.05] hover:bg-white/[0.2] transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-white/[0.05] hover:bg-white/[0.2] transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-white/[0.05] hover:bg-white/[0.2] transition-colors"></div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">lynk.hub (v2)</span>
            </div>

            {/* Modular Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.05] relative z-10">
              {profile.linkHub.map((group, i) => {
                // Pin logic sorting internally
                const pinnedLinks = group.links.filter(l => l.isPinned);
                const regularLinks = group.links.filter(l => !l.isPinned);

                return (
                  <div 
                    key={group.id}
                    className="group/col p-8 lg:p-12 hover:bg-[#15151A]/80 transition-all duration-700 relative flex flex-col overflow-hidden h-full"
                  >
                    {/* Subtle column hover glow */}
                    <div className="absolute -inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-500/[0.03] to-transparent opacity-0 group-hover/col:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    {/* Node icon */}
                    <div className={`w-12 h-12 rounded-2xl border ${group.mode === "product" ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-500" : group.mode === "work" ? "border-blue-500/20 bg-blue-500/5 text-blue-500" : group.mode === "personal" ? "border-fuchsia-500/20 bg-fuchsia-500/5 text-fuchsia-500" : "border-white/[0.05] bg-[#0A0A0A] text-zinc-500"} shadow-md flex items-center justify-center mb-10 transition-all duration-500`}>
                      {getModeIcon(group.mode, i)}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-6 border-b border-white/[0.05] pb-6 flex items-center gap-3">
                      {group.title}
                    </h3>

                    <div className="flex flex-col flex-1 gap-2 mb-8">
                      {/* Pinned Prioritas Links */}
                      {pinnedLinks.map((link, j) => (
                        <a
                          key={`pin-${j}`}
                          href={link.url}
                          className="group/link flex items-center justify-between py-4 px-4 -mx-4 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 relative overflow-hidden"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500 group-hover/link:w-[4px] transition-all"></div>
                          
                          <div className="flex items-center gap-3 relative z-10">
                            <Pin className="w-3.5 h-3.5 text-emerald-400 rotate-45" />
                            <span className="text-[14px] md:text-[15px] font-bold text-white transition-colors">
                              {link.label}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3 relative z-10">
                            {link.badge && (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[9px] font-bold uppercase tracking-widest text-emerald-300">
                                {link.badge}
                              </span>
                            )}
                            <ArrowUpRight className="w-4 h-4 text-emerald-400" strokeWidth={3} />
                          </div>
                        </a>
                      ))}

                      {/* Regular Links */}
                      {regularLinks.map((link, j) => (
                        <a
                          key={`reg-${j}`}
                          href={link.url}
                          className="group/link flex items-center justify-between py-4 px-4 -mx-4 rounded-xl border border-transparent hover:border-white/[0.05] hover:bg-white/[0.02] transition-all duration-300"
                        >
                           <div className="flex flex-col gap-1 w-full pr-4">
                             <div className="flex items-center gap-2">
                               <span className="text-[14px] md:text-[15px] font-medium text-zinc-400 group-hover/link:text-zinc-200 transition-colors">
                                 {link.label}
                               </span>
                               {link.badge && (
                                 <span className="px-1.5 py-0.5 rounded border border-white/[0.1] bg-white/[0.05] text-[9px] font-bold uppercase tracking-widest text-zinc-300">
                                   {link.badge}
                                 </span>
                               )}
                             </div>
                           </div>
                           <ArrowUpRight className="shrink-0 w-4 h-4 text-zinc-600 group-hover/link:text-white transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" strokeWidth={2.5} />
                        </a>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-white/[0.03]">
                       <a href={group.links[0]?.url || "#"} className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl border border-white/[0.1] bg-[#121214] text-xs font-bold text-zinc-300 uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all group/explore shadow-lg break-all text-center">
                          <span className="truncate">Explore {group.title}</span>
                          <ArrowRight className="shrink-0 w-4 h-4 transform group-hover/explore:translate-x-1 transition-transform" />
                       </a>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </ScrollReveal>

          <div className="absolute -inset-1 bg-gradient-to-br from-white/[0.05] to-transparent rounded-[3rem] transform translate-y-4 -z-10 group-hover:translate-y-6 transition-transform duration-1000 pointer-events-none hidden md:block border border-white/[0.02]"></div>
          
        </div>

      </div>
    </section>
  );
}

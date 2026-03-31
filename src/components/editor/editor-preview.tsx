"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { EditorSection } from "@/types/editor";

interface EditorPreviewProps {
  sections: EditorSection[];
}

export function EditorPreview({ sections }: EditorPreviewProps) {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("mobile");
  
  const enabledSections = sections.filter(s => s.isEnabled);

  const getDeviceClasses = () => {
    switch (device) {
      case "mobile":
        return "w-[375px] h-[812px] rounded-[3rem] border-[8px] border-[#1A1A1A] bg-[#050505] shadow-2xl overflow-y-auto custom-scrollbar";
      case "tablet":
        return "w-[768px] h-[1024px] rounded-[2rem] border-[12px] border-[#1A1A1A] bg-[#050505] shadow-2xl overflow-y-auto custom-scrollbar scale-[0.65] origin-top";
      case "desktop":
        return "w-[1200px] h-[800px] rounded-xl border border-white/10 bg-[#050505] shadow-2xl overflow-hidden scale-[0.45] lg:scale-[0.55] xl:scale-[0.65] origin-top flex flex-col";
    }
  };

  return (
    <div className="w-[450px] lg:w-[500px] xl:w-[600px] border-l border-white/5 bg-[#0A0A0A] flex flex-col h-full hidden lg:flex">
      <div className="p-4 border-b border-white/5 flex items-center justify-between z-10 bg-[#0A0A0A]">
        <h2 className="text-sm font-semibold text-white/90">Live Preview</h2>
        
        <div className="flex bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setDevice("mobile")}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              device === "mobile"
                ? "bg-white/10 text-white shadow-sm"
                : "text-white/50 hover:text-white/80"
            )}
            title="Mobile Preview"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              device === "tablet"
                ? "bg-white/10 text-white shadow-sm"
                : "text-white/50 hover:text-white/80"
            )}
            title="Tablet Preview"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice("desktop")}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              device === "desktop"
                ? "bg-white/10 text-white shadow-sm"
                : "text-white/50 hover:text-white/80"
            )}
            title="Desktop Preview"
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[url('/images/grid-pattern.svg')] bg-repeat bg-[length:24px_24px] bg-center bg-[#050505] flex justify-center pt-8 pb-12 overflow-y-auto custom-scrollbar relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none z-0" />
        
        <div className={cn("transition-all duration-500 flex z-10", getDeviceClasses())}>
          {device === "desktop" && (
            <div className="h-12 border-b border-white/10 bg-[#0A0A0A] flex items-center px-4 gap-2 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <div className="mx-auto h-6 w-1/2 bg-white/5 rounded-md border border-white/5 flex items-center justify-center text-[10px] text-white/30 font-mono">
                lynknov.com/your-profile
              </div>
            </div>
          )}

          <div className={cn("w-full h-full", device === "desktop" ? "overflow-y-auto custom-scrollbar" : "")}>
            {enabledSections.length === 0 ? (
              <div className="h-full flex items-center justify-center text-white/30 text-sm p-6 text-center">
                <div>
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-6 h-6 text-white/20" />
                  </div>
                  <p>Tidak ada section yang aktif.<br/>Aktifkan section di sidebar.</p>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-6 p-6 pb-20">
                {enabledSections.map((section) => (
                  <div 
                    key={section.id}
                    className="w-full flex flex-col relative group"
                  >
                    {section.type === "hero" ? (
                      <div className={cn(
                        "flex flex-col gap-6",
                        section.style.alignment === "center" ? "items-center text-center" : 
                        section.style.alignment === "right" ? "items-end text-right" : "items-start text-left"
                      )}>
                        <div className="flex w-full gap-8">
                          <div className="flex-1 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-white leading-[1.1] mb-4">{(section.content as HeroSection["content"]).headline || "Your Headline"}</h2>
                            <p className="text-sm text-zinc-400 leading-relaxed mb-6">{(section.content as HeroSection["content"]).description || "Your brief description"}</p>
                            <div className="flex gap-3">
                              <div className="h-10 px-6 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center cursor-pointer">
                                {(section.content as HeroSection["content"]).primaryCta?.label || "Hubungi Saya"}
                              </div>
                              <div className="h-10 px-6 rounded-xl border border-white/10 text-white font-semibold text-sm flex items-center justify-center cursor-pointer">
                                <Monitor className="w-4 h-4 mr-2" />
                                {(section.content as HeroSection["content"]).secondaryCta?.label || "Play Video"}
                              </div>
                            </div>
                          </div>
                          
                          {(section.content as HeroSection["content"]).avatarUrl ? (
                            <div className={cn(
                              "w-48 h-64 shrink-0 bg-white/5 border border-white/10 shadow-2xl relative",
                              section.style.avatarShape === "circle" ? "rounded-full" : 
                              section.style.avatarShape === "rounded-xl" ? "rounded-xl" : "rounded-3xl"
                            )}>
                              <div className="absolute inset-2 rounded-[1.2rem] overflow-hidden" style={{ backgroundImage: `url(${(section.content as HeroSection["content"]).avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 w-full flex justify-center">
                                  <div className="bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-[10px] text-white flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Active
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className={cn(
                              "w-48 h-64 shrink-0 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center text-emerald-500/50 text-sm font-medium border border-emerald-500/20",
                              section.style.avatarShape === "circle" ? "rounded-full" : 
                              section.style.avatarShape === "rounded-xl" ? "rounded-xl" : "rounded-[2rem]"
                            )}>Avatar</div>
                          )}
                        </div>
                      </div>
                    ) : section.type === "about" ? (
                      <div className="flex gap-6 mt-8">
                        <div className="w-1/3 p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-500/10 blur-xl"></div>
                          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">{(section.content as AboutSection["content"]).title || "About Title"}</h3>
                          <div className="w-6 h-6 rounded border border-white/20 flex items-center justify-center mb-2">
                            <span className="text-white/60 text-[10px]">✨</span>
                          </div>
                          <div className="text-[10px] text-white/40 mt-2">Design Focus</div>
                        </div>
                        <div className="w-2/3 p-6 rounded-2xl bg-[#0A0A0A] border border-white/5">
                          <p className="text-sm text-white/70 leading-relaxed font-medium">{(section.content as AboutSection["content"]).description || "About description..."}</p>
                        </div>
                      </div>
                    ) : section.type === "digital_presence" ? (
                      <div className="flex flex-col items-center text-center mt-12 gap-8">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest">{(section.content as DigitalPresenceSection["content"]).title || "Digital Presence"}</h3>
                        </div>
                        <div className="flex justify-center gap-4 w-full">
                          {((section.content as DigitalPresenceSection["content"]).stats || []).map((stat, i: number) => (
                            <div key={i} className="flex-1 max-w-[120px] flex flex-col items-center justify-center gap-2 p-4 rounded-full bg-[#0A0A0A] border border-white/5">
                              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-1">
                                <span className="text-white/40 text-xs">@</span>
                              </div>
                              <div className="text-[10px] text-white/50">{stat.platform}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : section.type === "showcase" ? (
                      <div className="flex flex-col items-center mt-16 gap-8 w-full">
                        <div className="flex flex-col text-center gap-2">
                          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{(section.content as ShowcaseSection["content"]).title || "Showcase Storefront"}</h3>
                          <p className="text-xs text-white/50">{(section.content as ShowcaseSection["content"]).description}</p>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-4">
                          {((section.content as ShowcaseSection["content"]).items || []).map((item, i: number) => (
                            <div key={i} className="flex flex-col gap-3">
                              <div className="aspect-[4/3] rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden flex items-center justify-center">
                                <Monitor className="w-8 h-8 text-white/10" />
                              </div>
                              <div className="flex flex-col gap-1 px-1">
                                <div className="text-[10px] font-bold text-emerald-400 uppercase">{item.type} • {item.price}</div>
                                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                                <div className="mt-2 h-8 rounded-full border border-white/10 bg-white/5 text-[10px] font-semibold text-white flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                                  {item.ctaText}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : section.type === "storyboard" ? (
                      <div className="flex flex-col items-center mt-16 gap-8 w-full">
                        <div className="flex flex-col text-center gap-2">
                          <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-widest">{(section.content as StoryboardSection["content"]).title || "Storyboard"}</h3>
                        </div>
                        <div className="w-full flex gap-4">
                          <div className="w-1/2 aspect-square rounded-2xl bg-[#0A0A0A] border border-white/5 flex items-center justify-center">
                            <Monitor className="w-8 h-8 text-white/10" />
                          </div>
                          <div className="w-1/2 p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 flex flex-col justify-center">
                            <div className="text-sm font-semibold text-white mb-2">{((section.content as StoryboardSection["content"]).items?.[0]?.title) || "Timeline Event"}</div>
                            <p className="text-xs text-white/50 leading-relaxed">{((section.content as StoryboardSection["content"]).items?.[0]?.content) || "Description of the event goes here..."}</p>
                            <div className="mt-4 h-8 px-4 rounded-full border border-white/10 inline-flex self-start items-center text-[10px] text-white/70">
                              Baca Artikel
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : section.type === "portfolio" ? (
                      <div className="flex flex-col items-center mt-16 gap-8 w-full">
                        <div className="flex flex-col text-center gap-2">
                          <h3 className="text-lg font-semibold text-white">{(section.content as PortfolioSection["content"]).title || "Project & Portfolio"}</h3>
                          <p className="text-xs text-white/50">{(section.content as PortfolioSection["content"]).description}</p>
                        </div>
                        <div className="w-full p-4 rounded-[2rem] bg-[#0A0A0A] border border-white/5 flex flex-col gap-4">
                           <div className="aspect-[2/1] w-full rounded-2xl bg-white/5 flex items-center justify-center">
                             <Monitor className="w-8 h-8 text-white/10" />
                           </div>
                           <div className="flex justify-between items-center px-2">
                             <div className="flex flex-col">
                               <div className="text-[10px] text-emerald-400 font-semibold mb-1">{(section.content as PortfolioSection["content"]).items?.[0]?.category || "Category"}</div>
                               <div className="text-sm font-semibold text-white">{(section.content as PortfolioSection["content"]).items?.[0]?.title || "Project Name"}</div>
                             </div>
                             <div className="h-8 px-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
                               Detail
                             </div>
                           </div>
                        </div>
                      </div>
                    ) : section.type === "link_hub" ? (
                      <div className="flex flex-col items-center mt-16 gap-8 w-full">
                        <div className="flex flex-col text-center gap-2">
                          <h3 className="text-lg font-semibold text-white">{(section.content as LinkHubSection["content"]).title || "Dynamic Link Hub"}</h3>
                        </div>
                        <div className="w-full p-6 rounded-3xl bg-[#0A0A0A] border border-white/5 flex flex-col gap-6">
                           <div className="flex justify-between items-center border-b border-white/10 pb-4">
                             <div className="flex items-center gap-2">
                               <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                 <Monitor className="w-4 h-4 text-emerald-400" />
                               </div>
                               <span className="text-xs font-semibold text-emerald-400">Personal</span>
                             </div>
                             <div className="flex items-center gap-2">
                               <span className="text-xs font-semibold text-white/50">Work</span>
                               <span className="text-xs font-semibold text-white/50">Product</span>
                             </div>
                           </div>
                           <div className="flex flex-col gap-3">
                             {((section.content as LinkHubSection["content"]).groups?.[0]?.links || []).map((link, i: number) => (
                               <div key={i} className="w-full h-12 rounded-xl bg-white/5 border border-white/5 flex items-center px-4 justify-between">
                                 <span className="text-xs font-medium text-white">{link.label}</span>
                                 <Monitor className="w-3 h-3 text-white/30" />
                               </div>
                             ))}
                           </div>
                        </div>
                      </div>
                    ) : section.type === "testimonials" ? (
                      <div className="flex flex-col items-center mt-16 gap-8 w-full">
                        <div className="flex flex-col text-center gap-2">
                          <h3 className="text-lg font-semibold text-white font-serif">{(section.content as TestimonialsSection["content"]).title || "Testimoni"}</h3>
                        </div>
                        <div className="w-full p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 text-center relative">
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl text-white/10 font-serif">&quot;</div>
                          <p className="text-sm text-white/80 leading-relaxed relative z-10 font-medium italic">
                            &quot;{((section.content as TestimonialsSection["content"]).items?.[0]?.quote) || "Testimonial quote goes here. It should be impactful."}&quot;
                          </p>
                          <div className="mt-6 flex flex-col items-center gap-1">
                            <span className="text-xs font-bold text-white">{((section.content as TestimonialsSection["content"]).items?.[0]?.author) || "Name"}</span>
                            <span className="text-[10px] text-white/50">{((section.content as TestimonialsSection["content"]).items?.[0]?.role) || "Role"}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/5 border-dashed">
                        <h3 className="font-semibold text-white/70">{section.label}</h3>
                        <p className="text-xs text-white/30">Belum ada konten untuk ditampilkan</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

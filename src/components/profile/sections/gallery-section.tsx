"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ProfileData } from "../types/profile";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { Target, X, Plus } from "lucide-react";
import { AnimatedTitle } from "../ui/animated-title";
import { ScrollReveal } from "../ui/scroll-reveal";

interface GallerySectionProps {
  profile: ProfileData;
}

// Pre-curated "Star Constellation" pattern for 15 items
const CONSTELLATION = [
  { x: 15, y: 15, rotate: -4, size: 'large', type: 'UI Exploration', context: 'Eksplorasi layout dashboard awal dengan pendekatan glassmorphism.' },
  { x: 35, y: 10, rotate: 2, size: 'medium', type: 'Wireframe', context: 'Corat-coret awal alur kerja pengguna sebelum masuk ke Figma.' },
  { x: 55, y: 18, rotate: -6, size: 'small', type: 'Moodboard', context: 'Kumpulan referensi warna dan tekstur yang mendefinisikan estetika.' },
  { x: 75, y: 12, rotate: 5, size: 'large', type: 'Workspace', context: 'Suasana meja kerja saat menyelesaikan sprint akhir bulan.' },
  { x: 90, y: 25, rotate: -2, size: 'medium', type: 'Asset', context: 'Desain ikon kustom untuk membedakan identitas visual.' },
  
  { x: 10, y: 45, rotate: 6, size: 'medium', type: 'Prototype', context: 'Pengujian interaksi micro-animation pada komponen tombol.' },
  { x: 30, y: 55, rotate: -5, size: 'large', type: 'Case Study', context: 'Potongan studi kasus dari klien agensi kreatif lokal.' },
  { x: 50, y: 40, rotate: 3, size: 'medium', type: 'Behind The Scenes', context: 'Diskusi arsitektur sistem bersama tim engineering inti.' },
  { x: 70, y: 60, rotate: -7, size: 'large', type: 'Final Render', context: 'Tampilan produk jadi sesaat sebelum diluncurkan ke publik.' },
  { x: 85, y: 45, rotate: 4, size: 'small', type: 'Sketch', context: 'Ide liar yang muncul di kedai kopi jam 2 pagi.' },
  
  { x: 18, y: 80, rotate: -3, size: 'large', type: 'Process', context: 'Pemetaan komponen desain sistem dari atom hingga organisme.' },
  { x: 40, y: 75, rotate: 5, size: 'medium', type: 'UI Kit', context: 'Penyusunan variabel warna dan struktur tipografi dasar.' },
  { x: 60, y: 85, rotate: -4, size: 'large', type: 'Photography', context: 'Sesi pemotretan produk untuk materi kampanye peluncuran.' },
  { x: 80, y: 78, rotate: 6, size: 'medium', type: 'Branding', context: 'Eksplorasi logo dan panduan identitas merek.' },
  { x: 95, y: 85, rotate: -2, size: 'small', type: 'Review', context: 'Momen evaluasi desain bersama pemangku kepentingan.' },
];

export function GallerySection({ profile }: GallerySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<{
    w: number;
    h: number;
    x: number;
    y: number;
    rotate: number;
    type: string;
    context: string;
    id: string;
    url: string;
    ratio: "portrait" | "landscape" | "square";
  } | null>(null);

  // Base dimensions layout
  const CANVAS_W = 2800;
  const CANVAS_H = 1800;

  const canvasX = useMotionValue(0);
  const canvasY = useMotionValue(0);
  const controls = useAnimation();

  // Define items before using them
  const items = useMemo(() => {
    return profile.gallery?.map((img, i) => {
      const config = CONSTELLATION[i % CONSTELLATION.length];
      
      // Size to actual dimensions mapping
      let width = 300, height = 400;
      
      if (img.ratio === 'square') { width = 400; height = 400; }
      else if (img.ratio === 'landscape') { width = 500; height = 350; }
      else if (img.ratio === 'portrait') { width = 350; height = 500; }
      
      // Apply size multiplier from config
      const scale = config.size === 'large' ? 1.4 : config.size === 'medium' ? 1 : 0.7;
      
      return {
        ...img,
        w: width * scale,
        h: height * scale,
        x: (CANVAS_W * config.x) / 100,
        y: (CANVAS_H * config.y) / 100,
        rotate: config.rotate,
        type: config.type,
        context: config.context,
      };
    }) || [];
  }, [profile.gallery]);

  useEffect(() => {
    if (!profile.gallery || profile.gallery.length === 0) return;
    
    // Auto-center on initial load
    const cx = (window.innerWidth - CANVAS_W) / 2;
    const cy = (window.innerHeight - CANVAS_H) / 2;
    
    canvasX.set(cx);
    canvasY.set(cy);
  }, [canvasX, canvasY, profile.gallery]);

  useEffect(() => {
    if (containerRef.current && items[7]) {
      const rect = containerRef.current.getBoundingClientRect();
      const targetX = (rect.width / 2) - (items[7].x + items[7].w / 2);
      const targetY = (rect.height / 2) - (items[7].y + items[7].h / 2);

      canvasX.set(targetX);
      canvasY.set(targetY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- set initial active item on mount
      setActiveId(items[7].id);
    }
  }, [canvasX, canvasY, items]);

  if (!profile.gallery || profile.gallery.length === 0) return null;

  const updateActiveItem = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const vpCenterX = rect.width / 2;
    const vpCenterY = rect.height / 2;

    const currentCx = canvasX.get();
    const currentCy = canvasY.get();

    let closest = items[0];
    let minDist = Infinity;

    items.forEach((item) => {
      const ix = item.x + item.w / 2 + currentCx;
      const iy = item.y + item.h / 2 + currentCy;

      const dist = Math.sqrt(Math.pow(ix - vpCenterX, 2) + Math.pow(iy - vpCenterY, 2));
      if (dist < minDist) {
        minDist = dist;
        closest = item;
      }
    });

    if (minDist < 400) {
      setActiveId(closest.id);
    } else {
      setActiveId(null);
    }
  };

  const handleDragEnd = () => {
    updateActiveItem();
  };

  const handleDrag = () => {
    updateActiveItem();
  };

  const flyToItem = async (item: typeof items[0]) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const targetX = (rect.width / 2) - (item.x + item.w / 2);
    const targetY = (rect.height / 2) - (item.y + item.h / 2);

    await controls.start({
      x: targetX,
      y: targetY,
      transition: { type: "spring", stiffness: 60, damping: 15 }
    });
    
    canvasX.set(targetX);
    canvasY.set(targetY);
    setActiveId(item.id);
  };

  return (
    <section className="relative w-full py-24 md:py-36 bg-gradient-to-b from-[#0A0A0C] via-[#0D0D11] to-[#08080A] overflow-hidden border-none">
      
      {/* Premium Background (Family 3) — Velvet Gradient Surface */}
      <div className="absolute inset-x-0 inset-y-0 w-full h-full pointer-events-none z-0">
        {/* Soft velvet corner glows */}
        <div className="absolute top-0 right-0 w-[50vw] h-[60vh] bg-[radial-gradient(circle_at_top_right,rgba(16,21,38,0.4)_0%,transparent_60%)] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_bottom_left,rgba(5,20,30,0.4)_0%,transparent_60%)] pointer-events-none z-0"></div>
      </div>
      
      {/* Header Info */}
      <div className="relative z-20 flex flex-col md:flex-row items-end justify-between mx-auto max-w-[1300px] px-6 md:px-12 xl:px-16 mb-12 select-none pointer-events-none">
        <ScrollReveal delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/40 bg-zinc-800/10 backdrop-blur text-[10px] font-bold text-zinc-400 uppercase tracking-widest shadow-lg mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            Curated Canvas
          </div>
          <AnimatedTitle 
            title="Curated Board" 
            className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-white mb-4 leading-[1.05]" 
          />
          <p className="text-sm md:text-base text-zinc-400 font-medium max-w-xl text-balance">
            Bukan sekadar galeri, tapi potongan dunia kreatif, eksplorasi desain, dan eksekusi di balik layar kerja saya.
          </p>
        </ScrollReveal>
      </div>

      {/* The Viewport */}
      <ScrollReveal delay={0.3} className="w-full relative z-10 mx-auto px-4 md:px-12 max-w-[1500px]">
        <div className="absolute -inset-x-0 inset-y-12 bg-zinc-900/40 blur-[40px] rounded-[3rem] -z-10 mix-blend-plus-lighter pointer-events-none hidden md:block"></div>
        
        {/* Animated Premium Glow Border Behind the Container */}
        <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-emerald-500/30 rounded-[3rem] animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] -z-20"></div>
        <div className="absolute -inset-[2px] bg-gradient-to-tr from-white/[0.1] via-white/[0.02] to-white/[0.05] rounded-[2.6rem] -z-10 bg-[length:200%_auto] animate-[pulse_4s_ease-in-out_infinite]"></div>

        <div 
          ref={containerRef}
          className="w-full h-[65vh] md:h-[75vh] relative z-20 cursor-grab active:cursor-grabbing overflow-hidden rounded-[2.5rem] bg-[#0A0A0C]/80 backdrop-blur-3xl border border-white/[0.05] shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_2px_20px_rgba(255,255,255,0.03)]"
        >
          {/* Inner board depth light */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>

          <motion.div 
            ref={canvasRef}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 60, bounceDamping: 15, timeConstant: 300 }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ x: canvasX, y: canvasY, width: CANVAS_W, height: CANVAS_H }}
            className="absolute origin-center"
          >
            {items.map((item, idx) => {
              const isActive = activeId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.6,
                    scale: isActive ? 1.05 : 0.98,
                    rotate: isActive ? 0 : item.rotate,
                    zIndex: isActive ? 50 : idx,
                    boxShadow: isActive ? "0 40px 100px -20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.4)" : "0 20px 40px -10px rgba(0,0,0,0.6)"
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute',
                    left: item.x,
                    top: item.y,
                    width: item.w,
                    height: item.h,
                  }}
                  className={`group rounded-xl overflow-hidden bg-black/50 border border-white/[0.1] transition-all hover:border-white/[0.3] backdrop-blur-sm p-1.5 md:p-2 ${isActive ? 'ring-1 ring-white/10' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isActive) flyToItem(item);
                    else setIsFullscreen(item);
                  }}
                >
                  {/* Subtle inner matting core frame */}
                  <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#0a0a0c]">
                    
                    <Image
                      src={item.url}
                      alt={`Gallery Image ${idx+1}`}
                      fill
                      sizes="(max-width: 768px) 300px, 500px"
                      className={`object-cover transition-all duration-700 ${isActive ? 'scale-105 saturate-100 brightness-110' : 'scale-100 saturate-50 brightness-75'}`}
                      draggable={false}
                    />
                    
                    {/* Metallic Pin Fastener overlay logic (randomize top or corner) */}
                    {idx % 3 !== 0 && (
                      <div className="absolute top-0 right-[25%] md:right-4 w-3.5 h-6 bg-gradient-to-b from-[#e0e0e0] to-[#808080] rounded-[1px] shadow-[1px_2px_4px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(255,255,255,0.4)] z-20 before:absolute before:inset-x-0 before:-bottom-1 before:h-[2px] before:bg-zinc-800 before:opacity-30 mix-blend-hard-light transform -translate-y-1">
                        {/* the small screw dot on the clip */}
                        <div className="absolute top-1 left-1.5 w-[5px] h-[5px] rounded-full bg-zinc-700 shadow-inner"></div>
                      </div>
                    )}
                    
                    {/* Dark gradient overlay for caption */}
                    <div className={`absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-500 flex flex-col justify-end ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                       <h3 className="text-sm md:text-base font-bold text-white mb-1 font-serif tracking-tight drop-shadow-md">{item.type}</h3>
                       <p className="text-[10px] md:text-xs text-zinc-300 font-medium line-clamp-2 md:line-clamp-3 leading-snug drop-shadow-sm max-w-[85%]">
                         {item.context}
                       </p>
                    </div>

                    {/* Quick Expand Hint */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                      <Plus className="w-4 h-4" />
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mini-Map Radar (Bottom Left / Inside the container practically) */}
        <div className="absolute bottom-6 md:bottom-10 right-10 md:right-20 z-30 bg-[#121214]/90 backdrop-blur-2xl border border-white/[0.08] p-3 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col items-center">
          <Target className="w-4 h-4 text-zinc-600 mb-2" strokeWidth={1.5} />
          <div className="relative w-[120px] h-[75px] rounded-xl border border-white/[0.05] bg-black/60 overflow-hidden shadow-inner">
            {items.map(item => (
              <button 
                key={item.id}
                onClick={() => flyToItem(item)}
                className={`absolute w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-150 ${activeId === item.id ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,1)] z-20 scale-150' : 'bg-white/20 z-10 hover:bg-white/50'}`}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              ></button>
            ))}
            {/* Field of View Indicator approximation (cosmetic) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-6 border border-white/10 rounded pointer-events-none mix-blend-screen opacity-50 bg-white/[0.02]"></div>
          </div>
        </div>

      </ScrollReveal>

      {/* Expanded Story Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-center p-0 md:p-12 overflow-hidden">
          
          <button 
            className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 text-white transition-colors rounded-full flex items-center justify-center border border-white/[0.1] backdrop-blur"
            onClick={() => setIsFullscreen(null)}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-full md:w-2/3 h-[50vh] md:h-full relative overflow-hidden bg-[#0A0A0A] md:rounded-l-3xl shadow-2xl">
            <Image src={isFullscreen.url} alt="Fullscreen" fill className="object-cover md:object-contain bg-black" />
          </div>

          <div className="w-full md:w-1/3 h-[50vh] md:h-full bg-[#111114] p-8 md:p-16 flex flex-col justify-center border-l border-white/[0.05] md:rounded-r-3xl">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.05] border border-white/[0.05] text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6 w-max">
               {isFullscreen.type}
             </div>
             <h3 className="text-3xl md:text-5xl font-serif text-white font-bold mb-6 leading-tight tracking-tight">
               Eksplorasi Konsep & Realisasi.
             </h3>
             <p className="text-base md:text-lg text-zinc-400 font-medium leading-[1.7] mb-8 text-balance">
               {isFullscreen.context}
             </p>
             <p className="text-sm text-zinc-500 font-normal leading-relaxed text-balance">
               Tiap potongan visual menceritakan proses penyelesaian masalah yang asimetris. Tidak kaku, penuh penyesuaian, namun dengan eksekusi hasil yang solid.
             </p>
          </div>

        </div>
      )}

    </section>
  );
}

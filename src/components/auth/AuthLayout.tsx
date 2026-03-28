"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, LayoutDashboard, MousePointerClick, TrendingUp, Users, Globe } from "lucide-react";
import { motion, AnimatePresence, animate, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

const AuthContext = createContext<{
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
}>({
  isFocused: false,
  setIsFocused: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthLayoutProps {
  children: React.ReactNode;
  badgeText?: string;
  title: React.ReactNode;
  description: string;
  features: string[];
  metricsType?: "growth" | "management";
  animationType?: "up" | "slide";
}

export default function AuthLayout({ 
  children,
  badgeText = "Interactive Business OS",
  title,
  description,
  features,
  metricsType = "growth",
  animationType = "up"
}: AuthLayoutProps) {
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // Numbers for growth
  const [clicks, setClicks] = useState(0);
  const [convRate, setConvRate] = useState(0);

  // Numbers for management
  const [leads, setLeads] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    if (metricsType === "growth") {
      const controls1 = animate(0, 12402, { duration: 2.5, ease: "easeOut", onUpdate: (val) => setClicks(Math.floor(val)) });
      const controls2 = animate(0, 8.4, { duration: 2.5, ease: "easeOut", onUpdate: (val) => setConvRate(Number(val.toFixed(1))) });
      return () => { controls1.stop(); controls2.stop(); };
    } else {
      const controls1 = animate(0, 142, { duration: 2.5, ease: "easeOut", onUpdate: (val) => setLeads(Math.floor(val)) });
      return () => { controls1.stop(); };
    }
  }, [metricsType]);
  
  if (!mounted) return null;

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: animationType === "up" ? 40 : 0,
      x: animationType === "slide" ? 40 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 } 
    },
    exit: { 
      opacity: 0, 
      y: animationType === "up" ? -20 : 0,
      x: animationType === "slide" ? -20 : 0,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <AuthContext.Provider value={{ isFocused, setIsFocused }}>
      <div className={`flex min-h-screen bg-[var(--color-surface-base)] overflow-hidden transition-colors duration-700`}>
        
        {/* Animated Background System */}
        <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${isFocused ? "opacity-30" : "opacity-100"}`}>
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.02)_0%,transparent_60%)]"></div>
          
          <motion.div 
            animate={{ 
              opacity: isFocused ? 0.05 : [0.1, 0.15, 0.1],
              scale: isFocused ? 1.05 : [1, 1.02, 1]
            }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
            className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-[#6366f1]/10 rounded-full blur-[120px]"
          />
        </div>

        {/* LEFT SIDE - Product Narrative */}
        <div className={`hidden lg:flex flex-[5.5] flex-col justify-between relative z-10 px-16 xl:px-24 py-16 border-r border-white/5 transition-all duration-700 ${isFocused ? "opacity-30 blur-[2px]" : "opacity-100"}`}>
          
          {/* Content Wrapper for entrance animation */}
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col h-full justify-between"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-medium tracking-tight text-white flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 group-hover:scale-105">
                  <div className="w-3 h-3 rounded-full bg-black"></div>
                </div>
                <span className="relative">Lynknov</span>
              </Link>
            </div>

            {/* Main Content */}
            <div className="max-w-[580px] mt-12">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-xs font-medium text-white mb-8"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#a78bfa]" /> {badgeText}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.15] mb-6 text-white text-balance"
              >
                {title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-md"
              >
                {description}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex flex-wrap gap-x-8 gap-y-4"
              >
                {features.map((point, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-[var(--color-text-secondary)]">
                    <CheckCircle2 className="w-4 h-4 text-[#a78bfa]/80" />
                    {point}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Abstract System Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="w-full max-w-[580px] mt-16 rounded-[24px] bg-[var(--color-surface-elevated)] border border-white/5 p-6 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] group"
            >
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center border border-white/10">
                    <LayoutDashboard className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Live Workspace</div>
                    <div className="text-xs text-[var(--color-text-secondary)] flex items-center gap-2 mt-0.5">
                      <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative flex items-center justify-center w-2 h-2"
                      >
                        <span className="absolute w-full h-full bg-[#34d399] rounded-full blur-[2px] opacity-60"></span>
                        <span className="relative w-1.5 h-1.5 rounded-full bg-[#34d399]"></span>
                      </motion.div>
                      Sistem aktif berjalan
                    </div>
                  </div>
                </div>
              </div>

              {metricsType === "growth" ? (
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 relative overflow-hidden hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)] text-xs font-medium">
                      <MousePointerClick className="w-3.5 h-3.5 text-[#a78bfa]" /> Kunjungan Profil
                    </div>
                    <div className="text-2xl font-semibold text-white tracking-tight">
                      {clicks.toLocaleString()}
                    </div>
                    <div className="flex items-end gap-1.5 h-10 mt-2">
                      {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                        <motion.div 
                          key={i} 
                          animate={{ height: [`${h * 0.7}%`, `${h}%`, `${h * 0.7}%`] }}
                          transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                          className="flex-1 rounded-sm bg-gradient-to-t from-[#a78bfa]/20 to-[#a78bfa]/60"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 relative overflow-hidden hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)] text-xs font-medium">
                      <TrendingUp className="w-3.5 h-3.5 text-[#60a5fa]" /> Konversi Klien
                    </div>
                    <div className="text-2xl font-semibold text-white tracking-tight">
                      {convRate.toFixed(1)}%
                    </div>
                    <div className="flex items-end gap-1.5 h-10 mt-2">
                      {[20, 30, 45, 40, 60, 65, 85].map((h, i) => (
                        <motion.div 
                          key={i} 
                          animate={{ height: [`${h * 0.7}%`, `${h}%`, `${h * 0.7}%`] }}
                          transition={{ duration: 3.5, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                          className="flex-1 rounded-sm bg-gradient-to-t from-[#60a5fa]/20 to-[#60a5fa]/60"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 relative overflow-hidden hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)] text-xs font-medium">
                      <Users className="w-3.5 h-3.5 text-[#a78bfa]" /> Leads Baru
                    </div>
                    <div className="text-2xl font-semibold text-white tracking-tight">
                      +{leads}
                    </div>
                    <div className="flex items-center gap-2 mt-auto pt-2">
                      <div className="text-xs text-[#34d399] font-medium bg-[#34d399]/10 px-2 py-0.5 rounded">+12% hr ini</div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 relative overflow-hidden hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)] text-xs font-medium">
                      <Globe className="w-3.5 h-3.5 text-[#60a5fa]" /> Status Halaman
                    </div>
                    <div className="text-lg font-semibold text-white tracking-tight mt-1">
                      Aktif & Live
                    </div>
                    <div className="flex items-center gap-2 mt-auto pt-2">
                      <div className="text-xs text-[var(--color-text-secondary)]">Semua sistem optimal</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Auth Form */}
        <div className="flex-[4.5] flex flex-col justify-center items-center p-6 relative z-20 w-full bg-[var(--color-surface-base)] lg:bg-transparent">
          
          <div className="absolute top-6 left-6 lg:hidden">
            <Link href="/" className="text-xl font-medium tracking-tight text-white flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <div className="w-3 h-3 rounded-full bg-black"></div>
              </div>
              <span className="relative">Lynknov</span>
            </Link>
          </div>

          <div className="w-full max-w-[400px] relative">
            
            <motion.div 
              animate={{ opacity: isFocused ? 0.15 : 0.05 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[#a78bfa]/20 blur-[60px] pointer-events-none rounded-2xl"
            ></motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="rounded-[24px] p-8 sm:p-10 surface-elevated relative z-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden group/card"
              >
                {/* Subtle mouse-follow lighting effect approximation via CSS */}
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_50%)]"></div>
                
                <div className="relative z-10">
                  {children}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </AuthContext.Provider>
  );
}

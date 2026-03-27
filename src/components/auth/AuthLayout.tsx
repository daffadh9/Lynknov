"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, LayoutDashboard, MousePointerClick, TrendingUp } from "lucide-react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { usePathname } from "next/navigation";

// Create context for focus mode
const AuthContext = createContext<{
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
}>({
  isFocused: false,
  setIsFocused: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // Number counters
  const [clicks, setClicks] = useState(0);
  const [convRate, setConvRate] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Animate numbers
    const controls1 = animate(0, 12402, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (val) => setClicks(Math.floor(val)),
    });
    
    const controls2 = animate(0, 8.4, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (val) => setConvRate(Number(val.toFixed(1))),
    });

    return () => {
      controls1.stop();
      controls2.stop();
    };
  }, []);
  
  // Dynamic background gradient based on route
  const isLogin = pathname === "/login";

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <AuthContext.Provider value={{ isFocused, setIsFocused }}>
      <div className={`flex min-h-screen bg-[#030303] overflow-hidden transition-colors duration-700 ${isFocused ? "bg-[#000000]" : ""}`}>
        
        {/* Animated Background System */}
        <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${isFocused ? "opacity-40" : "opacity-100"}`}>
          {/* Base Grain/Noise Texture */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          {/* Radial Subtle Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.03)_0%,transparent_60%)]"></div>
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.4)_100%)]"></div>
          
          {/* Animated Glows */}
          <motion.div 
            animate={{ 
              x: isFocused ? -20 : [0, 20, 0], 
              y: isFocused ? -20 : [0, -30, 0],
              scale: isFocused ? 1.05 : [1, 1.1, 1],
              opacity: isFocused ? 0.2 : [0.3, 0.4, 0.3] 
            }}
            transition={{ duration: 8, ease: "easeInOut", repeat: isFocused ? 0 : Infinity }}
            className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-purple-900/30 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: isLogin ? [1, 1.05, 1] : 1.1,
              opacity: isLogin ? [0.2, 0.3, 0.2] : 0.1,
              x: [0, -20, 0]
            }}
            transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
            className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px]"
          />
        </div>

        {/* LEFT SIDE (60%) - Living System Preview */}
        <div className={`hidden lg:flex flex-[6] flex-col justify-between relative z-10 px-20 py-16 border-r border-white/5 transition-all duration-700 ${isFocused ? "opacity-30 blur-[2px]" : "opacity-100"}`}>
          {/* Header */}
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-medium tracking-tight text-white flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300">
                <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
              </div>
              <span className="relative">
                Lynknov
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-clip-text text-transparent opacity-0 group-hover:animate-[shimmer_2s_infinite]">Lynknov</span>
              </span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="max-w-[640px] mt-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[10px] font-medium text-white/70 mb-8 uppercase tracking-widest shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"
            >
              <Sparkles className="w-3 h-3 text-purple-400" /> Interactive Business OS
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6 text-white text-balance"
            >
              Ubah klik pertama jadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">peluang bisnis.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-[var(--color-text-secondary)] leading-[1.6] max-w-lg"
            >
              Bangun sistem kehadiran digital yang bukan sekadar profil, tapi mesin konversi yang bekerja untuk Anda.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex gap-6"
            >
              {[
                "Aman & terenkripsi",
                "Tanpa spam",
                "Siap dalam hitungan menit"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-purple-400/60" />
                  {point}
                </div>
              ))}
            </motion.div>
          </div>

          {/* System Preview (Living) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="w-full max-w-[640px] mt-12 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/5 p-6 relative overflow-hidden backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] group"
          >
            {/* Animated Glow in Card */}
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 7, ease: "linear", repeat: Infinity }}
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12"
            />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]">
                  <LayoutDashboard className="w-5 h-5 text-white/80" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Live Dashboard</div>
                  <div className="text-xs text-white/50 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Real-time tracking
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <MousePointerClick className="w-3 h-3 text-purple-400/70" /> Total Clicks
                </div>
                <div className="text-2xl font-semibold text-white tracking-tight">
                  {clicks.toLocaleString()}
                </div>
                <div className="flex items-end gap-1.5 h-8 mt-2 border-b border-white/5 pb-1">
                  {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ height: [`${h * 0.7}%`, `${h}%`, `${h * 0.7}%`] }}
                      transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                      className="flex-1 rounded-t-[2px] bg-gradient-to-t from-purple-600/40 to-purple-400/60"
                    />
                  ))}
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <TrendingUp className="w-3 h-3 text-blue-400/70" /> Conversion Rate
                </div>
                <div className="text-2xl font-semibold text-white tracking-tight">
                  {convRate.toFixed(1)}%
                </div>
                <div className="flex items-end gap-1.5 h-8 mt-2 border-b border-white/5 pb-1">
                  {[20, 30, 45, 40, 60, 65, 85].map((h, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ height: [`${h * 0.7}%`, `${h}%`, `${h * 0.7}%`] }}
                      transition={{ duration: 3.5, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                      className="flex-1 rounded-t-[2px] bg-gradient-to-t from-blue-600/40 to-blue-400/60"
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Trust layer */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
               <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full border border-[#0a0a0b] bg-gradient-to-br from-white/30 to-white/10 shadow-sm"></div>
                 ))}
               </div>
               <div className="text-xs text-white/40 font-medium">
                 Dipercaya oleh 1,200+ creator
               </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE (40%) - Floating Glass Auth */}
        <div className="flex-[4] flex flex-col justify-center items-center p-6 relative z-20 w-full">
          
          {/* Mobile Header */}
          <div className="absolute top-6 left-6 lg:hidden">
            <Link href="/" className="text-xl font-medium tracking-tight text-white flex items-center gap-2 group">
              <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-black"></div>
              </div>
              <span className="relative">
                Lynknov
              </span>
            </Link>
          </div>

          {/* Form Container Wrapper with AnimatePresence */}
          <div className="w-full max-w-[420px] relative">
            
            {/* Ambient glow behind card */}
            <motion.div 
              animate={{ opacity: isFocused ? 0.4 : 0.15, scale: isFocused ? 1.05 : 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 bg-purple-600/30 blur-[100px] pointer-events-none rounded-full"
            ></motion.div>

            {/* Auth Card Signature Design */}
            <motion.div 
              layoutId="auth-card"
              className="rounded-2xl p-8 bg-black/40 backdrop-blur-2xl relative z-10 shadow-[0_0_80px_-20px_rgba(0,0,0,1)]"
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              {/* Premium Border and Corner Highlights */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none mix-blend-overlay"></div>
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(255,255,255,0.02)] pointer-events-none"></div>
              <div className="absolute top-0 left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="absolute bottom-0 left-[20%] w-[60%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              {/* Top Left Corner Light Glow */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-[20px] pointer-events-none opacity-50"></div>

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pathname}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

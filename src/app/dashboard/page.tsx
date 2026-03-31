"use client";

import React, { useState } from "react";
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  FileText, 
  MessageSquare, 
  CreditCard,
  ExternalLink,
  ChevronDown,
  UserCircle,
  Sparkles,
  Briefcase,
  Users,
  Smartphone,
  Tablet,
  Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type DashboardMode = "freelancer" | "creator" | "consultant" | "business";
type PreviewMode = "mobile" | "tablet" | "desktop";

export default function DashboardPage() {
  const readinessPercentage = 40;
  const [activeMode, setActiveMode] = useState<DashboardMode>("freelancer");
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("mobile");

  // Workflow definitions based on mode
  const workflows = {
    freelancer: [
      { id: 1, title: "Profil", status: "completed" },
      { id: 2, title: "Penawaran", status: "active" },
      { id: 3, title: "CTA", status: "pending" },
      { id: 4, title: "Halaman Publik", status: "pending" },
      { id: 5, title: "Publikasikan", status: "pending" },
    ],
    creator: [
      { id: 1, title: "Halaman Publik", status: "completed" },
      { id: 2, title: "Produk Digital", status: "active" },
      { id: 3, title: "Link Utama", status: "pending" },
      { id: 4, title: "CTA", status: "pending" },
      { id: 5, title: "Analytics", status: "pending" },
    ],
    consultant: [
      { id: 1, title: "Keahlian", status: "completed" },
      { id: 2, title: "Sesi Konsultasi", status: "active" },
      { id: 3, title: "Form Booking", status: "pending" },
      { id: 4, title: "Halaman Publik", status: "pending" },
      { id: 5, title: "Mulai Terima Sesi", status: "pending" },
    ],
    business: [
      { id: 1, title: "Identitas Brand", status: "completed" },
      { id: 2, title: "Katalog/Servis", status: "active" },
      { id: 3, title: "Client Proof", status: "pending" },
      { id: 4, title: "Halaman Bisnis", status: "pending" },
      { id: 5, title: "Kumpulkan Leads", status: "pending" },
    ]
  };

  const modeDetails = {
    freelancer: { label: "Mode Freelancer", icon: UserCircle, color: "text-[#a78bfa]", bg: "bg-[#a78bfa]/10" },
    creator: { label: "Mode Kreator", icon: Sparkles, color: "text-[#34d399]", bg: "bg-[#34d399]/10" },
    consultant: { label: "Mode Konsultan", icon: Briefcase, color: "text-[#60a5fa]", bg: "bg-[#60a5fa]/10" },
    business: { label: "Mode Bisnis", icon: Users, color: "text-[#ffb86c]", bg: "bg-[#ffb86c]/10" },
  };

  const currentWorkflow = workflows[activeMode];
  const CurrentModeIcon = modeDetails[activeMode].icon;

  const quickActions = [
    {
      title: activeMode === 'creator' ? "Upload produk digital pertama" : "Tambahkan penawaran pertama",
      desc: "Mulai jual jasa atau produk Anda.",
      status: "prioritas",
      icon: CreditCard,
      done: false
    },
    {
      title: "Lengkapi profil singkat",
      desc: "Ceritakan siapa Anda dan apa fokus Anda.",
      status: "belum selesai",
      icon: FileText,
      done: false
    },
    {
      title: activeMode === 'consultant' ? "Aktifkan form booking" : "Aktifkan tombol kontak",
      desc: "Beri cara mudah orang menghubungi Anda.",
      status: "belum selesai",
      icon: MessageSquare,
      done: false
    },
    {
      title: "Siapkan halaman publik",
      desc: "Buat draft halaman utama workspace Anda.",
      status: "berikutnya",
      icon: Globe,
      done: false
    }
  ];

  const workspaceAssets = [
    { name: "Halaman publik", status: "Draft" },
    { name: "Penawaran utama", status: "Belum dibuat" },
    { name: "CTA utama", status: "Belum diatur" },
    { name: "Form kontak", status: "Belum aktif" },
    { name: "Portfolio", status: "Kosong" }
  ];

  const readinessMetrics = [
    { label: "Progress setup", value: "40%" },
    { label: "Status halaman", value: "Draft" },
    { label: "Kelengkapan profil", value: "Dasar" },
    { label: "Kesiapan publish", value: "Belum siap" }
  ];

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-8">
      
      {/* Main Column (Center) */}
      <div className="flex-1 flex flex-col gap-8 min-w-0">
        
        {/* Hero Progress Area */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1a1a1d] to-[#121214] border border-white/5 p-8 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#a78bfa]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Selamat datang kembali, Daffa</h1>
              <p className="text-[var(--color-text-secondary)] text-lg mb-6 leading-relaxed">
                Workspace Anda sudah mulai terbentuk. Tinggal beberapa langkah lagi untuk menyelesaikan fondasi bisnis digital Anda.
              </p>
              
              <div className="flex items-center gap-4">
                <button className="h-11 px-6 rounded-xl bg-white text-black font-medium text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  Lanjutkan Setup
                </button>
                <button className="h-11 px-6 rounded-xl bg-white/[0.04] border border-white/10 text-white font-medium text-sm transition-all duration-300 hover:bg-white/[0.08]">
                  Lihat Draft
                </button>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="text-[var(--color-text-secondary)] text-sm font-medium mb-2">Setup Progress</div>
              <div className="flex items-center gap-4 sm:flex-row-reverse">
                <div className="text-4xl font-semibold tracking-tighter text-white">{readinessPercentage}%</div>
                <div className="w-32 h-2 rounded-full bg-white/5 overflow-hidden cursor-pointer hover:bg-white/10 transition-colors" title="Lihat detail progress">
                  <div 
                    className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${readinessPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GUIDED WORKFLOW STRIP */}
        <div className="rounded-2xl bg-[var(--color-surface-elevated)] border border-white/5 p-6 relative z-20">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium tracking-tight text-white">Alur terbaik untuk Anda</h2>
            
            {/* Dynamic Mode Switcher Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 ${modeDetails[activeMode].bg} ${modeDetails[activeMode].color} shadow-sm border border-transparent hover:border-[var(--color-text-secondary)]/20`}
              >
                <CurrentModeIcon className="w-3.5 h-3.5" />
                {modeDetails[activeMode].label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isModeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isModeDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-[#1a1a1d] border border-white/10 rounded-xl shadow-2xl py-1 z-30"
                  >
                    {(Object.keys(modeDetails) as DashboardMode[]).map((mode) => {
                      const ModeIcon = modeDetails[mode].icon;
                      return (
                        <button
                          key={mode}
                          onClick={() => {
                            setActiveMode(mode);
                            setIsModeDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                            activeMode === mode 
                              ? `bg-white/5 ${modeDetails[mode].color}` 
                              : 'text-white/70 hover:bg-white/[0.03] hover:text-white'
                          }`}
                        >
                          <ModeIcon className="w-4 h-4" />
                          {modeDetails[mode].label}
                          {activeMode === mode && <CheckCircle2 className="w-3.5 h-3.5 ml-auto" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">Berikut urutan yang paling disarankan untuk mulai membangun workspace Anda.</p>
          
          <div className="flex items-center justify-between relative px-2">
            {/* Background Line */}
            <div className="absolute left-6 right-6 top-1/2 h-[2px] bg-white/5 -z-10 -translate-y-1/2 rounded-full overflow-hidden">
               <motion.div 
                 layoutId="progress-line"
                 className="h-full bg-[#a78bfa]" 
                 initial={{ width: "0%" }}
                 animate={{ width: "25%" }} // Active at step 2
                 transition={{ duration: 0.5, ease: "easeInOut" }}
               />
            </div>
            
            <AnimatePresence mode="popLayout">
              {currentWorkflow.map((step) => {
                const isCompleted = step.status === "completed";
                const isActive = step.status === "active";
                
                return (
                  <motion.div 
                    key={step.id} 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-2.5 group cursor-pointer relative bg-[var(--color-surface-elevated)] px-2"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      isCompleted 
                        ? 'bg-[#a78bfa] border-[#a78bfa] text-white shadow-[0_0_10px_rgba(167,139,250,0.4)]' 
                        : isActive 
                          ? 'bg-[var(--color-surface-base)] border-[#a78bfa] text-[#a78bfa] shadow-[0_0_15px_rgba(167,139,250,0.3)] scale-110' 
                          : 'bg-[var(--color-surface-base)] border-white/10 text-white/30 group-hover:border-white/30'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-medium">{step.id}</span>}
                    </div>
                    <span className={`text-xs font-medium transition-colors text-center max-w-[80px] leading-tight ${
                      isCompleted || isActive ? 'text-white' : 'text-[var(--color-text-secondary)] group-hover:text-white/80'
                    }`}>
                      {step.title}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Actions (Langkah Membangun) */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-medium tracking-tight text-white">Langkah berikutnya</h2>
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-[var(--color-text-secondary)] border border-white/10">Fase Fondasi</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, i) => {
              return (
                <div 
                  key={i}
                  className={`p-5 rounded-2xl border transition-all duration-300 group cursor-pointer ${
                    action.status === 'prioritas' 
                      ? 'bg-white/[0.03] border-[#a78bfa]/40 hover:border-[#a78bfa] hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(167,139,250,0.2)]' 
                      : 'bg-[var(--color-surface-elevated)] border-white/5 hover:border-white/20 hover:bg-white/[0.03] hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 w-5 h-5 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${
                      action.status === 'prioritas' ? 'border-2 border-[#a78bfa] group-hover:scale-110 shadow-[0_0_10px_rgba(167,139,250,0.3)]' : 'border-2 border-white/20 group-hover:border-white/50 group-hover:bg-white/5'
                    }`}>
                      {/* Empty circle for uncompleted */}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-medium text-white group-hover:text-[#a78bfa] transition-colors">{action.title}</h3>
                        {action.status === 'prioritas' && (
                          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#a78bfa]/15 text-[#a78bfa] border border-[#a78bfa]/20">
                            Prioritas
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-4">{action.desc}</p>
                      
                      <div className="flex items-center text-xs font-medium text-[var(--color-text-secondary)] group-hover:text-white transition-colors">
                        Mulai <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Foundation Metrics (Readiness, not growth) */}
        <div>
          <h2 className="text-xl font-medium tracking-tight text-white mb-5">Metrik Kesiapan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {readinessMetrics.map((metric, i) => (
              <div 
                key={i} 
                className="p-4 rounded-xl bg-[var(--color-surface-elevated)] border border-white/5 flex flex-col gap-1 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20 hover:-translate-y-1 hover:shadow-lg cursor-pointer group"
              >
                <div className="text-xs font-medium text-[var(--color-text-secondary)] transition-colors group-hover:text-white/80">{metric.label}</div>
                <div className="text-xl font-medium text-white tracking-tight transition-all group-hover:text-[#a78bfa]">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column (Context Panel) */}
      <div className="w-full xl:w-[420px] shrink-0 flex flex-col gap-6">
        
        {/* Status Aset Workspace */}
        <div className="rounded-2xl bg-[var(--color-surface-elevated)] border border-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:shadow-lg group">
          <h3 className="text-base font-medium text-white mb-5 flex items-center justify-between">
            Status Aset
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
          </h3>
          
          <div className="space-y-4">
            {workspaceAssets.map((asset, i) => (
              <div key={i} className="flex items-center justify-between group/asset cursor-pointer p-2 -mx-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                <div className="text-sm text-[var(--color-text-secondary)] group-hover/asset:text-white transition-colors flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white/20 group-hover/asset:bg-[#a78bfa] group-hover/asset:shadow-[0_0_5px_rgba(167,139,250,0.5)] transition-all"></div>
                  {asset.name}
                </div>
                <div className={`text-[11px] font-medium px-2 py-1 rounded-md transition-all ${
                  asset.status === 'Draft' ? 'bg-white/10 text-white group-hover/asset:bg-white/20' : 
                  'bg-white/5 text-[var(--color-text-secondary)] group-hover/asset:bg-white/10 group-hover/asset:text-white/80'
                }`}>
                  {asset.status}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-5 border-t border-white/5">
             <div className="text-xs text-[var(--color-text-secondary)] mb-3 font-medium">Target berikutnya:</div>
             <div className="text-sm font-medium text-white flex items-start gap-3 bg-gradient-to-br from-[#a78bfa]/10 to-transparent p-4 rounded-xl border border-[#a78bfa]/20 hover:border-[#a78bfa]/40 transition-colors cursor-pointer group/target">
               <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(167,139,250,0.6)] group-hover/target:scale-125 transition-transform"></div>
               <div>
                 <p className="leading-snug">Selesaikan halaman publik agar siap dibagikan hari ini.</p>
                 <button className="text-xs font-semibold text-[#a78bfa] mt-3 flex items-center transition-all group-hover/target:text-[#c4b5fd]">
                   Lanjutkan edit <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/target:translate-x-1" />
                 </button>
               </div>
             </div>
          </div>
        </div>

        {/* Taller Live Preview Placeholder */}
        <div className="rounded-2xl bg-[var(--color-surface-elevated)] border border-white/5 p-1 flex flex-col h-[500px] overflow-hidden relative">
          
          <div className="h-10 px-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-red-400/50 transition-colors"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-amber-400/50 transition-colors"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-green-400/50 transition-colors"></div>
            </div>
            
            <div className="text-[10px] font-medium text-[var(--color-text-tertiary)] bg-black/40 px-3 py-1 rounded-md flex items-center gap-2 border border-white/5">
              lynknov.com/daffa-studio
            </div>
            
            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-md border border-white/5">
               <button 
                 onClick={() => setPreviewMode("mobile")}
                 className={`p-1 rounded transition-colors ${previewMode === "mobile" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
               >
                 <Smartphone className="w-3 h-3" />
               </button>
               <button 
                 onClick={() => setPreviewMode("tablet")}
                 className={`p-1 rounded transition-colors ${previewMode === "tablet" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
               >
                 <Tablet className="w-3 h-3" />
               </button>
               <button 
                 onClick={() => setPreviewMode("desktop")}
                 className={`p-1 rounded transition-colors ${previewMode === "desktop" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
               >
                 <Monitor className="w-3 h-3" />
               </button>
            </div>
          </div>
          
          <div className="flex-1 bg-[#0a0a0b] relative flex items-center justify-center p-4 overflow-hidden group">
            
            {/* The actual preview container that scales based on mode */}
            <motion.div 
              layout
              initial={false}
              animate={{ 
                width: previewMode === "mobile" ? 240 : previewMode === "tablet" ? 320 : 380,
                height: previewMode === "desktop" ? 260 : 420,
                borderRadius: previewMode === "desktop" ? 12 : 32
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-[var(--color-surface-elevated)] border border-white/10 flex flex-col overflow-hidden relative shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {previewMode === "desktop" ? (
                  <motion.div 
                    key="desktop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col w-full h-full p-5 gap-5 opacity-40 transition-opacity group-hover:opacity-20"
                  >
                    {/* Top Nav Desktop */}
                    <div className="flex justify-between items-center w-full border-b border-white/5 pb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/10 to-white/30 border border-white/10"></div>
                      <div className="flex gap-4">
                        <div className="w-12 h-2 bg-white/10 rounded"></div>
                        <div className="w-12 h-2 bg-white/10 rounded"></div>
                        <div className="w-12 h-2 bg-white/10 rounded"></div>
                      </div>
                    </div>
                    {/* 2 Cols Content */}
                    <div className="flex gap-6 flex-1">
                      <div className="flex-1 flex flex-col justify-center gap-3">
                        <div className="w-5/6 h-5 bg-white/20 rounded-md"></div>
                        <div className="w-1/2 h-5 bg-white/20 rounded-md"></div>
                        <div className="w-full h-2 bg-white/10 rounded mt-2"></div>
                        <div className="w-4/5 h-2 bg-white/10 rounded"></div>
                        <div className="w-24 h-8 bg-white/10 rounded-lg mt-2 border border-white/5"></div>
                      </div>
                      <div className="w-[120px] h-full bg-gradient-to-b from-white/[0.05] to-transparent rounded-xl border border-white/5"></div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="mobile-tablet"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center w-full h-full pt-10 p-5 gap-5 opacity-40 transition-opacity group-hover:opacity-20"
                  >
                     <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-white/10 to-white/30 border border-white/10 shadow-lg"></div>
                     
                     <div className="flex flex-col gap-2 w-full items-center">
                       <div className="w-3/4 h-4 rounded-md bg-white/20"></div>
                       <div className="w-1/2 h-2 rounded bg-white/10"></div>
                     </div>
                     
                     <div className="w-full space-y-3 mt-4">
                       <div className="w-full h-12 rounded-xl bg-white/[0.08] border border-white/5"></div>
                       <div className="w-full h-12 rounded-xl bg-white/[0.05] border border-white/5"></div>
                       <div className="w-full h-28 rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent"></div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Edit overlay that appears on hover of the container */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                 <button className="h-10 px-6 rounded-xl bg-white text-black text-sm font-medium hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2">
                   Edit Halaman <ExternalLink className="w-4 h-4" />
                 </button>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}

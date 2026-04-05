"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  EditorSection,
  HeroSection,
} from "@/types/editor";
import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

// Import Hero Editor components
import {
  HeroContentEditor,
  HeroStyleEditor,
  HeroSettingsEditor,
} from "./sections/hero-editor";

interface SectionEditorPanelProps {
  section: EditorSection | null;
  onChange: (section: EditorSection) => void;
}

type TabType = "content" | "style" | "settings";

// ── MAIN EDITOR PANEL ────────────────────────────────────────────────────────

export function SectionEditorPanel({ section, onChange }: SectionEditorPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("content");

  if (!section) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center bg-[#0B0B0D]">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.02] ring-1 ring-white/[0.04] shadow-inner">
          <Info className="h-6 w-6 text-white/10" />
        </div>
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/20">Pilih Section</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (section.type) {
      case "hero": return <HeroContentEditor section={section as HeroSection} onChange={onChange} />;
      default: return <div className="py-20 text-white/20 text-[11px] font-black uppercase tracking-widest text-center">Optimasi editor sedang diproses.</div>;
    }
  };

  const renderStyle = () => {
    switch (section.type) {
      case "hero": return <HeroStyleEditor section={section as HeroSection} onChange={onChange} />;
      default: return <div className="py-20 text-white/20 text-[11px] font-black uppercase tracking-widest text-center">Styling segera hadir.</div>;
    }
  };

  const renderSettings = () => {
    switch (section.type) {
      case "hero": return <HeroSettingsEditor section={section as HeroSection} onChange={onChange} />;
      default: return <div className="py-20 text-white/20 text-[11px] font-black uppercase tracking-widest text-center">Pengaturan segera hadir.</div>;
    }
  };

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col border-r border-white/[0.04] bg-[#0B0B0D]">
      {/* Visual Header - Balanced Separation */}
      <div className="shrink-0 border-b border-white/[0.06] px-10 py-7 bg-white/[0.01]">
        <div className="flex items-center gap-5">
          <h2 className="text-[18px] font-black tracking-tight text-white">{section.label}</h2>
          <div className="relative flex h-2.5 w-2.5 items-center justify-center">
            {/* outer breathing glow */}
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-full w-full rounded-full bg-emerald-500 blur-[2px]"
            />
            {/* inner solid core with subtle pulse */}
            <motion.div 
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" 
            />
          </div>
        </div>
      </div>

      {/* Premium Tabs - Layer Selected Feel */}
      <div className="shrink-0 border-b border-white/[0.06] px-10 py-1 bg-white/[0.01]">
        <div className="flex items-center gap-12">
          {([
            { key: "content" as const, label: "Konten" },
            { key: "style" as const, label: "Tampilan" },
            { key: "settings" as const, label: "Pengaturan" },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                "relative py-5 text-[12px] font-black uppercase tracking-[0.2em] transition-all",
                activeTab === key
                  ? "text-white"
                  : "text-white/30 hover:text-white/50"
              )}
            >
              {label}
              {activeTab === key && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute -bottom-[5px] left-0 h-[2.5px] w-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)] rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Surface - Precise Spacing Rhythm */}
      <div className="custom-scrollbar flex-1 overflow-y-auto bg-[#0B0B0D] px-10 py-16">
        <div className="w-full max-w-[800px] animate-in fade-in slide-in-from-bottom-2 duration-700">
          {activeTab === "content" && renderContent()}
          {activeTab === "style" && renderStyle()}
          {activeTab === "settings" && renderSettings()}
        </div>
      </div>
    </div>
  );
}

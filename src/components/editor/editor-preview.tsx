"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Monitor, Smartphone, Tablet, Layout, Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { EditorSection } from "@/types/editor";
import { EditorStructuralPreview } from "./editor-structural-preview";

type DeviceType = "mobile" | "tablet" | "desktop";
type LayoutMode = "focus-edit" | "balanced" | "focus-preview";
type ScrollMode = "content" | "device";

interface EditorPreviewProps {
  sections: EditorSection[];
  activeSectionId: string | null;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  device: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  editorVisible: boolean;
  onToggleEditor: () => void;
  layoutMode: LayoutMode;
}

// ── PRESET DIMENSIONS (Premium Viewport Simulators) ──────────────────────
const DEVICE_PRESETS = {
  mobile: {
    width: 390,
    height: 844,
    borderRadius: 44,
  },
  tablet: {
    width: 820,
    height: 1180,
    borderRadius: 32,
  },
  desktop: {
    width: 1280, 
    height: 800,
    borderRadius: 16,
  }
};

// ── 1. PREVIEW HEADER ────────────────────────────────────────────────────────
function PreviewHeader({
  onToggleCollapsed,
  onToggleEditor,
  editorVisible,
  device,
  onDeviceChange,
  scrollMode,
  onScrollModeChange,
}: {
  onToggleCollapsed: () => void;
  onToggleEditor: () => void;
  editorVisible: boolean;
  device: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  scrollMode: ScrollMode;
  onScrollModeChange: (mode: ScrollMode) => void;
}) {
  return (
    <div className="relative z-50 flex h-16 shrink-0 items-center justify-between border-b border-white/[0.04] bg-[#0A0A0C]/80 backdrop-blur-xl px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleCollapsed}
          className="group flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.02] text-white/40 ring-1 ring-white/[0.05] transition-all hover:bg-white/[0.06] hover:text-white hover:ring-white/[0.1] active:scale-95"
        >
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        <div className="h-5 w-px bg-white/[0.06]" />
        <button
          onClick={onToggleEditor}
          className={cn(
            "flex h-9 items-center gap-2.5 rounded-xl px-4 text-[11px] font-black uppercase tracking-[0.15em] transition-all active:scale-95",
            editorVisible 
              ? "bg-white/[0.02] text-white/30 ring-1 ring-white/[0.05] hover:bg-white/[0.06] hover:text-white" 
              : "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400 hover:bg-emerald-400"
          )}
        >
          <Layout className="h-3.5 w-3.5" />
          <span>{editorVisible ? "Full Preview" : "Show Editor"}</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Scroll Mode Switcher */}
        <div className="flex h-9 items-center rounded-xl bg-black/40 p-1 ring-1 ring-white/[0.05]">
          <button
            onClick={() => onScrollModeChange("content")}
            className={cn(
              "flex h-full items-center justify-center rounded-lg px-3 text-[10px] font-bold uppercase tracking-wider transition-all",
              scrollMode === "content" 
                ? "bg-white/[0.12] text-white shadow-sm" 
                : "text-white/30 hover:text-white/60"
            )}
          >
            Scroll Isi
          </button>
          <button
            onClick={() => onScrollModeChange("device")}
            className={cn(
              "flex h-full items-center justify-center rounded-lg px-3 text-[10px] font-bold uppercase tracking-wider transition-all",
              scrollMode === "device" 
                ? "bg-white/[0.12] text-white shadow-sm" 
                : "text-white/30 hover:text-white/60"
            )}
          >
            Scroll Mockup
          </button>
        </div>

        {/* Device Switcher */}
        <div className="flex h-9 items-center gap-1 rounded-xl bg-black/40 p-1 ring-1 ring-white/[0.05]">
          {(["mobile", "tablet", "desktop"] as const).map((key) => {
            const Icon = key === "mobile" ? Smartphone : key === "tablet" ? Tablet : Monitor;
            return (
              <button
                key={key}
                onClick={() => onDeviceChange(key)}
                className={cn(
                  "flex h-full w-9 items-center justify-center rounded-lg transition-all duration-300",
                  device === key 
                    ? "bg-white/[0.12] text-white shadow-md ring-1 ring-white/[0.1]" 
                    : "text-white/30 hover:bg-white/[0.05] hover:text-white/70"
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 2. PREVIEW PANEL ─────────────────────────────────────────────────────────
export function EditorPreview(props: EditorPreviewProps) {
  const {
    sections,
    activeSectionId,
    onToggleCollapsed,
    device,
    onDeviceChange,
    editorVisible,
    onToggleEditor,
    layoutMode,
  } = props;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [scrollMode, setScrollMode] = useState<ScrollMode>("content");

  const currentPreset = DEVICE_PRESETS[device];
  const [zoomLevel, setZoomLevel] = useState<number | "fit">("fit");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setContainerSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── SIZING LOGIC: OCCUPANCY OPTIMIZATION ─────────────────────────────────
  const { scale, safePaddingV } = useMemo(() => {
    if (!containerSize.width || !containerSize.height) {
      return { scale: 1, safePaddingV: 0 };
    }
    
    const isFocus = layoutMode === "focus-preview";
    const isBalanced = layoutMode === "balanced";
    
    // Base Safe Padding
    let padH = isFocus ? 64 : 24;
    let padV = isFocus ? 64 : 32;

    // Per-device & per-mode tuning to ensure optimal fit
    if (isBalanced) {
      if (device === "mobile") {
        padH = 24; // Less horizontal padding so mobile can be tall
        padV = 32; 
      } else if (device === "tablet") {
        padH = 32;
        padV = 32;
      } else if (device === "desktop") {
        padH = 24; // Prioritize width occupancy for desktop in balanced mode
        padV = 24;
      }
    } else {
      if (device === "mobile" || device === "tablet") {
        padH = 64;
        padV = 64; // Generous breathing room for focus mode
      } else {
        padH = 80;
        padV = 64;
      }
    }

    const availableWidth = Math.max(0, containerSize.width - padH * 2);
    const availableHeight = Math.max(0, containerSize.height - padV * 2);

    const scaleX = availableWidth / currentPreset.width;
    const scaleY = availableHeight / currentPreset.height;

    let finalScale = 1;

    // Dual Scroll Integration
    if (scrollMode === "device") {
      // In Device Scroll, we primarily base the scale on width so it's readable.
      // But we cap it so it doesn't get absurdly huge in focus preview.
      const maxScaleCap = device === "desktop" ? 1.0 : (isFocus ? 1.15 : 1.0);
      finalScale = Math.min(scaleX, maxScaleCap);
    } else {
      // In Content Scroll, the entire device MUST fit within the viewport height and width.
      finalScale = Math.min(scaleX, scaleY);
    }

    if (zoomLevel !== "fit") {
      finalScale = zoomLevel / 100;
    }

    return { scale: finalScale, safePaddingV: padV };
  }, [containerSize, currentPreset, layoutMode, device, scrollMode, zoomLevel]);

  return (
    <div className="flex flex-col h-full min-h-0 w-full relative bg-[#060709]">
      
      {/* Subtle Premium Divider from the middle panel */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent z-50 pointer-events-none" />

      <PreviewHeader 
        onToggleCollapsed={onToggleCollapsed}
        onToggleEditor={onToggleEditor}
        editorVisible={editorVisible}
        device={device}
        onDeviceChange={onDeviceChange}
        scrollMode={scrollMode}
        onScrollModeChange={setScrollMode}
      />

      <div className="flex-1 min-h-0 w-full overflow-hidden relative">
        
        {/* PREMIUM CANVAS BACKGROUND: Large Translucent Modular Blocks */}
        <div className="absolute inset-0 bg-[#060709]" /> {/* Base Dark Charcoal/Navy undertone */}
        {/* Ambient shapes / large translucent blocks */}
        <div className="absolute top-0 left-0 w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_top_left,rgba(52,211,153,0.02)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.02)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Large frosted glass panels effect for depth */}
        <div className="absolute top-[10%] left-[5%] w-[35%] h-[45%] rounded-[40px] bg-white/[0.01] blur-3xl pointer-events-none opacity-50" />
        <div className="absolute bottom-[10%] right-[5%] w-[45%] h-[35%] rounded-[60px] bg-white/[0.01] blur-3xl pointer-events-none opacity-50" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060709]/40 to-[#030304] pointer-events-none" /> {/* Depth */}

        {/* PREVIEW STAGE */}
        {/* If scrollMode is "device" OR we are zoomed in, the stage itself allows scrolling */}
        <div 
          ref={containerRef} 
          className={cn(
            "relative w-full h-full flex justify-center z-10",
            (scrollMode === "device" || zoomLevel !== "fit") ? "overflow-auto custom-scrollbar items-start justify-start sm:justify-center" : "overflow-hidden items-center"
          )}
        >
          {/* LAYOUT WRAPPER: Ensures flexbox alignment and scrolling work perfectly with scaled absolute element */}
          <div 
            className="relative shrink-0 flex items-start justify-center"
            style={{
              width: currentPreset.width * scale,
              height: currentPreset.height * scale,
              // Explicit vertical margins in device mode ensure safe breathing room when scrolling
              marginTop: (scrollMode === "device" || zoomLevel !== "fit") ? Math.max(48, safePaddingV) : 0,
              marginBottom: (scrollMode === "device" || zoomLevel !== "fit") ? Math.max(48, safePaddingV) : 0,
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={device}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: currentPreset.width,
                  height: currentPreset.height,
                  borderRadius: currentPreset.borderRadius,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                className={cn(
                  "absolute top-0 left-0 flex flex-col shrink-0 overflow-hidden",
                  // Premium Shell Styling
                  device === "mobile" && "bg-black ring-[12px] ring-[#141517] shadow-[0_0_0_13px_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.6),0_0_120px_rgba(255,255,255,0.02)]",
                  device === "tablet" && "bg-black ring-[16px] ring-[#1A1A1C] shadow-[0_0_0_17px_rgba(255,255,255,0.05),0_40px_80px_rgba(0,0,0,0.8)]",
                  device === "desktop" && "bg-black ring-1 ring-white/[0.1] shadow-[0_40px_100px_rgba(0,0,0,0.9),0_0_80px_rgba(255,255,255,0.02)] rounded-t-xl"
                )}
              >
                
                {/* Premium Device Accents */}
                {device === "mobile" && (
                  <>
                    {/* Dynamic Island / Notch Simulation */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-b-[24px] z-50 flex items-center justify-center">
                      <div className="w-16 h-2 rounded-full bg-[#1A1A1C]" />
                    </div>
                    {/* Edge highlights */}
                    <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.08] pointer-events-none z-50" />
                  </>
                )}

                {device === "tablet" && (
                  <>
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/10 z-50" />
                    <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.08] pointer-events-none z-50" />
                  </>
                )}

                {device === "desktop" && (
                  <div className="h-12 w-full flex items-center gap-3 border-b border-white/[0.08] bg-gradient-to-b from-[#1A1B1E] to-[#121315] px-6 shrink-0 z-50">
                    <div className="flex items-center gap-2.5">
                      <span className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]" />
                      <span className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]" />
                      <span className="h-3 w-3 rounded-full bg-[#27C93F] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]" />
                    </div>
                    <div className="flex h-7 flex-1 items-center justify-center rounded-md bg-black/40 px-4 ring-1 ring-white/[0.05] shadow-inner max-w-md mx-auto">
                      <span className="text-[10px] font-medium text-white/30">
                        lynknov.com/live
                      </span>
                    </div>
                  </div>
                )}

                {/* CONTENT VIEWPORT */}
                <div
                  ref={scrollContainerRef}
                  className={cn(
                    "flex-1 w-full bg-[#030303] relative z-0",
                    scrollMode === "content" ? "overflow-y-auto custom-scrollbar" : "overflow-hidden"
                  )}
                >
                  <div className={cn(
                    "w-full min-h-full", 
                    // If mobile, add padding top for the notch
                    device === "mobile" ? "pt-12" : ""
                  )}>
                    <EditorStructuralPreview 
                      sections={sections}
                      activeSectionId={activeSectionId}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ZOOM CONTROLS (Floating Bottom Right) */}
        <div className="absolute bottom-6 right-6 z-50 flex items-center gap-1.5 rounded-2xl border border-white/[0.05] bg-[#0A0A0C]/80 backdrop-blur-xl p-1.5 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => setZoomLevel(prev => prev === "fit" ? 50 : Math.max(25, (prev as number) - 25) as ZoomLevel)}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-white/40 hover:bg-white/[0.05] hover:text-white transition-all active:scale-95"
            title="Zoom Out"
          >
            <Minus className="h-4 w-4" />
          </button>
          
          <div className="relative group">
            <select 
              value={zoomLevel} 
              onChange={(e) => setZoomLevel(e.target.value === "fit" ? "fit" : Number(e.target.value) as ZoomLevel)}
              className="h-8 min-w-[64px] rounded-xl bg-white/[0.02] px-2 text-center text-[11px] font-bold text-white/80 outline-none appearance-none cursor-pointer hover:bg-white/[0.06] hover:text-white transition-all"
            >
              <option value="fit" className="bg-[#141517]">Fit</option>
              <option value={25} className="bg-[#141517]">25%</option>
              <option value={50} className="bg-[#141517]">50%</option>
              <option value={75} className="bg-[#141517]">75%</option>
              <option value={100} className="bg-[#141517]">100%</option>
              <option value={125} className="bg-[#141517]">125%</option>
            </select>
          </div>

          <button 
            onClick={() => setZoomLevel(prev => prev === "fit" ? 100 : Math.min(125, (prev as number) + 25) as ZoomLevel)}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-white/40 hover:bg-white/[0.05] hover:text-white transition-all active:scale-95"
            title="Zoom In"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

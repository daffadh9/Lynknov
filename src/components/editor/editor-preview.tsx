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
type ZoomLevel = number | "fit";

const ZOOM_STEPS = [25, 50, 75, 100, 125, 150] as const;

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
// `overhead` = visual px yang terpakai di luar border box karena ring + shadow spread.
// Nilai ini WAJIB dihitung ke dalam dimensi wrapper agar mockup tidak meluber.
// mobile:  ring-[12px] + shadow spread 13px = 25
// tablet:  ring-[16px] + shadow spread 17px = 33
// desktop: ring-1 (+ blur shadow tanpa spread) = 2 (buffer kecil)
const DEVICE_PRESETS = {
  mobile: {
    width: 390,
    height: 844,
    borderRadius: 44,
    overhead: 25,
  },
  tablet: {
    width: 820,
    height: 1180,
    borderRadius: 32,
    overhead: 33,
  },
  desktop: {
    width: 1280,
    height: 800,
    borderRadius: 16,
    overhead: 2,
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
  const mockupContentRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [mockupContentHeight, setMockupContentHeight] = useState(0);
  const [scrollMode, setScrollMode] = useState<ScrollMode>("content");

  const currentPreset = DEVICE_PRESETS[device];
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("fit");

  // Reset zoom ke fit setiap kali user ganti device atau mode layout
  // agar scale tidak "terjebak" di angka yang tak lagi ideal untuk konteks baru.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setZoomLevel("fit");
  }, [device, layoutMode]);

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

  // Observasi tinggi konten natural DI DALAM mockup (setelah unclamped).
  // Dipakai HANYA saat scrollMode === "device" untuk menentukan tinggi wrapper
  // supaya seluruh mockup memanjang mengikuti konten → outer canvas scroll aktif.
  useEffect(() => {
    const el = mockupContentRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setMockupContentHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [device, scrollMode]);

  // ── SIZING LOGIC: RING-AWARE FIT + ORTHOGONAL ZOOM ───────────────────────
  // innerW/innerH = bounding box VISUAL mockup (termasuk ring + shadow spread).
  // Ini yang dipakai untuk perhitungan scale supaya ring tidak meluber di luar wrapper.
  const innerW = currentPreset.width + currentPreset.overhead * 2;
  const innerH = currentPreset.height + currentPreset.overhead * 2;

  const scale = useMemo(() => {
    if (!containerSize.width || !containerSize.height) return 1;

    // Padding breathing room dari stage ke mockup (dihitung sekali di sini,
    // tidak diduplikasi di JSX margin). Focus-preview butuh breathing lebih.
    const isFocus = layoutMode === "focus-preview";
    const padH = isFocus ? 64 : 24;
    const padV = isFocus ? 48 : 24;

    const availableWidth = Math.max(0, containerSize.width - padH * 2);
    const availableHeight = Math.max(0, containerSize.height - padV * 2);

    // Fit calculation memakai innerW/innerH (BUKAN preset.width/height mentah)
    // supaya ring + shadow masuk hitungan.
    const fitScaleX = availableWidth / innerW;
    const fitScaleY = availableHeight / innerH;

    // Manual zoom overrides fit. Dibiarkan literal (100% = 1.0x actual).
    // Container luar akan otomatis scroll lewat overflow-auto kalau mockup > container.
    if (zoomLevel !== "fit") {
      return zoomLevel / 100;
    }

    // Fit mode: scale bergantung pada scrollMode.
    // - content: mockup WAJIB muat utuh (width & height), konten di dalam yang scroll.
    // - device : mockup pakai fitScaleX murni (tinggi dinamis mengikuti konten),
    //            tinggi yang overflow ditangani oleh outer canvas scroll.
    // Cap 1.0 agar tidak upscaling ugly di layar besar saat focus-preview.
    if (scrollMode === "device") {
      return Math.min(fitScaleX, 1);
    }
    return Math.min(fitScaleX, fitScaleY, 1);
  }, [containerSize, innerW, innerH, layoutMode, scrollMode, zoomLevel]);

  // Tinggi "logis" motion.div sebelum scale.
  // - content mode: tetap innerH (device height fisik, konten scroll di dalam).
  // - device mode : max(innerH, mockupContentHeight + overhead*2) agar mockup
  //                 memanjang menelan seluruh konten (mockupContentHeight dari
  //                 ResizeObserver). Outer canvas scroll akan muncul otomatis
  //                 jika tinggi wrapper (= logicalH * scale) > canvas height.
  const logicalH = scrollMode === "device"
    ? Math.max(400, mockupContentHeight + currentPreset.overhead * 2)
    : innerH;

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

        {/* PREVIEW STAGE
            Arsitektur:
            - containerRef = outer scroll area, overflow-auto selalu (browser cuma munculkan
              scrollbar kalau isinya > container).
            - stage = min-w-full min-h-full flex center. Memastikan frame ter-center saat fit,
              dan tumbuh + breathing room saat zoom > fit atau scroll-mockup overflow vertikal.
            - frameWrapper = kotak fisik berukuran persis scaled visual box (sudah termasuk
              ring + shadow overhead), jadi tidak ada yang meluber ke luar.
            - motion.div punya padding = overhead supaya ring pada child berada di dalam
              bounding box, bukan di luarnya. */}
        <div
          ref={containerRef}
          className="relative w-full h-full z-10 overflow-auto custom-scrollbar"
        >
          <div
            className={cn(
              "min-w-full min-h-full flex items-center justify-center",
              layoutMode === "focus-preview" ? "p-12" : "p-6"
            )}
          >
            <div
              className="relative shrink-0"
              style={{
                width: innerW * scale,
                height: logicalH * scale,
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
                    width: innerW,
                    height: logicalH,
                    padding: currentPreset.overhead,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                  className="absolute top-0 left-0 shrink-0"
                >
                  {/* SHELL: native device box (ring di sini, persis pas di dalam padding overhead parent) */}
                  <div
                    style={{ borderRadius: currentPreset.borderRadius }}
                    className={cn(
                      "relative w-full h-full flex flex-col overflow-hidden",
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

                    {/* CONTENT VIEWPORT
                        - scrollMode "content": inner scroll (overflow-y-auto), mockup height tetap innerH.
                        - scrollMode "device" : viewport tumbuh natural (overflow-visible), mockup memanjang
                          menelan konten, outer canvas yang scroll. */}
                    <div
                      ref={scrollContainerRef}
                      className={cn(
                        "flex-1 w-full bg-[#030303] relative z-0",
                        scrollMode === "content" ? "overflow-y-auto custom-scrollbar" : "overflow-visible"
                      )}
                    >
                      <div
                        ref={mockupContentRef}
                        className={cn(
                          "w-full",
                          // min-h-full hanya saat content-scroll supaya inner mengisi viewport.
                          // Di device-scroll, tinggi PURE content-driven untuk memutus
                          // loop feedback ResizeObserver → logicalH → viewport → min-h-full.
                          scrollMode === "content" && "min-h-full",
                          // If mobile, add padding top for the notch
                          device === "mobile" ? "pt-12" : ""
                        )}
                      >
                        <EditorStructuralPreview
                          sections={sections}
                          activeSectionId={activeSectionId}
                          device={device}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ZOOM CONTROLS (Floating Bottom Right)
            - Tombol tengah clickable untuk reset ke Fit (bukan <select> lagi).
            - Step diskrit [25, 50, 75, 100, 125, 150] untuk plus/minus. */}
        <div className="absolute bottom-6 right-6 z-50 flex items-center gap-1.5 rounded-2xl border border-white/[0.05] bg-[#0A0A0C]/80 backdrop-blur-xl p-1.5 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
          <button
            onClick={() => {
              setZoomLevel((prev) => {
                if (prev === "fit") return ZOOM_STEPS[2]; // 75 — selangkah di bawah "fit" native
                const idx = ZOOM_STEPS.indexOf(prev as typeof ZOOM_STEPS[number]);
                return idx > 0 ? ZOOM_STEPS[idx - 1] : ZOOM_STEPS[0];
              });
            }}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-white/40 hover:bg-white/[0.05] hover:text-white transition-all active:scale-95"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <Minus className="h-4 w-4" />
          </button>

          <button
            onClick={() => setZoomLevel("fit")}
            className={cn(
              "h-8 min-w-[64px] rounded-xl px-2 text-center text-[11px] font-bold outline-none cursor-pointer transition-all active:scale-95",
              zoomLevel === "fit"
                ? "bg-white/[0.08] text-white ring-1 ring-white/[0.12]"
                : "bg-white/[0.02] text-white/80 hover:bg-white/[0.06] hover:text-white"
            )}
            title="Reset ke Fit"
            aria-label="Reset zoom ke Fit"
          >
            {zoomLevel === "fit" ? "Fit" : `${zoomLevel}%`}
          </button>

          <button
            onClick={() => {
              setZoomLevel((prev) => {
                if (prev === "fit") return ZOOM_STEPS[3]; // 100 — selangkah di atas fit
                const idx = ZOOM_STEPS.indexOf(prev as typeof ZOOM_STEPS[number]);
                return idx < ZOOM_STEPS.length - 1 ? ZOOM_STEPS[idx + 1] : ZOOM_STEPS[ZOOM_STEPS.length - 1];
              });
            }}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-white/40 hover:bg-white/[0.05] hover:text-white transition-all active:scale-95"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

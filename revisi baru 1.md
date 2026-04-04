Siap.Saya buatin patch yang fokus ke yang paling ngena dulu:

* ** preview width ** dihitung dari ** container layout nyata **, bukan`window.innerWidth`
    * bug`currentSidebar = 352` dihapus, jadi resize kanan ikut ** sidebar width aktual **
* dimensi device preview dipisah jadi ** shell / screen / header / base **, jadi tidak lagi pakai pengurangan manual`-44` / `-40`
    * desktop base ikut masuk ke kalkulasi tinggi stage, jadi preview tidak gampang meleset atau kepotong secara vertikal

Itu memang titik paling rawan di kode kamu sekarang.Di`EditorPage`, width preview masih campur hardcoded `352` dan`window.innerWidth`, sedangkan di`EditorPreview`, preview discale dari mockup tapi viewport content masih dirender langsung dengan pengurangan tinggi manual.

## 1) Ganti`src/app/editor/page.tsx`

    ```tsx
"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { EditorPreview } from "@/components/editor/editor-preview";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { EditorTopbar } from "@/components/editor/editor-topbar";
import { EditorWorkspacePanel } from "@/components/editor/editor-workspace-panel";
import { initialSections, initialWorkspaceState } from "@/lib/editor-mock-data";
import { getPageCompletion } from "@/lib/editor-progress";
import { getEditorData, saveEditorData } from "@/features/editor/actions";
import type { EditorSection, EditorWorkspaceState, EditorWorkspaceKey } from "@/types/editor";
import { Layout, Monitor, Loader2 } from "lucide-react";

const RAIL_WIDTH = 72;
const MIN_SIDEBAR_WIDTH = 240;
const MAX_SIDEBAR_WIDTH = 400;
const MIN_EDITOR_WIDTH = 440;
const MIN_PREVIEW_WIDTH = 360;
const MAX_PREVIEW_WIDTH = 980;
const FOCUS_PREVIEW_MAX_WIDTH = 1400;

type LayoutMode = "focus-edit" | "balanced" | "focus-preview";
type DeviceType = "mobile" | "tablet" | "desktop";

const subscribeToClient = () => () => {};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function EditorPage() {
  const isClient = useSyncExternalStore(subscribeToClient, () => true, () => false);

  const layoutRef = useRef<HTMLDivElement>(null);

  const [sections, setSections] = useState<EditorSection[]>(initialSections);
  const [workspaceState, setWorkspaceState] = useState<EditorWorkspaceState>(initialWorkspaceState);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [activeWorkspace, setActiveWorkspace] = useState<EditorWorkspaceKey>("sections");

  const [layoutMode, setLayoutMode] = useState<LayoutMode>("balanced");
  const [device, setDevice] = useState<DeviceType>("mobile");
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [previewWidth, setPreviewWidth] = useState(460);
  const [isResizing, setIsResizing] = useState<"left" | "right" | null>(null);
  const [layoutWidth, setLayoutWidth] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const data = await getEditorData();

      if (data.error) {
        console.error("Failed to load editor data:", data.error);
      } else {
        setSections(data.sections);
        setWorkspaceState(data.workspaceState);
        setActiveSectionId(data.sections[0]?.id || null);
      }

      setIsLoading(false);
    }

    loadData();
  }, []);

  useEffect(() => {
    const el = layoutRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setLayoutWidth(entry.contentRect.width);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isSidebarVisible = layoutMode === "balanced";
  const isEditorVisible = layoutMode !== "focus-preview";
  const isPreviewVisible = layoutMode !== "focus-edit";

  const finalSidebarWidth = isSidebarVisible ? RAIL_WIDTH + sidebarWidth : RAIL_WIDTH;

  const maxBalancedPreviewWidth = useMemo(() => {
    if (!layoutWidth) return MAX_PREVIEW_WIDTH;

    const raw = layoutWidth - finalSidebarWidth - MIN_EDITOR_WIDTH;
    const safeMax = Math.min(MAX_PREVIEW_WIDTH, raw);

    return Math.max(MIN_PREVIEW_WIDTH, safeMax);
  }, [layoutWidth, finalSidebarWidth]);

  const maxFocusPreviewWidth = useMemo(() => {
    if (!layoutWidth) return FOCUS_PREVIEW_MAX_WIDTH;

    const raw = layoutWidth - finalSidebarWidth;
    const safeMax = Math.min(FOCUS_PREVIEW_MAX_WIDTH, raw);

    return Math.max(MIN_PREVIEW_WIDTH, safeMax);
  }, [layoutWidth, finalSidebarWidth]);

  useEffect(() => {
    if (!isPreviewVisible) return;
    if (layoutMode !== "balanced") return;

    setPreviewWidth((prev) => clamp(prev, MIN_PREVIEW_WIDTH, maxBalancedPreviewWidth));
  }, [isPreviewVisible, layoutMode, maxBalancedPreviewWidth]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = layoutRef.current?.getBoundingClientRect();
      if (!rect) return;

      if (isResizing === "left") {
        const nextSidebar = clamp(e.clientX - rect.left - RAIL_WIDTH, MIN_SIDEBAR_WIDTH, MAX_SIDEBAR_WIDTH);
        setSidebarWidth(nextSidebar);
        return;
      }

      const currentSidebar = layoutMode === "balanced" ? RAIL_WIDTH + sidebarWidth : RAIL_WIDTH;
      const rawPreviewWidth = rect.right - e.clientX;
      const maxAllowed = rect.width - currentSidebar - MIN_EDITOR_WIDTH;
      const safeMaxAllowed = Math.max(MIN_PREVIEW_WIDTH, Math.min(maxAllowed, MAX_PREVIEW_WIDTH));

      setPreviewWidth(clamp(rawPreviewWidth, MIN_PREVIEW_WIDTH, safeMaxAllowed));
    };

    const handleMouseUp = () => setIsResizing(null);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, layoutMode, sidebarWidth]);

  if (!isClient) return null;

  const handleApplyPreset = (mode: LayoutMode) => {
    setLayoutMode(mode);

    if (mode === "focus-preview") {
      setDevice("desktop");
    }

    if (mode === "balanced") {
      setPreviewWidth((prev) => clamp(prev, MIN_PREVIEW_WIDTH, maxBalancedPreviewWidth));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    const result = await saveEditorData(sections, workspaceState);

    if (result.success) {
      setHasChanges(false);
      setLastSavedAt(new Date());
    } else {
      console.error("Failed to save data:", result.error);
      alert("Failed to save: " + result.error);
    }

    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B0B0D] text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
          <p className="text-sm font-medium uppercase tracking-widest opacity-50">
            Menyiapkan Workspace...
          </p>
        </div>
      </div>
    );
  }

  const finalPreviewWidth =
    !isPreviewVisible
      ? 0
      : layoutMode === "focus-preview"
        ? maxFocusPreviewWidth
        : clamp(previewWidth, MIN_PREVIEW_WIDTH, maxBalancedPreviewWidth);

  const activeSection = sections.find((s) => s.id === activeSectionId) || null;
  const pageProgress = getPageCompletion(sections);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0B0B0D] text-white selection:bg-emerald-500/30">
      <EditorTopbar
        hasChanges={hasChanges}
        lastSavedAt={lastSavedAt}
        isSaving={isSaving}
        onSaveDraft={handleSave}
        onPublish={async () => {
          setWorkspaceState((prev) => ({
            ...prev,
            page: { ...prev.page, status: "published" },
          }));
          setHasChanges(true);
          setTimeout(handleSave, 100);
        }}
        onPreview={() => handleApplyPreset("focus-preview")}
        onApplyLayoutPreset={(p: LayoutMode) => handleApplyPreset(p)}
        onResetLayout={() => handleApplyPreset("balanced")}
        completionPercent={pageProgress.completionPercent}
        readySections={pageProgress.readySections}
        totalSections={pageProgress.totalSections}
        activeLayoutPreset={layoutMode}
        pageStatus={workspaceState.page.status}
      />

      <div ref={layoutRef} className="relative flex flex-1 overflow-hidden">
        <aside
          className="z-20 flex shrink-0 overflow-hidden border-r border-white/[0.06] bg-[#131417] shadow-2xl transition-[width] duration-500"
          style={{ width: finalSidebarWidth }}
        >
          <EditorSidebar
            sections={sections}
            workspaceState={workspaceState}
            activeSectionId={activeSectionId}
            activeWorkspace={activeWorkspace}
            isExpanded={isSidebarVisible}
            onSectionsChange={(nextSections) => {
              setSections(nextSections);
              setHasChanges(true);
            }}
            onActiveSectionChange={(id) => {
              setActiveWorkspace("sections");
              setActiveSectionId(id);
            }}
            onWorkspaceChange={setActiveWorkspace}
            onToggleExpanded={() => setLayoutMode(layoutMode === "balanced" ? "focus-edit" : "balanced")}
          />
        </aside>

        <main
          className={cn(
            "relative flex min-w-0 flex-1 flex-col overflow-hidden border-r border-white/[0.04] bg-[#0B0B0D] transition-all duration-500",
            !isEditorVisible && "pointer-events-none w-0 flex-none opacity-0"
          )}
        >
          {isEditorVisible && (
            <EditorWorkspacePanel
              workspace={activeWorkspace}
              section={activeSection}
              sections={sections}
              workspaceState={workspaceState}
              onSectionChange={(section) => {
                setSections((prev) => prev.map((item) => (item.id === section.id ? section : item)));
                setHasChanges(true);
              }}
              onWorkspaceStateChange={(state) => {
                setWorkspaceState(state);
                setHasChanges(true);
              }}
            />
          )}
        </main>

        {layoutMode === "balanced" && isEditorVisible && isPreviewVisible && (
          <div
            onMouseDown={() => setIsResizing("right")}
            className="group absolute top-0 bottom-0 z-40 flex w-1.5 cursor-col-resize items-center justify-center transition-colors"
            style={{ right: finalPreviewWidth - 3 }}
          >
            <div className="h-full w-[1px] bg-white/[0.08] transition-colors group-hover:bg-emerald-500/50" />
          </div>
        )}

        <section
          className={cn(
            "z-20 hidden overflow-hidden bg-[#09090B] lg:flex transition-[width,flex] duration-500",
            layoutMode === "focus-preview" ? "min-w-0 flex-1" : "shrink-0",
            !isPreviewVisible && "w-0"
          )}
          style={layoutMode === "focus-preview" ? undefined : { width: finalPreviewWidth }}
        >
          <EditorPreview
            sections={sections}
            activeSectionId={activeSectionId}
            collapsed={!isPreviewVisible}
            onToggleCollapsed={() => setLayoutMode("focus-edit")}
            device={device}
            onDeviceChange={setDevice}
            editorVisible={isEditorVisible}
            onToggleEditor={() => setLayoutMode(layoutMode === "focus-preview" ? "balanced" : "focus-preview")}
          />
        </section>

        {layoutMode !== "balanced" && (
          <div className="animate-in slide-in-from-bottom-4 absolute right-8 bottom-8 z-50 flex flex-col gap-3 duration-500">
            {layoutMode === "focus-preview" && (
              <button
                onClick={() => setLayoutMode("balanced")}
                className="group flex h-12 items-center gap-3 rounded-2xl border border-white/[0.1] bg-[#131417] px-5 text-white/70 shadow-2xl transition-all hover:text-white"
              >
                <Layout className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-[11px] font-black uppercase tracking-widest">Show Editor</span>
              </button>
            )}

            {layoutMode === "focus-edit" && (
              <button
                onClick={() => setLayoutMode("balanced")}
                className="group flex h-12 items-center gap-3 rounded-2xl bg-emerald-500 px-5 text-[#050505] shadow-2xl transition-all hover:scale-105"
              >
                <Monitor className="h-5 w-5 text-[#050505]/80 transition-transform group-hover:rotate-12" />
                <span className="text-[11px] font-black uppercase tracking-widest text-[#050505]/90">
                  Open Preview
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

## 2) Ganti`src/components/editor/editor-preview.tsx`

    ```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Monitor, Smartphone, Tablet, Layout } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { EditorSection } from "@/types/editor";
import { ProfileRenderer } from "../profile/profile-renderer";
import { mapSectionsToProfileData } from "@/lib/profile-mapper";

type DeviceType = "mobile" | "tablet" | "desktop";

interface EditorPreviewProps {
  sections: EditorSection[];
  activeSectionId: string | null;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  device: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  editorVisible: boolean;
  onToggleEditor: () => void;
}

type DevicePreset = {
  screenWidth: number;
  screenHeight: number;
  shellWidth: number;
  shellHeight: number;
  headerHeight: number;
  baseHeight: number;
  borderRadius: number;
  outerPaddingX: number;
  outerPaddingY: number;
};

const DEVICE_PRESETS: Record<DeviceType, DevicePreset> = {
  mobile: {
    screenWidth: 390,
    screenHeight: 844,
    shellWidth: 430,
    shellHeight: 920,
    headerHeight: 40,
    baseHeight: 0,
    borderRadius: 48,
    outerPaddingX: 28,
    outerPaddingY: 28,
  },
  tablet: {
    screenWidth: 820,
    screenHeight: 1180,
    shellWidth: 880,
    shellHeight: 1240,
    headerHeight: 36,
    baseHeight: 0,
    borderRadius: 32,
    outerPaddingX: 28,
    outerPaddingY: 28,
  },
  desktop: {
    screenWidth: 1440,
    screenHeight: 900,
    shellWidth: 1480,
    shellHeight: 948,
    headerHeight: 48,
    baseHeight: 18,
    borderRadius: 18,
    outerPaddingX: 40,
    outerPaddingY: 40,
  },
};

export function EditorPreview({
  sections,
  activeSectionId,
  collapsed,
  onToggleCollapsed,
  device,
  onDeviceChange,
  editorVisible,
  onToggleEditor,
}: EditorPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const currentDevice = DEVICE_PRESETS[device];

  const profile = useMemo(() => {
    return mapSectionsToProfileData({}, sections, { page: { slug: "preview" } } as any);
  }, [sections]);

  const totalStageHeight = currentDevice.shellHeight + currentDevice.baseHeight;

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

  const previewScale = useMemo(() => {
    if (!containerSize.width || !containerSize.height) return 0.5;

    const availableWidth = Math.max(
      0,
      containerSize.width - currentDevice.outerPaddingX * 2
    );
    const availableHeight = Math.max(
      0,
      containerSize.height - currentDevice.outerPaddingY * 2
    );

    const widthScale = availableWidth / currentDevice.shellWidth;
    const heightScale = availableHeight / totalStageHeight;

    return Math.min(widthScale, heightScale, 1);
  }, [containerSize, currentDevice, totalStageHeight]);

  return (
    <div className="flex h-full flex-col overflow-hidden border-l border-white/[0.08] bg-[#09090B]">
      <div className="z-50 flex h-14 shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#101012] px-5">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleCollapsed}
            className="group rounded-lg bg-white/[0.03] p-2 text-white/30 ring-1 ring-white/[0.08] transition-all hover:bg-white/[0.08] hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-white/[0.08]" />

          <button
            onClick={onToggleEditor}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all",
              editorVisible ? "text-white/25 hover:bg-white/[0.05]" : "bg-emerald-500 text-[#050505]"
            )}
          >
            <Layout className="h-3.5 w-3.5" />
            <span>{editorVisible ? "Full Preview" : "Show Editor"}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl bg-black/40 p-1 ring-1 ring-white/[0.1]">
          {(["mobile", "tablet", "desktop"] as const).map((key) => {
            const Icon = key === "mobile" ? Smartphone : key === "tablet" ? Tablet : Monitor;

            return (
              <button
                key={key}
                onClick={() => onDeviceChange(key)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300",
                  device === key
                    ? "bg-white/[0.12] text-white shadow-lg"
                    : "text-white/20 hover:text-white/50"
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </div>

      <div ref={containerRef} className="relative flex-1 overflow-hidden bg-[#0D0F14]">
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={device}
              initial={{ opacity: 0, scale: previewScale * 0.96, y: 10 }}
              animate={{ opacity: 1, scale: previewScale, y: 0 }}
              exit={{ opacity: 0, scale: previewScale * 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: currentDevice.shellWidth,
                height: totalStageHeight,
                transformOrigin: "center center",
              }}
              className="relative flex shrink-0 flex-col items-center"
            >
              <div
                className={cn(
                  "relative overflow-hidden border border-white/[0.08] bg-[#050505] shadow-[0_40px_120px_rgba(0,0,0,0.8)]",
                  device === "desktop" ? "rounded-t-[22px] border-b-0" : ""
                )}
                style={{
                  width: currentDevice.shellWidth,
                  height: currentDevice.shellHeight,
                  borderRadius: device === "desktop" ? undefined : currentDevice.borderRadius,
                }}
              >
                {device === "desktop" ? (
                  <div
                    className="flex items-center gap-4 border-b border-white/[0.08] bg-[#0F0F11] px-6"
                    style={{ height: currentDevice.headerHeight }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    </div>

                    <div className="flex h-7 flex-1 items-center justify-center rounded-lg bg-white/[0.02] px-4 ring-1 ring-white/[0.06]">
                      <span className="text-[10px] font-bold italic uppercase tracking-widest text-white/10">
                        lynknov.com/live
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-center bg-[#0F0F11]"
                    style={{ height: currentDevice.headerHeight }}
                  >
                    <div className="h-1.5 w-16 rounded-full bg-white/5" />
                  </div>
                )}

                <div
                  className="editor-preview-mode bg-[#050505] overflow-y-auto custom-scrollbar"
                  style={{
                    width: currentDevice.screenWidth,
                    height: currentDevice.screenHeight,
                    margin: "0 auto",
                  }}
                >
                  <ProfileRenderer profile={profile} />
                </div>
              </div>

              {device === "desktop" && (
                <div
                  className="mx-auto rounded-b-3xl border-x border-b border-white/[0.08] bg-[linear-gradient(180deg,#2A2C31_0%,#17181C_100%)] shadow-2xl"
                  style={{
                    width: "96%",
                    height: currentDevice.baseHeight,
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
```

## Kenapa patch ini lebih tepat

Karena sekarang:

* resize preview kanan ikut ** layout aktual **, bukan angka mati`352`
    * balanced / focus preview tidak lagi tergantung ke`window.innerWidth`
        * tinggi viewport tidak lagi “diakali” dengan `viewportHeight - 44` atau`-40`
            * tinggi desktop base ikut dihitung ke scale stage, jadi lebih stabil secara visual

## Catatan jujur

Patch ini akan ** membenahi sizing, crop, dan kestabilan live preview **.Tapi kalau setelah ini kamu masih merasa “mobile preview kok rasa layoutnya masih desktop”, itu berarti kamu sudah masuk ke lapisan masalah berikutnya: `ProfileRenderer` masih dirender langsung di dalam panel preview, jadi breakpoint halaman publik belum disimulasikan sebagai viewport device sungguhan.Itu memang terlihat dari cara preview saat ini memakai `<ProfileRenderer profile={profile} />` langsung di dalam device viewport. 
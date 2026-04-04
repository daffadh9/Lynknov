"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { EditorPreview } from "@/components/editor/editor-preview";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { EditorTopbar } from "@/components/editor/editor-topbar";
import { EditorWorkspacePanel } from "@/components/editor/editor-workspace-panel";
import { getPageCompletion } from "@/lib/editor-progress";
import { getEditorData, saveEditorData } from "@/features/editor/actions";
import {
  officialDemoSections,
  officialDemoWorkspaceState,
} from "@/features/profile/official-demo";
import type { EditorSection, EditorWorkspaceState, EditorWorkspaceKey } from "@/types/editor";
import { Loader2, ChevronRight } from "lucide-react";

const RAIL_WIDTH = 72;
const MIN_SIDEBAR_WIDTH = 240;
const MAX_SIDEBAR_WIDTH = 400;
const MIN_EDITOR_WIDTH = 400;
const MIN_PREVIEW_WIDTH = 400;
const DEFAULT_PREVIEW_WIDTH = 520;
const MAX_PREVIEW_WIDTH = 860;
const FOCUS_PREVIEW_MAX_WIDTH = 1180;

type LayoutMode = "focus-edit" | "balanced" | "focus-preview";
type DeviceType = "mobile" | "tablet" | "desktop";

const subscribeToClient = () => () => {};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function EditorPage() {
  const isClient = useSyncExternalStore(subscribeToClient, () => true, () => false);

  const layoutRef = useRef<HTMLDivElement>(null);

  const [sections, setSections] = useState<EditorSection[]>(() => structuredClone(officialDemoSections));
  const [workspaceState, setWorkspaceState] = useState<EditorWorkspaceState>(() => structuredClone(officialDemoWorkspaceState));
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [activeWorkspace, setActiveWorkspace] = useState<EditorWorkspaceKey>("sections");

  const [layoutMode, setLayoutMode] = useState<LayoutMode>("balanced");
  const [device, setDevice] = useState<DeviceType>("mobile");
  
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [previewWidth, setPreviewWidth] = useState(DEFAULT_PREVIEW_WIDTH);
  const [focusEditPreviewWidth, setFocusEditPreviewWidth] = useState(540); // UX: Diperlebar agar tidak terasa terpotong
  const [showFocusEditPreview, setShowFocusEditPreview] = useState(false);
  
  const [isResizing, setIsResizing] = useState<"left" | "right" | "focus-edit-preview" | null>(null);
  const [layoutWidth, setLayoutWidth] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
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
  const isPreviewVisible = layoutMode !== "focus-edit" || showFocusEditPreview;

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

      if (isResizing === "focus-edit-preview") {
        setFocusEditPreviewWidth(clamp(rawPreviewWidth, MIN_PREVIEW_WIDTH, safeMaxAllowed));
      } else {
        setPreviewWidth(clamp(rawPreviewWidth, MIN_PREVIEW_WIDTH, safeMaxAllowed));
      }
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
    const result = await saveEditorData(sections, workspaceState);

    if (result.success) {
      setHasChanges(false);
      setLastSavedAt(new Date());
    } else {
      console.error("Failed to save data:", result.error);
      alert("Failed to save: " + result.error);
    }
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
        : layoutMode === "focus-edit"
          ? clamp(focusEditPreviewWidth, MIN_PREVIEW_WIDTH, maxBalancedPreviewWidth)
          : clamp(previewWidth, MIN_PREVIEW_WIDTH, maxBalancedPreviewWidth);

  const activeSection = sections.find((s) => s.id === activeSectionId) || null;
  const pageProgress = getPageCompletion(sections);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0B0B0D] text-white selection:bg-emerald-500/30">
      <EditorTopbar
        hasChanges={hasChanges}
        lastSavedAt={lastSavedAt}
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
          className="z-30 flex shrink-0 overflow-hidden border-r border-white/[0.06] bg-[#131417] shadow-2xl transition-[width] duration-500"
          style={{ width: finalSidebarWidth }}
        >
          <EditorSidebar
            sections={sections}
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

        <div className="relative flex flex-1 min-w-0 overflow-hidden bg-[#0B0B0D]">
          {layoutMode === "focus-preview" ? (
            <div className="flex-1 min-w-0 h-full bg-[#09090B] animate-in fade-in duration-500">
              <EditorPreview
                sections={sections}
                activeSectionId={activeSectionId}
                collapsed={false}
                onToggleCollapsed={() => setLayoutMode("focus-edit")}
                device={device}
                onDeviceChange={setDevice}
                editorVisible={false}
                onToggleEditor={() => setLayoutMode("balanced")}
                layoutMode={layoutMode}
              />
            </div>
          ) : (
            <>
              <main
                className={cn(
                  "relative flex min-w-0 flex-1 flex-col overflow-hidden border-r border-white/[0.04] bg-[#0B0B0D] transition-all duration-500",
                  layoutMode === "focus-edit" ? "flex-1" : ""
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

              {((layoutMode === "balanced") || (layoutMode === "focus-edit" && showFocusEditPreview)) && isPreviewVisible && (
                <>
                  <div
                    onMouseDown={() => setIsResizing(layoutMode === "focus-edit" ? "focus-edit-preview" : "right")}
                    className="group absolute top-0 bottom-0 z-40 flex w-4 -ml-2 cursor-col-resize items-center justify-center transition-all"
                    style={{ right: finalPreviewWidth - 2 }}
                    title="Geser untuk menyesuaikan ukuran"
                  >
                    <div className="flex h-12 w-1 items-center justify-center rounded-full bg-white/[0.08] transition-colors group-hover:bg-emerald-500/50 group-active:bg-emerald-400 shadow-sm" />
                  </div>

                  <section
                    className="z-20 hidden lg:flex shrink-0 overflow-hidden bg-[#09090B] relative transition-[width] duration-300"
                    style={{ width: finalPreviewWidth }}
                  >
                    <EditorPreview
                      sections={sections}
                      activeSectionId={activeSectionId}
                      collapsed={false}
                      onToggleCollapsed={() => {
                        if (layoutMode === "focus-edit") {
                          setShowFocusEditPreview(false);
                        } else {
                          setLayoutMode("focus-edit");
                        }
                      }}
                      device={device}
                      onDeviceChange={setDevice}
                      editorVisible={true}
                      onToggleEditor={() => setLayoutMode("focus-preview")}
                      layoutMode={layoutMode}
                    />
                  </section>
                </>
              )}
            </>
          )}
        </div>

        {/* Focus Edit mode handle to open preview */}
        {layoutMode === "focus-edit" && !showFocusEditPreview && (
          <div className="animate-in slide-in-from-right-4 absolute right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 duration-500">
            <button
              onClick={() => setShowFocusEditPreview(true)}
              className="flex h-16 w-6 items-center justify-center rounded-l-xl border-y border-l border-white/[0.1] bg-[#131417] text-white/50 shadow-2xl transition-all hover:w-8 hover:bg-white/[0.05] hover:text-white"
              title="Buka Preview"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
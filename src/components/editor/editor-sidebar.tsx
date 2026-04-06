"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  AudioLines,
  LayoutGrid,
  Palette,
  Plus,
  Settings,
  Image as ImageIcon,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { EditorSection, EditorWorkspaceKey } from "@/types/editor";
import { SortableSectionItem } from "./sortable-section-item";

interface EditorSidebarProps {
  sections: EditorSection[];
  activeSectionId: string | null;
  activeWorkspace: string;
  isExpanded: boolean;
  onSectionsChange: (sections: EditorSection[]) => void;
  onActiveSectionChange: (sectionId: string) => void;
  onWorkspaceChange: (workspace: EditorWorkspaceKey) => void;
  onToggleExpanded: () => void;
}

const WORKSPACES = [
  { key: "sections", label: "Struktur Halaman", shortLabel: "Pages", icon: LayoutGrid },
  { key: "uploads", label: "Pusat Aset", shortLabel: "Aset", icon: ImageIcon },
  { key: "audio", label: "Audio & Musik", shortLabel: "Audio", icon: AudioLines },
  { key: "theme", label: "Tema & Visual", shortLabel: "Theme", icon: Palette },
  { key: "settings", label: "Pengaturan Site", shortLabel: "Setup", icon: Settings },
] as const;

export function EditorSidebar({
  sections,
  activeSectionId,
  activeWorkspace,
  isExpanded,
  onSectionsChange,
  onActiveSectionChange,
  onWorkspaceChange,
  onToggleExpanded,
}: EditorSidebarProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      onSectionsChange(arrayMove(sections, oldIndex, newIndex));
    }
  };

  const handleToggleVisibility = (id: string) => {
    onSectionsChange(
      sections.map((s) => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s))
    );
  };

  const activeWorkspaceMeta = WORKSPACES.find((w) => w.key === activeWorkspace) || WORKSPACES[0];

  return (
    <div className="flex h-full bg-[#14181D]">
      {/* 1. Left Rail — Fixed 72px Anchor */}
      <div className="flex w-[72px] shrink-0 flex-col items-center border-r border-white/[0.06] py-6 bg-[#0F1115]/80 z-20">
        {/* Top Expansion Toggle — The Arrow Navigation */}
        <button
          onClick={onToggleExpanded}
          className={cn(
            "mb-8 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ring-1 ring-white/[0.08]",
            isExpanded 
              ? "bg-white/[0.05] text-white/40 hover:text-white" 
              : "bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)] hover:bg-emerald-500/20"
          )}
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isExpanded ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
        </button>

        <div className="flex flex-1 flex-col gap-4 w-full px-2">
          {WORKSPACES.map(({ key, label, shortLabel, icon: Icon }) => {
            const isActive = activeWorkspace === key;
            return (
              <button
                key={key}
                onClick={() => {
                  onWorkspaceChange(key);
                  if (!isExpanded) onToggleExpanded(); // Auto-expand when selecting mode
                }}
                className={cn(
                  "group relative flex h-[60px] w-full flex-col items-center justify-center rounded-xl transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-b from-white/[0.12] to-white/[0.05] text-white shadow-lg ring-1 ring-white/[0.12]"
                    : "text-white/30 hover:bg-white/[0.06] hover:text-white/70"
                )}
                title={label}
              >
                <Icon className={cn("h-5 w-5 transition-transform duration-300", isActive && "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]")} />
                <span className={cn("mt-2 text-[9px] font-black uppercase tracking-widest transition-opacity duration-300 scale-90", isActive ? "opacity-100" : "opacity-70")}>
                  {shortLabel}
                </span>
                {isActive && (
                  <div className="absolute -left-2 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Secondary Panel — Dynamic Content */}
      {isExpanded && (
        <div className="flex flex-1 flex-col transition-all duration-300 animate-in slide-in-from-left-2 overflow-hidden bg-[#14181D]">
          <div className="flex h-14 items-center justify-between border-b border-white/[0.08] px-5 bg-white/[0.02]">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-white/50">
              {activeWorkspaceMeta.label}
            </h3>
          </div>

          <div className="custom-scrollbar flex-1 overflow-y-auto p-4 space-y-5">
            {activeWorkspace === "sections" && (
              <>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                      {sections.map((section) => (
                        <SortableSectionItem
                          key={section.id}
                          section={section}
                          isActive={activeSectionId === section.id}
                          onClick={() => onActiveSectionChange(section.id)}
                          onToggleVisibility={handleToggleVisibility}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>

                <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] px-4 py-5 text-[11px] font-black uppercase tracking-widest text-white/30 transition-all hover:border-white/[0.2] hover:bg-white/[0.05] hover:text-white/60">
                  <Plus className="h-4 w-4" />
                  Tambah Section
                </button>
              </>
            )}

            {activeWorkspace !== "sections" && (
              <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                <div className="h-14 w-14 rounded-2xl bg-white/[0.02] flex items-center justify-center mb-4 ring-1 ring-white/[0.06] shadow-inner">
                  <activeWorkspaceMeta.icon className="h-6 w-6 text-white/10" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/20">
                  {activeWorkspaceMeta.label}
                </p>
                <p className="text-[10px] text-white/30 mt-2 max-w-[150px] leading-relaxed">
                  Gunakan panel di sebelah kanan untuk mengelola konfigurasi {activeWorkspaceMeta.shortLabel.toLowerCase()}.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

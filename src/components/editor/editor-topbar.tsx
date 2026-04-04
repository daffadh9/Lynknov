"use client";

import {
  ArrowLeft,
  Check,
  Eye,
  Loader2,
  RotateCcw,
  Save,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";

type LayoutPreset = "focus-edit" | "balanced" | "focus-preview" | "custom";

interface EditorTopbarProps {
  onSaveDraft: () => Promise<void>;
  onPublish: () => Promise<void>;
  onPreview: () => void;
  onApplyLayoutPreset: (preset: Exclude<LayoutPreset, "custom">) => void;
  onResetLayout: () => void;
  hasChanges: boolean;
  lastSavedAt: Date | null;
  completionPercent: number;
  readySections: number;
  totalSections: number;
  activeLayoutPreset: LayoutPreset;
  pageStatus: "draft" | "published";
}

const LAYOUT_PRESETS: Array<{
  key: Exclude<LayoutPreset, "custom">;
  label: string;
}> = [
  { key: "focus-edit", label: "Fokus Edit" },
  { key: "balanced", label: "Seimbang" },
  { key: "focus-preview", label: "Fokus Preview" },
];

export function EditorTopbar({
  onSaveDraft,
  onPublish,
  onPreview,
  onApplyLayoutPreset,
  onResetLayout,
  hasChanges,
  lastSavedAt,
  completionPercent,
  readySections,
  totalSections,
  activeLayoutPreset,
  pageStatus,
}: EditorTopbarProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSaveDraft();
    setIsSaving(false);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    await onPublish();
    setIsPublishing(false);
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-white/[0.08] bg-[#131417] px-6 shadow-sm">
      <div className="flex min-w-0 items-center gap-4">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03] text-white/40 ring-1 ring-white/[0.08] transition-all hover:bg-white/[0.08] hover:text-white"
        >
          <ArrowLeft className="h-4.5 w-4.5 transition-transform group-hover:-translate-x-0.5" />
        </Link>

        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <h1 className="truncate text-[14px] font-black tracking-tight text-white">
                Editor
              </h1>
            </div>
            <span className="inline-flex items-center rounded-lg bg-white/[0.05] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white/60 ring-1 ring-inset ring-white/[0.1]">
              {pageStatus === "published" ? "Live Mode" : "Draft Mode"}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-2 xl:flex">
        <div className="flex items-center gap-1 rounded-xl bg-black/30 p-1 ring-1 ring-white/[0.08]">
          {LAYOUT_PRESETS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onApplyLayoutPreset(key)}
              className={cn(
                "rounded-lg px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all",
                activeLayoutPreset === key
                  ? "bg-white/[0.12] text-white shadow-lg ring-1 ring-white/[0.12]"
                  : "text-white/30 hover:text-white/60"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="mr-2 hidden flex-col items-end text-[10px] font-black uppercase tracking-[0.15em] text-white/30 sm:flex">
          <div className="flex items-center gap-2.5">
            <span className={cn(hasChanges ? "text-amber-400/80" : "text-emerald-400/80")}>
              {hasChanges ? "Unsaved Changes" : "All Changes Saved"}
            </span>
            <div className={cn("h-1.5 w-1.5 rounded-full", hasChanges ? "bg-amber-500" : "bg-emerald-500")} />
          </div>
        </div>

        <div className="h-8 w-px bg-white/[0.08]" />

        <div className="flex items-center gap-2">
          <button
            onClick={onPreview}
            className="group flex h-10 items-center gap-2.5 rounded-xl bg-white/[0.03] px-4 text-[12px] font-black uppercase tracking-widest text-white/70 ring-1 ring-white/[0.08] transition-all hover:bg-white/[0.08] hover:text-white"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>

          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="flex h-10 items-center gap-2.5 rounded-xl bg-white/[0.03] px-4 text-[12px] font-black uppercase tracking-widest text-white/70 ring-1 ring-white/[0.08] transition-all hover:bg-white/[0.08] hover:text-white disabled:opacity-20"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </button>

          <button
            onClick={handlePublish}
            disabled={!hasChanges || isPublishing}
            className="flex h-10 items-center gap-3 rounded-xl bg-emerald-500 px-5 text-[12px] font-black uppercase tracking-[0.15em] text-[#050505] transition-all hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] disabled:opacity-40"
          >
            {isPublishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Publish
          </button>
        </div>
      </div>
    </header>
  );
}

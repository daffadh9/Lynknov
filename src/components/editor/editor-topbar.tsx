"use client";

import { Save, Eye, ArrowLeft, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface EditorTopbarProps {
  onSaveDraft: () => Promise<void>;
  onPublish: () => Promise<void>;
  onPreview: () => void;
  hasChanges: boolean;
  lastSavedAt: Date | null;
}

export function EditorTopbar({
  onSaveDraft,
  onPublish,
  onPreview,
  hasChanges,
  lastSavedAt,
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
    <header className="h-16 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="p-2 -ml-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-sm font-semibold text-white/90">Editor Halaman</h1>
          <div className="flex items-center gap-2 text-xs text-white/50 mt-0.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Published
            </span>
            {lastSavedAt && (
              <>
                <span>•</span>
                <span>
                  Tersimpan{" "}
                  {lastSavedAt.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </>
            )}
            {hasChanges && (
              <>
                <span>•</span>
                <span className="text-amber-500/80">Ada perubahan belum disimpan</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onPreview}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>

        <button
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Simpan Draft
        </button>

        <button
          onClick={handlePublish}
          disabled={!hasChanges || isPublishing}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          {isPublishing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          Publikasikan
        </button>
      </div>
    </header>
  );
}

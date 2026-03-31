"use client";

import React from "react";
import { Check, Loader2 } from "lucide-react";

export interface SegmentItem {
  id: string;
  label: string;
}

export function SettingsSegmentedNav({
  items,
  activeId,
  onChange,
}: {
  items: SegmentItem[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-[var(--color-surface-highest)] rounded-[14px] border border-white/[0.04]">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`
              relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300
              ${isActive ? "text-white" : "text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.02]"}
            `}
          >
            {isActive && (
              <span className="absolute inset-0 bg-white/[0.06] rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all z-0" />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export type SaveState = "idle" | "saving" | "saved" | "error";

export function SaveStateBadge({ state, lastSaved }: { state: SaveState; lastSaved?: string }) {
  if (state === "idle" && !lastSaved) return null;

  return (
    <div className="flex items-center gap-2 text-xs font-medium">
      {state === "saving" && (
        <span className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
          <Loader2 className="w-3 h-3 animate-spin" />
          Menyimpan...
        </span>
      )}
      {(state === "saved" || (state === "idle" && lastSaved)) && (
        <span className="flex items-center gap-1.5 text-white/60">
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/[0.05] border border-white/10 text-white/70">
            <Check className="w-2.5 h-2.5" />
          </span>
          Tersimpan
        </span>
      )}
      {state === "error" && (
        <span className="flex items-center gap-1.5 text-red-400">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          Gagal menyimpan
        </span>
      )}
    </div>
  );
}

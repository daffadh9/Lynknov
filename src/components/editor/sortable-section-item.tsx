"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, EyeOff, GripVertical } from "lucide-react";
import { cn } from "@/lib/cn";
import type { EditorSection } from "@/types/editor";

interface SortableSectionItemProps {
  section: EditorSection;
  isActive: boolean;
  onClick: () => void;
  onToggleVisibility: (id: string) => void;
}

export function SortableSectionItem({
  section,
  isActive,
  onClick,
  onToggleVisibility,
}: SortableSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-xl transition-all duration-300",
        isDragging ? "z-50 opacity-50 scale-95" : "opacity-100",
        !section.isEnabled && "opacity-40"
      )}
    >
      <div
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-between gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300",
          isActive
            ? "bg-[#1C1C1F] border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-emerald-500/20"
            : "bg-white/[0.02] border-white/[0.04] border-dashed hover:bg-white/[0.04] hover:border-white/10"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn(
            "shrink-0 h-1.5 w-1.5 rounded-full transition-all duration-500",
            isActive 
              ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] scale-110" 
              : "bg-white/10 group-hover:bg-white/30"
          )} />
          <span className={cn(
            "truncate text-[13px] font-bold tracking-tight transition-colors",
            isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
          )}>
            {section.label}
          </span>
        </div>

        <div className={cn(
          "flex items-center gap-1 transition-all duration-200",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleVisibility(section.id); }}
            className="p-1.5 rounded-lg hover:bg-white/[0.08] text-white/20 hover:text-white/60 transition-colors"
          >
            {section.isEnabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
          </button>
          <button
            {...attributes}
            {...listeners}
            className="p-1.5 cursor-grab active:cursor-grabbing rounded-lg hover:bg-white/[0.08] text-white/20 hover:text-white/60 transition-colors"
          >
            <GripVertical className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Active side indicator */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-x-[1px] h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
        )}
      </div>
    </div>
  );
}

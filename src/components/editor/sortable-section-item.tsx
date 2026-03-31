"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Eye, EyeOff } from "lucide-react";
import { EditorSection } from "@/types/editor";
import { cn } from "@/lib/cn";

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
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl border mb-2 cursor-pointer transition-colors",
        isActive
          ? "border-emerald-500/50 bg-emerald-500/10"
          : "border-white/5 bg-white/5 hover:bg-white/10",
        isDragging && "opacity-50 z-10 shadow-xl",
        !section.isEnabled && "opacity-60"
      )}
      onClick={onClick}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab p-1 hover:bg-white/10 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="w-4 h-4 text-white/50" />
      </div>

      <div className="flex-1 font-medium text-sm text-white/90">
        {section.label}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility(section.id);
        }}
        className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white"
        title={section.isEnabled ? "Sembunyikan" : "Tampilkan"}
      >
        {section.isEnabled ? (
          <Eye className="w-4 h-4" />
        ) : (
          <EyeOff className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

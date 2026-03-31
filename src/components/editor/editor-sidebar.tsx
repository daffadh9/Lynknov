"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { EditorSection } from "@/types/editor";
import { SortableSectionItem } from "./sortable-section-item";

interface EditorSidebarProps {
  sections: EditorSection[];
  activeSectionId: string | null;
  onSectionsChange: (sections: EditorSection[]) => void;
  onActiveSectionChange: (id: string) => void;
}

export function EditorSidebar({
  sections,
  activeSectionId,
  onSectionsChange,
  onActiveSectionChange,
}: EditorSidebarProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
      sections.map((section) =>
        section.id === id
          ? { ...section, isEnabled: !section.isEnabled }
          : section
      )
    );
  };

  return (
    <div className="w-80 border-r border-white/5 bg-[#0A0A0A] flex flex-col h-full">
      <div className="p-4 border-b border-white/5">
        <h2 className="text-sm font-semibold text-white/90">Struktur Halaman</h2>
        <p className="text-xs text-white/50 mt-1">
          Drag untuk mengubah urutan section
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <SortableSectionItem
                key={section.id}
                section={section}
                isActive={activeSectionId === section.id}
                onClick={() => onActiveSectionChange(section.id)}
                onToggleVisibility={handleToggleVisibility}
              />
            ))}
          </SortableContext>
        </DndContext>

        <button className="w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-white/20 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Tambah Section
        </button>
      </div>
    </div>
  );
}

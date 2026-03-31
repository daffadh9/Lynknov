"use client";

import { useState, useEffect } from "react";
import { EditorSection } from "@/types/editor";
import { initialSections } from "@/lib/editor-mock-data";
import { EditorTopbar } from "@/components/editor/editor-topbar";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { SectionEditorPanel } from "@/components/editor/section-editor-panel";
import { EditorPreview } from "@/components/editor/editor-preview";

export default function EditorPage() {
  const [mounted, setMounted] = useState(false);
  const [sections, setSections] = useState<EditorSection[]>(initialSections);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    initialSections[0]?.id || null
  );
  
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration guard
    setMounted(true);
  }, []);

  const activeSection = sections.find((s) => s.id === activeSectionId) || null;

  const handleSectionsChange = (newSections: EditorSection[]) => {
    setSections(newSections);
    setHasChanges(true);
  };

  const handleSectionUpdate = (updatedSection: EditorSection) => {
    setSections((prev) =>
      prev.map((s) => (s.id === updatedSection.id ? updatedSection : s))
    );
    setHasChanges(true);
  };

  const handleSaveDraft = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setHasChanges(false);
        setLastSavedAt(new Date());
        resolve();
      }, 800);
    });
  };

  const handlePublish = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setHasChanges(false);
        setLastSavedAt(new Date());
        resolve();
      }, 1200);
    });
  };

  const handlePreview = () => {
    // Toggle full screen preview mode if needed
    console.log("Open full screen preview");
  };

  if (!mounted) {
    return (
      <div className="flex flex-col h-screen bg-[#050505] text-white items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-white overflow-hidden">
      <EditorTopbar
        hasChanges={hasChanges}
        lastSavedAt={lastSavedAt}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        onPreview={handlePreview}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar
          sections={sections}
          activeSectionId={activeSectionId}
          onSectionsChange={handleSectionsChange}
          onActiveSectionChange={setActiveSectionId}
        />
        
        <SectionEditorPanel
          section={activeSection}
          onChange={handleSectionUpdate}
        />
        
        <EditorPreview sections={sections} />
      </div>
    </div>
  );
}

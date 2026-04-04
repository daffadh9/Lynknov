"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { EditorSection } from "@/types/editor";

interface EditorStructuralPreviewProps {
  sections: EditorSection[];
  activeSectionId: string | null;
}

function SkeletonLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, delay }}
      className={cn("bg-white/10 rounded-full", className)}
    />
  );
}

function SkeletonBlock({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, delay }}
      className={cn("bg-white/[0.05] rounded-xl border border-white/[0.02]", className)}
    />
  );
}

function SectionWrapper({ 
  isActive, 
  name, 
  children 
}: { 
  isActive: boolean; 
  name: string; 
  children: React.ReactNode; 
}) {
  return (
    <div
      className={cn(
        "relative w-full p-6 sm:p-8 transition-all duration-500",
        isActive 
          ? "z-10 bg-emerald-500/[0.03]" 
          : "hover:bg-white/[0.01]"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-section-outline"
          className="absolute inset-2 sm:inset-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/[0.02] shadow-[0_0_30px_rgba(16,185,129,0.1)] pointer-events-none"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      
      {/* Label section type */}
      <div className={cn(
        "absolute top-4 right-4 sm:top-6 sm:right-6 text-[9px] uppercase tracking-widest font-bold",
        isActive ? "text-emerald-400" : "text-white/20"
      )}>
        {name}
      </div>

      <div className={cn("relative z-10 transition-transform duration-500", isActive && "scale-[1.02]")}>
        {children}
      </div>
    </div>
  );
}

// ── SKELETON VARIANTS ─────────────────────────────────────────────────────────

function HeroSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-12">
      <SkeletonBlock className="w-24 h-24 rounded-full" delay={0} />
      <div className="space-y-3 flex flex-col items-center w-full">
        <SkeletonLine className="w-3/4 max-w-[240px] h-6" delay={0.2} />
        <SkeletonLine className="w-1/2 max-w-[160px] h-3" delay={0.3} />
      </div>
      <div className="space-y-2 flex flex-col items-center w-full mt-4">
        <SkeletonLine className="w-full max-w-[320px] h-3" delay={0.4} />
        <SkeletonLine className="w-[90%] max-w-[280px] h-3" delay={0.5} />
      </div>
      <div className="flex items-center gap-3 w-full justify-center mt-6">
        <SkeletonBlock className="w-28 h-10 rounded-full bg-white/20" delay={0.6} />
        <SkeletonBlock className="w-28 h-10 rounded-full" delay={0.7} />
      </div>
    </div>
  );
}

function AboutSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 py-8">
      <div className="flex-1 space-y-4">
        <SkeletonLine className="w-1/3 h-5 mb-6" />
        <SkeletonLine className="w-full h-3" delay={0.1} />
        <SkeletonLine className="w-full h-3" delay={0.2} />
        <SkeletonLine className="w-4/5 h-3" delay={0.3} />
        <SkeletonLine className="w-5/6 h-3" delay={0.4} />
      </div>
      <div className="w-full md:w-1/3 shrink-0">
        <SkeletonBlock className="w-full h-32" delay={0.5} />
      </div>
    </div>
  );
}

function DigitalPresenceSkeleton() {
  return (
    <div className="py-8 space-y-6">
      <SkeletonLine className="w-1/4 h-4 mx-auto mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map(i => (
          <SkeletonBlock key={i} className="h-20" delay={i * 0.1} />
        ))}
      </div>
    </div>
  );
}

function ShowcaseSkeleton() {
  return (
    <div className="py-8 space-y-6">
      <SkeletonLine className="w-1/3 h-5 mb-6" />
      <div className="flex flex-col gap-4">
        <SkeletonBlock className="w-full h-32" delay={0.1} />
        <SkeletonBlock className="w-full h-32" delay={0.2} />
      </div>
    </div>
  );
}

function StoryboardSkeleton() {
  return (
    <div className="py-8 space-y-6">
      <SkeletonLine className="w-1/3 h-5 mb-6" />
      <div className="relative pl-6 space-y-8 border-l border-white/10 ml-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="relative">
            <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-white/20 ring-4 ring-[#030303]" />
            <SkeletonLine className="w-24 h-2 mb-3" delay={i * 0.1} />
            <SkeletonBlock className="w-full h-24" delay={i * 0.15} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioSkeleton() {
  return (
    <div className="py-8 space-y-6">
      <SkeletonLine className="w-1/4 h-5 mb-6 mx-auto" />
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <SkeletonBlock key={i} className="aspect-square" delay={i * 0.1} />
        ))}
      </div>
    </div>
  );
}

function LinkHubSkeleton() {
  return (
    <div className="py-8 space-y-6">
      <SkeletonLine className="w-1/3 h-5 mb-6" />
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <SkeletonBlock key={i} className="w-full h-14 rounded-2xl" delay={i * 0.1} />
        ))}
      </div>
    </div>
  );
}

function TestimonialsSkeleton() {
  return (
    <div className="py-8 space-y-6">
      <SkeletonLine className="w-1/4 h-5 mb-8 mx-auto" />
      <div className="flex flex-col gap-4">
        <SkeletonBlock className="w-full sm:w-5/6 h-28 self-start" delay={0.1} />
        <SkeletonBlock className="w-full sm:w-5/6 h-28 self-end" delay={0.2} />
      </div>
    </div>
  );
}

// ── MAIN STRUCTURAL RENDERER ──────────────────────────────────────────────────

export function EditorStructuralPreview({ sections, activeSectionId }: EditorStructuralPreviewProps) {
  const sortedSections = [...sections].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="w-full bg-[#030303] min-h-full flex flex-col pb-20">
      {sortedSections.map((section) => {
        if (section.isEnabled === false) return null;
        const isActive = section.id === activeSectionId;

        const renderSkeleton = () => {
          switch (section.type) {
            case "hero": return <HeroSkeleton />;
            case "about": return <AboutSkeleton />;
            case "digital_presence": return <DigitalPresenceSkeleton />;
            case "showcase": return <ShowcaseSkeleton />;
            case "storyboard": return <StoryboardSkeleton />;
            case "portfolio": return <PortfolioSkeleton />;
            case "link_hub": return <LinkHubSkeleton />;
            case "testimonials": return <TestimonialsSkeleton />;
            default: 
              return (
                <div className="py-8 flex flex-col items-center justify-center opacity-30">
                  <SkeletonLine className="w-1/4 h-4 mb-4" />
                  <SkeletonBlock className="w-full h-20" />
                </div>
              );
          }
        };

        return (
          <SectionWrapper key={section.id} isActive={isActive} name={section.label}>
            {renderSkeleton()}
          </SectionWrapper>
        );
      })}
    </div>
  );
}

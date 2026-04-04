import { cn } from "@/lib/cn";
import type { StoryboardSection } from "@/types/editor";

interface StoryboardPreviewProps {
  section: StoryboardSection;
}

export function StoryboardPreview({ section }: StoryboardPreviewProps) {
  const content = section.content;
  const style = section.style;
  const settings = section.settings;
  const showDates = (settings as { showDates?: boolean }).showDates !== false;
  const maxVisible = (settings as { maxVisible?: number }).maxVisible || 3;
  const items = (content.items || []).slice(0, maxVisible);

  return (
    <div className="w-full p-4 bg-[#050505]">
      {/* Header */}
      <div className="mb-4 text-center">
        <div className="text-[9px] font-bold text-emerald-500/80 uppercase tracking-widest mb-1">
          {content.title || <span className="text-white/20">Storyboard</span>}
        </div>
        {content.description && (
          <p className="text-[9px] text-white/40">{content.description}</p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-6 border border-dashed border-white/10 rounded-xl">
          <span className="text-[10px] text-white/20">Belum ada item storyboard</span>
        </div>
      ) : style.layout === "timeline" ? (
        <div className="flex flex-col gap-0">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3 relative">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                {i < items.length - 1 && <div className="w-px flex-1 bg-white/10 mt-1" />}
              </div>
              {/* Content */}
              <div className={cn("flex-1 pb-4", i === items.length - 1 ? "pb-0" : "")}>
                {showDates && item.date && (
                  <div className="text-[8px] font-semibold text-white/30 mb-0.5">{item.date}</div>
                )}
                <div className="text-[11px] font-semibold text-white">{item.title}</div>
                <p className="text-[9px] text-white/45 leading-relaxed mt-0.5 line-clamp-2">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-[#0A0A0A] border border-white/[0.07]">
              {showDates && item.date && (
                <div className="text-[8px] font-semibold text-white/30 mb-1">{item.date}</div>
              )}
              <div className="text-[11px] font-semibold text-white">{item.title}</div>
              <p className="text-[9px] text-white/45 leading-relaxed mt-1 line-clamp-2">{item.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

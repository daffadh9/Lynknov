import { cn } from "@/lib/cn";
import type { AboutSection } from "@/types/editor";

interface AboutPreviewProps {
  section: AboutSection;
}

export function AboutPreview({ section }: AboutPreviewProps) {
  const content = section.content;
  const style = section.style;
  const settings = section.settings;
  const showSideCard = (settings as { showSideCard?: boolean }).showSideCard !== false;
  const sideCardTitle = (content as { sideCardTitle?: string }).sideCardTitle;
  const sideCardLabel = (content as { sideCardLabel?: string }).sideCardLabel;
  const isFullWidth = style.layout === "simple" || !showSideCard;

  return (
    <div className="w-full p-4 bg-[#050505]">
      {content.title && (settings as { showTitle?: boolean }).showTitle !== false && (
        <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-3">{content.title}</div>
      )}
      <div className={cn("flex gap-3", isFullWidth ? "flex-col" : "flex-row")}>
        {/* Side card */}
        {showSideCard && !isFullWidth && (
          <div className="w-1/3 shrink-0 p-3 rounded-xl bg-[#0A0A0A] border border-white/[0.07] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-violet-500/10 blur-xl" />
            <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-2 relative z-10">
              {sideCardTitle || content.title || "Title"}
            </div>
            <div className="w-5 h-5 rounded-md border border-white/20 flex items-center justify-center mb-2 relative z-10">
              <span className="text-[9px]">✦</span>
            </div>
            <div className="text-[8px] text-white/30 relative z-10">{sideCardLabel || "Label"}</div>
          </div>
        )}

        {/* Main description */}
        <div className={cn(
          "p-3 rounded-xl bg-[#0A0A0A] border border-white/[0.07] flex-1",
          "flex flex-col justify-center"
        )}>
          {/* Quote accent */}
          <div className="w-4 h-0.5 bg-white/20 mb-2" />
          <p className="text-[11px] text-white/70 leading-relaxed font-medium">
            {content.description || <span className="text-white/20">Deskripsi tentang Anda...</span>}
          </p>
        </div>
      </div>
    </div>
  );
}

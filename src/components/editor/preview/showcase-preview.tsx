import { cn } from "@/lib/cn";
import type { ShowcaseSection } from "@/types/editor";

interface ShowcasePreviewProps {
  section: ShowcaseSection;
}

export function ShowcasePreview({ section }: ShowcasePreviewProps) {
  const content = section.content;
  const style = section.style;
  const settings = section.settings;
  const showPrice = (settings as { showPrice?: boolean }).showPrice !== false;
  const showCategory = (settings as { showCategory?: boolean }).showCategory !== false;
  const showCta = (settings as { showCta?: boolean }).showCta !== false;
  const maxVisible = (settings as { maxVisible?: number }).maxVisible || 4;
  const items = (content.items || []).slice(0, maxVisible);

  return (
    <div className="w-full p-4 bg-[#050505]">
      {/* Header */}
      <div className="mb-4 text-center">
        <h3 className="text-xs font-bold text-white tracking-wide">
          {content.title || <span className="text-white/20">Judul Section</span>}
        </h3>
        {content.description && (
          <p className="text-[9px] text-white/40 mt-1">{content.description}</p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-6 border border-dashed border-white/10 rounded-xl">
          <span className="text-[10px] text-white/20">Belum ada item showcase</span>
        </div>
      ) : (
        <div className={cn(
          "grid gap-3",
          style.columns === 1 || style.layout === "list" ? "grid-cols-1" : "grid-cols-2"
        )}>
          {items.map((item, i) => (
            <div key={i} className="flex flex-col rounded-xl bg-[#0A0A0A] border border-white/[0.07] overflow-hidden">
              {/* Image placeholder */}
              {item.imageUrl ? (
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-zinc-900 flex items-center justify-center border-b border-white/5">
                  <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center">
                    <span className="text-[8px] text-white/20">IMG</span>
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="p-2.5 flex flex-col gap-1">
                {(showCategory || showPrice) && (
                  <div className="flex items-center justify-between">
                    {showCategory && (
                      <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-wider">{item.type}</span>
                    )}
                    {showPrice && item.price && (
                      <span className="text-[8px] font-semibold text-white/60">{item.price}</span>
                    )}
                  </div>
                )}
                <h4 className="text-[11px] font-semibold text-white leading-tight">{item.title}</h4>
                {showCta && item.ctaText && (
                  <div className="mt-1 h-6 rounded-lg border border-white/10 text-[9px] text-white/60 font-semibold flex items-center justify-center">
                    {item.ctaText}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

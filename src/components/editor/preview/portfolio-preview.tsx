import { cn } from "@/lib/cn";
import type { PortfolioSection } from "@/types/editor";

interface PortfolioPreviewProps {
  section: PortfolioSection;
}

export function PortfolioPreview({ section }: PortfolioPreviewProps) {
  const content = section.content;
  const style = section.style;
  const settings = section.settings;
  const showCategory = (settings as { showCategory?: boolean }).showCategory !== false;
  const showDescription = (settings as { showDescription?: boolean }).showDescription !== false;
  const maxVisible = (settings as { maxVisible?: number }).maxVisible || 3;
  const items = (content.items || []).slice(0, maxVisible);
  const featured = items[0];
  const rest = items.slice(1);

  return (
    <div className="w-full p-4 bg-[#050505]">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-white">
          {content.title || <span className="text-white/20">Project & Portfolio</span>}
        </h3>
        {content.description && (
          <p className="text-[9px] text-white/40 mt-1">{content.description}</p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-6 border border-dashed border-white/10 rounded-xl">
          <span className="text-[10px] text-white/20">Belum ada project</span>
        </div>
      ) : style.layout === "featured" ? (
        <div className="flex flex-col gap-3">
          {/* Featured card */}
          {featured && (
            <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.07] overflow-hidden">
              <div className="aspect-[16/9] bg-zinc-900 flex items-center justify-center border-b border-white/5">
                {featured.imageUrl ? (
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${featured.imageUrl})` }} />
                ) : (
                  <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center">
                    <span className="text-[10px] text-white/20">IMG</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                {showCategory && (
                  <div className="text-[8px] font-bold text-emerald-400 uppercase tracking-wider mb-1">{featured.category}</div>
                )}
                <h4 className="text-xs font-bold text-white">{featured.title}</h4>
                {showDescription && featured.description && (
                  <p className="text-[9px] text-white/45 mt-1 leading-relaxed line-clamp-2">{featured.description}</p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <div className="h-5 px-3 rounded-full bg-white text-black text-[8px] font-bold flex items-center">Detail</div>
                </div>
              </div>
            </div>
          )}

          {/* Rest as small list */}
          {rest.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {rest.map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-[#0A0A0A] border border-white/[0.07]">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/10 shrink-0 flex items-center justify-center">
                    <span className="text-[7px] text-white/20">{i + 2}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    {showCategory && <div className="text-[7px] text-emerald-400 font-bold uppercase">{item.category}</div>}
                    <div className="text-[10px] font-semibold text-white truncate">{item.title}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={cn(
          "grid gap-2",
          style.layout === "list" ? "grid-cols-1" : "grid-cols-2"
        )}>
          {items.map((item, i) => (
            <div key={i} className="rounded-xl bg-[#0A0A0A] border border-white/[0.07] overflow-hidden">
              <div className="aspect-video bg-zinc-900" />
              <div className="p-2">
                {showCategory && <div className="text-[7px] text-emerald-400 font-bold uppercase">{item.category}</div>}
                <div className="text-[10px] font-semibold text-white">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

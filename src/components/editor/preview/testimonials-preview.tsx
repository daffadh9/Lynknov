import type { TestimonialsSection } from "@/types/editor";

interface TestimonialsPreviewProps {
  section: TestimonialsSection;
}

export function TestimonialsPreview({ section }: TestimonialsPreviewProps) {
  const content = section.content;
  const settings = section.settings;
  const showRole = (settings as { showRole?: boolean }).showRole !== false;
  const maxVisible = (settings as { maxVisible?: number }).maxVisible || 2;
  const items = (content.items || []).slice(0, maxVisible);
  const featured = items[0];

  return (
    <div className="w-full p-4 bg-[#050505]">
      {/* Header */}
      <div className="mb-4 text-center">
        <h3 className="text-xs font-bold text-white font-serif">
          {content.title || <span className="text-white/20">Testimoni</span>}
        </h3>
      </div>

      {!featured ? (
        <div className="flex flex-col items-center gap-2 py-6 border border-dashed border-white/10 rounded-xl">
          <span className="text-[10px] text-white/20">Belum ada testimoni</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Featured testimonial */}
          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.07] text-center relative">
            {/* Quote mark */}
            <div className="text-2xl text-white/[0.06] font-serif leading-none mb-2">&ldquo;</div>
            <p className="text-[11px] text-white/75 leading-relaxed font-medium italic">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-col items-center gap-0.5">
              <span className="text-[10px] font-bold text-white">{featured.author}</span>
              {showRole && featured.role && (
                <span className="text-[8px] text-white/40">{featured.role}</span>
              )}
            </div>
          </div>

          {/* Second testimonial if available */}
          {items[1] && (
            <div className="p-3 rounded-xl bg-[#0A0A0A] border border-white/[0.07]">
              <p className="text-[10px] text-white/55 italic leading-relaxed line-clamp-2">&ldquo;{items[1].quote}&rdquo;</p>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-4 h-4 rounded-full bg-zinc-800 border border-white/10" />
                <div>
                  <div className="text-[8px] font-bold text-white/70">{items[1].author}</div>
                  {showRole && items[1].role && <div className="text-[7px] text-white/30">{items[1].role}</div>}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

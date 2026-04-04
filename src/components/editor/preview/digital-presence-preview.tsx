import { cn } from "@/lib/cn";
import type { DigitalPresenceSection } from "@/types/editor";

interface DigitalPresencePreviewProps {
  section: DigitalPresenceSection;
}

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "from-pink-500/20 to-orange-500/20",
  linkedin: "from-blue-500/20 to-blue-600/20",
  youtube: "from-red-500/20 to-red-600/20",
  tiktok: "from-zinc-800 to-zinc-900",
  x: "from-zinc-800 to-zinc-900",
  twitter: "from-sky-500/20 to-sky-600/20",
  github: "from-zinc-700/20 to-zinc-800/20",
};

export function DigitalPresencePreview({ section }: DigitalPresencePreviewProps) {
  const content = section.content;
  const style = section.style;
  const settings = section.settings;
  const showMetrics = (settings as { showMetrics?: boolean }).showMetrics !== false;
  const stats = content.stats || [];

  return (
    <div className="w-full p-4 bg-[#050505]">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-4">
        {content.title && (
          <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">{content.title}</div>
        )}
        {content.description && (
          <p className="text-[10px] text-white/40 max-w-[200px]">{content.description}</p>
        )}
      </div>

      {stats.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-6 border border-dashed border-white/10 rounded-xl">
          <span className="text-[10px] text-white/20">Belum ada platform ditambahkan</span>
        </div>
      ) : style.layout === "pills" ? (
        <div className="flex flex-wrap gap-2 justify-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="text-[9px] text-white/50">@</span>
              <span className="text-[10px] text-white/70 font-medium">{stat.platform}</span>
              {showMetrics && stat.value && (
                <span className="text-[9px] text-white/40">{stat.value}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={cn(
          "grid gap-2",
          style.layout === "list" ? "grid-cols-1" :
          style.columns >= 3 ? "grid-cols-3" :
          style.columns === 2 ? "grid-cols-2" : "grid-cols-1"
        )}>
          {stats.map((stat, i) => {
            const colorKey = stat.platform.toLowerCase();
            const gradient = PLATFORM_COLORS[colorKey] || "from-zinc-800/50 to-zinc-900/50";
            return (
              <div key={i} className={cn(
                "flex flex-col items-center p-3 rounded-xl border border-white/[0.07]",
                "bg-gradient-to-br", gradient
              )}>
                <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-1.5">
                  <span className="text-[8px] text-white/40 font-bold">{stat.platform.charAt(0)}</span>
                </div>
                {showMetrics && stat.value && (
                  <div className="text-sm font-bold text-white">{stat.value}</div>
                )}
                <div className="text-[8px] text-white/40 text-center">{stat.platform}</div>
                {showMetrics && stat.label && (
                  <div className="text-[7px] text-white/30">{stat.label}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

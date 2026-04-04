import { cn } from "@/lib/cn";
import type { LinkHubSection } from "@/types/editor";

interface LinkHubPreviewProps {
  section: LinkHubSection;
}

export function LinkHubPreview({ section }: LinkHubPreviewProps) {
  const content = section.content;
  const settings = section.settings;
  const showGroups = (settings as { showGroups?: boolean }).showGroups !== false;
  const groups = content.groups || [];

  return (
    <div className="w-full p-4 bg-[#050505]">
      {/* Header */}
      <div className="mb-4 text-center">
        <h3 className="text-xs font-bold text-white">
          {content.title || <span className="text-white/20">Dynamic Link Hub</span>}
        </h3>
        {content.description && (
          <p className="text-[9px] text-white/40 mt-1">{content.description}</p>
        )}
      </div>

      {groups.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-6 border border-dashed border-white/10 rounded-xl">
          <span className="text-[10px] text-white/20">Belum ada grup link</span>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.07] overflow-hidden">
          {/* Group tabs */}
          {showGroups && groups.length > 1 && (
            <div className="flex border-b border-white/[0.07] p-1 gap-1">
              {groups.map((group, i) => (
                <div
                  key={i}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-[9px] font-semibold",
                    i === 0 ? "bg-white/10 text-white" : "text-white/40"
                  )}
                >
                  {group.title}
                </div>
              ))}
            </div>
          )}

          {/* Links from first group */}
          <div className="p-2.5 flex flex-col gap-1.5">
            {showGroups ? (
              (groups[0]?.links || []).slice(0, 4).map((link, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.05]">
                  <span className="text-[11px] font-medium text-white/80">{link.label}</span>
                  <svg className="w-2.5 h-2.5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              ))
            ) : (
              groups.flatMap(g => g.links).slice(0, 5).map((link, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.05]">
                  <span className="text-[11px] font-medium text-white/80">{link.label}</span>
                  <svg className="w-2.5 h-2.5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

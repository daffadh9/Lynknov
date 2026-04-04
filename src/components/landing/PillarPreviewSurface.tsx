import { businessGrowthPillars, type BusinessGrowthPillarId } from "./business-growth-pillars";

interface PillarPreviewSurfaceProps {
  pillarId: BusinessGrowthPillarId;
  compact?: boolean;
}

function getPillar(id: BusinessGrowthPillarId) {
  return businessGrowthPillars.find((pillar) => pillar.id === id)!;
}

export function PillarPreviewSurface({
  pillarId,
  compact = false,
}: PillarPreviewSurfaceProps) {
  const pillar = getPillar(pillarId);

  return (
    <div
      className={`relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(10,10,12,0.96)_100%)] shadow-[0_28px_80px_-42px_rgba(0,0,0,0.96)] ${compact ? "min-h-[320px] p-5 md:p-6" : "min-h-[380px] p-6 md:p-8"}`}
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent"></div>
      <div className="absolute -right-12 top-0 h-40 w-40 rounded-full bg-white/[0.05] blur-[72px]"></div>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-white/38">Preview</div>
          <div className="mt-2 text-lg font-medium text-white">{pillar.name}</div>
        </div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/30">{pillar.number}</div>
      </div>

      {pillarId === "interactive-business-os" && (
        <div className="mx-auto max-w-[320px] rounded-[30px] border border-white/10 bg-black/45 p-4 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-white/10"></div>
            <div className="flex-1">
              <div className="mb-2 h-3 w-28 rounded bg-white/80"></div>
              <div className="h-2 w-20 rounded bg-white/28"></div>
            </div>
          </div>
          <div className="mb-3 h-28 rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_100%)]"></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-14 rounded-[18px] border border-white/8 bg-white/[0.05]"></div>
            <div className="h-14 rounded-[18px] border border-white/8 bg-white/[0.05]"></div>
          </div>
          <div className="mt-3 h-20 rounded-[20px] border border-white/8 bg-white/[0.04]"></div>
          <div className="mt-4 h-11 rounded-full bg-white"></div>
        </div>
      )}

      {pillarId === "portfolio-showcase" && (
        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[28px] border border-white/8 bg-black/40 p-4">
            <div className="aspect-[5/4] rounded-[24px] bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_42%,rgba(0,0,0,0.24)_100%)]"></div>
            <div className="mt-4 h-3 w-36 rounded bg-white/72"></div>
            <div className="mt-2 h-2 w-2/3 rounded bg-white/24"></div>
            <div className="mt-2 h-2 w-1/2 rounded bg-white/18"></div>
          </div>
          <div className="grid gap-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-[22px] border border-white/8 bg-white/[0.04] p-4">
                <div className="mb-3 aspect-[4/3] rounded-[18px] bg-black/35"></div>
                <div className="h-2 w-24 rounded bg-white/48"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {pillarId === "commerce-hub" && (
        <div className="mx-auto max-w-[520px] space-y-3">
          {["Brand audit package", "Strategy sprint", "Digital product bundle"].map((item, index) => (
            <div
              key={item}
              className={`rounded-[24px] border p-4 ${
                index === 0
                  ? "border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.05)_100%)]"
                  : "border-white/8 bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-white">{item}</div>
                  <div className="mt-2 h-2 w-40 rounded bg-white/22"></div>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                  {index === 0 ? "Primary" : "Offer"}
                </div>
              </div>
            </div>
          ))}
          <div className="h-11 rounded-full bg-white"></div>
        </div>
      )}

      {pillarId === "lead-engine" && (
        <div className="grid gap-3 sm:grid-cols-3">
          {["Found", "Qualified", "Opportunity"].map((column, index) => (
            <div key={column} className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4">
              <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white/40">{column}</div>
              <div className="space-y-3">
                {Array.from({ length: index === 2 ? 2 : 3 }).map((_, itemIndex) => (
                  <div key={`${column}-${itemIndex}`} className="rounded-[18px] border border-white/6 bg-black/30 p-3">
                    <div className="mb-2 h-2 w-3/4 rounded bg-white/42"></div>
                    <div className="h-2 w-1/2 rounded bg-white/18"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {pillarId === "marketing-suite" && (
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[26px] border border-white/8 bg-black/38 p-4">
            <div className="mb-4 h-11 rounded-[18px] bg-white/[0.05]"></div>
            <div className="grid grid-cols-3 gap-2">
              {["Copy", "Script", "Asset"].map((item) => (
                <div key={item} className="rounded-[16px] border border-white/8 bg-white/[0.04] px-3 py-2 text-center text-xs text-white/65">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-[22px] border border-white/8 bg-white/[0.04] p-4">
              <div className="mb-3 h-2 w-24 rounded bg-white/42"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-10 rounded-[16px] bg-black/30"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/8 bg-[linear-gradient(155deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.03)_36%,rgba(0,0,0,0.22)_100%)] p-4">
            <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white/40">Growth signal</div>
            <div className="flex h-[190px] items-end gap-2 rounded-[22px] border border-white/8 bg-black/28 p-4">
              {[28, 42, 51, 48, 66, 74].map((bar, index) => (
                <div key={bar + index} className="flex-1 rounded-t-[8px] bg-white/18" style={{ height: `${bar}%` }}></div>
              ))}
            </div>
            <div className="mt-4 h-3 w-36 rounded bg-white/48"></div>
            <div className="mt-2 h-2 w-24 rounded bg-white/18"></div>
          </div>
        </div>
      )}
    </div>
  );
}


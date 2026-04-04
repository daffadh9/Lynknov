import Image from "next/image";
import { cn } from "@/lib/cn";
import type { HeroSection } from "@/types/editor";

interface HeroPreviewProps {
  section: HeroSection;
}

export function HeroPreview({ section }: HeroPreviewProps) {
  const content = section.content;
  const style = section.style;
  const settings = section.settings;
  const alignment = style.alignment || "left";
  const showAvatar = (settings as { showAvatar?: boolean }).showAvatar !== false;
  const showSecCta = (settings as { showSecondaryCta?: boolean }).showSecondaryCta !== false;
  const badgeText = (content as { badgeText?: string }).badgeText;
  const trustText = (content as { trustText?: string }).trustText;

  return (
    <div className="w-full relative overflow-hidden bg-[#050505]">
      {/* Background */}
      {style.backgroundVariant === "premium-grid" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]" />
        </div>
      )}
      {style.backgroundVariant === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-transparent to-blue-950/20 pointer-events-none" />
      )}
      {style.backgroundVariant === "mesh" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
      )}

      <div className={cn(
        "relative z-10 p-5",
        alignment === "center" ? "flex flex-col items-center text-center" : "flex flex-row items-start gap-4"
      )}>
        {/* Text block */}
        <div className={cn("flex flex-col", alignment === "center" ? "items-center w-full" : "flex-1 pt-2")}>
          {/* Badge */}
          {settings.showBadge && badgeText && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-semibold mb-3 w-fit uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              {badgeText}
            </div>
          )}

          {/* Role */}
          {content.role && (
            <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1.5">
              {content.role}
            </div>
          )}

          {/* Headline */}
          <h2 className="text-lg font-bold text-white leading-[1.2] mb-2.5">
            {content.headline || <span className="text-white/20">Headline utama Anda</span>}
          </h2>

          {/* Description */}
          <p className="text-[11px] text-white/55 leading-relaxed mb-4 max-w-[220px]">
            {content.description || <span className="text-white/20">Deskripsi singkat tentang Anda.</span>}
          </p>

          {/* CTAs */}
          <div className={cn("flex gap-2 flex-wrap", alignment === "center" ? "justify-center" : "")}>
            <div className="h-7 px-4 rounded-lg bg-white text-black text-[10px] font-bold flex items-center shrink-0">
              {content.primaryCta?.label || "Hubungi Saya"}
            </div>
            {showSecCta && (
              <div className="h-7 px-3 rounded-lg border border-white/15 text-white text-[10px] font-semibold flex items-center shrink-0">
                {content.secondaryCta?.label || "Lihat Portfolio"}
              </div>
            )}
          </div>

          {/* Trust text */}
          {trustText && (
            <p className="text-[9px] text-white/30 mt-2.5">{trustText}</p>
          )}

          {/* Name */}
          {content.name && (
            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-white/[0.06]">
              <span className="text-[10px] font-bold text-white">{content.name}</span>
              {settings.showBadge && (
                <svg className="w-2.5 h-2.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/>
                </svg>
              )}
            </div>
          )}
        </div>

        {/* Avatar */}
        {showAvatar && alignment !== "center" && (
          <div className={cn(
            "w-28 h-36 shrink-0 relative overflow-hidden mt-1",
            style.avatarShape === "circle" ? "rounded-full" :
            style.avatarShape === "rounded-xl" ? "rounded-xl" : "rounded-[1.2rem]"
          )}>
            {content.avatarUrl ? (
              <Image src={content.avatarUrl} alt={content.name || "Avatar"} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center">
                <span className="text-[10px] text-white/20 font-medium">Foto</span>
              </div>
            )}
            {/* Availability badge overlay */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full border border-white/10">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="text-[7px] text-white/80">Active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

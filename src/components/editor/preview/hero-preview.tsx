import Image from "next/image";
import { cn } from "@/lib/cn";
import type { HeroSection } from "@/types/editor";

interface HeroPreviewProps {
  section: HeroSection;
  device?: "mobile" | "tablet" | "desktop";
}

const VerifiedIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.6041 3.12517C11.8385 2.76632 12.1613 2.76632 12.3957 3.12517L13.7937 5.26526C13.9113 5.44525 14.1558 5.56816 14.3686 5.55627L16.89 5.41505C17.3155 5.39126 17.5815 5.65706 17.5577 6.08271L17.4165 8.60424C17.4046 8.81702 17.5276 9.06144 17.7076 9.17911L19.8475 10.5772C20.2064 10.8115 20.2064 11.1342 19.8475 11.3686L17.7076 12.7667C17.5276 12.8844 17.4046 13.1287 17.4165 13.3415L17.5577 15.8631C17.5815 16.2887 17.3155 16.5545 16.89 16.5307L14.3686 16.3895C14.1558 16.3776 13.9113 16.5005 13.7937 16.6805L12.3957 18.8206C12.1613 19.1795 11.8385 19.1795 11.6041 18.8206L10.2061 16.6805C10.0885 16.5005 9.84405 16.3776 9.63127 16.3895L7.10986 16.5307C6.68421 16.5545 6.4184 16.2887 6.4422 15.8631L6.58342 13.3415C6.59531 13.1287 6.47239 12.8844 6.29239 12.7667L4.15233 11.3686C3.79348 11.1342 3.79348 10.8115 4.15233 10.5772L6.29239 9.17911C6.47239 9.06144 6.59531 8.81702 6.58342 8.60424L6.4422 6.08271C6.4184 5.65706 6.68421 5.39126 7.10986 5.41505L9.63127 5.55627C9.84405 5.56816 10.0885 5.44525 10.2061 5.26526L11.6041 3.12517Z" fill="#3897F0" />
    <path d="M10.5 12.2L9.1 10.8L8.2 11.7L10.5 14L15.3 9.2L14.4 8.3L10.5 12.2Z" fill="white" />
  </svg>
);

export function HeroPreview({ section, device = "desktop" }: HeroPreviewProps) {
  const { content, style, settings } = section;
  
  const alignment = style.alignment || "left";
  const accent = style.accentColor || "emerald";
  
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";
  
  const showAvatar = settings.showAvatar !== false;
  const showBadge = settings.showBadge !== false;
  const showVerified = settings.showVerifiedBadge !== false && content.isVerified;
  const showSecCta = settings.showSecondaryCta !== false;
  const showTrust = settings.showTrustText !== false;

  const showVerifiedInBadgeRow = isMobile && showVerified;
  const showVerifiedInNameRow = !isMobile && showVerified;

  const palette = {
    emerald: { text: "text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-500/20", glow: "rgba(16,185,129,0.15)", strongGlow: "rgba(16,185,129,0.4)", gradient: "from-emerald-500/20" },
    cyan: { text: "text-cyan-400", bg: "bg-cyan-500", border: "border-cyan-500/20", glow: "rgba(6,182,212,0.15)", strongGlow: "rgba(6,182,212,0.4)", gradient: "from-cyan-500/20" },
    blue: { text: "text-blue-400", bg: "bg-blue-500", border: "border-blue-500/20", glow: "rgba(59,130,246,0.15)", strongGlow: "rgba(59,130,246,0.4)", gradient: "from-blue-500/20" },
    violet: { text: "text-violet-400", bg: "bg-violet-500", border: "border-violet-500/20", glow: "rgba(139,92,246,0.15)", strongGlow: "rgba(139,92,246,0.4)", gradient: "from-violet-500/20" },
    gold: { text: "text-yellow-400", bg: "bg-yellow-500", border: "border-yellow-500/20", glow: "rgba(234,179,8,0.15)", strongGlow: "rgba(234,179,8,0.4)", gradient: "from-yellow-500/20" },
    rose: { text: "text-rose-400", bg: "bg-rose-500", border: "border-rose-500/20", glow: "rgba(244,63,94,0.15)", strongGlow: "rgba(244,63,94,0.4)", gradient: "from-rose-500/20" },
    white: { text: "text-white", bg: "bg-white", border: "border-white/20", glow: "rgba(255,255,255,0.05)", strongGlow: "rgba(255,255,255,0.15)", gradient: "from-white/10" },
  };

  const currentAccent = palette[accent as keyof typeof palette] || palette.emerald;

  const getCtaClass = (type: "primary" | "secondary") => {
    const s = type === "primary" ? style.primaryCtaStyle : style.secondaryCtaStyle;
    const c = type === "primary" ? (style.primaryCtaColor || accent) : (style.secondaryCtaColor || accent);
    const p = palette[c as keyof typeof palette] || palette.emerald;

    switch (s) {
      case "solid": return cn(p.bg, c === "white" ? "text-black" : "text-white", "shadow-lg");
      case "outline": return cn("bg-transparent border-2", p.border, p.text);
      case "soft": return cn(p.bg, "bg-opacity-10", p.text);
      case "glass": return cn("bg-white/5 backdrop-blur-md border border-white/10", p.text);
      case "gradient": return cn("bg-gradient-to-br from-white/20 to-transparent", p.bg, "text-white shadow-xl");
      case "ghost": return cn("bg-transparent", p.text, "hover:bg-white/5");
      default: return type === "primary" ? cn(p.bg, "text-white") : "border border-white/10 text-white";
    }
  };

  // LAYOUT
  const isCenter = alignment === "center";
  const isRight = alignment === "right"; 
  
  const containerLayout = isMobile 
    ? "flex-col items-center text-center" 
    : isCenter 
      ? "flex-col items-center justify-center text-center"
      : isRight 
        ? "flex-row items-center justify-between" 
        : "flex-row-reverse items-center justify-between"; 

  // Width & spacing (Intentional filling)
  // Menambah ruang kontainer dan menarik ke dalam dari tepi luar
  const identityColWidth = isMobile 
    ? "w-full" 
    : isCenter 
      ? "w-full" 
      : isTablet 
        ? "w-[44%] max-w-[380px] px-6" 
        : "w-[42%] max-w-[460px] px-8 lg:px-16";
  const textColWidth = isMobile ? "w-full" : isCenter ? "w-full max-w-3xl" : isTablet ? "w-[54%] max-w-[460px] pr-4" : "w-[56%] max-w-[620px] pr-8 lg:pr-12";

  const identityAlign = isMobile || isCenter ? "items-center text-center" : isRight ? "items-start text-left" : "items-end text-right";
  const textAlign = isMobile || isCenter ? "items-center text-center" : isRight ? "items-end text-right" : "items-start text-left";

  const isLightMode = style.backgroundVariant === "editorial-light";

  // DISPLAY RENDERERS
  const renderBackgroundBase = () => {
    const variant = style.backgroundVariant;
    if (variant === "editorial-light") return "bg-[#F5F5F7]";
    if (variant === "warm-luxury") return "bg-[#1A1614]";
    if (variant === "soft-metallic") return "bg-[#2A2A2E] bg-gradient-to-b from-[#2A2A2E] to-[#1C1C1F]";
    if (variant === "navy-premium") return "bg-[#0A1120]";
    
    // Tonal & Gradients
    if (variant === "solid") return "bg-[#050505]";
    if (variant === "gradient") return cn("bg-[#050505] bg-gradient-to-br to-[#050505]", currentAccent.gradient);
    if (variant === "dual-tone") return cn("bg-gradient-to-br from-[#111] via-[#050505] to-[#111]", currentAccent.text);
    if (variant === "aurora") return `bg-[#050505] overflow-hidden before:absolute before:inset-0 before:opacity-30 before:bg-[radial-gradient(ellipse_at_top,${currentAccent.glow},transparent_70%)]`;
    
    // Fallback for grids/ornamentals that don't specify a base
    return "bg-[#050505]";
  };

  const renderGridAndOrnamental = () => {
    const variant = style.backgroundVariant;
    let gridLayer = null;
    let lightLayer = null;
    
    // Structural Grid
    if (variant === "premium-grid") 
      gridLayer = <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />;
    else if (variant === "fine-lines") 
      gridLayer = <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />;
    else if (variant === "tech-frame")
      gridLayer = <div className="absolute inset-4 border border-white/10 pointer-events-none before:absolute before:inset-2 before:border before:border-white/5" />;
    else if (variant === "blueprint")
      gridLayer = <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />;
    
    // Ornamental Light
    if (variant === "mesh")
      lightLayer = <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen" style={{ background: `radial-gradient(circle at 0% 0%, ${currentAccent.glow}, transparent 50%), radial-gradient(circle at 100% 100%, ${currentAccent.glow}, transparent 50%)` }} />;
    else if (variant === "radial")
      lightLayer = <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${currentAccent.glow}, transparent 70%)` }} />;
    else if (variant === "glass")
      lightLayer = <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none bg-gradient-to-t from-white/5 to-transparent backdrop-blur-[2px]" />;
    else if (variant === "noise")
      lightLayer = <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />;
      
    return (
      <>
        {gridLayer}
        {lightLayer}
      </>
    );
  };

  const getAvatarShape = () => {
    switch (style.avatarShape) {
      case "circle": return "rounded-full aspect-square";
      case "oval": return "rounded-[45%] aspect-[3/4]";
      case "rounded-xl": return "rounded-[2rem] aspect-square"; 
      case "rounded-2xl": return "rounded-full aspect-[1/2.5]"; // Pill
      default: return "rounded-full aspect-square";
    }
  };

  const getAvatarFrame = () => {
    // We read `avatarFrame` from style based on the editor's property name.
    const frame = style.avatarFrame || "none";
    switch (frame) {
      case "ring": return "ring-[6px] ring-white/10 ring-offset-4 ring-offset-transparent";
      case "glow": return `shadow-[0_0_40px_${currentAccent.strongGlow}] ring-1 ring-white/10`;
      case "editorial": return "border-l-[8px] border-b-[8px] border-white/20";
      case "badge": return "ring-4 ring-[#050505] shadow-[0_0_0_6px_rgba(255,255,255,0.1)]"; 
      case "glass": return "ring-1 ring-white/20 p-3 bg-white/5 backdrop-blur-2xl";
      case "signature": return "p-2.5 border-2 border-dashed border-white/30";
      default: return "shadow-2xl"; // Tanpa Frame
    }
  };

  return (
    <div className={cn(
      "w-full relative overflow-hidden transition-all duration-1000 min-h-[500px] flex flex-col justify-center",
      renderBackgroundBase()
    )}>
      {renderGridAndOrnamental()}

      {/* ── MAIN COMPOSITION ── */}
      <div className={cn(
        "relative z-10 flex w-full transition-all duration-700 mx-auto",
        isMobile ? "p-6 gap-8 max-w-[400px]" : 
        isTablet ? "p-10 gap-10 max-w-4xl" : "p-16 gap-16 max-w-7xl",
        containerLayout
      )}>
        
        {/* CLUSTER 1: IDENTITY (Avatar + Info) */}
        <div className={cn("flex flex-col shrink-0 transition-all duration-700", identityColWidth, identityAlign)}>
          
          {showAvatar && (
            <div className={cn("relative", isMobile ? "mb-5" : isTablet ? "mb-6" : "mb-8")}>
              {/* Wrapping Frame */}
              <div className={cn(
                "relative transition-all duration-700",
                getAvatarShape(),
                getAvatarFrame(),
                // Avatar Scale locked per breakpoint (moderately increased)
                isMobile ? "w-[100px]" : isTablet ? "w-[172px]" : "w-[236px]"
              )}>
                {/* Inner Image */}
                <div className={cn("absolute inset-0 overflow-hidden", getAvatarShape())}>
                  {content.avatarUrl ? (
                    <Image src={content.avatarUrl} alt="Avatar" fill className="object-cover" sizes="192px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900/50">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/10">No Photo</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* IDENTITY TEXT CLUSTER */}
          <div className={cn("flex flex-col gap-1.5 w-full", identityAlign)}>
            
            {showBadge && content.badgeText && (
              <div
                className={cn(
                  "w-full flex items-center gap-2",
                  isMobile || isCenter ? "justify-center" : "justify-center",
                  isMobile ? "mb-1.5" : isTablet ? "mb-2" : "mb-2.5"
                )}
              >
                <span
                  className={cn(
                    "font-black uppercase tracking-[0.18em]",
                    isMobile ? "text-[9px]" : isTablet ? "text-[11px]" : "text-[13px]",
                    currentAccent.text
                  )}
                >
                  {content.badgeText}
                </span>

                {showVerifiedInBadgeRow && (
                  <span className="inline-flex shrink-0 items-center justify-center leading-none">
                    <VerifiedIcon
                      className="w-[15px] h-[15px] drop-shadow-[0_0_10px_rgba(56,151,240,0.45)]"
                    />
                  </span>
                )}
              </div>
            )}
            
            {/* NAME ROW */}
            <div
              className={cn(
                "w-full flex justify-center",
                isMobile ? "max-w-[300px]" : isTablet ? "max-w-[420px]" : "max-w-[560px]"
              )}
            >
              <h1
                className={cn(
                  "min-w-0 max-w-full font-black flex items-center justify-center whitespace-nowrap tracking-tighter leading-none text-center",
                  isMobile ? "text-[1.15rem]" : isTablet ? "text-[1.5rem]" : "text-[2rem]",
                  isLightMode ? "text-black" : "text-white"
                )}
                title={content.name || "Nama Anda"}
              >
                <span className="min-w-0 whitespace-nowrap">
                  {content.name || "Nama Anda"}
                </span>

                {showVerifiedInNameRow && (
                  <span className="inline-flex shrink-0 ml-2 items-center justify-center leading-none">
                    <VerifiedIcon
                      className={cn(
                        "drop-shadow-[0_0_12px_rgba(56,151,240,0.5)]",
                        isTablet ? "w-[20px] h-[20px]" : "w-[24px] h-[24px]"
                      )}
                    />
                  </span>
                )}
              </h1>
            </div>

            {/* ROLE ROW (Premium Silver Gradient) */}
            {content.role && (
              <span className={cn(
                "w-full uppercase tracking-[0.2em] font-bold drop-shadow-sm",
                // Premium silver metallic styling
                isLightMode 
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-zinc-500 via-zinc-400 to-zinc-600" 
                  : "bg-clip-text text-transparent bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-400",
                !isMobile ? "truncate whitespace-nowrap" : "line-clamp-1",
                isMobile ? "text-[9.5px] mt-1" : isTablet ? "text-[11px] mt-1.5" : "text-[14px] mt-2"
              )}>
                {content.role}
              </span>
            )}
          </div>
        </div>

        {/* CLUSTER 2: MESSAGE (Headline + Description + CTA) */}
        <div className={cn(
          "flex flex-col transition-all duration-700 w-full",
          textColWidth, 
          textAlign
        )}>
          <h2 className={cn(
            "font-black leading-[1.08] tracking-tight w-full text-balance",
            isMobile ? "text-[1.8rem] mb-4" : isTablet ? "text-[2.4rem] mb-5" : "text-[3.6rem] mb-6",
            isLightMode ? "text-zinc-900" : "text-white"
          )}>
            {content.headline || "Headline yang memikat"}
          </h2>

          <p className={cn(
            "leading-relaxed text-balance opacity-80 w-full",
            isMobile ? "text-[0.85rem] mb-5" : isTablet ? "text-[0.95rem] mb-6" : "text-[1.1rem] mb-8 max-w-xl",
            isLightMode ? "text-zinc-600" : "text-white/50"
          )}>
            {content.description || "Jelaskan pesan utama Anda di sini dengan singkat."}
          </p>

          <div className={cn(
            "flex flex-wrap items-center w-full",
            isMobile ? "gap-2" : "gap-3",
            isCenter ? "justify-center" : isRight ? "justify-end" : "justify-start" 
          )}>
            <button className={cn(
              "rounded-xl font-black uppercase tracking-widest transition-all active:scale-95",
              isMobile ? "h-11 px-5 text-[10px]" : isTablet ? "h-12 px-6 text-xs" : "h-14 px-8 text-xs",
              getCtaClass("primary")
            )}>
              {content.primaryCta?.label || "Hubungi"}
            </button>
            
            {showSecCta && (
              <button className={cn(
                "rounded-xl font-black uppercase tracking-widest transition-all active:scale-95",
                isMobile ? "h-11 px-5 text-[10px]" : isTablet ? "h-12 px-6 text-xs" : "h-14 px-8 text-xs",
                getCtaClass("secondary")
              )}>
                {content.secondaryCta?.label || "Explore"}
              </button>
            )}
          </div>

          {showTrust && content.trustText && (
            <div className={cn(
              "flex items-center gap-2 opacity-40 italic truncate w-full",
              isMobile ? "mt-6 text-[9px]" : isTablet ? "mt-8 text-[10px]" : "mt-10 text-[11px]",
              isCenter ? "justify-center" : isRight ? "justify-end" : "justify-start"
            )}>
              <div className={cn("bg-current shrink-0", isMobile ? "w-4 h-[1px]" : "w-6 h-[1px]")} />
              <span className="truncate">{content.trustText}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
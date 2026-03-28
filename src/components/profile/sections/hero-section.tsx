import Image from "next/image";
import { ProfileData } from "../types/profile";
import { PrimaryButton } from "../ui/primary-button";

interface HeroSectionProps {
  profile: ProfileData;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative w-full pt-20 pb-24 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40 overflow-hidden">
      {/* Background Identity for Hero */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-b from-zinc-800/20 to-transparent blur-[120px] pointer-events-none opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-0"></div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-12 xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Text Content (Left Heavy) */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-start">
            <div className="mb-10 flex items-center gap-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-300"></span>
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">
                {profile.role}
              </span>
            </div>
            
            <h1 className="text-[3.5rem] leading-[1.05] tracking-[-0.02em] md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold text-white mb-8 max-w-[800px]">
              {profile.headline.split(' ').map((word, i) => (
                <span key={i} className={i === 0 ? "text-zinc-100" : "text-zinc-300"}>{word} </span>
              ))}
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 leading-[1.8] max-w-[500px] mb-12 font-normal">
              {profile.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <PrimaryButton href={profile.primaryCta.url} className="h-14 px-8 text-sm font-semibold rounded-none bg-white text-black hover:bg-zinc-200">
                {profile.primaryCta.label}
              </PrimaryButton>
            </div>
          </div>

          {/* Media Block (Right) - Cinematic Portrait */}
          <div className="order-1 lg:order-2 lg:col-span-5 w-full flex justify-end lg:justify-center relative">
            <div className="relative w-full max-w-[400px] aspect-[4/5] md:aspect-[3/4]">
              {/* Floating abstract accent behind image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-zinc-800/40 to-transparent border border-white/[0.05] rounded-sm transform rotate-3 scale-105 -z-10 transition-transform duration-700 hover:rotate-6"></div>
              
              <div className="relative w-full h-full bg-[#0A0A0A] overflow-hidden border border-white/[0.1] shadow-2xl">
                <Image
                  src={profile.heroImage}
                  alt={profile.name}
                  fill
                  priority
                  className="object-cover opacity-90 transition-all duration-1000 hover:scale-105 hover:opacity-100 mix-blend-luminosity"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80"></div>
              </div>

              {/* Minimalist Identity Marker */}
              <div className="absolute -bottom-8 -left-8 bg-[#050505] border border-white/[0.08] px-6 py-4 flex flex-col gap-1 shadow-2xl">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">Designer</span>
                <span className="text-base font-bold tracking-tight text-white">{profile.name}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

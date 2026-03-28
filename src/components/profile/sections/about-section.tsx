import { ProfileData } from "../types/profile";

interface AboutSectionProps {
  profile: ProfileData;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section className="relative w-full py-32 md:py-48 overflow-hidden bg-[#050505]">
      {/* Background Identity for About */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop')] opacity-[0.02] bg-cover bg-center mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]"></div>
      
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-3 flex flex-col items-start justify-start pt-2">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-4">
              Manifesto
            </h2>
            <div className="w-8 h-[1px] bg-zinc-700"></div>
          </div>
          
          <div className="lg:col-span-8 lg:col-start-4">
            <div className="relative">
              {/* Subtle quote mark */}
              <span className="absolute -top-12 -left-8 text-[8rem] leading-none font-serif text-white opacity-[0.03] select-none pointer-events-none">
                "
              </span>
              
              <div className="space-y-12">
                <p className="text-3xl md:text-4xl lg:text-5xl leading-[1.4] md:leading-[1.4] text-white font-medium tracking-tight">
                  {profile.about.split(' ').map((word, i) => (
                    <span key={i} className="text-zinc-400 hover:text-white transition-colors duration-500 cursor-default">
                      {word}{' '}
                    </span>
                  ))}
                </p>
                
                <div className="flex items-center gap-6 pt-8">
                  <div className="w-12 h-[1px] bg-white/[0.1]"></div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-zinc-300">
                    {profile.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

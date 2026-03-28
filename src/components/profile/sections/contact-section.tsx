import { ProfileData } from "../types/profile";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

interface ContactSectionProps {
  profile: ProfileData;
}

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden bg-[#030303]">
      {/* Background Identity for Contact */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-gradient-to-t from-zinc-800/20 to-transparent blur-[120px] pointer-events-none opacity-40"></div>
      
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Subtle availability badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              {profile.contactNote.availability}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            {profile.closingCta.heading}
          </h2>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-16 max-w-2xl font-medium leading-relaxed">
            {profile.closingCta.supportingText}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center">
            <Link 
              href={profile.closingCta.url} 
              className="group relative inline-flex h-16 items-center justify-center gap-3 bg-white px-10 text-base font-bold text-black transition-all hover:scale-105 rounded-none"
            >
              <span>{profile.closingCta.label}</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </Link>
            
            <a 
              href={`mailto:${profile.contactNote.email}`}
              className="inline-flex h-16 items-center justify-center gap-3 bg-transparent px-8 text-base font-bold text-white border border-white/[0.1] hover:bg-white/[0.05] transition-colors rounded-none"
            >
              <Mail className="w-5 h-5 text-zinc-400" strokeWidth={2} />
              <span>Email me</span>
            </a>
          </div>
        </div>

        {/* Minimalist Footer Info */}
        <div className="mt-32 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white tracking-tight">{profile.name}</span>
            <span className="text-zinc-600">—</span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">{profile.role}</span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">{profile.contactNote.location}</span>
          </div>
        </div>
        
      </div>
    </section>
  );
}

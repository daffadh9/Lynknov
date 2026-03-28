import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShowcaseOffer } from "../types/profile";

interface ShowcaseCardProps {
  offer: ShowcaseOffer;
}

export function ShowcaseCard({ offer }: ShowcaseCardProps) {
  return (
    <div className="group flex flex-col gap-5 w-full cursor-pointer">
      {/* Category Label Above */}
      <div className="flex items-center gap-3 pl-2">
        <div className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors duration-300"></div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
          {offer.type}
        </span>
      </div>

      {/* Visual Box with Stacked Layer Effect */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] z-10">
        {/* Decorative Stacked Layers Behind */}
        <div className="absolute inset-0 bg-[#1A1A1A] border border-white/[0.05] rounded-[2rem] transform translate-y-4 scale-[0.92] transition-transform duration-500 group-hover:translate-y-6 group-hover:scale-[0.88] -z-20"></div>
        <div className="absolute inset-0 bg-[#121212] border border-white/[0.08] rounded-[2rem] transform translate-y-2 scale-[0.96] transition-transform duration-500 group-hover:translate-y-3 group-hover:scale-[0.94] -z-10"></div>
        
        {/* Main Image Frame */}
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#0A0A0A] border border-white/[0.1] transition-colors duration-500 group-hover:border-white/[0.2]">
          <Image
            src={offer.imageUrl}
            alt={offer.title}
            fill
            className="object-cover opacity-80 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* Details & Reveal Below */}
      <div className="flex flex-col px-2">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 transition-transform duration-300 origin-left">
          {offer.title}
        </h3>
        
        {/* Accordion Reveal */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="overflow-hidden">
            <div className="pt-2 flex flex-col gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <p className="text-base text-zinc-400 leading-relaxed font-medium">
                {offer.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.1]">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Investment</span>
                  <span className="text-lg font-semibold text-white">{offer.pricing}</span>
                </div>
                
                <Link 
                  href={offer.link}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105"
                >
                  <span>{offer.ctaText}</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

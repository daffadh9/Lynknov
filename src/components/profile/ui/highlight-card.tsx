import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Highlight } from "../types/profile";

interface HighlightCardProps {
  highlight: Highlight;
  isFeatured?: boolean;
}

export function HighlightCard({ highlight, isFeatured = false }: HighlightCardProps) {
  return (
    <Link href={highlight.link} className="group block w-full">
      <div className="flex flex-col gap-6">
        <div 
          className={`relative w-full overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/[0.05] transition-colors duration-400 group-hover:border-white/[0.15] ${
            isFeatured ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={highlight.imageUrl}
            alt={highlight.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
        </div>
        
        <div className="flex flex-col gap-2 px-2">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold text-white ${isFeatured ? "text-2xl" : "text-xl"}`}>
              {highlight.title}
            </h3>
            <ArrowUpRight 
              className="w-5 h-5 text-[#A1A1AA] transition-all duration-400 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" 
              strokeWidth={1.5}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-white">
              {highlight.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="text-sm text-[#A1A1AA] truncate">
              {highlight.description}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

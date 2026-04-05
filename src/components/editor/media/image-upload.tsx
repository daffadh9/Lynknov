"use client";

import { useState } from "react";
import { Image as ImageIcon, Upload, Trash2, Plus, RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  recommendedSize?: string;
  shape?: "square" | "portrait" | "landscape" | "circle";
}

export function ImageUpload({ 
  value, 
  onChange, 
  label = "Gambar", 
  recommendedSize,
  shape = "square" 
}: ImageUploadProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleSimulateUpload = () => {
    const mockImages = [
      "/images/Foto Profile.jpg",
      "/images/storyboard-laptop.png",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop",
    ];
    const availableImages = mockImages.filter(img => img !== value);
    const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    onChange(randomImage);
  };

  const getShapeClasses = () => {
    switch (shape) {
      case "circle": return "aspect-square rounded-full";
      case "square": return "aspect-square rounded-2xl";
      case "portrait": return "aspect-[3/4] rounded-2xl";
      case "landscape": return "aspect-[16/9] rounded-2xl";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-baseline justify-between">
        <label className="text-[11px] font-bold text-white/70 tracking-wide uppercase">{label}</label>
        {recommendedSize && (
          <span className="text-[10px] text-white/30">{recommendedSize}</span>
        )}
      </div>
      
      {value ? (
        <div 
          className="relative group self-start"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Media Card */}
          <div className={cn(
            "relative border border-white/10 bg-[#0B0B0D] overflow-hidden transition-all duration-500 w-32 shadow-2xl ring-1 ring-white/5",
            getShapeClasses(),
            isHovered && "ring-emerald-500/30 scale-[1.02]"
          )}>
            <Image 
              src={value} 
              alt="Avatar" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="128px"
            />
            
            {/* Elegant Hover Overlay */}
            <div className={cn(
              "absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 transition-all duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <button 
                onClick={handleSimulateUpload}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all transform hover:scale-110 active:scale-95"
                title="Ganti Foto"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onChange("")}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all transform hover:scale-110 active:scale-95"
                title="Hapus Foto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div 
          onClick={handleSimulateUpload}
          className={cn(
            "relative flex flex-col items-center justify-center gap-3 w-32 border border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all cursor-pointer group",
            getShapeClasses()
          )}
        >
          <div className="h-10 w-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-500">
            <Plus className="w-5 h-5 text-white/20 group-hover:text-emerald-400 transition-colors" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-emerald-400/50 transition-colors">Pilih</span>
        </div>
      )}
    </div>
  );
}
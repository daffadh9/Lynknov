"use client";

import { useState } from "react";
import { Image as ImageIcon, Upload, X, Library } from "lucide-react";
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

  // For MVP, we'll simulate an upload by picking from a predefined set of assets
  // In a real app, this would trigger an actual file upload to Supabase Storage
  const handleSimulateUpload = () => {
    const mockImages = [
      "/images/Foto Profile.jpg",
      "/images/storyboard-laptop.png",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop",
    ];
    
    // Pick a random image from the mock list that isn't the current one
    const availableImages = mockImages.filter(img => img !== value);
    const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    
    onChange(randomImage);
  };

  const getShapeClasses = () => {
    switch (shape) {
      case "circle": return "aspect-square rounded-full";
      case "square": return "aspect-square rounded-xl";
      case "portrait": return "aspect-[3/4] rounded-xl";
      case "landscape": return "aspect-[16/9] rounded-xl";
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-medium text-white/70">{label}</label>
      
      {value ? (
        <div 
          className={cn(
            "relative border border-white/10 bg-[#111] overflow-hidden group transition-all w-32",
            getShapeClasses()
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image 
            src={value} 
            alt="Uploaded asset" 
            fill 
            className="object-cover"
            sizes="128px"
          />
          
          <div className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <button 
              onClick={handleSimulateUpload}
              className="text-[10px] font-medium text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-3 h-3" /> Ganti
            </button>
            <button 
              onClick={() => onChange("")}
              className="text-[10px] font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
            >
              <X className="w-3 h-3" /> Hapus
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <div 
            className={cn(
              "border border-white/10 border-dashed bg-white/[0.02] flex flex-col items-center justify-center gap-2 text-white/40 hover:text-white/60 hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer w-32",
              getShapeClasses()
            )}
            onClick={handleSimulateUpload}
          >
            <ImageIcon className="w-6 h-6" />
            <span className="text-[10px] font-medium">Kosong</span>
          </div>
          
          <div className="flex flex-col justify-center gap-2 flex-1">
            <button 
              onClick={handleSimulateUpload}
              className="h-8 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-white transition-colors flex items-center justify-center gap-2"
            >
              <Upload className="w-3.5 h-3.5" /> Upload Gambar
            </button>
            <button 
              onClick={handleSimulateUpload}
              className="h-8 px-4 rounded-lg bg-transparent hover:bg-white/5 border border-white/5 text-xs font-medium text-white/70 transition-colors flex items-center justify-center gap-2"
            >
              <Library className="w-3.5 h-3.5" /> Pilih dari Aset
            </button>
          </div>
        </div>
      )}
      
      {recommendedSize && (
        <p className="text-[10px] text-white/40 mt-1">Rekomendasi: {recommendedSize}</p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { AssetPickerModal } from "./AssetPickerModal";
import type { AssetCategory, UserAsset } from "@/types/assets";

interface SectionAssetFieldProps {
  label: string;
  description?: string;
  valueUrl?: string;
  valueAssetId?: string;
  onChange: (url: string, assetId: string) => void;
  defaultCategory?: AssetCategory;
  allowedKinds?: ("image" | "audio" | "embed")[];
}

export function SectionAssetField({
  label,
  description,
  valueUrl,
  valueAssetId,
  onChange,
  defaultCategory,
  allowedKinds = ["image"],
}: SectionAssetFieldProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleSelectAsset = (asset: UserAsset) => {
    if (asset.public_url) {
      onChange(asset.public_url, asset.id);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <p className="text-[11px] font-semibold text-white/70">{label}</p>
        {description && (
          <p className="mt-0.5 text-[10px] text-white/30">{description}</p>
        )}
      </div>

      <div 
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.02] transition-all hover:border-emerald-500/50 hover:bg-white/[0.04]",
          valueUrl ? "aspect-video" : "h-24"
        )}
        onClick={() => setIsPickerOpen(true)}
      >
        {valueUrl ? (
          <>
            <img 
              src={valueUrl} 
              alt="Asset preview" 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100">
              <span className="rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white">Ganti Aset</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-white/20 transition-colors group-hover:text-emerald-400">
            <ImageIcon className="h-6 w-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Pilih Aset</span>
          </div>
        )}
      </div>

      <AssetPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleSelectAsset}
        defaultCategory={defaultCategory}
        allowedKinds={allowedKinds}
      />
    </div>
  );
}

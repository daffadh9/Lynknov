"use client";

import { useEffect, useState } from "react";
import { X, Search, UploadCloud, Folder, Link as LinkIcon, Music, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { fetchAssets } from "@/features/assets/actions";
import type { AssetCategory, UserAsset } from "@/types/assets";

interface AssetPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (asset: UserAsset) => void;
  defaultCategory?: AssetCategory;
  allowedKinds?: ("image" | "audio" | "embed")[];
}

export function AssetPickerModal({
  isOpen,
  onClose,
  onSelect,
  defaultCategory,
  allowedKinds = ["image"],
}: AssetPickerModalProps) {
  const [assets, setAssets] = useState<UserAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"library" | "upload" | "embed">("library");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isOpen && activeTab === "library") {
      const timeoutId = setTimeout(() => {
        loadAssets();
      }, 300); // debounce search
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, activeTab, search]);

  const loadAssets = async () => {
    setIsLoading(true);
    // Don't pass defaultCategory to server to avoid hard filtering
    const res = await fetchAssets({ 
      search 
    });
    if (res.data) {
      // Sort by category match first, then by date (date is already sorted by server)
      const filtered = res.data.filter(a => allowedKinds.includes(a.asset_kind));
      if (defaultCategory) {
        filtered.sort((a, b) => {
          if (a.asset_category === defaultCategory && b.asset_category !== defaultCategory) return -1;
          if (a.asset_category !== defaultCategory && b.asset_category === defaultCategory) return 1;
          return 0;
        });
      }
      setAssets(filtered);
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative flex h-full max-h-[600px] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0A0A0C] shadow-2xl shadow-black/50">
        
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.04] px-6 py-4">
          <h2 className="text-[14px] font-bold text-white/90">Pilih Aset</h2>
          <button 
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.02] text-white/40 transition-all hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 gap-6 border-b border-white/[0.04] px-6">
          {(["library", "upload", "embed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative pb-3 pt-4 text-[12px] font-bold capitalize tracking-wider transition-colors",
                activeTab === tab ? "text-emerald-400" : "text-white/40 hover:text-white/70"
              )}
            >
              {tab === "library" ? "Library" : tab === "upload" ? "Upload Baru" : "Embed URL"}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-[#060709] relative">
          {activeTab === "library" && (
            <div className="flex h-full flex-col">
              {/* Toolbar */}
              <div className="flex shrink-0 items-center justify-between p-4 border-b border-white/[0.02]">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/20" />
                  <input
                    type="text"
                    placeholder="Cari..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-9 w-full rounded-lg bg-white/[0.02] pl-9 pr-3 text-[12px] text-white/80 ring-1 ring-inset ring-white/[0.05] transition-all placeholder:text-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-white/[0.15]"
                  />
                </div>
              </div>

              {/* Grid */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <span className="flex items-center gap-3 text-[12px] font-medium text-white/40">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-white/40" />
                      Memuat aset...
                    </span>
                  </div>
                ) : assets.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <ImageIcon className="h-8 w-8 text-white/20 mb-4" />
                    <p className="text-[12px] text-white/40">Tidak ada aset ditemukan.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
                    {assets.map((asset) => (
                      <button
                        key={asset.id}
                        onClick={() => {
                          onSelect(asset);
                          onClose();
                        }}
                        className="group relative flex aspect-square flex-col overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.02] text-left transition-all hover:border-emerald-500/50 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] active:scale-95"
                      >
                        <div className="relative flex-1 bg-[#0A0A0C] overflow-hidden w-full p-2 flex items-center justify-center">
                          {/* Checkerboard Pattern for transparent images */}
                          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)", backgroundPosition: "0 0, 10px 10px", backgroundSize: "20px 20px" }} />
                          
                          {asset.asset_kind === "image" && asset.public_url ? (
                            <img 
                              src={asset.public_url} 
                              alt={asset.name}
                              className="relative z-10 max-h-full max-w-full rounded object-contain transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : asset.asset_kind === "audio" ? (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5">
                              <Music className="h-8 w-8 text-violet-400/50" />
                            </div>
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <LinkIcon className="h-8 w-8 text-white/20" />
                            </div>
                          )}
                        </div>
                        <div className="flex h-10 w-full shrink-0 items-center px-3 border-t border-white/[0.02]">
                          <p className="truncate text-[10px] font-semibold text-white/70">{asset.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "upload" && (
            <div className="flex h-full flex-col items-center justify-center p-8">
              <div className="flex flex-col items-center gap-4 text-center max-w-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
                  <UploadCloud className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-[14px] font-bold text-white/90">Upload Aset Baru</h3>
                <p className="text-[12px] text-white/40">
                  Fitur upload langsung dari picker akan segera hadir. Silakan gunakan tab Unggahan di menu utama untuk saat ini.
                </p>
                <button 
                  onClick={() => setActiveTab("library")}
                  className="mt-4 rounded-lg bg-white/[0.05] px-4 py-2 text-[12px] font-bold text-white hover:bg-white/[0.1]"
                >
                  Kembali ke Library
                </button>
              </div>
            </div>
          )}

          {activeTab === "embed" && (
            <div className="flex h-full flex-col items-center justify-center p-8">
              <div className="flex flex-col items-center gap-4 text-center max-w-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20">
                  <LinkIcon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-[14px] font-bold text-white/90">Embed Aset</h3>
                <p className="text-[12px] text-white/40">
                  Fitur embed dari YouTube/Spotify akan segera hadir.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
import { UploadCloud, Image as ImageIcon, Music, Link as LinkIcon, FolderPlus, Search, AlertCircle, X, Check, Eye, Cloud, FileText, LayoutTemplate, Type } from "lucide-react";
import { cn } from "@/lib/cn";
import { useDropzone } from "react-dropzone";
import { ASSET_CONSTANTS } from "@/lib/assets/validators";
import { uploadAssetClient } from "@/features/assets/client-actions";
import { AssetDetailDialog } from "./AssetDetailDialog";
import type { AssetCategory, AssetFilter, AssetFolder, UserAsset } from "@/types/assets";

interface AssetCenterPanelProps {
  assets: UserAsset[];
  folders: AssetFolder[];
  filter: AssetFilter;
  onFilterChange: (filter: AssetFilter) => void;
  onUploadSuccess: (asset: UserAsset) => void;
  onDeleteAsset: (assetId: string) => void;
  isLoading?: boolean;
}

export function AssetCenterPanel({
  assets,
  folders,
  filter,
  onFilterChange,
  onUploadSuccess,
  onDeleteAsset,
  isLoading = false,
}: AssetCenterPanelProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<UserAsset | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setIsUploading(true);
    setUploadError(null);
    
    try {
      const file = acceptedFiles[0];
      const res = await uploadAssetClient({
        file,
        asset_category: "other",
      });
      
      if (res.error) {
        setUploadError(res.error);
      } else if (res.data) {
        onUploadSuccess(res.data);
      }
    } catch (err: any) {
      setUploadError(err.message || "Terjadi kesalahan saat mengunggah file.");
    } finally {
      setIsUploading(false);
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ASSET_CONSTANTS.ALLOWED_IMAGE_TYPES,
      'audio/*': ASSET_CONSTANTS.ALLOWED_AUDIO_TYPES,
    },
    maxSize: Math.max(ASSET_CONSTANTS.MAX_FILE_SIZE_IMAGE, ASSET_CONSTANTS.MAX_FILE_SIZE_AUDIO),
    multiple: false,
  });

  return (
    <div className="flex flex-1 flex-col h-full bg-[#0A0A0C]">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-white/[0.04] px-6 py-5">
        <h2 className="text-[14px] font-bold tracking-tight text-white/90">Unggahan</h2>
        <p className="text-[12px] text-white/40">Kelola gambar, audio, dan aset terhubung untuk halaman Anda.</p>
        
        {/* Stats Strip */}
        <div className="mt-4 flex items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Total Aset</span>
            <span className="text-[16px] font-bold text-white/90">{assets.length}</span>
          </div>
          <div className="h-8 w-px bg-white/[0.04]" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Folder</span>
            <span className="text-[16px] font-bold text-white/90">{folders.length}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left Filter Rail */}
        <div className="w-[200px] shrink-0 border-r border-white/[0.04] bg-[#060709] p-4 hidden md:block overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-2">Tipe File</h3>
              <div className="space-y-1">
                <button className="flex w-full items-center justify-between rounded-lg bg-emerald-500/10 px-2 py-1.5 text-[11px] font-bold text-emerald-400">
                  <span className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Semua
                  </span>
                  <span>{assets.length}</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-[11px] font-medium text-white/50 hover:bg-white/[0.02] hover:text-white/80">
                  <span className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Gambar
                  </span>
                  <span>{assets.filter(a => a.asset_kind === 'image').length}</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-[11px] font-medium text-white/50 hover:bg-white/[0.02] hover:text-white/80">
                  <span className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    Audio
                  </span>
                  <span>{assets.filter(a => a.asset_kind === 'audio').length}</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-2">Status Penggunaan</h3>
              <div className="space-y-1">
                <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-[11px] font-medium text-white/50 hover:bg-white/[0.02] hover:text-white/80">
                  <span className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    Sedang dipakai
                  </span>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-[11px] font-medium text-white/50 hover:bg-white/[0.02] hover:text-white/80">
                  <span className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full border border-current" />
                    Belum dipakai
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Asset Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Actions & Filters Bar */}
          <div className="px-6 py-4 flex items-center justify-between gap-4 border-b border-white/[0.02] bg-[#0A0A0C]">
            <div className="flex items-center gap-2">
              <div {...getRootProps()} className="relative">
                <input {...getInputProps()} />
                <button 
                  disabled={isUploading}
                  className={cn(
                    "inline-flex h-9 items-center gap-2 rounded-lg px-4 text-[12px] font-bold transition-all",
                    isUploading 
                      ? "bg-white/[0.05] text-white/30 cursor-not-allowed"
                      : "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:bg-emerald-400 active:scale-95"
                  )}
                >
                  {isUploading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                      Mengunggah...
                    </span>
                  ) : (
                    <>
                      <UploadCloud className="h-4 w-4" />
                      Upload File
                    </>
                  )}
                </button>
              </div>
              
              <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-white/[0.03] px-3 text-[12px] font-semibold text-white/60 ring-1 ring-inset ring-white/[0.05] transition-all hover:bg-white/[0.06] hover:text-white">
                <FolderPlus className="h-3.5 w-3.5" />
                Folder Baru
              </button>
              
              <div className="h-4 w-px bg-white/[0.1] mx-1" />
              
              <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-white/[0.03] px-3 text-[12px] font-semibold text-white/60 ring-1 ring-inset ring-white/[0.05] transition-all hover:bg-white/[0.06] hover:text-white">
                <Cloud className="h-3.5 w-3.5 text-blue-400/80" />
                Google Drive
              </button>
              <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-white/[0.03] px-3 text-[12px] font-semibold text-white/60 ring-1 ring-inset ring-white/[0.05] transition-all hover:bg-white/[0.06] hover:text-white">
                <LinkIcon className="h-3.5 w-3.5" />
                Embed
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg bg-white/[0.02] p-1 ring-1 ring-inset ring-white/[0.05]">
                <button className="rounded-md bg-white/[0.06] px-2.5 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all">Grid</button>
                <button className="rounded-md px-2.5 py-1.5 text-[11px] font-medium text-white/40 transition-all hover:text-white/80">List</button>
              </div>
              <div className="h-4 w-px bg-white/[0.1]" />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/20" />
                <input
                  type="text"
                  placeholder="Cari aset (nama, tipe)..."
                  value={filter.search || ""}
                  onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
                  className="h-9 w-56 rounded-lg bg-white/[0.02] pl-9 pr-3 text-[12px] text-white/80 ring-1 ring-inset ring-white/[0.05] transition-all placeholder:text-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-white/[0.15]"
                />
              </div>
            </div>
          </div>

        {/* Upload Error Banner */}
        {uploadError && (
          <div className="mx-6 mt-4 flex items-start gap-3 rounded-lg bg-red-500/10 p-3 ring-1 ring-inset ring-red-500/20">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <div className="flex-1 text-[12px] text-red-200">{uploadError}</div>
            <button onClick={() => setUploadError(null)} className="text-red-400/50 hover:text-red-400 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Grid Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 relative">
          {/* Drag Overlay */}
          {isDragActive && (
            <div className="absolute inset-4 z-50 flex items-center justify-center rounded-2xl border-2 border-dashed border-emerald-500/50 bg-emerald-500/5 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3 text-emerald-400">
                <UploadCloud className="h-10 w-10 animate-bounce" />
                <p className="text-[14px] font-bold">Lepaskan file untuk mengunggah</p>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <span className="flex items-center gap-3 text-[12px] font-medium text-white/40">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-white/40" />
                Memuat aset...
              </span>
            </div>
          ) : assets.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/[0.02] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] ring-1 ring-white/[0.05]">
                <ImageIcon className="h-8 w-8 text-white/20" />
              </div>
              <h3 className="text-[14px] font-bold text-white/90">Belum ada aset</h3>
              <p className="mt-2 max-w-xs text-[12px] text-white/40 leading-relaxed">
                Upload gambar, audio, atau impor dari Google Drive untuk mulai mengisi halaman Anda.
              </p>
              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => {
                    const el = document.querySelector('input[type="file"]') as HTMLInputElement;
                    el?.click();
                  }}
                  className="rounded-lg bg-emerald-500 px-5 py-2.5 text-[12px] font-bold text-black shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all hover:bg-emerald-400 active:scale-95 flex items-center gap-2"
                >
                  <UploadCloud className="h-4 w-4" />
                  Upload File Pertama
                </button>
                <button className="rounded-lg bg-white/[0.05] px-5 py-2.5 text-[12px] font-bold text-white transition-all hover:bg-white/[0.1] active:scale-95 flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-blue-400/80" />
                  Google Drive
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {assets.map((asset) => (
                <AssetCard 
                  key={asset.id} 
                  asset={asset} 
                  onDelete={() => onDeleteAsset(asset.id)} 
                  onDetail={() => setSelectedAsset(asset)}
                />
              ))}
            </div>
          )}
          </div>
        </div>
      </div>
      <AssetDetailDialog
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        asset={selectedAsset}
        onDelete={(id) => {
          onDeleteAsset(id);
          setSelectedAsset(null);
        }}
      />
    </div>
  );
}

function AssetCard({ asset, onDelete, onDetail }: { asset: UserAsset; onDelete: () => void; onDetail: () => void }) {
  const isImage = asset.asset_kind === "image";
  const isAudio = asset.asset_kind === "audio";

  const renderThumbnail = () => {
    // Checkerboard Pattern for transparent images
    const checkerPattern = "repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)";
    
    if (isImage && asset.public_url) {
      return (
        <div className="relative flex h-full w-full items-center justify-center p-2">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: checkerPattern, backgroundPosition: "0 0, 10px 10px", backgroundSize: "20px 20px" }} />
          <img 
            src={asset.public_url} 
            alt={asset.name}
            className="relative z-10 max-h-full max-w-full rounded object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      );
    }
    
    if (isAudio) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 group-hover:from-violet-500/20 group-hover:to-fuchsia-500/10 transition-colors">
          <Music className="h-8 w-8 text-violet-400/50" />
        </div>
      );
    }

    // Embed/Link Placeholder
    if (asset.asset_kind === "embed") {
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/10 to-sky-500/5 group-hover:from-blue-500/20 group-hover:to-sky-500/10 transition-colors">
          <LinkIcon className="h-8 w-8 text-blue-400/50" />
        </div>
      );
    }
    
    // Default/Document Placeholder
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500/5 to-teal-500/5 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-colors">
        <FileText className="h-8 w-8 text-emerald-400/30" />
      </div>
    );
  };

  return (
    <div 
      className="group relative flex aspect-square flex-col overflow-hidden rounded-xl border border-white/[0.04] bg-[#0A0A0C] transition-all hover:border-emerald-500/50 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] cursor-pointer"
      onClick={onDetail}
    >
      {/* Thumbnail Area */}
      <div className="relative flex-1 overflow-hidden flex items-center justify-center">
        {renderThumbnail()}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex gap-2">
            <button 
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-bold text-black transition-all hover:bg-emerald-400 active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              onClick={(e) => { e.stopPropagation(); onDetail(); }}
            >
              <Eye className="h-3.5 w-3.5" />
              Detail
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/20 text-red-300 transition-all hover:bg-red-500/40 active:scale-95 ring-1 ring-inset ring-red-500/20"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex h-14 shrink-0 items-center justify-between px-3 border-t border-white/[0.04] bg-white/[0.01]">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-bold text-white/90">{asset.name}</p>
          <div className="mt-1 flex items-center gap-2 text-[9px] font-medium text-white/40">
            <span className="uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.05]">{asset.asset_category}</span>
            {asset.file_size && (
              <>
                <span>•</span>
                <span>{(asset.file_size / 1024 / 1024).toFixed(1)} MB</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

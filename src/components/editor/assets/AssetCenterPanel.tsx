"use client";

import { useCallback, useState } from "react";
import { UploadCloud, Image as ImageIcon, Music, Link as LinkIcon, FolderPlus, Search, AlertCircle, X, Check, Eye, Cloud, FileText, LayoutGrid, LayoutList, Plus } from "lucide-react";
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
      'image/*': [],
      'audio/*': [],
    },
    maxSize: Math.max(ASSET_CONSTANTS.MAX_FILE_SIZE_IMAGE, ASSET_CONSTANTS.MAX_FILE_SIZE_AUDIO),
    multiple: false,
  });

  return (
    <div className="relative flex flex-1 flex-col h-full bg-[#050507] overflow-hidden">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay" />
      </div>

      {/* Hero Header Area */}
      <div className="relative z-10 flex flex-col gap-6 border-b border-white/[0.04] bg-[#0A0A0C]/80 px-8 py-8 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20">
                <ImageIcon className="h-4 w-4 text-emerald-400" />
              </div>
              <h2 className="text-[20px] font-black tracking-tight text-white">Asset Library</h2>
            </div>
            <p className="text-[13px] text-white/50 leading-relaxed">
              Kelola visual, audio, dokumen, dan aset terhubung dalam satu workspace kreatif yang siap dipakai di seluruh sistem Lynknov.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/[0.03] px-4 text-[12px] font-bold text-white transition-all hover:bg-white/[0.08] ring-1 ring-inset ring-white/[0.05]">
              <FolderPlus className="h-4 w-4 text-white/40" />
              Folder Baru
            </button>
            <div {...getRootProps()} className="relative">
              <input {...getInputProps()} />
              <button 
                disabled={isUploading}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-xl px-5 text-[12px] font-bold transition-all",
                  isUploading 
                    ? "bg-white/[0.05] text-white/30 cursor-not-allowed"
                    : "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-95"
                )}
              >
                {isUploading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                    Mengunggah...
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-4 w-4" />
                    Upload File
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Premium Stat Cards */}
        <div className="flex items-center gap-4">
          <div className="flex w-40 flex-col gap-1.5 rounded-xl bg-white/[0.02] p-4 ring-1 ring-inset ring-white/[0.04]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Total Asset</span>
            <div className="flex items-end gap-2">
              <span className="text-[24px] font-black leading-none text-white/90">{assets.length}</span>
              <span className="mb-1 text-[11px] font-medium text-emerald-400">Ready</span>
            </div>
          </div>
          <div className="flex w-40 flex-col gap-1.5 rounded-xl bg-white/[0.02] p-4 ring-1 ring-inset ring-white/[0.04]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Sedang Dipakai</span>
            <div className="flex items-end gap-2">
              <span className="text-[24px] font-black leading-none text-white/90">0</span>
              <span className="mb-1 text-[11px] font-medium text-blue-400">Assets</span>
            </div>
          </div>
          <div className="flex w-40 flex-col gap-1.5 rounded-xl bg-white/[0.02] p-4 ring-1 ring-inset ring-white/[0.04]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Folder</span>
            <div className="flex items-end gap-2">
              <span className="text-[24px] font-black leading-none text-white/90">{folders.length}</span>
              <span className="mb-1 text-[11px] font-medium text-white/40">Groups</span>
            </div>
          </div>
          <div className="flex w-40 flex-col gap-1.5 rounded-xl bg-white/[0.02] p-4 ring-1 ring-inset ring-white/[0.04]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Storage Used</span>
            <div className="flex items-end gap-2">
              <span className="text-[24px] font-black leading-none text-white/90">
                {(assets.reduce((acc, asset) => acc + (asset.file_size || 0), 0) / 1024 / 1024).toFixed(1)}
              </span>
              <span className="mb-1 text-[11px] font-medium text-white/40">MB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Filter Rail (Left) */}
        <div className="w-[240px] shrink-0 border-r border-white/[0.04] bg-[#0A0A0C]/50 p-5 hidden md:block overflow-y-auto custom-scrollbar backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40">Library Filters</h3>
            <button className="text-[10px] font-bold text-white/20 hover:text-white/60 transition-colors">Reset</button>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/30 px-2">Tipe File</h4>
              <div className="space-y-1">
                <button className="group flex w-full items-center justify-between rounded-xl bg-emerald-500/10 px-3 py-2.5 text-[12px] font-bold text-emerald-400 ring-1 ring-inset ring-emerald-500/20 transition-all">
                  <span className="flex items-center gap-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    Semua
                  </span>
                  <span className="rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-black">{assets.length}</span>
                </button>
                <button className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[12px] font-medium text-white/50 transition-all hover:bg-white/[0.03] hover:text-white/90">
                  <span className="flex items-center gap-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                    Gambar
                  </span>
                  <span className="text-[10px] font-bold text-white/20 group-hover:text-white/40">{assets.filter(a => a.asset_kind === 'image').length}</span>
                </button>
                <button className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[12px] font-medium text-white/50 transition-all hover:bg-white/[0.03] hover:text-white/90">
                  <span className="flex items-center gap-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                    Audio
                  </span>
                  <span className="text-[10px] font-bold text-white/20 group-hover:text-white/40">{assets.filter(a => a.asset_kind === 'audio').length}</span>
                </button>
                <button className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[12px] font-medium text-white/50 transition-all hover:bg-white/[0.03] hover:text-white/90">
                  <span className="flex items-center gap-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                    Dokumen
                  </span>
                  <span className="text-[10px] font-bold text-white/20 group-hover:text-white/40">0</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/30 px-2">Status Penggunaan</h4>
              <div className="space-y-1">
                <button className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[12px] font-medium text-white/50 transition-all hover:bg-white/[0.03] hover:text-white/90">
                  <span className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 text-white/30 group-hover:text-white/70 transition-colors" />
                    Sedang dipakai
                  </span>
                </button>
                <button className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[12px] font-medium text-white/50 transition-all hover:bg-white/[0.03] hover:text-white/90">
                  <span className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full border border-white/20 group-hover:border-white/50 transition-colors" />
                    Belum dipakai
                  </span>
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/30 px-2">Tags</h4>
              <div className="flex flex-wrap gap-2 px-2">
                {['Hero', 'Cover', 'Avatar', 'Product', 'Icon'].map(tag => (
                  <button key={tag} className="rounded-lg bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-medium text-white/50 ring-1 ring-inset ring-white/[0.05] transition-all hover:bg-white/[0.08] hover:text-white/90">
                    {tag}
                  </button>
                ))}
                <button className="flex items-center justify-center rounded-lg border border-dashed border-white/10 px-2.5 py-1.5 text-[11px] font-medium text-white/30 hover:border-white/30 hover:text-white/70 transition-all">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center Browser Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-transparent">
          {/* Segmented Command Dock */}
          <div className="px-8 py-5 flex items-center justify-between gap-6 border-b border-white/[0.02] bg-[#0A0A0C]/40 backdrop-blur-md">
            
            {/* Left: Sources/Integrations */}
            <div className="flex items-center gap-2">
              <button className="inline-flex h-10 items-center gap-2.5 rounded-xl bg-white/[0.03] px-4 text-[12px] font-bold text-white/70 ring-1 ring-inset ring-white/[0.06] transition-all hover:bg-white/[0.08] hover:text-white">
                <svg viewBox="0 0 87.3 78" className="h-4 w-4">
                  <path d="M58.06 63.82L20.89 63.82L2.31 31.91L20.89 0L58.06 0L76.65 31.91L58.06 63.82Z" fill="#1fa463" />
                  <path d="M58.06 0L20.89 0L2.31 31.91L20.89 63.82L58.06 63.82L76.65 31.91L58.06 0Z" fill="#000000" fillOpacity="0.2" />
                  <path d="M58.06 0L20.89 0L2.31 31.91L20.89 63.82L58.06 63.82L76.65 31.91L58.06 0Z" fill="#ffffff" fillOpacity="0.2" />
                  <path d="M20.89 63.82L2.31 31.91L20.89 0L20.89 63.82Z" fill="#000000" fillOpacity="0.2" />
                  <path d="M58.06 63.82L76.65 31.91L58.06 0L58.06 63.82Z" fill="#ffffff" fillOpacity="0.2" />
                  <path d="M20.89 0L58.06 0L76.65 31.91L58.06 63.82L20.89 63.82L2.31 31.91L20.89 0Z" fill="#FFC107" />
                  <path d="M29.5 14L58.06 63.82L20.89 63.82L2.31 31.91L29.5 14Z" fill="#1fa463" />
                  <path d="M85 46L58.06 0L20.89 0L49.5 50L85 46Z" fill="#03a9f4" />
                </svg>
                Google Drive
              </button>
              <button className="inline-flex h-10 items-center gap-2.5 rounded-xl bg-white/[0.03] px-4 text-[12px] font-bold text-white/70 ring-1 ring-inset ring-white/[0.06] transition-all hover:bg-white/[0.08] hover:text-white">
                <LinkIcon className="h-4 w-4 text-blue-400" />
                Embed URL
              </button>
            </div>

            {/* Center: Search (Dominant) */}
            <div className="flex-1 max-w-md relative group">
              <div className="absolute inset-0 bg-white/[0.03] rounded-xl ring-1 ring-inset ring-white/[0.06] group-focus-within:bg-white/[0.06] group-focus-within:ring-emerald-500/30 transition-all" />
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                placeholder="Cari aset berdasarkan nama, tag, atau format..."
                value={filter.search || ""}
                onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
                className="relative h-10 w-full bg-transparent pl-11 pr-4 text-[13px] font-medium text-white placeholder:text-white/30 focus:outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="hidden sm:inline-flex h-5 items-center justify-center rounded border border-white/10 bg-white/5 px-1.5 text-[10px] font-medium text-white/40">⌘</kbd>
                <kbd className="hidden sm:inline-flex h-5 items-center justify-center rounded border border-white/10 bg-white/5 px-1.5 text-[10px] font-medium text-white/40">K</kbd>
              </div>
            </div>

            {/* Right: View Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-xl bg-white/[0.03] p-1 ring-1 ring-inset ring-white/[0.06]">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.08] text-white shadow-sm ring-1 ring-black/20 transition-all">
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:text-white/80 transition-all">
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
              <div className="h-5 w-px bg-white/[0.1]" />
              <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/[0.03] px-4 text-[12px] font-bold text-white/70 ring-1 ring-inset ring-white/[0.06] transition-all hover:bg-white/[0.08] hover:text-white">
                Urutkan
              </button>
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
              <div className="flex flex-col items-center gap-4">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-emerald-500" />
                <span className="text-[12px] font-bold tracking-widest uppercase text-white/30">
                  Memuat Library...
                </span>
              </div>
            </div>
          ) : assets.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center px-4">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/[0.02] shadow-[inset_0_0_30px_rgba(255,255,255,0.02)] ring-1 ring-white/[0.05] relative">
                <div className="absolute inset-0 rounded-full border border-emerald-500/20 blur-sm" />
                <ImageIcon className="h-10 w-10 text-white/20" />
              </div>
              <h3 className="text-[18px] font-black text-white">Mulai bangun library aset Anda</h3>
              <p className="mt-3 max-w-sm text-[13px] text-white/40 leading-relaxed">
                Upload gambar, video, audio, dokumen, atau hubungkan sumber eksternal untuk mulai mengisi seluruh workspace Lynknov.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <button 
                  onClick={() => {
                    const el = document.querySelector('input[type="file"]') as HTMLInputElement;
                    el?.click();
                  }}
                  className="rounded-xl bg-emerald-500 px-6 py-3 text-[13px] font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-95 flex items-center gap-2"
                >
                  <UploadCloud className="h-4 w-4" />
                  Upload Aset Pertama
                </button>
                <button className="rounded-xl bg-white/[0.03] px-6 py-3 text-[13px] font-bold text-white transition-all hover:bg-white/[0.08] active:scale-95 flex items-center gap-2 ring-1 ring-inset ring-white/[0.05]">
                  <svg viewBox="0 0 87.3 78" className="h-4 w-4">
                    <path d="M58.06 63.82L20.89 63.82L2.31 31.91L20.89 0L58.06 0L76.65 31.91L58.06 63.82Z" fill="#1fa463" />
                    <path d="M58.06 0L20.89 0L2.31 31.91L20.89 63.82L58.06 63.82L76.65 31.91L58.06 0Z" fill="#000000" fillOpacity="0.2" />
                    <path d="M58.06 0L20.89 0L2.31 31.91L20.89 63.82L58.06 63.82L76.65 31.91L58.06 0Z" fill="#ffffff" fillOpacity="0.2" />
                    <path d="M20.89 63.82L2.31 31.91L20.89 0L20.89 63.82Z" fill="#000000" fillOpacity="0.2" />
                    <path d="M58.06 63.82L76.65 31.91L58.06 0L58.06 63.82Z" fill="#ffffff" fillOpacity="0.2" />
                    <path d="M20.89 0L58.06 0L76.65 31.91L58.06 63.82L20.89 63.82L2.31 31.91L20.89 0Z" fill="#FFC107" />
                    <path d="M29.5 14L58.06 63.82L20.89 63.82L2.31 31.91L29.5 14Z" fill="#1fa463" />
                    <path d="M85 46L58.06 0L20.89 0L49.5 50L85 46Z" fill="#03a9f4" />
                  </svg>
                  Hubungkan Google Drive
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 auto-rows-max p-8">
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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.04] bg-[#0A0A0C]/80 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-[0_8px_30px_rgba(16,185,129,0.05)] cursor-pointer ring-1 ring-inset ring-white/[0.02]"
      onClick={onDetail}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center bg-black/40">
        {renderThumbnail()}
        
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex gap-2">
            <button 
              className="flex items-center gap-1.5 rounded-xl bg-white/10 backdrop-blur-md px-4 py-2 text-[11px] font-bold text-white transition-all hover:bg-white/20 active:scale-95 ring-1 ring-inset ring-white/10"
              onClick={(e) => { e.stopPropagation(); onDetail(); }}
            >
              <Eye className="h-3.5 w-3.5" />
              Detail
            </button>
          </div>
        </div>
        
        {/* Format Badge (Top Right) */}
        <div className="absolute right-2 top-2 z-10 rounded-md bg-black/60 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/70 ring-1 ring-inset ring-white/10">
          {asset.asset_category}
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-1 px-4 py-3">
        <p className="truncate text-[12px] font-bold text-white/90 group-hover:text-emerald-400 transition-colors">{asset.name}</p>
        <div className="flex items-center gap-2 text-[10px] font-medium text-white/40">
          <span>{asset.asset_kind === 'image' ? 'Image' : asset.asset_kind === 'audio' ? 'Audio' : 'Link'}</span>
          {asset.file_size && (
            <>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>{(asset.file_size / 1024 / 1024).toFixed(1)} MB</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

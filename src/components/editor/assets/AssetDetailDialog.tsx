"use client";

import { useEffect, useState } from "react";
import { X, Calendar, HardDrive, Link as LinkIcon, Music, Trash2, Edit2, FolderInput } from "lucide-react";
import { cn } from "@/lib/cn";
import { checkAssetUsage } from "@/features/assets/actions";
import type { AssetUsage, UserAsset } from "@/types/assets";

interface AssetDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  asset: UserAsset | null;
  onDelete?: (assetId: string) => void;
  onRename?: (assetId: string, newName: string) => void;
}

export function AssetDetailDialog({
  isOpen,
  onClose,
  asset,
  onDelete,
  onRename,
}: AssetDetailDialogProps) {
  const [usages, setUsages] = useState<AssetUsage[]>([]);
  const [isLoadingUsages, setIsLoadingUsages] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isOpen && asset) {
      loadUsages();
    }
  }, [isOpen, asset]);

  const loadUsages = async () => {
    if (!asset) return;
    setIsLoadingUsages(true);
    const res = await checkAssetUsage(asset.id);
    if (res.data) setUsages(res.data);
    setIsLoadingUsages(false);
  };

  if (!isOpen || !asset) return null;

  const isImage = asset.asset_kind === "image";
  const isAudio = asset.asset_kind === "audio";

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    await onDelete(asset.id);
    setIsDeleting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Dialog Box */}
      <div className="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0C] shadow-2xl shadow-black">
        
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.04] px-6 py-4">
          <h2 className="text-[14px] font-bold text-white/90">Detail Aset</h2>
          <button 
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.02] text-white/40 transition-all hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="grid h-full grid-cols-1 md:grid-cols-[1fr_320px]">
            {/* Preview Area */}
            <div className="relative flex h-[300px] md:h-full items-center justify-center bg-black/40 p-6">
              {/* Checkerboard Pattern for transparent images */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)", backgroundPosition: "0 0, 10px 10px", backgroundSize: "20px 20px" }} />
              
              <div className="relative z-10 flex h-full w-full items-center justify-center">
                {isImage && asset.public_url ? (
                  <img 
                    src={asset.public_url} 
                    alt={asset.name}
                    className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                  />
                ) : isAudio ? (
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 shadow-2xl ring-1 ring-white/10">
                    <Music className="h-12 w-12 text-violet-400" />
                  </div>
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-white/[0.02] shadow-2xl ring-1 ring-white/10">
                    <LinkIcon className="h-12 w-12 text-white/20" />
                  </div>
                )}
              </div>
            </div>

            {/* Detail Sidebar */}
            <div className="flex h-full flex-col border-l border-white/[0.04] bg-[#060709] overflow-y-auto custom-scrollbar">
              <div className="p-6 space-y-8">
                
                {/* Title & Type */}
                <div className="space-y-2">
                  <h3 className="text-[16px] font-bold text-white/90 leading-snug">{asset.name}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-white/[0.05] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      {asset.asset_category}
                    </span>
                    <span className="rounded bg-white/[0.05] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/40">
                      {asset.asset_kind}
                    </span>
                  </div>
                </div>

                {/* Metadata List */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/20">Informasi File</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="flex items-center gap-2 text-white/40">
                        <HardDrive className="h-3.5 w-3.5" />
                        Ukuran
                      </span>
                      <span className="font-semibold text-white/70">
                        {asset.file_size ? `${(asset.file_size / 1024 / 1024).toFixed(2)} MB` : "-"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="flex items-center gap-2 text-white/40">
                        <Calendar className="h-3.5 w-3.5" />
                        Diunggah
                      </span>
                      <span className="font-semibold text-white/70">
                        {new Date(asset.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="flex items-center gap-2 text-white/40">
                        <LinkIcon className="h-3.5 w-3.5" />
                        Format
                      </span>
                      <span className="font-semibold text-white/70 uppercase">
                        {asset.extension || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Usage Section */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/20">Penggunaan</p>
                  {isLoadingUsages ? (
                    <div className="flex items-center gap-2 text-[11px] text-white/30">
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/10 border-t-white/40" />
                      Memeriksa penggunaan...
                    </div>
                  ) : usages.length > 0 ? (
                    <div className="space-y-2">
                      <div className="rounded-lg bg-emerald-500/10 p-3 ring-1 ring-emerald-500/20">
                        <p className="text-[11px] font-medium text-emerald-400">Sedang dipakai di {usages.length} tempat</p>
                      </div>
                      <ul className="space-y-2 mt-3">
                        {usages.map((u) => (
                          <li key={u.id} className="flex items-center justify-between rounded-lg bg-white/[0.02] p-2.5 px-3">
                            <span className="text-[11px] font-semibold text-white/70 capitalize">{u.section_key}</span>
                            <span className="text-[10px] text-white/30">{u.field_key}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-white/[0.05] p-4 text-center">
                      <p className="text-[11px] text-white/40">Belum digunakan di bagian manapun.</p>
                    </div>
                  )}
                </div>

              </div>

              {/* Actions Footer */}
              <div className="mt-auto p-6 border-t border-white/[0.02] space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-white/[0.03] p-2.5 text-[11px] font-bold text-white/80 ring-1 ring-inset ring-white/[0.05] transition-all hover:bg-white/[0.06] hover:text-white">
                    <Edit2 className="h-3.5 w-3.5" />
                    Ubah Nama
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-white/[0.03] p-2.5 text-[11px] font-bold text-white/80 ring-1 ring-inset ring-white/[0.05] transition-all hover:bg-white/[0.06] hover:text-white">
                    <FolderInput className="h-3.5 w-3.5" />
                    Pindah
                  </button>
                </div>
                
                {onDelete && (
                  <button 
                    onClick={handleDelete}
                    disabled={isDeleting || usages.length > 0}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-lg p-2.5 text-[11px] font-bold transition-all",
                      usages.length > 0 
                        ? "bg-white/[0.02] text-white/20 cursor-not-allowed"
                        : isDeleting
                          ? "bg-red-500/10 text-red-500/50"
                          : "bg-red-500/10 text-red-400 hover:bg-red-500/20 ring-1 ring-inset ring-red-500/20"
                    )}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {isDeleting ? "Menghapus..." : usages.length > 0 ? "Aset sedang digunakan" : "Hapus Aset"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

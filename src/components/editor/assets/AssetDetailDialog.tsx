"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Download, ExternalLink, Folder, Image as ImageIcon, Link as LinkIcon, MoreVertical, Music, Tag, Trash2, X, AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { UserAsset } from "@/types/assets";

interface AssetDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  asset: UserAsset | null;
  onDelete: (id: string) => void;
}

export function AssetDetailDialog({ isOpen, onClose, asset, onDelete }: AssetDetailDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [usages, setUsages] = useState<{feature_type: string, entity_label: string}[]>([]);
  const [isLoadingUsages, setIsLoadingUsages] = useState(false);

  useEffect(() => {
    if (isOpen && asset) {
      loadUsages();
    }
  }, [isOpen, asset]);

  const loadUsages = async () => {
    if (!asset) return;
    setIsLoadingUsages(true);
    // Mock data for phase 1.2, will be replaced with real API call in phase 2
    if (asset.id.includes("1") || asset.id.includes("3")) {
      setUsages([
        { feature_type: "Public Page", entity_label: "Hero Background" },
        { feature_type: "Portfolio", entity_label: "Project Cover" }
      ]);
    } else {
      setUsages([]);
    }
    setIsLoadingUsages(false);
  };

  if (!isOpen || !asset) return null;

  const isImage = asset.asset_kind === "image";
  const isAudio = asset.asset_kind === "audio";
  const isEmbed = asset.asset_kind === "embed";
  
  const isUsed = usages.length > 0;
  const usageLocations = usages.map(u => ({ type: u.feature_type, name: u.entity_label }));

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(asset.id);
    setIsDeleting(false);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <div className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-none p-4">
          <Dialog.Content className="pointer-events-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0C] p-0 shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-1 ring-inset ring-white/[0.02] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="flex h-[80vh] max-h-[800px] flex-col md:flex-row">
              
              {/* Left: Large Preview Area */}
              <div className="relative flex-1 bg-[#050507] overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
                
                {/* Checkerboard Pattern for transparent images */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)", backgroundPosition: "0 0, 20px 20px", backgroundSize: "40px 40px" }} />
                
                {isImage && asset.public_url ? (
                  <img 
                    src={asset.public_url} 
                    alt={asset.name}
                    className="relative z-10 max-h-full max-w-full rounded-xl object-contain drop-shadow-2xl ring-1 ring-white/10"
                  />
                ) : isAudio ? (
                  <div className="relative z-10 flex h-48 w-48 flex-col items-center justify-center gap-4 rounded-full bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 ring-1 ring-violet-500/20 shadow-[0_0_40px_rgba(139,92,246,0.1)]">
                    <Music className="h-16 w-16 text-violet-400/50" />
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-1.5 rounded-full bg-violet-400/30 animate-pulse" style={{ height: `${Math.random() * 20 + 10}px`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-sky-500/5 ring-1 ring-blue-500/20">
                    <LinkIcon className="h-16 w-16 text-blue-400/50" />
                  </div>
                )}

                {/* Quick Actions overlay on preview */}
                <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 ring-1 ring-inset ring-white/10">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  {asset.public_url && (
                    <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 backdrop-blur-md transition-all hover:bg-emerald-500/40 ring-1 ring-inset ring-emerald-500/30">
                      <Download className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Right: Detail & Metadata Panel */}
              <div className="flex w-full flex-col border-l border-white/[0.04] bg-[#0A0A0C]/90 backdrop-blur-xl md:w-[400px] z-10">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/[0.04] px-6 py-5">
                  <Dialog.Title className="text-[14px] font-bold text-white tracking-tight">Detail Asset</Dialog.Title>
                  <div className="flex items-center gap-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:bg-white/[0.05] hover:text-white transition-all">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:bg-white/[0.05] hover:text-white transition-all">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                  
                  {/* Title & Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[16px] font-bold text-white/90 leading-tight break-all">{asset.name}</h4>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60 ring-1 ring-inset ring-white/[0.05]">
                          {asset.asset_category}
                        </span>
                        <span className="text-[11px] font-medium text-white/30">•</span>
                        <span className="text-[11px] font-medium text-white/50">{format(new Date(asset.created_at), 'dd MMM yyyy', { locale: id })}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 rounded-xl bg-white/[0.02] p-4 ring-1 ring-inset ring-white/[0.04]">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">Ukuran</p>
                        <p className="mt-1 text-[13px] font-medium text-white/80">
                          {asset.file_size ? `${(asset.file_size / 1024 / 1024).toFixed(2)} MB` : '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">Tipe</p>
                        <p className="mt-1 text-[13px] font-medium text-white/80 capitalize">{asset.asset_kind}</p>
                      </div>
                    </div>
                  </div>

                  {/* Usage Context */}
                  <div className="space-y-3">
                    <h5 className="text-[11px] font-bold uppercase tracking-widest text-white/30">Penggunaan</h5>
                    {isUsed ? (
                      <div className="space-y-2">
                        {usageLocations.map((loc, idx) => (
                          <div key={idx} className="flex items-center justify-between rounded-xl bg-emerald-500/5 p-3 ring-1 ring-inset ring-emerald-500/10">
                            <div className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10">
                                <Check className="h-3 w-3 text-emerald-400" />
                              </div>
                              <div>
                                <p className="text-[11px] font-bold text-white/80">{loc.name}</p>
                                <p className="text-[10px] text-emerald-400/60">{loc.type}</p>
                              </div>
                            </div>
                            <button className="text-[10px] font-bold text-white/40 hover:text-white transition-colors">Lihat</button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] p-3 ring-1 ring-inset ring-white/[0.04]">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.05]">
                          <AlertCircle className="h-3 w-3 text-white/30" />
                        </div>
                        <p className="text-[11px] font-medium text-white/40">Aset ini belum digunakan di halaman mana pun.</p>
                      </div>
                    )}
                  </div>

                  {/* Organization */}
                  <div className="space-y-3">
                    <h5 className="text-[11px] font-bold uppercase tracking-widest text-white/30">Organisasi</h5>
                    
                    <button className="flex w-full items-center justify-between rounded-xl bg-white/[0.02] p-3 text-left transition-all hover:bg-white/[0.04] ring-1 ring-inset ring-white/[0.04]">
                      <div className="flex items-center gap-3">
                        <Folder className="h-4 w-4 text-white/40" />
                        <div>
                          <p className="text-[11px] font-bold text-white/70">Pindahkan ke folder</p>
                          <p className="text-[10px] text-white/30">Tidak ada folder</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400">Pilih</span>
                    </button>

                    <button className="flex w-full items-center justify-between rounded-xl bg-white/[0.02] p-3 text-left transition-all hover:bg-white/[0.04] ring-1 ring-inset ring-white/[0.04]">
                      <div className="flex items-center gap-3">
                        <Tag className="h-4 w-4 text-white/40" />
                        <div>
                          <p className="text-[11px] font-bold text-white/70">Tags</p>
                          <p className="text-[10px] text-white/30">Belum ada tag</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400">Tambah</span>
                    </button>
                  </div>

                </div>

                {/* Footer Actions */}
                <div className="border-t border-white/[0.04] bg-[#050507]/50 p-4">
                  <button 
                    onClick={handleDelete}
                    disabled={isUsed || isDeleting}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[12px] font-bold transition-all ring-1 ring-inset",
                      isUsed 
                        ? "bg-white/[0.02] text-white/20 ring-white/[0.02] cursor-not-allowed" 
                        : "bg-red-500/10 text-red-400 ring-red-500/20 hover:bg-red-500/20 hover:text-red-300"
                    )}
                  >
                    {isDeleting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-500/20 border-t-red-500" />
                        Menghapus...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        {isUsed ? "Tidak bisa dihapus (sedang dipakai)" : "Hapus Aset"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

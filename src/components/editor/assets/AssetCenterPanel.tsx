"use client";

import { useCallback, useState } from "react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  UploadCloud, Image as ImageIcon, Music, Link as LinkIcon,
  Search, AlertCircle, X, Check, FileText, LayoutGrid, LayoutList,
  Download, ExternalLink, Folder, Tag, Trash2, ArrowRight, Layers
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useDropzone } from "react-dropzone";
import { ASSET_CONSTANTS } from "@/lib/assets/validators";
import { uploadAssetClient } from "@/features/assets/client-actions";
import type { AssetFilter, AssetFolder, UserAsset } from "@/types/assets";

type ActiveTypeFilter = "all" | "image" | "audio" | "embed" | "document";
type ViewMode = "grid" | "list";

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
  const [activeTypeFilter, setActiveTypeFilter] = useState<ActiveTypeFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isDeleting, setIsDeleting] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setIsUploading(true);
    setUploadError(null);
    try {
      const file = acceptedFiles[0];
      const res = await uploadAssetClient({ file, asset_category: "other" });
      if (res.error) {
        setUploadError(res.error);
      } else if (res.data) {
        onUploadSuccess(res.data);
        setSelectedAsset(res.data);
      }
    } catch (err: any) {
      setUploadError(err.message || "Terjadi kesalahan saat mengunggah file.");
    } finally {
      setIsUploading(false);
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'audio/*': [] },
    maxSize: Math.max(ASSET_CONSTANTS.MAX_FILE_SIZE_IMAGE, ASSET_CONSTANTS.MAX_FILE_SIZE_AUDIO),
    multiple: false,
  });

  const filteredAssets = assets.filter((a) => {
    const matchesType =
      activeTypeFilter === "all" ||
      (activeTypeFilter === "image" && a.asset_kind === "image") ||
      (activeTypeFilter === "audio" && a.asset_kind === "audio") ||
      (activeTypeFilter === "embed" && a.asset_kind === "embed");
    const matchesSearch =
      !filter.search ||
      a.name.toLowerCase().includes(filter.search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDeleteSelected = async () => {
    if (!selectedAsset) return;
    setIsDeleting(true);
    await onDeleteAsset(selectedAsset.id);
    setSelectedAsset(null);
    setIsDeleting(false);
  };

  const totalStorageMB = (assets.reduce((acc, a) => acc + (a.file_size || 0), 0) / 1024 / 1024).toFixed(1);

  return (
    <div className="relative flex h-full flex-1 overflow-hidden bg-[#060608]">

      {/* ── Atmospheric Background ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-emerald-500/[0.04] blur-[140px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-blue-500/[0.03] blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "url('/noise.png')" }} />
      </div>

      {/* ══════════════════════════════════════════
          LEFT — Filter Navigation Rail
      ══════════════════════════════════════════ */}
      <aside className="relative z-10 hidden w-[200px] shrink-0 flex-col overflow-y-auto border-r border-white/[0.04] bg-[#080809]/70 backdrop-blur-xl md:flex">
        <div className="px-4 pb-2 pt-6">
          <p className="px-2 text-[9px] font-black uppercase tracking-[0.15em] text-white/25">Tipe File</p>
        </div>
        <div className="space-y-0.5 px-2 pb-6">
          {[
            { key: "all" as const, label: "Semua", count: assets.length, dot: "bg-white/40" },
            { key: "image" as const, label: "Gambar", count: assets.filter(a => a.asset_kind === "image").length, dot: "bg-blue-400" },
            { key: "audio" as const, label: "Audio", count: assets.filter(a => a.asset_kind === "audio").length, dot: "bg-violet-400" },
            { key: "document" as const, label: "Dokumen", count: 0, dot: "bg-amber-400" },
            { key: "embed" as const, label: "Embed", count: assets.filter(a => a.asset_kind === "embed").length, dot: "bg-sky-400" },
          ].map(({ key, label, count, dot }) => (
            <button
              key={key}
              onClick={() => setActiveTypeFilter(key)}
              className={cn(
                "group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[12px] font-medium transition-all",
                activeTypeFilter === key
                  ? "bg-white/[0.07] text-white ring-1 ring-inset ring-white/[0.08]"
                  : "text-white/40 hover:bg-white/[0.03] hover:text-white/80"
              )}
            >
              <span className="flex items-center gap-2.5">
                <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full transition-opacity", dot, activeTypeFilter === key ? "opacity-100" : "opacity-40 group-hover:opacity-70")} />
                {label}
              </span>
              <span className={cn("text-[10px] font-bold tabular-nums", activeTypeFilter === key ? "text-white/60" : "text-white/20 group-hover:text-white/40")}>{count}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-white/[0.04] px-4 pb-2 pt-5">
          <p className="px-2 text-[9px] font-black uppercase tracking-[0.15em] text-white/25">Status</p>
        </div>
        <div className="space-y-0.5 px-2 pb-6">
          {[
            { label: "Sedang dipakai", icon: <Check className="h-3 w-3" /> },
            { label: "Belum dipakai", icon: <div className="h-3 w-3 rounded-full border border-current opacity-50" /> },
          ].map(({ label, icon }) => (
            <button key={label} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[12px] font-medium text-white/40 transition-all hover:bg-white/[0.03] hover:text-white/80">
              <span className="shrink-0">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        <div className="border-t border-white/[0.04] px-4 pb-2 pt-5">
          <p className="px-2 text-[9px] font-black uppercase tracking-[0.15em] text-white/25">Sumber</p>
        </div>
        <div className="space-y-0.5 px-2 pb-6">
          {["Upload Lokal", "Google Drive", "Embed URL"].map((src) => (
            <button key={src} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[12px] font-medium text-white/40 transition-all hover:bg-white/[0.03] hover:text-white/80">
              {src}
            </button>
          ))}
        </div>

        {/* Storage Indicator at bottom */}
        <div className="mt-auto border-t border-white/[0.04] p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/30">Storage</span>
              <span className="text-[10px] font-bold text-white/50">{totalStorageMB} MB</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full bg-emerald-500/60" style={{ width: `${Math.min(100, (parseFloat(totalStorageMB) / 500) * 100)}%` }} />
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════════════════
          CENTER — Main Library Area
      ══════════════════════════════════════════ */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* ── Top Command Bar ── */}
        <div className="flex shrink-0 flex-col border-b border-white/[0.04] bg-[#080809]/60 backdrop-blur-xl">
          {/* Stats row */}
          <div className="flex items-center gap-6 border-b border-white/[0.03] px-6 py-3">
            {[
              { label: "Total Asset", value: assets.length, accent: "text-white/90" },
              { label: "Sedang Dipakai", value: 0, accent: "text-emerald-400" },
              { label: "Folder", value: folders.length, accent: "text-white/70" },
              { label: "Storage (MB)", value: totalStorageMB, accent: "text-white/70" },
            ].map(({ label, value, accent }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className={cn("text-[18px] font-black leading-none tabular-nums", accent)}>{value}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/25">{label}</span>
                <div className="h-3 w-px bg-white/[0.06] last:hidden" />
              </div>
            ))}
          </div>

          {/* Search + Actions row */}
          <div className="flex items-center gap-4 px-6 py-4">
            {/* Search */}
            <div className="group relative flex-1">
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-white/[0.03] ring-1 ring-inset ring-white/[0.06] transition-all group-focus-within:bg-white/[0.05] group-focus-within:ring-emerald-500/30" />
              <Search className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/25 transition-colors group-focus-within:text-emerald-400" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama, format, atau tag..."
                value={filter.search || ""}
                onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
                className="relative h-10 w-full bg-transparent pl-10 pr-12 text-[12px] font-medium text-white placeholder:text-white/25 focus:outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="hidden h-5 items-center rounded border border-white/10 bg-white/5 px-1.5 text-[9px] font-medium text-white/35 sm:inline-flex">⌘K</kbd>
              </div>
            </div>

            {/* Source buttons */}
            <div className="flex items-center gap-2">
              <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/[0.03] px-3 text-[11px] font-bold text-white/60 ring-1 ring-inset ring-white/[0.06] transition-all hover:bg-white/[0.07] hover:text-white">
                <svg viewBox="0 0 87.3 78" className="h-3.5 w-3.5 shrink-0">
                  <path d="M20.89 0L58.06 0L76.65 31.91L58.06 63.82L20.89 63.82L2.31 31.91L20.89 0Z" fill="#FFC107" />
                  <path d="M29.5 14L58.06 63.82L20.89 63.82L2.31 31.91L29.5 14Z" fill="#1fa463" />
                  <path d="M85 46L58.06 0L20.89 0L49.5 50L85 46Z" fill="#03a9f4" />
                </svg>
                Drive
              </button>
              <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/[0.03] px-3 text-[11px] font-bold text-white/60 ring-1 ring-inset ring-white/[0.06] transition-all hover:bg-white/[0.07] hover:text-white">
                <LinkIcon className="h-3.5 w-3.5 text-sky-400" />
                Embed
              </button>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-white/[0.06]" />

            {/* View toggle */}
            <div className="flex items-center rounded-lg bg-white/[0.03] p-0.5 ring-1 ring-inset ring-white/[0.06]">
              <button
                onClick={() => setViewMode("grid")}
                className={cn("flex h-8 w-8 items-center justify-center rounded-md transition-all", viewMode === "grid" ? "bg-white/[0.10] text-white shadow-sm" : "text-white/35 hover:text-white/70")}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn("flex h-8 w-8 items-center justify-center rounded-md transition-all", viewMode === "list" ? "bg-white/[0.10] text-white shadow-sm" : "text-white/35 hover:text-white/70")}
              >
                <LayoutList className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Upload */}
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <button
                disabled={isUploading}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-xl px-4 text-[12px] font-bold transition-all",
                  isUploading
                    ? "cursor-not-allowed bg-white/[0.04] text-white/25"
                    : "bg-emerald-500 text-black shadow-[0_0_16px_rgba(16,185,129,0.25)] hover:bg-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] active:scale-[0.97]"
                )}
              >
                {isUploading ? (
                  <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/20 border-t-black" />Uploading...</>
                ) : (
                  <><UploadCloud className="h-3.5 w-3.5" />Upload</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Error Banner ── */}
        {uploadError && (
          <div className="mx-4 mt-3 flex items-center gap-3 rounded-xl bg-red-500/10 px-4 py-3 ring-1 ring-inset ring-red-500/20">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <p className="flex-1 text-[12px] text-red-200">{uploadError}</p>
            <button onClick={() => setUploadError(null)} className="text-red-400/50 hover:text-red-400 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ── Grid / List Area ── */}
        <div {...(isDragActive ? {} : {})} className="relative flex-1 overflow-y-auto">
          {/* Drag Overlay */}
          {isDragActive && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-emerald-500/5 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-emerald-500/50 px-16 py-10">
                <UploadCloud className="h-10 w-10 animate-bounce text-emerald-400" />
                <p className="text-[14px] font-bold text-emerald-300">Lepaskan untuk mengunggah</p>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-emerald-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-white/25">Memuat library...</span>
              </div>
            </div>
          ) : filteredAssets.length === 0 ? (
            <EmptyState assets={assets} onTriggerUpload={() => { const el = document.querySelector('input[type="file"]') as HTMLInputElement; el?.click(); }} />
          ) : viewMode === "grid" ? (
            <div className="grid auto-rows-max grid-cols-2 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {filteredAssets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  isSelected={selectedAsset?.id === asset.id}
                  onSelect={() => setSelectedAsset(selectedAsset?.id === asset.id ? null : asset)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-px p-4">
              {filteredAssets.map((asset) => (
                <AssetRow
                  key={asset.id}
                  asset={asset}
                  isSelected={selectedAsset?.id === asset.id}
                  onSelect={() => setSelectedAsset(selectedAsset?.id === asset.id ? null : asset)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT — Persistent Inspection Panel
      ══════════════════════════════════════════ */}
      <aside
        className={cn(
          "relative z-10 flex shrink-0 flex-col overflow-hidden border-l border-white/[0.04] bg-[#08080A]/80 backdrop-blur-xl transition-all duration-300",
          selectedAsset ? "w-[320px]" : "w-0 opacity-0"
        )}
      >
        {selectedAsset && (
          <AssetInspector
            asset={selectedAsset}
            isDeleting={isDeleting}
            onClose={() => setSelectedAsset(null)}
            onDelete={handleDeleteSelected}
          />
        )}
      </aside>

    </div>
  );
}

/* ══════════════════════════════════════
   ASSET CARD (Grid)
══════════════════════════════════════ */
function AssetCard({ asset, isSelected, onSelect }: { asset: UserAsset; isSelected: boolean; onSelect: () => void }) {
  const isImage = asset.asset_kind === "image";
  const isAudio = asset.asset_kind === "audio";

  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-200",
        isSelected
          ? "border-emerald-500/50 bg-emerald-500/[0.04] ring-1 ring-inset ring-emerald-500/30 shadow-[0_0_24px_rgba(16,185,129,0.08)]"
          : "border-white/[0.05] bg-[#0C0C0F] hover:border-white/[0.12] hover:bg-[#0F0F12] hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
        {isImage && asset.public_url ? (
          <>
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%,#fff),repeating-linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%,#fff)", backgroundPosition: "0 0,8px 8px", backgroundSize: "16px 16px" }} />
            <img src={asset.public_url} alt={asset.name} className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
          </>
        ) : isAudio ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5">
            <Music className="h-7 w-7 text-violet-400/60" />
          </div>
        ) : asset.asset_kind === "embed" ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-500/8 to-blue-500/5">
            <LinkIcon className="h-7 w-7 text-sky-400/60" />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
            <FileText className="h-7 w-7 text-white/20" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Category badge */}
        <div className={cn(
          "absolute right-2 top-2 z-10 rounded-md px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider ring-1 ring-inset",
          isImage ? "bg-blue-500/20 text-blue-300 ring-blue-500/30" :
          isAudio ? "bg-violet-500/20 text-violet-300 ring-violet-500/30" :
          "bg-white/10 text-white/60 ring-white/10"
        )}>
          {asset.asset_kind}
        </div>

        {/* Selected check */}
        {isSelected && (
          <div className="absolute left-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
            <Check className="h-3 w-3 text-black" />
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-0.5 px-3 py-2.5">
        <p className={cn("truncate text-[11px] font-bold leading-tight transition-colors", isSelected ? "text-emerald-300" : "text-white/80 group-hover:text-white")}>{asset.name}</p>
        <p className="text-[10px] font-medium text-white/30">
          {asset.asset_kind === "image" ? "Gambar" : asset.asset_kind === "audio" ? "Audio" : "Link"}
          {asset.file_size ? ` · ${(asset.file_size / 1024 / 1024).toFixed(1)} MB` : ""}
        </p>
      </div>
    </button>
  );
}

/* ══════════════════════════════════════
   ASSET ROW (List view)
══════════════════════════════════════ */
function AssetRow({ asset, isSelected, onSelect }: { asset: UserAsset; isSelected: boolean; onSelect: () => void }) {
  const isImage = asset.asset_kind === "image";
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-all",
        isSelected ? "bg-emerald-500/[0.06] ring-1 ring-inset ring-emerald-500/20" : "hover:bg-white/[0.03]"
      )}
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-black/30">
        {isImage && asset.public_url ? (
          <img src={asset.public_url} alt={asset.name} className="h-full w-full object-cover" loading="lazy" />
        ) : asset.asset_kind === "audio" ? (
          <div className="flex h-full w-full items-center justify-center bg-violet-500/10"><Music className="h-4 w-4 text-violet-400/70" /></div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/[0.03]"><FileText className="h-4 w-4 text-white/30" /></div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-[12px] font-bold", isSelected ? "text-emerald-300" : "text-white/80 group-hover:text-white")}>{asset.name}</p>
        <p className="text-[10px] text-white/30">{asset.asset_kind} {asset.file_size ? `· ${(asset.file_size / 1024 / 1024).toFixed(1)} MB` : ""}</p>
      </div>
      {isSelected && <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />}
    </button>
  );
}

/* ══════════════════════════════════════
   ASSET INSPECTOR (Right Panel)
══════════════════════════════════════ */
function AssetInspector({
  asset,
  isDeleting,
  onClose,
  onDelete,
}: {
  asset: UserAsset;
  isDeleting: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  const isImage = asset.asset_kind === "image";
  const isAudio = asset.asset_kind === "audio";

  const mockUsages = asset.id.includes("1") || asset.id.includes("3")
    ? [{ location: "Hero Background", type: "Public Page" }, { location: "Project Cover", type: "Portfolio" }]
    : [];
  const isUsed = mockUsages.length > 0;

  return (
    <>
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/[0.04] px-5 py-4">
        <h3 className="text-[12px] font-black uppercase tracking-widest text-white/50">Inspeksi Asset</h3>
        <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.05] hover:text-white">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Preview */}
      <div className="relative shrink-0 bg-[#060608]">
        <div className="flex aspect-video items-center justify-center p-6">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%,#fff),repeating-linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%,#fff)", backgroundPosition: "0 0,10px 10px", backgroundSize: "20px 20px" }} />
          {isImage && asset.public_url ? (
            <img src={asset.public_url} alt={asset.name} className="relative z-10 max-h-full max-w-full rounded-lg object-contain shadow-2xl" />
          ) : isAudio ? (
            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/15 to-fuchsia-500/8 ring-1 ring-violet-500/25">
              <Music className="h-8 w-8 text-violet-400/60" />
            </div>
          ) : (
            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-500/10 to-blue-500/5 ring-1 ring-sky-500/20">
              <LinkIcon className="h-8 w-8 text-sky-400/60" />
            </div>
          )}
        </div>
        {/* Quick action buttons on preview */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white ring-1 ring-inset ring-white/10">
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
          {asset.public_url && (
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 backdrop-blur-sm transition-all hover:bg-emerald-500/30 ring-1 ring-inset ring-emerald-500/25">
              <Download className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-6 px-5 py-5">

          {/* Name + Meta */}
          <div className="space-y-2">
            <h4 className="break-all text-[14px] font-black leading-snug text-white/90">{asset.name}</h4>
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn(
                "rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ring-1 ring-inset",
                isImage ? "bg-blue-500/10 text-blue-300 ring-blue-500/20" :
                isAudio ? "bg-violet-500/10 text-violet-300 ring-violet-500/20" :
                "bg-white/[0.06] text-white/50 ring-white/[0.06]"
              )}>{asset.asset_kind}</span>
              <span className="text-[10px] text-white/30">{asset.asset_category}</span>
            </div>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/[0.02] p-3 ring-1 ring-inset ring-white/[0.04]">
            <div>
              <p className="text-[9px] font-black uppercase tracking-wider text-white/25">Ukuran</p>
              <p className="mt-1 text-[12px] font-bold text-white/70">{asset.file_size ? `${(asset.file_size / 1024 / 1024).toFixed(2)} MB` : "—"}</p>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-wider text-white/25">Tanggal</p>
              <p className="mt-1 text-[12px] font-bold text-white/70">{format(new Date(asset.created_at), "d MMM yy", { locale: idLocale })}</p>
            </div>
          </div>

          {/* Penggunaan */}
          <div className="space-y-2.5">
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-white/25">Penggunaan</p>
            {isUsed ? (
              <div className="space-y-1.5">
                {mockUsages.map((u, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-emerald-500/[0.05] px-3 py-2.5 ring-1 ring-inset ring-emerald-500/10">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/15">
                        <Check className="h-2.5 w-2.5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white/80">{u.location}</p>
                        <p className="text-[9px] text-emerald-400/60">{u.type}</p>
                      </div>
                    </div>
                    <button className="text-[9px] font-bold text-white/30 hover:text-white transition-colors">Lihat</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.02] px-3 py-2.5 ring-1 ring-inset ring-white/[0.04]">
                <Layers className="h-3.5 w-3.5 shrink-0 text-white/20" />
                <p className="text-[11px] text-white/35">Belum dipakai di halaman manapun</p>
              </div>
            )}
          </div>

          {/* Organisasi */}
          <div className="space-y-2">
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-white/25">Organisasi</p>
            <button className="flex w-full items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2.5 ring-1 ring-inset ring-white/[0.04] transition-all hover:bg-white/[0.04]">
              <span className="flex items-center gap-2 text-[11px] font-medium text-white/50"><Folder className="h-3.5 w-3.5 text-white/30" />Folder</span>
              <span className="text-[10px] font-bold text-emerald-400">Pilih</span>
            </button>
            <button className="flex w-full items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2.5 ring-1 ring-inset ring-white/[0.04] transition-all hover:bg-white/[0.04]">
              <span className="flex items-center gap-2 text-[11px] font-medium text-white/50"><Tag className="h-3.5 w-3.5 text-white/30" />Tags</span>
              <span className="text-[10px] font-bold text-emerald-400">Tambah</span>
            </button>
          </div>

        </div>
      </div>

      {/* Footer: Delete */}
      <div className="shrink-0 border-t border-white/[0.04] bg-[#060608]/50 p-4">
        <button
          onClick={onDelete}
          disabled={isUsed || isDeleting}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[11px] font-bold transition-all ring-1 ring-inset",
            isUsed
              ? "cursor-not-allowed bg-white/[0.02] text-white/15 ring-white/[0.02]"
              : "bg-red-500/10 text-red-400 ring-red-500/20 hover:bg-red-500/15 hover:text-red-300"
          )}
        >
          {isDeleting ? (
            <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-500/20 border-t-red-500" />Menghapus...</>
          ) : (
            <><Trash2 className="h-3.5 w-3.5" />{isUsed ? "Tidak bisa dihapus (sedang dipakai)" : "Hapus Aset"}</>
          )}
        </button>
      </div>
    </>
  );
}

/* ══════════════════════════════════════
   EMPTY STATE
══════════════════════════════════════ */
function EmptyState({ assets, onTriggerUpload }: { assets: UserAsset[]; onTriggerUpload: () => void }) {
  const isFiltered = assets.length > 0;
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 py-12 text-center">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-500/5 blur-xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.02] ring-1 ring-white/[0.06]">
          <ImageIcon className="h-8 w-8 text-white/15" />
        </div>
      </div>
      {isFiltered ? (
        <>
          <h3 className="text-[15px] font-black text-white/70">Tidak ada hasil</h3>
          <p className="mt-2 max-w-xs text-[12px] leading-relaxed text-white/35">Coba ubah filter atau kata kunci pencarian</p>
        </>
      ) : (
        <>
          <h3 className="text-[16px] font-black text-white/80">Bangun library aset pertamamu</h3>
          <p className="mt-2 max-w-xs text-[12px] leading-relaxed text-white/35">
            Upload gambar, audio, atau dokumen untuk dipakai di seluruh workspace Lynknov — Public Page, Portfolio, dan Commercial Hub.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={onTriggerUpload}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-[12px] font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all hover:bg-emerald-400 active:scale-95"
            >
              <UploadCloud className="h-4 w-4" />
              Upload Aset Pertama
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-5 py-2.5 text-[12px] font-bold text-white/60 ring-1 ring-inset ring-white/[0.06] transition-all hover:bg-white/[0.06] hover:text-white active:scale-95">
              <ArrowRight className="h-4 w-4" />
              Hubungkan Sumber
            </button>
          </div>
        </>
      )}
    </div>
  );
}

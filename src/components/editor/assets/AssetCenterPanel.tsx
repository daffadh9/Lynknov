"use client";
// Asset Library — global workspace (not editor subfeature)
import { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  UploadCloud, Image as ImageIcon, Music, Link as LinkIcon,
  Search, AlertCircle, X, Check, FileText, LayoutGrid, LayoutList,
  Download, ExternalLink, Folder, Tag, Trash2, ArrowRight, Layers,
  ChevronDown, Eye, MousePointerClick
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useDropzone } from "react-dropzone";
import { ASSET_CONSTANTS } from "@/lib/assets/validators";
import { uploadAssetClient } from "@/features/assets/client-actions";
import type { AssetFilter, AssetFolder, UserAsset } from "@/types/assets";

type ActiveTypeFilter = "all" | "image" | "audio" | "embed" | "document";
type ViewMode = "grid" | "list";
type SourceTab = "all" | "uploads" | "drive" | "embed";
type SortKey = "newest" | "oldest" | "name_asc" | "largest";

interface AssetCenterPanelProps {
  assets: UserAsset[];
  folders: AssetFolder[];
  filter: AssetFilter;
  onFilterChange: (filter: AssetFilter) => void;
  onUploadSuccess: (asset: UserAsset) => void;
  onDeleteAsset: (assetId: string) => void;
  onRenameAsset?: (assetId: string, newName: string) => Promise<void>;
  onCreateFolder?: (name: string) => Promise<void>;
  isLoading?: boolean;
}

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Terbaru" },
  { key: "oldest", label: "Terlama" },
  { key: "name_asc", label: "Nama A–Z" },
  { key: "largest", label: "Ukuran Terbesar" },
];

const SOURCE_TABS: { key: SourceTab; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "uploads", label: "Uploads" },
  { key: "drive", label: "Google Drive" },
  { key: "embed", label: "Embed" },
];

export function AssetCenterPanel({
  assets,
  folders,
  filter,
  onFilterChange,
  onUploadSuccess,
  onDeleteAsset,
  onRenameAsset,
  onCreateFolder,
  isLoading = false,
}: AssetCenterPanelProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<UserAsset | null>(null);
  const [activeTypeFilter, setActiveTypeFilter] = useState<ActiveTypeFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isDeleting, setIsDeleting] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const [sourceTab, setSourceTab] = useState<SourceTab>("all");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [recentlyUploadedIds] = useState<Set<string>>(() => new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showSortMenu) return;
    const handler = (e: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target as Node)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showSortMenu]);

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
        recentlyUploadedIds.add(res.data.id);
        onUploadSuccess(res.data);
        setSelectedAsset(res.data);
      }
    } catch (err: any) {
      setUploadError(err.message || "Terjadi kesalahan saat mengunggah file.");
    } finally {
      setIsUploading(false);
    }
  }, [onUploadSuccess, recentlyUploadedIds]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'audio/*': [] },
    maxSize: Math.max(ASSET_CONSTANTS.MAX_FILE_SIZE_IMAGE, ASSET_CONSTANTS.MAX_FILE_SIZE_AUDIO),
    multiple: false,
  });

  const filteredAssets = assets
    .filter((a) => {
      const matchesType =
        activeTypeFilter === "all" ||
        (activeTypeFilter === "image" && a.asset_kind === "image") ||
        (activeTypeFilter === "audio" && a.asset_kind === "audio") ||
        (activeTypeFilter === "embed" && a.asset_kind === "embed");
      const matchesSearch =
        !filter.search ||
        a.name.toLowerCase().includes(filter.search.toLowerCase());
      const matchesSource =
        sourceTab === "all" ||
        (sourceTab === "uploads" && a.asset_kind !== "embed") ||
        (sourceTab === "embed" && a.asset_kind === "embed") ||
        sourceTab === "drive";
      return matchesType && matchesSearch && matchesSource;
    })
    .sort((a, b) => {
      if (sortKey === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortKey === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortKey === "name_asc") return a.name.localeCompare(b.name);
      if (sortKey === "largest") return (b.file_size || 0) - (a.file_size || 0);
      return 0;
    });

  const handleRenameSelected = async (newName: string) => {
    if (!selectedAsset || !onRenameAsset) return;
    await onRenameAsset(selectedAsset.id, newName);
    setSelectedAsset((prev) => (prev ? { ...prev, name: newName } : null));
  };

  const handleCreateFolderSubmit = async () => {
    if (!newFolderName.trim() || !onCreateFolder) return;
    setIsCreatingFolder(true);
    await onCreateFolder(newFolderName.trim());
    setIsCreatingFolder(false);
    setNewFolderName("");
    setShowCreateFolderDialog(false);
  };

  const handleDeleteSelected = async () => {
    if (!selectedAsset) return;
    setIsDeleting(true);
    setShowDeleteConfirm(false);
    await onDeleteAsset(selectedAsset.id);
    setSelectedAsset(null);
    setIsDeleting(false);
  };

  const totalStorageMB = (assets.reduce((acc, a) => acc + (a.file_size || 0), 0) / 1024 / 1024).toFixed(1);
  const hasActiveFilters = activeTypeFilter !== "all" || !!filter.search || sourceTab !== "all";

  return (
    <div className="relative flex h-full flex-1 overflow-hidden bg-[#0D0D0F]">

      {/* Atmospheric Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[15%] -top-[15%] h-[55%] w-[55%] rounded-full bg-emerald-500/[0.04] blur-[160px]" />
        <div className="absolute -bottom-[15%] -right-[10%] h-[45%] w-[45%] rounded-full bg-emerald-500/[0.02] blur-[130px]" />
      </div>

      {/* ══════════════════════════════════════════
          LEFT — Filter Rail (220px)
      ══════════════════════════════════════════ */}
      <aside className="relative z-10 hidden w-[220px] shrink-0 flex-col overflow-y-auto border-r border-white/[0.06] bg-[#111114] md:flex">
        <div className="px-5 pb-1 pt-5">
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#71717A]">Tipe File</p>
        </div>
        <div className="space-y-0.5 px-3 pb-5">
          {[
            { key: "all" as const, label: "Semua", count: assets.length, dot: "bg-[#71717A]" },
            { key: "image" as const, label: "Gambar", count: assets.filter(a => a.asset_kind === "image").length, dot: "bg-blue-400" },
            { key: "audio" as const, label: "Audio", count: assets.filter(a => a.asset_kind === "audio").length, dot: "bg-violet-400" },
            { key: "document" as const, label: "Dokumen", count: 0, dot: "bg-amber-400" },
            { key: "embed" as const, label: "Embed", count: assets.filter(a => a.asset_kind === "embed").length, dot: "bg-sky-400" },
          ].map(({ key, label, count, dot }) => (
            <button
              key={key}
              onClick={() => setActiveTypeFilter(key)}
              className={cn(
                "group flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] transition-all duration-150",
                activeTypeFilter === key
                  ? "bg-[#1C1C20] font-medium text-[#F4F4F5]"
                  : "font-normal text-[#71717A] hover:bg-[#161619] hover:text-[#A1A1AA]"
              )}
            >
              <span className="flex items-center gap-2.5">
                <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dot, activeTypeFilter !== key && "opacity-50")} />
                {label}
              </span>
              <span className={cn("text-[11px] tabular-nums", activeTypeFilter === key ? "text-[#A1A1AA]" : "text-[#3F3F46]")}>{count}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-white/[0.06] px-5 pb-1 pt-4">
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#71717A]">Status Penggunaan</p>
        </div>
        <div className="space-y-0.5 px-3 pb-5">
          {[
            { label: "Sedang Dipakai", dot: "bg-emerald-500" },
            { label: "Belum Dipakai", dot: "bg-[#3F3F46]" },
            { label: "Baru Diunggah", dot: "bg-blue-400" },
          ].map(({ label, dot }) => (
            <button key={label} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-normal text-[#71717A] transition-all duration-150 hover:bg-[#161619] hover:text-[#A1A1AA]">
              <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full opacity-50", dot)} />
              {label}
            </button>
          ))}
        </div>

        <div className="border-t border-white/[0.06] px-5 pb-1 pt-4">
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#71717A]">Sumber</p>
        </div>
        <div className="space-y-0.5 px-3 pb-5">
          {["Upload Lokal", "Google Drive", "Embed URL"].map((src) => (
            <button key={src} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-normal text-[#71717A] transition-all duration-150 hover:bg-[#161619] hover:text-[#A1A1AA]">
              {src}
            </button>
          ))}
        </div>

        <div className="border-t border-white/[0.06] px-5 pb-1 pt-4">
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#71717A]">Koleksi</p>
        </div>
        <div className="space-y-0.5 px-3 pb-5">
          {["Public Page", "Portfolio", "Product Media"].map((col) => (
            <button key={col} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-normal text-[#71717A] transition-all duration-150 hover:bg-[#161619] hover:text-[#A1A1AA]">
              {col}
            </button>
          ))}
          <button className="flex w-full items-center gap-2 rounded-lg border border-dashed border-white/[0.08] px-3 py-2 text-[12px] font-normal text-[#3F3F46] transition-all hover:border-white/[0.15] hover:text-[#71717A]">
            + Buat Koleksi Baru
          </button>
        </div>

        <div className="mt-auto border-t border-white/[0.06] p-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#71717A]">Storage</span>
              <span className="text-[11px] font-medium text-[#A1A1AA]">{totalStorageMB} MB</span>
            </div>
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full bg-emerald-500/50" style={{ width: `${Math.min(100, (parseFloat(totalStorageMB) / 500) * 100)}%` }} />
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════════════════
          CENTER — Main Library
      ══════════════════════════════════════════ */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* Command Bar */}
        <div className="shrink-0 border-b border-white/[0.06] bg-[#111114]">
          {/* Stats Strip */}
          <div className="flex items-center gap-8 border-b border-white/[0.04] px-6 py-3">
            {[
              { label: "Total Asset", value: assets.length, color: "text-[#F4F4F5]" },
              { label: "Sedang Dipakai", value: 0, color: "text-emerald-400" },
              { label: "Folder", value: folders.length, color: "text-[#A1A1AA]" },
              { label: "Storage", value: `${totalStorageMB} MB`, color: "text-[#A1A1AA]" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className={cn("text-[28px] font-medium leading-none tabular-nums", color)}>{value}</span>
                <span className="text-[11px] uppercase tracking-wider text-[#71717A]">{label}</span>
              </div>
            ))}
          </div>

          {/* Search + Actions */}
          <div className="flex items-center gap-3 px-6 py-3">
            <div className="group relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#71717A] transition-colors group-focus-within:text-emerald-400" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama, format, atau tag..."
                value={filter.search || ""}
                onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
                className="h-9 w-full rounded-lg border border-white/[0.06] bg-[#161619] pl-9 pr-3 text-[13px] text-[#F4F4F5] placeholder:text-[#3F3F46] focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all"
              />
              {filter.search && (
                <button onClick={() => onFilterChange({ ...filter, search: "" })} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Folder Baru */}
            <button
              onClick={() => { setNewFolderName(""); setShowCreateFolderDialog(true); }}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/[0.06] bg-[#161619] px-3 text-[12px] font-medium text-[#A1A1AA] transition-all hover:border-white/[0.12] hover:bg-[#1C1C20] hover:text-[#F4F4F5]"
            >
              <Folder className="h-3.5 w-3.5" />
              Folder Baru
            </button>

            {/* Hubungkan Sumber */}
            <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/[0.06] bg-[#161619] px-3 text-[12px] font-medium text-[#A1A1AA] transition-all hover:border-white/[0.12] hover:bg-[#1C1C20] hover:text-[#F4F4F5]">
              <LinkIcon className="h-3.5 w-3.5" />
              Hubungkan
            </button>

            {/* Upload */}
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <button
                disabled={isUploading}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-[12px] font-medium transition-all",
                  isUploading
                    ? "cursor-not-allowed bg-white/[0.04] text-[#3F3F46]"
                    : "bg-emerald-500 text-black hover:bg-emerald-400 active:scale-[0.97] shadow-[0_0_14px_rgba(16,185,129,0.2)]"
                )}
              >
                {isUploading ? (
                  <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/20 border-t-black" />Uploading...</>
                ) : (
                  <><UploadCloud className="h-3.5 w-3.5" />Upload File</>
                )}
              </button>
            </div>
          </div>

          {/* Source Tabs + Sort + View */}
          <div className="flex items-center justify-between border-t border-white/[0.04] px-6 py-2">
            <div className="flex items-center gap-1">
              {SOURCE_TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSourceTab(key)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-[12px] font-medium transition-all",
                    sourceTab === key
                      ? "bg-[#1C1C20] text-[#F4F4F5]"
                      : "text-[#71717A] hover:bg-[#161619] hover:text-[#A1A1AA]"
                  )}
                >
                  {key === "drive" && (
                    <svg viewBox="0 0 87.3 78" className="mr-1.5 inline h-3 w-3">
                      <path d="M20.89 0L58.06 0L76.65 31.91L58.06 63.82L20.89 63.82L2.31 31.91L20.89 0Z" fill="#FFC107" />
                      <path d="M29.5 14L58.06 63.82L20.89 63.82L2.31 31.91L29.5 14Z" fill="#1fa463" />
                      <path d="M85 46L58.06 0L20.89 0L49.5 50L85 46Z" fill="#03a9f4" />
                    </svg>
                  )}
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {/* Result count */}
              {assets.length > 0 && (
                <span className="text-[11px] text-[#71717A]">
                  {hasActiveFilters
                    ? `${filteredAssets.length} dari ${assets.length} asset`
                    : `${assets.length} asset`}
                </span>
              )}
              {/* Sort */}
              <div ref={sortMenuRef} className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.06] bg-transparent px-3 text-[11px] font-medium text-[#71717A] transition-all hover:border-white/[0.1] hover:text-[#A1A1AA]"
                >
                  {SORT_OPTIONS.find(s => s.key === sortKey)?.label}
                  <ChevronDown className={cn("h-3 w-3 transition-transform", showSortMenu && "rotate-180")} />
                </button>
                {showSortMenu && (
                  <div className="absolute right-0 top-10 z-50 w-44 overflow-hidden rounded-xl border border-white/[0.08] bg-[#1C1C20] shadow-2xl">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => { setSortKey(opt.key); setShowSortMenu(false); }}
                        className={cn(
                          "flex w-full items-center justify-between px-4 py-2.5 text-[12px] transition-colors",
                          sortKey === opt.key ? "bg-emerald-500/10 text-emerald-300" : "text-[#A1A1AA] hover:bg-white/[0.04] hover:text-[#F4F4F5]"
                        )}
                      >
                        {opt.label}
                        {sortKey === opt.key && <Check className="h-3 w-3" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* View toggle */}
              <div className="flex items-center rounded-lg border border-white/[0.06] bg-transparent p-0.5">
                <button onClick={() => setViewMode("grid")} className={cn("flex h-7 w-7 items-center justify-center rounded-md transition-all", viewMode === "grid" ? "bg-[#1C1C20] text-[#F4F4F5]" : "text-[#3F3F46] hover:text-[#71717A]")}>
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setViewMode("list")} className={cn("flex h-7 w-7 items-center justify-center rounded-md transition-all", viewMode === "list" ? "bg-[#1C1C20] text-[#F4F4F5]" : "text-[#3F3F46] hover:text-[#71717A]")}>
                  <LayoutList className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {uploadError && (
          <div className="mx-4 mt-3 flex items-center gap-3 rounded-xl bg-red-500/8 px-4 py-3 ring-1 ring-inset ring-red-500/15">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <p className="flex-1 text-[12px] text-[#A1A1AA]">{uploadError}</p>
            <button onClick={() => setUploadError(null)} className="text-[#71717A] hover:text-[#A1A1AA] transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Grid / List Area */}
        <div className="relative flex-1 overflow-y-auto">
          {isDragActive && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0D0D0F]/90 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-500/40 bg-emerald-500/5 px-16 py-10">
                <UploadCloud className="h-10 w-10 animate-bounce text-emerald-400" />
                <p className="text-[14px] font-medium text-emerald-300">Lepaskan untuk mengunggah</p>
              </div>
            </div>
          )}

          {sourceTab === "drive" ? (
            <DriveConnectState />
          ) : isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-emerald-500" />
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#71717A]">Memuat library...</span>
              </div>
            </div>
          ) : filteredAssets.length === 0 && !isUploading ? (
            <EmptyState assets={assets} hasActiveFilters={hasActiveFilters} onTriggerUpload={() => { const el = document.querySelector('input[type="file"]') as HTMLInputElement; el?.click(); }} onClearFilters={() => { setActiveTypeFilter("all"); setSourceTab("all"); onFilterChange({ ...filter, search: "" }); }} />
          ) : viewMode === "grid" ? (
            <div className="grid auto-rows-max grid-cols-2 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {isUploading && <UploadProgressCard />}
              {filteredAssets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  isSelected={selectedAsset?.id === asset.id}
                  isNew={recentlyUploadedIds.has(asset.id)}
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
                  isNew={recentlyUploadedIds.has(asset.id)}
                  onSelect={() => setSelectedAsset(selectedAsset?.id === asset.id ? null : asset)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT — Persistent Inspection Panel (always 320px)
      ══════════════════════════════════════════ */}
      <aside className="relative z-10 flex w-[320px] shrink-0 flex-col overflow-hidden border-l border-white/[0.06] bg-[#111114]">
        {selectedAsset ? (
          <AssetInspector
            key={selectedAsset.id}
            asset={selectedAsset}
            isDeleting={isDeleting}
            showDeleteConfirm={showDeleteConfirm}
            onRequestDelete={() => setShowDeleteConfirm(true)}
            onConfirmDelete={handleDeleteSelected}
            onCancelDelete={() => setShowDeleteConfirm(false)}
            onClose={() => { setSelectedAsset(null); setShowDeleteConfirm(false); }}
            onRename={onRenameAsset ? handleRenameSelected : undefined}
          />
        ) : (
          <PanelEmptyHint />
        )}
      </aside>

      {/* Create Folder Dialog */}
      {showCreateFolderDialog && (
        <CreateFolderDialog
          name={newFolderName}
          isCreating={isCreatingFolder}
          onChange={setNewFolderName}
          onSubmit={handleCreateFolderSubmit}
          onClose={() => setShowCreateFolderDialog(false)}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   UPLOAD PROGRESS CARD (inline in grid)
══════════════════════════════════════ */
function UploadProgressCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-500/5">
      <div className="flex aspect-[4/3] items-center justify-center bg-emerald-500/5">
        <UploadCloud className="h-8 w-8 animate-pulse text-emerald-400/60" />
      </div>
      <div className="px-3 py-2.5">
        <div className="mb-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full animate-pulse rounded-full bg-emerald-500/60" style={{ width: "60%" }} />
        </div>
        <p className="text-[11px] font-medium text-emerald-400">Mengunggah...</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ASSET CARD (Grid) — with IN USE / NEW badges, translateY hover, quick actions
══════════════════════════════════════ */
function AssetCard({ asset, isSelected, isNew, onSelect }: { asset: UserAsset; isSelected: boolean; isNew: boolean; onSelect: () => void }) {
  const isImage = asset.asset_kind === "image";
  const isAudio = asset.asset_kind === "audio";
  const mockInUse = asset.id.charAt(0) <= "5";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(); }}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-[10px] border transition-all duration-150",
        isSelected
          ? "border-[rgba(16,185,129,0.4)] bg-[#161619] shadow-[0_0_0_3px_rgba(16,185,129,0.08)] -translate-y-0"
          : "border-[rgba(255,255,255,0.06)] bg-[#111114] hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#161619]">
        {isImage && asset.public_url ? (
          <>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%,#fff),repeating-linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%,#fff)", backgroundPosition: "0 0,8px 8px", backgroundSize: "16px 16px" }} />
            <img src={asset.public_url} alt={asset.name} className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
          </>
        ) : isAudio ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/8 to-fuchsia-500/4">
            <Music className="h-7 w-7 text-violet-400/50" />
          </div>
        ) : asset.asset_kind === "embed" ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-500/6 to-blue-500/3">
            <LinkIcon className="h-7 w-7 text-sky-400/50" />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#1C1C20]">
            <FileText className="h-7 w-7 text-[#3F3F46]" />
          </div>
        )}

        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 translate-y-1 gap-1.5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <button onClick={(e) => { e.stopPropagation(); onSelect(); }} className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm ring-1 ring-inset ring-white/10 hover:bg-white/20 transition-colors">
            <Eye className="h-3 w-3" />
            Lihat
          </button>
          {asset.public_url && (
            <button onClick={(e) => { e.stopPropagation(); window.open(asset.public_url!, "_blank"); }} className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm ring-1 ring-inset ring-white/10 hover:bg-white/20 transition-colors">
              <Download className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Badges top-right */}
        <div className="absolute right-2 top-2 z-10 flex flex-col items-end gap-1">
          {mockInUse && (
            <span className="rounded-full bg-[rgba(16,185,129,0.15)] px-2 py-0.5 text-[8px] font-medium uppercase tracking-wider text-emerald-300">
              In Use
            </span>
          )}
          {isNew && (
            <span className="rounded-full bg-[rgba(59,130,246,0.15)] px-2 py-0.5 text-[8px] font-medium uppercase tracking-wider text-blue-300">
              New
            </span>
          )}
          {!mockInUse && !isNew && (
            <span className="rounded-md bg-[#27272A] px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wider text-[#A1A1AA]">
              {asset.asset_kind}
            </span>
          )}
        </div>

        {/* Selected check */}
        {isSelected && (
          <div className="absolute left-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
            <Check className="h-3 w-3 text-black" />
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-0.5 px-3 py-2.5">
        <p className={cn("truncate text-[12px] font-medium leading-tight transition-colors", isSelected ? "text-emerald-300" : "text-[#F4F4F5]")}>{asset.name}</p>
        <p className="text-[11px] text-[#71717A]">
          {asset.asset_kind === "image" ? "Image" : asset.asset_kind === "audio" ? "Audio" : "Link"}
          {asset.file_size ? ` · ${(asset.file_size / 1024 / 1024).toFixed(1)} MB` : ""}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ASSET ROW (List view)
══════════════════════════════════════ */
function AssetRow({ asset, isSelected, isNew, onSelect }: { asset: UserAsset; isSelected: boolean; isNew: boolean; onSelect: () => void }) {
  const isImage = asset.asset_kind === "image";
  const mockInUse = asset.id.charAt(0) <= "5";
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group flex w-full items-center gap-4 rounded-lg px-4 py-2.5 text-left transition-all duration-150",
        isSelected ? "bg-[rgba(16,185,129,0.06)] ring-1 ring-inset ring-[rgba(16,185,129,0.2)]" : "hover:bg-[#161619]"
      )}
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#1C1C20]">
        {isImage && asset.public_url ? (
          <img src={asset.public_url} alt={asset.name} className="h-full w-full object-cover" loading="lazy" />
        ) : asset.asset_kind === "audio" ? (
          <div className="flex h-full w-full items-center justify-center bg-violet-500/8"><Music className="h-4 w-4 text-violet-400/60" /></div>
        ) : (
          <div className="flex h-full w-full items-center justify-center"><FileText className="h-4 w-4 text-[#3F3F46]" /></div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-[13px] font-medium", isSelected ? "text-emerald-300" : "text-[#F4F4F5]")}>{asset.name}</p>
        <p className="text-[11px] text-[#71717A]">{asset.asset_kind} {asset.file_size ? `· ${(asset.file_size / 1024 / 1024).toFixed(1)} MB` : ""}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {mockInUse && <span className="rounded-full bg-[rgba(16,185,129,0.12)] px-2 py-0.5 text-[9px] font-medium text-emerald-400">In Use</span>}
        {isNew && <span className="rounded-full bg-[rgba(59,130,246,0.12)] px-2 py-0.5 text-[9px] font-medium text-blue-400">New</span>}
        {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
      </div>
    </button>
  );
}

/* ══════════════════════════════════════
   PANEL EMPTY HINT (Right panel idle state)
══════════════════════════════════════ */
function PanelEmptyHint() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#161619]">
        <MousePointerClick className="h-6 w-6 text-[#3F3F46]" />
      </div>
      <div>
        <p className="text-[13px] font-medium text-[#A1A1AA]">Pilih asset</p>
        <p className="mt-1 text-[12px] text-[#71717A]">Detail asset akan muncul di sini saat kamu memilih salah satunya dari grid.</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ASSET INSPECTOR (Right panel detail)
══════════════════════════════════════ */
function AssetInspector({
  asset,
  isDeleting,
  showDeleteConfirm,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
  onClose,
  onRename,
}: {
  asset: UserAsset;
  isDeleting: boolean;
  showDeleteConfirm: boolean;
  onRequestDelete: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onClose: () => void;
  onRename?: (newName: string) => Promise<void>;
}) {
  const isImage = asset.asset_kind === "image";
  const isAudio = asset.asset_kind === "audio";
  const mockInUse = asset.id.charAt(0) <= "5";
  const mockUsages = mockInUse
    ? [{ location: "Hero Background", type: "Public Page" }, { location: "Project Cover", type: "Portfolio" }]
    : [];

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(asset.name);
  const [isSavingName, setIsSavingName] = useState(false);

  const commitRename = async () => {
    const trimmed = editedName.trim();
    if (!trimmed || trimmed === asset.name || !onRename) {
      setEditedName(asset.name);
      setIsEditingName(false);
      return;
    }
    setIsSavingName(true);
    await onRename(trimmed);
    setIsSavingName(false);
    setIsEditingName(false);
  };

  return (
    <>
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#71717A]">Detail Asset</p>
        <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg text-[#71717A] transition-all hover:bg-[#1C1C20] hover:text-[#F4F4F5]">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Preview Area */}
      <div className="relative shrink-0 bg-[#0D0D0F]">
        <div className="flex aspect-video items-center justify-center p-4">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%,#fff),repeating-linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%,#fff)", backgroundPosition: "0 0,10px 10px", backgroundSize: "20px 20px" }} />
          {isImage && asset.public_url ? (
            <img src={asset.public_url} alt={asset.name} className="relative z-10 max-h-full max-w-full rounded-lg object-contain shadow-2xl" />
          ) : isAudio ? (
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10 ring-1 ring-violet-500/20">
              <Music className="h-7 w-7 text-violet-400/60" />
            </div>
          ) : (
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/8 ring-1 ring-sky-500/15">
              <LinkIcon className="h-7 w-7 text-sky-400/50" />
            </div>
          )}
        </div>
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/8 text-[#A1A1AA] backdrop-blur-sm ring-1 ring-inset ring-white/8 hover:bg-white/15 hover:text-white transition-all">
            <ExternalLink className="h-3 w-3" />
          </button>
          {asset.public_url && (
            <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/12 text-emerald-400 backdrop-blur-sm ring-1 ring-inset ring-emerald-500/20 hover:bg-emerald-500/25 transition-all">
              <Download className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable detail */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-5 px-5 py-4">

          {/* Identity */}
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#71717A]">Identitas</p>
            <div className="group mt-2 flex items-start gap-2">
              {isEditingName ? (
                <input
                  autoFocus
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); commitRename(); }
                    if (e.key === "Escape") { setEditedName(asset.name); setIsEditingName(false); }
                  }}
                  onBlur={commitRename}
                  disabled={isSavingName}
                  className="flex-1 rounded-md border border-emerald-500/30 bg-[#1C1C20] px-2 py-1 text-[14px] font-medium text-[#F4F4F5] focus:outline-none focus:ring-1 focus:ring-emerald-500/40 disabled:opacity-50"
                />
              ) : (
                <h4
                  className={cn(
                    "flex-1 break-all text-[14px] font-medium leading-snug text-[#F4F4F5]",
                    onRename && "cursor-text hover:text-white"
                  )}
                  onClick={() => onRename && setIsEditingName(true)}
                  title={onRename ? "Klik untuk ganti nama" : undefined}
                >
                  {asset.name}
                </h4>
              )}
              {!isEditingName && onRename && (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="mt-0.5 shrink-0 rounded p-0.5 text-[#3F3F46] opacity-0 transition-all group-hover:opacity-100 hover:bg-[#1C1C20] hover:text-[#A1A1AA]"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                </button>
              )}
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider", isImage ? "bg-[rgba(59,130,246,0.12)] text-[#60A5FA]" : isAudio ? "bg-[rgba(139,92,246,0.12)] text-[#A78BFA]" : "bg-[#27272A] text-[#A1A1AA]")}>
                {asset.asset_kind}
              </span>
              {mockInUse && <span className="rounded-full bg-[rgba(16,185,129,0.12)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-emerald-400">In Use</span>}
              <span className="text-[11px] text-[#71717A]">{format(new Date(asset.created_at), "d MMM yyyy", { locale: idLocale })}</span>
            </div>
          </div>

          {/* Metadata */}
          <div>
            <p className="mb-2.5 text-[9px] font-medium uppercase tracking-[0.08em] text-[#71717A]">Metadata</p>
            <div className="space-y-2 rounded-lg bg-[#161619] px-4 py-3">
              {[
                { label: "Ukuran", value: asset.file_size ? `${(asset.file_size / 1024 / 1024).toFixed(2)} MB` : "—" },
                { label: "Tipe", value: asset.asset_kind === "image" ? "Image" : asset.asset_kind === "audio" ? "Audio" : "Link" },
                { label: "Kategori", value: asset.asset_category || "—" },
                { label: "Sumber", value: "Upload" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[12px] text-[#71717A]">{label}</span>
                  <span className="text-[12px] font-medium text-[#A1A1AA]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Penggunaan */}
          <div>
            <p className="mb-2.5 text-[9px] font-medium uppercase tracking-[0.08em] text-[#71717A]">Penggunaan</p>
            {mockUsages.length > 0 ? (
              <div className="space-y-2">
                {mockUsages.map((u, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-[rgba(16,185,129,0.06)] px-3 py-2.5 ring-1 ring-inset ring-[rgba(16,185,129,0.1)]">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/12">
                        <Check className="h-2.5 w-2.5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-[12px] font-medium text-[#F4F4F5]">{u.location}</p>
                        <p className="text-[10px] text-emerald-400/70">{u.type}</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-medium text-[#71717A] hover:text-[#F4F4F5] transition-colors">Lihat</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2.5 rounded-lg bg-[#161619] px-3 py-2.5">
                <Layers className="h-3.5 w-3.5 shrink-0 text-[#3F3F46]" />
                <p className="text-[12px] text-[#71717A]">Belum dipakai di halaman manapun</p>
              </div>
            )}
          </div>

          {/* Organisasi */}
          <div>
            <p className="mb-2.5 text-[9px] font-medium uppercase tracking-[0.08em] text-[#71717A]">Organisasi</p>
            <div className="space-y-1.5">
              <button className="flex w-full items-center justify-between rounded-lg bg-[#161619] px-3 py-2.5 transition-all hover:bg-[#1C1C20]">
                <span className="flex items-center gap-2 text-[12px] text-[#A1A1AA]"><Folder className="h-3.5 w-3.5 text-[#71717A]" />Folder</span>
                <span className="text-[11px] font-medium text-emerald-400">Pilih</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg bg-[#161619] px-3 py-2.5 transition-all hover:bg-[#1C1C20]">
                <span className="flex items-center gap-2 text-[12px] text-[#A1A1AA]"><Tag className="h-3.5 w-3.5 text-[#71717A]" />Tags</span>
                <span className="text-[11px] font-medium text-emerald-400">Tambah</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="shrink-0 space-y-2 border-t border-white/[0.06] p-4">
        {mockInUse ? (
          <div className="flex items-start gap-2.5 rounded-lg bg-amber-500/[0.08] px-3 py-3 ring-1 ring-inset ring-amber-500/15">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
            <p className="text-[11px] leading-relaxed text-[#A1A1AA]">
              Dipakai di <span className="font-medium text-amber-400">{mockUsages.length} lokasi</span>. Lepas dari semua lokasi sebelum menghapus.
            </p>
          </div>
        ) : showDeleteConfirm ? (
          <div className="space-y-2 rounded-xl border border-white/[0.06] bg-[#161619] p-4">
            <p className="text-[12px] font-medium text-[#F4F4F5]">
              Hapus &ldquo;{asset.name.length > 28 ? asset.name.slice(0, 28) + "…" : asset.name}&rdquo;?
            </p>
            <p className="text-[11px] text-[#71717A]">Asset ini akan dihapus permanen dari library.</p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={onCancelDelete}
                className="flex-1 rounded-lg border border-white/[0.08] py-2 text-[12px] font-medium text-[#A1A1AA] transition-all hover:border-white/[0.15] hover:text-[#F4F4F5]"
              >
                Batal
              </button>
              <button
                onClick={onConfirmDelete}
                disabled={isDeleting}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-500/15 py-2 text-[12px] font-medium text-red-400 ring-1 ring-inset ring-red-500/20 transition-all hover:bg-red-500/25 hover:text-red-300 disabled:opacity-50"
              >
                {isDeleting ? (
                  <><span className="h-3 w-3 animate-spin rounded-full border-2 border-red-500/20 border-t-red-400" />Menghapus...</>
                ) : (
                  <><Trash2 className="h-3.5 w-3.5" />Hapus</>
                )}
              </button>
            </div>
          </div>
        ) : null}
        {!showDeleteConfirm && (
          <button
            onClick={mockInUse ? undefined : onRequestDelete}
            disabled={mockInUse || isDeleting}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-[12px] font-medium transition-all",
              mockInUse
                ? "cursor-not-allowed text-[#3F3F46]"
                : "text-red-400 hover:bg-red-500/[0.06] hover:text-red-300"
            )}
          >
            <Trash2 className="h-3.5 w-3.5" />
            {mockInUse ? "Tidak bisa dihapus" : "Hapus Aset"}
          </button>
        )}
      </div>
    </>
  );
}

/* ══════════════════════════════════════
   GOOGLE DRIVE CONNECT STATE
══════════════════════════════════════ */
function DriveConnectState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 py-12 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#161619]">
        <svg viewBox="0 0 87.3 78" className="h-8 w-8">
          <path d="M20.89 0L58.06 0L76.65 31.91L58.06 63.82L20.89 63.82L2.31 31.91L20.89 0Z" fill="#FFC107" />
          <path d="M29.5 14L58.06 63.82L20.89 63.82L2.31 31.91L29.5 14Z" fill="#1fa463" />
          <path d="M85 46L58.06 0L20.89 0L49.5 50L85 46Z" fill="#03a9f4" />
        </svg>
      </div>
      <h3 className="text-[16px] font-medium text-[#F4F4F5]">Hubungkan Google Drive</h3>
      <p className="mt-2.5 max-w-xs text-[13px] leading-relaxed text-[#71717A]">
        Akses file dari Google Drive untuk digunakan di seluruh workspace Lynknov — tanpa perlu mengunduh ulang.
      </p>
      <button className="mt-8 flex items-center gap-2 rounded-lg bg-white/[0.06] px-6 py-3 text-[13px] font-medium text-[#F4F4F5] ring-1 ring-inset ring-white/[0.08] transition-all hover:bg-white/[0.10] active:scale-95">
        <svg viewBox="0 0 87.3 78" className="h-4 w-4">
          <path d="M20.89 0L58.06 0L76.65 31.91L58.06 63.82L20.89 63.82L2.31 31.91L20.89 0Z" fill="#FFC107" />
          <path d="M29.5 14L58.06 63.82L20.89 63.82L2.31 31.91L29.5 14Z" fill="#1fa463" />
          <path d="M85 46L58.06 0L20.89 0L49.5 50L85 46Z" fill="#03a9f4" />
        </svg>
        Hubungkan Google Drive
      </button>
    </div>
  );
}

/* ══════════════════════════════════════
   EMPTY STATE
══════════════════════════════════════ */
function EmptyState({ assets, hasActiveFilters, onTriggerUpload, onClearFilters }: {
  assets: UserAsset[];
  hasActiveFilters: boolean;
  onTriggerUpload: () => void;
  onClearFilters: () => void;
}) {
  if (hasActiveFilters) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 py-12 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#161619]">
          <Search className="h-6 w-6 text-[#3F3F46]" />
        </div>
        <h3 className="text-[15px] font-medium text-[#A1A1AA]">Tidak ada hasil</h3>
        <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-[#71717A]">Tidak ada asset yang cocok dengan filter aktif.</p>
        <button onClick={onClearFilters} className="mt-6 rounded-lg border border-white/[0.08] bg-transparent px-5 py-2 text-[12px] font-medium text-[#A1A1AA] transition-all hover:border-white/[0.15] hover:text-[#F4F4F5]">
          Hapus Semua Filter
        </button>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 py-12 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-emerald-500/5 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/[0.06] bg-[#161619]">
          <ImageIcon className="h-8 w-8 text-[#3F3F46]" />
        </div>
      </div>
      <h3 className="text-[16px] font-medium text-[#F4F4F5]">Bangun pustaka asset pertamamu</h3>
      <p className="mt-2.5 max-w-xs text-[13px] leading-relaxed text-[#71717A]">
        Upload visual, audio, atau dokumen untuk dipakai di Public Page, Portfolio, dan seluruh workspace Lynknov.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={onTriggerUpload}
          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-[13px] font-medium text-black shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all hover:bg-emerald-400 active:scale-95"
        >
          <UploadCloud className="h-4 w-4" />
          Upload Asset
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-transparent px-5 py-2.5 text-[13px] font-medium text-[#A1A1AA] transition-all hover:border-white/[0.15] hover:text-[#F4F4F5] active:scale-95">
          <ArrowRight className="h-4 w-4" />
          Hubungkan Sumber
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   CREATE FOLDER DIALOG
══════════════════════════════════════ */
function CreateFolderDialog({
  name,
  isCreating,
  onChange,
  onSubmit,
  onClose,
}: {
  name: string;
  isCreating: boolean;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/[0.08] bg-[#161619] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1C1C20]">
              <Folder className="h-3.5 w-3.5 text-[#71717A]" />
            </div>
            <p className="text-[13px] font-medium text-[#F4F4F5]">Folder Baru</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#71717A] transition-all hover:bg-[#1C1C20] hover:text-[#F4F4F5]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="px-5 py-5">
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-[#71717A]">
            Nama Folder
          </label>
          <input
            autoFocus
            type="text"
            placeholder="mis. Gambar Hero, Audio Produk…"
            value={name}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim()) onSubmit();
              if (e.key === "Escape") onClose();
            }}
            disabled={isCreating}
            className="h-9 w-full rounded-lg border border-white/[0.06] bg-[#1C1C20] px-3 text-[13px] text-[#F4F4F5] placeholder:text-[#3F3F46] focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 disabled:opacity-50 transition-all"
          />
        </div>
        <div className="flex gap-2 border-t border-white/[0.06] px-5 py-4">
          <button
            onClick={onClose}
            disabled={isCreating}
            className="flex-1 rounded-lg border border-white/[0.08] py-2 text-[12px] font-medium text-[#A1A1AA] transition-all hover:border-white/[0.15] hover:text-[#F4F4F5] disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onSubmit}
            disabled={!name.trim() || isCreating}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-2 text-[12px] font-medium text-black transition-all hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isCreating ? (
              <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/20 border-t-black" />Membuat...</>
            ) : (
              <><Folder className="h-3.5 w-3.5" />Buat Folder</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

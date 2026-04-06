"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, HardDrive } from "lucide-react";
import { AssetCenterPanel } from "@/components/editor/assets/AssetCenterPanel";
import { fetchAssets, fetchFolders, deleteAsset, renameAsset, createFolder } from "@/features/assets/actions";
import type { AssetFilter, AssetFolder, UserAsset } from "@/types/assets";

export default function AssetLibraryPage() {
  const [assets, setAssets] = useState<UserAsset[]>([]);
  const [folders, setFolders] = useState<AssetFolder[]>([]);
  const [filter, setFilter] = useState<AssetFilter>({ category: "all" });
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const [assetsRes, foldersRes] = await Promise.all([
      fetchAssets(filter),
      fetchFolders(),
    ]);
    if (assetsRes.data) setAssets(assetsRes.data);
    if (foldersRes.data) setFolders(foldersRes.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleUploadSuccess = (newAsset: UserAsset) => {
    setAssets((prev) => [newAsset, ...prev]);
  };

  const handleDeleteAsset = async (assetId: string) => {
    const res = await deleteAsset(assetId);
    if (res.success) {
      setAssets((prev) => prev.filter((a) => a.id !== assetId));
    }
  };

  const handleRenameAsset = async (assetId: string, newName: string) => {
    const res = await renameAsset(assetId, newName);
    if (res.data) {
      setAssets((prev) => prev.map((a) => (a.id === assetId ? { ...a, name: newName } : a)));
    }
  };

  const handleCreateFolder = async (name: string) => {
    const res = await createFolder(name);
    if (res.data) {
      setFolders((prev) => [...prev, res.data!]);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0D0D0F]">
      {/* ── Top Workspace Bar ── */}
      <header className="flex h-12 shrink-0 items-center gap-4 border-b border-white/[0.06] bg-[#111114] px-5">
        <Link
          href="/dashboard"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#71717A] transition-all hover:bg-[#1C1C20] hover:text-[#F4F4F5]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/15">
            <HardDrive className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <span className="text-[14px] font-medium text-[#F4F4F5]">Asset Library</span>
          <span className="hidden text-[13px] text-[#71717A] sm:block">
            — Kelola visual, audio, dan dokumen lintas seluruh workspace
          </span>
        </div>
      </header>

      {/* ── Asset Library Body ── */}
      <div className="flex min-h-0 flex-1">
        <AssetCenterPanel
          assets={assets}
          folders={folders}
          filter={filter}
          onFilterChange={setFilter}
          onUploadSuccess={handleUploadSuccess}
          onDeleteAsset={handleDeleteAsset}
          onRenameAsset={handleRenameAsset}
          onCreateFolder={handleCreateFolder}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

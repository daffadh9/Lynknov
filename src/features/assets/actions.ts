"use server";

import { createClient } from "@/lib/supabase/server";
import type { AssetFolder, AssetUsage, UserAsset } from "@/types/assets";

export async function fetchAssets(filter?: {
  category?: string;
  folder_id?: string;
  search?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("user_assets")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (filter?.category && filter.category !== "all") {
    query = query.eq("asset_category", filter.category);
  }
  if (filter?.folder_id && filter.folder_id !== "all") {
    if (filter.folder_id === "unassigned") {
      query = query.is("folder_id", null);
    } else {
      query = query.eq("folder_id", filter.folder_id);
    }
  }
  if (filter?.search) {
    query = query.ilike("name", `%${filter.search}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching assets:", error);
    return { data: null, error: error.message };
  }
  return { data: data as UserAsset[], error: null };
}

export async function fetchFolders() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("asset_folders")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching folders:", error);
    return { data: null, error: error.message };
  }
  return { data: data as AssetFolder[], error: null };
}

export async function createFolder(name: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return { data: null, error: "Unauthorized" };

  const { data, error } = await supabase
    .from("asset_folders")
    .insert([
      {
        user_id: user.user.id,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating folder:", error);
    return { data: null, error: error.message };
  }
  return { data: data as AssetFolder, error: null };
}

export async function renameAsset(id: string, newName: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_assets")
    .update({ name: newName })
    .eq("id", id)
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data: data as UserAsset, error: null };
}

export async function moveAssetToFolder(assetId: string, folderId: string | null) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_assets")
    .update({ folder_id: folderId })
    .eq("id", assetId)
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data: data as UserAsset, error: null };
}

export async function checkAssetUsage(assetId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("asset_usages")
    .select("*")
    .eq("asset_id", assetId);

  if (error) return { data: null, error: error.message };
  return { data: data as AssetUsage[], error: null };
}

export async function deleteAsset(assetId: string, force: boolean = false) {
  const supabase = await createClient();

  if (!force) {
    const usages = await checkAssetUsage(assetId);
    if (usages.data && usages.data.length > 0) {
      return { 
        success: false, 
        error: "Asset sedang digunakan", 
        usages: usages.data 
      };
    }
  }

  // 1. Dapatkan file path dari DB
  const { data: asset } = await supabase
    .from("user_assets")
    .select("storage_path, storage_bucket")
    .eq("id", assetId)
    .single();

  if (asset?.storage_path && asset?.storage_bucket) {
    // 2. Hapus file fisik dari storage
    await supabase.storage
      .from(asset.storage_bucket)
      .remove([asset.storage_path]);
  }

  // 3. Hapus DB record (cascade on usages should apply)
  const { error } = await supabase
    .from("user_assets")
    .delete()
    .eq("id", assetId);

  if (error) return { success: false, error: error.message };
  return { success: true, error: null };
}

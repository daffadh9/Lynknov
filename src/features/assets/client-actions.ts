"use client";

import { createClient } from "@/lib/supabase/client";
import { validateImage, validateAudio } from "@/lib/assets/validators";
import type { UploadAssetParams, UserAsset } from "@/types/assets";

export async function uploadAssetClient({
  file,
  name,
  folder_id,
  asset_category = "other",
}: UploadAssetParams): Promise<{ data: UserAsset | null; error: string | null }> {
  try {
    const supabase = createClient();
    
    // 1. Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Authentication required");

    // 2. Validate file
    const kind = file.type.startsWith("image/") ? "image" : file.type.startsWith("audio/") ? "audio" : null;
    if (!kind) throw new Error("Format file tidak didukung.");

    if (kind === "image") {
      const v = validateImage(file);
      if (!v.valid) throw new Error(v.error);
    } else {
      const v = validateAudio(file);
      if (!v.valid) throw new Error(v.error);
    }

    // 3. Create unique path
    const extension = file.name.split(".").pop();
    const uniqueId = Math.random().toString(36).substring(2, 15);
    const storagePath = `users/${user.id}/${kind}s/${Date.now()}-${uniqueId}.${extension}`;

    // 4. Upload to storage
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from("user-assets")
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw new Error(uploadError.message);

    // 5. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("user-assets")
      .getPublicUrl(storagePath);

    // 6. Save to database
    const assetName = name || file.name.split(".").slice(0, -1).join(".");
    
    const newAsset = {
      user_id: user.id,
      folder_id: folder_id || null,
      name: assetName,
      original_file_name: file.name,
      asset_kind: kind,
      asset_source: "upload",
      asset_category,
      mime_type: file.type,
      extension,
      file_size: file.size,
      storage_bucket: "user-assets",
      storage_path: storagePath,
      public_url: publicUrlData.publicUrl,
      is_active: true,
    };

    const { data: dbData, error: dbError } = await supabase
      .from("user_assets")
      .insert([newAsset])
      .select()
      .single();

    if (dbError) {
      // Rollback storage if DB fails
      await supabase.storage.from("user-assets").remove([storagePath]);
      throw new Error(dbError.message);
    }

    return { data: dbData as UserAsset, error: null };
  } catch (error: any) {
    console.error("Upload error:", error);
    return { data: null, error: error.message || "Gagal mengunggah file." };
  }
}

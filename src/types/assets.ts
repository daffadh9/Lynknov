export type AssetKind = "image" | "audio" | "embed";
export type AssetSource = "upload" | "google_drive" | "embed";
export type AssetCategory =
  | "avatar"
  | "cover"
  | "portfolio"
  | "showcase"
  | "brand"
  | "gallery"
  | "audio"
  | "other";

export interface AssetFolder {
  id: string;
  user_id: string;
  name: string;
  slug: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserAsset {
  id: string;
  user_id: string;
  folder_id: string | null;
  name: string;
  original_file_name: string | null;
  asset_kind: AssetKind;
  asset_source: AssetSource;
  asset_category: AssetCategory;
  mime_type: string | null;
  extension: string | null;
  file_size: number | null;
  storage_bucket: string | null;
  storage_path: string | null;
  public_url: string | null;
  external_url: string | null;
  provider: string | null;
  width: number | null;
  height: number | null;
  duration_seconds: number | null;
  thumbnail_url: string | null;
  alt_text: string | null;
  description: string | null;
  metadata: Record<string, any> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AssetUsage {
  id: string;
  user_id: string;
  asset_id: string;
  page_id: string | null;
  section_key: string;
  field_key: string;
  created_at: string;
}

export interface UploadAssetParams {
  file: File;
  name?: string;
  folder_id?: string;
  asset_category?: AssetCategory;
}

export interface AssetFilter {
  category?: AssetCategory | "all";
  folder_id?: string | "all" | "unassigned";
  kind?: AssetKind | "all";
  search?: string;
}

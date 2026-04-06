-- Create Enums
CREATE TYPE asset_kind AS ENUM ('image', 'audio', 'embed');
CREATE TYPE asset_source AS ENUM ('upload', 'google_drive', 'embed');
CREATE TYPE asset_category AS ENUM ('avatar', 'cover', 'portfolio', 'showcase', 'brand', 'gallery', 'audio', 'other');

-- Create asset_folders table
CREATE TABLE asset_folders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT,
    color TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, name)
);

-- Create user_assets table
CREATE TABLE user_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    folder_id UUID REFERENCES asset_folders(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    original_file_name TEXT,
    asset_kind asset_kind NOT NULL,
    asset_source asset_source NOT NULL,
    asset_category asset_category NOT NULL DEFAULT 'other',
    mime_type TEXT,
    extension TEXT,
    file_size BIGINT,
    storage_bucket TEXT,
    storage_path TEXT,
    public_url TEXT,
    external_url TEXT,
    provider TEXT,
    width INTEGER,
    height INTEGER,
    duration_seconds INTEGER,
    thumbnail_url TEXT,
    alt_text TEXT,
    description TEXT,
    metadata JSONB,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create asset_usages table
CREATE TABLE asset_usages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES user_assets(id) ON DELETE CASCADE,
    page_id TEXT,
    section_key TEXT NOT NULL,
    field_key TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(asset_id, section_key, field_key)
);

-- Set up Row Level Security (RLS)

-- asset_folders
ALTER TABLE asset_folders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own folders" ON asset_folders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own folders" ON asset_folders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own folders" ON asset_folders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own folders" ON asset_folders FOR DELETE USING (auth.uid() = user_id);

-- user_assets
ALTER TABLE user_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own assets" ON user_assets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own assets" ON user_assets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own assets" ON user_assets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own assets" ON user_assets FOR DELETE USING (auth.uid() = user_id);

-- asset_usages
ALTER TABLE asset_usages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own asset usages" ON asset_usages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own asset usages" ON asset_usages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own asset usages" ON asset_usages FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own asset usages" ON asset_usages FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_asset_folders_user_id ON asset_folders(user_id);
CREATE INDEX idx_user_assets_user_id ON user_assets(user_id);
CREATE INDEX idx_user_assets_folder_id ON user_assets(folder_id);
CREATE INDEX idx_user_assets_category ON user_assets(asset_category);
CREATE INDEX idx_user_assets_kind ON user_assets(asset_kind);
CREATE INDEX idx_asset_usages_user_id ON asset_usages(user_id);
CREATE INDEX idx_asset_usages_asset_id ON asset_usages(asset_id);

-- Set up Storage
INSERT INTO storage.buckets (id, name, public) VALUES ('user-assets', 'user-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
CREATE POLICY "Users can upload their own assets" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (
    bucket_id = 'user-assets' AND 
    (storage.foldername(name))[1] = 'users' AND
    (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Users can update their own assets" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (
    bucket_id = 'user-assets' AND 
    (storage.foldername(name))[1] = 'users' AND
    (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Users can delete their own assets" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (
    bucket_id = 'user-assets' AND 
    (storage.foldername(name))[1] = 'users' AND
    (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Assets are publicly accessible" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'user-assets');

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_asset_folders_updated_at
    BEFORE UPDATE ON asset_folders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_assets_updated_at
    BEFORE UPDATE ON user_assets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

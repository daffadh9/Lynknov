-- Lynknov Settings Schema v2
-- Adds: profiles columns, user_preferences, user_security_settings, security_activity_logs
-- Storage: avatars bucket + policies

-- ============================================================
-- A. EXTEND PROFILES TABLE
-- ============================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS public_email text,
  ADD COLUMN IF NOT EXISTS whatsapp text,
  ADD COLUMN IF NOT EXISTS province text,
  ADD COLUMN IF NOT EXISTS city text;

-- ============================================================
-- B. USER PREFERENCES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  app_language text NOT NULL DEFAULT 'id',
  timezone text NOT NULL DEFAULT 'Asia/Jakarta',
  email_notifications_enabled boolean NOT NULL DEFAULT true,
  security_alerts_enabled boolean NOT NULL DEFAULT true,
  newsletter_enabled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- C. USER SECURITY SETTINGS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.user_security_settings (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  has_password boolean NOT NULL DEFAULT false,
  two_factor_enabled boolean NOT NULL DEFAULT false,
  risk_level text NOT NULL DEFAULT 'aman'
    CHECK (risk_level IN ('aman', 'perlu_perhatian', 'risiko_tinggi')),
  risk_reason text,
  last_password_changed_at timestamptz,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- D. SECURITY ACTIVITY LOGS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.security_activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_label text NOT NULL,
  provider text,
  device_label text,
  browser text,
  os text,
  ip_address text,
  country text,
  city text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- E. INDEXES
-- ============================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username)
  WHERE username IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_security_logs_user_created
  ON public.security_activity_logs(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_security_logs_user_event
  ON public.security_activity_logs(user_id, event_type);

-- ============================================================
-- F. UPDATED_AT TRIGGERS
-- ============================================================

DROP TRIGGER IF EXISTS trg_user_preferences_updated_at ON public.user_preferences;
CREATE TRIGGER trg_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_user_security_settings_updated_at ON public.user_security_settings;
CREATE TRIGGER trg_user_security_settings_updated_at
  BEFORE UPDATE ON public.user_security_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- G. AUTO-BOOTSTRAP TRIGGER
-- Otomatis buat record awal saat user baru mendaftar
-- ============================================================

CREATE OR REPLACE FUNCTION public.bootstrap_user_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_preferences (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.user_security_settings (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_bootstrap_user_settings ON auth.users;
CREATE TRIGGER trg_bootstrap_user_settings
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.bootstrap_user_settings();

-- ============================================================
-- H. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_security_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_activity_logs ENABLE ROW LEVEL SECURITY;

-- user_preferences policies
DROP POLICY IF EXISTS "prefs_select_own" ON public.user_preferences;
CREATE POLICY "prefs_select_own"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "prefs_insert_own" ON public.user_preferences;
CREATE POLICY "prefs_insert_own"
  ON public.user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "prefs_update_own" ON public.user_preferences;
CREATE POLICY "prefs_update_own"
  ON public.user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- user_security_settings policies
DROP POLICY IF EXISTS "security_select_own" ON public.user_security_settings;
CREATE POLICY "security_select_own"
  ON public.user_security_settings FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "security_insert_own" ON public.user_security_settings;
CREATE POLICY "security_insert_own"
  ON public.user_security_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "security_update_own" ON public.user_security_settings;
CREATE POLICY "security_update_own"
  ON public.user_security_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- security_activity_logs policies
DROP POLICY IF EXISTS "logs_select_own" ON public.security_activity_logs;
CREATE POLICY "logs_select_own"
  ON public.security_activity_logs FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "logs_insert_own" ON public.security_activity_logs;
CREATE POLICY "logs_insert_own"
  ON public.security_activity_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- I. STORAGE BUCKET: avatars
-- Bucket public, max 2MB, hanya jpg/png/webp
-- Path: avatars/{user_id}/avatar-{timestamp}.{ext}
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  VALUES (
    'avatars',
    'avatars',
    true,
    2097152,
    ARRAY['image/jpeg', 'image/png', 'image/webp']
  )
  ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 2097152,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- Storage policies
DROP POLICY IF EXISTS "avatars_public_read" ON storage.objects;
CREATE POLICY "avatars_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "avatars_insert_own" ON storage.objects;
CREATE POLICY "avatars_insert_own"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "avatars_update_own" ON storage.objects;
CREATE POLICY "avatars_update_own"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "avatars_delete_own" ON storage.objects;
CREATE POLICY "avatars_delete_own"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

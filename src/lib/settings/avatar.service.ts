import { createClient } from '@/lib/supabase/client';

const BUCKET = 'avatars';
const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function validateAvatarFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Format tidak valid. Gunakan JPG, PNG, atau WEBP.';
  }
  if (file.size > MAX_SIZE) {
    return 'Ukuran file terlalu besar. Maksimal 2MB.';
  }
  return null;
}

export async function uploadAvatar(userId: string, file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.type === 'image/webp' ? 'webp' : file.type === 'image/png' ? 'png' : 'jpg';
  const path = `${userId}/avatar-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    if (uploadError.message?.includes('Bucket not found')) {
      throw new Error('Upload foto gagal. Konfigurasi penyimpanan belum siap. Hubungi admin.');
    }
    throw new Error('Upload foto gagal. Periksa format file atau coba lagi.');
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteOldAvatar(avatarUrl: string, userId: string): Promise<void> {
  try {
    const supabase = createClient();
    const url = new URL(avatarUrl);
    const segments = url.pathname.split(`/object/public/${BUCKET}/`);
    if (segments.length < 2) return;
    const filePath = decodeURIComponent(segments[1]);
    if (!filePath.startsWith(`${userId}/`)) return;
    await supabase.storage.from(BUCKET).remove([filePath]);
  } catch {
    // Non-critical cleanup, fail silently
  }
}

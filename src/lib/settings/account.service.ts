import { createClient } from '@/lib/supabase/client';

export interface ProfileData {
  id: string;
  full_name: string | null;
  username: string | null;
  headline: string | null;
  bio: string | null;
  avatar_url: string | null;
  public_email: string | null;
  whatsapp: string | null;
  province: string | null;
  city: string | null;
  contact_email: string | null;
}

export async function getProfile(userId: string): Promise<ProfileData | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, username, headline, bio, avatar_url, public_email, whatsapp, province, city, contact_email')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data as ProfileData | null;
}

export async function upsertProfile(userId: string, updates: Partial<Omit<ProfileData, 'id'>>) {
  const supabase = createClient();
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...updates }, { onConflict: 'id' });

  if (error) throw error;
}

export async function checkUsernameAvailable(
  username: string,
  currentUserId: string
): Promise<boolean> {
  const supabase = createClient();
  const { data } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .neq('id', currentUserId)
    .maybeSingle();

  return !data;
}

export interface ProfileCompletion {
  score: number;
  label: 'Belum siap' | 'Hampir siap' | 'Siap';
  status: 'incomplete' | 'warning' | 'success';
}

export function calculateProfileCompletion(profile: Partial<ProfileData> | null): ProfileCompletion {
  if (!profile) return { score: 0, label: 'Belum siap', status: 'incomplete' };

  const fields: (string | null | undefined)[] = [
    profile.avatar_url,
    profile.full_name,
    profile.username,
    profile.headline,
    profile.bio,
    profile.public_email,
    profile.whatsapp,
    profile.province,
    profile.city,
  ];

  const filled = fields.filter((f) => f && f.trim() !== '').length;
  const score = Math.round((filled / fields.length) * 100);

  let label: ProfileCompletion['label'];
  let status: ProfileCompletion['status'];

  if (score >= 90) {
    label = 'Siap';
    status = 'success';
  } else if (score >= 55) {
    label = 'Hampir siap';
    status = 'warning';
  } else {
    label = 'Belum siap';
    status = 'incomplete';
  }

  return { score, label, status };
}

import { createClient } from '@/lib/supabase/client';

export interface UserPreferences {
  user_id: string;
  app_language: string;
  timezone: string;
  email_notifications_enabled: boolean;
  security_alerts_enabled: boolean;
  newsletter_enabled: boolean;
}

const DEFAULT_PREFS: Omit<UserPreferences, 'user_id'> = {
  app_language: 'id',
  timezone: 'Asia/Jakarta',
  email_notifications_enabled: true,
  security_alerts_enabled: true,
  newsletter_enabled: false,
};

export async function getPreferences(userId: string): Promise<UserPreferences> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    // Bootstrap if record doesn't exist
    const newPrefs = { user_id: userId, ...DEFAULT_PREFS };
    await supabase.from('user_preferences').insert(newPrefs);
    return newPrefs;
  }

  return data as UserPreferences;
}

export async function updatePreferences(
  userId: string,
  updates: Partial<Omit<UserPreferences, 'user_id'>>
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('user_preferences')
    .upsert({ user_id: userId, ...updates }, { onConflict: 'user_id' });

  if (error) throw error;
}

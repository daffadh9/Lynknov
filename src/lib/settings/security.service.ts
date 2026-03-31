import { createClient } from '@/lib/supabase/client';

export interface SecuritySettings {
  user_id: string;
  has_password: boolean;
  two_factor_enabled: boolean;
  risk_level: 'aman' | 'perlu_perhatian' | 'risiko_tinggi';
  risk_reason: string | null;
  last_password_changed_at: string | null;
  last_login_at: string | null;
}

const DEFAULT_SECURITY: Omit<SecuritySettings, 'user_id'> = {
  has_password: false,
  two_factor_enabled: false,
  risk_level: 'aman',
  risk_reason: null,
  last_password_changed_at: null,
  last_login_at: null,
};

export async function getSecuritySettings(userId: string): Promise<SecuritySettings> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_security_settings')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    const record = { user_id: userId, ...DEFAULT_SECURITY };
    await supabase.from('user_security_settings').insert(record);
    return record;
  }

  return data as SecuritySettings;
}

export async function updateSecuritySettings(
  userId: string,
  updates: Partial<Omit<SecuritySettings, 'user_id'>>
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('user_security_settings')
    .upsert({ user_id: userId, ...updates }, { onConflict: 'user_id' });

  if (error) throw error;
}

export interface TOTPFactor {
  id: string;
  status: string;
  friendly_name?: string;
}

export async function listTOTPFactors(): Promise<TOTPFactor[]> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.mfa.listFactors();
  if (error) throw error;
  return (data?.totp ?? []) as TOTPFactor[];
}

export async function enrollTOTP(): Promise<{
  factorId: string;
  qrCode: string;
  secret: string;
  uri: string;
}> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: 'totp',
    friendlyName: 'Lynknov Authenticator',
  });
  if (error) throw error;

  return {
    factorId: data.id,
    qrCode: data.totp.qr_code,
    secret: data.totp.secret,
    uri: data.totp.uri,
  };
}

export async function verifyTOTP(factorId: string, code: string): Promise<void> {
  const supabase = createClient();
  const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
    factorId,
  });
  if (challengeError) throw challengeError;

  const { error: verifyError } = await supabase.auth.mfa.verify({
    factorId,
    challengeId: challengeData.id,
    code,
  });
  if (verifyError) throw verifyError;
}

export async function unenrollTOTP(factorId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.mfa.unenroll({ factorId });
  if (error) throw error;
}

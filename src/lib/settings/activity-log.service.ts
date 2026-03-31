import { createClient } from '@/lib/supabase/client';

export interface SecurityEventParams {
  userId: string;
  eventType: string;
  eventLabel: string;
  provider?: string;
  deviceLabel?: string;
  browser?: string;
  os?: string;
  ipAddress?: string;
  city?: string;
  country?: string;
  metadata?: Record<string, unknown>;
}

export interface SecurityActivityLog {
  id: string;
  user_id: string;
  event_type: string;
  event_label: string;
  provider: string | null;
  device_label: string | null;
  browser: string | null;
  os: string | null;
  ip_address: string | null;
  country: string | null;
  city: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export async function logSecurityEvent(params: SecurityEventParams): Promise<void> {
  try {
    const supabase = createClient();
    await supabase.from('security_activity_logs').insert({
      user_id: params.userId,
      event_type: params.eventType,
      event_label: params.eventLabel,
      provider: params.provider ?? null,
      device_label: params.deviceLabel ?? null,
      browser: params.browser ?? null,
      os: params.os ?? null,
      ip_address: params.ipAddress ?? null,
      city: params.city ?? null,
      country: params.country ?? null,
      metadata: params.metadata ?? {},
    });
  } catch {
    // Non-critical, fail silently to not disrupt main flows
  }
}

export async function getRecentSecurityEvents(
  userId: string,
  limit = 20
): Promise<SecurityActivityLog[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('security_activity_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as SecurityActivityLog[];
}

export function detectBrowserOS(): { browser: string; os: string; deviceLabel: string } {
  if (typeof window === 'undefined') {
    return { browser: 'Unknown', os: 'Unknown', deviceLabel: 'Perangkat tidak diketahui' };
  }

  const ua = navigator.userAgent;

  let os = 'Unknown';
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Mac OS X/i.test(ua)) os = 'macOS';
  else if (/iPhone|iPad/i.test(ua)) os = 'iOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Linux/i.test(ua)) os = 'Linux';

  let browser = 'Unknown';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/Chrome/i.test(ua) && !/Chromium/i.test(ua)) browser = 'Chrome';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
  else if (/Opera|OPR/i.test(ua)) browser = 'Opera';

  const deviceLabel = `${os} — ${browser}`;
  return { browser, os, deviceLabel };
}

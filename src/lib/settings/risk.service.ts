import { SecurityActivityLog } from './activity-log.service';

const SENSITIVE_EVENTS = new Set([
  'password_changed',
  'password_reset_completed',
  'mfa_disabled',
  'provider_linked_google',
  'provider_linked_github',
  'provider_unlinked_google',
  'provider_unlinked_github',
]);

const HIGH_RISK_COMBOS: Array<[string, string]> = [
  ['password_reset_completed', 'provider_unlinked_google'],
  ['password_reset_completed', 'provider_unlinked_github'],
  ['password_reset_completed', 'provider_linked_google'],
  ['password_reset_completed', 'provider_linked_github'],
  ['mfa_disabled', 'password_changed'],
  ['mfa_disabled', 'provider_linked_google'],
  ['mfa_disabled', 'provider_linked_github'],
];

const EVENT_REASON_MAP: Record<string, string> = {
  password_changed: 'Kata sandi baru saja diubah.',
  password_reset_completed: 'Reset kata sandi baru saja dilakukan.',
  mfa_disabled: 'Verifikasi 2 langkah baru saja dinonaktifkan.',
  provider_linked_google: 'Metode masuk Google baru saja ditambahkan.',
  provider_linked_github: 'Metode masuk GitHub baru saja ditambahkan.',
  provider_unlinked_google: 'Metode masuk Google baru saja diputus.',
  provider_unlinked_github: 'Metode masuk GitHub baru saja diputus.',
};

export interface RiskResult {
  level: 'aman' | 'perlu_perhatian' | 'risiko_tinggi';
  reason: string;
}

export function calculateRiskLevel(recentEvents: SecurityActivityLog[]): RiskResult {
  if (!recentEvents || recentEvents.length === 0) {
    return { level: 'aman', reason: 'Tidak ada aktivitas mencurigakan terdeteksi.' };
  }

  const now = Date.now();
  const fourteenDaysAgo = now - 14 * 24 * 60 * 60 * 1000;
  const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000;

  const sensitiveInFourteenDays = recentEvents.filter(
    (e) => SENSITIVE_EVENTS.has(e.event_type) && new Date(e.created_at).getTime() > fourteenDaysAgo
  );

  const sensitiveInThreeDays = recentEvents.filter(
    (e) => SENSITIVE_EVENTS.has(e.event_type) && new Date(e.created_at).getTime() > threeDaysAgo
  );

  // Check high-risk combinations within 3 days
  const recentTypes = new Set(sensitiveInThreeDays.map((e) => e.event_type));
  for (const [a, b] of HIGH_RISK_COMBOS) {
    if (recentTypes.has(a) && recentTypes.has(b)) {
      return {
        level: 'risiko_tinggi',
        reason: 'Beberapa perubahan metode masuk terdeteksi dalam waktu singkat.',
      };
    }
  }

  // Attention needed if there are sensitive events within 14 days
  if (sensitiveInFourteenDays.length > 0) {
    const latest = sensitiveInFourteenDays[0];
    const reason =
      EVENT_REASON_MAP[latest.event_type] ?? 'Ada perubahan keamanan baru-baru ini.';
    return { level: 'perlu_perhatian', reason };
  }

  return { level: 'aman', reason: 'Aktivitas akun dalam kondisi normal.' };
}

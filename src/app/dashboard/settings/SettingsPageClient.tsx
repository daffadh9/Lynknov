"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, ShieldCheck, Link2, Loader2, LogOut, Eye, EyeOff, Clock, X, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { User as SupabaseUser, UserIdentity } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { getProfile, upsertProfile, checkUsernameAvailable } from "@/lib/settings/account.service";
import { getPreferences, updatePreferences as savePrefsToDB } from "@/lib/settings/preferences.service";
import { getSecuritySettings, updateSecuritySettings, listTOTPFactors, enrollTOTP, verifyTOTP, unenrollTOTP } from "@/lib/settings/security.service";
import { logSecurityEvent, getRecentSecurityEvents, detectBrowserOS } from "@/lib/settings/activity-log.service";
import type { SecurityActivityLog } from "@/lib/settings/activity-log.service";
import { calculateRiskLevel } from "@/lib/settings/risk.service";
import { getProviderState, canSafelyUnlink, unlinkProvider, linkProvider, refreshUser } from "@/lib/settings/integrations.service";
import { deleteOldAvatar } from "@/lib/settings/avatar.service";

import {
  SettingsShell,
  SettingsHeader,
  SettingsContentGrid,
} from "@/components/settings/layout-components";
import {
  SettingsSegmentedNav,
  type SegmentItem,
} from "@/components/settings/nav-components";
import {
  SpotlightSettingsCard,
  UtilitySettingsCard,
  StatusOverviewCard,
  InsightCard,
} from "@/components/settings/card-components";
import {
  ProfileAvatarField,
  TextField,
  TextareaField,
  SelectField,
  ToggleRow,
  IntegrationRow,
  SecurityStatusPill,
  SessionRow,
} from "@/components/settings/form-components";

const NAV_ITEMS: SegmentItem[] = [
  { id: "account", label: "Akun" },
  { id: "preferences", label: "Preferensi" },
  { id: "security", label: "Keamanan" },
  { id: "integrations", label: "Integrasi" },
];

// Helper: format relative time in Indonesian
function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 2) return 'baru saja';
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 30) return `${days} hari lalu`;
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function SettingsPageClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("account");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({ message: '', type: 'success', visible: false });

  // Auth user
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);

  // Account state
  const [account, setAccount] = useState({
    avatarUrl: null as string | null,
    fullName: "",
    username: "",
    professionalHeadline: "",
    shortBio: "",
    primaryEmail: "",
    publicEmail: "",
    whatsappNumber: "",
    province: "",
    city: "",
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    language: "id",
    timezone: "Asia/Jakarta",
    emailNotifications: true,
    productUpdates: false,
    securityAlerts: true,
    newsletter: false,
  });

  // Security state
  const [security, setSecurity] = useState({
    loginMethods: { google: false, github: false, email: false },
    passwordEnabled: false,
    twoFactorEnabled: false,
    activeSessionsCount: 1,
    totpFactorId: null as string | null,
  });

  // Integrations state
  const [integrations, setIntegrations] = useState({
    googleConnected: false,
    githubConnected: false,
    googleIdentity: null as UserIdentity | null,
    githubIdentity: null as UserIdentity | null,
  });

  // Activity logs + risk
  const [activityLogs, setActivityLogs] = useState<SecurityActivityLog[]>([]);
  const [riskLevel, setRiskLevel] = useState<'aman' | 'perlu_perhatian' | 'risiko_tinggi'>('aman');
  const [riskReason, setRiskReason] = useState('Aktivitas akun dalam kondisi normal.');

  // Password modal
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // 2FA modal
  const [twoFactorStep, setTwoFactorStep] = useState<'idle' | 'setup' | 'verify' | 'disable_confirm'>('idle');
  const [totpEnrollData, setTotpEnrollData] = useState<{ factorId: string; qrCode: string; secret: string } | null>(null);
  const [totpCode, setTotpCode] = useState('');
  const [totpLoading, setTotpLoading] = useState(false);

  // Provider action loading
  const [providerLoading, setProviderLoading] = useState<string | null>(null);

  // Unlink confirmation modal
  const [unlinkModal, setUnlinkModal] = useState<{
    open: boolean;
    provider: 'google' | 'github';
    canProceed: boolean;
    safeReason: string;
    blockReason: string;
  }>({ open: false, provider: 'google', canProceed: true, safeReason: '', blockReason: '' });

  // Session logout loading
  const [logoutLoading, setLogoutLoading] = useState<'local' | 'others' | null>(null);

  // --- Toast helper ---
  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
  }, []);

  // --- Profile completion (real calculation) ---
  const calculateProfileProgress = () => {
    const fields = [account.avatarUrl, account.fullName, account.username, account.professionalHeadline, account.shortBio, account.publicEmail, account.whatsappNumber, account.province, account.city];
    const filled = fields.filter(f => f && String(f).trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  };

  // --- Load all data on mount ---
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setAuthUser(user);

        const [profileData, prefsData, secData, logs, factors] = await Promise.all([
          getProfile(user.id),
          getPreferences(user.id),
          getSecuritySettings(user.id),
          getRecentSecurityEvents(user.id),
          listTOTPFactors(),
        ]);

        if (profileData) {
          setAccount({
            avatarUrl: profileData.avatar_url,
            fullName: profileData.full_name ?? '',
            username: profileData.username ?? '',
            professionalHeadline: profileData.headline ?? '',
            shortBio: profileData.bio ?? '',
            primaryEmail: user.email ?? '',
            publicEmail: profileData.public_email ?? '',
            whatsappNumber: profileData.whatsapp ?? '',
            province: profileData.province ?? '',
            city: profileData.city ?? '',
          });
        } else {
          setAccount(prev => ({ ...prev, primaryEmail: user.email ?? '' }));
        }

        if (prefsData) {
          setPreferences({
            language: prefsData.app_language,
            timezone: prefsData.timezone,
            emailNotifications: prefsData.email_notifications_enabled,
            productUpdates: false,
            securityAlerts: prefsData.security_alerts_enabled,
            newsletter: prefsData.newsletter_enabled,
          });
        }

        const provState = getProviderState(user);
        const hasEmailIdentity = provState.email;
        const hasPass = secData?.has_password || hasEmailIdentity;

        setSecurity({
          loginMethods: { google: provState.google, github: provState.github, email: hasEmailIdentity },
          passwordEnabled: hasPass,
          twoFactorEnabled: secData?.two_factor_enabled ?? false,
          activeSessionsCount: 1,
          totpFactorId: factors.find(f => f.status === 'verified')?.id ?? null,
        });

        setIntegrations({
          googleConnected: provState.google,
          githubConnected: provState.github,
          googleIdentity: provState.googleIdentity,
          githubIdentity: provState.githubIdentity,
        });

        setActivityLogs(logs);
        const risk = calculateRiskLevel(logs);
        setRiskLevel(risk.level);
        setRiskReason(risk.reason);

        // Sync DB state silently
        if (secData) {
          const activeFactor = factors.find(f => f.status === 'verified');
          const syncUpdates: Record<string, unknown> = {};
          if (secData.has_password !== hasPass) syncUpdates.has_password = hasPass;
          if (secData.two_factor_enabled !== !!activeFactor) syncUpdates.two_factor_enabled = !!activeFactor;
          if (Object.keys(syncUpdates).length > 0) await updateSecuritySettings(user.id, syncUpdates);
        }
      } catch (err) {
        console.error('Settings load error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // --- Save profile ---
  const saveProfile = async () => {
    if (!authUser) return;
    try {
      setIsSaving(true);
      if (account.username) {
        const available = await checkUsernameAvailable(account.username, authUser.id);
        if (!available) { showToast('Username ini sudah digunakan. Coba variasi lain.', 'error'); return; }
      }
      await upsertProfile(authUser.id, {
        full_name: account.fullName || null,
        username: account.username || null,
        headline: account.professionalHeadline || null,
        bio: account.shortBio || null,
        avatar_url: account.avatarUrl,
        public_email: account.publicEmail || null,
        whatsapp: account.whatsappNumber || null,
        province: account.province || null,
        city: account.city || null,
      });
      setIsEditing(false);
      showToast('Profil berhasil disimpan.');
    } catch { showToast('Gagal menyimpan profil. Coba lagi.', 'error'); }
    finally { setIsSaving(false); }
  };

  // --- Avatar auto-save ---
  const handleAvatarChange = async (url: string | null) => {
    if (!authUser || !url) return;
    const old = account.avatarUrl;
    setAccount(prev => ({ ...prev, avatarUrl: url }));
    try {
      await upsertProfile(authUser.id, { avatar_url: url });
      if (old && old !== url) deleteOldAvatar(old, authUser.id);
      showToast('Foto profil diperbarui.');
    } catch { setAccount(prev => ({ ...prev, avatarUrl: old })); showToast('Gagal menyimpan foto.', 'error'); }
  };

  // --- Auto-save preference ---
  const handlePreferenceChange = async (key: string, value: string | boolean) => {
    if (!authUser) return;
    const old = { ...preferences };
    setPreferences(prev => ({ ...prev, [key]: value }));
    try {
      const dbMap: Record<string, string> = { language: 'app_language', timezone: 'timezone', emailNotifications: 'email_notifications_enabled', securityAlerts: 'security_alerts_enabled', newsletter: 'newsletter_enabled' };
      const dbKey = dbMap[key];
      if (dbKey) await savePrefsToDB(authUser.id, { [dbKey]: value });
      showToast('Preferensi disimpan.');
    } catch { setPreferences(old); showToast('Gagal menyimpan preferensi.', 'error'); }
  };

  // --- Password flow ---
  const handlePasswordSubmit = async () => {
    if (!authUser) return;
    if (newPassword.length < 8) { showToast('Kata sandi minimal 8 karakter.', 'error'); return; }
    if (newPassword !== confirmPassword) { showToast('Konfirmasi kata sandi tidak cocok.', 'error'); return; }
    try {
      setPasswordLoading(true);
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      const isCreating = !security.passwordEnabled;
      await updateSecuritySettings(authUser.id, { has_password: true, last_password_changed_at: new Date().toISOString() });
      setSecurity(prev => ({ ...prev, passwordEnabled: true }));
      const { deviceLabel, browser, os } = detectBrowserOS();
      await logSecurityEvent({ userId: authUser.id, eventType: isCreating ? 'password_created' : 'password_changed', eventLabel: isCreating ? 'Kata sandi berhasil dibuat' : 'Kata sandi berhasil diubah', deviceLabel, browser, os });
      const logs = await getRecentSecurityEvents(authUser.id);
      setActivityLogs(logs); const r = calculateRiskLevel(logs); setRiskLevel(r.level); setRiskReason(r.reason);
      setPasswordModalOpen(false); setNewPassword(''); setConfirmPassword('');
      showToast(isCreating ? 'Kata sandi berhasil dibuat.' : 'Kata sandi berhasil diubah.');
    } catch (err) { showToast(`Gagal: ${err instanceof Error ? err.message : 'Terjadi kesalahan.'}`, 'error'); }
    finally { setPasswordLoading(false); }
  };

  // --- 2FA flow ---
  const startEnroll2FA = async () => {
    try {
      setTotpLoading(true);
      const data = await enrollTOTP();
      setTotpEnrollData(data); setTwoFactorStep('setup');
    } catch (err) { showToast(`Gagal memulai 2FA: ${err instanceof Error ? err.message : ''}`, 'error'); }
    finally { setTotpLoading(false); }
  };

  const verifyEnroll2FA = async () => {
    if (!authUser || !totpEnrollData || totpCode.length !== 6) return;
    try {
      setTotpLoading(true);
      await verifyTOTP(totpEnrollData.factorId, totpCode);
      await updateSecuritySettings(authUser.id, { two_factor_enabled: true });
      setSecurity(prev => ({ ...prev, twoFactorEnabled: true, totpFactorId: totpEnrollData.factorId }));
      const { deviceLabel, browser, os } = detectBrowserOS();
      await logSecurityEvent({ userId: authUser.id, eventType: 'mfa_enabled', eventLabel: 'Verifikasi 2 langkah diaktifkan', deviceLabel, browser, os });
      const logs = await getRecentSecurityEvents(authUser.id);
      setActivityLogs(logs); const r = calculateRiskLevel(logs); setRiskLevel(r.level); setRiskReason(r.reason);
      setTwoFactorStep('idle'); setTotpEnrollData(null); setTotpCode('');
      showToast('Verifikasi 2 langkah berhasil diaktifkan.');
    } catch (err) { showToast(`Kode tidak valid: ${err instanceof Error ? err.message : ''}`, 'error'); }
    finally { setTotpLoading(false); }
  };

  const disable2FA = async () => {
    if (!authUser || !security.totpFactorId) return;
    try {
      setTotpLoading(true);
      await unenrollTOTP(security.totpFactorId);
      await updateSecuritySettings(authUser.id, { two_factor_enabled: false });
      setSecurity(prev => ({ ...prev, twoFactorEnabled: false, totpFactorId: null }));
      const { deviceLabel, browser, os } = detectBrowserOS();
      await logSecurityEvent({ userId: authUser.id, eventType: 'mfa_disabled', eventLabel: 'Verifikasi 2 langkah dinonaktifkan', deviceLabel, browser, os });
      const logs = await getRecentSecurityEvents(authUser.id);
      setActivityLogs(logs); const r = calculateRiskLevel(logs); setRiskLevel(r.level); setRiskReason(r.reason);
      setTwoFactorStep('idle');
      showToast('Verifikasi 2 langkah dinonaktifkan.');
    } catch (err) { showToast(`Gagal: ${err instanceof Error ? err.message : ''}`, 'error'); }
    finally { setTotpLoading(false); }
  };

  // --- Sessions ---
  const logoutCurrentDevice = async () => {
    if (!authUser) return;
    try {
      setLogoutLoading('local');
      const { deviceLabel, browser, os } = detectBrowserOS();
      await logSecurityEvent({ userId: authUser.id, eventType: 'logout_local', eventLabel: 'Keluar dari perangkat ini', deviceLabel, browser, os });
      const supabase = createClient();
      await supabase.auth.signOut({ scope: 'local' });
      router.push('/login');
    } catch { showToast('Gagal keluar. Coba lagi.', 'error'); setLogoutLoading(null); }
  };

  const logoutOtherDevices = async () => {
    if (!authUser) return;
    try {
      setLogoutLoading('others');
      const supabase = createClient();
      await supabase.auth.signOut({ scope: 'others' });
      const { deviceLabel, browser, os } = detectBrowserOS();
      await logSecurityEvent({ userId: authUser.id, eventType: 'logout_others', eventLabel: 'Keluar dari semua perangkat lain', deviceLabel, browser, os });
      showToast('Berhasil keluar dari semua perangkat lain.');
    } catch { showToast('Gagal. Coba lagi.', 'error'); }
    finally { setLogoutLoading(null); }
  };

  // --- Provider connect/disconnect ---
  const handleProviderToggle = async (provider: 'google' | 'github') => {
    if (!authUser) return;
    const isConnected = provider === 'google' ? integrations.googleConnected : integrations.githubConnected;
    const identity = provider === 'google' ? integrations.googleIdentity : integrations.githubIdentity;

    if (isConnected && identity) {
      const check = canSafelyUnlink(provider, { google: integrations.googleConnected, github: integrations.githubConnected, email: security.loginMethods.email, googleIdentity: integrations.googleIdentity, githubIdentity: integrations.githubIdentity }, security.passwordEnabled);
      const providerLabel = provider === 'google' ? 'Google' : 'GitHub';
      const otherMethods = [provider !== 'google' && integrations.googleConnected && 'Google', provider !== 'github' && integrations.githubConnected && 'GitHub', security.passwordEnabled && 'kata sandi'].filter(Boolean).join(' atau ');
      setUnlinkModal({
        open: true,
        provider,
        canProceed: check.canUnlink,
        safeReason: otherMethods ? `Kamu masih bisa masuk menggunakan ${otherMethods}.` : '',
        blockReason: check.reason ?? `${providerLabel} adalah satu-satunya metode masuk. Tambahkan metode lain sebelum memutus koneksi ini.`,
      });
    } else {
      try {
        setProviderLoading(provider);
        await linkProvider(provider);
      } catch (err) { showToast(`Gagal menghubungkan: ${err instanceof Error ? err.message : ''}`, 'error'); setProviderLoading(null); }
    }
  };

  const confirmUnlink = async () => {
    if (!authUser || !unlinkModal.canProceed) return;
    const { provider } = unlinkModal;
    const identity = provider === 'google' ? integrations.googleIdentity : integrations.githubIdentity;
    if (!identity) return;
    setUnlinkModal(prev => ({ ...prev, open: false }));
    try {
      setProviderLoading(provider);
      await unlinkProvider(identity);
      await logSecurityEvent({ userId: authUser.id, eventType: `provider_unlinked_${provider}`, eventLabel: `${provider === 'google' ? 'Google' : 'GitHub'} diputus dari akun`, provider });
      const updatedUser = await refreshUser();
      if (updatedUser) {
        const ps = getProviderState(updatedUser);
        setIntegrations({ googleConnected: ps.google, githubConnected: ps.github, googleIdentity: ps.googleIdentity, githubIdentity: ps.githubIdentity });
        setSecurity(prev => ({ ...prev, loginMethods: { ...prev.loginMethods, [provider]: false } }));
      }
      const logs = await getRecentSecurityEvents(authUser.id);
      setActivityLogs(logs); const r = calculateRiskLevel(logs); setRiskLevel(r.level); setRiskReason(r.reason);
      showToast(`${provider === 'google' ? 'Google' : 'GitHub'} berhasil diputus dari akun.`);
    } catch (err) { showToast(`Gagal: ${err instanceof Error ? err.message : ''}`, 'error'); }
    finally { setProviderLoading(null); }
  };

  // --- State updater (kept for compatibility) ---
  const updateAccount = (key: keyof typeof account, value: string | null) => {
    setAccount(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsShell>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-white/30" />
            <span className="text-sm text-[var(--color-text-secondary)]">Memuat pengaturan...</span>
          </div>
        </div>
      ) : (
        <>
      {/* Toast Notification */}
      {toast.visible && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl text-sm font-medium transition-all animate-fade-in ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
          {toast.message}
          <button onClick={() => setToast(prev => ({ ...prev, visible: false }))} className="ml-2 opacity-60 hover:opacity-100"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {/* Header Area */}
      <SettingsHeader
        title="Pengaturan"
        subtitle="Kelola identitas akun, preferensi dasar, dan keamanan utama Lynknov milikmu."
        rightElement={
          <div className="flex items-center gap-3">
            {activeTab === "account" && !isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 text-sm font-medium bg-[var(--color-surface-elevated)] hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all shadow-sm"
              >
                Edit Profil
              </button>
            ) : activeTab === "account" && isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                  className="px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  onClick={saveProfile}
                  disabled={isSaving}
                  className="px-5 py-2.5 text-sm font-semibold bg-white text-black hover:bg-white/90 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</> : "Simpan Perubahan"}
                </button>
              </>
            ) : null}
          </div>
        }
      />

      {/* Segmented Nav & Overview Strip */}
      <div className="flex flex-col gap-6 w-full -mt-2">
        <SettingsSegmentedNav
          items={NAV_ITEMS}
          activeId={activeTab}
          onChange={setActiveTab}
        />

        {/* Overview Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {activeTab === "account" && (
            <>
              <StatusOverviewCard
                label="Kelengkapan Profil"
                value={`${calculateProfileProgress()}%`}
                status={calculateProfileProgress() >= 90 ? "success" : calculateProfileProgress() >= 70 ? "warning" : "incomplete"}
                badgeText={calculateProfileProgress() >= 90 ? "Siap tampil" : calculateProfileProgress() >= 70 ? "Hampir siap" : "Perlu dilengkapi"}
                icon={User}
              />
              <StatusOverviewCard
                label="Email Publik"
                value={account.publicEmail ? "Diatur" : "Belum diatur"}
                status={account.publicEmail ? "success" : "optional"}
                badgeText={account.publicEmail ? "Aktif" : "Opsional"}
                icon={Mail}
              />
              <StatusOverviewCard
                label="Identitas Publik"
                value={account.username ? "Tersedia" : "Belum diatur"}
                status={account.username ? "active" : "incomplete"}
                badgeText={account.username ? "lynknov.com/u/" + account.username : "Wajib diisi"}
                icon={Link2}
              />
              <StatusOverviewCard
                label="Kesiapan Halaman"
                value={calculateProfileProgress() >= 90 ? "Siap" : "Belum Siap"}
                status={calculateProfileProgress() >= 90 ? "success" : "warning"}
                badgeText={calculateProfileProgress() >= 90 ? "Profesional" : "Lengkapi profil"}
                icon={ShieldCheck}
              />
            </>
          )}

          {activeTab === "preferences" && (
            <>
              <StatusOverviewCard
                label="Bahasa Aplikasi"
                value={preferences.language === "id" ? "Indonesia" : "English"}
                status="active"
                badgeText="Aktif"
                icon={User}
              />
              <StatusOverviewCard
                label="Zona Waktu"
                value={preferences.timezone.split('/')[1] || preferences.timezone}
                status="neutral"
                badgeText="Lokal"
                icon={ShieldCheck}
              />
              <StatusOverviewCard
                label="Notifikasi Email"
                value={preferences.emailNotifications ? "Aktif" : "Nonaktif"}
                status={preferences.emailNotifications ? "active" : "disabled"}
                badgeText={preferences.emailNotifications ? "Menyala" : "Mati"}
                icon={Mail}
              />
              <StatusOverviewCard
                label="Peringatan Keamanan"
                value={preferences.securityAlerts ? "Aktif" : "Nonaktif"}
                status={preferences.securityAlerts ? "safe" : "warning"}
                badgeText={preferences.securityAlerts ? "Aman" : "Perlu diaktifkan"}
                icon={ShieldCheck}
              />
            </>
          )}

          {activeTab === "security" && (
            <>
              <StatusOverviewCard
                label="Status Sandi"
                value={security.passwordEnabled ? "Aman" : "Perlu diatur"}
                status={security.passwordEnabled ? "safe" : "error"}
                badgeText={security.passwordEnabled ? "Terlindungi" : "Rentan"}
                icon={ShieldCheck}
              />
              <StatusOverviewCard
                label="Metode Masuk"
                value={`${Object.values(security.loginMethods).filter(Boolean).length} aktif`}
                status="active"
                badgeText="Aman"
                icon={Link2}
              />
              <StatusOverviewCard
                label="Sesi Aktif"
                value={`${security.activeSessionsCount} perangkat`}
                status="brand"
                badgeText="Terpantau"
                icon={User}
              />
              <StatusOverviewCard
                label="Verifikasi Tambahan"
                value={security.twoFactorEnabled ? "Aktif" : "Belum aktif"}
                status={security.twoFactorEnabled ? "safe" : "optional"}
                badgeText={security.twoFactorEnabled ? "Terlindungi" : "Disarankan"}
                icon={ShieldCheck}
              />
            </>
          )}

          {activeTab === "integrations" && (
            <>
              <StatusOverviewCard
                label="Akun Terhubung"
                value={`${(integrations.googleConnected ? 1 : 0) + (integrations.githubConnected ? 1 : 0)} akun`}
                status="active"
                badgeText="Aktif"
                icon={Link2}
              />
              <StatusOverviewCard
                label="Login Cepat"
                value={integrations.googleConnected ? "Google" : "Belum diatur"}
                status={integrations.googleConnected ? "success" : "optional"}
                badgeText={integrations.googleConnected ? "Tersedia" : "Disarankan"}
                icon={User}
              />
              <StatusOverviewCard
                label="Sinkronisasi Dasar"
                value={integrations.googleConnected ? "Berjalan" : "Terhenti"}
                status={integrations.googleConnected ? "active" : "disabled"}
                badgeText="Otomatis"
                icon={ShieldCheck}
              />
              <StatusOverviewCard
                label="Integrasi Tambahan"
                value="GitHub & lainnya"
                status="optional"
                badgeText="Segera hadir"
                icon={Link2}
              />
            </>
          )}
        </div>
      </div>

      {/* Dynamic Content Grid based on active Tab */}
      <div className="animate-fade-in mt-2 w-full pb-20">
        {activeTab === "account" && (
          <SettingsContentGrid>
            {/* Spotlight Card */}
            <div className="col-span-1 md:col-span-7 flex w-full">
              <SpotlightSettingsCard
                title="Identitas Profil"
                description="Isi identitas utama yang akan membentuk kesan pertama akunmu."
              >
                <div className="flex flex-col gap-6 h-full">
                  <ProfileAvatarField
                    value={account.avatarUrl}
                    onChange={handleAvatarChange}
                    disabled={false}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <TextField
                      label="Nama Lengkap"
                      value={account.fullName}
                      onChange={(val) => updateAccount("fullName", val)}
                      placeholder="Daffa Dhiyaulhaq Khadafi"
                      disabled={!isEditing}
                    />
                    <TextField
                      label="Username / Handle"
                      value={account.username}
                      onChange={(val) => updateAccount("username", val)}
                      placeholder="daffa"
                      helperText="Digunakan untuk identitas profil dan URL publik."
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <TextField
                    label="Headline Profesi"
                    value={account.professionalHeadline}
                    onChange={(val) => updateAccount("professionalHeadline", val)}
                    placeholder="Product Designer & Vibe Coder"
                    helperText="Tulis peran utama yang paling mewakili kamu."
                    disabled={!isEditing}
                  />
                  
                  <TextareaField
                    label="Bio Singkat"
                    value={account.shortBio}
                    onChange={(val) => updateAccount("shortBio", val)}
                    placeholder="Membangun pengalaman digital yang lebih premium..."
                    helperText="Singkat, jelas, dan mencerminkan value utamamu."
                    disabled={!isEditing}
                  />
                </div>
              </SpotlightSettingsCard>
            </div>

            {/* Utility Card */}
            <div className="col-span-1 md:col-span-5 flex flex-col gap-6 w-full">
              <UtilitySettingsCard
                title="Kontak Utama"
                description="Tambahkan informasi kontak yang relevan agar akunmu lebih siap digunakan."
                className="h-full"
              >
                <TextField
                  label="Email Akun"
                  value={account.primaryEmail}
                  onChange={() => {}}
                  placeholder="nama@email.com"
                  helperText="Email login akunmu. Tidak dapat diubah dari sini. (Tidak tampil publik)"
                  type="email"
                  disabled={true}
                />
                <TextField
                  label="Email Publik"
                  value={account.publicEmail}
                  onChange={(val) => updateAccount("publicEmail", val)}
                  placeholder="hello@brand.com"
                  helperText="Opsional. Tampilkan jika ingin terlihat lebih profesional kepada pengunjung profil."
                  type="email"
                  disabled={!isEditing}
                />
                <TextField
                  label="WhatsApp (Opsional)"
                  value={account.whatsappNumber}
                  onChange={(val) => updateAccount("whatsappNumber", val)}
                  placeholder="62812xxxxxxxx"
                  helperText="Gunakan nomor yang aktif jika ingin klien bisa menghubungimu."
                  type="tel"
                  disabled={!isEditing}
                />
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    label="Provinsi"
                    value={account.province}
                    onChange={(val) => updateAccount("province", val)}
                    options={[
                      { value: "", label: "Pilih provinsi" },
                      { value: "Aceh", label: "Aceh" },
                      { value: "DKI Jakarta", label: "DKI Jakarta" },
                      { value: "Jawa Barat", label: "Jawa Barat" },
                      { value: "Jawa Tengah", label: "Jawa Tengah" },
                      { value: "Jawa Timur", label: "Jawa Timur" },
                      { value: "Banten", label: "Banten" },
                      { value: "Bali", label: "Bali" },
                      { value: "Sulawesi Selatan", label: "Sulawesi Selatan" },
                      { value: "Kalimantan Timur", label: "Kalimantan Timur" },
                      { value: "Sumatera Utara", label: "Sumatera Utara" },
                      { value: "Sumatera Selatan", label: "Sumatera Selatan" },
                    ]}
                    disabled={!isEditing}
                  />
                  <TextField
                    label="Kota/Kab"
                    value={account.city}
                    onChange={(val) => updateAccount("city", val)}
                    placeholder="Bandung"
                    disabled={!isEditing}
                  />
                </div>
              </UtilitySettingsCard>
            </div>

            {/* Smart Account Notes */}
            <div className="col-span-1 md:col-span-12 w-full mt-2">
              {account.username && !account.publicEmail ? (
                <InsightCard
                  message="Username sudah siap digunakan sebagai identitas publik. Email publik belum diisi — tambahkan jika ingin terlihat lebih profesional kepada pengunjung profil."
                  type="info"
                />
              ) : !account.username ? (
                <InsightCard
                  message="Username belum diisi. Lengkapi username agar profilmu bisa diakses melalui URL publik lynknov.com/u/username-kamu."
                  type="warning"
                />
              ) : (
                <InsightCard
                  message={`Profil ${calculateProfileProgress()}% lengkap. ${calculateProfileProgress() >= 90 ? 'Profilmu sudah siap tampil secara profesional.' : 'Lengkapi sisa informasi agar profilmu lebih optimal.'}`}
                  type="info"
                />
              )}
            </div>
          </SettingsContentGrid>
        )}

        {activeTab === "preferences" && (
          <SettingsContentGrid>
            <div className="col-span-1 md:col-span-7 flex w-full">
              <UtilitySettingsCard
                title="Bahasa & Wilayah"
                description="Atur pengalaman dasar aplikasi sesuai kebutuhanmu."
              >
                <SelectField
                  label="Bahasa Aplikasi"
                  value={preferences.language}
                  onChange={(val) => handlePreferenceChange("language", val)}
                  options={[
                    { value: "id", label: "Bahasa Indonesia" },
                    { value: "en", label: "English" },
                  ]}
                  helperText="Pilih bahasa utama yang ingin kamu gunakan di area aplikasi."
                />
                <SelectField
                  label="Zona Waktu"
                  value={preferences.timezone}
                  onChange={(val) => handlePreferenceChange("timezone", val)}
                  options={[
                    { value: "Asia/Jakarta", label: "Asia/Jakarta (WIB)" },
                    { value: "Asia/Makassar", label: "Asia/Makassar (WITA)" },
                    { value: "Asia/Jayapura", label: "Asia/Jayapura (WIT)" },
                    { value: "UTC", label: "UTC" },
                  ]}
                  helperText="Digunakan untuk waktu aktivitas, notifikasi, dan penjadwalan."
                />
              </UtilitySettingsCard>
            </div>

            <div className="col-span-1 md:col-span-5 flex w-full">
              <UtilitySettingsCard
                title="Notifikasi"
                description="Atur preferensi notifikasi seperlunya agar tetap informatif tanpa terasa terlalu penuh."
              >
                <div className="flex flex-col">
                  <ToggleRow
                    label="Notifikasi Email"
                    description="Terima notifikasi penting terkait aktivitas layanan dan pembaharuan produk utama."
                    enabled={preferences.emailNotifications}
                    onChange={(val) => handlePreferenceChange("emailNotifications", val)}
                  />
                  <ToggleRow
                    label="Peringatan Keamanan"
                    description="Aktifkan untuk menerima peringatan percobaan masuk dan aktivitas keamanan mencurigakan."
                    enabled={preferences.securityAlerts}
                    onChange={(val) => handlePreferenceChange("securityAlerts", val)}
                  />
                  <ToggleRow
                    label="WhatsApp Notification"
                    description="Notifikasi instan via WhatsApp untuk update penting."
                    enabled={false}
                    onChange={() => {}}
                    disabled={true}
                    badgeText="Segera hadir"
                  />
                </div>
              </UtilitySettingsCard>
            </div>
          </SettingsContentGrid>
        )}

        {activeTab === "security" && (
          <SettingsContentGrid>
            <div className="col-span-1 md:col-span-5 flex w-full">
              <UtilitySettingsCard
                title="Metode Masuk"
                description="Metode yang terhubung untuk masuk ke akunmu."
              >
                <div className="flex flex-col gap-0">
                  {[
                    { key: 'google', label: 'Google', active: security.loginMethods.google, icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    )},
                    { key: 'github', label: 'GitHub', active: security.loginMethods.github, icon: (
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                    )},
                    { key: 'email', label: 'Email & Kata Sandi', active: security.loginMethods.email || security.passwordEnabled, icon: <Mail className="w-3.5 h-3.5 text-white/60" /> },
                  ].map((method, i) => (
                    <div key={method.key} className={`flex items-center justify-between py-3 ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">{method.icon}</div>
                        <span className="text-sm font-medium text-white/90">{method.label}</span>
                      </div>
                      {method.active
                        ? <span className="text-xs font-semibold text-emerald-400">AKTIF</span>
                        : <span className="text-xs font-semibold text-white/30">TIDAK AKTIF</span>}
                    </div>
                  ))}
                </div>
              </UtilitySettingsCard>
            </div>

            <div className="col-span-1 md:col-span-7 flex w-full">
              <UtilitySettingsCard
                title="Sandi & Akses"
                description="Pastikan akses akunmu tetap aman dan mudah dikelola."
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/[0.04]">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-white/90">Status Sandi</span>
                        <SecurityStatusPill secure={security.passwordEnabled} />
                      </div>
                      <span className="text-[13px] text-[var(--color-text-secondary)]">Sandi aktif digunakan untuk login profilmu.</span>
                    </div>
                    <button
                      onClick={() => setPasswordModalOpen(true)}
                      className="px-4 py-2 text-sm font-medium text-white border border-white/10 hover:bg-white/5 rounded-xl transition-colors shrink-0"
                    >
                      {security.passwordEnabled ? 'Ubah Kata Sandi' : 'Buat Kata Sandi'}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-white/90">Verifikasi 2 Langkah (2FA)</span>
                        {security.twoFactorEnabled && <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wide">AKTIF</span>}
                      </div>
                      <span className="text-[13px] text-[var(--color-text-secondary)]">
                        {security.twoFactorEnabled ? 'Akunmu terlindungi lapisan keamanan tambahan via aplikasi autentikasi.' : 'Tambahkan lapisan keamanan ekstra menggunakan aplikasi autentikasi (TOTP).'}
                      </span>
                    </div>
                    {security.twoFactorEnabled ? (
                      <button
                        onClick={() => setTwoFactorStep('disable_confirm')}
                        className="px-4 py-2 text-sm font-medium text-red-400 border border-red-400/20 hover:bg-red-500/10 rounded-xl transition-colors shrink-0"
                      >
                        Nonaktifkan
                      </button>
                    ) : (
                      <button
                        onClick={startEnroll2FA}
                        disabled={totpLoading}
                        className="px-4 py-2 text-sm font-medium text-white border border-white/10 hover:bg-white/5 rounded-xl transition-colors shrink-0 disabled:opacity-50 flex items-center gap-2"
                      >
                        {totpLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Memuat...</> : 'Aktifkan 2FA'}
                      </button>
                    )}
                  </div>
                </div>
              </UtilitySettingsCard>
            </div>

            <div className="col-span-1 md:col-span-12 flex flex-col md:flex-row gap-6 w-full mt-2">
              <div className="basis-1/2 flex w-full">
                <UtilitySettingsCard
                  title="Log Aktivitas Riwayat"
                  description="Aktivitas keamanan penting pada akunmu baru-baru ini."
                  className="h-full"
                >
                    {activityLogs.length === 0 ? (
                    <p className="text-sm text-[var(--color-text-secondary)] py-4">Belum ada aktivitas keamanan yang tercatat.</p>
                  ) : (
                    <div className="flex flex-col gap-0 text-sm">
                      {activityLogs.slice(0, 6).map((log, i) => (
                        <div key={log.id} className={`flex items-start justify-between gap-3 py-3 ${i < Math.min(activityLogs.length, 6) - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                          <div className="flex items-center gap-2 min-w-0">
                            <Clock className="w-3.5 h-3.5 text-white/30 shrink-0" />
                            <span className="text-white/80 font-medium tracking-tight truncate">{log.event_label}</span>
                          </div>
                          <span className="text-[var(--color-text-secondary)] text-[12px] shrink-0">{formatRelativeTime(log.created_at)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </UtilitySettingsCard>
              </div>

              <div className="basis-1/2 flex w-full">
                <UtilitySettingsCard
                  title="Sesi Aktif"
                  description="Kelola perangkat yang memiliki akses aktif ke akunmu."
                  className="h-full"
                >
                  <div className="flex flex-col gap-4">
                    <SessionRow
                      deviceOS={typeof window !== 'undefined' && /iphone|ipad|android/i.test(navigator.userAgent) ? 'mobile' : 'windows'}
                      browser={detectBrowserOS().browser}
                      isCurrent={true}
                      lastActive="Sesi ini"
                    />
                    <div className="flex flex-col gap-2 pt-3 border-t border-white/[0.04]">
                      <button
                        onClick={logoutCurrentDevice}
                        disabled={logoutLoading === 'local'}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-colors disabled:opacity-50"
                      >
                        {logoutLoading === 'local' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
                        Keluar dari perangkat ini
                      </button>
                      <button
                        onClick={logoutOtherDevices}
                        disabled={logoutLoading === 'others'}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-colors disabled:opacity-50"
                      >
                        {logoutLoading === 'others' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
                        Keluar dari perangkat lain
                      </button>
                    </div>
                  </div>
                </UtilitySettingsCard>
              </div>
            </div>

            <div className="col-span-1 md:col-span-12 w-full">
              <div className="rounded-2xl border border-white/[0.05] bg-[var(--color-surface-elevated)] overflow-hidden">
                <div className="px-6 py-5 border-b border-white/[0.04]">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${ riskLevel === 'aman' ? 'bg-emerald-400' : riskLevel === 'perlu_perhatian' ? 'bg-amber-400' : 'bg-red-400' }`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white">
                          {riskLevel === 'aman' ? 'Akun Aman' : riskLevel === 'perlu_perhatian' ? 'Perlu Perhatian' : 'Risiko Tinggi'}
                        </p>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${ riskLevel === 'aman' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : riskLevel === 'perlu_perhatian' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20' }`}>
                          {riskLevel === 'aman' ? 'AMAN' : riskLevel === 'perlu_perhatian' ? 'PERHATIAN' : 'RISIKO TINGGI'}
                        </span>
                      </div>
                      <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">{riskReason}</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">Tindakan Berbahaya</p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => { if (confirm('Nonaktifkan akun? Profilmu akan disembunyikan sementara.')) showToast('Fitur nonaktif akun akan segera tersedia.', 'error'); }}
                      className="flex items-center justify-between w-full px-4 py-3 text-left rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/10 transition-colors"
                    >
                      <span className="font-medium text-sm">Nonaktifkan akun sementara</span>
                    </button>
                    <button
                      onClick={() => { if (confirm('PERINGATAN: Hapus akun secara permanen? Semua data akan hilang dan tidak bisa dipulihkan.')) showToast('Fitur hapus akun akan segera tersedia.', 'error'); }}
                      className="flex items-center justify-between w-full px-4 py-3 text-left rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-sm">Hapus akun secara permanen</span>
                        <span className="text-[12px] text-red-400/70 font-medium">Semua data dihapus dan tidak bisa dipulihkan.</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SettingsContentGrid>
        )}

        {activeTab === "integrations" && (
          <SettingsContentGrid>
            <div className="col-span-1 md:col-span-8 flex w-full">
              <UtilitySettingsCard
                title="Akun Terhubung"
                description="Hubungkan akun penting untuk akses yang lebih praktis dan pengalaman yang lebih terhubung."
              >
                <div className="flex flex-col gap-3">
                  <IntegrationRow
                    platform="Google"
                    description="Login cepat dan sinkronisasi akun dasar via Google."
                    connected={integrations.googleConnected}
                    loading={providerLoading === 'google'}
                    onToggle={() => handleProviderToggle('google')}
                  />
                  <IntegrationRow
                    platform="GitHub"
                    description="Hubungkan akun GitHub untuk identitas developer dan koneksi ke depannya."
                    connected={integrations.githubConnected}
                    loading={providerLoading === 'github'}
                    onToggle={() => handleProviderToggle('github')}
                  />
                </div>
              </UtilitySettingsCard>
            </div>

            <div className="col-span-1 md:col-span-4 flex w-full">
              <UtilitySettingsCard
                title="Ringkasan Integrasi"
              >
                <div className="flex flex-col justify-between h-full min-h-[140px]">
                  <div className="flex items-end gap-3 pb-6 border-b border-white/[0.04]">
                    <span className="text-4xl font-semibold tracking-tighter text-white">
                      {(integrations.googleConnected ? 1 : 0) + (integrations.githubConnected ? 1 : 0)}
                    </span>
                    <span className="text-[13px] font-medium text-[var(--color-text-secondary)] mb-1 uppercase tracking-wider">Connected</span>
                  </div>
                  <div className="flex flex-col gap-3 mt-6">
                    <p className="text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed">
                      Hubungkan akun yang sering kamu gunakan agar masuk ke Lynknov lebih praktis.
                    </p>
                    {!integrations.googleConnected && !integrations.githubConnected && (
                      <div className="px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/10 text-xs text-amber-400/80 font-medium">
                        Belum ada akun yang terhubung. Hubungkan minimal satu metode login.
                      </div>
                    )}
                  </div>
                </div>
              </UtilitySettingsCard>
            </div>
          </SettingsContentGrid>
        )}
      </div>

      {/* ===== PASSWORD MODAL ===== */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) setPasswordModalOpen(false); }}>
          <div className="w-full max-w-md bg-[var(--color-surface-elevated)] border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-semibold text-white">{security.passwordEnabled ? 'Ubah Kata Sandi' : 'Buat Kata Sandi'}</h2>
                <p className="text-[13px] text-[var(--color-text-secondary)]">
                  {security.passwordEnabled ? 'Masukkan kata sandi baru untuk mengganti yang lama.' : 'Buat kata sandi untuk bisa masuk dengan email & sandi.'}
                </p>
              </div>
              <button onClick={() => { setPasswordModalOpen(false); setNewPassword(''); setConfirmPassword(''); }} className="text-white/40 hover:text-white transition-colors p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Kata Sandi Baru</label>
                <div className="relative flex items-center">
                  <input
                    type={showNewPwd ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 karakter"
                    className="w-full h-11 pl-4 pr-10 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a78bfa]/50 focus:bg-white/[0.05] transition-all"
                  />
                  <button type="button" onClick={() => setShowNewPwd(v => !v)} className="absolute right-3 text-white/40 hover:text-white/80 transition-colors">
                    {showNewPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Konfirmasi Kata Sandi</label>
                <div className="relative flex items-center">
                  <input
                    type={showConfirmPwd ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    className="w-full h-11 pl-4 pr-10 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a78bfa]/50 focus:bg-white/[0.05] transition-all"
                    onKeyDown={(e) => { if (e.key === 'Enter') handlePasswordSubmit(); }}
                  />
                  <button type="button" onClick={() => setShowConfirmPwd(v => !v)} className="absolute right-3 text-white/40 hover:text-white/80 transition-colors">
                    {showConfirmPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-400 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" />Kata sandi tidak cocok</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => { setPasswordModalOpen(false); setNewPassword(''); setConfirmPassword(''); }} className="flex-1 h-11 rounded-xl border border-white/10 text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Batal
              </button>
              <button
                onClick={handlePasswordSubmit}
                disabled={passwordLoading || newPassword.length < 8 || newPassword !== confirmPassword}
                className="flex-1 h-11 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {passwordLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</> : (security.passwordEnabled ? 'Ubah Kata Sandi' : 'Buat Kata Sandi')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 2FA MODAL: SETUP QR CODE ===== */}
      {(twoFactorStep === 'setup' || twoFactorStep === 'verify') && totpEnrollData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[var(--color-surface-elevated)] border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-semibold text-white">Aktifkan Verifikasi 2 Langkah</h2>
                <p className="text-[13px] text-[var(--color-text-secondary)]">Scan QR code dengan aplikasi autentikasi (Google Authenticator, Authy, dll).</p>
              </div>
              <button onClick={() => { setTwoFactorStep('idle'); setTotpEnrollData(null); setTotpCode(''); }} className="text-white/40 hover:text-white transition-colors p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              {/* QR Code from Supabase — data URI */}
              <div className="p-3 bg-white rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={totpEnrollData.qrCode} alt="QR Code 2FA" className="w-40 h-40 block" />
              </div>
              <div className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-[11px] text-[var(--color-text-secondary)] font-medium mb-1.5 uppercase tracking-wide">Kode manual</p>
                <p className="text-sm font-mono text-white/80 break-all select-all">{totpEnrollData.secret}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Masukkan kode 6 digit dari aplikasi</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-center text-lg font-mono tracking-[0.3em] placeholder:text-white/20 focus:outline-none focus:border-[#a78bfa]/50 transition-all"
                onKeyDown={(e) => { if (e.key === 'Enter' && totpCode.length === 6) verifyEnroll2FA(); }}
              />
            </div>

            <button
              onClick={verifyEnroll2FA}
              disabled={totpLoading || totpCode.length !== 6}
              className="w-full h-11 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {totpLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Memverifikasi...</> : 'Aktifkan 2FA'}
            </button>
          </div>
        </div>
      )}

      {/* ===== UNLINK PROVIDER MODAL ===== */}
      {unlinkModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) setUnlinkModal(prev => ({ ...prev, open: false })); }}>
          <div className="w-full max-w-sm bg-[#1a1a1f] border border-white/[0.08] rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 ${unlinkModal.canProceed ? 'bg-white/[0.05] border border-white/10' : 'bg-amber-500/10 border border-amber-500/20'}`}>
              {unlinkModal.provider === 'google' ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              ) : (
                <svg className="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
              )}
            </div>
            {/* Content */}
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[15px] font-semibold text-white">
                Putuskan {unlinkModal.provider === 'google' ? 'Google' : 'GitHub'}?
              </h2>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
                {unlinkModal.canProceed ? unlinkModal.safeReason : unlinkModal.blockReason}
              </p>
            </div>
            {/* Actions */}
            {unlinkModal.canProceed ? (
              <div className="flex gap-2.5">
                <button
                  onClick={() => setUnlinkModal(prev => ({ ...prev, open: false }))}
                  className="flex-1 h-10 rounded-xl border border-white/[0.08] text-sm font-medium text-white/50 hover:text-white transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmUnlink}
                  className="flex-1 h-10 rounded-xl bg-white/[0.07] border border-white/10 text-white text-sm font-semibold hover:bg-white/[0.10] transition-all"
                >
                  Ya, Putuskan
                </button>
              </div>
            ) : (
              <button
                onClick={() => setUnlinkModal(prev => ({ ...prev, open: false }))}
                className="w-full h-10 rounded-xl bg-white/[0.05] text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                Mengerti
              </button>
            )}
          </div>
        </div>
      )}

      {/* ===== 2FA MODAL: DISABLE CONFIRM ===== */}
      {twoFactorStep === 'disable_confirm' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) setTwoFactorStep('idle'); }}>
          <div className="w-full max-w-sm bg-[var(--color-surface-elevated)] border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-1">
                <Lock className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-base font-semibold text-white">Nonaktifkan Verifikasi 2 Langkah?</h2>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
                Akunmu akan menjadi kurang aman. Kamu bisa mengaktifkannya kembali kapan saja.
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setTwoFactorStep('idle')} className="flex-1 h-11 rounded-xl border border-white/10 text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Batal
              </button>
              <button
                onClick={disable2FA}
                disabled={totpLoading}
                className="flex-1 h-11 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {totpLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</> : 'Ya, Nonaktifkan'}
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </SettingsShell>
  );
}

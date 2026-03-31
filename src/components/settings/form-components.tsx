"use client";

import React, { useRef, useState } from "react";
import { Camera, RefreshCw, X, Shield, ShieldAlert, MonitorSmartphone, Smartphone, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

// Helper internal component
export function HelperText({ text }: { text: string }) {
  return (
    <p className="text-[13px] text-[var(--color-text-secondary)] mt-2 leading-relaxed">
      {text}
    </p>
  );
}

// Avatar Field
export function ProfileAvatarField({
  value,
  onChange,
  disabled = false,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  disabled?: boolean;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert("Format tidak valid. Gunakan JPG, PNG, atau WEBP.");
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file terlalu besar. Maksimal 2MB.");
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    try {
      setIsUploading(true);
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Tidak terautentikasi");

      const ext = file.type === 'image/webp' ? 'webp' : file.type === 'image/png' ? 'png' : 'jpg';
      const filePath = `${user.id}/avatar-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true, contentType: file.type });

      if (uploadError) {
        if (uploadError.message?.includes('Bucket not found')) {
          throw new Error('Konfigurasi penyimpanan belum siap.');
        }
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      const msg = error instanceof Error ? error.message : 'Coba lagi.';
      alert(`Upload foto gagal. ${msg}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/[0.04]">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div 
        className={`relative group w-24 h-24 rounded-full bg-[var(--color-surface-elevated)] border border-white/10 flex items-center justify-center overflow-hidden shrink-0 ${isUploading ? 'cursor-wait' : 'cursor-pointer'}`}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {isUploading ? (
          <Loader2 className="w-8 h-8 animate-spin text-white/50" />
        ) : value ? (
          <img src={value} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="text-3xl font-bold bg-gradient-to-tr from-white/20 to-white/5 bg-clip-text text-transparent">
            DS
          </div>
        )}
        {!isUploading && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm z-10">
            <Camera className="w-6 h-6 text-white/90 mb-1" />
            <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wide">Ubah foto</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-white/90">Foto Profil</label>
        <p className="text-[12px] text-[var(--color-text-tertiary)] max-w-[220px] leading-relaxed">
          Format JPG, PNG, atau WEBP. Maksimal 2MB. Klik avatar untuk mengganti.
        </p>
      </div>
    </div>
  );
}

// TextField
export function TextField({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  helperText?: React.ReactNode;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-semibold tracking-wide text-white/80 uppercase">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-[var(--color-surface-base)] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      />
      {helperText && <div className="text-[13px] text-[var(--color-text-secondary)] mt-1 leading-relaxed">{helperText}</div>}
    </div>
  );
}

// TextareaField
export function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  rows = 3,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  helperText?: string;
  rows?: number;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-semibold tracking-wide text-white/80 uppercase">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`w-full bg-[var(--color-surface-base)] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] resize-none ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      />
      {helperText && <HelperText text={helperText} />}
    </div>
  );
}

// SelectField
export function SelectField({
  label,
  value,
  onChange,
  options,
  helperText,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  helperText?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-semibold tracking-wide text-white/80 uppercase">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full appearance-none bg-[var(--color-surface-base)] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[var(--color-surface-elevated)]">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 rotate-90 pointer-events-none" />
      </div>
      {helperText && <div className="text-[13px] text-[var(--color-text-secondary)] mt-1 leading-relaxed">{helperText}</div>}
    </div>
  );
}

// ToggleRow
export function ToggleRow({
  label,
  description,
  enabled,
  onChange,
  disabled = false,
  badgeText,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
  badgeText?: string;
}) {
  return (
    <div className={`flex items-start justify-between gap-6 py-4 border-b border-white/[0.04] last:border-0 last:pb-0 ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-white/90">{label}</span>
          {badgeText && (
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-[var(--color-text-secondary)] border border-white/10 text-[10px] font-bold uppercase tracking-wide">
              {badgeText}
            </span>
          )}
        </div>
        <span className="text-[13px] text-[var(--color-text-secondary)]">{description}</span>
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange(!enabled)}
        disabled={disabled}
        className={`
          relative w-11 h-6 shrink-0 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/10
          ${enabled ? "bg-white border text-black border-transparent" : "bg-white/5 border border-white/10"}
        `}
      >
        <span
          className={`
            absolute top-0.5 w-4 h-4 rounded-full transition-transform duration-300
            ${enabled ? "translate-x-[22px] bg-black" : "translate-x-1 bg-white/40"}
          `}
        />
      </button>
    </div>
  );
}

// StatusBadge
export function StatusBadge({
  status,
  text,
}: {
  status: "success" | "warning" | "error" | "neutral" | "brand" | "active" | "safe" | "optional" | "incomplete" | "disabled";
  text: string;
}) {
  const getColors = () => {
    switch (status) {
      case "success":
      case "active":
      case "safe":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "warning":
      case "incomplete":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "error": 
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "brand": 
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "optional":
      case "disabled":
      case "neutral":
      default: 
        return "bg-white/5 text-[var(--color-text-secondary)] border-white/10";
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide border uppercase ${getColors()}`}>
      {text}
    </span>
  );
}

// IntegrationRow
export function IntegrationRow({
  platform,
  description,
  connected,
  loading = false,
  onToggle,
}: {
  platform: string;
  description: string;
  connected: boolean;
  loading?: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-[16px] bg-[var(--color-surface-base)] border transition-all duration-150 ${loading ? 'border-white/[0.08] opacity-80' : 'border-white/[0.04] hover:border-white/[0.07]'}`}>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
          {platform === "Google" ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          ) : platform === "GitHub" ? (
            <svg className="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          ) : (
            <div className="text-sm font-bold text-white/70">{platform.charAt(0)}</div>
          )}
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-medium text-white/90">{platform}</span>
            <StatusBadge
              status={connected ? "active" : "neutral"}
              text={connected ? "Terhubung" : "Belum Terhubung"}
            />
          </div>
          {loading ? (
            <p className="text-[12px] text-white/40 font-medium">
              {connected ? `Memutuskan ${platform}...` : `Menghubungkan ${platform}...`}
            </p>
          ) : (
            <p className="text-[12px] text-[var(--color-text-secondary)] leading-snug">{description}</p>
          )}
        </div>
      </div>
      <button
        onClick={onToggle}
        disabled={loading}
        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
          connected
            ? "text-white/50 hover:text-white/80 border border-white/[0.08] hover:border-white/[0.14] hover:bg-white/[0.03]"
            : "bg-white text-black hover:bg-white/90 shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
        }`}
      >
        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        {loading ? (connected ? "Memutuskan..." : "Menghubungkan...") : (connected ? "Putuskan" : "Hubungkan")}
      </button>
    </div>
  );
}

// SecurityStatusPill
export function SecurityStatusPill({ secure }: { secure: boolean }) {
  if (secure) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wide">
        <Shield className="w-3.5 h-3.5" />
        Aman
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wide">
      <ShieldAlert className="w-3.5 h-3.5" />
      Dasar
    </div>
  );
}

// SessionRow
export function SessionRow({
  deviceOS,
  browser,
  isCurrent,
  lastActive,
}: {
  deviceOS: "windows" | "mac" | "mobile";
  browser: string;
  isCurrent: boolean;
  lastActive: string;
}) {
  const Icon = deviceOS === "mobile" ? Smartphone : MonitorSmartphone;
  
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/[0.04] last:border-0 last:pb-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-base)] border border-white/5 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-white/60" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white/90">{deviceOS === "mac" ? "macOS" : deviceOS === "windows" ? "Windows" : "Mobile"} — {browser}</span>
            {isCurrent && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                Sedang Aktif
              </span>
            )}
          </div>
          <span className="text-[13px] text-[var(--color-text-secondary)]">
            {isCurrent ? "Perangkat ini" : `Aktif ${lastActive}`}
          </span>
        </div>
      </div>
      {!isCurrent && (
        <button className="text-[13px] font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60">
          Keluar
        </button>
      )}
    </div>
  );
}

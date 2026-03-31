"use client";

import React from "react";
import { AlertCircle, type LucideIcon } from "lucide-react";

export function SpotlightSettingsCard({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        bg-gradient-to-br from-[var(--color-surface-elevated)] to-[var(--color-surface-base)]
        border border-white/[0.06] rounded-[24px] p-6 lg:p-10
        shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]
        flex flex-col gap-8 w-full
        ${className}
      `}
    >
      <div className="flex flex-col gap-2 relative">
        <h2 className="text-xl font-semibold tracking-tight text-white/90">{title}</h2>
        <p className="text-sm text-[var(--color-text-secondary)] font-medium text-balance max-w-sm">
          {description}
        </p>
      </div>
      <div className="flex-1 rounded-[16px]">{children}</div>
    </div>
  );
}

export function UtilitySettingsCard({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        bg-[var(--color-surface-highest)]
        border border-white/[0.04] rounded-[20px] p-6 lg:p-8
        shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]
        flex flex-col gap-6 w-full
        ${className}
      `}
    >
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-medium tracking-tight text-white/80">{title}</h3>
        {description && (
          <p className="text-[13px] text-[var(--color-text-secondary)] font-medium mb-2">
            {description}
          </p>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-5">{children}</div>
    </div>
  );
}

export function StatusOverviewCard({
  label,
  value,
  status,
  badgeText,
  icon: Icon,
}: {
  label: string;
  value: string;
  status: "success" | "warning" | "error" | "neutral" | "brand" | "active" | "safe" | "optional" | "incomplete" | "disabled" | "none";
  badgeText?: string;
  icon?: LucideIcon;
}) {
  const getStatusColor = () => {
    switch (status) {
      case "success":
      case "active":
      case "safe":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "warning":
      case "incomplete":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "error": 
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "brand": 
        return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      case "optional":
      case "disabled":
      case "neutral":
      case "none":
      default: 
        return "text-[var(--color-text-secondary)] bg-white/5 border-white/10";
    }
  };

  return (
    <div className="flex flex-col p-4 rounded-[16px] bg-[var(--color-surface-highest)] border border-white/[0.03] transition-premium hover:bg-white/[0.01]">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-4 h-4 text-[var(--color-text-tertiary)]" />}
        <span className="text-[13px] font-medium text-[var(--color-text-tertiary)]">{label}</span>
      </div>
      <div className="flex items-baseline gap-3 mt-auto">
        <span className="text-xl font-medium tracking-tight text-white/90">{value}</span>
        {badgeText && (
          <div className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border ${getStatusColor()}`}>
            {badgeText}
          </div>
        )}
      </div>
    </div>
  );
}

export function InsightCard({
  message,
  type = "info",
}: {
  message: string;
  type?: "info" | "warning";
}) {
  return (
    <div className={`
      flex items-start gap-3 p-4 rounded-xl text-sm font-medium border
      ${type === "info" 
        ? "bg-blue-400/5 border-blue-400/10 text-blue-200/80" 
        : "bg-amber-400/5 border-amber-400/10 text-amber-200/80"
      }
    `}>
      <div className="mt-0.5 shrink-0">
        <AlertCircle className={`w-[18px] h-[18px] ${type === 'info' ? 'text-blue-400' : 'text-amber-400'}`} />
      </div>
      <p className="leading-snug">
        {message}
      </p>
    </div>
  );
}

export function DangerZoneCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 border border-red-500/10 bg-red-500/[0.02] rounded-[20px] p-6 lg:p-8 flex flex-col gap-6 relative overflow-hidden">
      <div className="absolute top-0 right-[-10%] w-1/2 h-full bg-gradient-to-l from-red-500/5 to-transparent blur-[50px] pointer-events-none" />
      
      <div className="flex flex-col gap-1.5 z-10">
        <h3 className="text-lg font-medium tracking-tight text-red-400/90">{title}</h3>
        <p className="text-[13px] text-[var(--color-text-secondary)] font-medium max-w-2xl">{description}</p>
      </div>

      <div className="flex flex-col gap-4 z-10 border-t border-red-500/10 pt-6">
        {children}
      </div>
    </div>
  );
}

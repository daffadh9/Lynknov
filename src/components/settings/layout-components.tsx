"use client";

import React from "react";

export function SettingsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-10 lg:py-16 flex flex-col gap-10">
      {children}
    </div>
  );
}

export function SettingsHeader({
  title,
  subtitle,
  rightElement,
}: {
  title: string;
  subtitle: string;
  rightElement?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.04]">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="text-[var(--color-text-secondary)] text-sm md:text-base max-w-2xl text-balance">
          {subtitle}
        </p>
      </div>
      {rightElement && (
        <div className="flex items-center gap-4 shrink-0">
          {rightElement}
        </div>
      )}
    </div>
  );
}

export function SettingsContentGrid({ children }: { children: React.ReactNode }) {
  // Use a 12-column grid for flexible, asymmetrical layouts
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-2">
      {children}
    </div>
  );
}

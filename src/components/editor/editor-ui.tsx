"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function Field({ label, helper, children, maxLength, currentLength }: { 
  label: string; helper?: string; children: React.ReactNode; maxLength?: number; currentLength?: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label className="text-[11px] font-bold text-white/70 tracking-wide">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {maxLength !== undefined && currentLength !== undefined && (
            <span className={cn(
              "text-[9px] font-medium transition-colors",
              currentLength > maxLength ? "text-red-400" : currentLength > maxLength * 0.8 ? "text-gold-400" : "text-white/20"
            )}>
              {currentLength}/{maxLength}
            </span>
          )}
          {helper && <span className="text-[10px] text-white/40">{helper}</span>}
        </div>
      </div>
      {children}
    </div>
  );
}

export function TextInput({ value, onChange, placeholder, className, maxLength }: {
  value: string; onChange: (v: string) => void; placeholder?: string; className?: string; maxLength?: number;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className={cn(
        "h-10 w-full rounded-lg border border-white/[0.04] bg-white/[0.02] px-3.5 text-[13px] text-white/90 transition-all",
        "placeholder:text-white/20 focus:outline-none focus:border-white/[0.15] focus:bg-white/[0.04]",
        className
      )}
    />
  );
}

export function Textarea({ value, onChange, placeholder, rows = 3, className, maxLength }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; className?: string; maxLength?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      className={cn(
        "w-full resize-none rounded-lg border border-white/[0.04] bg-white/[0.02] px-3.5 py-3 text-[13px] leading-relaxed text-white/90 placeholder:text-white/20 focus:outline-none focus:border-white/[0.15] focus:bg-white/[0.04] transition-all custom-scrollbar",
        className
      )}
    />
  );
}

export function SegmentControl({ options, value, onChange }: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 p-1 bg-black/40 rounded-lg border border-white/[0.04]">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "flex-1 px-3 py-2 rounded-md text-[11px] font-bold transition-all duration-200",
            value === opt.value
              ? "bg-white/[0.08] text-white shadow-sm"
              : "text-white/40 hover:text-white/70 hover:bg-white/[0.02]"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function Toggle({ checked, onChange, label, description }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; description?: string;
}) {
  return (
    <div 
      className="flex items-center justify-between gap-4 py-2.5 group cursor-pointer rounded-lg hover:bg-white/[0.02] px-2 -mx-2 transition-colors" 
      onClick={() => onChange(!checked)}
    >
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-white/80 group-hover:text-white transition-colors">{label}</div>
        {description && <div className="mt-0.5 text-[11px] text-white/40 leading-snug">{description}</div>}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-all duration-300 outline-none ring-1 ring-inset ring-white/[0.05]",
          checked ? "bg-emerald-500/80 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]" : "bg-black/60 shadow-inner"
        )}
      >
        <div className={cn(
          "absolute top-[2px] h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1.2)]",
          checked ? "left-[18px]" : "left-[2px]"
        )} />
      </button>
    </div>
  );
}

export function SectionGroup({ title, icon: Icon, children }: {
  title: string; icon?: React.ElementType; children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 pt-1 pb-8 first:pt-0 last:pb-0 border-b border-white/[0.04] last:border-0">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4 text-emerald-400/60" />}
        <h3 className="text-[12px] font-black tracking-[0.15em] uppercase text-white/60">{title}</h3>
      </div>
      <div className="space-y-6 pl-0">{children}</div>
    </div>
  );
}

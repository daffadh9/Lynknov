"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  EditorSection,
  HeroSection,
} from "@/types/editor";
import { Info, Plus, Sparkles, LayoutTemplate, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/cn";
import { ImageUpload } from "./media/image-upload";

interface SectionEditorPanelProps {
  section: EditorSection | null;
  onChange: (section: EditorSection) => void;
}

type TabType = "content" | "style" | "settings";

// ── EDITOR DESIGN SYSTEM PRIMITIVES ──────────────────────────────────────────

function Field({ label, helper, children }: { label: string; helper?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/40 block">
        {label}
      </label>
      {children}
      {helper && <p className="text-[11px] leading-relaxed text-white/20 font-medium">{helper}</p>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, className }: {
  value: string; onChange: (v: string) => void; placeholder?: string; className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        "h-12 w-full rounded-xl border border-white/[0.06] bg-[#1C1C1F] px-4 text-[14px] text-white/90 shadow-sm transition-all",
        "placeholder:text-white/10 focus:outline-none focus:border-white/[0.15] focus:ring-1 focus:ring-white/[0.05]",
        className
      )}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none rounded-xl border border-white/[0.06] bg-[#1C1C1F] px-4 py-3 text-[14px] leading-relaxed text-white/90 placeholder:text-white/10 focus:outline-none focus:border-white/[0.15] focus:ring-1 focus:ring-white/[0.05] transition-all"
    />
  );
}

function SegmentControl({ options, value, onChange }: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 p-1 bg-black/20 rounded-xl border border-white/[0.04]">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "flex-1 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all",
            value === opt.value
              ? "bg-[#1C1C1F] text-white shadow-lg ring-1 ring-white/[0.08]"
              : "text-white/25 hover:text-white/50"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Toggle({ checked, onChange, label, description }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; description?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 group">
      <div className="min-w-0">
        <div className="text-[14px] font-bold text-white/80 group-hover:text-white transition-colors">{label}</div>
        {description && <div className="mt-1 truncate text-[11px] text-white/30 font-medium">{description}</div>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-all duration-300 outline-none ring-1 ring-inset ring-white/[0.05]",
          checked ? "bg-emerald-500/80 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]" : "bg-black/40 shadow-inner"
        )}
      >
        <div className={cn(
          "absolute top-1 h-4 w-4 rounded-full bg-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1.2)]",
          checked ? "left-[22px]" : "left-1"
        )} />
      </button>
    </div>
  );
}

function SectionGroup({ title, icon: Icon, children }: {
  title: string; icon?: React.ElementType; children: React.ReactNode;
}) {
  return (
    <div className="space-y-8 pt-4 pb-12 first:pt-0 last:pb-0 border-b border-white/[0.04] last:border-0">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center">
          {Icon && <Icon className="h-4 w-4 text-white/30" />}
        </div>
        <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-white/40">{title}</h3>
      </div>
      <div className="space-y-8 pl-11">{children}</div>
    </div>
  );
}

// ── EDITOR LOGIC PER SECTION ──────────────────────────────────────────────────

function HeroContentEditor({ section, onChange }: { section: HeroSection; onChange: (s: EditorSection) => void }) {
  const c = section.content;
  const upd = (key: string, val: unknown) => onChange({ ...section, content: { ...c, [key]: val } });
  const updCta = (which: "primaryCta" | "secondaryCta", field: "label" | "url", val: string) =>
    onChange({ ...section, content: { ...c, [which]: { ...(c[which] || {}), [field]: val } } });

  return (
    <div className="space-y-10">
      <SectionGroup title="Media" icon={LayoutTemplate}>
        <ImageUpload
          label="Avatar Utama"
          value={c.avatarUrl || ""}
          onChange={(url) => upd("avatarUrl", url)}
          recommendedSize="Min. 400×400px · JPG/PNG/WebP"
          shape={section.style?.avatarShape === "circle" ? "circle" : "square"}
        />
      </SectionGroup>

      <SectionGroup title="Identitas" icon={Plus}>
        <div className="grid gap-6">
          <Field label="Nama Lengkap">
            <TextInput value={c.name || ""} onChange={(v) => upd("name", v)} placeholder="Nama Anda" />
          </Field>
          <Field label="Profesi / Peran">
            <TextInput value={c.role || ""} onChange={(v) => upd("role", v)} placeholder="Product Designer" />
          </Field>
          <Field label="Teks Badge" helper="Muncul kecil di atas nama (opsional)">
            <TextInput value={c.badgeText || ""} onChange={(v) => upd("badgeText", v)} placeholder="Available for work" />
          </Field>
        </div>
      </SectionGroup>

      <SectionGroup title="Konten Utama" icon={Sparkles}>
        <div className="grid gap-6">
          <Field label="Headline">
            <Textarea value={c.headline || ""} onChange={(v) => upd("headline", v)} placeholder="Headline singkat & berani" rows={2} />
          </Field>
          <Field label="Deskripsi">
            <Textarea value={c.description || ""} onChange={(v) => upd("description", v)} placeholder="Jelaskan nilai yang Anda tawarkan." rows={4} />
          </Field>
          <Field label="Teks Kepercayaan" helper="Teks kecil di bawah tombol aksi">
            <TextInput value={c.trustText || ""} onChange={(v) => upd("trustText", v)} placeholder="Dipercaya 100+ klien" />
          </Field>
        </div>
      </SectionGroup>

      <SectionGroup title="Tombol Aksi" icon={LayoutGrid}>
        <div className="grid gap-8">
          <div className="space-y-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Tombol Utama</p>
            <div className="grid gap-5">
              <Field label="Label Tombol">
                <TextInput value={c.primaryCta?.label || ""} onChange={(v) => updCta("primaryCta", "label", v)} placeholder="Hubungi" />
              </Field>
              <Field label="Tautan / URL">
                <TextInput value={c.primaryCta?.url || ""} onChange={(v) => updCta("primaryCta", "url", v)} placeholder="#contact" />
              </Field>
            </div>
          </div>
          <div className="space-y-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Tombol Sekunder</p>
            <div className="grid gap-5">
              <Field label="Label Tombol">
                <TextInput value={c.secondaryCta?.label || ""} onChange={(v) => updCta("secondaryCta", "label", v)} placeholder="Lihat Karya" />
              </Field>
              <Field label="Tautan / URL">
                <TextInput value={c.secondaryCta?.url || ""} onChange={(v) => updCta("secondaryCta", "url", v)} placeholder="#work" />
              </Field>
            </div>
          </div>
        </div>
      </SectionGroup>
    </div>
  );
}

// ── MAIN EDITOR PANEL ────────────────────────────────────────────────────────

export function SectionEditorPanel({ section, onChange }: SectionEditorPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("content");

  if (!section) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center bg-[#0B0B0D]">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.02] ring-1 ring-white/[0.04] shadow-inner">
          <Info className="h-6 w-6 text-white/10" />
        </div>
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/20">Pilih Section</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (section.type) {
      case "hero": return <HeroContentEditor section={section as HeroSection} onChange={onChange} />;
      default: return <div className="py-20 text-white/20 text-[11px] font-black uppercase tracking-widest text-center">Optimasi editor sedang diproses.</div>;
    }
  };

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col border-r border-white/[0.04] bg-[#0B0B0D]">
      {/* Visual Header - Balanced Separation */}
      <div className="shrink-0 border-b border-white/[0.06] px-10 py-7 bg-white/[0.01]">
        <div className="flex items-center gap-5">
          <h2 className="text-[18px] font-black tracking-tight text-white">{section.label}</h2>
          <div className="relative flex h-2.5 w-2.5 items-center justify-center">
            {/* outer breathing glow */}
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-full w-full rounded-full bg-emerald-500 blur-[2px]"
            />
            {/* inner solid core with subtle pulse */}
            <motion.div 
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" 
            />
          </div>
        </div>
      </div>

      {/* Premium Tabs - Layer Selected Feel */}
      <div className="shrink-0 border-b border-white/[0.06] px-10 py-1 bg-white/[0.01]">
        <div className="flex items-center gap-12">
          {([
            { key: "content" as const, label: "Konten" },
            { key: "style" as const, label: "Tampilan" },
            { key: "settings" as const, label: "Pengaturan" },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                "relative py-5 text-[11px] font-black uppercase tracking-[0.25em] transition-all",
                activeTab === key
                  ? "text-white"
                  : "text-white/30 hover:text-white/50"
              )}
            >
              {label}
              {activeTab === key && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute -bottom-[5px] left-0 h-[2.5px] w-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)] rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Surface - Precise Spacing Rhythm */}
      <div className="custom-scrollbar flex-1 overflow-y-auto bg-[#0B0B0D] px-10 py-16">
        <div className="w-full max-w-[800px] animate-in fade-in slide-in-from-bottom-2 duration-700">
          {activeTab === "content" && renderContent()}
          {activeTab === "style" && (
            <div className="py-20 text-white/20 text-[11px] font-black uppercase tracking-widest text-center">Styling segera hadir.</div>
          )}
          {activeTab === "settings" && (
            <div className="py-20 text-white/20 text-[11px] font-black uppercase tracking-widest text-center">Pengaturan segera hadir.</div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Image as ImageIcon, Upload, WandSparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  getAssetOverview,
  getPageCompletion,
} from "@/lib/editor-progress";
import type {
  EditorAudioSettings,
  EditorPageSettings,
  EditorSection,
  EditorThemeSettings,
  EditorWorkspaceState,
} from "@/types/editor";
import { SectionEditorPanel } from "./section-editor-panel";

interface EditorWorkspacePanelProps {
  workspace: "sections" | "uploads" | "audio" | "theme" | "settings";
  section: EditorSection | null;
  sections: EditorSection[];
  workspaceState: EditorWorkspaceState;
  onSectionChange: (section: EditorSection) => void;
  onWorkspaceStateChange: (state: EditorWorkspaceState) => void;
}

type UploadFilter = "all" | "avatar" | "showcase" | "project";
type AssetEntry = {
  id: string;
  title: string;
  category: Exclude<UploadFilter, "all">;
  usage: string;
  source: string;
};

const THEME_LABELS: Record<string, string> = {
  emerald: "Hijau premium",
  ocean: "Biru tenang",
  gold: "Emas editorial",
  solid: "Solid",
  grid: "Grid",
  mesh: "Mesh",
  glow: "Glow",
  soft: "Soft surface",
  glass: "Glass",
  contrast: "High contrast",
  refined: "Refined",
  editorial: "Editorial",
  compact: "Compact",
  relaxed: "Relaxed",
  balanced: "Balanced",
};

const VISIBILITY_LABELS: Record<EditorPageSettings["visibility"], string> = {
  public: "Publik",
  unlisted: "Unlisted",
  private: "Private",
};

// ── Primitives ──────────────────────────────────────────────────────────────────

function WorkspaceHeader({ title, badge, meta = [] }: { title: string; badge?: string; meta?: string[] }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.04] px-6 py-3">
      <div className="flex items-center gap-3">
        <h2 className="text-[13px] font-bold tracking-tight text-white/80">{title}</h2>
        {badge && (
          <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/30 ring-1 ring-inset ring-white/[0.05]">
            {badge}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        {meta.map((item) => (
          <span key={item} className="text-[11px] text-white/20">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-white/[0.04] bg-white/[0.01] p-5", className)}>
      {children}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 pt-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/20">{title}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold text-white/40">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border border-white/[0.05] bg-white/[0.02] px-3.5 text-sm text-white outline-none transition-all placeholder:text-white/10 focus:border-white/[0.1] focus:bg-white/[0.04]"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold text-white/40">{label}</span>
      <textarea
        rows={3}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-xl border border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5 text-sm leading-relaxed text-white outline-none transition-all placeholder:text-white/10 focus:border-white/[0.1] focus:bg-white/[0.04]"
      />
    </label>
  );
}

function Choices<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-all",
            option.value === value
              ? "border-white/[0.1] bg-white/[0.08] text-white"
              : "border-white/[0.04] bg-white/[0.01] text-white/30 hover:border-white/[0.08] hover:text-white/60"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (nextValue: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-white/70">{label}</p>
        {description && <p className="mt-0.5 truncate text-[11px] text-white/20">{description}</p>}
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-all",
          disabled
            ? "cursor-not-allowed opacity-20"
            : checked
              ? "bg-emerald-500/40"
              : "bg-white/[0.08]"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all shadow-sm",
            checked ? "translate-x-[18px]" : "translate-x-[2px]"
          )}
        />
      </button>
    </div>
  );
}

function Row({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "success" | "warning";
}) {
  const toneClass =
    tone === "success"
      ? "text-emerald-400/70"
      : tone === "warning"
        ? "text-amber-400/70"
        : "text-white/40";

  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <span className="text-[11px] text-white/20">{label}</span>
      <span className={cn("text-[11px] font-semibold", toneClass)}>{value}</span>
    </div>
  );
}

// ── Asset helpers ───────────────────────────────────────────────────────────────

function buildAssetEntries(sections: EditorSection[]): AssetEntry[] {
  const entries: AssetEntry[] = [];
  for (const section of sections) {
    if (section.type === "hero" && section.content.avatarUrl) {
      entries.push({
        id: `${section.id}-avatar`,
        title: "Avatar utama",
        category: "avatar",
        usage: "Hero",
        source: String(section.content.avatarUrl),
      });
    }
    if (section.type === "showcase") {
      for (const item of (section.content.items as Array<{ id: string; title: string; imageUrl?: string }>) ?? []) {
        if (item.imageUrl) {
          entries.push({ id: `${section.id}-${item.id}`, title: item.title, category: "showcase", usage: "Showcase", source: item.imageUrl });
        }
      }
    }
    if (section.type === "portfolio" || section.type === "storyboard") {
      for (const item of (section.content.items as Array<{ id: string; title: string; imageUrl?: string }>) ?? []) {
        if (item.imageUrl) {
          entries.push({ id: `${section.id}-${item.id}`, title: item.title, category: "project", usage: section.type === "portfolio" ? "Portfolio" : "Storyboard", source: item.imageUrl });
        }
      }
    }
  }
  return entries;
}

// ── Workspaces ──────────────────────────────────────────────────────────────────

function UploadsWorkspace({ sections }: { sections: EditorSection[] }) {
  const [filter, setFilter] = useState<UploadFilter>("all");
  const assets = getAssetOverview(sections);
  const entries = buildAssetEntries(sections);
  const filtered = filter === "all" ? entries : entries.filter((e) => e.category === filter);

  return (
    <div className="flex flex-1 flex-col h-full">
      <WorkspaceHeader
        title="Unggahan"
        meta={[`${assets.totalAssets} aset`]}
      />
      <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-500/10 px-4 text-[12px] font-bold text-emerald-400 ring-1 ring-inset ring-emerald-500/20 transition-all hover:bg-emerald-500/20">
            <Upload className="h-3.5 w-3.5" />
            Unggah File
          </button>
          <Choices
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "Semua" },
              { value: "avatar", label: "Avatar" },
              { value: "showcase", label: "Showcase" },
              { value: "project", label: "Project" },
            ]}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.05] bg-white/[0.01] px-4 py-16 text-center">
                <ImageIcon className="h-8 w-8 text-white/10" />
                <p className="mt-4 text-[12px] text-white/20 font-medium">Belum ada aset</p>
              </div>
            ) : (
              <div className="grid gap-2">
                {filtered.map((entry) => (
                  <div
                    key={entry.id}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 transition-all hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-white/[0.05]" />
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-bold text-white/80">{entry.title}</p>
                        <p className="text-[11px] text-white/20 font-medium">{entry.usage}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/30">
                      {entry.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white/20">Ringkasan</p>
              <div className="space-y-3">
                <Row label="Avatar" value={`${assets.avatarAssets}`} />
                <Row label="Showcase" value={`${assets.galleryAssets}`} />
                <Row label="Project" value={`${assets.projectAssets}`} />
                <Row
                  label="Status"
                  value={assets.totalAssets > 0 ? "Terisi" : "Kosong"}
                  tone={assets.totalAssets > 0 ? "success" : "warning"}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function AudioWorkspace({
  state,
  onChange,
}: {
  state: EditorAudioSettings;
  onChange: (value: EditorAudioSettings) => void;
}) {
  const update = (patch: Partial<EditorAudioSettings>) => onChange({ ...state, ...patch });

  return (
    <div className="flex flex-1 flex-col h-full">
      <WorkspaceHeader title="Audio" badge="Beta" />
      <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-6 space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
          <div className="space-y-8">
            <Group title="Track Info">
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Nama track" value={state.trackName} onChange={(v) => update({ trackName: v })} placeholder="Judul lagu" />
                <Input label="Durasi" value={state.duration} onChange={(v) => update({ duration: v })} placeholder="00:00" />
              </div>
            </Group>

            <Group title="Interaksi">
              <Card className="space-y-4">
                <Toggle label="Aktifkan Widget" description="Tampilkan pemutar musik" checked={state.widgetEnabled} onChange={(v) => update({ widgetEnabled: v })} />
                <Toggle label="Looping" description="Ulangi musik otomatis" checked={state.loopEnabled} onChange={(v) => update({ loopEnabled: v })} />
              </Card>
            </Group>

            <Group title="Konfigurasi">
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold text-white/40">Penempatan</span>
                  <Choices
                    value={state.placement}
                    onChange={(v) => update({ placement: v })}
                    options={[
                      { value: "floating", label: "Floating" },
                      { value: "inline", label: "Inline" },
                    ]}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white/40">Volume</span>
                    <span className="text-[11px] font-bold text-white/20">{state.volume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={state.volume}
                    onChange={(e) => update({ volume: Number(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            </Group>
          </div>

          <div className="space-y-6">
            <Card>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white/20">Status</p>
              <div className="space-y-3">
                <Row label="Track" value={state.trackName || "Kosong"} tone={state.trackName ? "success" : "warning"} />
                <Row label="Layout" value={state.placement === "floating" ? "Floating" : "Inline"} />
                <Row label="Autoplay" value="Disabled" tone="warning" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeWorkspace({
  state,
  onChange,
}: {
  state: EditorThemeSettings;
  onChange: (value: EditorThemeSettings) => void;
}) {
  const update = (patch: Partial<EditorThemeSettings>) => onChange({ ...state, ...patch });

  return (
    <div className="flex flex-1 flex-col h-full">
      <WorkspaceHeader title="Tema" />
      <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-6 space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
          <div className="space-y-8">
            <Group title="Aksen & Warna">
              <Card className="space-y-6">
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold text-white/40">Warna Aksen</span>
                  <Choices value={state.accent} onChange={(v) => update({ accent: v })} options={[
                    { value: "emerald", label: "Emerald" },
                    { value: "ocean", label: "Ocean" },
                    { value: "gold", label: "Gold" },
                  ]} />
                </div>
                <div className="space-y-3 border-t border-white/[0.04] pt-6">
                  <span className="text-[11px] font-semibold text-white/40">Latar Belakang</span>
                  <Choices value={state.background} onChange={(v) => update({ background: v })} options={[
                    { value: "solid", label: "Solid" },
                    { value: "grid", label: "Grid" },
                    { value: "mesh", label: "Mesh" },
                    { value: "glow", label: "Glow" },
                  ]} />
                </div>
              </Card>
            </Group>

            <Group title="Visual Style">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold text-white/40">Surface</span>
                  <Choices value={state.surface} onChange={(v) => update({ surface: v })} options={[
                    { value: "soft", label: "Soft" },
                    { value: "glass", label: "Glass" },
                    { value: "contrast", label: "Contrast" },
                  ]} />
                </div>
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold text-white/40">Tipografi</span>
                  <Choices value={state.typography} onChange={(v) => update({ typography: v })} options={[
                    { value: "refined", label: "Refined" },
                    { value: "editorial", label: "Editorial" },
                    { value: "compact", label: "Compact" },
                  ]} />
                </div>
              </div>
            </Group>

            <Group title="Layout">
              <div className="space-y-3">
                <span className="text-[11px] font-semibold text-white/40">Kepadatan Spacing</span>
                <Choices value={state.spacing} onChange={(v) => update({ spacing: v })} options={[
                  { value: "relaxed", label: "Relaxed" },
                  { value: "balanced", label: "Balanced" },
                  { value: "compact", label: "Compact" },
                ]} />
              </div>
            </Group>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="mb-4 flex items-center gap-2">
                <WandSparkles className="h-3 w-3 text-white/30" />
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/20">Config</p>
              </div>
              <div className="space-y-3">
                <Row label="Accent" value={THEME_LABELS[state.accent]} />
                <Row label="BG" value={THEME_LABELS[state.background]} />
                <Row label="Style" value={THEME_LABELS[state.surface]} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsWorkspace({
  sections,
  state,
  onChange,
}: {
  sections: EditorSection[];
  state: EditorPageSettings;
  onChange: (value: EditorPageSettings) => void;
}) {
  const progress = getPageCompletion(sections);
  const update = (patch: Partial<EditorPageSettings>) => onChange({ ...state, ...patch });

  return (
    <div className="flex flex-1 flex-col h-full">
      <WorkspaceHeader title="Pengaturan" badge={state.status} />
      <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-6 space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
          <div className="space-y-8">
            <Group title="Publikasi">
              <Card className="space-y-4">
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold text-white/40">Status Halaman</span>
                  <Choices
                    value={state.status}
                    onChange={(v) => update({ status: v })}
                    options={[
                      { value: "published", label: "Published" },
                      { value: "draft", label: "Draft" },
                    ]}
                  />
                </div>
                <div className="border-t border-white/[0.04] pt-4">
                  <Toggle
                    label="Search Engine"
                    description="Izinkan index oleh Google/Bing"
                    checked={state.seoIndexable}
                    onChange={(v) => update({ seoIndexable: v })}
                  />
                </div>
              </Card>
            </Group>

            <Group title="Identitas & SEO">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="URL Slug" value={state.slug} onChange={(v) => update({ slug: v })} placeholder="username" />
                  <Input label="Judul Halaman" value={state.pageTitle} onChange={(v) => update({ pageTitle: v })} placeholder="My Portfolio" />
                </div>
                <Input label="Meta Title" value={state.metaTitle} onChange={(v) => update({ metaTitle: v })} placeholder="SEO Title" />
                <Textarea label="Meta Description" value={state.metaDescription} onChange={(v) => update({ metaDescription: v })} placeholder="Deskripsi untuk pencarian" />
              </div>
            </Group>

            <Group title="Social Preview">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Social Title" value={state.socialTitle} onChange={(v) => update({ socialTitle: v })} placeholder="Share title" />
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold text-white/40">Visibilitas</span>
                    <Choices
                      value={state.visibility}
                      onChange={(v) => update({ visibility: v })}
                      options={[
                        { value: "public", label: "Publik" },
                        { value: "unlisted", label: "Unlisted" },
                        { value: "private", label: "Privat" },
                      ]}
                    />
                  </div>
                </div>
                <Textarea label="Social Description" value={state.socialDescription} onChange={(v) => update({ socialDescription: v })} placeholder="Deskripsi saat di-share" />
              </div>
            </Group>
          </div>

          <div className="space-y-6">
            <Card>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white/20">Ringkasan</p>
              <div className="space-y-3">
                <Row label="Status" value={state.status} tone={state.status === "published" ? "success" : "warning"} />
                <Row label="Slug" value={`/${state.slug}`} />
                <Row label="Visibilitas" value={VISIBILITY_LABELS[state.visibility]} />
                <Row label="Kesiapan" value={`${progress.completionPercent}%`} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ─────────────────────────────────────────────────────────────────

export function EditorWorkspacePanel({
  workspace,
  section,
  sections,
  workspaceState,
  onSectionChange,
  onWorkspaceStateChange,
}: EditorWorkspacePanelProps) {
  if (workspace === "sections") {
    return (
      <div className="flex flex-col h-full">
        <SectionEditorPanel section={section} onChange={onSectionChange} />
      </div>
    );
  }
  if (workspace === "uploads") {
    return <UploadsWorkspace sections={sections} />;
  }
  if (workspace === "audio") {
    return (
      <AudioWorkspace
        state={workspaceState.audio}
        onChange={(audio) => onWorkspaceStateChange({ ...workspaceState, audio })}
      />
    );
  }
  if (workspace === "theme") {
    return (
      <ThemeWorkspace
        state={workspaceState.theme}
        onChange={(theme) => onWorkspaceStateChange({ ...workspaceState, theme })}
      />
    );
  }
  return (
    <SettingsWorkspace
      sections={sections}
      state={workspaceState.page}
      onChange={(page) => onWorkspaceStateChange({ ...workspaceState, page })}
    />
  );
}

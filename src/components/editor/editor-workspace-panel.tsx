"use client";

import { useState, useEffect } from "react";
import { WandSparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import {
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
import { AssetCenterPanel } from "./assets/AssetCenterPanel";
import { fetchAssets, fetchFolders, deleteAsset } from "@/features/assets/actions";
import type { AssetFilter, AssetFolder, UserAsset } from "@/types/assets";

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

function UploadsWorkspaceWrapper() {
  const [assets, setAssets] = useState<UserAsset[]>([]);
  const [folders, setFolders] = useState<AssetFolder[]>([]);
  const [filter, setFilter] = useState<AssetFilter>({ category: "all" });
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const [assetsRes, foldersRes] = await Promise.all([
      fetchAssets(filter),
      fetchFolders(),
    ]);
    if (assetsRes.data) setAssets(assetsRes.data);
    if (foldersRes.data) setFolders(foldersRes.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [filter]);

  const handleUploadSuccess = (newAsset: UserAsset) => {
    setAssets((prev) => [newAsset, ...prev]);
  };

  const handleDeleteAsset = async (assetId: string) => {
    const res = await deleteAsset(assetId);
    if (res.success) {
      setAssets((prev) => prev.filter((a) => a.id !== assetId));
    } else {
      // TODO: Handle delete warning in future step
      console.error(res.error);
    }
  };

  return (
    <AssetCenterPanel
      assets={assets}
      folders={folders}
      filter={filter}
      onFilterChange={setFilter}
      onUploadSuccess={handleUploadSuccess}
      onDeleteAsset={handleDeleteAsset}
      isLoading={isLoading}
    />
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
    return <UploadsWorkspaceWrapper />;
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

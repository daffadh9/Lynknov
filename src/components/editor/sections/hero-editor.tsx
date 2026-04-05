"use client";

import { EditorSection, HeroSection } from "@/types/editor";
import { 
  Plus, Sparkles, LayoutTemplate, LayoutGrid, Palette, Settings, 
  Monitor, Focus, AlignLeft, AlignCenter, AlignRight, ShieldCheck, 
  CheckCircle2, MousePointer2, Paintbrush
} from "lucide-react";
import { ImageUpload } from "../media/image-upload";
import { Field, TextInput, Textarea, SegmentControl, Toggle, SectionGroup } from "../editor-ui";

interface HeroEditorProps {
  section: HeroSection;
  onChange: (s: EditorSection) => void;
}

const COLOR_OPTIONS = [
  { value: "emerald", class: "bg-emerald-500" },
  { value: "cyan", class: "bg-cyan-500" },
  { value: "blue", class: "bg-blue-500" },
  { value: "violet", class: "bg-violet-500" },
  { value: "gold", class: "bg-yellow-500" },
  { value: "rose", class: "bg-rose-500" },
  { value: "white", class: "bg-white" },
] as const;

export function HeroContentEditor({ section, onChange }: HeroEditorProps) {
  const c = section.content;
  const upd = (key: string, val: unknown) => onChange({ ...section, content: { ...c, [key]: val } });
  const updCta = (which: "primaryCta" | "secondaryCta", field: "label" | "url", val: string) =>
    onChange({ ...section, content: { ...c, [which]: { ...(c[which] || {}), [field]: val } } });

  return (
    <div className="space-y-12">
      <SectionGroup title="Media Utama" icon={LayoutTemplate}>
        <ImageUpload
          label="Avatar / Foto Profil"
          value={c.avatarUrl || ""}
          onChange={(url) => upd("avatarUrl", url)}
          recommendedSize="Min. 400×400px · PNG/WebP"
          shape={section.style?.avatarShape === "circle" ? "circle" : "square"}
        />
      </SectionGroup>

      <SectionGroup title="Identitas & Verifikasi" icon={ShieldCheck}>
        <div className="grid gap-6">
          <Field label="Nama Lengkap / Brand" maxLength={36} currentLength={c.name?.length || 0}>
            <TextInput value={c.name || ""} onChange={(v) => upd("name", v)} placeholder="Misal: John Doe" maxLength={36} className="h-11 text-[14px] font-bold" />
          </Field>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Profesi / Peran" maxLength={50} currentLength={c.role?.length || 0}>
              <TextInput value={c.role || ""} onChange={(v) => upd("role", v)} placeholder="Misal: Product Designer" maxLength={50} />
            </Field>
            <Field label="Teks Badge Kecil" maxLength={24} currentLength={c.badgeText?.length || 0}>
              <TextInput value={c.badgeText || ""} onChange={(v) => upd("badgeText", v)} placeholder="Misal: Available for work" maxLength={24} />
            </Field>
          </div>

          <Toggle
            label="Verified Badge"
            description="Hanya untuk pengguna Pro atau Premium."
            checked={!!c.isVerified}
            onChange={(v) => upd("isVerified", v)}
          />
        </div>
      </SectionGroup>

      <SectionGroup title="Pesan & Nilai" icon={Sparkles}>
        <div className="grid gap-6">
          <Field label="Headline Utama" helper="Kalimat pembuka yang kuat" maxLength={75} currentLength={c.headline?.length || 0}>
            <Textarea value={c.headline || ""} onChange={(v) => upd("headline", v)} placeholder="Headline singkat & berani" rows={2} maxLength={75} className="text-[14px] font-bold leading-relaxed" />
          </Field>
          <Field label="Deskripsi Profil" helper="Penjelasan singkat nilai Anda" maxLength={180} currentLength={c.description?.length || 0}>
            <Textarea value={c.description || ""} onChange={(v) => upd("description", v)} placeholder="Jelaskan nilai yang Anda tawarkan secara singkat." rows={3} maxLength={180} />
          </Field>
          <Field label="Teks Kepercayaan" helper="Social proof kecil" maxLength={45} currentLength={c.trustText?.length || 0}>
            <TextInput value={c.trustText || ""} onChange={(v) => upd("trustText", v)} placeholder="Misal: Dipercaya 100+ klien" maxLength={45} />
          </Field>
        </div>
      </SectionGroup>

      <SectionGroup title="Tombol Aksi (CTA)" icon={LayoutGrid}>
        <div className="flex flex-col gap-5">
          <div className="space-y-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-6 w-1 rounded-full bg-emerald-500" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/60">Tombol Utama</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Label Tombol" maxLength={22} currentLength={c.primaryCta?.label?.length || 0}>
                <TextInput value={c.primaryCta?.label || ""} onChange={(v) => updCta("primaryCta", "label", v)} placeholder="Hubungi" maxLength={22} />
              </Field>
              <Field label="Tautan / URL">
                <TextInput value={c.primaryCta?.url || ""} onChange={(v) => updCta("primaryCta", "url", v)} placeholder="#contact" />
              </Field>
            </div>
          </div>
          <div className="space-y-5 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-6 w-1 rounded-full bg-white/20" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Tombol Sekunder</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Label Tombol" maxLength={22} currentLength={c.secondaryCta?.label?.length || 0}>
                <TextInput value={c.secondaryCta?.label || ""} onChange={(v) => updCta("secondaryCta", "label", v)} placeholder="Lihat Karya" maxLength={22} />
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

export function HeroStyleEditor({ section, onChange }: HeroEditorProps) {
  const s = section.style;
  const upd = (key: string, val: unknown) => onChange({ ...section, style: { ...s, [key]: val } });

  return (
    <div className="space-y-12">
      <SectionGroup title="Komposisi Layout" icon={AlignLeft}>
        <Field label="Perataan Konten Utama">
          <div className="grid grid-cols-3 gap-2 p-1 bg-black/40 rounded-lg border border-white/[0.04]">
            {[
              { value: "left", label: "Kiri", icon: AlignLeft },
              { value: "center", label: "Tengah", icon: AlignCenter },
              { value: "right", label: "Kanan", icon: AlignRight },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => upd("alignment", opt.value)}
                className={`flex flex-col items-center gap-1.5 py-2.5 rounded-md transition-all ${
                  s.alignment === opt.value ? "bg-white/[0.08] text-white shadow-sm" : "text-white/30 hover:text-white/60"
                }`}
              >
                <opt.icon className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-wider">{opt.label}</span>
              </button>
            ))}
          </div>
        </Field>
      </SectionGroup>

      <SectionGroup title="Styling Tombol (CTA)" icon={MousePointer2}>
        <div className="grid gap-8">
          {/* Primary CTA Styling */}
          <div className="space-y-6 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/60">Tombol Utama</p>
            <div className="grid gap-5">
              <Field label="Gaya Tombol">
                <SegmentControl
                  options={[
                    { value: "solid", label: "Solid" },
                    { value: "outline", label: "Outline" },
                    { value: "glass", label: "Glass" },
                    { value: "gradient", label: "Grad" },
                  ]}
                  value={s.primaryCtaStyle || "solid"}
                  onChange={(v) => upd("primaryCtaStyle", v)}
                />
              </Field>
              <Field label="Warna Tombol">
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => upd("primaryCtaColor", color.value)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        s.primaryCtaColor === color.value ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"
                      } ${color.class}`}
                    />
                  ))}
                </div>
              </Field>
            </div>
          </div>

          {/* Secondary CTA Styling */}
          <div className="space-y-6 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.02]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Tombol Sekunder</p>
            <div className="grid gap-5">
              <Field label="Gaya Tombol">
                <SegmentControl
                  options={[
                    { value: "outline", label: "Outline" },
                    { value: "soft", label: "Soft" },
                    { value: "ghost", label: "Ghost" },
                    { value: "glass", label: "Glass" },
                  ]}
                  value={s.secondaryCtaStyle || "outline"}
                  onChange={(v) => upd("secondaryCtaStyle", v)}
                />
              </Field>
              <Field label="Warna Tombol">
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => upd("secondaryCtaColor", color.value)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        s.secondaryCtaColor === color.value ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"
                      } ${color.class}`}
                    />
                  ))}
                </div>
              </Field>
            </div>
          </div>
        </div>
      </SectionGroup>

      <SectionGroup title="Warna Aksen Section" icon={Paintbrush}>
        <div className="grid gap-6">
          <Field label="Warna Utama Platform" helper="Mempengaruhi efek glow & ornamen Hero">
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => upd("accentColor", color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    s.accentColor === color.value ? "border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "border-transparent hover:scale-105"
                  } ${color.class}`}
                />
              ))}
            </div>
          </Field>
        </div>
      </SectionGroup>

      <SectionGroup title="Gaya Avatar" icon={Focus}>
        <div className="grid gap-6">
          <Field label="Bentuk Foto">
            <SegmentControl
              options={[
                { value: "circle", label: "Lingkaran" },
                { value: "oval", label: "Oval" },
                { value: "rounded-xl", label: "Kotak Halus" },
                { value: "rounded-2xl", label: "Pill" },
              ]}
              value={s.avatarShape || "circle"}
              onChange={(v) => upd("avatarShape", v)}
            />
          </Field>
          <Field label="Frame / Bingkai Visual">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { value: "none", label: "Tanpa Frame" },
                { value: "ring", label: "Clean Ring" },
                { value: "glow", label: "Soft Glow" },
                { value: "editorial", label: "Editorial" },
                { value: "badge", label: "Badge" },
                { value: "glass", label: "Glass" },
                { value: "signature", label: "Signature" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => upd("avatarFrame", opt.value)}
                  className={`py-2 px-1 rounded-lg border text-[10px] font-bold uppercase tracking-tight transition-all ${
                    s.avatarFrame === opt.value ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-white/[0.02] border-white/[0.04] text-white/30 hover:bg-white/[0.04]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </SectionGroup>

      <SectionGroup title="Latar Belakang Hero" icon={Monitor}>
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Premium Variants</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "editorial-light", label: "Editorial Light" },
                { value: "warm-luxury", label: "Warm Luxury" },
                { value: "soft-metallic", label: "Soft Metallic" },
                { value: "navy-premium", label: "Navy Premium" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => upd("backgroundVariant", opt.value)}
                  className={`py-3 px-3 rounded-xl border text-[11px] font-bold text-left transition-all ${
                    s.backgroundVariant === opt.value ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-white/[0.02] border-white/[0.04] text-white/40 hover:bg-white/[0.04]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Tonal & Gradients</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "solid", label: "Solid Color" },
                { value: "gradient", label: "Soft Gradient" },
                { value: "dual-tone", label: "Dual Tone" },
                { value: "aurora", label: "Aurora Glow" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => upd("backgroundVariant", opt.value)}
                  className={`py-2.5 px-3 rounded-xl border text-[11px] font-semibold text-left transition-all ${
                    s.backgroundVariant === opt.value ? "bg-white/[0.08] border-white/20 text-white shadow-lg" : "bg-white/[0.02] border-white/[0.04] text-white/40 hover:bg-white/[0.04]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Structural & Grid</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "premium-grid", label: "Premium Grid" },
                { value: "fine-lines", label: "Fine Lines" },
                { value: "tech-frame", label: "Tech Frame" },
                { value: "blueprint", label: "Subtle Blueprint" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => upd("backgroundVariant", opt.value)}
                  className={`py-2.5 px-3 rounded-xl border text-[11px] font-semibold text-left transition-all ${
                    s.backgroundVariant === opt.value ? "bg-white/[0.08] border-white/20 text-white shadow-lg" : "bg-white/[0.02] border-white/[0.04] text-white/40 hover:bg-white/[0.04]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Ornamental & Light</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "mesh", label: "Mesh Gradient" },
                { value: "radial", label: "Radial Spotlight" },
                { value: "glass", label: "Glass Glow" },
                { value: "noise", label: "Soft Noise" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => upd("backgroundVariant", opt.value)}
                  className={`py-2.5 px-3 rounded-xl border text-[11px] font-semibold text-left transition-all ${
                    s.backgroundVariant === opt.value ? "bg-white/[0.08] border-white/20 text-white shadow-lg" : "bg-white/[0.02] border-white/[0.04] text-white/40 hover:bg-white/[0.04]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SectionGroup>
    </div>
  );
}

export function HeroSettingsEditor({ section, onChange }: HeroEditorProps) {
  const set = section.settings;
  const upd = (key: string, val: unknown) => onChange({ ...section, settings: { ...set, [key]: val } });

  return (
    <div className="space-y-12">
      <SectionGroup title="Visibilitas Elemen" icon={Monitor}>
        <div className="grid gap-2">
          <Toggle
            label="Tampilkan Avatar"
            description="Foto profil tetap muncul di identity cluster."
            checked={set.showAvatar !== false}
            onChange={(v) => upd("showAvatar", v)}
          />
          <Toggle
            label="Tampilkan Verified Badge"
            description="Menampilkan status akun terverifikasi."
            checked={set.showVerifiedBadge !== false}
            onChange={(v) => upd("showVerifiedBadge", v)}
          />
          <Toggle
            label="Tampilkan Badge Kecil"
            description="Tampilkan label status kecil di atas identitas."
            checked={set.showBadge !== false}
            onChange={(v) => upd("showBadge", v)}
          />
          <Toggle
            label="Tampilkan Social Proof"
            description="Tampilkan teks kepercayaan di bawah tombol."
            checked={set.showTrustText !== false}
            onChange={(v) => upd("showTrustText", v)}
          />
          <Toggle
            label="Tampilkan Tombol Sekunder"
            checked={set.showSecondaryCta !== false}
            onChange={(v) => upd("showSecondaryCta", v)}
          />
        </div>
      </SectionGroup>

      <SectionGroup title="Efek Visual Hero" icon={Palette}>
        <div className="grid gap-2">
          <Toggle
            label="Border Glow Efek"
            description="Aktifkan efek cahaya halus di pinggiran section."
            checked={set.showAccentGlow !== false}
            onChange={(v) => upd("showAccentGlow", v)}
          />
        </div>
      </SectionGroup>

      <SectionGroup title="Perilaku Link" icon={Settings}>
        <div className="grid gap-2">
          <Toggle
            label="Buka Link di Tab Baru"
            description="Semua klik tombol aksi akan membuka tab baru."
            checked={!!set.openInNewTab}
            onChange={(v) => upd("openInNewTab", v)}
          />
        </div>
      </SectionGroup>

      <SectionGroup title="Animasi" icon={Sparkles}>
        <Field label="Efek Transisi Masuk">
          <SegmentControl
            options={[
              { value: "none", label: "Tanpa Efek" },
              { value: "fade-in", label: "Fade In" },
              { value: "fade-up", label: "Fade Up" },
            ]}
            value={set.animation || "none"}
            onChange={(v) => upd("animation", v as "none" | "fade-in" | "fade-up")}
          />
        </Field>
      </SectionGroup>
    </div>
  );
}

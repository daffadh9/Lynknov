"use client";

import { useState } from "react";
import { 
  EditorSection, 
  HeroSection, 
  AboutSection, 
  DigitalPresenceSection, 
  ShowcaseSection,
  PortfolioSection,
  StoryboardSection,
  LinkHubSection,
  TestimonialsSection
} from "@/types/editor";
import { Info, LayoutTemplate, Settings2, Type, GripVertical, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { ImageUpload } from "./media/image-upload";

interface SectionEditorPanelProps {
  section: EditorSection | null;
  onChange: (section: EditorSection) => void;
}

type TabType = "content" | "style" | "settings";

export function SectionEditorPanel({ section, onChange }: SectionEditorPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("content");

  if (!section) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-white/50 p-8 text-center h-full bg-[#050505]">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-white/20" />
        </div>
        <p className="text-sm">Pilih section dari sidebar untuk mulai mengedit</p>
      </div>
    );
  }

  const handleContentChange = (key: string, value: string | boolean | string[] | Record<string, unknown>[]) => {
    onChange({
      ...section,
      content: { ...section.content, [key]: value },
    });
  };

  const renderContentEditor = () => {
    if (section.type === "hero") {
      const heroContent = section.content as HeroSection["content"];
      return (
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white/90 mb-1">Aset Profil</h3>
            <p className="text-xs text-white/50 mb-6">Gambar yang akan menjadi wajah utama halaman ini.</p>
            <ImageUpload 
              label="Avatar / Foto Profil"
              value={heroContent.avatarUrl || ""}
              onChange={(url) => handleContentChange("avatarUrl", url)}
              recommendedSize="Rekomendasi ukuran 1:1 (min. 400x400px), format JPG/PNG"
              shape={section.style?.avatarShape === "circle" ? "circle" : "square"}
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white/90 mb-1">Informasi Utama</h3>
            <p className="text-xs text-white/50 mb-6">Identitas yang tampil di bagian paling atas.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">Nama</label>
                <input
                  type="text"
                  value={heroContent.name || ""}
                  onChange={(e) => handleContentChange("name", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">Profesi / Role</label>
                <input
                  type="text"
                  value={heroContent.role || ""}
                  onChange={(e) => handleContentChange("role", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  placeholder="Mis: Product Designer & Builder"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">Headline Utama</label>
                <textarea
                  value={heroContent.headline || ""}
                  onChange={(e) => handleContentChange("headline", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all min-h-[80px] resize-none"
                  placeholder="Headline singkat dan menarik"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">Deskripsi Singkat</label>
                <textarea
                  value={heroContent.description || ""}
                  onChange={(e) => handleContentChange("description", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all min-h-[100px] resize-none"
                  placeholder="Jelaskan apa yang Anda lakukan"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (section.type === "about") {
      const aboutContent = section.content as AboutSection["content"];
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Judul Section</label>
              <input
                type="text"
                value={aboutContent.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                placeholder="Mis: Tentang Saya"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Deskripsi Lengkap</label>
              <textarea
                value={aboutContent.description || ""}
                onChange={(e) => handleContentChange("description", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all min-h-[120px] resize-none"
                placeholder="Ceritakan kisah Anda atau brand Anda"
              />
            </div>
          </div>
        </div>
      );
    }

    if (section.type === "digital_presence") {
      const dpContent = section.content as DigitalPresenceSection["content"];
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Judul Section</label>
              <input
                type="text"
                value={dpContent.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                placeholder="Mis: Temukan Saya Di"
              />
            </div>
            {/* Note: Full links editor array would go here */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center text-white/50 text-xs">
              List Link Platform akan diatur di sini (segera hadir).
            </div>
          </div>
        </div>
      );
    }

    if (section.type === "showcase") {
      const showcaseContent = section.content as ShowcaseSection["content"];
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Judul Section</label>
              <input
                type="text"
                value={showcaseContent.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                placeholder="Mis: Showcase Storefront"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Deskripsi Section</label>
              <textarea
                value={showcaseContent.description || ""}
                onChange={(e) => handleContentChange("description", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all min-h-[80px] resize-none"
                placeholder="Deskripsi singkat pengantar karya atau penawaran"
              />
            </div>
            {/* Note: Full showcase items editor array would go here */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center text-white/50 text-xs">
              Manajemen item showcase (tambah, edit, hapus) akan diatur di sini.
            </div>
          </div>
        </div>
      );
    }

    if (section.type === "portfolio" || section.type === "storyboard" || section.type === "link_hub" || section.type === "testimonials") {
      const genericContent = section.content as PortfolioSection["content"] | StoryboardSection["content"] | LinkHubSection["content"] | TestimonialsSection["content"];
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Judul Section</label>
              <input
                type="text"
                value={genericContent.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                placeholder="Judul section"
              />
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center text-white/50 text-xs">
              Area manajemen list {section.type} akan diatur di sini.
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center text-white/50 text-sm">
        <p>Editor konten untuk <span className="text-white/90 font-medium">{section.type}</span> belum tersedia.</p>
      </div>
    );
  };

  const renderStyleEditor = () => {
    if (section.type === "hero") {
      const heroStyle = section.style as HeroSection["style"];
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Alignment</label>
              <div className="flex gap-2">
                {["left", "center", "right"].map((align) => (
                  <button
                    key={align}
                    onClick={() => onChange({ ...section, style: { ...section.style, alignment: align } })}
                    className={cn(
                      "flex-1 py-2 text-sm font-medium rounded-lg border transition-all capitalize",
                      heroStyle.alignment === align
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                        : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                    )}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Background Variant</label>
              <div className="grid grid-cols-2 gap-2">
                {["solid", "gradient", "premium-grid", "mesh"].map((bg) => (
                  <button
                    key={bg}
                    onClick={() => onChange({ ...section, style: { ...section.style, backgroundVariant: bg } })}
                    className={cn(
                      "py-2 px-3 text-sm font-medium rounded-lg border transition-all text-left capitalize",
                      heroStyle.backgroundVariant === bg
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                        : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                    )}
                  >
                    {bg.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Avatar Shape</label>
              <div className="flex gap-2">
                {["circle", "rounded-xl", "rounded-2xl"].map((shape) => (
                  <button
                    key={shape}
                    onClick={() => onChange({ ...section, style: { ...section.style, avatarShape: shape } })}
                    className={cn(
                      "flex-1 py-2 text-sm font-medium rounded-lg border transition-all capitalize",
                      heroStyle.avatarShape === shape
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                        : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                    )}
                  >
                    {shape.replace("rounded-", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-white/50 text-sm flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
          <Settings2 className="w-5 h-5 text-white/30" />
        </div>
        <div>
          <p className="font-medium text-white/70">Area Konfigurasi Belum Aktif</p>
          <p className="text-xs mt-1">Kami sedang menyiapkan form untuk mengatur desain section ini.</p>
        </div>
      </div>
    );
  };

  const renderSettingsEditor = () => {
    if (section.type === "hero") {
      const heroSettings = section.settings as HeroSection["settings"];
      return (
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white/90 mb-1">Pengaturan Tambahan</h3>
            <p className="text-xs text-white/50 mb-6">Sesuaikan behavior section ini.</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-0.5">Tampilkan Badge Verifikasi</label>
                  <p className="text-xs text-white/50">Menampilkan centang biru di sebelah nama</p>
                </div>
                <button
                  onClick={() => onChange({ ...section, settings: { ...section.settings, showBadge: !heroSettings.showBadge } })}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative",
                    heroSettings.showBadge ? "bg-emerald-500" : "bg-white/10"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                      heroSettings.showBadge ? "translate-x-6 left-0" : "translate-x-1 left-0"
                    )}
                  />
                </button>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">Animasi Masuk</label>
                <select
                  value={heroSettings.animation || "fade-up"}
                  onChange={(e) => onChange({ ...section, settings: { ...section.settings, animation: e.target.value } })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none"
                >
                  <option value="none" className="bg-[#050505]">Tidak Ada</option>
                  <option value="fade-up" className="bg-[#050505]">Fade Up</option>
                  <option value="fade-in" className="bg-[#050505]">Fade In</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-white/50 text-sm flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
          <Settings2 className="w-5 h-5 text-white/30" />
        </div>
        <div>
          <p className="font-medium text-white/70">Area Pengaturan Belum Aktif</p>
          <p className="text-xs mt-1">Opsi lanjutan untuk section ini akan segera hadir.</p>
        </div>
      </div>
    );
  };

  const getSectionSummary = () => {
    switch (section.type) {
      case "hero": return "Kesan pertama. Pastikan foto dan headline mencerminkan identitas utama Anda.";
      case "about": return "Ceritakan kisah, filosofi, atau pendekatan Anda secara ringkas.";
      case "digital_presence": return "Hubungkan platform sosial media agar pengunjung bisa berinteraksi lebih jauh.";
      case "showcase": return "Tampilkan karya atau penawaran utama Anda di sini.";
      case "storyboard": return "Ceritakan timeline perjalanan atau highlight karir penting.";
      case "portfolio": return "Kumpulan studi kasus atau proyek yang pernah dikerjakan.";
      case "link_hub": return "Daftar link ke berbagai aset lain milik Anda.";
      case "testimonials": return "Social proof dari klien atau partner untuk meningkatkan trust.";
      default: return "Atur konten dan tampilan section ini.";
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#050505]">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <h2 className="text-xl font-semibold text-white/90">
          Edit {section.label}
        </h2>
        <p className="text-sm text-white/50 mt-1">
          {section.type === "hero" && "Bagian pertama yang dilihat pengunjung. Gunakan headline yang jelas dan kuat."}
          {section.type === "about" && "Ceritakan secara singkat siapa Anda dan apa value yang Anda bawa."}
          {section.type === "digital_presence" && "Tampilkan platform sosial dan eksistensi digital Anda."}
          {section.type === "showcase" && "Tampilkan karya pilihan atau highlight visual."}
          {section.type === "portfolio" && "Tampilkan proyek utama dengan penjelasan lebih mendalam."}
          {section.type === "testimonials" && "Bukti sosial untuk menaikkan trust."}
          {section.type === "contact" && "Arahkan visitor melakukan aksi."}
          {section.type === "footer" && "Link kecil tambahan seperti legal, social, atau catatan brand."}
        </p>
      </div>

      {/* Tabs */}
      <div className="px-6 border-b border-white/5 flex gap-6">
        <button
          onClick={() => setActiveTab("content")}
          className={cn(
            "flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors",
            activeTab === "content"
              ? "border-emerald-500 text-emerald-500"
              : "border-transparent text-white/50 hover:text-white/80"
          )}
        >
          <Type className="w-4 h-4" />
          Konten
        </button>
        <button
          onClick={() => setActiveTab("style")}
          className={cn(
            "flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors",
            activeTab === "style"
              ? "border-emerald-500 text-emerald-500"
              : "border-transparent text-white/50 hover:text-white/80"
          )}
        >
          <LayoutTemplate className="w-4 h-4" />
          Tampilan
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={cn(
            "flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors",
            activeTab === "settings"
              ? "border-emerald-500 text-emerald-500"
              : "border-transparent text-white/50 hover:text-white/80"
          )}
        >
          <Settings2 className="w-4 h-4" />
          Pengaturan
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {activeTab === "content" && renderContentEditor()}
        {activeTab === "style" && renderStyleEditor()}
        {activeTab === "settings" && renderSettingsEditor()}
      </div>
    </div>
  );
}

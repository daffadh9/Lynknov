# Lynknov — Asset Library: Full Product & Engineering Context

> **Dokumen ini adalah konteks lengkap untuk AI coding agent.**
> Baca seluruh dokumen sebelum menulis satu baris kode pun.
> Setiap keputusan desain dan arsitektur di sini sudah dipikirkan matang.

---

## 1. Tentang Lynknov

**Lynknov** adalah **Interactive Business OS** — platform all-in-one untuk kreator dan bisnis di Indonesia agar bisa mengelola seluruh kehadiran digital mereka dalam satu ekosistem.

### Pilar produk Lynknov

| Pilar | Fungsi |
|---|---|
| **Public Page** | Halaman publik interaktif (link-in-bio evolved) |
| **Portfolio** | Showcase proyek dan karya |
| **Commercial Hub** | Toko / katalog produk & jasa |
| **Marketing Suite** | Tools kampanye dan pemasaran |
| **Asset Library** | Pusat media global lintas seluruh pilar |

### Positioning brand

- Premium, modern, dark luxury
- Bukan SaaS generik — terasa seperti creative operating system
- Target: kreator, UMKM digital, profesional Indonesia
- Bahasa UI: Bahasa Indonesia

---

## 2. Prinsip Utama Asset Library

> **"Asset milik workspace, bukan milik editor."**
> **"Assets are global. Usage is contextual."**

Asset Library adalah **infrastruktur global Lynknov** — bukan fitur kecil milik Page Editor.

### Apa artinya global?

Satu gambar yang diupload user bisa dipakai di:
- Hero Background → Public Page
- Project Cover → Portfolio
- Product Thumbnail → Commercial Hub
- Campaign Visual → Marketing Suite

Kalau asset hanya hidup di editor, ini tidak mungkin. Asset harus berdiri sendiri sebagai workspace mandiri.

---

## 3. Kondisi Sekarang (Yang Harus Diubah)

### 3.1 Masalah kritis

#### ❌ Problem 1 — Asset Library hidup di dalam Page Editor

**Kondisi sekarang:** Asset Library adalah sub-panel dari Page Editor. Header masih punya "Fokus Edit / Seimbang / Fokus Preview" — logika ini milik editor, bukan asset workspace.

**Dampak:**
- User bingung: "ini editor atau asset manager?"
- Asset terasa hanya untuk Public Page, bukan lintas pilar
- Tidak scalable — nanti Portfolio dan Commercial Hub harus bikin sistem upload sendiri

**Solusi:** Pisahkan total. Asset Library = halaman global mandiri di dashboard utama.

---

#### ❌ Problem 2 — Header membawa warisan editor

**Yang harus dihapus dari halaman Asset Library:**
- Toggle `Fokus Edit`
- Toggle `Seimbang`
- Toggle `Fokus Preview`
- Tombol `Preview` (editor-specific)
- Tombol `Save` / `Publish` (editor-specific)
- Logic split editor-preview

---

#### ❌ Problem 3 — Detail asset pakai modal besar

**Kondisi sekarang:** Klik asset → muncul modal overlay besar yang menutup context.

**Masalah:** Browsing flow terputus. User harus buka-tutup modal terus.

**Solusi:** Ganti dengan **persistent right panel** yang selalu ada dan update saat asset diklik.

---

#### ❌ Problem 4 — Visual belum premium

**Masalah:**
- Background terlalu flat hitam, tidak ada depth
- Asset card terasa seperti Windows Explorer
- Stats card terlalu template SaaS generik
- Tidak ada atmospheric layer — terasa mati

---

### 3.2 Yang sudah bagus & harus dipertahankan

| Fitur | Status | Catatan |
|---|---|---|
| Safe delete logic | ✅ Pertahankan | "Tidak bisa dihapus (sedang dipakai)" — premium feature |
| Usage tracking lintas pilar | ✅ Pertahankan | Hero Background/Public Page, Project Cover/Portfolio |
| Filter tipe file di sidebar | ✅ Pertahankan | Struktur sudah benar, visual perlu di-upgrade |
| Dark theme base | ✅ Pertahankan | Arahnya sudah benar, tinggal di-deepen |
| Stats 4 metrik | ✅ Pertahankan | Total Asset, Sedang Dipakai, Folder, Storage |
| Google Drive & Embed URL button | ✅ Pertahankan | Jadikan source tabs yang lebih prominent |

---

## 4. Arsitektur Produk yang Benar

```
LYNKNOV DASHBOARD
├── Public Page
├── Portfolio
├── Commercial Hub
├── Marketing Suite
├── Assets          ← Asset Library (GLOBAL WORKSPACE)
└── Settings

PAGE EDITOR
└── Asset Picker    ← Komponen RINGAN, bukan Asset Manager penuh
    ├── Recent assets
    ├── Search cepat
    ├── Upload cepat
    └── Pick & attach
```

### Pembagian peran yang tegas

| | Global Asset Library | Editor Asset Picker |
|---|---|---|
| **Lokasi** | Dashboard utama, menu global | Dalam Page Editor (panel/drawer) |
| **Fungsi** | Kelola, organisir, inspect, connect source | Pilih dan pasang asset ke section |
| **Fitur** | Upload massal, folder, tagging, usage map, delete, rename, move, connect Drive | Recent assets, search ringan, upload cepat, pick & attach |
| **Rasa** | Workspace penuh, immersive | Compact, cepat, contextual |

---

## 5. Layout Target — Struktur 3 Zona

```
┌─────────────────────────────────────────────────────────────────┐
│  TOP WORKSPACE BAR (sticky)                                     │
│  ← Asset Library | Kelola visual, audio... | [Search] [Actions] │
├──────────────┬──────────────────────────────┬───────────────────┤
│              │  STATS STRIP                  │                   │
│  LEFT        ├──────────────────────────────┤   RIGHT           │
│  FILTER      │  SOURCE TABS + CONTROLS       │   DETAIL          │
│  RAIL        │  All Assets | Uploads | Drive │   PANEL           │
│  (220px)     ├──────────────────────────────┤   (320px)         │
│              │                              │                   │
│  Tipe File   │     MAIN ASSET GRID          │   Preview         │
│  Status      │     (flex grow)              │   Metadata        │
│  Source      │                              │   Usage           │
│  Collections │                              │   Actions         │
│              │                              │                   │
└──────────────┴──────────────────────────────┴───────────────────┘
```

---

## 6. Spesifikasi Komponen Detail

### 6.1 Top Workspace Bar

**Ganti total** header lama yang masih bawa logika editor.

**Struktur:**
```
[←] [Asset Library]  [Kelola visual, audio...]  [🔍 Search...]  [Folder Baru] [Hubungkan Sumber] [⬆ Upload File]
```

**Spesifikasi:**
- Sticky di atas, visible saat scroll
- Background: dark elevated surface (bukan transparent/blur)
- Border bawah: sangat tipis, halus
- Title: font besar, editorial, font-weight 500
- Subtitle: muted, singkat
- Search bar: command-feel, rounded premium, ada shortcut hint `⌘K`
- Tombol Upload: primary (hijau emerald Lynknov)
- Tombol Folder Baru & Hubungkan Sumber: secondary (dark elevated)

**Yang TIDAK boleh ada:**
- Fokus Edit
- Seimbang
- Fokus Preview
- Save button
- Publish button
- Preview button (editor)

---

### 6.2 Stats Strip

**4 metrik kompak:**

| Metrik | Value | Sub-label |
|---|---|---|
| Total Asset | n | "Ready" |
| Sedang Dipakai | n | "Assets" |
| Folder | n | "Groups" |
| Storage Used | n MB/GB | - |

**Visual:**
- Horizontal strip, 4 card kompak
- Bukan bulky dashboard card — lebih slim dan refined
- Angka utama: besar, kuat
- Label: kecil, muted, uppercase tipis
- Background: sedikit elevated dari base

---

### 6.3 Left Filter Rail

**Slim, elegant, workspace rail — bukan form panel.**

```
LIBRARY FILTERS                    [Reset]

TIPE FILE
● Semua                         1
  Gambar                        1
  Audio                         0
  Dokumen                       0
  Video                         0
  Embed                         0

STATUS PENGGUNAAN
  Sedang Dipakai
  Belum Dipakai
  Baru Diunggah
  Terhubung

SUMBER
  Upload Lokal
  Google Drive
  Embed URL

KOLEKSI
  Public Page
  Portfolio
  Product Media
  Campaign
  + Buat Koleksi Baru
```

**Visual:**
- Width: 220px fixed
- Section label: 10px, uppercase, letter-spacing 0.08em, muted
- Item aktif: subtle emerald pill/highlight — bukan neon nyala
- Count: kecil, di kanan, muted
- Collapsible sections dengan animasi halus
- Tidak ada kotak besar yang membungkus setiap item

---

### 6.4 Source Tabs & Controls

**Tepat di atas main grid:**

```
[All Assets] [Uploads] [Google Drive] [Embed]          [Sort: Terbaru ▾] [⊞] [≡]
```

**Source tabs:**
- All Assets (default)
- Uploads
- Google Drive (dengan logo Drive)
- Embed

**Sort options:**
- Terbaru (default)
- Terlama
- Nama A–Z
- Ukuran terbesar
- Paling sering dipakai

**View toggle:**
- Grid (default)
- List

---

### 6.5 Asset Grid

**Layout:**
- Grid responsif, kolom otomatis
- Gap: 16px antar card
- Tidak terlalu padat, tidak terlalu jarang
- Curated feel, bukan file dump

**Hover behavior:**
- Card sedikit naik (subtle elevation)
- Border glow tipis emerald
- Metadata makin visible
- Quick action icons muncul di atas thumbnail (preview, rename, more)

**Selected behavior:**
- Outline emerald 1.5px
- Background card sedikit elevated
- Right panel langsung update

---

### 6.6 Asset Card

**Struktur setiap card:**

```
┌─────────────────────────┐
│                         │
│      THUMBNAIL          │  ← Dominant, landscape/square ratio
│      (preview besar)    │
│                         │
│  [IMAGE] [IN USE] [NEW] │  ← Badges tipis
├─────────────────────────┤
│ IMG-20250911-WA0064     │  ← Filename, truncated clean
│ Image · 0.1 MB          │  ← Type + size, satu baris
└─────────────────────────┘
```

**Badge types:**

| Badge | Kondisi | Warna |
|---|---|---|
| `IMAGE` / `AUDIO` / `DOCUMENT` / `EMBED` | Tipe file | Neutral abu |
| `IN USE` | Asset sedang dipakai | Emerald hijau |
| `NEW` | Baru diupload | Biru |
| `DRIVE` | Dari Google Drive | Warna Drive |
| `LINKED` | Dari Embed URL | Abu-abu |

**Transparent asset:** gunakan checkerboard pattern premium (dark + slightly lighter), bukan putih polos.

**Audio/Document asset:** placeholder visual kustom yang premium — bukan ikon generik.

---

### 6.7 Right Detail Panel

**Persistent — selalu ada, update saat asset diklik.**

```
┌─────────────────────────────┐
│                             │
│        PREVIEW AREA         │
│       (preview besar)       │
│                             │
│       [↗] [⬇]              │
├─────────────────────────────┤
│ IDENTITAS                   │
│ IMG-20250911-WA0064         │
│ [OTHER] · 06 Apr 2026       │
├─────────────────────────────┤
│ METADATA                    │
│ Ukuran          0.06 MB     │
│ Tipe            Image       │
│ Format          JPG         │
│ Dimensi         800 × 600   │
│ Sumber          Upload      │
├─────────────────────────────┤
│ PENGGUNAAN                  │
│ ✓ Hero Background           │
│   Public Page          Lihat│
│ ✓ Project Cover             │
│   Portfolio            Lihat│
├─────────────────────────────┤
│ AKSI                        │
│ [Rename] [Move] [Replace]   │
│ [Download] [Copy Link]      │
│ [Archive]                   │
│ ─────────────────────────── │
│ [Tidak bisa dihapus ⚠]     │  ← Jika sedang dipakai
└─────────────────────────────┘
```

**Quick actions di preview:**
- ↗ Open / Fullscreen
- ⬇ Download

**Actions group:**
- Primary: Rename, Move, Replace, Download, Copy Link
- Secondary: Archive
- Danger (disabled jika in-use): Delete

---

### 6.8 Safe Delete Logic

**Ini adalah fitur premium — jangan dihilangkan atau disederhanakan.**

**Case A — Asset tidak dipakai:**
```
Hapus "IMG-20250911-WA0064"?
Asset ini akan dihapus permanen dari library.

[Batal]  [Hapus]
```

**Case B — Asset sedang dipakai:**
```
⚠ Tidak bisa dihapus

Asset ini masih digunakan di 2 lokasi:
• Hero Background — Public Page        [Lihat]
• Project Cover — Portfolio            [Lihat]

Lepas asset dari semua lokasi terlebih dahulu
sebelum menghapusnya.

[Oke, mengerti]
```

**Rules:**
- Tombol delete disabled (bukan hidden) saat asset in-use
- Tooltip/tooltip muncul saat hover delete yang disabled
- Warna warning: amber/kuning lembut — BUKAN merah agresif
- Copy harus informatif dan profesional

---

### 6.9 Usage Block

**Tampilkan sebagai mini usage cards, bukan plain list.**

```
PENGGUNAAN

┌─────────────────────────────┐
│ ✓  Hero Background    Lihat │
│    Public Page              │
└─────────────────────────────┘
┌─────────────────────────────┐
│ ✓  Project Cover      Lihat │
│    Portfolio                │
└─────────────────────────────┘
```

**Data yang ditampilkan per item:**
- Nama penggunaan (e.g., "Hero Background")
- Pilar/konteks (e.g., "Public Page")
- Tombol "Lihat" → navigate ke konteks tersebut
- Status icon (checkmark hijau = aktif dipakai)

---

## 7. States yang Harus Diimplementasi

### State 1 — Empty State

**Kapan:** Library masih kosong, belum ada asset.

**Layout:**
```
         [Ilustrasi abstract/grid media]
     
      Bangun pustaka asset pertamamu
      
  Unggah visual, audio, dokumen, dan sumber media
  untuk dipakai di Public Page, Portfolio, dan
  workspace Lynknov lainnya.
  
  [⬆ Upload Asset]  [Hubungkan Google Drive]
```

**Visual requirements:**
- Ilustrasi harus premium dan abstract — bukan clipart
- Tetap dark themed — jangan light/playful
- Aspiratif, bukan error-like

---

### State 2 — Browsing State

**Default state.** User melihat seluruh asset dalam grid.

**Requirements:**
- Grid rapih, curated, breathable
- Filter rail aktif di kiri
- Right panel: empty atau hint "Pilih asset untuk melihat detail"
- Source tabs menunjukkan tab aktif

---

### State 3 — Search State

**Kapan:** User mengetik di search bar.

**Behavior:**
- Real-time filter grid
- Jumlah hasil tampil: "3 asset ditemukan"
- Query bisa di-clear dengan `×`
- Empty search result state jika tidak ada

**Empty search result:**
```
Tidak ada asset yang cocok untuk "nama query"

Coba kata kunci lain, ubah filter, 
atau unggah asset baru.

[Hapus Pencarian]  [Upload Asset]
```

---

### State 4 — Upload Progress State

**Jangan pakai modal.** Tampilkan inline di dalam grid atau sebagai toast/progress strip.

**Inline card saat uploading:**
```
┌─────────────────────────┐
│   [Progress bar 60%]    │
│   Mengunggah...         │
│   nama-file.jpg         │
│   0.4 MB                │
└─────────────────────────┘
```

---

### State 5 — Upload Success State

```
Toast: "Asset berhasil ditambahkan ke library"
```

- Asset baru muncul di grid dengan badge `NEW`
- Auto-scroll ke asset baru
- Right panel langsung aktif menampilkan detail asset baru
- Badge `NEW` hilang setelah beberapa detik atau saat user navigate away

---

### State 6 — Selected Asset State

- Card punya outline emerald
- Right panel aktif dengan full detail
- Semua info dan action tersedia

---

### State 7 — In-Use Locked State

- Delete button disabled
- Tooltip muncul: "Sedang dipakai di 2 lokasi"
- Usage block menampilkan semua lokasi
- Warning lembut, bukan merah agresif

---

### State 8 — Filtered State

- Grid menampilkan hasil filter
- Active filter chips tampil di atas grid
- Jumlah hasil: "Menampilkan 3 dari 12 asset"
- Clear all filters button tersedia

---

### State 9 — Source: Google Drive (Belum Connect)

```
Tab "Google Drive" diklik:

[Logo Drive]
Hubungkan Google Drive

Akses file dari Google Drive untuk 
digunakan di seluruh workspace Lynknov.

[Hubungkan Google Drive]
```

---

### State 10 — Error State

**Upload gagal:**
```
Toast: "Upload gagal. Coba lagi atau gunakan file lain."
[Coba Lagi]
```

**Source disconnect:**
```
⚠ Koneksi ke Google Drive bermasalah.
[Hubungkan Ulang]
```

---

## 8. Visual Language & Design System

### 8.1 Color Palette (Dark Premium)

```
Background base:     #0D0D0F  (dark charcoal, BUKAN flat black)
Background surface:  #111114  (elevated panels)
Background card:     #161619  (asset cards, filter items)
Background elevated: #1C1C20  (right panel, modals)

Emerald accent:      #10B981  (primary brand — Lynknov green)
Emerald subtle:      rgba(16, 185, 129, 0.08)  (ambient glow areas)
Emerald border:      rgba(16, 185, 129, 0.25)  (active states)

Text primary:        #F4F4F5
Text secondary:      #A1A1AA
Text muted:          #71717A
Text disabled:       #3F3F46

Border default:      rgba(255, 255, 255, 0.06)
Border hover:        rgba(255, 255, 255, 0.12)
Border active:       rgba(16, 185, 129, 0.4)

Badge neutral bg:    #27272A
Badge neutral text:  #A1A1AA
Badge green bg:      rgba(16, 185, 129, 0.15)
Badge green text:    #34D399
Badge blue bg:       rgba(59, 130, 246, 0.15)
Badge blue text:     #60A5FA
```

---

### 8.2 Atmospheric Layer

**Ini penting untuk premium feel.** Background bukan flat hitam — ada depth dan life.

**Implementasi:**

```css
/* Base background */
.workspace-shell {
  background: #0D0D0F;
  position: relative;
  overflow: hidden;
}

/* Subtle emerald glow — kiri atas */
.workspace-shell::before {
  content: '';
  position: absolute;
  top: -200px;
  left: -200px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

/* Subtle glow — kanan bawah */
.workspace-shell::after {
  content: '';
  position: absolute;
  bottom: -200px;
  right: -200px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.02) 0%, transparent 70%);
  pointer-events: none;
}
```

**Aturan atmospheric:**
- Glow hanya di 1-2 sudut, bukan di semua sisi
- Opacity sangat rendah (2-6%) — subtle, bukan gaming
- Jangan tambah glow di area konten aktif — hanya di background
- Noise/grain texture OPSIONAL — jika dipakai, opacity max 3%

---

### 8.3 Layered Surface System

```
Level 0 — Base:        #0D0D0F  ← Background halaman
Level 1 — Card:        #111114  ← Asset cards, stats
Level 2 — Panel:       #161619  ← Left rail, right panel
Level 3 — Elevated:    #1C1C20  ← Hover states, modals, tooltips
Level 4 — Focus:       + emerald border  ← Selected/active
```

Setiap level naik, background sedikit lebih terang dan border sedikit lebih visible.

---

### 8.4 Typography Hierarchy

```
Title halaman:    24px / weight 500 / #F4F4F5
Section heading:  13px / weight 500 / #F4F4F5
Section label:    10px / weight 500 / #71717A / uppercase / letter-spacing 0.08em
Body text:        14px / weight 400 / #A1A1AA
Metadata:         12px / weight 400 / #71717A
Stats number:     28px / weight 500 / #F4F4F5
Stats label:      11px / weight 400 / #71717A / uppercase
Badge text:       10px / weight 500
```

---

### 8.5 Border & Shadow System

```css
/* Border default */
border: 0.5px solid rgba(255, 255, 255, 0.06);

/* Border hover */
border: 0.5px solid rgba(255, 255, 255, 0.12);

/* Border active / selected */
border: 1px solid rgba(16, 185, 129, 0.4);
box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.08);

/* Card shadow */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);

/* Elevated panel shadow */
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
```

---

### 8.6 Border Radius

```
Workspace shell:    0px (full viewport)
Panel containers:   12px
Cards:              10px
Badges / pills:     99px (full round)
Buttons:            8px
Input fields:       8px
Modal:              16px
```

---

### 8.7 Spacing System

```
Page padding horizontal:   24px
Panel internal padding:    16px / 20px
Card internal padding:     12px
Grid gap:                  16px
Section gap:               24px
Item gap dalam list:       8px
```

---

## 9. Interaksi & Animasi

### Prinsip animasi

- Subtle, tidak mengganggu
- Duration: 150-200ms untuk micro, 250-300ms untuk transitions
- Easing: `ease-out` untuk masuk, `ease-in` untuk keluar
- Jangan ada animasi yang terasa "SaaS template"

### Animasi spesifik

```css
/* Card hover */
.asset-card:hover {
  transform: translateY(-2px);
  transition: transform 150ms ease-out, border-color 150ms ease-out;
}

/* Panel update (saat asset diklik) */
.right-panel {
  transition: opacity 200ms ease-out;
}

/* Asset masuk ke grid (setelah upload) */
@keyframes assetEnter {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
.asset-card.new {
  animation: assetEnter 250ms ease-out;
}

/* Filter change */
.asset-grid {
  transition: opacity 150ms ease-out;
}
```

---

## 10. Tech Stack

```
Framework:      Next.js 14+ / TypeScript
Styling:        Tailwind CSS
Animation:      Framer Motion
Backend:        Supabase (storage + database + auth)
File upload:    Supabase Storage (direct upload)
State:          Zustand atau React useState/useReducer
Icons:          Lucide React
```

### Supabase Schema (Asset Library)

```sql
-- Tabel utama assets
CREATE TABLE assets (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id  UUID NOT NULL REFERENCES workspaces(id),
  user_id       UUID NOT NULL REFERENCES auth.users(id),
  name          TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_path     TEXT NOT NULL,  -- path di Supabase Storage
  file_url      TEXT NOT NULL,  -- public URL
  file_size     BIGINT NOT NULL,  -- bytes
  file_type     TEXT NOT NULL,  -- 'image', 'audio', 'document', 'video', 'embed'
  mime_type     TEXT,
  dimensions    JSONB,  -- { width, height } untuk gambar
  duration      INTEGER,  -- detik, untuk audio/video
  source        TEXT DEFAULT 'upload',  -- 'upload', 'google_drive', 'embed'
  source_url    TEXT,  -- original URL jika dari Drive/Embed
  folder_id     UUID REFERENCES asset_folders(id),
  tags          TEXT[],
  is_archived   BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Tabel penggunaan (lintas pilar)
CREATE TABLE asset_usages (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id    UUID NOT NULL REFERENCES assets(id) ON DELETE RESTRICT,
  context     TEXT NOT NULL,  -- 'hero_background', 'project_cover', dll
  pillar      TEXT NOT NULL,  -- 'public_page', 'portfolio', 'commercial_hub', dll
  pillar_id   UUID,  -- ID spesifik halaman/proyek
  pillar_name TEXT,  -- nama display, e.g., "My Public Page"
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Tabel folder/koleksi
CREATE TABLE asset_folders (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES workspaces(id),
  name         TEXT NOT NULL,
  color        TEXT,
  icon         TEXT,
  created_at   TIMESTAMPTZ DEFAULT now()
);
```

### RLS Policy (Row Level Security)

```sql
-- User hanya bisa akses asset milik workspace mereka
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User can access own workspace assets"
  ON assets FOR ALL
  USING (workspace_id = get_user_workspace_id(auth.uid()));
```

---

## 11. Component Structure (File Architecture)

```
src/
├── app/
│   ├── (dashboard)/
│   │   └── assets/
│   │       └── page.tsx              ← Halaman utama Asset Library
│
├── components/
│   └── asset-library/
│       ├── AssetLibraryShell.tsx     ← Wrapper + atmospheric bg
│       ├── AssetWorkspaceBar.tsx     ← Top bar (BUKAN editor header)
│       ├── AssetStatsStrip.tsx       ← 4 metrik kompak
│       ├── AssetFilterRail.tsx       ← Left sidebar filter
│       ├── AssetMainArea.tsx         ← Zona tengah (tabs + grid)
│       ├── AssetSourceTabs.tsx       ← All/Uploads/Drive/Embed tabs
│       ├── AssetGrid.tsx             ← Grid layout + loading state
│       ├── AssetCard.tsx             ← Individual asset card
│       ├── AssetDetailPanel.tsx      ← Right persistent panel
│       ├── AssetUsageBlock.tsx       ← Penggunaan lintas pilar
│       ├── AssetUploadZone.tsx       ← Dropzone + upload UI
│       ├── AssetEmptyState.tsx       ← State kosong premium
│       ├── AssetSearchBar.tsx        ← Command-feel search
│       └── AssetDeleteDialog.tsx     ← Safe delete confirmation
│
├── hooks/
│   ├── useAssets.ts                  ← Fetch, filter, search assets
│   ├── useAssetUpload.ts             ← Upload logic + progress
│   └── useAssetUsage.ts             ← Usage tracking queries
│
└── lib/
    └── supabase/
        └── assets.ts                 ← Supabase queries untuk assets
```

---

## 12. Master Prompt untuk Coding Agent

Gunakan prompt di bawah ini secara lengkap saat meminta AI untuk mengerjakan fitur ini.

---

```
You are an expert senior frontend engineer and product designer working on Lynknov — an Interactive Business OS for creators and businesses in Indonesia.

## Project context
- Lynknov is a dark premium platform — think creative operating system, not SaaS dashboard
- Tech stack: Next.js 14 + TypeScript + Tailwind CSS + Framer Motion + Supabase
- UI language: Bahasa Indonesia
- Brand color: Emerald green (#10B981) on dark charcoal base

## Your task
Refactor the Asset Library page into a standalone global media workspace,
completely separated from the Page Editor.

## CRITICAL — Remove these immediately
The current implementation has editor UI contamination. Remove ALL of these:
- "Fokus Edit" toggle
- "Seimbang" toggle  
- "Fokus Preview" toggle
- Editor Save/Publish buttons
- Editor Preview button
- Any split editor-preview layout logic

These belong to Page Editor ONLY. Asset Library is a separate global workspace.

## Product principles (MUST follow)
- Asset Library = global workspace (own page in dashboard, not inside editor)
- Editor = composition tool (will have a lightweight Asset Picker later, not built here)
- "Assets are global. Usage is contextual."
- One asset can be used across: Public Page, Portfolio, Commercial Hub, Marketing Suite

## Layout — 3 zones (strictly follow this)

### Zone 1: Left Filter Rail (220px fixed)
- Section: Tipe File → Semua, Gambar, Audio, Dokumen, Video, Embed (with count)
- Section: Status Penggunaan → Sedang Dipakai, Belum Dipakai, Baru Diunggah
- Section: Sumber → Upload Lokal, Google Drive, Embed URL
- Section: Koleksi (expandable list)
- Visual: slim, elegant workspace navigation rail — NOT a form panel
- Active state: subtle emerald pill highlight, not neon green
- Section labels: 10px, uppercase, letter-spacing, muted color

### Zone 2: Main Library Area (flex grow)
- Top: Source tabs [All Assets] [Uploads] [Google Drive] [Embed]
- Controls row: Sort dropdown + Grid/List toggle (right-aligned)
- Main: Asset grid with spacious gaps
- Empty state if no assets

### Zone 3: Right Detail Panel (320px fixed)
- Persistent — always visible, never modal
- Updates when an asset is clicked
- Sections: Preview → Identity → Metadata → Usage → Actions
- Usage block: shows where asset is used across Lynknov pillars
- Safe delete: if in-use, disable delete + show usage locations

## Top Workspace Bar (replace editor header)
Left:    [←] "Asset Library" + subtitle
Center:  Search/command bar with ⌘K hint
Right:   [Folder Baru] [Hubungkan Sumber] [⬆ Upload File]

## Visual requirements

### Colors
- Background base: #0D0D0F (dark charcoal, NOT flat black)
- Surface cards: #111114
- Panel bg: #161619
- Text primary: #F4F4F5
- Text secondary: #A1A1AA
- Text muted: #71717A
- Emerald accent: #10B981
- Borders: rgba(255,255,255,0.06) default, rgba(255,255,255,0.12) hover
- Active border: rgba(16,185,129,0.4)

### Atmospheric layer
Add very subtle emerald glow on workspace background:
- radial-gradient from rgba(16,185,129,0.04) at top-left
- radial-gradient from rgba(16,185,129,0.02) at bottom-right
- pointer-events: none
- This creates depth without being "gaming" or noisy

### Asset cards
- Thumbnail dominant (large, landscape/square ratio)
- Type badge: IMAGE / AUDIO / DOCUMENT / EMBED
- Status badge: IN USE (emerald), NEW (blue)
- Filename: truncated cleanly
- Size + type: single muted line
- Hover: translateY(-2px) + emerald border glow
- Selected: 1px emerald outline + box-shadow 0 0 0 3px rgba(16,185,129,0.08)

### Typography
- Page title: 24px / weight 500
- Section labels: 10px / uppercase / letter-spacing 0.08em
- Body: 14px / weight 400
- Stats numbers: 28px / weight 500
- Metadata: 12px / muted

## States to implement
1. Empty state — aspirational, premium, two CTAs (Upload + Connect Drive)
2. Browsing state — default, spacious grid, filter rail active
3. Search state — real-time filter, result count shown
4. Empty search result — friendly copy + suggestions
5. Upload progress — inline card in grid, NOT modal
6. Upload success — NEW badge, auto-scroll, right panel activates
7. Selected asset — right panel updates, card gets emerald outline
8. In-use locked delete — delete disabled, usage shown, amber warning

## Asset card interaction
- Single click → select, activate right panel
- Hover → show quick actions (preview icon, download icon)
- Right panel updates immediately on selection (no modal)

## Safe delete rules
- If asset.usages.length === 0 → show confirm dialog → delete
- If asset.usages.length > 0 → disable delete button + show tooltip
- In right panel: show all usage locations in elegant usage cards
- Warning tone: amber/informational — NOT aggressive red

## Supabase integration
Keep existing upload functionality. Refactor the presentation only.
Assets table has: id, name, file_url, file_size, file_type, source, created_at
Asset_usages table has: asset_id, context, pillar, pillar_name

## Animation
- Card hover: translateY(-2px), 150ms ease-out
- Right panel update: opacity transition 200ms
- New asset enter: scale(0.96) → scale(1), 250ms ease-out

## Design tone
Premium. Refined. Immersive. Calm. Creative OS.
NOT: generic SaaS admin. NOT: Windows Explorer. NOT: editor sub-panel.

When a user opens Asset Library, they should feel:
"This is the creative nerve center of my business workspace."

## Output expected
- Refactored page with correct 3-zone layout
- New workspace bar (no editor controls)
- Premium visual treatment with atmospheric depth
- All 8 states implemented
- Safe delete working correctly
- Right persistent panel (no modal for detail)
- Clean TypeScript components
- Tailwind classes consistent with design system
```

---

## 13. Fase Pengembangan (Prioritas)

### Phase 1 — Fondasi & Identity (SEKARANG)

**Prioritas tertinggi. Harus selesai dulu sebelum yang lain.**

- [ ] Hapus mode editor dari halaman Asset Library
- [ ] Refactor top bar jadi dedicated workspace bar
- [ ] Rebuild layout jadi 3 zona
- [ ] Ganti modal detail dengan persistent right panel
- [ ] Upgrade visual ke dark charcoal + atmospheric layer

**Deliverable:** Halaman Asset Library yang berdiri sendiri, tidak bercampur dengan editor.

---

### Phase 2 — Core Browsing Experience

- [ ] Search real-time
- [ ] Filter tipe file berfungsi
- [ ] Sort options
- [ ] Grid/List toggle
- [ ] Source tabs (All/Uploads aktif dulu)
- [ ] Empty state premium
- [ ] Upload progress state
- [ ] Upload success state + NEW badge

**Deliverable:** User bisa browse, cari, dan filter asset dengan nyaman.

---

### Phase 3 — Detail & Actions

- [ ] Right panel lengkap (preview, metadata, usage, actions)
- [ ] Usage block lintas pilar
- [ ] Safe delete logic (jika in-use → blocked)
- [ ] Rename inline
- [ ] Download asset
- [ ] Copy link

**Deliverable:** User bisa inspect dan kelola asset individual dengan matang.

---

### Phase 4 — Organization

- [ ] Folder / Collection creation
- [ ] Move asset ke folder
- [ ] Bulk select
- [ ] Bulk actions (move, archive, delete)
- [ ] Recent assets tab
- [ ] Sort by usage frequency

**Deliverable:** User bisa organisir library yang besar dengan efisien.

---

### Phase 5 — Source Integration

- [ ] Google Drive connect flow
- [ ] Embed URL input + preview
- [ ] Drive source tab aktif
- [ ] Source sync status indicator
- [ ] Source badge di asset card

**Deliverable:** Asset Library benar-benar multi-source.

---

### Phase 6 — Intelligence Layer

- [ ] Smart tagging otomatis
- [ ] Duplicate detection
- [ ] Usage insights
- [ ] Asset recommendations
- [ ] Auto-categorize berdasarkan tipe & penggunaan

**Deliverable:** Asset Library terasa "pintar" dan proaktif.

---

## 14. Checklist QA Sebelum Ship

### Product architecture
- [ ] Tidak ada toggle Fokus Edit / Seimbang / Fokus Preview
- [ ] Tidak ada tombol Save/Publish/Preview editor
- [ ] Halaman bisa diakses dari dashboard utama (menu Assets)
- [ ] Layout 3 zona berjalan (filter rail + main + detail panel)

### Visual quality
- [ ] Background bukan flat hitam — ada depth dan atmospheric layer
- [ ] Asset card terasa premium, bukan file explorer
- [ ] Stats strip kompak dan refined
- [ ] Typography hierarchy jelas dan konsisten
- [ ] Hover dan selected states smooth

### Functionality
- [ ] Upload berfungsi dan ada progress state
- [ ] Search real-time berjalan
- [ ] Filter tipe file berfungsi dengan count
- [ ] Right panel update saat klik asset (bukan modal)
- [ ] Safe delete: asset in-use tidak bisa dihapus
- [ ] Usage block menampilkan lokasi pemakaian asset

### UX & states
- [ ] Empty state tampil saat library kosong
- [ ] Empty search result tampil saat tidak ada hasil
- [ ] Upload success: NEW badge + auto-scroll + right panel aktif
- [ ] Error states untuk upload gagal

---

## 15. Kalimat Kunci yang Harus Selalu Dipegang

> **"Editor adalah tempat menyusun halaman. Asset Library adalah tempat mengelola bahan bakunya."**

> **"Asset milik workspace. Pemakaiannya bersifat kontekstual."**

> **"Yang kita bangun bukan halaman upload yang bagus, tapi pusat material kreatif yang terasa layak jadi bagian dari Interactive Business OS."**

---

*Dokumen ini harus dibaca penuh oleh AI agent sebelum memulai implementasi apapun.*
*Last updated: April 2026*

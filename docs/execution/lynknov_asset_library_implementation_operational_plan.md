# Lynknov Asset Library — Operational Implementation Plan

## 1) Tujuan dokumen

Dokumen ini adalah turunan operasional dari dokumen sebelumnya:
- positioning dan arah produk Asset Library
- UX Blueprint
- System Architecture
- Master Prompt eksekusi coding

Fokus dokumen ini bukan lagi pada arah konseptual besar, tetapi pada **cara membangun fitur ini secara nyata dan terstruktur** di dalam codebase Lynknov.

Dokumen ini harus membantu menjawab hal-hal berikut:

1. Komponen apa saja yang perlu dibuat.
2. Komponen itu disimpan di folder mana.
3. State apa saja yang dimiliki masing-masing bagian.
4. Alur interaksi user seperti apa.
5. Urutan implementasi coding yang paling realistis.
6. Batas MVP implementasi saat ini.
7. Acceptance criteria teknis agar hasilnya benar-benar usable.

---

## 2) Sasaran implementasi MVP

Pada tahap ini, target implementasi bukan seluruh asset ecosystem Lynknov sekaligus, tetapi **fondasi Asset Library yang benar-benar bisa dipakai**.

## MVP harus sudah mencakup
- halaman global **Asset Library** di level workspace/sidebar utama
- upload file dasar
- create folder dasar
- pencarian dasar
- filter tipe file dasar
- grid/list toggle
- rename asset
- move asset
- delete asset
- detail panel asset
- reusable **Asset Picker**
- minimal readiness untuk usage mapping
- replace flow untuk public page hero image

## Yang belum wajib di tahap ini
- Google Drive integration penuh
- embed system matang
- advanced bulk actions
- tag system lengkap
- advanced safe delete multi-entity
- adopsi penuh ke portfolio/commercial hub

---

## 3) Prinsip implementasi

### Principle 1 — Bangun global system dulu
Jangan trap fitur ini di editor. Halaman Asset Library global harus jadi entry point utama.

### Principle 2 — Buat reusable layer
Editor, portfolio, dan pillar lain nanti hanya memakai komponen dan logic yang sama.

### Principle 3 — Pisahkan UI, data, dan action logic
Jangan campur semua state dan side effect dalam satu file page.

### Principle 4 — Komponen harus scalable
Walau MVP masih sederhana, struktur file dan penamaan harus siap berkembang.

### Principle 5 — Fokus pada flow yang benar-benar dipakai
Upload, browse, pilih, replace, dan kelola adalah flow inti. Prioritaskan itu terlebih dahulu.

---

# PART A — FOLDER STRUCTURE DAN FILE ORGANIZATION

## 4) Struktur folder yang direkomendasikan

Berikut struktur yang direkomendasikan untuk codebase Next.js Lynknov.

```txt
src/
  app/
    asset/
      page.tsx
      loading.tsx
      error.tsx

  components/
    asset-library/
      page/
        asset-library-page-shell.tsx
        asset-library-header.tsx
        asset-library-toolbar.tsx
        asset-library-content-layout.tsx
      filters/
        asset-filter-panel.tsx
        asset-type-filter-group.tsx
        asset-usage-filter-group.tsx
        asset-date-filter-group.tsx
        asset-source-filter-group.tsx
      browser/
        asset-browser.tsx
        asset-grid.tsx
        asset-list.tsx
        asset-empty-state.tsx
        asset-no-results-state.tsx
      cards/
        asset-card-base.tsx
        asset-card-image.tsx
        asset-card-video.tsx
        asset-card-audio.tsx
        asset-card-document.tsx
        asset-card-embed.tsx
        asset-card-folder.tsx
        asset-card-generic.tsx
      detail/
        asset-detail-panel.tsx
        asset-detail-preview.tsx
        asset-detail-overview.tsx
        asset-detail-usage.tsx
        asset-detail-organization.tsx
        asset-detail-actions.tsx
      dialogs/
        rename-asset-dialog.tsx
        move-asset-dialog.tsx
        delete-asset-dialog.tsx
        create-folder-dialog.tsx
        upload-asset-dialog.tsx
      picker/
        asset-picker-modal.tsx
        asset-picker-toolbar.tsx
        asset-picker-grid.tsx
        asset-picker-recent.tsx
      shared/
        asset-search-input.tsx
        asset-view-toggle.tsx
        asset-sort-menu.tsx
        asset-bulk-bar.tsx
        asset-stat-card.tsx
        asset-format-badge.tsx
        asset-usage-badge.tsx

  features/
    asset-library/
      actions/
        upload-asset.ts
        create-folder.ts
        rename-asset.ts
        move-asset.ts
        delete-asset.ts
        get-assets.ts
        get-asset-detail.ts
      hooks/
        use-asset-library-filters.ts
        use-asset-library-selection.ts
        use-asset-upload.ts
        use-asset-picker.ts
      utils/
        asset-type.ts
        asset-format.ts
        asset-filters.ts
        asset-sort.ts
        asset-card-mapper.ts
        asset-usage.ts
      mappers/
        map-asset-to-card-view-model.ts
        map-asset-to-detail-view-model.ts
      constants/
        asset-filter-options.ts
        asset-sort-options.ts
        asset-type-groups.ts
      types/
        asset.types.ts
        asset-folder.types.ts
        asset-usage.types.ts
        asset-picker.types.ts

  lib/
    asset-library/
      queries.ts
      mutations.ts
      selectors.ts
      validation.ts
      storage.ts
      metadata.ts
      usage-mapping.ts
```

---

## 5) Kenapa struktur ini bagus

### app/asset
Menjadi entry page global.

### components/asset-library
Semua UI asset manager terkonsentrasi dan mudah dicari.

### features/asset-library
Berisi logic domain, hooks, utility, type, dan action yang lebih reusable.

### lib/asset-library
Berisi helper level lebih bawah untuk query, mutation, validation, storage, dan mapping.

Struktur ini menjaga agar:
- file page tidak membengkak
- logic tidak tercecer
- komponen reusable ke fitur lain
- Asset Picker bisa dipakai lintas module

---

# PART B — COMPONENT TREE DAN TANGGUNG JAWAB

## 6) Component tree halaman Asset Library

```txt
AssetLibraryPage
└── AssetLibraryPageShell
    ├── AssetLibraryHeader
    │   ├── AssetStatCard (x4)
    │   └── HeaderActions
    ├── AssetLibraryToolbar
    │   ├── UploadButton
    │   ├── NewFolderButton
    │   ├── IntegrationsMenu
    │   ├── AssetSearchInput
    │   ├── AssetViewToggle
    │   ├── AssetSortMenu
    │   └── BulkSelectButton
    └── AssetLibraryContentLayout
        ├── AssetFilterPanel
        │   ├── AssetTypeFilterGroup
        │   ├── AssetUsageFilterGroup
        │   ├── AssetDateFilterGroup
        │   └── AssetSourceFilterGroup
        ├── AssetBrowser
        │   ├── AssetGrid or AssetList
        │   │   └── AssetCard*
        │   ├── AssetEmptyState
        │   └── AssetNoResultsState
        └── AssetDetailPanel
            ├── AssetDetailPreview
            ├── AssetDetailOverview
            ├── AssetDetailUsage
            ├── AssetDetailOrganization
            └── AssetDetailActions
```

---

## 7) Tanggung jawab tiap komponen inti

## AssetLibraryPageShell
- wrapper utama halaman
- mengatur spacing global, layout, dan composition utama
- tidak menyimpan business logic berat

## AssetLibraryHeader
- menampilkan heading
- menampilkan subcopy
- menampilkan metric cards
- menampilkan CTA utama

## AssetLibraryToolbar
- command surface utama
- memicu upload dialog, create folder, search, sort, view, dan bulk mode

## AssetFilterPanel
- menampilkan semua grup filter
- menerima selected filters dari hook / state utama
- tidak melakukan fetch langsung

## AssetBrowser
- memutuskan render empty state, no results, grid, atau list
- menerima array asset yang sudah siap ditampilkan

## AssetGrid / AssetList
- hanya concern ke rendering browser mode
- tidak menyimpan state filter utama

## AssetCard*
- render berdasarkan file type
- expose callback: onSelect, onRename, onMove, onDelete

## AssetDetailPanel
- muncul saat asset dipilih
- menampilkan detail lengkap dan action yang relevan

## AssetPickerModal
- reusable browser versi ringan untuk editor/section lain
- jangan copy-paste dari halaman utama; ambil komponen yang bisa dipakai ulang

---

# PART C — TYPES DAN DATA SHAPE

## 8) Type utama yang direkomendasikan

```ts
export type AssetType =
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'embed'
  | 'folder'
  | 'animation'
  | 'font'
  | 'other';

export type AssetSourceType =
  | 'upload'
  | 'google_drive'
  | 'embed'
  | 'imported'
  | 'generated';

export type AssetStatus =
  | 'ready'
  | 'processing'
  | 'failed'
  | 'archived'
  | 'deleted';
```

```ts
export interface AssetItem {
  id: string;
  name: string;
  originalName?: string;
  type: AssetType;
  format: string;
  mimeType?: string;
  sizeBytes?: number;
  width?: number;
  height?: number;
  durationMs?: number;
  thumbnailUrl?: string;
  previewUrl?: string;
  publicUrl?: string;
  sourceType: AssetSourceType;
  folderId?: string | null;
  folderName?: string | null;
  tags?: string[];
  usageCount?: number;
  isInUse?: boolean;
  createdAt: string;
  updatedAt: string;
  status: AssetStatus;
}
```

```ts
export interface AssetFolder {
  id: string;
  name: string;
  parentId?: string | null;
  assetCount?: number;
  createdAt: string;
  updatedAt: string;
}
```

```ts
export interface AssetUsageRecord {
  id: string;
  assetId: string;
  featureType: string;
  entityType: string;
  entityId: string;
  entityLabel: string;
  placementKey: string;
  createdAt: string;
  updatedAt: string;
}
```

```ts
export interface AssetFiltersState {
  query: string;
  view: 'grid' | 'list';
  sort: 'newest' | 'oldest' | 'name_asc' | 'name_desc' | 'largest' | 'smallest' | 'most_used';
  types: AssetType[];
  usage: 'all' | 'in_use' | 'unused';
  source: AssetSourceType[];
  folderId?: string | null;
}
```

---

## 9) View model yang sebaiknya dipisahkan

Jangan semua komponen langsung memakai raw database shape. Buat view model mapper agar fleksibel.

### Contoh
- `mapAssetToCardViewModel()`
- `mapAssetToDetailViewModel()`

Keuntungan:
- UI tidak terlalu tergantung ke backend shape
- lebih mudah ubah tampilan tanpa merusak layer data
- mudah tambahkan fallback logic untuk empty preview, icon, format badge, dan sebagainya

---

# PART D — STATE FLOW DAN LOGIC FLOW

## 10) State utama halaman

State di halaman Asset Library sebaiknya dibagi jelas.

## A. Filter state
Berisi:
- search query
- selected types
- selected usage
- selected source
- selected sort
- current view mode
- selected folder

## B. Selection state
Berisi:
- selected asset id
- selected asset item
- multi-select ids
- apakah bulk mode aktif

## C. Dialog state
Berisi:
- upload dialog open/close
- create folder dialog open/close
- rename dialog open/close
- move dialog open/close
- delete dialog open/close

## D. Async state
Berisi:
- loading assets
- uploading asset
- renaming asset
- moving asset
- deleting asset
- creating folder

## E. Browser state
Berisi:
- empty library
- no results
- grid mode
- list mode
- detail panel open

---

## 11) Hook yang direkomendasikan

## useAssetLibraryFilters
Tanggung jawab:
- manage semua filter utama
- expose setter dan helper reset

Contoh output:
```ts
{
  filters,
  setQuery,
  toggleType,
  setUsage,
  setSort,
  setView,
  resetFilters,
}
```

## useAssetLibrarySelection
Tanggung jawab:
- select satu asset
- multi-select asset
- clear selection
- bulk mode handling

## useAssetUpload
Tanggung jawab:
- handle upload
- progress state
- success/fail callback
- refresh asset list setelah upload berhasil

## useAssetPicker
Tanggung jawab:
- state modal picker
- selected asset(s)
- allowed types filtering
- confirm selection flow

---

## 12) Flow utama: load halaman Asset Library

1. User buka halaman Asset.
2. Sistem fetch asset list.
3. Sistem fetch ringkasan statistik.
4. Render header.
5. Render toolbar.
6. Render browser area sesuai hasil:
   - empty state jika tidak ada asset sama sekali
   - no results jika ada asset tapi filter/search tidak cocok
   - grid/list jika ada hasil
7. Saat user memilih satu asset, detail panel muncul.

---

## 13) Flow utama: upload asset

1. User klik Upload.
2. Dialog upload muncul.
3. User pilih file.
4. Validasi format dan ukuran file.
5. Upload ke storage.
6. Simpan record asset.
7. Refresh list.
8. Select asset yang baru di-upload.
9. Detail panel menampilkan asset tersebut.

## State yang perlu diperhatikan
- idle
- validating
- uploading
- success
- failed

---

## 14) Flow utama: create folder

1. User klik Folder Baru.
2. Dialog create folder muncul.
3. User isi nama folder.
4. Validasi nama.
5. Simpan folder.
6. Refresh sidebar/filter dan browser bila perlu.

---

## 15) Flow utama: rename asset

1. User klik rename dari card menu atau detail panel.
2. Dialog rename muncul.
3. User ubah nama.
4. Validasi input.
5. Simpan.
6. Update list dan detail panel.

---

## 16) Flow utama: move asset

1. User klik move.
2. Dialog move muncul.
3. User pilih folder tujuan.
4. Simpan folderId baru.
5. Update browser dan detail panel.

---

## 17) Flow utama: delete asset

1. User klik delete.
2. Sistem cek apakah asset dipakai.
3. Jika belum dipakai → tampilkan dialog delete normal.
4. Jika sedang dipakai → tampilkan warning delete lebih kuat.
5. Setelah konfirmasi, delete atau archive sesuai action.
6. Refresh list.
7. Tutup detail panel bila asset yang dihapus sedang dipilih.

## MVP note
Untuk MVP, safe delete bisa mulai dari check `usageCount > 0` meskipun detail usage belum lengkap.

---

## 18) Flow utama: replace hero image via Asset Picker

1. User berada di Hero section editor.
2. Klik ganti image.
3. Asset Picker modal dibuka.
4. Picker menampilkan:
   - recent assets
   - browse asset library
   - upload baru
5. User pilih satu asset bertipe image.
6. Sistem update hero image reference.
7. Sistem create/update usage mapping.
8. Preview hero langsung diperbarui.

Ini adalah flow integrasi pertama yang wajib benar.

---

# PART E — IMPLEMENTATION ORDER PER FILE

## 19) Urutan implementasi paling realistis

Agar tidak melebar, berikut urutan kerja yang disarankan.

## Phase 1 — Types, constants, utils
Buat dulu:
- `asset.types.ts`
- `asset-folder.types.ts`
- `asset-usage.types.ts`
- `asset-type.ts`
- `asset-format.ts`
- `asset-sort.ts`
- `asset-filter-options.ts`
- `asset-card-mapper.ts`

### Tujuan
Menetapkan bahasa sistem dan mencegah refactor besar di tengah jalan.

---

## Phase 2 — Data actions dasar
Buat logic dasar:
- `get-assets.ts`
- `get-asset-detail.ts`
- `upload-asset.ts`
- `create-folder.ts`
- `rename-asset.ts`
- `move-asset.ts`
- `delete-asset.ts`

### Tujuan
Menyiapkan fondasi interaksi nyata.

---

## Phase 3 — Hooks state management
Buat:
- `use-asset-library-filters.ts`
- `use-asset-library-selection.ts`
- `use-asset-upload.ts`
- `use-asset-picker.ts`

### Tujuan
Memisahkan logika UI state dari layer presentasi.

---

## Phase 4 — Shared components kecil
Buat:
- `asset-search-input.tsx`
- `asset-view-toggle.tsx`
- `asset-sort-menu.tsx`
- `asset-stat-card.tsx`
- `asset-format-badge.tsx`
- `asset-usage-badge.tsx`

### Tujuan
Membangun building blocks visual yang reusable.

---

## Phase 5 — Page structure utama
Buat:
- `asset-library-page-shell.tsx`
- `asset-library-header.tsx`
- `asset-library-toolbar.tsx`
- `asset-library-content-layout.tsx`
- `src/app/asset/page.tsx`

### Tujuan
Halaman global sudah hidup secara struktur.

---

## Phase 6 — Browser dan card system
Buat:
- `asset-browser.tsx`
- `asset-grid.tsx`
- `asset-list.tsx`
- `asset-card-image.tsx`
- `asset-card-video.tsx`
- `asset-card-audio.tsx`
- `asset-card-document.tsx`
- `asset-card-embed.tsx`
- `asset-card-folder.tsx`
- `asset-card-generic.tsx`
- `asset-empty-state.tsx`
- `asset-no-results-state.tsx`

### Tujuan
User sudah bisa browse asset dengan baik.

---

## Phase 7 — Filter panel
Buat:
- `asset-filter-panel.tsx`
- `asset-type-filter-group.tsx`
- `asset-usage-filter-group.tsx`
- `asset-date-filter-group.tsx`
- `asset-source-filter-group.tsx`

### Tujuan
Browser jadi usable untuk library yang mulai membesar.

---

## Phase 8 — Detail panel
Buat:
- `asset-detail-panel.tsx`
- `asset-detail-preview.tsx`
- `asset-detail-overview.tsx`
- `asset-detail-usage.tsx`
- `asset-detail-organization.tsx`
- `asset-detail-actions.tsx`

### Tujuan
Asset management terasa matang dan premium.

---

## Phase 9 — Dialog actions
Buat:
- `upload-asset-dialog.tsx`
- `create-folder-dialog.tsx`
- `rename-asset-dialog.tsx`
- `move-asset-dialog.tsx`
- `delete-asset-dialog.tsx`

### Tujuan
Aksi manajemen inti benar-benar bekerja.

---

## Phase 10 — Asset Picker reusable
Buat:
- `asset-picker-modal.tsx`
- `asset-picker-toolbar.tsx`
- `asset-picker-grid.tsx`
- `asset-picker-recent.tsx`

### Tujuan
Membuka jalan integrasi ke editor dan module lain.

---

## Phase 11 — Integrasi pertama ke Hero section
Fokus:
- sambungkan Asset Picker ke hero image field
- update hero image reference
- update usage mapping minimal
- pastikan preview sinkron

### Tujuan
Membuktikan bahwa Asset Library memang sistem global yang dikonsumsi editor.

---

# PART F — IMPLEMENTATION NOTES PER SCREEN

## 20) Halaman global Asset Library

### Wajib terasa seperti workspace page
Jangan seperti tab kecil di editor.

### Wajib punya
- heading premium
- summary cards
- toolbar kuat
- browser area yang lapang
- background tidak flat monoton
- detail panel yang refined

---

## 21) Asset Picker modal

### Harus ringan
Jangan seberat halaman utama.

### Wajib punya
- search
- grid ringan
- recent tab
- upload baru
- filtered by allowed type

### Jangan terlalu banyak fitur dulu
Untuk MVP, picker tidak perlu semua filter lanjutan dari halaman utama.

---

## 22) Hero section integration

### Kebutuhan minimum
- user bisa pilih image dari library
- user bisa upload image baru dari flow yang sama
- selection langsung update preview
- asset yang dipilih ditandai sebagai digunakan di hero

### Hal yang jangan dilakukan
- bikin upload logic baru khusus hero
- bikin picker hero yang beda total dari sistem asset global

---

# PART G — ACCEPTANCE CRITERIA TEKNIS

## 23) Acceptance criteria halaman Asset Library

Implementasi dianggap lolos jika:

- Asset Library berada di sidebar utama workspace
- halaman bisa dibuka sebagai page global
- ada heading, subcopy, stats, toolbar, browser area
- user bisa upload asset
- user bisa create folder
- user bisa search asset
- user bisa filter asset by type
- user bisa toggle grid/list
- user bisa pilih asset dan melihat detail panel
- user bisa rename asset
- user bisa move asset
- user bisa delete asset
- empty state dan no results state tampil benar

---

## 24) Acceptance criteria visual

Implementasi dianggap tepat secara visual jika:
- tidak terasa seperti uploader generik
- tidak flat hitam pekat monoton
- hierarchy teks jelas
- spacing lega dan premium
- selected state jelas namun elegan
- detail panel terasa refined
- card per type terasa konsisten tapi tetap berbeda

---

## 25) Acceptance criteria architecture

Implementasi dianggap tepat secara arsitektur jika:
- logic asset tidak terjebak di editor
- komponen dan hooks dipisah rapi
- Asset Picker reusable
- struktur file tidak berantakan
- type system jelas
- ada kesiapan untuk usage mapping

---

## 26) Acceptance criteria integrasi hero

Implementasi dianggap benar jika:
- hero image field menggunakan Asset Picker
- user bisa pilih dari library atau upload baru
- preview hero berubah real-time
- data asset tetap berasal dari sistem global
- minimal usage relation bisa dipersiapkan atau dicatat

---

# PART H — RISIKO DAN HAL YANG HARUS DIHINDARI

## 27) Risiko implementasi umum

### Risiko 1 — Semua logic ditumpuk di page.tsx
Akibatnya sulit dirawat dan sulit reuse.

### Risiko 2 — Asset Picker dibuat copy-paste dari halaman utama
Akibatnya sulit sinkron dan cepat berantakan.

### Risiko 3 — Card asset dibuat satu template untuk semua tipe
Akibatnya visual tidak rapi dan UX terasa dangkal.

### Risiko 4 — Editor punya upload flow sendiri
Akibatnya positioning global Asset Library rusak.

### Risiko 5 — Detail panel terlalu padat dan tanpa hierarchy
Akibatnya fitur terasa berat dan tidak premium.

---

## 28) Hal yang harus selalu dijaga

- Asset Library adalah sistem global
- editor adalah consumer, bukan owner
- UI harus premium dan tenang
- struktur komponen harus reusable
- usage-aware architecture harus dipikirkan dari awal walau belum full

---

# PART I — NEXT EXECUTION SUGGESTION

## 29) Langkah coding paling aman setelah dokumen ini

Urutan kerja yang paling aman:

1. buat types + constants + hooks dasar
2. bangun page shell global Asset Library
3. bangun browser + cards
4. bangun detail panel
5. sambungkan upload / rename / move / delete
6. bangun Asset Picker
7. integrasikan ke Hero section

Kalau urutan ini diikuti, hasilnya akan jauh lebih stabil dibanding langsung loncat ke integrasi besar seperti Google Drive.

---

## 30) Penutup

Dokumen ini adalah jembatan dari arah produk ke eksekusi teknis nyata.

Dengan struktur ini, implementasi Asset Library Lynknov akan punya:
- positioning yang benar
- struktur file yang sehat
- komponen yang reusable
- flow yang jelas
- fondasi kuat untuk berkembang ke pillar lain

Arah yang harus terus dijaga adalah:

**Lynknov Asset Library bukan fitur upload biasa, melainkan workspace-level media infrastructure yang dikonsumsi oleh seluruh sistem Lynknov.**


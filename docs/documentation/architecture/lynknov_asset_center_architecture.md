# Lynknov MVP — Upload / Asset Center Architecture

## 1. Tujuan dokumen

Dokumen ini menjadi fondasi implementasi fitur **Unggahan / Asset Center** untuk Lynknov MVP. Fokusnya adalah membangun sistem unggahan yang:

- benar-benar bisa dipakai user
- rapi secara produk, UI/UX, dan data
- scalable ke semua section editor
- terhubung ke backend Supabase
- siap berkembang ke sistem aset visual yang lebih besar

Dokumen ini mencakup:
1. arah produk dan prinsip MVP
2. scope fitur minimum
3. arsitektur informasi
4. UX flow
5. struktur komponen frontend
6. konteks backend dan Supabase
7. model data
8. integrasi Google Drive & Embed
9. folder & kategori
10. validasi format file
11. task breakdown implementasi
12. master prompt untuk coding execution

---

## 2. Prinsip produk

Fitur ini **bukan sekadar upload file**, tetapi sebuah **Asset Center**.

Artinya, user bisa:
- mengunggah file
- mengelompokkan file
- memilih file untuk section tertentu
- menghubungkan sumber file eksternal
- memakai ulang file yang sama di banyak section
- mengelola file secara terpusat

### Posisi fitur di MVP
Untuk MVP, fitur ini harus cukup kuat untuk mendukung:
- Hero
- Showcase
- Portfolio
- Storyboard
- Audio
- kebutuhan visual dasar halaman publik

### Prinsip desain
Fitur ini harus terasa:
- premium
- clean
- visual-first
- tidak teknis berlebihan
- gampang dipahami user non-teknis
- konsisten dengan dark premium editor Lynknov

---

## 3. Scope MVP yang disepakati

### Fitur minimum MVP
1. **Gambar**
2. **Folder**
3. **Integrasi**
   - Google Drive
   - Embed
4. **Kategori**
5. **Format file**
   - jpg
   - jpeg
   - png
   - gif
   - webp
   - mp3
   - wav

---

## 4. Rekomendasi produk

Saya setuju dengan struktur ini, dengan sedikit penajaman:

### Yang sangat cocok untuk MVP
- **Gambar** → wajib
- **Folder** → bagus, tapi dibuat ringan
- **Google Drive** → bagus, tapi tahap awal fokus ke attach/import dulu
- **Embed** → bagus, terutama untuk audio/embed content
- **Kategori** → penting agar library tidak berantakan
- **Format image + audio** → relevan dengan Smart Bio / Interactive Profile

### Penajaman agar MVP tetap realistis
- Folder jangan dibuat serumit file explorer desktop
- Google Drive jangan langsung full sync; cukup **connect + import/reference**
- Embed jangan terlalu luas; batasi pada **URL yang valid dan aman**
- Audio di MVP cukup upload, preview, attach ke section

---

## 5. Konsep inti fitur

### Nama sistem
**Asset Center**

### Peran sistem
Asset Center adalah pusat manajemen file dan sumber media user untuk dipakai di editor Lynknov.

### Fungsi utama
- menyimpan aset user
- mengelompokkan aset ke dalam folder
- memberi kategori aset
- memungkinkan import dari sumber eksternal
- menyediakan asset picker ke seluruh section editor
- memetakan aset ke data section publik

---

## 6. Arsitektur informasi

### Level global
Asset Center tersedia sebagai menu/tool utama di sidebar editor:
- Section
- Unggahan
- Audio
- Tema
- Pengaturan

### Level kontekstual
Di tiap section, user juga bisa membuka **Asset Picker**:
- pilih dari library
- upload baru
- pilih dari folder
- filter kategori
- import dari Google Drive
- tambahkan via embed

Jadi ada dua mode akses:
1. **Global Asset Center**
2. **Contextual Asset Picker**

---

## 7. Struktur konten utama fitur

Ada tiga entitas utama:

### A. Asset
File atau sumber media yang bisa dipakai di section

### B. Folder
Container ringan untuk mengelompokkan asset

### C. Source / Integration
Asal asset:
- local upload
- Google Drive
- embed URL

---

## 8. Definisi aset di MVP

### Tipe aset utama
Gunakan enum `asset_kind`:
- `image`
- `audio`
- `embed`

### Asal aset
Gunakan enum `asset_source`:
- `upload`
- `google_drive`
- `embed`

### Kategori aset
Gunakan enum `asset_category`:
- `avatar`
- `cover`
- `portfolio`
- `showcase`
- `brand`
- `gallery`
- `audio`
- `other`

Kategori membantu pengelompokan dan filter. Kategori bukan pembatas keras.

---

## 9. Format file yang didukung

### Image
- jpg
- jpeg
- png
- gif
- webp

### Audio
- mp3
- wav

### Embed
Embed tidak berupa upload file, tetapi data URL + metadata.

Provider awal yang realistis:
- Spotify
- YouTube
- SoundCloud

Untuk MVP, lebih aman gunakan:
- URL embed terstruktur
- provider whitelist
- sanitasi ketat
- jangan menerima raw HTML bebas

---

## 10. Folder: keputusan UX yang ideal

Folder bagus untuk MVP, tapi harus **ringan**.

### Fungsi folder
- membantu user merapikan aset
- memisahkan kebutuhan project / section
- mengurangi kekacauan library

### Contoh folder default
- Hero
- Portfolio
- Showcase
- Brand
- Audio

### Batas MVP
- folder satu level saja
- tidak perlu nested folder
- tidak perlu drag antar banyak hirarki rumit

### Aksi folder
- buat folder
- rename folder
- hapus folder
- pindahkan asset ke folder
- filter asset berdasarkan folder

---

## 11. Integrasi yang ideal

### Google Drive
Tujuan integrasi Google Drive di MVP:
- mempermudah user memakai file yang sudah mereka punya
- bukan membangun cloud sync manager penuh

#### Scope MVP Google Drive
- connect account
- pilih file dari Google Drive
- import metadata / reference
- opsional: copy file ke Asset Center atau simpan sebagai external reference
- tampilkan thumbnail/name/source

#### Saran implementasi MVP
Gunakan dua mode:

##### Mode A — Import as Lynknov Asset
- user pilih file dari Google Drive
- backend mengambil file
- file disimpan ke storage Lynknov
- metadata tersimpan sebagai asset biasa
- source tetap tercatat sebagai `google_drive`

Kelebihan:
- lebih stabil untuk public rendering
- tidak tergantung akses file eksternal saat runtime

##### Mode B — Reference only
- user hanya menyimpan link/reference
- lebih ringan
- tetapi lebih rentan masalah permission dan availability

### Rekomendasi
Untuk asset visual publik, lebih baik:
- **import ke storage Lynknov**
- source dicatat `google_drive`
- original URL disimpan sebagai metadata tambahan

### Embed
Embed cocok untuk:
- audio player
- video
- external showcase
- rich content tertentu

#### Scope MVP Embed
- user paste URL
- sistem validasi provider
- backend parse provider
- simpan embed config
- preview tampil di editor
- render aman di public page

#### Catatan keamanan
Jangan terima:
- script bebas
- iframe bebas tanpa sanitasi
- arbitrary HTML injection

Gunakan:
- whitelist provider
- parser URL
- transform ke embed config yang aman

---

## 12. UX flow utama

### Flow A — Upload file lokal
1. user buka Unggahan
2. klik Upload
3. pilih file
4. file divalidasi
5. upload ke storage
6. metadata tersimpan
7. asset muncul di library
8. user bisa attach ke section

### Flow B — Upload dari section
1. user buka section Hero / Portfolio / Showcase
2. klik pilih gambar/audio
3. modal Asset Picker terbuka
4. user pilih dari library atau upload baru
5. asset dipasang ke field section
6. live preview update realtime

### Flow C — Buat folder
1. user klik Folder Baru
2. isi nama folder
3. folder muncul di sidebar/filter panel
4. user pindahkan asset ke folder

### Flow D — Import dari Google Drive
1. user klik Tambah dari Google Drive
2. auth/connect
3. file picker terbuka
4. user pilih file
5. sistem import file atau metadata
6. asset masuk library dengan badge source Google Drive

### Flow E — Tambah embed
1. user klik Tambah Embed
2. paste URL
3. sistem validasi provider
4. sistem parse metadata
5. embed asset tersimpan
6. user bisa pasang ke section yang relevan

---

## 13. Tampilan ideal Asset Center

### Layout utama
Di panel tengah editor:

#### Header section
- Judul: Unggahan
- Deskripsi: Kelola aset visual dan audio untuk halaman Anda

#### Top action bar
- Upload file
- Folder baru
- Tambah dari Google Drive
- Tambah Embed

#### Summary strip
- Total asset
- Total folder
- Storage used
- Used in page

#### Filter bar
- Search
- Filter kategori
- Filter format
- Filter source
- Filter folder

#### Main content
- grid asset cards
- atau empty state jika belum ada aset

---

## 14. Asset card structure

Setiap card asset idealnya punya:
- thumbnail / icon preview
- nama asset
- tipe asset
- ukuran file
- badge source
- badge category
- folder name
- status penggunaan
- quick actions

### Quick actions
- Gunakan
- Preview
- Rename
- Pindah folder
- Hapus

### Status usage
- Belum digunakan
- Dipakai di Hero
- Dipakai di Portfolio
- Dipakai di Showcase
- Dipakai di beberapa section

---

## 15. Asset Picker contextual

Asset Picker dipakai dari setiap section.

### Isi modal/panel picker
- Tab: Library / Upload / Drive / Embed
- Search
- Filter kategori
- Grid asset
- CTA pilih asset
- Preview kecil

Kenapa penting:
user tidak selalu ingin keluar dari konteks section hanya untuk ambil aset.

---

## 16. Arsitektur komponen frontend

### Komponen global
- `AssetCenterPanel`
- `AssetToolbar`
- `AssetStatsBar`
- `AssetFilterBar`
- `AssetGrid`
- `AssetCard`
- `AssetEmptyState`
- `AssetPreviewDialog`

### Komponen upload & input
- `AssetUploadDropzone`
- `CreateFolderDialog`
- `MoveAssetDialog`
- `RenameAssetDialog`
- `DeleteAssetDialog`

### Komponen integrasi
- `GoogleDriveImportDialog`
- `EmbedAssetDialog`
- `EmbedProviderPreview`

### Komponen picker section
- `AssetPickerModal`
- `AssetPickerTabs`
- `SectionAssetField`

### Komponen utility
- `UsageBadge`
- `SourceBadge`
- `CategoryBadge`
- `FileTypeIcon`

---

## 17. Hook / state yang disarankan

- `useAssets()`
- `useAssetFilters()`
- `useUploadAsset()`
- `useDeleteAsset()`
- `useRenameAsset()`
- `useMoveAssetToFolder()`
- `useCreateFolder()`
- `useImportFromGoogleDrive()`
- `useCreateEmbedAsset()`
- `useAttachAssetToSection()`

### State editor yang perlu sinkron
- selectedSection
- assetLibrary
- selectedAsset
- folderList
- filterState
- dirtyState
- uploadProgress
- integrationStatus

---

## 18. Arsitektur backend

### Stack
- Next.js app router
- Supabase Auth
- Supabase Storage
- Supabase Postgres
- RLS
- optional server actions / route handlers

### Bucket storage
Gunakan bucket misalnya:
- `user-assets`

### Struktur path storage
- `users/{userId}/images/...`
- `users/{userId}/audio/...`
- `users/{userId}/imports/google-drive/...`

Contoh:
- `users/USER_ID/images/avatar-main.webp`
- `users/USER_ID/images/project-card-01.png`
- `users/USER_ID/audio/intro-theme.mp3`
- `users/USER_ID/imports/google-drive/cover-hero.jpg`

---

## 19. Model data database

### Table: `asset_folders`
Tujuan: menyimpan folder milik user

#### Kolom
- `id` uuid pk
- `user_id` uuid not null
- `name` text not null
- `slug` text optional
- `color` text optional
- `created_at` timestamptz
- `updated_at` timestamptz

Catatan:
- satu level folder saja
- unique per user pada nama folder bisa dipertimbangkan

### Table: `user_assets`
Tujuan: menyimpan metadata semua asset

#### Kolom wajib
- `id` uuid pk
- `user_id` uuid not null
- `folder_id` uuid nullable
- `name` text not null
- `original_file_name` text nullable
- `asset_kind` text not null
- `asset_source` text not null
- `asset_category` text nullable
- `mime_type` text nullable
- `extension` text nullable
- `file_size` bigint nullable
- `storage_bucket` text nullable
- `storage_path` text nullable
- `public_url` text nullable
- `external_url` text nullable
- `provider` text nullable
- `width` int nullable
- `height` int nullable
- `duration_seconds` numeric nullable
- `thumbnail_url` text nullable
- `alt_text` text nullable
- `description` text nullable
- `metadata` jsonb default '{}'
- `is_active` boolean default true
- `created_at` timestamptz
- `updated_at` timestamptz

### Table: `asset_usages`
Tujuan: melacak asset dipakai di section apa

#### Kolom
- `id` uuid pk
- `user_id` uuid not null
- `asset_id` uuid not null
- `page_id` uuid nullable
- `section_key` text not null
- `field_key` text not null
- `created_at` timestamptz

#### Contoh
- asset A dipakai di Hero → `section_key=hero`, `field_key=avatar`
- asset B dipakai di Portfolio → `section_key=portfolio`, `field_key=thumbnail`

### Table: data section existing
Data section user harus menyimpan **asset id**, bukan hanya URL string.

Contoh:
- `hero.avatar_asset_id`
- `showcase.items[].image_asset_id`
- `portfolio.items[].thumbnail_asset_id`
- `audio.player_asset_id`

---

## 20. Integrasi Google Drive: konteks teknis

### Pendekatan MVP yang direkomendasikan
Gunakan proses:
1. user connect Google
2. pilih file dari Drive
3. backend fetch/import file
4. simpan ke Supabase Storage
5. buat record `user_assets`
6. tandai `asset_source = google_drive`

### Metadata tambahan
Simpan di `metadata`:
- `original_drive_file_id`
- `original_drive_name`
- `original_drive_mime_type`
- `original_drive_url`
- `imported_at`

### Kenapa ini paling aman
- stabil untuk public page
- tidak tergantung permission Drive user saat render
- thumbnail dan preview lebih konsisten
- performa frontend lebih mudah dikontrol

---

## 21. Integrasi Embed: konteks teknis

### Model embed asset
Embed tetap masuk ke `user_assets` dengan:
- `asset_kind = embed`
- `asset_source = embed`
- `provider = spotify/youtube/soundcloud`
- `external_url = original_url`
- `metadata = parsed embed config`

### Contoh metadata embed
```json
{
  "provider": "spotify",
  "embed_url": "https://open.spotify.com/embed/track/...",
  "title": "Sample Track",
  "thumbnail": "https://...",
  "author": "Artist Name"
}
```

### Keamanan
- parse URL di server
- whitelist hostname/provider
- hasilkan embed URL aman
- jangan langsung render iframe dari input mentah tanpa validasi

---

## 22. Validasi file

### Validasi image
- extension valid
- mime type valid
- max size misalnya 5 MB
- dimensi minimum disarankan

### Validasi audio
- extension valid
- mime type valid
- max size misalnya 10–15 MB
- durasi bisa dibaca bila memungkinkan

### Validasi embed
- URL valid
- provider terdaftar di whitelist
- bukan script injection
- bukan raw arbitrary iframe snippet

---

## 23. Policy dan keamanan

### Auth
Semua asset harus terkait `user_id`

### RLS table
Aktifkan RLS untuk:
- `asset_folders`
- `user_assets`
- `asset_usages`

Policy dasar:
- user hanya bisa select miliknya sendiri
- user hanya bisa insert miliknya sendiri
- user hanya bisa update miliknya sendiri
- user hanya bisa delete miliknya sendiri

### Storage ownership
Pastikan user hanya bisa:
- upload ke path miliknya
- hapus file miliknya

### Embed security
- whitelist provider
- sanitize output
- jangan render HTML bebas

---

## 24. Real-time preview integration

### Tujuan
Begitu asset dipilih:
- editor state langsung update
- live preview kanan langsung berubah
- data section menyimpan referensi asset id
- save state ikut menandai perubahan

### Flow
1. asset dipilih
2. `attachAssetToSection(assetId, sectionKey, fieldKey)`
3. update local editor state
4. update usage mapping
5. rerender preview
6. simpan ke backend saat Save/Publish

---

## 25. Empty state dan feedback UX

### Empty state asset center
- icon upload / gallery
- teks: Belum ada aset
- subteks: Upload gambar, audio, atau tambahkan dari Google Drive untuk mulai mengisi halaman Anda.
- CTA utama: Upload file
- CTA sekunder: Tambah dari Google Drive

### Loading state
- skeleton cards
- progress upload
- status importing

### Error state
Contoh copy:
- Format file belum didukung
- Ukuran file terlalu besar
- Gagal mengunggah file, coba lagi
- File Google Drive tidak dapat diimpor
- URL embed belum didukung

---

## 26. Arsitektur UI per fitur

### Tab / mode asset source
Di Asset Picker atau toolbar, bisa ada jalur:
- Upload
- Library
- Folder
- Drive
- Embed

### Filter bar
Filter yang direkomendasikan:
- Semua
- Gambar
- Audio
- Embed
- Folder
- Kategori
- Source

### Card variants
#### Image card
- thumbnail besar
- size
- category
- used status

#### Audio card
- icon waveform / audio
- nama
- durasi
- provider/source
- tombol preview play kecil

#### Embed card
- provider badge
- judul
- thumbnail bila ada
- source label

---

## 27. Konteks penggunaan per section

### Hero
- avatar
- hero cover image
- intro audio opsional

### Showcase
- card thumbnail
- product visual
- external media embed

### Portfolio
- project thumbnail
- gallery image

### Storyboard
- visual card
- timeline media
- audio accompaniment opsional

### Audio section
- mp3 / wav upload
- embed Spotify / SoundCloud
- custom audio card

---

## 28. Batasan MVP yang sehat

Agar tidak terlalu berat, hal berikut bisa ditunda:
- nested folders
- drag-and-drop folder tree rumit
- bulk multi-upload kompleks
- image crop editor lanjutan
- audio waveform editor
- AI tagging
- auto background removal
- file versioning
- sync dua arah penuh dengan Google Drive

---

## 29. Rekomendasi implementasi bertahap

### Phase 1 — Foundation
- buat table folder
- buat table assets
- buat table usages
- siapkan storage bucket
- buat RLS
- upload local image/audio

### Phase 2 — Asset Center UI
- panel unggahan
- filter
- grid card
- upload dropzone
- create folder
- delete/rename/move

### Phase 3 — Editor integration
- hero asset picker
- showcase asset picker
- portfolio asset picker
- usage tracking

### Phase 4 — Integrations
- Google Drive import
- embed parser + provider whitelist
- source badges
- import state

### Phase 5 — Polishing
- empty states
- upload progress
- error states
- usage warning saat delete
- storage usage summary

---

## 30. Rekomendasi struktur folder frontend

```txt
src/
  components/
    editor/
      assets/
        asset-center-panel.tsx
        asset-toolbar.tsx
        asset-filter-bar.tsx
        asset-grid.tsx
        asset-card.tsx
        asset-empty-state.tsx
        asset-preview-dialog.tsx
        asset-picker-modal.tsx
        asset-upload-dropzone.tsx
        create-folder-dialog.tsx
        move-asset-dialog.tsx
        rename-asset-dialog.tsx
        delete-asset-dialog.tsx
        google-drive-import-dialog.tsx
        embed-asset-dialog.tsx
        usage-badge.tsx
        source-badge.tsx
        category-badge.tsx
  hooks/
    use-assets.ts
    use-upload-asset.ts
    use-asset-filters.ts
    use-create-folder.ts
    use-import-google-drive.ts
    use-create-embed-asset.ts
    use-attach-asset-to-section.ts
  lib/
    assets/
      asset-types.ts
      asset-validators.ts
      asset-mappers.ts
      embed-parsers.ts
      google-drive.ts
  app/
    api/
      assets/
      integrations/
        google-drive/
      embed/
```

---

## 31. Contoh type definitions TypeScript

```ts
export type AssetKind = "image" | "audio" | "embed";

export type AssetSource = "upload" | "google_drive" | "embed";

export type AssetCategory =
  | "avatar"
  | "cover"
  | "portfolio"
  | "showcase"
  | "brand"
  | "gallery"
  | "audio"
  | "other";

export interface AssetFolder {
  id: string;
  userId: string;
  name: string;
  slug?: string | null;
  color?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserAsset {
  id: string;
  userId: string;
  folderId?: string | null;
  name: string;
  originalFileName?: string | null;
  assetKind: AssetKind;
  assetSource: AssetSource;
  assetCategory?: AssetCategory | null;
  mimeType?: string | null;
  extension?: string | null;
  fileSize?: number | null;
  storageBucket?: string | null;
  storagePath?: string | null;
  publicUrl?: string | null;
  externalUrl?: string | null;
  provider?: string | null;
  width?: number | null;
  height?: number | null;
  durationSeconds?: number | null;
  thumbnailUrl?: string | null;
  altText?: string | null;
  description?: string | null;
  metadata?: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

---

## 32. Keputusan engineering penting

- jangan simpan hanya URL string
- selalu simpan asset reference via `assetId`
- asset library harus reusable
- Google Drive untuk MVP = import, bukan sync penuh
- Embed harus whitelist
- Folder dibuat ringan, satu level dulu

---

## 33. Checklist acceptance criteria MVP

Fitur dianggap siap bila:
- user bisa upload gambar
- user bisa upload audio
- user bisa membuat folder
- user bisa memindahkan asset ke folder
- user bisa memberi/memilih kategori asset
- user bisa melihat asset di library
- user bisa memilih asset dari section editor
- user bisa menghapus asset
- user mendapat warning jika asset sedang dipakai
- user bisa import asset dari Google Drive
- user bisa menambahkan embed valid
- live preview editor update saat asset dipilih
- asset tersimpan aman per user
- data asset terhubung ke section via asset id

---

## 34. Master prompt untuk eksekusi coding

# MASTER PROMPT — IMPLEMENTASI FITUR UNGGAHAN / ASSET CENTER LYNKNOV MVP

Anda sedang bekerja di codebase Lynknov, sebuah platform “Interactive Business OS” berbasis Next.js + TypeScript + Supabase dengan editor premium dark mode. Tugas Anda adalah membangun fondasi fitur **Unggahan / Asset Center** untuk MVP.

## Tujuan utama
Bangun sistem Asset Center yang memungkinkan user:
1. upload file gambar
2. upload file audio
3. membuat dan mengelola folder
4. memberi kategori pada asset
5. import asset dari Google Drive
6. menambahkan asset berbasis embed URL yang aman
7. memilih asset dari library untuk section editor
8. menampilkan perubahan asset langsung di live preview
9. menyimpan relasi asset ke section secara rapi dan scalable

## Scope MVP wajib
### Format file yang didukung
- image: jpg, jpeg, png, gif, webp
- audio: mp3, wav

### Fitur wajib
- Asset Center panel di editor
- Asset library grid
- upload local file
- folder sederhana satu level
- kategori asset
- Google Drive import flow untuk MVP
- embed asset flow berbasis URL whitelist
- asset picker modal untuk section
- usage tracking asset ke section
- integration dengan section data via asset ID
- Supabase storage + metadata tables + RLS

## Prinsip implementasi
- jangan membuat fitur terlalu ramai
- pertahankan visual premium dark mode
- prioritaskan arsitektur reusable
- embed harus aman, berbasis whitelist provider
- Google Drive MVP sebaiknya import file ke storage Lynknov
- folder cukup satu level
- semua asset harus terhubung ke user melalui auth.uid()

## Arsitektur data yang harus dibuat
Buat dan integrasikan:
1. `asset_folders`
2. `user_assets`
3. `asset_usages`

Gunakan konsep:
- `asset_kind`: image | audio | embed
- `asset_source`: upload | google_drive | embed
- `asset_category`: avatar | cover | portfolio | showcase | brand | gallery | audio | other

## Harapan UI
Bangun komponen modular seperti:
- AssetCenterPanel
- AssetToolbar
- AssetFilterBar
- AssetGrid
- AssetCard
- AssetUploadDropzone
- AssetPickerModal
- CreateFolderDialog
- GoogleDriveImportDialog
- EmbedAssetDialog
- UsageBadge / SourceBadge / CategoryBadge

UI harus:
- premium dark
- bersih
- proporsional
- fokus pada visual asset
- mudah dipakai dari editor

## Integrasi editor
Pastikan section editor bisa membuka asset picker dan memilih asset untuk field tertentu, misalnya:
- hero.avatar_asset_id
- showcase item image asset id
- portfolio thumbnail asset id
- audio section asset id

Saat asset dipilih:
- update state editor
- update live preview
- tandai usage mapping
- simpan relasi ke section

## Output yang saya inginkan dari Anda
Tolong kerjakan secara bertahap dan rapi:

### Tahap 1
Analisis struktur codebase yang relevan untuk editor, preview, section data, Supabase, dan storage flow saat ini.

### Tahap 2
Buat rencana implementasi terstruktur yang mencakup:
- file yang perlu dibuat
- file yang perlu diubah
- data flow
- dependency logic
- risk notes

### Tahap 3
Implementasikan backend foundation:
- schema SQL / migration
- RLS
- storage helpers
- upload/delete/import logic
- embed parsing helpers

### Tahap 4
Implementasikan frontend Asset Center:
- panel unggahan
- filter
- grid
- upload
- folder dialog
- card actions
- empty state
- loading state

### Tahap 5
Implementasikan contextual Asset Picker untuk section editor.

### Tahap 6
Integrasikan ke minimal:
- Hero
- Portfolio
- Showcase
- Audio bila sudah ada area dasarnya

### Tahap 7
Rapikan final quality:
- lint
- types
- build
- edge case handling
- error state
- usage warning saat delete

## Batasan penting
- jangan mengacaukan visual editor yang sudah ada
- jangan memecah pattern styling premium yang sudah dibangun
- jangan membuat folder tree kompleks
- jangan menerima raw HTML embed dari user tanpa sanitasi
- jangan membuat perubahan destruktif pada hero/preview yang sudah stabil

## Deliverables yang diharapkan
1. implementasi code
2. ringkasan perubahan
3. file list yang ditambah/diubah
4. catatan arsitektur
5. langkah test manual
6. jika ada keterbatasan, jelaskan jujur dan spesifik

Kerjakan dengan pendekatan senior product engineer yang paham UX editor premium, data model yang rapi, dan integrasi Next.js + Supabase yang aman.

---

## 35. Prompt analisis dulu sebelum coding

### ANALYSIS-ONLY PROMPT
Audit codebase Lynknov saat ini dan fokus pada bagaimana membangun fitur Asset Center untuk editor MVP tanpa merusak fondasi editor yang sudah ada. Tolong analisis:
- struktur editor sekarang
- bagaimana data section disimpan
- bagaimana live preview mengambil data
- titik integrasi terbaik untuk asset picker
- kebutuhan table dan storage
- risiko teknis terbesar
- pendekatan implementasi bertahap paling aman

Berikan output dalam format:
1. Current architecture findings
2. Gaps
3. Recommended architecture
4. Files to create/update
5. Migration plan
6. Risk notes

Jangan coding dulu. Fokus audit dan rencana eksekusi.

---

## 36. Kesimpulan

Daftar MVP yang Anda usulkan **cocok dan masuk akal**, dengan catatan:
- folder dibuat ringan
- Google Drive difokuskan pada import/reference yang aman
- embed dibatasi ke provider whitelist
- asset harus menjadi sistem terpusat, bukan upload acak per section

Dengan fondasi ini, Lynknov akan punya sistem unggahan yang:
- usable untuk user nyata
- rapi untuk backend
- nyaman untuk editor
- scalable untuk pengembangan berikutnya

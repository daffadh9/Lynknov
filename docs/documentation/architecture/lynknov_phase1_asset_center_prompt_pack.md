# Lynknov — Final Execution Prompt Pack
## Phase 1: Asset Center / Unggahan Foundation

Dokumen ini berisi prompt final yang sudah dipertajam untuk fase 1 fitur **Unggahan / Asset Center** di Lynknov. Isinya dirancang agar bisa langsung dipakai ke Claude Sonnet 4.6, Gemini 3.1 Pro High, atau agent coding lain dengan arahan yang lebih presisi, aman, dan sesuai karakter produk Lynknov.

---

# 1. Tujuan Dokumen

Dokumen ini dibuat untuk memastikan fase 1 fitur Unggahan Lynknov dibangun dengan:
- struktur yang rapi
- arah produk yang jelas
- konteks UX yang kuat
- arsitektur data yang aman
- pendekatan implementasi bertahap
- kompatibilitas dengan editor yang sudah ada

Fase 1 **tidak bertujuan membangun media manager penuh**, tetapi membangun **fondasi Asset Center yang nyata dan scalable**.

---

# 2. Ringkasan Keputusan Produk Fase 1

## Posisi fitur
Fitur ini bukan sekadar upload file, tetapi **Asset Center**: pusat aset visual, audio, dan media terhubung milik user yang bisa dipakai ulang di banyak section editor.

## Scope MVP fase 1
Fitur minimum yang disepakati:
1. Gambar
2. Folder
3. Integrasi Google Drive
4. Integrasi Embed
5. Kategori
6. Format file:
   - jpg
   - jpeg
   - png
   - gif
   - webp
   - mp3
   - wav

## Guardrails penting
- folder hanya 1 level
- Google Drive untuk MVP fokus ke **import**, bukan sync dua arah
- embed harus aman dan berbasis **provider whitelist**
- asset harus menjadi **first-class entity**
- relasi asset ke section harus mengarah ke `assetId`
- tetap backward-compatible dengan field URL lama
- jangan merusak editor dan live preview yang sudah mulai stabil

---

# 3. Tujuan Fase 1

Fase 1 harus menghasilkan sistem unggahan yang:
- tersimpan nyata di backend
- aman per user
- punya metadata lengkap
- bisa dikelompokkan
- bisa dipilih dari editor
- bisa dipakai ulang
- punya usage tracking dasar
- siap dikembangkan ke fase berikutnya

## Output bisnis/produk yang diharapkan
Setelah fase 1 selesai:
- tab Unggahan tidak lagi mock/static
- user benar-benar bisa upload file
- user punya library asset sendiri
- user bisa memilih asset ke section editor
- sistem mulai punya relasi data yang rapi

---

# 4. Konteks Proyek Lynknov

Gunakan konteks ini saat mengeksekusi coding:

Lynknov adalah platform “Interactive Business OS” berbasis Next.js + TypeScript + Tailwind + Supabase. Fokus utama saat ini adalah editor premium dark mode untuk membangun halaman publik / smart bio interactive user.

Karakter produk:
- premium
- dark mode
- clean
- minimal
- elegan
- polished
- visual-first
- tidak terasa seperti dashboard admin generik

Kondisi editor saat ini:
- sudah ada fondasi editor 3-panel
- panel kiri: navigasi/tools
- panel tengah: workspace / editing context
- panel kanan: live preview
- beberapa section sudah ada, seperti Hero, About, Showcase, Portfolio, Storyboard, Link Hub, Testimonials
- Hero untuk sementara dianggap cukup stabil
- fitur berikutnya yang ingin dibangun adalah sistem unggahan nyata yang terintegrasi dengan editor

Prinsip penting:
- jangan merusak fondasi editor
- jangan membuat layout preview kembali kacau
- jangan membuat UI terlalu teknis
- pertahankan visual premium dark yang sudah dibangun
- prioritaskan reusability
- semua keputusan harus kompatibel dengan workflow editor Lynknov

---

# 5. Keputusan Arsitektur Fase 1

## 5.1 Asset sebagai first-class entity
Asset tidak boleh lagi hidup hanya sebagai URL string yang menempel di section.

Setiap asset harus punya:
- record database sendiri
- relasi ke user
- source
- category
- type
- folder opsional
- usage tracking

## 5.2 Backward compatibility
Karena editor saat ini masih banyak mengandalkan URL string untuk rendering cepat, fase 1 tidak boleh memaksa refactor total.

Gunakan pendekatan:
- field URL lama tetap dipertahankan
- tambahkan field `...AssetId`

Contoh:
- `avatarUrl`
- `avatarAssetId`

Artinya:
- preview tetap aman
- sistem data mulai rapi
- migrasi bisa bertahap

## 5.3 Folder
Folder hanya 1 level.

Scope folder:
- create
- rename
- delete
- move asset to folder
- filter asset by folder

Tidak ada nested folders di fase 1.

## 5.4 Google Drive
Google Drive untuk fase 1 harus diposisikan sebagai **import source**, bukan sync engine.

Keputusan final:
- user connect Google
- user pilih file dari Drive
- sistem mengimpor/copy file ke storage Lynknov
- metadata asal tetap disimpan

Jangan menjadikan hotlink/reference-only sebagai jalur utama.

## 5.5 Embed
Embed harus aman.

Keputusan final:
- user paste URL
- server validasi provider
- URL diparse
- metadata embed disimpan terstruktur
- render dilakukan secara aman

Provider whitelist awal:
- Spotify
- YouTube
- SoundCloud

Jangan menerima raw HTML atau iframe bebas dari input user.

## 5.6 Usage tracking
Gunakan pendekatan yang stabil dan tidak terlalu terikat pada entity id section yang belum tentu permanen.

Gunakan:
- `page_id` nullable
- `section_key`
- `field_key`

Contoh:
- hero / avatar
- hero / cover_image
- portfolio / thumbnail
- showcase / image

---

# 6. Data Model yang Direkomendasikan

## 6.1 Tabel: asset_folders
Tujuan:
menyimpan folder milik user

Kolom yang direkomendasikan:
- `id` uuid primary key
- `user_id` uuid not null
- `name` text not null
- `slug` text nullable
- `color` text nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Catatan:
- pertimbangkan unique `(user_id, name)`

## 6.2 Tabel: user_assets
Tujuan:
menyimpan metadata semua asset

Kolom yang direkomendasikan:
- `id` uuid primary key
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
- `width` integer nullable
- `height` integer nullable
- `duration_seconds` numeric nullable
- `thumbnail_url` text nullable
- `alt_text` text nullable
- `description` text nullable
- `metadata` jsonb default '{}'
- `is_active` boolean default true
- `created_at` timestamptz
- `updated_at` timestamptz

Enum yang direkomendasikan:

### asset_kind
- image
- audio
- embed

### asset_source
- upload
- google_drive
- embed

### asset_category
- avatar
- cover
- portfolio
- showcase
- brand
- gallery
- audio
- other

## 6.3 Tabel: asset_usages
Tujuan:
melacak asset dipakai di mana

Kolom yang direkomendasikan:
- `id` uuid primary key
- `user_id` uuid not null
- `asset_id` uuid not null
- `page_id` uuid nullable
- `section_key` text not null
- `field_key` text not null
- `created_at` timestamptz

---

# 7. Storage Structure

## Bucket
- `user-assets`

## Struktur path
- `users/{userId}/images/...`
- `users/{userId}/audio/...`
- `users/{userId}/imports/google-drive/...`

Contoh:
- `users/uid/images/avatar-main.webp`
- `users/uid/images/portfolio-card-1.png`
- `users/uid/audio/intro.mp3`
- `users/uid/imports/google-drive/cover-hero.jpg`

Prinsip:
- ownership jelas
- mudah diaudit
- mudah di-maintain
- scalable

---

# 8. Security & RLS

## Tabel yang wajib pakai RLS
- `asset_folders`
- `user_assets`
- `asset_usages`

## Policy dasar
User hanya boleh:
- select data miliknya
- insert data miliknya
- update data miliknya
- delete data miliknya

## Storage security
Pastikan user hanya bisa:
- upload ke path miliknya
- delete file miliknya
- tidak menimpa file user lain

## Embed security
- validasi domain/provider
- sanitasi output
- generate embed URL aman
- jangan render input mentah dari user

---

# 9. UX Structure untuk Tab Unggahan

Tab Unggahan harus terasa seperti **Asset Center**, bukan file manager teknis.

## Struktur panel
### Header
- Judul: Unggahan
- Deskripsi: Kelola gambar, audio, dan aset terhubung untuk halaman Anda.

### Primary actions
- Upload file
- Folder baru
- Import dari Google Drive
- Tambah Embed

### Info strip
- Total asset
- Total folder
- Dipakai di halaman
- Storage terpakai

### Filter
- Search
- Type
- Category
- Folder
- Source

### Main area
- asset grid
- empty state jika belum ada data

## Asset card
### Image
- thumbnail dominan
- nama
- badge kategori
- badge source
- usage state

### Audio
- icon/waveform indicator
- nama
- durasi
- source badge
- quick preview

### Embed
- provider badge
- judul
- thumbnail jika ada
- source info ringkas

### Quick actions
- Gunakan
- Preview
- Rename
- Move to folder
- Delete

## Empty state
Copy yang direkomendasikan:
- Judul: Belum ada aset
- Deskripsi: Upload gambar, audio, atau impor dari Google Drive untuk mulai mengisi halaman Anda.

CTA:
- Upload file
- Tambah dari Google Drive

---

# 10. Contextual Asset Picker

Asset Picker wajib ada minimal dalam bentuk dasar.

Tujuan:
- user bisa memilih asset langsung dari dalam context editing section
- user tidak harus keluar ke tab Unggahan hanya untuk mengganti asset

## Isi picker
- tab: Library / Upload / Drive / Embed
- search
- category filter
- grid asset
- preview kecil
- tombol pilih

## Integrasi awal minimal
- Hero
- Portfolio
- Showcase

Jika Audio section sudah cukup siap, boleh ikut.

---

# 11. Integrasi Section yang Direkomendasikan

## Prioritas 1
### Hero
- avatar
- cover image jika ada

## Prioritas 2
### Portfolio
- thumbnail project

## Prioritas 3
### Showcase
- image/product image

Prinsip:
- mulai dari 1 section dulu untuk PoC aman
- lalu reuse component ke section lain
- jangan refactor semua section sekaligus

---

# 12. Validasi File

## Image
Format:
- jpg
- jpeg
- png
- gif
- webp

Validasi:
- mime type valid
- extension valid
- max size 5MB
- optional dimension warning

## Audio
Format:
- mp3
- wav

Validasi:
- mime type valid
- extension valid
- max size 10–15MB
- optional duration extraction

## Embed
Validasi:
- URL valid
- provider masuk whitelist
- parsed safely
- bukan HTML mentah
- bukan arbitrary iframe

---

# 13. Struktur Komponen yang Direkomendasikan

## Global Asset Center
- `AssetCenterPanel`
- `AssetToolbar`
- `AssetStatsBar`
- `AssetFilterBar`
- `AssetGrid`
- `AssetCard`
- `AssetEmptyState`
- `AssetPreviewDialog`

## Dialogs
- `CreateFolderDialog`
- `RenameAssetDialog`
- `MoveAssetDialog`
- `DeleteAssetDialog`
- `GoogleDriveImportDialog`
- `EmbedAssetDialog`

## Picker layer
- `AssetPickerModal`
- `AssetPickerTabs`
- `SectionAssetField`

## UI helpers
- `UsageBadge`
- `SourceBadge`
- `CategoryBadge`
- `FileTypeIcon`

---

# 14. Struktur Engineering yang Direkomendasikan

## Types
- `src/types/assets.ts`

## Core logic
- `src/lib/assets/asset-types.ts`
- `src/lib/assets/asset-validators.ts`
- `src/lib/assets/asset-mappers.ts`
- `src/lib/assets/embed-parsers.ts`
- `src/lib/assets/google-drive.ts`

## Data/server helpers
- `src/features/assets/actions.ts`
- `src/features/assets/queries.ts`

## Components
- `src/components/editor/assets/...`

## Database
- `supabase/migrations/[timestamp]_asset_center_schema.sql`

Prinsip:
- jangan menumpuk semua logic ke satu file besar
- jaga modularitas
- ikuti pattern codebase yang sudah ada bila lebih cocok

---

# 15. Acceptance Criteria Fase 1

Fase 1 dianggap selesai jika:
- bucket storage sudah aktif
- tabel asset utama sudah ada
- RLS aman
- upload image berjalan
- upload audio berjalan
- folder bisa dibuat
- kategori asset tersedia
- tab Unggahan load data nyata
- asset picker tersedia
- minimal Hero terintegrasi
- usage tracking dasar berjalan
- warning saat delete asset yang sedang dipakai berjalan
- preview tetap aman
- lint pass
- typecheck pass
- production build pass

---

# 16. Urutan Implementasi Final

## Step 1 — Database & Storage Foundation
- migration SQL
- bucket
- enums / constraints
- RLS
- ownership policies

## Step 2 — Asset Service Layer
- upload helpers
- fetch/query helpers
- create folder
- rename/move/delete asset
- usage helpers
- embed parser foundation
- Google Drive import foundation

## Step 3 — Global Asset Center UI
- tab Unggahan nyata
- asset grid
- filter
- upload dropzone
- folder dialog
- loading/empty/error states

## Step 4 — Contextual Asset Picker
- picker reusable
- select asset dari section
- upload dari context
- Drive/Embed entry points

## Step 5 — Section Integration
- Hero
- lalu Portfolio
- lalu Showcase

## Step 6 — Safety & Polish
- usage warning
- backward-compatible fallback
- build stability
- manual QA

---

# 17. MASTER PROMPT — EKSEKUSI FASE 1

Gunakan prompt ini untuk Sonnet 4.6 atau Gemini setelah konteks proyek dipahami.

---

Anda sedang bekerja di codebase Lynknov, sebuah platform “Interactive Business OS” berbasis Next.js + TypeScript + Tailwind + Supabase dengan editor premium dark mode dan live preview.

Saya ingin Anda membangun **fase 1 fitur Unggahan / Asset Center** secara aman, modular, dan sesuai karakter Lynknov.

## Tujuan fase 1
Bangun fondasi nyata Asset Center yang memungkinkan user:
1. upload gambar
2. upload audio
3. membuat dan mengelola folder satu level
4. memberi kategori asset
5. import asset dari Google Drive
6. menambahkan asset dari embed URL yang aman
7. memilih asset dari editor section
8. menggunakan asset lintas section
9. memiliki usage tracking dasar
10. menjaga live preview tetap stabil

## Scope fitur yang wajib
### Asset types / formats
- image: jpg, jpeg, png, gif, webp
- audio: mp3, wav
- embed: Spotify, YouTube, SoundCloud via whitelist provider

### Feature scope
- global Asset Center di tab Unggahan
- upload local file
- folder ringan satu level
- kategori asset
- Google Drive import foundation
- embed foundation
- contextual Asset Picker
- minimal section integration
- usage tracking
- delete warning saat asset sedang dipakai

## Konteks penting
Editor Lynknov sudah memiliki fondasi 3-panel dan live preview yang cukup sensitif. Jangan merusak struktur editor yang sudah ada. Hero untuk sementara dianggap cukup stabil. Fokus Anda adalah membangun fitur unggahan yang nyata tanpa perubahan destruktif.

Visual harus tetap:
- premium
- dark
- clean
- elegant
- visual-first
- tidak terasa seperti admin dashboard generik

## Aturan arsitektur yang wajib diikuti

### 1. Asset adalah first-class entity
Jangan menyimpan asset hanya sebagai URL string biasa.

### 2. Gunakan backward-compatible field strategy
Jangan refactor destruktif semua section sekaligus.
Pertahankan field URL lama untuk rendering cepat, tetapi tambahkan field `...AssetId`.

Contoh:
- `avatarUrl`
- `avatarAssetId`

### 3. Folder hanya satu level
Tidak ada nested folder.

### 4. Google Drive = import to Lynknov storage
Jangan bangun full sync dua arah.

### 5. Embed harus aman
Gunakan provider whitelist:
- Spotify
- YouTube
- SoundCloud

Jangan menerima raw HTML atau iframe bebas.

### 6. Usage tracking
Gunakan pendekatan:
- `page_id`
- `section_key`
- `field_key`

Jangan terlalu mengandalkan `section_id` jika struktur editor belum stabil ke arah itu.

## Data model yang harus dibangun

### asset_folders
- id
- user_id
- name
- slug
- color
- created_at
- updated_at

### user_assets
- id
- user_id
- folder_id
- name
- original_file_name
- asset_kind
- asset_source
- asset_category
- mime_type
- extension
- file_size
- storage_bucket
- storage_path
- public_url
- external_url
- provider
- width
- height
- duration_seconds
- thumbnail_url
- alt_text
- description
- metadata
- is_active
- created_at
- updated_at

### asset_usages
- id
- user_id
- asset_id
- page_id
- section_key
- field_key
- created_at

## Storage structure
Gunakan bucket:
- `user-assets`

Gunakan path:
- `users/{userId}/images/...`
- `users/{userId}/audio/...`
- `users/{userId}/imports/google-drive/...`

## Security
Pastikan:
- RLS aktif untuk semua tabel asset
- user hanya bisa mengakses data miliknya
- upload/delete storage berbasis ownership user
- embed divalidasi dan disanitasi aman

## UX requirements

### Global tab Unggahan
Harus punya:
- header
- primary actions
- info strip
- filters
- asset grid
- empty/loading/error states

### Contextual picker
Harus bisa dipakai dari section editor dengan mode:
- Library
- Upload
- Drive
- Embed

### Asset cards
Harus visual-first, ringkas, dan elegan.
Jangan membuat tab ini terasa seperti file explorer teknis.

## Integrasi minimal section
Integrasikan minimal ke:
1. Hero
2. Portfolio
3. Showcase (jika aman)

Mulai dari Hero sebagai proof of concept jika itu paling aman.

## Urutan kerja yang saya inginkan

### Tahap 1 — Audit codebase
Analisis file editor, state, preview, Supabase, dan titik integrasi terbaik.

### Tahap 2 — Implementation plan
Berikan file list create/update, data flow, dependency notes, dan risk notes.

### Tahap 3 — Backend foundation
Implementasikan migration, RLS, storage setup, helpers, folder logic, usage logic, Drive import foundation, dan embed parser foundation.

### Tahap 4 — Frontend Asset Center
Implementasikan tab Unggahan nyata dengan grid, upload, folder, filters, dialogs, dan states.

### Tahap 5 — Contextual picker
Bangun picker yang reusable untuk section editor.

### Tahap 6 — Section integration
Hubungkan ke minimal Hero, lalu Portfolio, lalu Showcase bila aman.

### Tahap 7 — Validation
Pastikan lint, types, dan build lolos. Pastikan delete warning dan fallback compatibility berjalan.

## Output yang saya inginkan
Setelah bekerja, berikan:
1. ringkasan perubahan
2. daftar file yang dibuat/diubah
3. keputusan arsitektur penting
4. langkah test manual
5. risk notes
6. known limitations jika ada

Kerjakan seperti senior product engineer yang paham premium editor UX, scalable data model, dan integrasi Next.js + Supabase yang aman.

---

# 18. ANALYSIS-ONLY PROMPT

Gunakan ini bila ingin model audit dulu sebelum coding.

Audit codebase Lynknov saat ini dan fokus pada implementasi fase 1 fitur Asset Center / Unggahan.

Analisis:
- struktur editor 3-panel
- bagaimana section data disimpan
- bagaimana live preview membaca data
- field asset apa saja yang sekarang masih berupa URL string
- titik terbaik untuk contextual asset picker
- titik terbaik untuk global tab Unggahan
- apakah sudah ada storage/upload flow sebelumnya
- kebutuhan migration dan storage policy
- risiko terbesar jika integrasi dilakukan terburu-buru

Berikan output dalam format:
1. Current architecture findings
2. Existing strengths
3. Gaps
4. Recommended architecture
5. Suggested data model
6. Files to create
7. Files to update
8. Migration / implementation plan
9. Risk notes
10. Recommended first execution step

Jangan coding dulu.

---

# 19. Prompt Bertahap per Fase

## A. Audit + planning
Audit codebase Lynknov dan rancang implementasi fase 1 Asset Center untuk:
- gambar
- audio
- folder satu level
- Google Drive import
- embed aman
- kategori asset

Jangan coding dulu.
Saya ingin:
1. file relevan saat ini
2. bagaimana editor state bekerja
3. bagaimana live preview membaca data
4. titik integrasi terbaik
5. data model yang direkomendasikan
6. tabel Supabase yang perlu dibuat
7. struktur komponen yang perlu dibangun
8. urutan implementasi paling aman
9. risiko yang perlu dijaga

## B. Backend foundation
Implementasikan backend foundation untuk fase 1 Asset Center Lynknov:
- migration schema
- asset_folders
- user_assets
- asset_usages
- RLS
- storage helpers
- upload image/audio
- folder logic
- usage logic
- Google Drive import foundation
- embed parser foundation

Pastikan semua aman, typed, dan modular.

## C. Frontend asset center
Bangun tab Unggahan nyata dengan visual premium dark:
- AssetCenterPanel
- AssetToolbar
- AssetFilterBar
- AssetGrid
- AssetCard
- AssetUploadDropzone
- dialogs
- empty/loading/error states

Pastikan UX bersih, ringan, visual-first, dan tidak seperti admin dashboard.

## D. Contextual picker
Bangun Asset Picker reusable untuk:
- Library
- Upload
- Drive
- Embed

Integrasikan minimal ke Hero.
Jika aman, lanjut ke Portfolio dan Showcase.

## E. Final polishing
Pastikan:
- lint pass
- typecheck pass
- build pass
- delete warning berjalan
- fallback compatibility aman
- preview tetap stabil

Berikan final summary, file list, manual QA checklist, dan known limitations.

---

# 20. Rekomendasi Penggunaan Model

## Jika memakai satu model saja
- untuk stabilitas implementasi coding: **Claude Sonnet 4.6**
- untuk eksplorasi visual/arsitektur awal: **Gemini 3.1 Pro High**

## Workflow ideal
- Gemini → audit, eksplorasi UI/UX, arah sistem
- Sonnet → implementasi coding, refactor hati-hati, final polishing

Untuk fase 1 ini, jika harus memilih satu default untuk eksekusi coding:
**gunakan Sonnet 4.6**

---

# 21. Penutup

Fase 1 Asset Center Lynknov harus diperlakukan sebagai fondasi produk, bukan fitur tambahan kecil. Jika dibangun dengan benar sekarang, sistem ini akan menjadi basis untuk:
- media reuse lintas section
- pengelolaan visual yang rapi
- audio section yang matang
- future premium themes
- advanced integrations
- content system yang lebih scalable

Tujuan akhirnya bukan sekadar “bisa upload file”, tetapi membuat Lynknov terasa seperti **Interactive Business OS** yang benar-benar punya pusat aset media yang modern, elegan, dan usable.

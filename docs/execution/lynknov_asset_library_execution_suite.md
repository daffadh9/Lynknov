# Lynknov Asset Library — UX Blueprint, System Architecture, and Master Prompt

## 1) Tujuan dokumen

Dokumen ini adalah kelanjutan dari keputusan positioning **Asset Library** sebagai sistem global milik workspace Lynknov, bukan sekadar fitur upload milik editor halaman publik.

Tujuan dokumen ini adalah menerjemahkan arah produk tersebut menjadi fondasi yang siap dieksekusi:

1. **UX Blueprint** — bagaimana halaman, hierarki, state, dan interaksi Asset Library harus dibangun.
2. **System Architecture** — bagaimana data, relasi, integrasi, dan logika sistem asset dirancang.
3. **Master Prompt Eksekusi Coding** — prompt lengkap yang bisa diberikan ke coding agent agar implementasi tetap selaras dengan visi produk dan standar UX Lynknov.

Dokumen ini harus dipakai sebagai acuan kerja utama sebelum implementasi besar dimulai.

---

# PART A — ASSET LIBRARY UX BLUEPRINT

## 2) UX vision

Asset Library Lynknov harus terasa sebagai:

- ruang kerja premium untuk mengelola media dan file
- sistem lintas pillar yang reusable
- tool yang powerful namun tetap bersih
- pusat aset untuk public page, portfolio, commercial hub, dan future modules
- bagian alami dari **Interactive Business OS**, bukan halaman upload generik

UX yang dibangun harus memberi rasa:
- fokus
- tenang
- modern
- premium
- produktif
- terstruktur

Bukan:
- gelap polos dan kosong
- penuh blok yang membingungkan
- sekadar list file biasa

---

## 3) UX principle utama

### Principle 1 — One source, many entry points
Asset dikelola dari satu library global, tetapi bisa diakses dari banyak konteks.

### Principle 2 — Clear hierarchy before density
Informasi dan aksi harus punya urutan penting yang jelas sebelum menambahkan banyak elemen.

### Principle 3 — Visual calm, operational power
Tampilan harus tenang dan elegan, tetapi aksi manajemen tetap kuat dan lengkap.

### Principle 4 — Reuse over re-upload
Sistem harus mendorong pemakaian ulang asset, bukan membuat user upload hal yang sama berkali-kali.

### Principle 5 — Context-aware details
Sistem tidak hanya menyimpan file, tetapi tahu file dipakai di mana.

### Principle 6 — Safe management
Delete, replace, move, dan rename harus terasa aman, jelas, dan tidak merusak aset yang sedang dipakai di tempat lain.

---

## 4) Posisi Asset Library dalam navigasi produk

## Sidebar utama workspace
Tambahkan item khusus:

- **Asset**

## Halaman utama
Judul halaman yang direkomendasikan:

- **Asset Library**

## Subcopy
Kelola gambar, video, audio, dokumen, dan aset terhubung untuk seluruh workspace Lynknov Anda.

## Contextual access di fitur lain
Semua fitur yang butuh media tidak membuat sistem upload baru. Mereka membuka:

- Asset Picker
- Quick Upload
- Recent Assets
- Connect Source

Fitur yang harus menggunakan sistem yang sama:
- Public Page Editor
- Portfolio Showcase
- Commercial Hub
- Marketing Suite
- Audio / media blocks
- future modules lain

---

## 5) Sitemap dan struktur halaman utama

## Level struktur halaman

### A. Header identity block
Berisi identitas halaman, konteks, dan angka ringkasan.

### B. Main command toolbar
Berisi aksi dan kontrol utama.

### C. Content workspace
Terbagi menjadi:
- left filter rail
- main browser area
- right detail panel / drawer

### D. Secondary states
Empty state, no results, loading, bulk select, warning state, dan lainnya.

---

## 6) Header identity block

Header tidak boleh terasa kecil atau sekadar teks label. Ia harus memberi kesan bahwa halaman ini adalah ruang kerja inti.

## Komponen yang direkomendasikan

### Heading
**Asset Library**

### Supporting copy
Kelola dan gunakan kembali aset visual, audio, dokumen, dan sumber terhubung di seluruh workspace Lynknov.

### Ringkasan metrik
- Total Asset
- Folder
- Storage Used
- Sedang Dipakai

### CTA kanan atas
- Upload File
- New Folder

### Optional micro-status
- last sync source
- upload in progress
- usage summary ringkas

## Tujuan UX header
- membangun kesan premium
- memberi konteks global
- menunjukkan bahwa fitur ini lebih dari upload page
- membantu orientasi user sejak awal

---

## 7) Main command toolbar

Toolbar adalah pusat kontrol cepat. Ia harus terasa seperti command surface, bukan sekadar kumpulan tombol acak.

## Urutan elemen yang direkomendasikan

### Kiri
- Upload
- Folder Baru
- Integrasi

### Tengah
- Search bar utama

### Kanan
- View toggle (Grid / List)
- Sort
- Bulk Select

## Catatan interaksi

### Upload
Membuka menu:
- Upload file
- Upload multiple
- Upload folder

### Folder Baru
Membuka dialog pembuatan folder.

### Integrasi
Membuka menu source:
- Google Drive
- Embed / URL
- future connectors

### Search bar
Bisa mencari:
- nama file
- tag
- format
- dimensi
- source
- folder

### View toggle
Pindah antara grid view dan list view.

### Sort
Pilihan minimal:
- Terbaru
- Terlama
- Nama A–Z
- Nama Z–A
- Ukuran terbesar
- Ukuran terkecil
- Paling sering dipakai

### Bulk Select
Mengaktifkan mode pemilihan massal.

---

## 8) Content workspace layout

Struktur layout paling ideal:

### Left rail
Filter dan kategori.

### Center browser
Area utama browsing asset.

### Right panel
Detail asset yang dipilih.

## Layout behavior

### Default desktop
- left filter visible
- center grid/list dominant
- right detail hidden sampai asset dipilih

### Saat asset dipilih
- right detail panel muncul
- center area menyesuaikan

### Tablet
- left filter bisa collapsible
- right detail menjadi drawer overlay atau slide panel

### Mobile
- asset manager penuh kemungkinan bukan prioritas editor mobile
- gunakan stacked layout
- filter dan detail menjadi sheet/drawer

---

## 9) Left filter rail blueprint

Filter rail harus kuat tetapi tidak berat.

## Susunan grup filter

### Grup 1 — Tipe File
- Semua
- Gambar
- Video
- Audio
- Dokumen
- Embed
- Lottie / JSON
- Font
- Folder

### Grup 2 — Penggunaan
- Sedang dipakai
- Belum dipakai
- Dipakai di Public Page
- Dipakai di Portfolio
- Dipakai di Commercial Hub
- Dipakai di Marketing

### Grup 3 — Tanggal
- Hari ini
- 7 hari terakhir
- 30 hari terakhir
- Custom range

### Grup 4 — Tag
- Hero
- Brand
- Product
- Portfolio
- Campaign
- Cover
- Audio
- Document

### Grup 5 — Source
- Upload manual
- Google Drive
- Embed
- Imported
- Generated

## Prioritas visual
- Tipe file: expanded by default
- Penggunaan: expanded by default
- Tag: expanded by default
- Tanggal dan source: collapsible

## Interaksi tambahan
- jumlah asset per kategori
- chip aktif untuk filter terpilih
- clear all filters

---

## 10) Browser area blueprint

## Dua mode tampilan utama

### Grid View
Fokus pada scanning visual dan browsing cepat.

### List View
Fokus pada metadata, manajemen, dan bulk handling.

Keduanya harus hadir, karena kebutuhan user akan berbeda tergantung konteks.

---

## 11) Grid card system

Grid card harus dibedakan berdasarkan tipe file.

## A. Shared card anatomy
Semua card minimal punya:
- thumbnail / visual area
- nama asset
- metadata ringkas
- format badge
- optional usage badge
- quick action menu

## B. Card per tipe

### Image card
- preview image besar
- dimensi
- file size
- format badge

### Video card
- preview thumbnail
- durasi
- file size
- play icon overlay

### Audio card
- icon atau mini waveform
- durasi
- file size
- format badge

### Document card
- document icon / first-page preview
- file type badge
- file size

### Embed card
- source badge
- linked domain
- preview cover jika ada

### Folder card
- folder cover
- jumlah item
- last updated

### Technical card
Untuk json, lottie, font, dan file non-visual.
- branded placeholder
- type badge
- metadata kecil

## C. Card actions
Hover / selected state bisa menampilkan:
- preview
- rename
- move
- duplicate
- delete
- copy link
- view usage

---

## 12) List view blueprint

List view cocok untuk aset dokumen, aset teknis, dan bulk management.

## Kolom yang direkomendasikan
- checkbox
- nama asset
- tipe
- format
- size
- folder
- tags
- source
- usage count
- updated at
- actions

## Kelebihan list view
- mudah sort
- mudah multi-select
- jelas untuk metadata-heavy asset
- efektif untuk asset library besar

---

## 13) Asset detail panel blueprint

Bagian detail asset adalah area yang sangat penting dan harus terasa premium.

## Struktur panel

### A. Preview block
- large preview
- open / preview button
- quick replace or copy use button

### B. Overview section
- file name
- type
- format
- size
- resolution / duration
- created at
- updated at
- uploaded by

### C. Usage section
- status: sedang dipakai / belum dipakai
- dipakai di mana saja
- usage count
- last used
- link ke entitas terkait

### D. Organization section
- folder
- tags
- alt text
- caption
- internal note

### E. Source section
- source type
- drive source / embed URL
- sync status
- linked origin

### F. Action section
- rename
- move
- duplicate
- replace
- archive
- download
- delete

## Opsi layout panel
Bisa dibuat:
- satu panel panjang dengan divider
atau
- tab kecil: Overview / Usage / Metadata / Actions

Untuk tahap awal, satu panel panjang lebih cepat dieksekusi.

---

## 14) Empty state blueprint

Empty state harus terasa mengundang, bukan sekadar kosong.

## Komponen empty state
- refined icon / illustration
- headline kuat
- supporting copy
- CTA utama
- CTA sekunder
- hint format support

## Contoh arah copy
### Headline
**Mulai bangun library aset Anda**

### Supporting copy
Upload gambar, video, audio, dokumen, atau hubungkan sumber eksternal untuk mulai mengisi seluruh workspace Lynknov.

### CTA utama
Upload Asset Pertama

### CTA sekunder
Hubungkan Google Drive

### CTA ketiga
Buat Folder

---

## 15) No results state

Saat search/filter tidak menemukan hasil, jangan tampilkan area kosong membingungkan.

## Isi no results state
- headline: Tidak ada asset yang cocok
- subcopy: coba ubah kata kunci, hapus filter, atau telusuri semua asset
- action: reset filters

---

## 16) Bulk select state

Saat user mengaktifkan bulk select, halaman harus berubah cukup jelas agar konteksnya terasa.

## Elemen yang harus muncul
- total selected items
- bulk move
- bulk tag
- bulk delete
- bulk archive
- clear selection

## UX note
Bulk mode sebaiknya mengubah top toolbar menjadi action bar agar user tahu sedang berada dalam mode berbeda.

---

## 17) Safe delete interaction

Ini salah satu alur paling penting.

Jika asset sedang dipakai, delete tidak boleh terasa sembrono.

## Behavior yang direkomendasikan
Saat klik delete:

### Jika asset belum dipakai
Muncul dialog normal.

### Jika asset sedang dipakai
Muncul warning detail:
- asset ini sedang dipakai di Hero Section
- juga dipakai di Portfolio item X
- juga dipakai di Product card Y

## Pilihan aksi
- Batal
- Ganti dulu
- Archive
- Delete anyway

Ini akan membuat sistem terasa cerdas dan aman.

---

## 18) Replace asset flow

Replace flow harus ringan dan cepat karena akan sering dipakai.

## Alur ideal
1. User berada di editor atau detail panel.
2. Klik Replace.
3. Muncul Asset Picker.
4. Bisa pilih dari:
   - recent
   - library
   - upload baru
   - Google Drive
   - embed
5. Setelah dipilih, usage map diperbarui.

## Prinsip UX
- replace tidak memaksa user keluar dari konteks
- asset picker harus cepat dan ringan
- preview perubahan sebaiknya langsung terlihat

---

## 19) Asset Picker blueprint

Asset Picker adalah komponen reusable lintas fitur.

## Tujuan
Memberi akses cepat ke sistem asset tanpa harus meninggalkan workflow user.

## Struktur picker
- header title
- search
- recent assets tab
- asset library tab
- upload baru button
- optional source tab (Google Drive / Embed)
- grid ringan untuk browsing
- confirm selection

## Context usage
Harus bisa dipanggil dari:
- Hero image chooser
- gallery manager
- portfolio project cover
- product image chooser
- audio block
- document attachment

---

## 20) Visual direction blueprint

## Mood visual
Asset Library harus terasa seperti:
- premium workspace
- creative ops room
- organized media environment
- business-class system

## Background direction
Jangan flat black penuh.
Gunakan:
- dark charcoal / graphite base
- subtle gradient layering
- elevated surfaces
- tipis glow premium pada area penting
- border lembut low-contrast
- sedikit tekstur halus bila perlu

## Surface direction
- header surface lebih elevated
- toolbar seperti command dock
- card asset punya depth yang halus
- selected state jelas tapi elegan
- panel detail lebih terasa fokus daripada area sekitar

## Accent direction
Gunakan accent Lynknov secukupnya untuk:
- selected states
- active controls
- CTA utama
- progress/upload states

Jangan terlalu banyak warna bersaing.

---

## 21) UX success criteria

Desain dianggap berhasil jika:
- user paham bahwa asset bisa dipakai lintas fitur
- user bisa upload, cari, kelola, dan pakai ulang asset tanpa bingung
- halaman terasa premium dan tidak monoton
- detail asset terasa kaya tetapi tetap rapi
- editor, portfolio, dan commercial hub tidak membuat sistem upload masing-masing
- tindakan berisiko seperti delete dan replace terasa aman

---

# PART B — ASSET SYSTEM ARCHITECTURE

## 22) Tujuan arsitektur sistem

Asset system Lynknov harus menjadi fondasi bersama untuk seluruh pillar. Maka arsitekturnya harus:
- modular
- reusable
- context-aware
- scalable
- aman terhadap perubahan penggunaan

Sistem ini bukan sekadar menyimpan file, tetapi mengelola lifecycle asset.

---

## 23) Domain capability utama

Sistem asset harus dibangun di atas 5 capability inti.

### Capability 1 — Ingestion
Bagaimana asset masuk ke sistem.

### Capability 2 — Organization
Bagaimana asset diatur dan dikelompokkan.

### Capability 3 — Retrieval
Bagaimana asset dicari dan ditemukan.

### Capability 4 — Usage Mapping
Bagaimana sistem tahu asset dipakai di mana.

### Capability 5 — Delivery & Integration
Bagaimana asset digunakan ulang lintas fitur dan source.

Ini harus menjadi kerangka berpikir engineering sejak awal.

---

## 24) Entity model utama

## A. Asset
Entity utama yang mewakili setiap file / linked asset.

### Konseptual field
- id
- workspace_id
- name
- original_name
- slug or normalized key
- type
- format
- mime_type
- size_bytes
- width
- height
- duration_ms
- storage_path
- public_url
- thumbnail_url
- preview_url
- source_type
- source_ref_id
- folder_id
- status
- alt_text
- caption
- internal_note
- uploaded_by
- created_at
- updated_at
- archived_at
- deleted_at

## B. Folder
- id
- workspace_id
- name
- parent_id
- created_by
- created_at
- updated_at

## C. Tag
- id
- workspace_id
- label
- category
- created_at

## D. AssetTag relation
- asset_id
- tag_id

## E. AssetUsage
- id
- asset_id
- feature_type
- entity_type
- entity_id
- entity_label
- placement_key
- is_primary
- created_at
- updated_at

## F. IntegrationSource
- id
- workspace_id
- source_type
- external_account_id
- external_item_id
- source_url
- sync_status
- metadata_json
- created_at
- updated_at

---

## 25) Asset type taxonomy

Untuk menjaga konsistensi, asset harus punya kategori sistem yang tegas.

## Kategori utama
- image
- video
- audio
- document
- embed
- folder
- animation
- font
- other

## Format turunan
Contoh:
- image → jpg, jpeg, png, gif, webp, svg
- video → mp4, mov, webm
- audio → mp3, wav, m4a
- document → pdf, docx, pptx, txt
- animation → json, lottie
- font → woff, woff2, ttf, otf

Type dipakai untuk UX rendering. Format dipakai untuk validation dan metadata.

---

## 26) Source model

Asset di Lynknov harus mendukung lebih dari satu sumber.

## Source type minimal
- upload
- google_drive
- embed
- imported
- generated

## Implikasi sistem
- beberapa asset disimpan penuh di storage internal
- beberapa hanya linked reference
- beberapa punya sync status
- beberapa perlu metadata tambahan dari source eksternal

Maka jangan desain semua asset seolah-olah identik secara sumber.

---

## 27) Storage strategy konseptual

## Untuk asset upload internal
- file disimpan di storage Lynknov
- sistem membuat record asset
- buat thumbnail / preview bila relevan
- simpan metadata teknis

## Untuk Google Drive
Dua kemungkinan mode:

### Mode A — linked external asset
- simpan metadata dan reference URL
- file tidak disalin ke storage internal
- cocok untuk akses cepat dan source-aware flow

### Mode B — imported copy
- file di-copy ke storage internal
- asset menjadi milik penuh Lynknov workspace
- cocok untuk kestabilan dan independensi

Tahap awal bisa mulai dari salah satu. Secara MVP, paling realistis mulai dari linked atau simple import sesuai kemampuan implementasi.

## Untuk Embed
- simpan URL sumber
- simpan metadata preview
- asset tidak diperlakukan seperti upload biasa

---

## 28) Usage mapping architecture

Ini komponen sangat penting.

Tanpa usage mapping, sistem tidak bisa benar-benar disebut asset manager lintas fitur.

## Tujuan usage mapping
- tahu asset dipakai di mana
- tahu asset dipakai oleh siapa/fitur apa
- bisa memberi safe delete warning
- bisa menampilkan usage count
- bisa membantu replace impact

## Contoh relasi usage
- asset A dipakai di public page hero background
- asset A dipakai di portfolio project cover
- asset B dipakai di product thumbnail
- asset C dipakai di audio section

## Placement key contoh
- public_page.hero.background
- public_page.hero.avatar
- portfolio.project.cover
- commercial_hub.product.thumbnail
- marketing.banner.primary

Ini akan sangat membantu debugging dan product intelligence.

---

## 29) Folder architecture

Folder berguna untuk organisasi manual oleh user.

## Kebutuhan minimal
- create folder
- rename folder
- nested folder optional
- move asset to folder
- filter by folder

## Rekomendasi MVP
Mulai dari struktur yang sederhana:
- folder satu level atau dua level dulu
- jangan terlalu kompleks di awal

Yang lebih penting adalah asset bisa dicari dengan baik, bukan pohon folder super rumit.

---

## 30) Tag architecture

Tag memberi fleksibilitas lebih tinggi dibanding folder.

## Fungsi tag
- klasifikasi lintas folder
- memudahkan pencarian
- reusable organization system
- cocok untuk workflow lintas pillar

## Contoh tag
- hero
- cover
- product
- campaign
- branding
- intro
- portfolio
- testimonial

## UX note
Folder menjawab “disimpan di mana”.
Tag menjawab “digunakan untuk apa / termasuk konteks apa”.

---

## 31) Search architecture

Search asset tidak cukup hanya berdasarkan nama file.

## Search scope yang ideal
- file name
- tag
- format
- mime type
- folder name
- alt text
- caption
- source type
- linked entity label

## Filter synergy
Search harus bekerja bersamaan dengan:
- type filters
- usage filters
- tags
- date
- source

---

## 32) Validation rules

Karena Lynknov akan melayani banyak konteks, validation harus tegas.

## Contoh validation per asset
- file format allowed
- max file size
- dimension rules untuk image tertentu
- duration rules untuk audio/video tertentu
- duplicate name handling
- source connection validity

## Contoh contextual validation
- hero avatar lebih cocok image
- audio section hanya terima audio
- document attachment hanya format document tertentu
- product image bisa punya rasio rekomendasi

Validation ini bisa dibagi dua:
- system-level validation
- context-level validation

---

## 33) Action architecture

## Asset action minimal
- upload
- rename
- move
- tag
- duplicate
- archive
- delete
- replace
- copy reference
- view usage

## Folder action minimal
- create
- rename
- move contents
- delete

## Bulk action minimal
- bulk move
- bulk tag
- bulk archive
- bulk delete

---

## 34) State model yang harus dipikirkan

## Asset state
- ready
- processing
- failed
- archived
- deleted
- external_unavailable

## Source state
- connected
- disconnected
- needs_reauth
- syncing
- failed

## Usage state
- in_use
- unused
- unknown

State model ini penting untuk UI states yang kredibel.

---

## 35) Permissions and workspace model

Karena Lynknov adalah business OS, pikirkan sejak awal bahwa asset milik workspace, bukan sekadar milik satu screen.

## Konsep dasar
- asset terikat ke workspace
- usage terjadi di entity dalam workspace itu
- jika nanti ada role/team, sistem bisa diperluas ke permission model

Untuk MVP solo-founder mode, cukup mulai dari workspace ownership yang sederhana.

---

## 36) Event architecture yang berguna

Untuk sistem yang bisa berkembang, event tracking penting.

## Event yang layak dicatat
- asset_uploaded
- asset_renamed
- asset_moved
- asset_deleted
- asset_archived
- asset_selected
- asset_replaced
- asset_linked_to_entity
- asset_unlinked_from_entity
- source_connected
- source_imported

Ini membantu debugging, analytics, dan future intelligence.

---

## 37) Integration architecture — Google Drive

## MVP goal
User bisa:
- connect Google Drive
- browse or import asset
- pilih asset untuk dipakai

## Alur konseptual
1. User connect Google Drive account.
2. Sistem menyimpan auth/ref sederhana.
3. User membuka integration picker.
4. Browse file atau pilih file tertentu.
5. File di-link atau di-import.
6. Asset record dibuat di Asset Library.

## Hal yang perlu dipikirkan
- sync status
- broken reference handling
- auth expired state
- preview generation

---

## 38) Integration architecture — Embed

Embed tidak sama dengan upload.

## Data yang sebaiknya disimpan
- source URL
- title
- provider/domain
- thumbnail jika ada
- embed type
- preview metadata

## Use case
- external media
- linked presentations
- external audio/video
- future web embeds

Embed harus jelas dibedakan dari upload biasa di UI dan data model.

---

## 39) Reusable asset picker architecture

Asset Picker harus diperlakukan sebagai komponen platform-level.

## Input context
Picker menerima informasi konteks seperti:
- target entity type
- placement key
- allowed asset types
- multi select or single select
- source availability

## Output
- selected asset id(s)
- usage relation created/updated

## Kelebihan pendekatan ini
- editor tetap ringan
- portfolio bisa pakai komponen yang sama
- commercial hub bisa pakai komponen yang sama
- validation bisa disesuaikan per konteks

---

## 40) MVP architecture boundary

Agar eksekusi realistis, jangan membangun semua kemungkinan sekaligus.

## MVP yang direkomendasikan
Harus sudah mencakup:
- asset library page global
- upload file
- folder basic
- search basic
- filter type basic
- grid/list view
- rename
- move
- delete
- detail panel
- asset picker reusable
- usage mapping minimal
- replace flow untuk public page hero

## Post-MVP
Baru lanjut ke:
- Google Drive integration penuh
- embed flow matang
- bulk actions lengkap
- tags lengkap
- safe delete multi-entity advanced
- portfolio/commercial hub adoption penuh

---

## 41) Arsitektur final yang ingin dicapai

Pada akhirnya, Asset Library Lynknov harus berfungsi sebagai:

- **media infrastructure layer**
- **shared workspace library**
- **usage-aware asset system**
- **contextual media source untuk seluruh pillar**

Bukan sekadar tempat file ditumpuk.

---

# PART C — MASTER PROMPT EKSEKUSI CODING

## 42) Cara menggunakan prompt ini

Prompt di bawah ini dirancang untuk diberikan ke coding agent seperti Claude Code, Gemini, Codex, atau agent lain yang akan mengerjakan implementasi Asset Library Lynknov.

Prompt ini harus dipakai sebagai arahan utama agar:
- tidak salah positioning
- tidak membuat UI generik
- tidak membangun upload flow terpisah di tiap fitur
- tetap selaras dengan premium product direction Lynknov

---

## 43) Master Prompt

```md
You are helping build Lynknov, a premium dark-mode **Interactive Business OS**, not a generic link-in-bio tool and not a basic file uploader.

We are designing and implementing a new core system called **Asset Library**.

## Product context
Asset Library must NOT be treated as an editor-only upload feature.
It must be designed as a **global workspace-level system** that can be reused across:
- Public Page Editor
- Portfolio Showcase
- Commercial Hub
- Marketing-related modules
- future Lynknov pillars that need media/files

Inside the editor and other features, we should only expose **contextual asset access** such as:
- Asset Picker
- Quick Upload
- Recent Assets
- Google Drive / Embed access

The system must feel like part of a premium business operating system.

## Product decision
Implement Asset Library as:
1. A **global page in the main workspace/sidebar**
2. A reusable **Asset Picker** component for contextual usage
3. A shared data/logic layer for asset usage across features

## UX direction
The UI must feel:
- premium
- calm
- modern
- editorial
- business-class
- structured

Avoid:
- generic SaaS uploader feeling
- flat pure-black emptiness
- cluttered containers
- overly noisy UI
- duplicated upload flows per feature

## Naming direction
Sidebar label: **Asset**
Main page heading: **Asset Library**
Description: manage images, video, audio, documents, and connected sources across the Lynknov workspace.

## Main page layout
Build the page with this hierarchy:

### 1. Header identity area
Include:
- large premium heading
- supporting description
- stats summary (total assets, folders, storage used, in use)
- primary CTA(s): Upload File, New Folder

### 2. Main command toolbar
Include:
- Upload
- New Folder
- Integrations
- Search bar
- Grid/List toggle
- Sort control
- Bulk Select

### 3. Main workspace content
Use a 3-part layout:
- left filter rail
- center browser area
- right detail panel (visible when asset selected)

## Left filter rail
Include groups for:
- File type
- Usage status
- Date
- Tags
- Source

Prioritize visual clarity. Keep some groups collapsible.

## Browser area requirements
Support both:
- Grid view
- List view

Grid must NOT use one generic card for every file type.
Instead, create file-type-aware cards such as:
- image card
- video card
- audio card
- document card
- embed card
- folder card
- generic technical card

Each card should still fit into a unified premium grid system.

## Detail panel requirements
When an asset is selected, show a refined detail panel with:
- large preview
- overview metadata
- usage information
- folder/tags/organization
- source/integration info
- actions (rename, move, duplicate, replace, archive, delete)

Do not make it visually messy. Use hierarchy and spacing.

## Critical product requirement: usage-aware system
Asset Library must be built as a usage-aware system.
The system should be architected so each asset can later know where it is used, for example:
- public_page.hero.background
- public_page.hero.avatar
- portfolio.project.cover
- commercial_hub.product.thumbnail

Even if full advanced usage UI is not completed in the first pass, the architecture should be prepared for this.

## Core system capabilities
Design the implementation around these five capability areas:
1. Ingestion
2. Organization
3. Retrieval
4. Usage Mapping
5. Delivery / Integration

## MVP scope to implement now
Prioritize the following:
- global Asset Library page
- upload file flow
- create folder
- search (basic)
- file type filter (basic)
- grid/list toggle
- rename asset
- move asset
- delete asset
- right-side asset detail panel
- reusable Asset Picker modal/component
- minimal usage mapping readiness in architecture
- working replace flow for public page hero image

## Later-phase features (prepare structure, do not overbuild unless needed)
- Google Drive integration
- Embed flow
- tags system full version
- bulk actions full version
- safe delete warnings across multiple entities
- portfolio/commercial hub adoption

## Visual design direction
Use Lynknov’s premium dark aesthetic:
- dark graphite / charcoal surfaces
- subtle depth and gradients
- refined borders
- clean spacing
- premium typography hierarchy
- modern but not over-decorated

The page should feel like a “creative operations room” for media/assets.

## Technical architecture direction
Design around reusable components.
Recommended component split:
- AssetLibraryPageShell
- AssetLibraryHeader
- AssetLibraryToolbar
- AssetFilterPanel
- AssetGrid
- AssetList
- AssetCardImage
- AssetCardVideo
- AssetCardAudio
- AssetCardDocument
- AssetCardEmbed
- AssetCardFolder
- AssetDetailPanel
- AssetPickerModal
- RenameAssetDialog
- MoveAssetDialog
- SafeDeleteDialog

## Important implementation rule
Do NOT trap assets inside the Public Page Editor.
The Asset Library must be clearly positioned as a global workspace feature.
The editor should consume this system, not own it.

## Deliverables
Please produce:
1. the UI implementation structure
2. the component breakdown
3. the state flow / interaction flow
4. the data model assumptions
5. the implementation plan in phases
6. actual code implementation for the MVP scope

When writing the solution, make sure the result feels premium, scalable, and aligned with Lynknov as an Interactive Business OS.
```

---

## 44) Short execution prompt versi ringkas

Kalau butuh versi pendek untuk agent yang sudah paham konteks, gunakan ini:

```md
Build Lynknov’s Asset Library as a **global workspace-level system**, not an editor-only upload feature.

It must support reusable asset access across Public Page Editor, Portfolio, Commercial Hub, and future modules.

Create:
- a premium Asset Library page in the main sidebar
- a reusable Asset Picker component
- a scalable asset system architecture prepared for usage mapping

Page structure:
- premium header with stats and CTA
- toolbar with upload, folder, integrations, search, grid/list, sort, bulk select
- left filter rail
- center asset browser
- right asset detail panel

Support file-type-aware asset cards for image, video, audio, document, embed, folder, and technical assets.

Prioritize MVP:
- upload
- create folder
- search basic
- file type filter
- grid/list toggle
- rename
- move
- delete
- detail panel
- asset picker
- hero image replace flow

Use Lynknov’s premium dark graphite visual direction with calm depth, refined borders, strong hierarchy, and no generic SaaS feel.
```

---

## 45) Acceptance criteria untuk agent

Implementasi dianggap berhasil jika:
- Asset Library berada di level global workspace
- editor memakai sistem ini, bukan memiliki sistem terpisah
- layout halaman jelas: header, toolbar, filters, browser, detail panel
- card asset dibedakan per tipe file
- user bisa upload, rename, move, delete, dan browse asset dengan nyaman
- visual terasa premium dan tidak flat monoton
- komponen disusun reusable
- arsitektur siap berkembang ke usage mapping dan cross-pillar integration

---

## 46) Penutup

Dengan paket ini, Lynknov sekarang punya fondasi yang jauh lebih tajam untuk mengeksekusi Asset Library dengan benar.

Arah yang harus selalu dijaga adalah:

**Asset Library bukan fitur upload kecil di editor, melainkan salah satu infrastructure layer dari Lynknov sebagai Interactive Business OS.**

Kalau prinsip ini dijaga dari awal, maka implementasi fitur di public page, portfolio, commercial hub, dan modul lain akan jauh lebih konsisten, premium, dan scalable.


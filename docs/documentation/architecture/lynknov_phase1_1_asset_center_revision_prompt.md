# Lynknov — Phase 1.1 Asset Center Revision Prompt

## Deep diagnosis

### 1) Library kosong di picker Hero karena filter kategori terlalu ketat
`AssetPickerModal` memanggil `fetchAssets({ category: defaultCategory, search })`, lalu baru memfilter `allowedKinds` di client. Ini berarti jika Hero mengirim `defaultCategory="avatar"`, sementara upload baru masuk dengan `asset_category="other"`, hasil query akan kosong walaupun aset user sebenarnya ada.

### 2) Upload baru default ke kategori `other`
Di `AssetCenterPanel`, upload selalu memanggil `uploadAssetClient({ file, asset_category: "other" })`. Jadi aset yang baru diupload memang tidak akan lolos jika picker section menggunakan filter kategori default yang spesifik.

### 3) Tombol "Detail" memang belum punya handler
Pada `AssetCard`, tombol "Detail" dirender tetapi belum diberi `onClick`. Jadi wajar jika saat diklik tidak terjadi apa-apa.

### 4) Thumbnail dipotong karena `object-cover`
Baik `AssetCard` di panel utama maupun grid di `AssetPickerModal` menggunakan `object-cover`. Ini membuat portrait, landscape, atau banner terlihat kepotong. Untuk asset library, ini salah arah.

### 5) Search di modal picker belum reaktif
`AssetPickerModal` hanya memanggil `loadAssets()` saat modal dibuka / tab library aktif. Perubahan `search` hanya memanggil `setSearch`, dan fetch baru terjadi saat Enter.

### 6) Upload dan Embed di picker masih placeholder
Tab `upload` dan `embed` di `AssetPickerModal` masih placeholder. Jadi picker belum jadi sumber kerja lengkap.

### 7) Usage tracking fondasinya ada di schema, tapi flow create/update usage belum tampak lengkap
Schema `asset_usages` sudah ada, tapi implementasi yang dibagikan belum menunjukkan helper yang secara konsisten membuat / menghapus usage saat asset dipilih dari section. Jika ini belum dilakukan, delete warning bisa false negative.

### 8) Google Drive button baru visual, belum punya presence yang kuat
Di panel utama ada tombol Google Drive, tetapi secara visual masih plain text button dan belum terasa seperti integrasi yang benar-benar hidup.

---

## Objective revisi fase 1.1

Fase 1.1 bukan membuat fitur baru besar, tetapi memperbaiki kualitas fase 1 agar:
- library global dan picker section benar-benar sinkron
- asset card menjadi entity yang bisa dikelola
- preview asset tidak misleading
- UI naik kelas ke premium Lynknov
- area panel kiri yang kosong tidak terasa dummy
- terminology dan ikon lebih tepat

---

## Prioritas revisi

### Prioritas A — wajib diperbaiki
1. Sinkronisasi asset library global ↔ picker section
2. Detail/preview dialog untuk asset card
3. Thumbnail preview logic agar tidak crop agresif
4. Search picker yang lebih reaktif
5. Usage tracking yang benar saat asset dipilih dari section

### Prioritas B — sangat disarankan
6. Rename sidebar label `Media` menjadi `Aset`
7. Tambahkan icon Google Drive yang jelas
8. Rapikan / hapus panel kiri dummy “Media Panel Active”
9. Naikkan kualitas visual toolbar, card, header, empty state

### Prioritas C — jika aman
10. Quick assign action dari asset detail ke section tertentu
11. Better category suggestion, bukan hard restriction
12. Card variant untuk image / audio / embed / banner-ish preview

---

# MASTER PROMPT — REVISI FASE 1.1 ASSET CENTER LYNKNOV

Anda sedang bekerja di codebase Lynknov pada fitur Asset Center / Unggahan fase 1 yang sudah berjalan sebagian. Saya ingin Anda melakukan **revisi fase 1.1** dengan fokus pada sinkronisasi logic, kualitas UX, dan polish visual premium, tanpa merusak editor yang sudah ada.

## Konteks saat ini
Implementasi fase 1 sudah mencakup:
- schema SQL `asset_folders`, `user_assets`, `asset_usages`
- bucket `user-assets`
- `AssetCenterPanel`
- `AssetPickerModal`
- `SectionAssetField`
- upload image/audio
- backward compatibility via `...Url` + `...AssetId`

Namun ada masalah nyata yang ditemukan:

1. Aset yang diupload tampil di tab Unggahan, tetapi tidak tampil di picker section seperti Hero.
2. Tombol / interaksi detail asset belum berfungsi.
3. Thumbnail asset di library terpotong karena crop fixed.
4. UI sudah usable tetapi belum terasa premium Lynknov.
5. Sidebar label `Media` terasa kurang tepat.
6. Tombol Google Drive terasa masih mock.
7. Ada panel kiri “Media Panel Active” di mode seimbang yang tidak memberi nilai jelas.
8. Search dan refresh state di picker belum cukup sinkron.

## Tujuan revisi fase 1.1
Perbaiki dan poles implementasi yang ada agar:
- semua asset user otomatis tersedia di seluruh picker yang relevan
- category membantu filter, bukan membatasi visibility default
- asset card bisa dibuka detailnya
- asset preview library lebih representatif dan tidak crop agresif
- UI naik kelas ke premium, clean, elegant
- area dummy dibersihkan atau dimanfaatkan dengan benar
- usage tracking benar-benar hidup
- tidak ada perubahan destruktif ke preview/editor foundation

## Diagnosis logic yang harus Anda anggap benar
Akar masalah library kosong kemungkinan besar berasal dari kombinasi berikut:
- upload baru default `asset_category = "other"`
- picker section memanggil fetch dengan `category = defaultCategory`
- hasilnya asset valid tidak muncul jika kategori tidak match
- filtering category terlalu ketat dijadikan hard filter, padahal seharusnya hanya suggestion / recommendation

## Rules revisi yang wajib diikuti

### 1. Asset availability rule
Semua asset user yang valid harus otomatis tersedia di library global dan picker section, kecuali user memang memilih filter manual.

Jangan sembunyikan asset hanya karena:
- category tidak match defaultCategory
- category = other
- asset baru belum di-tag sesuai section

### 2. Category behavior
Category harus menjadi:
- recommendation
- default sorting/filter helper
- visual badge

Category **bukan** hard restriction default.

Untuk Hero misalnya:
- boleh prioritaskan asset kategori `avatar`
- tetapi tetap tampilkan semua image asset yang valid

### 3. Thumbnail behavior
Untuk asset library:
- jangan gunakan crop agresif sebagai default
- tampilkan bentuk asli asset semaksimal mungkin
- gunakan preview area yang menjaga komposisi library tetap rapi, tetapi image memakai pendekatan `object-contain` atau card preview logic yang setara
- portrait, landscape, square, banner harus tetap terbaca sebagai bentuk asli

### 4. Detail interaction
Setiap asset card harus punya interaksi nyata:
- klik card atau klik tombol Detail membuka `AssetDetailDialog` / preview dialog
- dialog menampilkan preview lebih besar + metadata + actions

Minimal metadata:
- nama
- tipe
- ukuran
- category
- source
- folder
- used in sections
- created/uploaded date bila tersedia

Minimal actions:
- Gunakan
- Rename
- Move to folder
- Delete

### 5. Usage tracking
Saat asset dipilih dari section:
- update `...AssetId`
- update `...Url` fallback/publicUrl
- create/update usage record di `asset_usages`
- jika asset diganti, usage lama dibersihkan atau diperbarui dengan aman

Delete warning harus membaca usage yang benar-benar akurat.

### 6. Picker sync
Pastikan setelah upload:
- asset store/query direfresh
- tab Unggahan update
- AssetPicker update
- Hero / Portfolio / Showcase picker melihat aset yang sama

Jangan biarkan global library dan contextual picker berjalan di data source yang terasa berbeda.

### 7. Search UX
Search di picker dan panel global harus lebih reaktif.
Jangan mengandalkan Enter sebagai satu-satunya cara refresh.
Gunakan debounced search atau trigger refresh yang lebih natural.

### 8. Visual direction
Naikkan quality visual tanpa membuat UI ramai.

Arah visual:
- premium
- dark
- elegant
- subtle glass/elevated surface
- stronger hierarchy
- tighter micro-interactions
- better empty state presence
- cards more polished
- toolbar more refined

Jangan jadikan tab ini seperti admin dashboard generik.

### 9. Terminology
Ganti label sidebar `Media` menjadi `Aset`, jika memang itu label fitur saat ini.

Pertahankan judul panel:
- `Unggahan`
atau
- `Asset Center`
pilih yang paling konsisten dengan codebase saat ini

### 10. Google Drive visual presence
Tambahkan icon Google Drive yang jelas di tombol dan bila perlu pada source badge asset.
Jangan biarkan tombol ini terasa seperti placeholder polos.

### 11. Empty side panel in balanced mode
Area kiri yang saat ini hanya menampilkan placeholder seperti “Media Panel Active” tidak boleh dibiarkan dummy.

Pilih salah satu:
- hapus sementara jika belum ada fungsi
- atau ubah menjadi panel yang berguna, misalnya:
  - quick filters
  - source filters
  - folders
  - categories
  - used / unused state

Jika belum ada isi yang bermakna, lebih baik hilangkan daripada membebani visual.

---

## Tugas implementasi yang saya inginkan

### Tahap 1 — Audit kode yang sudah ada
Tinjau file yang sudah dibuat untuk fase 1:
- AssetCenterPanel
- AssetPickerModal
- SectionAssetField
- asset center schema SQL
- client actions
- server actions
- validators
- type definitions

Jelaskan akar masalah berdasarkan kode nyata, bukan asumsi.

### Tahap 2 — Perbaiki sinkronisasi data
- pastikan picker tidak hard-filter category secara salah
- pastikan upload baru tersedia di semua picker
- pastikan revalidation / refresh berjalan benar
- pastikan allowedKinds tetap bekerja, tetapi category tidak menyembunyikan semua asset

### Tahap 3 — Asset detail layer
Bangun detail dialog atau preview dialog untuk asset card.
Hubungkan tombol “Detail” yang saat ini belum berfungsi.

### Tahap 4 — Thumbnail & layout improvement
Perbaiki preview logic:
- no aggressive crop for library thumbnails
- better preview container for portrait/landscape/banner
- jaga grid tetap rapi dan premium

### Tahap 5 — Usage tracking completion
Lengkapi flow usage:
- create usage on select
- update usage on replace
- cleanup usage when needed
- delete warning membaca data nyata

### Tahap 6 — Visual premium polish
Polish:
- header
- toolbar
- cards
- empty state
- hover states
- button hierarchy
- Google Drive icon
- sidebar naming

### Tahap 7 — Balanced mode cleanup
Audit area panel kiri yang kosong / dummy.
Hilangkan atau ubah jadi berguna.

---

## File yang kemungkinan perlu disentuh
Silakan sesuaikan dengan codebase, tetapi sangat mungkin melibatkan:
- `src/components/editor/assets/AssetCenterPanel.tsx`
- `src/components/editor/assets/AssetPickerModal.tsx`
- `src/components/editor/assets/SectionAssetField.tsx`
- komponen baru seperti:
  - `AssetDetailDialog.tsx`
  - `AssetUsageBadge.tsx`
  - `AssetSourceBadge.tsx`
- helpers / queries / actions terkait assets
- hero editor / section integration
- state sync / revalidation flow
- sidebar label / icon config untuk menu editor

---

## Acceptance criteria revisi fase 1.1

Revisi dianggap berhasil jika:
1. Asset yang diupload dari tab Unggahan otomatis muncul juga di picker Hero/section lain yang relevan.
2. Picker tidak kosong hanya karena category default tidak match.
3. Asset card bisa dibuka detailnya.
4. Thumbnail library tidak lagi crop agresif dan lebih representatif untuk portrait/landscape/banner.
5. Search lebih reaktif.
6. Delete warning membaca usage yang nyata.
7. UI terasa lebih premium dan refined.
8. Label sidebar lebih tepat (`Aset` bila diubah).
9. Tombol Google Drive lebih meyakinkan secara visual.
10. Panel kiri dummy di balanced mode sudah dihapus atau dimanfaatkan dengan jelas.
11. Live preview tetap aman.
12. Lint, typecheck, dan build pass.

---

## Output yang saya inginkan setelah implementasi
Berikan:
1. ringkasan akar masalah berdasarkan kode
2. daftar file yang diubah/dibuat
3. penjelasan keputusan logic penting
4. langkah test manual
5. known limitations
6. catatan apa yang sengaja ditunda ke fase 1.2 / 2.0

Kerjakan seperti senior product engineer yang sangat peduli pada:
- kualitas UX editor premium
- sinkronisasi state yang rapi
- integrasi Next.js + Supabase yang aman
- backward compatibility
- maintainability codebase

Jangan lakukan refactor destruktif yang tidak perlu.

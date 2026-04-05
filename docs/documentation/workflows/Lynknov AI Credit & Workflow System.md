# Lynknov AI Credit & Workflow System

## Tujuan Sistem

Membangun workflow AI yang:

* menjaga progres Lynknov tetap jalan walau model tertentu limit
* menekan pemborosan AI credits
* memastikan Gemini 3.1 Pro hanya dipakai untuk pekerjaan dengan nilai paling tinggi
* membuat hasil lintas tools tetap konsisten, premium, dan terarah

---

## 1. Prinsip Dasar Operasional

### A. Jangan pakai model terbaik untuk semua hal

Model terbaik dipakai hanya untuk:

* keputusan arsitektur
* debugging kompleks lintas file
* refactor sensitif UI/UX
* audit akhir sebelum merge

### B. Semua task harus masuk kategori

Sebelum mulai, setiap task wajib dipetakan ke salah satu level:

* **L1 — Ringan**: copy, rename, checklist, struktur dokumen, tiny fixes
* **L2 — Menengah**: implement komponen kecil, styling section tunggal, wiring props, perbaikan state sederhana
* **L3 — Berat**: live preview sync, responsive scaling, editor architecture, database integration, multi-file refactor

### C. Satu sesi = satu objective jelas

Jangan buka sesi dengan target terlalu besar seperti “rapihin editor semuanya”.
Target harus berbentuk output tunggal, misalnya:

* fix overflow nama pada mobile preview
* sinkronkan verified badge ke preview
* rapikan layout focus edit mode

### D. Pisahkan thinking dan execution

Jangan langsung minta model menganalisis + mendesain + ngoding + polish sekaligus.
Selalu pecah:

1. analisis
2. rencana aksi
3. eksekusi
4. validasi

---

## 2. Routing Model yang Direkomendasikan

## A. Gemini 3.1 Pro / model reasoning utama

Gunakan hanya untuk:

* root cause bug yang sulit dilacak
* refactor besar pada editor
* validasi struktur state/data flow
* keputusan UX yang berdampak ke banyak komponen
* audit final hasil kerja model lain

**Contoh tugas:**

* mengubah arsitektur live preview agar seluruh device mockup diskalakan sebagai satu canvas
* menyelaraskan editor state dengan public page renderer
* memperbaiki type mismatch yang menjalar lintas komponen

## B. Model menengah / alternatif

Gunakan untuk:

* implement komponen yang sudah jelas spesifikasinya
* styling polishing ringan
* penulisan util helper
* perbaikan props, spacing, text hierarchy
* merapikan file tanpa mengubah arsitektur utama

**Contoh tugas:**

* membuat verified badge pada identity block
* memperbaiki font scaling nama panjang di preview
* merapikan header editor agar lebih premium

## C. ChatGPT sebagai command center

Gunakan untuk:

* memecah problem menjadi task-task kecil
* membuat prompt yang presisi untuk tiap tool
* quality control hasil dari agent lain
* menyusun prioritas kerja harian
* menyatukan keputusan produk, UX, copy, dan engineering

---

## 3. Sistem Prioritas Tugas Lynknov

### Tier A — Harus pakai model terbaik

Pekerjaan yang kalau salah akan merusak fondasi:

* editor layout architecture
* preview responsivitas multi-device
* sinkronisasi editor dengan halaman publik
* auth/integration logic yang sensitif
* data mapping Supabase ke public page

### Tier B — Boleh pakai model menengah

Pekerjaan yang berdampak sedang:

* section-specific UI
* setting form improvements
* panel collapse/expand behavior
* fine tuning spacing dan hierarchy
* small component extraction

### Tier C — Jangan boros pakai model terbaik

Pekerjaan yang bisa murah:

* dokumentasi
* copy placeholder
* penamaan menu
* TODO list
* acceptance criteria
* test checklist manual
* commit message
* PR summary

---

## 4. Workflow Harian yang Efisien

## Mode 1 — Planning Session

Dipakai di awal hari atau awal sprint kecil.

### Step 1

Tulis objective utama hari ini dalam 1 kalimat.

Contoh:

> Hari ini fokus menyelesaikan live preview editor agar akurat di mobile, tablet, dan desktop tanpa cropping.

### Step 2

Turunkan jadi 3 output maksimal.

Contoh:

* device frame tidak terpotong
* isi preview sinkron dengan halaman publik
* desktop mode tidak terlalu mendominasi workspace

### Step 3

Kelompokkan mana yang L1, L2, L3.

### Step 4

Tentukan model per task sebelum mulai.

---

## Mode 2 — Execution Session

### Formula session ideal

1. **Brief singkat**
2. **File scope terbatas**
3. **Output yang diminta jelas**
4. **Larangan eksplisit**
5. **Checklist validasi**

### Template prompt execution

```text
Konteks:
Saya sedang membangun editor Lynknov di Next.js untuk smart bio interactive page.

Tujuan task:
[isi 1 tujuan spesifik]

File yang relevan:
- [file 1]
- [file 2]
- [file 3]

Yang harus dicapai:
- [hasil 1]
- [hasil 2]
- [hasil 3]

Batasan:
- jangan ubah arsitektur di luar scope ini
- jangan ubah copy section lain
- jangan bikin dummy baru jika data real sudah ada

Output yang saya mau:
1. analisis singkat akar masalah
2. rencana perbaikan paling aman
3. patch kode final
4. checklist verifikasi manual
```

---

## Mode 3 — Validation Session

Setelah model memberi solusi, jangan langsung percaya.

### Checklist validasi wajib

* apakah scope-nya melebar?
* apakah ada file lain ikut rusak?
* apakah solusi menambah kompleksitas tak perlu?
* apakah preview mobile/tablet/desktop tetap aman?
* apakah hasilnya sinkron dengan aesthetic premium Lynknov?
* apakah linter, typecheck, build aman?

### Standard validation command

```bash
npm run lint
npx tsc --noEmit
npm run build
```

---

## 5. Sistem Hemat Credits

## A. Rule 1 — Jangan kirim repo terlalu luas

Selalu batasi file context.

**Salah:**

* “cek semua project editor saya”

**Benar:**

* “fokus ke `src/app/editor/page.tsx`, `editor-preview.tsx`, dan `editor-workspace-panel.tsx` untuk memperbaiki scaling desktop preview”

## B. Rule 2 — Gunakan 2-pass prompting

### Pass 1: diagnosis only

Tujuan: cari akar masalah, belum ngoding.

### Pass 2: implementation only

Tujuan: eksekusi berdasarkan rencana yang sudah disetujui.

Ini jauh lebih hemat daripada 1 prompt besar yang campur semua.

## C. Rule 3 — Simpan master context tetap

Buat master context Lynknov agar tidak ulang dari nol.

### Isi master context

* positioning Lynknov
* aesthetic premium dark Apple-like
* bahasa utama Indonesia
* prinsip editor: left structure, center workspace, right live preview
* public page harus jadi source of truth preview
* jangan berantakin fitur yang sudah rapi

## D. Rule 4 — Gunakan checkpoint review

Pakai Gemini 3.1 Pro hanya pada titik ini:

* sebelum refactor besar dimulai
* setelah implementasi model lain selesai
* ketika ada bug yang berulang dan tidak ketemu akarnya
* sebelum merge fitur penting

## E. Rule 5 — Maksimalkan reusable prompt block

Simpan blok prompt yang bisa ditempel ulang.

---

## 6. Sistem Fallback Saat Limit

## Kondisi A — Gemini Pro limit, tapi masih ada model lain

Lakukan ini:

1. hentikan task L3 sementara
2. lanjutkan task L1 dan L2
3. siapkan dokumentasi, acceptance criteria, dan breakdown task
4. rapikan file structure, naming, placeholder, dan issue list
5. kumpulkan bug evidence untuk dibawa ke Gemini Pro saat reset

## Kondisi B — Semua tool lagi limit

Lakukan offline progress:

* review screenshot hasil terakhir
* tulis daftar masalah prioritas
* siapkan prompt final super presisi
* buat urutan eksekusi besok
* rapikan docs/project board
* tandai file mana yang akan disentuh dan mana yang tidak boleh disentuh

## Kondisi C — Hanya Gemini CLI yang bisa jalan pakai API key

Gunakan untuk:

* diagnosis scoped task
* patch kecil-menengah
* audit file spesifik
* menyusun refactor plan

Jangan gunakan untuk eksperimen liar multi-file tanpa batas.

---

## 7. Operating System Mingguan

## Senin–Kamis: Build Window

Fokus pada implementasi inti.

* pagi: planning + task breakdown
* siang: execution task berat
* sore: validasi + cleanup

## Jumat: Stabilization Window

* lint
* typecheck
* build
* UI audit
* docs update
* changelog internal

## Saat kuota mepet

Geser ke mode:

* documentation
* planning
* QA checklist
* component inventory
* prompt preparation

---

## 8. Struktur Kerja per Task

Setiap task harus punya kartu kerja seperti ini:

### Nama task

Contoh: Fix mobile preview identity overflow

### Tujuan

Nama panjang, handle, dan verified badge harus muat dengan baik di mobile preview tanpa cropping.

### Level

L2 atau L3

### Model ideal

Gemini 3.1 Pro atau model menengah

### File scope

* `editor-preview.tsx`
* `public-profile-renderer.tsx`
* `profile-header.tsx`

### Jangan disentuh

* sistem section ordering
* styling dashboard global
* auth flow

### Definition of done

* nama panjang tetap terbaca
* verified badge muncul
* layout identity tetap premium
* mobile preview tidak overflow

---

## 9. Template Prompt Master

## A. Prompt diagnosis

```text
Saya sedang membangun Lynknov, platform Interactive Business OS dengan aesthetic premium dark mode ala Apple. Saya butuh diagnosis scoped, bukan refactor liar.

Task yang sedang dianalisis:
[isi task]

File scope:
- [file]
- [file]

Tolong lakukan:
1. identifikasi akar masalah paling mungkin
2. jelaskan file mana yang seharusnya jadi source of truth
3. beri rencana perbaikan paling aman dengan perubahan sekecil mungkin

Jangan langsung menulis ulang seluruh struktur kecuali benar-benar diperlukan.
```

## B. Prompt implementation

```text
Lanjutkan ke implementasi berdasarkan diagnosis tadi.

Target hasil:
- [hasil 1]
- [hasil 2]

Batasan:
- perubahan seminimal mungkin
- pertahankan aesthetic premium Lynknov
- jangan ubah flow lain di luar task ini

Berikan:
1. patch kode final
2. penjelasan singkat perubahan
3. checklist pengujian manual
```

## C. Prompt review hasil agent lain

```text
Tolong audit solusi ini sebelum saya terapkan.
Fokus pada:
- apakah scope-nya terlalu melebar
- apakah ada risiko merusak layout/editor lain
- apakah pendekatannya terlalu kompleks
- apakah ada cara yang lebih stabil dan hemat perubahan

Konteks produk tetap Lynknov: premium, clean, scalable, editor harus sinkron dengan public page.
```

---

## 10. Sistem Budget Credits

## A. Batas penggunaan harian

Bagi penggunaan jadi 3 bucket:

* **Critical**: 40% budget
* **Important**: 40% budget
* **Support**: 20% budget

### Critical

Untuk task L3 yang memblok progres inti.

### Important

Untuk polishing yang berdampak langsung.

### Support

Untuk dokumentasi, prompting, audit ringan.

## B. Hard rule penggunaan credits

Jangan pakai credits premium kalau:

* task bisa dijelaskan dalam checklist sederhana
* task hanya rename/copy/styling ringan
* masalah belum dipersempit file scope-nya
* kamu belum punya screenshot atau error yang jelas

## C. Trigger kapan boleh pakai paid credits

Boleh pakai kalau 3 kondisi ini terpenuhi:

1. task benar-benar memblok roadmap inti
2. task sudah dipersempit dengan file dan output jelas
3. model alternatif sudah tidak memadai

---

## 11. Alur Praktis untuk Kondisi Kamu Sekarang

### Fase sekarang

Kamu sedang membangun fondasi editor Lynknov dan bottleneck terbesar ada di:

* live preview accuracy
* responsive device scaling
* sinkronisasi dengan public page real
* struktur editing yang rapi dan premium

### Maka alur terbaik sekarang:

#### Track 1 — Pakai model terbaik

Khusus untuk:

* arsitektur preview
* sinkronisasi data editor ke public page
* responsive logic multi-device

#### Track 2 — Pakai model menengah

Khusus untuk:

* verified badge
* text overflow
* spacing panel
* header UI polish
* sidebar cleanup

#### Track 3 — Pakai ChatGPT

Khusus untuk:

* memecah task
* menyusun prompt akurat
* QC hasil model lain
* menyusun sistem kerja dan prioritas sprint

---

## 12. SOP Sebelum Membeli 2500 AI Credits

Sebelum beli, cek dulu:

* apakah task berat sudah dipisahkan dari task ringan?
* apakah prompt sudah scoped?
* apakah kamu punya master context tetap?
* apakah kamu masih sering pakai model terbaik untuk kerja kecil?
* apakah hasil model lain gagal karena modelnya, atau karena prompt/file scope belum presisi?

Kalau 5 poin ini sudah rapi dan kamu tetap mentok, barulah pembelian credits masuk akal.

---

## 13. Rekomendasi Final

Untuk Lynknov, sistem idealnya bukan “selalu pakai model terbaik”, tapi:

* **pakai model terbaik hanya saat nilainya paling besar**
* **pakai model menengah untuk throughput**
* **pakai ChatGPT sebagai orchestration layer**
* **simpan semua task dalam format scoped, kecil, dan bisa divalidasi**

Dengan sistem ini, kamu bukan cuma lebih hemat credits, tapi juga lebih kecil kemungkinan mengacaukan fitur yang sudah rapi.

## 14. Sistem Operasional Harian Khusus Lynknov Editor

Bagian ini adalah versi praktikal yang langsung bisa dipakai untuk kondisi Lynknov sekarang, terutama saat workflow terganggu karena limit model.

### Objective utama fase sekarang

Fokus bukan membangun fitur baru sebanyak mungkin, tetapi memastikan fondasi editor stabil, akurat, dan nyaman dipakai user.

### 4 prioritas inti saat ini

1. Live preview harus benar-benar sinkron dengan halaman publik
2. Device preview mobile, tablet, dan desktop harus proporsional tanpa cropping
3. Workspace editor harus terasa lega, premium, dan tidak berantakan
4. Komponen editing per section harus jelas, scoped, dan mudah dikembangkan

---

## 15. Pembagian Track Kerja Harian

## Track A — Core Architecture Track

Ini adalah pekerjaan paling sensitif. Jangan dikerjakan oleh model murah kalau belum ada spesifikasi yang jelas.

### Fokus Track A

* preview renderer dan source of truth
* scaling device frame
* layout mode: fokus edit, seimbang, fokus preview
* sinkronisasi state editor ke public page
* struktur section editor

### Model ideal

* Gemini 3.1 Pro / model reasoning utama
* atau model terbaik lain hanya untuk audit dan patch inti

### Contoh task Track A

* memastikan preview memakai public page renderer, bukan dummy renderer
* memastikan seluruh badan mockup diskalakan sebagai satu canvas
* memastikan mode desktop preview tidak memakan ruang berlebihan

---

## Track B — UX Polish Track

Ini penting, tapi tidak harus selalu memakai model termahal.

### Fokus Track B

* verified badge
* text overflow
* hierarchy font
* spacing panel
* premium treatment pada header, sidebar, panel
* state tombol dan interaksi kecil

### Model ideal

* model menengah
* atau Gemini CLI jika task sudah scoped dan jelas

### Contoh task Track B

* nama panjang masuk rapi ke preview tanpa terpotong
* badge verified muncul pada identity row
* panel kiri dan kanan punya collapse logic yang stabil

---

## Track C — Support & Documentation Track

Ini jangan buang credits mahal.

### Fokus Track C

* blueprint section
* acceptance criteria
* test checklist
* prompt generation
* docs internal
* changelog internal
* issue breakdown

### Model ideal

* ChatGPT
* model ringan

---

## 16. Rencana Kerja Harian Saat Model Lagi Limit

## Mode Darurat: Saat Gemini Pro, Windsurf, atau Anti Gravity sedang mentok

Walau task coding berat tertahan, progres tetap bisa jalan.

### Yang dikerjakan sekarang

#### A. Kumpulkan bug evidence

Setiap bug harus punya:

* screenshot
* gejala spesifik
* device mode terdampak
* file yang paling mungkin terlibat
* expected result
* current broken behavior

#### B. Ubah semua masalah jadi tiket scoped

Format tiket:

* nama masalah
* akar masalah dugaan awal
* file scope
* definition of done
* larangan perubahan di luar scope

#### C. Siapkan prompt final sebelum reset model

Jadi saat reset datang, kamu tidak habis waktu untuk mikir ulang dari nol.

#### D. Kerjakan task pendukung

* breakdown komponen per section
* mapping state editor
* test plan manual
* dokumentasi arsitektur editor
* urutan prioritas bug

---

## 17. Urutan Prioritas Pengerjaan Lynknov Editor

Berikut urutan terbaik agar workflow tidak acak dan tidak boros:

### Priority 1 — Source of Truth Preview

Pertanyaan utamanya:
Apakah live preview benar-benar mengambil renderer dan data yang sama dengan public page?

Kalau belum, ini harus jadi prioritas paling atas.

### Priority 2 — Device Scaling Stability

Setelah source of truth jelas, baru bereskan:

* mobile frame
* tablet frame
* desktop/web frame
* scaling agar seluruh mockup aman

### Priority 3 — Layout Balance Editor

Setelah preview stabil, baru rapikan proporsi:

* ruang tengah lebih lega
* preview tidak mendominasi
* collapse panel bekerja baik
* mode fokus edit / seimbang / preview berjalan nyata

### Priority 4 — Identity Block Quality

Baru setelah itu benahi detail yang langsung terlihat user:

* verified badge
* nama panjang
* handle
* ukuran font adaptif
* alignment premium

### Priority 5 — Section Editing System

Setelah fondasi stabil, baru masuk ke:

* konten
* tampilan
* pengaturan
  per section secara sistematis

---

## 18. Sistem Sprint Kecil 1 Hari

Setiap hari cukup ambil maksimum 3 task:

* 1 task berat
* 1 task menengah
* 1 task pendukung

### Contoh komposisi ideal

#### Task Berat

Perbaiki sinkronisasi renderer live preview dengan public page renderer

#### Task Menengah

Perbaiki overflow nama panjang dan tampilkan verified badge

#### Task Pendukung

Buat checklist komponen editor section Hero: Konten, Tampilan, Pengaturan

Dengan pola ini, kamu tetap bergerak tanpa bikin konteks terlalu lebar.

---

## 19. Template Board Kerja Harian

Gunakan format ini setiap mau mulai kerja:

### Fokus hari ini

[1 kalimat objective]

### 3 output yang harus jadi

* [output 1]
* [output 2]
* [output 3]

### Task list

#### Task 1

* Nama:
* Level: L1 / L2 / L3
* Model:
* File scope:
* Done jika:

#### Task 2

* Nama:
* Level: L1 / L2 / L3
* Model:
* File scope:
* Done jika:

#### Task 3

* Nama:
* Level: L1 / L2 / L3
* Model:
* File scope:
* Done jika:

### Jangan disentuh hari ini

* [batasan 1]
* [batasan 2]

### Validasi akhir

* lint
* typecheck
* build
* cek mobile
* cek tablet
* cek desktop

---

## 20. Rencana Operasional untuk Kondisi Kamu Sekarang

Melihat konteks Lynknov saat ini, berikut pembagian kerja paling efisien.

## Yang sebaiknya dikerjakan malam ini

Fokus ke task yang bisa dipersiapkan atau dieksekusi dengan scope kecil.

### Task malam ini 1

**Audit source of truth preview**

Tujuan:
Pastikan apakah preview editor sudah memakai renderer yang sama dengan halaman publik.

Output:

* daftar file source of truth
* file mana yang masih dummy
* titik integrasi yang salah

Model ideal:

* ChatGPT untuk breakdown
* Gemini CLI atau model lain untuk audit scoped jika perlu

### Task malam ini 2

**Buat daftar bug prioritas live preview**

Isi daftar:

* verified badge belum muncul
* nama panjang overflow / terpotong
* layout mobile belum presisi
* desktop preview terlalu dominan
* mode tombol belum aktif penuh jika masih ada issue

Model ideal:

* ChatGPT

### Task malam ini 3

**Siapkan prompt implementasi untuk besok setelah reset**

Jadi besok kamu tinggal tembak prompt yang sudah matang, bukan improvisasi lagi.

---

## Yang sebaiknya dikerjakan besok setelah reset model

### Task berat pertama

**Perbaiki source of truth live preview**

Kenapa ini nomor satu:
Karena kalau preview masih dummy atau tidak sinkron, semua polish lain jadi mubazir.

### Task berat kedua

**Stabilkan device scaling di mobile/tablet/desktop**

Kenapa ini nomor dua:
Karena setelah renderer benar, user harus bisa melihat hasilnya dalam frame yang akurat.

### Task menengah ketiga

**Benahi identity block**

* verified badge
* nama panjang
* handle
* font scaling

### Task menengah keempat

**Rapikan balance layout workspace vs preview**

---

## 21. Prompt Siap Copas untuk Besok

## Prompt 1 — Audit source of truth preview

```text
Saya sedang membangun editor Lynknov di Next.js. Saya ingin memastikan live preview di editor benar-benar memakai renderer dan struktur data yang sama dengan halaman publik smart bio, bukan dummy yang terpisah.

Fokus file:
- src/app/editor/page.tsx
- src/components/editor/editor-preview.tsx
- file renderer public page yang dipakai untuk halaman profil publik

Tolong bantu:
1. identifikasi source of truth untuk public page renderer
2. cek apakah editor-preview masih memakai renderer/data mockup terpisah
3. jelaskan titik mismatch arsitektur jika ada
4. beri rencana integrasi paling aman dengan perubahan minimal

Batasan:
- jangan refactor liar seluruh editor
- jangan ubah section lain di luar scope preview
- pertahankan struktur yang sudah stabil jika masih bisa dipakai

Output yang saya mau:
- diagnosis singkat
- file yang harus disentuh
- urutan perubahan paling aman
- checklist verifikasi manual
```

## Prompt 2 — Implementasi scaling device preview

```text
Lanjutkan dengan implementasi scoped untuk menstabilkan live preview Lynknov di mode mobile, tablet, dan desktop.

Tujuan:
- seluruh frame perangkat terlihat utuh
- tidak ada cropping pada bagian atas/bawah perangkat
- desktop preview tidak mendominasi ruang editor
- seluruh badan mockup diskalakan sebagai satu canvas, bukan isi layar saja

Fokus file:
- src/components/editor/editor-preview.tsx
- file layout editor yang mengatur lebar panel

Batasan:
- jangan ubah source of truth data preview
- jangan sentuh styling section public page di luar kebutuhan preview
- perubahan seminimal mungkin tapi stabil

Berikan:
1. patch kode final
2. penjelasan singkat pendekatan
3. checklist tes manual untuk mobile, tablet, desktop
```

## Prompt 3 — Implementasi identity block polish

```text
Saya ingin merapikan identity block pada live preview Lynknov agar sesuai dengan referensi demo dan tetap muat rapi di mobile.

Target:
- verified badge muncul
- nama panjang tidak overflow atau terpotong jadi ellipsis berlebihan
- ukuran font adaptif agar tetap muat
- komposisi nama, handle, dan badge terasa premium

Fokus file:
- komponen identity/profile header pada preview
- editor-preview jika ada wrapper yang memengaruhi lebar

Batasan:
- jangan mengubah arsitektur section lain
- jangan menambah elemen visual yang tidak perlu
- pertahankan gaya premium, clean, dark

Berikan:
1. akar masalah
2. implementasi final
3. checklist pengecekan di mobile preview
```

## Prompt 4 — Balance layout editor

```text
Saya ingin merapikan balance layout editor Lynknov.

Masalah saat ini:
- panel tengah terasa sempit
- live preview kadang terlalu dominan, terutama di desktop mode
- saya ingin mode fokus edit, seimbang, dan fokus preview benar-benar terasa perbedaannya

Fokus file:
- src/app/editor/page.tsx
- file komponen layout panel editor

Target hasil:
- mode fokus edit memberi ruang terbesar ke workspace tengah
- mode seimbang tetap nyaman dibaca
- mode fokus preview memaksimalkan preview tanpa merusak frame
- collapse panel kiri/kanan tetap konsisten

Batasan:
- jangan ubah logic preview renderer
- jangan ubah sistem section content

Output:
1. analisis struktur layout saat ini
2. pendekatan paling aman
3. patch kode
4. checklist validasi visual
```

---

## 22. Sistem Anti-Boros Saat Sudah Beli Credits

Kalau nanti kamu jadi beli 2500 AI credits, pakai aturan keras ini:

### Aturan 1

Jangan pernah mulai dari prompt kabur.

### Aturan 2

Setiap prompt harus punya file scope.

### Aturan 3

Satu prompt hanya untuk satu objective utama.

### Aturan 4

Untuk task berat, selalu lakukan:

* diagnosis dulu
* implementasi kedua

### Aturan 5

Setelah 2–3 prompt tidak beres, stop dulu dan evaluasi arsitektur.
Jangan terus buang credits dengan mengulang prompt yang sama.

### Aturan 6

Gunakan paid credits hanya untuk blocker roadmap inti.
Bukan untuk copywriting, rename, atau polish ringan.

---

## 23. Checklist Eksekusi Harian Singkat

Sebelum mulai sesi:

* objective hari ini jelas
* task maksimal 3
* file scope jelas
* model per task jelas
* definition of done jelas

Saat eksekusi:

* jangan melebar ke task lain
* jangan kirim terlalu banyak file
* simpan output penting
* validasi setelah setiap patch besar

Sebelum selesai:

* lint
* typecheck
* build
* screenshot hasil
* catat bug sisa
* siapkan prompt sesi berikutnya

---

## 24. Peran ChatGPT dalam Sistem Ini

Agar workflow paling efisien, ChatGPT dipakai sebagai:

* pemecah task besar jadi task kecil
* penulis prompt siap copas
* reviewer hasil model lain
* penjaga konsistensi visi produk Lynknov
* quality control sebelum implementasi final

Artinya, kamu tidak harus selalu melempar semua kerja ke model coding. Banyak pemborosan terjadi justru karena task belum dipecah dengan benar.

---

## 25. Rekomendasi Langkah Berikutnya

Langkah terbaik setelah dokumen ini:

1. gunakan board kerja harian untuk sesi berikutnya
2. malam ini fokus audit dan persiapan prompt
3. besok mulai dari source of truth preview
4. lanjut ke device scaling
5. baru polish identity block dan layout balance

Urutan ini menjaga Lynknov berkembang dengan fondasi yang lebih stabil, tanpa membuang credits untuk perbaikan kosmetik yang nantinya harus diulang lagi.


Sudah saya lanjutkan dan saya tambahkan versi **operasional harian khusus Lynknov editor** di canvas.

Yang saya tambahkan sekarang isinya lebih praktis:

* pembagian **Track A, B, C**
* urutan prioritas pengerjaan editor
* sistem kerja saat semua model lagi limit
* rencana **malam ini** vs **besok setelah reset**
* 4 prompt siap copas untuk:

  * audit source of truth preview
  * implementasi scaling device
  * polish identity block
  * balance layout editor
* aturan anti-boros kalau nanti jadi beli 2500 credits

Kalau diringkas, alur terbaik buat kamu sekarang adalah:

**Malam ini**

* audit source of truth preview
* rapikan daftar bug prioritas
* siapkan prompt final untuk besok

**Besok setelah reset**

* fix source of truth preview dulu
* lanjut stabilkan scaling mobile/tablet/desktop
* baru bereskan verified badge + nama panjang
* terakhir rapikan balance layout workspace vs preview

Ini penting, karena kalau preview masih belum benar secara fondasi, polish lain bakal gampang kebongkar lagi.

Kalau kamu mau, langkah berikutnya yang paling enak adalah saya bantu bikin **3 tiket kerja konkret untuk sesi besok**, formatnya langsung siap kamu pakai satu per satu di Gemini CLI / Windsurf / Anti Gravity.

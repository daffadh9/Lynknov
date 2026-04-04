# Hero Section Blueprint

## 1. Tujuan Section

Hero adalah section pertama dan paling menentukan first impression halaman publik Lynknov.

Section ini harus mampu:

* menjelaskan siapa user secara cepat
* memperlihatkan value utama atau positioning user
* memberi arah tindakan yang jelas lewat CTA
* membangun kesan visual premium sejak detik pertama

Hero bukan sekadar banner pembuka. Hero adalah **anchor identitas utama** dari halaman profesional user.

---

## 2. Peran Hero dalam Sistem Halaman

Dalam struktur Interactive Profile OS, Hero berfungsi sebagai:

1. **identity layer** → memperkenalkan user
2. **positioning layer** → menjelaskan value atau fokus utamanya
3. **conversion layer** → mengarahkan visitor ke aksi penting
4. **visual hook layer** → membuat halaman terasa hidup dan premium

Jadi Hero harus seimbang antara branding, clarity, dan conversion.

---

## 3. User Value

Bagi pemilik halaman, Hero memberi manfaat:

* tampil lebih profesional
* terlihat lebih jelas bidang dan fokusnya
* punya pembuka halaman yang kuat
* mempermudah visitor memahami siapa dirinya
* meningkatkan peluang klik CTA utama

Bagi visitor, Hero memberi manfaat:

* cepat paham ini halaman siapa
* tahu value utama yang ditawarkan
* tahu aksi apa yang bisa dilakukan selanjutnya

---

## 4. Prinsip Desain Hero Lynknov

Hero Lynknov harus mengikuti prinsip ini:

### 4.1 Strong first impression

Begitu halaman dibuka, user harus terlihat punya arah, bukan sekadar punya profil.

### 4.2 Premium but clear

Tampilan harus terasa premium, tetapi isi tetap mudah dipahami dalam beberapa detik.

### 4.3 Flexible identity expression

Hero harus bisa dipakai oleh berbagai tipe user:

* founder
* freelancer
* creator
* consultant
* designer
* developer
* agency owner
* professional personal brand

### 4.4 CTA-led

Hero harus membantu konversi, bukan hanya estetika.

### 4.5 Mobile-first but scalable

Struktur Hero harus enak di mobile, lalu tetap kuat saat dibuka di tablet dan desktop.

---

## 5. Struktur Konten Hero

Secara konseptual, Hero terdiri dari beberapa lapisan konten.

### 5.1 Top Badge / Eyebrow

Elemen kecil di atas heading utama.
Contoh:

* Open to Work
* Product Designer & Builder
* Founder of Lynknov
* Available for Collaboration

Fungsi:

* memberi konteks cepat
* menambah rasa aktif dan hidup

### 5.2 Primary Identity

Bagian identitas utama.
Contoh:

* nama
* role utama
* headline besar

Ini adalah inti pembuka section.

### 5.3 Supporting Description

Paragraf singkat yang menjelaskan fokus, kemampuan, atau nilai utama user.

Harus singkat, jelas, dan terasa profesional.

### 5.4 Primary CTA

Tombol aksi utama.
Contoh:

* Hubungi Saya
* Lihat Portfolio
* Booking Call
* Lihat Project

### 5.5 Secondary CTA

Aksi pendamping jika dibutuhkan.
Contoh:

* Download CV
* Jelajahi Karya
* Lihat Layanan

### 5.6 Trust / Micro Proof

Elemen validasi singkat.
Contoh:

* Dipercaya 20+ klien
* 5 tahun pengalaman
* Worked with startups & brands
* Available globally

### 5.7 Visual Identity Block

Area visual yang memperkuat identitas.
Bisa berupa:

* avatar utama
* portrait card
* framed visual card
* layered identity card

---

## 6. Content Model

Hero sebaiknya punya model data yang konsisten seperti ini:

```ts
{
  id: string,
  type: "hero",
  label: string,
  isVisible: boolean,
  content: {
    eyebrow: string,
    role: string,
    headline: string,
    description: string,
    primaryCta: {
      label: string,
      href: string,
      openInNewTab: boolean,
    },
    secondaryCta: {
      label: string,
      href: string,
      openInNewTab: boolean,
    },
    proofText: string,
    name: string,
    avatar: string,
    statusLabel: string,
  },
  style: {
    layout: string,
    emphasis: string,
    textAlign: string,
    cardStyle: string,
    surfaceStyle: string,
    avatarStyle: string,
  },
  settings: {
    showEyebrow: boolean,
    showRole: boolean,
    showDescription: boolean,
    showPrimaryCta: boolean,
    showSecondaryCta: boolean,
    showProof: boolean,
    showAvatar: boolean,
    showStatus: boolean,
  }
}
```

Struktur ini cukup kuat untuk MVP, tapi masih aman untuk dikembangkan nanti.

---

## 7. Editable Fields di Editor

Untuk fase MVP, field edit Hero harus dipilih yang benar-benar penting.

### 7.1 Konten

Field utama yang bisa diedit:

* Eyebrow / badge text
* Role / profesi
* Headline utama
* Deskripsi singkat
* Nama
* Primary CTA label
* Primary CTA link
* Secondary CTA label
* Secondary CTA link
* Proof text
* Status label
* Avatar utama

### 7.2 Tampilan

Field visual yang bisa diedit:

* Layout hero
* Alignment teks
* Posisi visual card
* Style tombol
* Style kartu/avatar
* Surface emphasis
* Spacing density

### 7.3 Pengaturan

Field behavior yang bisa diubah:

* tampilkan/sembunyikan badge
* tampilkan/sembunyikan secondary CTA
* tampilkan/sembunyikan proof text
* tampilkan/sembunyikan avatar
* link dibuka di tab baru atau tidak

---

## 8. Tab Editor Hero

Hero wajib mengikuti pola 3 tab utama.

## 8.1 Tab Konten

Berisi kontrol untuk isi utama Hero.

Urutan ideal group:

### Group A — Identitas Utama

* Nama
* Role / profesi
* Headline
* Deskripsi

### Group B — Badge & Status

* Eyebrow / badge text
* Status label
* toggle tampilkan badge
* toggle tampilkan status

### Group C — CTA

* Primary CTA label
* Primary CTA link
* Secondary CTA label
* Secondary CTA link
* toggle tampilkan secondary CTA

### Group D — Trust / Proof

* Proof text
* toggle tampilkan proof

### Group E — Media

* Upload avatar utama
* ganti avatar
* hapus avatar

---

## 8.2 Tab Tampilan

Berisi kontrol visual.

Group yang ideal:

### Group A — Layout

* layout preset
* alignment teks
* posisi visual block

### Group B — Surface Style

* style container
* tingkat kontras permukaan
* border emphasis

### Group C — Avatar Card Style

* portrait rounded
* soft card
* framed card
* minimal clean card

### Group D — CTA Style

* solid primary
* outline secondary
* pill radius level

### Group E — Spacing

* compact
* balanced
* spacious

---

## 8.3 Tab Pengaturan

Berisi logic dan perilaku.

Group yang ideal:

### Group A — Visibility

* tampilkan avatar
* tampilkan role
* tampilkan description
* tampilkan proof
* tampilkan status badge

### Group B — Link Behavior

* open CTA in new tab
* prioritas CTA utama

### Group C — Section Behavior

* section anchor id
* internal label
* visibility on page

---

## 9. Layout Preset yang Disarankan

Untuk MVP, jangan terlalu banyak preset. Cukup 3 yang paling berguna.

### 9.1 Split Classic

Teks di kiri, visual di kanan.
Cocok untuk mayoritas user.

### 9.2 Center Focus

Semua fokus ke tengah, visual lebih minimal.
Cocok untuk personal brand yang ingin clean dan editorial.

### 9.3 Card Emphasis

Teks dan visual sama-sama terasa seperti komposisi kartu premium.
Cocok untuk user yang ingin kesan lebih modern dan standout.

Default terbaik untuk Lynknov saat ini: **Split Classic**.

---

## 10. Preview Rules

Hero preview di editor harus mengikuti aturan berikut:

### 10.1 Preview harus real-time

Perubahan headline, deskripsi, avatar, CTA, dan proof harus langsung terlihat.

### 10.2 Preview harus pakai rendering section sungguhan

Bukan mockup dummy yang hanya menyerupai.

### 10.3 Device behavior harus masuk akal

* Mobile: stack vertikal, fokus readability
* Tablet: mulai terasa komposisi 2 area
* Desktop: layout lebih lega, tapi tidak berantakan

### 10.4 Area penting tidak boleh terpotong

Avatar, headline, CTA utama, dan proof harus tetap terlihat secara wajar.

---

## 11. Validation Rules

Agar hasil user tetap bagus, Hero perlu guardrails.

### 11.1 Headline

* ideal: 30–80 karakter
* terlalu panjang harus diberi warning ringan

### 11.2 Description

* ideal: 80–180 karakter
* jika terlalu panjang, beri helper agar tetap ringkas

### 11.3 CTA Label

* ideal: 2–4 kata
* terlalu panjang bisa merusak tombol

### 11.4 Avatar

* rekomendasi minimal 400x400
* format JPG/PNG/WebP

### 11.5 Proof Text

* ideal satu baris singkat
* hindari paragraf panjang

---

## 12. Empty State Rules

Saat Hero belum diisi, editor harus tetap membantu user.

Contoh arahan:

* Tambahkan headline utama untuk menjelaskan value Anda
* Upload avatar untuk memperkuat first impression
* Tambahkan CTA agar visitor tahu langkah berikutnya

Preview juga sebaiknya tetap menampilkan placeholder yang rapi, bukan kosong rusak.

---

## 13. Komponen Reusable yang Dibutuhkan

Agar Hero efisien dibangun, komponen berikut sebaiknya reusable.

* SectionHeader
* ControlGroup
* TextField
* TextareaField
* ToggleField
* LinkField
* CTAEditorRow
* ImageUploader
* ImagePreviewCard
* SegmentedLayoutPicker
* AlignmentSelector
* SurfaceStyleSelector
* VisibilitySwitchList

Komponen-komponen ini nanti bisa dipakai ulang di section lain.

---

## 14. Scope MVP

Yang masuk Hero MVP:

* 1 avatar utama
* 1 headline utama
* 1 role/profesi
* 1 deskripsi singkat
* 2 CTA maksimal
* 1 proof text
* badge kecil opsional
* status kecil opsional
* 3 preset layout
* kontrol visibility dasar

Yang belum perlu di MVP:

* background hero super kompleks
* multiple visual layers rumit
* animated text builder advanced
* video background
* metrics counter dinamis
* AI auto-generate hero copy di dalam editor

---

## 15. Future Expansion

Nanti Hero bisa dikembangkan ke fitur berikut:

* multiple CTA styles advanced
* animated badge
* dynamic trust chips
* service tags
* social proof cards
* mini stats
* background accent controls
* AI rewrite headline & description
* smart role suggestion
* personal branding presets

Namun semua itu sebaiknya masuk setelah fondasi Hero MVP stabil.

---

## 16. UX Prioritas Hero untuk Lynknov

Kalau disederhanakan, prioritas UX Hero adalah:

1. user mudah mengisi identitas inti
2. hasil visual cepat terlihat premium
3. CTA mudah dipahami dan mudah diklik
4. avatar dan teks tidak saling bertabrakan
5. mobile tetap enak dilihat
6. editor tidak terasa ramai

Ini penting agar Hero benar-benar menjadi pola terbaik untuk section berikutnya.

---

## 17. Rekomendasi Implementasi

Urutan implementasi paling ideal:

### Step 1

Bangun schema data Hero.

### Step 2

Bangun preview Hero berbasis render section asli.

### Step 3

Bangun tab Konten dengan field inti.

### Step 4

Bangun tab Tampilan dengan 3 preset layout.

### Step 5

Bangun tab Pengaturan dengan visibility logic.

### Step 6

Tambahkan validation ringan dan empty states.

Dengan urutan ini, Hero cepat usable tanpa harus menunggu sistem terlalu kompleks.

---

## 18. Ringkasan Inti

Hero adalah section pertama yang harus paling siap karena ia menjadi:

* wajah utama halaman
* penjelas identitas user
* pengarah aksi utama
* pembuka visual premium

Untuk Lynknov MVP, Hero harus dibuat **jelas, premium, fleksibel, dan conversion-oriented**, tetapi tetap cukup sederhana agar cepat dibangun dan mudah dipakai user.

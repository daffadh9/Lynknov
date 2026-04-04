# EDITOR MASTER PROMPT — HERO SECTION IMPLEMENTATION

## 1. Konteks

Anda sedang mengerjakan sistem editor Lynknov, yaitu editor untuk membangun halaman publik profesional dalam produk **Interactive Business OS**.

Saat ini fondasi konseptual yang sudah ditetapkan adalah:

* editor harus berbasis **component system**, bukan kumpulan form acak
* editor terdiri dari **3 panel utama**: structure/tools, editing workspace, live preview
* setiap section harus mengikuti pola data yang konsisten: `content`, `style`, `settings`
* setiap section harus memiliki pola tab yang sama: **Konten**, **Tampilan**, **Pengaturan**
* preview harus merepresentasikan section sungguhan, bukan dummy mockup terpisah
* UX editor harus premium, rapi, ringan, dan mudah dipahami user awam

Fokus implementasi saat ini adalah **Hero Section** sebagai section pertama dan paling penting.

---

## 2. Objective Utama

Bangun implementasi **Hero Section Editor** yang:

* usable untuk fase MVP
* konsisten dengan blueprint editor Lynknov
* sinkron dengan live preview
* terasa premium secara visual
* tidak terlalu ramai secara layout
* mudah dijadikan pola untuk section-section berikutnya

Tujuan akhirnya bukan sekadar menambah field input, tetapi membangun **standar implementasi section pertama** yang nantinya bisa direplikasi ke About, Digital Presence, Showcase, dan section lain.

---

## 3. Hasil yang Harus Dicapai

Implementasi harus menghasilkan:

1. **Schema data Hero** yang rapi dan scalable
2. **Workspace editor Hero** dengan 3 tab:

   * Konten
   * Tampilan
   * Pengaturan
3. **Live preview Hero** yang benar-benar memakai render section asli
4. **Visibility logic** yang konsisten
5. **Validation ringan** untuk field penting
6. **UI editor premium** dengan hierarki visual yang jelas
7. **Reusable components** yang bisa dipakai section lain

---

## 4. Prinsip Wajib

### 4.1 System-first

Jangan membuat Hero sebagai implementasi yang berdiri sendiri secara liar. Hero harus dibangun sebagai pola awal untuk section system.

### 4.2 Content / Style / Settings separation

Pastikan data Hero dipisah jelas menjadi:

* `content`
* `style`
* `settings`

### 4.3 Real preview

Live preview harus merender Hero section aktual, bukan contoh visual palsu.

### 4.4 Premium clarity

UI editor harus terasa premium namun tidak padat, tidak berisik, dan tidak tenggelam di background gelap.

### 4.5 Lean MVP

Prioritaskan fitur yang benar-benar dibutuhkan untuk Hero MVP. Hindari overengineering.

---

## 5. Scope Implementasi Hero MVP

Fitur yang WAJIB masuk:

### Konten

* eyebrow / badge text
* name
* role
* headline
* description
* primary CTA label
* primary CTA link
* secondary CTA label
* secondary CTA link
* proof text
* status label
* avatar upload / select

### Tampilan

* 3 layout preset:

  * Split Classic
  * Center Focus
  * Card Emphasis
* text alignment
* visual card style
* CTA style sederhana
* spacing density sederhana

### Pengaturan

* show/hide eyebrow
* show/hide role
* show/hide description
* show/hide primary CTA
* show/hide secondary CTA
* show/hide proof
* show/hide avatar
* show/hide status
* open link in new tab

Yang BELUM perlu:

* background animation builder
* advanced motion controls
* video background
* multi-layer decorative builder
* AI copy generator
* metrics counter dinamis

---

## 6. Hero Data Schema yang Diharapkan

Gunakan atau adaptasi struktur seperti ini:

```ts
export type HeroSection = {
  id: string;
  type: "hero";
  label: string;
  isVisible: boolean;
  content: {
    eyebrow: string;
    name: string;
    role: string;
    headline: string;
    description: string;
    proofText: string;
    statusLabel: string;
    avatar: string;
    primaryCta: {
      label: string;
      href: string;
      openInNewTab: boolean;
    };
    secondaryCta: {
      label: string;
      href: string;
      openInNewTab: boolean;
    };
  };
  style: {
    layout: "split-classic" | "center-focus" | "card-emphasis";
    textAlign: "left" | "center";
    cardStyle: "soft" | "framed" | "minimal";
    ctaStyle: "default" | "pill" | "subtle";
    spacing: "compact" | "balanced" | "spacious";
    surfaceStyle: "default" | "elevated" | "muted";
  };
  settings: {
    showEyebrow: boolean;
    showRole: boolean;
    showDescription: boolean;
    showPrimaryCta: boolean;
    showSecondaryCta: boolean;
    showProof: boolean;
    showAvatar: boolean;
    showStatus: boolean;
  };
};
```

Jika di codebase sudah ada struktur serupa, sesuaikan tanpa merusak konsistensi global.

---

## 7. Struktur UI Workspace yang Diharapkan

Bangun panel tengah Hero dengan struktur seperti ini:

### Tab 1 — Konten

Group ideal:

* **Identitas Utama**

  * Nama
  * Role
  * Headline
  * Deskripsi
* **Badge & Status**

  * Eyebrow text
  * Status label
  * toggle tampilkan badge
  * toggle tampilkan status
* **CTA**

  * Primary CTA label
  * Primary CTA link
  * Secondary CTA label
  * Secondary CTA link
* **Trust / Proof**

  * Proof text
* **Media**

  * Avatar upload / picker / preview

### Tab 2 — Tampilan

Group ideal:

* **Layout**

  * preset selector
  * alignment selector
* **Visual Style**

  * card style
  * surface style
* **CTA Style**

  * style sederhana untuk tombol
* **Spacing**

  * compact / balanced / spacious

### Tab 3 — Pengaturan

Group ideal:

* **Visibility**

  * tampilkan / sembunyikan elemen
* **Link Behavior**

  * open in new tab
* **Section Settings**

  * internal label bila memang sudah didukung
  * visible on page

---

## 8. Live Preview Rules

Implementasi preview wajib mengikuti ini:

1. perubahan field harus langsung terlihat
2. preview harus menggunakan komponen Hero yang sama dengan public page
3. tampilan Mobile / Tablet / Desktop harus tetap masuk akal
4. area penting tidak boleh hilang atau terpotong
5. preview tidak boleh terasa seperti dummy placeholder terpisah

Jika perlu, refactor rendering agar editor preview mengambil komponen yang sama dari halaman publik.

---

## 9. UX & Visual Direction

Gaya visual editor yang diinginkan:

* dark premium
* tidak flat hitam pekat mentah
* surface bertingkat jelas
* border halus
* spacing lega
* hierarchy typography jelas
* state aktif terlihat, tapi tidak terlalu ramai
* kontrol tidak ditumpuk dalam terlalu banyak nested box

Workspace tengah harus terasa paling penting.
Preview penting, tetapi tidak boleh lebih dominan dari area kerja.

Gunakan istilah UI Bahasa Indonesia yang natural, misalnya:

* Konten
* Tampilan
* Pengaturan
* Struktur Halaman
* Simpan
* Tersimpan
* Menyimpan...

---

## 10. Validation Rules yang Perlu Ditambahkan

Tambahkan validation ringan dan helper text:

* headline ideal 30–80 karakter
* description ideal 80–180 karakter
* CTA label ideal 2–4 kata
* proof text ideal 1 baris singkat
* avatar minimal rekomendasi 400x400

Validation jangan terasa menghakimi. Gunakan helper yang membimbing.

---

## 11. Empty State Rules

Saat field belum terisi:

* tampilkan placeholder yang tetap rapi di preview
* tampilkan helper text yang membimbing di editor

Contoh:

* Tambahkan headline utama untuk menjelaskan value Anda
* Upload avatar untuk memperkuat first impression
* Tambahkan CTA agar visitor tahu langkah berikutnya

---

## 12. Reusable Components yang Sebaiknya Dibangun

Bila belum ada, bangun komponen reusable seperti:

* `SectionHeader`
* `ControlGroup`
* `TextField`
* `TextareaField`
* `ToggleField`
* `LinkField`
* `SegmentedSelector`
* `ImageUploader`
* `ImagePreviewCard`
* `VisibilitySwitchList`
* `HeroLayoutPresetPicker`

Komponen ini harus dibuat dengan mindset reuse untuk section berikutnya.

---

## 13. Urutan Eksekusi yang Disarankan

Kerjakan dengan urutan berikut:

### Step 1

Audit struktur Hero yang sudah ada di codebase.

### Step 2

Rapikan / bentuk schema Hero agar sesuai standar.

### Step 3

Bangun atau refactor komponen render Hero agar bisa dipakai bersama oleh public page dan live preview.

### Step 4

Bangun workspace tab **Konten** dulu sampai usable.

### Step 5

Bangun tab **Tampilan** dengan 3 preset layout.

### Step 6

Bangun tab **Pengaturan** untuk visibility dan link behavior.

### Step 7

Tambahkan validation dan empty states.

### Step 8

Polish visual hierarchy, spacing, dan interaction states.

---

## 14. Output Akhir yang Saya Harapkan dari Anda

Berikan hasil dalam format berikut:

1. **Ringkasan perubahan**
2. **Daftar file yang dibuat / diubah**
3. **Penjelasan logic implementasi**
4. **Hal yang masih perlu ditingkatkan**
5. **Jika ada, potensi refactor lanjutan**

Jika ada ketidaksesuaian antara struktur codebase saat ini dengan blueprint di atas, ambil keputusan yang paling masuk akal tetapi tetap menjaga arah sistem editor Lynknov.

---

## 15. Instruksi Penting

* jangan buat UI terlalu ramai
* jangan membuat preview palsu
* jangan membuat Hero jadi implementasi sekali pakai
* jangan overengineering fitur non-MVP
* prioritaskan hasil yang usable, premium, dan scalable

Fokus utamanya adalah: **membangun Hero Section sebagai standar implementasi pertama untuk Editor Lynknov**.

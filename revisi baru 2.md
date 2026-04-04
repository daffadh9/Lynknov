Iya, sekarang sudah kelihatan akar masalahnya dari codingan langsung.

Masalah utamanya ternyata **bukan cuma scaling**. Ada **2 akar masalah besar**:

## 1. Preview kamu masih “container scaled”, bukan “real viewport simulated”

Di `EditorPreview`, kamu memang sudah bikin `ResizeObserver` dan hitung `previewScale` berdasarkan `mockupWidth/mockupHeight`. Itu bagus. Tapi isi preview tetap dirender langsung lewat:

```tsx
<ProfileRenderer profile={profile} />
```

di dalam `<div style={{ width: currentDevice.viewportWidth, ... }}>` saja. Artinya kamu hanya mengecilkan **wadah visualnya**, tapi **CSS responsive dari halaman publik tetap membaca viewport browser asli**, bukan viewport device preview. Jadi di layar desktop, komponen dalam `ProfileRenderer` tetap bisa memakai perilaku desktop/tablet walaupun dibungkus dalam kotak mobile. Itu yang bikin hasil live preview masih terasa tidak benar-benar responsif dan bisa kelihatan kepotong / melar / tidak proporsional. 

Itu juga cocok dengan gejala di screenshot kamu:

* frame mobile kelihatan ada
* tapi isi hero di dalamnya tidak terasa benar-benar “mode mobile asli”
* elemen bisa seperti terdorong, terpotong, atau skala teks/komposisinya aneh

### Kenapa ini terjadi?

Karena:

* **width container ≠ viewport browser**
* Tailwind breakpoint `sm md lg xl` membaca **window / media query**, bukan lebar parent div
* jadi preview mobile di panel kanan **tidak otomatis menjadi mobile layout sungguhan**

### Solusi paling tepat

Ada 2 opsi:

**Opsi terbaik untuk akurasi:** pakai `iframe` untuk preview.
Karena iframe punya viewport sendiri, jadi halaman publik benar-benar dirender sebagai mobile/tablet/desktop sungguhan.

**Opsi menengah:** refactor `ProfileRenderer` dan section-section publik supaya lebih mengandalkan:

* fluid layout
* `w-full`, `min-w-0`
* flex/grid adaptif
* kurangi ketergantungan pada breakpoint global
* tambah container query bila perlu

Untuk kasus Lynknov editor, saya jujur lebih saran:
**preview panel kanan = iframe**
karena kamu memang sedang mensimulasikan device sungguhan, bukan cuma kartu komponen. 

---

## 2. Layout width logic di `EditorPage` masih semi-hardcoded

Di `EditorPage`, ada beberapa logic yang bikin pembagian ruang preview tidak stabil:

* `previewWidth` default dikunci ke `460`
* `finalPreviewWidth` di mode balanced cuma `Math.min(previewWidth, MAX_PREVIEW_WIDTH)`
* saat resize, `currentSidebar` malah dihardcode jadi `352` kalau mode balanced
* `focus-preview` pakai `window.innerWidth - RAIL_WIDTH`, bukan ukuran area nyata yang tersedia di layout editor 

Ini bikin sistem preview kamu **terlihat responsif**, tapi sebenarnya **tidak benar-benar dihitung dari layout yang sedang aktif**.

Contoh masalah konkretnya:

```ts
const currentSidebar = layoutMode === "balanced" ? 352 : RAIL_WIDTH;
```

Padahal sidebar aslinya dihitung dari:

```ts
const finalSidebarWidth = isSidebarVisible ? RAIL_WIDTH + sidebarWidth : RAIL_WIDTH;
```

Jadi saat user ubah lebar sidebar, logic resize preview masih pakai angka lama `352`, bukan width riil. Akibatnya:

* drag resize preview bisa meleset
* editor tengah bisa terasa terlalu sempit / terlalu lebar
* preview width terasa tidak konsisten 

---

# Diagnosis tambahan dari `EditorPreview`

Ada beberapa detail yang ikut memperparah:

## A. `previewScale` dihitung dari ukuran mockup, tapi desktop base ditaruh di luar frame

Untuk desktop, kamu render “desktop base” di luar frame utama:

```tsx
{device === "desktop" && (
  <div className="shrink-0 w-[96%] h-4 ..."/>
)}
```

Tapi `motion.div` tetap memakai:

```ts
height: currentDevice.mockupHeight
```

Artinya tinggi visual riil desktop bisa lebih besar dari tinggi yang dipakai untuk kalkulasi scale. Ini berpotensi bikin desktop preview sedikit tidak akurat secara vertikal. 

## B. `viewportHeight` dicampur dengan pengurangan manual status bar

Kamu punya preset:

```ts
viewportHeight: 844
```

lalu saat render:

```ts
height: device === 'desktop' ? currentDevice.viewportHeight - 44 : currentDevice.viewportHeight - 40
```

Ini bikin definisi `viewportHeight` jadi ambigu:

* apakah itu tinggi layar murni?
* atau tinggi total area konten + bar?

Sebaiknya jangan campur. Pisahkan saja:

* `frameWidth`
* `frameHeight`
* `screenWidth`
* `screenHeight`
* `topBarHeight`
* `baseHeight` khusus desktop

Biar scale dan layout jauh lebih konsisten. 

---

# Jadi akar masalah intinya apa?

Kalau saya kerucutkan:

**Akar masalah utama:**
live preview kamu masih merender `ProfileRenderer` langsung di dalam container biasa, sehingga **responsive behavior halaman publik belum benar-benar disimulasikan sebagai viewport device nyata**.

**Akar masalah kedua:**
sistem pembagian lebar panel editor-preview di `EditorPage` masih memakai beberapa angka hardcoded, jadi ukuran preview panel tidak selalu sinkron dengan layout nyata.

---

# Solusi yang saya rekomendasikan

## Solusi terbaik: ubah preview jadi iframe

Struktur ideal:

* panel kanan tetap punya toolbar device
* di dalam stage, render `iframe`
* ubah ukuran iframe sesuai preset mobile/tablet/desktop
* seluruh iframe dibungkus device frame lalu di-scale

Contoh arah implementasi:

```tsx
const DEVICE_PRESETS = {
  mobile: { width: 390, height: 844, frameWidth: 430, frameHeight: 920 },
  tablet: { width: 820, height: 1180, frameWidth: 880, frameHeight: 1240 },
  desktop: { width: 1440, height: 900, frameWidth: 1480, frameHeight: 1020 },
};
```

Lalu isi viewport:

```tsx
<iframe
  src={`/preview?device=${device}`}
  style={{
    width: currentDevice.width,
    height: currentDevice.height,
    border: "none",
    display: "block",
  }}
/>
```

Kalau ingin preview real-time dari state editor, ada 2 jalan:

* simpan draft ke store / query param / local state sync
* atau gunakan preview route khusus yang membaca draft editor sementara

Ini akan langsung menyelesaikan masalah “container kecil tapi layout masih desktop”.

---

## Solusi kedua: rapikan width logic di `EditorPage`

Bagian ini harus dibenerin:

### Jangan hardcode sidebar jadi 352

Ganti:

```ts
const currentSidebar = layoutMode === "balanced" ? 352 : RAIL_WIDTH;
```

menjadi:

```ts
const currentSidebar = layoutMode === "balanced"
  ? RAIL_WIDTH + sidebarWidth
  : RAIL_WIDTH;
```

Karena saat ini resize preview masih pakai asumsi sidebar lama. 

### Jangan pakai `window.innerWidth` untuk hitung focus preview

Ganti logika yang berbasis `window.innerWidth` ke ukuran container layout nyata.
Lebih bagus pakai `ResizeObserver` juga di level `EditorPage`, lalu hitung available width dari area bawah topbar.

---

## Solusi ketiga: pisahkan dimensi frame vs dimensi layar

Preset kamu sekarang masih terlalu campur. Bikin seperti ini:

```ts
const DEVICE_PRESETS = {
  mobile: {
    screenWidth: 390,
    screenHeight: 844,
    shellWidth: 430,
    shellHeight: 920,
    topInset: 40,
    bottomInset: 36,
    borderRadius: 48,
  },
  ...
}
```

Jadi jangan lagi pakai:

* `viewportHeight` lalu dikurangi `40/44`
* base desktop di luar kalkulasi

Semua tinggi final harus eksplisit.

---

# Prioritas perbaikannya

Kalau mau efisien, urutannya begini:

### Prioritas 1

Pindahkan live preview ke **iframe-based viewport simulation**.

### Prioritas 2

Benahi `EditorPage`:

* hapus angka `352`
* hitung preview width dari layout nyata
* jangan bergantung ke `window.innerWidth` untuk pembagian panel

### Prioritas 3

Rapikan device preset:

* screen vs shell dipisah
* topbar/statusbar/base dihitung eksplisit

---

# Kesimpulan paling jujur

Dari kode yang kamu kasih, saya cukup yakin:

**Masalah terbesar bukan pada animasi atau scale formula, tapi karena preview kanan belum menjadi viewport device sungguhan.**
Selama `ProfileRenderer` hanya dimasukkan ke dalam div biasa, hasilnya akan terus terasa “hampir benar tapi belum benar”, terutama untuk mode mobile/tablet. 

Kalau kamu mau, next saya bisa langsung bantu buatkan:
**patch kode konkret untuk refactor `EditorPreview` ke mode iframe + perbaikan `EditorPage`**, jadi tinggal kamu lempar ke Gemini/Codex/Claude.

# Blueprint Spesifikasi UI/UX: Lynknov Professional Public Profile Page

## 1. DESIGN DIRECTION SUMMARY

**Konsep Utama: "The Digital Stage" (Panggung Identitas Digital)**
Filosofi desain halaman profil publik Lynknov bukan tentang "menyediakan tautan", melainkan **"membangun persepsi"**. Ini adalah panggung digital tempat seorang profesional mempresentasikan *value*, identitas, dan kapabilitas mereka dengan otoritas penuh.

*   **Emotional Tone:** Confident (Penuh Percaya Diri), Exclusive, Elegant, namun tetap Approachable (Mudah Dihubungi).
*   **Visual Personality:** Premium, bold, cinematic, editorial, dan sangat *spacious*. Kita meminjam estetika dari majalah digital premium, *high-end agency portfolios*, dan *luxury brand presentations*.
*   **Mengapa ini tepat untuk Lynknov?** Lynknov memposisikan dirinya sebagai *business OS*. Pengguna Lynknov adalah profesional bernilai tinggi (founder, konsultan, desainer elit). Mereka tidak butuh halaman untuk mengemis klik; mereka butuh halaman yang memancarkan *trust* dan membenarkan *rate* (harga) mereka yang tinggi.
*   **Diferensiasi:** *Bio tools* biasa berteriak "Klik link saya!". Lynknov Profile Page berbisik "Ini adalah siapa saya, dan ini standar kerja saya." Kita menukar kepadatan informasi dengan *white space* (ruang lega) dan hierarki visual yang masif.

---

## 2. PAGE STRUCTURE AND SECTION HIERARCHY

Struktur halaman tidak boleh terasa seperti tumpukan *cards* yang repetitif. Harus ada ritme: *Loud (Hero) -> Intimate (About) -> Structured (Services) -> Visual (Highlights) -> Direct (CTA).*

**1. Hero Identity Section (The Anchor)**
*   **Tujuan:** Memberikan *first impression* yang kuat dan tak terlupakan dalam 2 detik pertama.
*   **Visual:** Layout asimetris atau *split-screen* halus. *Avatar* bukan lingkaran kecil, melainkan *portrait* berkualitas tinggi (berbentuk *rounded rectangle* besar atau *edge-to-edge* di satu sisi).
*   **Vibe:** Sangat dominan, tipografi masif (*display size*), *cinematic entrance*.

**2. About / Personal Narrative (The Connection)**
*   **Tujuan:** Memanusiakan profesional tersebut.
*   **Visual:** Layout editorial. Teks besar, margin lebar. Bukan paragraf kecil yang rapat. Terasa seperti kutipan wawancara eksklusif di majalah.

**3. Professional Focus / Services (The Value)**
*   **Tujuan:** Menjawab dengan cepat "Apa yang bisa Anda lakukan untuk saya?"
*   **Visual:** *Bento-grid* yang terstruktur rapi atau *large horizontal cards*. Fokus pada ikonografi presisi dan tipografi kontras tinggi. Tidak ada *bullet points* generik.

**4. Selected Highlights (The Teaser)**
*   **Tujuan:** Bukti visual tanpa membebani halaman (karena *full portfolio* adalah fitur terpisah).
*   **Visual:** *Image-first cards*. Area visual harus mengambil 70% dari *card*, dengan judul dan *one-line context* yang sangat minimalis di bawahnya.

**5. Contact / Final CTA (The Conversion)**
*   **Tujuan:** Mengarahkan *visitor* untuk bertindak.
*   **Visual:** *Full-width block* dengan warna *background* yang sedikit kontras (atau terbalik) dari keseluruhan halaman. Tombol CTA masif dan *confident*.

---

## 3. COMPONENT SYSTEM AND UI BLOCKS

Sistem komponen harus dirancang dengan presisi milimeter. Tidak ada elemen "bawaan framework" yang tidak di-*styling*.

*   **Primary CTA Button:** Besar, tebal, *padding* horizontal ekstra lega (misal: `px-8 py-4`). Tidak menggunakan *border-radius* bulat penuh (*pill*), melainkan *rounded-xl* atau *rounded-2xl* untuk kesan modern-arsitektural. Font *semibold*, *letter-spacing* sedikit rapat.
*   **Iconography:** Konsisten, menggunakan *line-icons* dengan ketebalan 1.5px (misal: Lucide atau Phosphor). Minimalis, tidak ada ikon warna-warni (kecuali logo brand sosial media yang sangat di-*mute*).
*   **Avatar/Visual Container:** Jika tidak menggunakan foto *full-bleed*, gunakan kontainer dengan *subtle inner shadow* dan *border* sangat tipis (0.5px, warna *white/10* di *dark mode*) untuk memberikan kesan *framed art*.
*   **Service & Highlight Cards:** Lupakan *drop shadow* tebal. Gunakan *surface colors* yang sangat *subtle* (misal: `bg-zinc-900/50` di atas `bg-black`), dengan *border* 1px *solid* yang nyaris tidak terlihat. *Border-radius* besar (24px - 32px).
*   **Social Links:** Jangan jadikan tombol utama. Jadikan *icon-only* yang rapi di sudut bawah *hero* atau di *footer/contact section*. Sosial media adalah *secondary exit*, bukan *primary goal*.

---

## 4. CONTENT STRATEGY AND COPY STRUCTURE

Konten harus diedit seolah-olah ditulis oleh *copywriter* agensi.

*   **Hero Headline:** Pendek, berbasis hasil. (Bukan: "Saya desainer UI/UX". Tapi: "Crafting digital experiences for modern brands.")
*   **Hero Subheadline:** 1-2 kalimat. Menjelaskan spesialisasi dan siapa target marketnya.
*   **About Section:** Menggunakan *first-person* (saya). Nada bicara: Profesional, reflektif, penuh keyakinan.
*   **Services Naming:** Gunakan *noun-phrases* yang mahal. (Bukan "Bikin Logo", tapi "Brand Identity & Strategy").
*   **CTA Language:** Hindari "Hubungi Saya". Gunakan "Start a Conversation", "Discuss a Project", atau "View Availability".

---

## 5. LAYOUT SYSTEM, SPACING, AND VISUAL RHYTHM

Rahasia desain mahal ada di *white space*.

*   **Rhythm:** Gunakan *8pt grid system*, tapi kalikan dengan skala besar. Jarak antar *section* (section padding) harus masif—minimal `120px` hingga `160px` di desktop, agar setiap area memiliki momennya sendiri.
*   **Width Behavior:** *Container* tengah tidak boleh terlalu lebar. Batasi maksimal `1024px` atau `800px` untuk teks agar tingkat keterbacaan (*readability*) tetap elegan, seperti kolom editorial.
*   **Asymmetry:** Jangan buat semuanya rata tengah (*center-aligned*). Padukan teks rata kiri dengan elemen visual di sebelah kanan untuk menciptakan dinamika ruang.

---

## 6. TYPOGRAPHY SYSTEM

Tipografi adalah 70% dari identitas premium halaman ini.

*   **Personality:** Kontras tinggi antara *Headline* dan *Body*.
*   **Headline Font:** Gunakan Grotesque Sans yang tajam (seperti *Inter Tight*, *Space Grotesque*, *Geist*) ATAU Serif modern yang elegan (seperti *Playfair Display*, *Instrument Serif*) untuk sentuhan *editorial*.
*   **Body Font:** *Sans-serif* yang sangat bersih dan mudah dibaca (seperti *Inter*, *Geist*, atau *SF Pro*).
*   **Scale:** *Hero Headline* harus sangat besar (misal `72px` hingga `96px` di desktop) dengan *line-height* ketat (`1.0` - `1.1`) dan *letter-spacing* sedikit minus (tighter tracking) untuk kesan premium dan padat. Teks paragraf harus sedikit lebih besar dari standar (`18px` - `20px`) dengan *line-height* lega (`1.6` - `1.7`).

---

## 7. COLOR SYSTEM AND MATERIAL FEEL

*   **Mood Utama (Dark Premium):** Lupakan abu-abu gelap standar SaaS (`#1F2937`). Gunakan *Deep Obsidian* (`#0A0A0A` hingga `#000000`) sebagai *background* dasar.
*   **Accents:** Warna aksen jangan norak. Gunakan *monochrome* tinggi (Putih bersih `#FFFFFF` untuk teks primer, `#A1A1AA` untuk teks sekunder). Jika butuh aksen warna, gunakan warna *muted* yang elegan (seperti *dusty sand*, *slate blue*, atau *sage green*).
*   **Material:** Kombinasi antara *matte surfaces* (warna solid tanpa gradasi berlebihan) dan *frosted glass* (backdrop-blur) yang sangat halus HANYA untuk elemen melayang (seperti *sticky header* jika ada).

---

## 8. MOTION, HOVER, EFFECTS, AND INTERACTION LANGUAGE

Interaksi harus terasa *smooth*, *heavy*, dan *deliberate*. Hindari animasi memantul (*bouncy*).

*   **Reveal State (On Scroll):** Setiap *section* atau *card* muncul dengan efek *Fade-in & Translate-Y* yang sangat halus (bergerak naik 20px, durasi `600ms` - `800ms`, dengan kurva easing `cubic-bezier(0.22, 1, 0.36, 1)`—mulai lambat, berhenti mulus).
*   **Button Hover:** Tombol utama tidak berubah warna secara drastis, melainkan tingkat kecerahannya sedikit naik, atau ada efek *inner glow* mikroskopis.
*   **Card Hover (Services/Highlights):** Hindari kartu yang melompat naik ke atas. Alih-alih, gunakan gambar di dalam kartu yang sedikit *zoom in* (skala `1.03` lambat `500ms`), sementara *border* kartu sedikit lebih terang, menciptakan ilusi kedalaman tanpa merusak struktur layout.

---

## 9. VISUAL DIFFERENTIATION FROM TYPICAL BIO TOOLS

| Elemen | Typical Bio Tool (Linktree dkk) | Lynknov Professional Profile |
| :--- | :--- | :--- |
| **Avatar** | Lingkaran kecil di tengah atas | Foto/Visual dominan, layout asimetris atau hero banner |
| **Fokus** | Kumpulan Tautan (Daftar List) | Identitas, Narasi, dan Bukti Kerja (Presentasi) |
| **Layout** | Vertikal tunggal, sempit di tengah | Dinamis, memanfaatkan lebar layar, ritme editorial |
| **Tombol** | Bertumpuk 5-10 tombol identik | 1 Primary CTA yang sangat jelas, sisanya kontekstual |
| **Vibe** | "Pilih link mana yang mau di-klik" | "Inilah nilai profesional saya, mari bekerja sama" |

---

## 10. MVP VS POLISH LAYER

**Scope MVP (V1):**
*   Layout asimetris/editorial *hard-coded* berdasarkan *design system* di atas.
*   Komponen *Card* (Service & Highlight) statis yang elegan.
*   Tipografi masif (*hard-scaled* untuk *mobile* & *desktop*).
*   Efek *hover* dasar (warna teks, *border brightness*, *image zoom* sederhana).
*   *Dark mode/Premium Light mode* statis tanpa *theme builder* rumit.

**Scope Polish (V2 / Post-MVP):**
*   *Scroll-triggered animations* (komponen masuk layar dengan halus).
*   *Spotlight hover effects* (efek cahaya mengikuti *cursor* mouse di atas kartu).
*   Pilihan *layout variant* (misal: "Editorial Serif" vs "Modern Grotesque").
*   Integrasi metrik *analytics* ke *dashboard*.

---

## 11. UI/UX SPECIFICATION BLUEPRINT (Siap Produksi)

Berikut adalah cetak biru instruksi struktur halaman *(mental model)* yang harus Anda pertahankan saat membangun komponen UI:

**A. THE HERO BLOCK (`<HeroSection />`)**
*   **Layout:** *Grid 12-kolom*. Desktop: Kolom 1-7 untuk teks, Kolom 8-12 untuk Visual/Avatar. (Asimetris kiri-berat). Mobile: Visual/Avatar di atas, Teks di bawah.
*   **Teks:** H1 ukuran super besar (`text-6xl` hingga `text-8xl`), *tracking-tighter*, *leading-none*. Di bawahnya paragraf sub-headline warna abu-abu elegan (`text-xl`, `text-zinc-400`).
*   **Action:** 1 Button masif (`bg-white text-black font-semibold rounded-2xl`). Di sebelahnya ada *icon-links* (LinkedIn, X, Email) dengan warna di-*mute*.

**B. THE NARRATIVE BLOCK (`<AboutSection />`)**
*   **Layout:** Rata tengah atau *offset* (Kolom 3-10).
*   **Tipografi:** Teks *body* berukuran besar (`text-2xl` atau `text-3xl`), font sekunder (mungkin serif), *line-height* `relaxed`. Terasa seperti *quote* besar dari pendiri.

**C. THE VALUE BLOCK (`<ServicesSection />`)**
*   **Header:** Label seksi kecil (`text-sm uppercase tracking-widest text-zinc-500`) di atas Judul Section ("Core Capabilities" atau "What I Do").
*   **Grid:** *CSS Grid* 2 atau 3 kolom.
*   **Card UI:** *Background* `bg-zinc-900/40`, *Border* `border-zinc-800`, *Border Radius* `rounded-3xl`, *Padding* `p-8`. Tidak ada *shadow*, murni *flat-depth*.

**D. THE PROOF BLOCK (`<HighlightsSection />`)**
*   **Layout:** *Horizontal Scroll (Snap)* atau *Grid 2 kolom asimetris* (satu kartu besar, dua kecil).
*   **Card UI:** 70% diisi gambar penutup (*cover image*) yang tertata rapi (`object-cover`, *aspect ratio* 4:3 atau 16:9). 30% area teks (*Title*, *Category*, dan ikon panah atas-kanan ↗). *Hover*: Panah ↗ bergerak ke atas-kanan sejauh `4px`, gambar *zoom-in* lambat.

**E. THE CLOSING BLOCK (`<ContactSection />`)**
*   **Layout:** *Full width container*, *center-aligned*.
*   **Tipografi:** H2 masif (misal: "Let's build the future").
*   **Action:** Tombol CTA sekunder, mungkin dengan efek pinggiran yang sedikit menyala (*subtle glow*) atau *glass button*.

---

## 12. GLOBAL SYSTEM & TOKENS (Sistem Global)

**Layout & Spacing (Ritme Visual):**
*   **Max Width Container:** `1200px` untuk kesan lebar namun terkontrol. Bagian narasi teks dibatasi maksimal `800px` (sekitar `65ch`) untuk kenyamanan membaca kelas editorial.
*   **Global Padding:** Mobile `px-6`, Tablet `px-12`, Desktop `px-20`. Ini memberikan bingkai ruang kosong (*white space*) yang mewah di sekitar konten.
*   **Section Spacing (Gap antar blok):** Sangat lega. Desktop: `160px` hingga `200px`. Mobile: `96px` hingga `120px`. Jangan biarkan section saling menumpuk.

**Color Palette (Dark Premium Material):**
*   **Background Base:** `#050505` (Hampir hitam murni, menyerap cahaya).
*   **Surface / Card Background:** `#0A0A0A` hingga `#121212` (Elevasi sangat rendah).
*   **Primary Text:** `#FAFAFA` (Putih bersih namun tidak menyilaukan).
*   **Secondary Text (Muted):** `#A1A1AA` (Zinc-400, elegan dan bisa dibaca).
*   **Borders & Dividers:** `rgba(255, 255, 255, 0.08)` (Garis sangat tipis, nyaris tak terlihat, hanya memberi struktur).
*   **Primary Action (CTA):** Latar `#FAFAFA`, Teks `#050505`. Kontras absolut.

**Typography Scale (Pendekatan Editorial):**
*   **Headline Font:** *Grotesque Sans* modern (seperti *Inter Tight* atau *Space Grotesque*) dengan *tracking* ketat (`-0.02em` hingga `-0.04em`).
*   **Body Font:** *Sans-serif* netral (seperti *Inter* atau *Geist*) dengan *line-height* lega (`1.6` hingga `1.8`).
*   **Scale Rule:** Perbedaan ukuran antara Headline dan Body Text harus drastis (ekstrem). Jangan gunakan transisi ukuran yang linear.

**Motion & Easing Tokens:**
*   **Standard Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Transisi yang sangat *smooth*, cepat di awal, melambat di akhir secara dramatis).
*   **Reveal Duration:** `800ms` untuk masuknya *section* saat di-*scroll*.
*   **Hover Duration:** `300ms` hingga `400ms`.

---

## RINGKASAN REKOMENDASI UNTUK EKSEKUSI

1.  **Dilarang Menggunakan Template UI Library Secara Mentah:** Tailwind CSS sangat direkomendasikan, tetapi *utility classes*-nya harus diracik khusus. Jangan pakai desain *Card* bawaan dari komponen seperti shadcn/ui tanpa menyesuaikan *border-radius*, opasitas *border*, dan *padding*-nya agar terasa lega (*spacious*).
2.  **Hirarki adalah Raja:** Mata pengunjung harus tahu ke mana harus melihat secara otomatis. Ukuran font terbesar ke terkecil harus memiliki jarak ukur yang drastis (contoh: dari ukuran `80px` langsung ke `18px`, abaikan ukuran `40px` untuk menciptakan ketegangan/kontras visual).
3.  **Kesederhanaan yang Mahal:** Kesan "mahal" (premium) dalam desain digital tidak didapat dengan menambahkan ornamen, efek 3D, atau warna-warni neon. Kesan mahal didapat dari tipografi yang presisi, ruang kosong yang lebar (*negative space*), dan warna *muted* yang dikontrol dengan ketat.

Dengan *blueprint* ini, Lynknov tidak hanya memberikan pengguna sebuah tautan bio; Lynknov membekali mereka dengan setelan jas digital eksklusif yang siap digunakan untuk berbisnis di level tertinggi.

Konteks fitur awal Lynknov v1
1. Tujuan fase ini

Fase ini bukan langsung bikin “semua fitur bisnis”.

Tujuannya adalah membangun alur aktivasi awal user yang membuat Lynknov terasa berbeda dari bio tools biasa.

Artinya, saat user pertama kali masuk ke aplikasi, mereka tidak langsung dilempar ke editor halaman kosong, tapi dibimbing melalui alur yang:

memahami kondisi awal user,
menyiapkan workspace awal,
memberi arah langkah berikutnya,
dan menghasilkan draft awal yang nyata.

Jadi fokus fitur pertama bukan “editor bio link”, melainkan:

Fitur pertama = Alur aktivasi awal workspace

yang terdiri dari:

login / sign up
onboarding singkat
pemetaan template awal
pembuatan starter workspace
Dashboard mode kesiapan
draft halaman publik awal
arahan ke langkah berikutnya
2. Kenapa fitur ini harus jadi yang pertama

Karena ini fondasi semua fitur setelahnya.

Kalau fondasi ini benar, maka nanti fitur lain seperti:

editor halaman,
Offers,
Leads,
Analytics,
sampai AI recommendations

akan terasa nyambung dan punya konteks.

Kalau fondasi ini tidak ada, Lynknov akan terasa seperti:
“dashboard kosong + page builder biasa”.

Padahal positioning Lynknov adalah:

platform untuk membantu user membangun fondasi bisnis digital mereka

Jadi fitur pertama harus menjawab pertanyaan:
“begitu user masuk, apa yang mereka rasakan, lihat, dan lakukan?”

3. Masalah utama yang ingin diselesaikan

Banyak tools bio mengasumsikan user:

sudah punya bisnis,
sudah tahu mau jual apa,
sudah siap publish,
dan tinggal menempelkan link.

Padahal target awal Lynknov juga akan mencakup user yang:

belum punya bisnis jelas,
masih coba-coba,
baru punya skill tapi belum tahu cara menyusunnya,
atau ingin mulai membangun identitas digital yang lebih serius.

Karena itu, Lynknov v1 harus mampu menangani dua kondisi:

A. User pemula

Belum punya bisnis atau offer yang jelas.

B. User setengah matang

Sudah punya jasa, produk, atau arah, tapi belum tertata.

Maka UX utama Lynknov v1 tidak boleh langsung fokus ke metrik performa bisnis.

Yang lebih tepat adalah:

Dashboard kesiapan

bukan langsung

Dashboard pertumbuhan
4. Prinsip UX utama Lynknov v1
A. Jangan bikin user merasa kosong

Setelah login, user tidak boleh melihat halaman kosong.

B. Jangan paksa user langsung “jualan”

Untuk user yang belum siap, sistem harus membantu menyusun fondasi dulu.

C. Tampilkan progress, bukan sekadar menu

User harus merasa mereka sedang membangun sesuatu.

D. Hasil onboarding harus terasa nyata

Jawaban onboarding harus memengaruhi isi Dashboard dan draft awal workspace.

E. Bahasa harus sederhana dan relevan untuk user Indonesia

Gunakan bahasa Indonesia untuk copy, helper text, status, dan arahan.
Gunakan bahasa Inggris hanya pada menu/fitur yang memang lebih familiar.

5. Definisi fitur pertama yang akan dibangun
Nama internal fitur

Initial Workspace Activation

Nama pemahaman bisnisnya

Alur aktivasi workspace awal Lynknov

Hasil akhir yang harus dicapai user

Setelah pertama kali login, user berhasil:

menyelesaikan onboarding singkat,
mendapatkan workspace awal yang relevan,
masuk ke Dashboard yang terisi,
melihat progress kesiapan mereka,
dan memiliki draft halaman publik awal yang bisa dilanjutkan.

Dengan kata lain:

output fitur pertama adalah

user tidak lagi berada di kondisi nol

6. Cakupan fitur pertama
Masuk scope
Login / sign up selesai
Cek apakah user baru atau lama
Jika user baru → masuk onboarding
Simpan hasil onboarding
Tentukan template awal berdasarkan jawaban user
Generate starter workspace
Redirect ke Dashboard
Dashboard menampilkan mode kesiapan
User bisa lanjut ke halaman publik draft
User melihat langkah berikutnya yang jelas
Belum masuk scope
AI recommendation canggih
analytics real yang kompleks
Leads management lengkap
pembayaran
automasi email
custom domain penuh
marketplace template besar
personalization berbasis AI
7. Struktur berpikir produk

Fitur ini terdiri dari 4 lapisan logika:

Lapisan 1 — Input

Data dari onboarding.

Lapisan 2 — Mapping

Sistem menentukan template awal dan prioritas.

Lapisan 3 — Generation

Sistem membuat starter workspace.

Lapisan 4 — Presentation

Dashboard menampilkan hasil generation tadi.

Formula sederhananya:

Onboarding → Template Mapping → Workspace Generation → Dashboard Display

8. Data onboarding yang perlu dikumpulkan

Onboarding harus singkat, tidak terlalu panjang, tapi cukup untuk memberi arah.

Data inti
Tipe user
Tujuan utama
Nama brand / nama personal
Deskripsi singkat
Fokus utama halaman
CTA awal
Rekomendasi field
1. Tipe user

Pilihan:

Freelancer
Creator
Konsultan
Agency
Bisnis kecil
Personal brand
2. Tujuan utama

Pilihan:

Mendapat klien
Menjual produk digital
Menampilkan portfolio
Membangun identitas profesional
Mengumpulkan leads
Masih eksplorasi
3. Nama brand / nama tampilan

Contoh:

Daffa Studio
Lynknov by Daffa
Nama personal
4. Deskripsi singkat

Contoh:

Saya membantu UMKM membangun tampilan brand digital
Saya menjual template dan produk digital
Saya masih ingin eksplorasi dulu
5. Fokus utama halaman

Pilihan:

Jasa
Produk digital
Portfolio
Profil profesional
Campuran
6. CTA awal

Pilihan:

Hubungi saya
Lihat portfolio
Lihat penawaran
Beli sekarang
Konsultasi
9. Template awal yang perlu disiapkan

Template di sini bukan sekadar template visual.
Ini adalah template experience + struktur awal workspace.

Template inti v1
A. Freelancer / Jasa

Cocok untuk user yang ingin dapat klien.

Default:

headline mengarah ke jasa
section jasa
section portfolio
CTA “Hubungi saya” / “Konsultasi”
checklist fokus pada jasa, portfolio, dan kontak
B. Creator / Produk digital

Cocok untuk user yang ingin jualan produk digital.

Default:

headline produk / creator
featured product
CTA “Lihat penawaran” / “Beli sekarang”
checklist fokus pada produk, CTA, dan halaman publik
C. Konsultan / Booking

Cocok untuk user yang ingin mendapatkan konsultasi atau booking.

Default:

headline keahlian
CTA konsultasi
section layanan / expertise
checklist fokus pada offer dan kontak
D. Personal brand / Eksplorasi

Cocok untuk user yang belum jelas bisnisnya.

Default:

headline personal profile
section perkenalan
section skill / fokus
CTA ringan
Dashboard lebih banyak menunjukkan readiness daripada performa
10. Hubungan onboarding dengan Dashboard

Onboarding bukan tujuan akhir.
Onboarding adalah alat untuk mengatur kondisi awal Dashboard.

Yang tetap sama untuk semua user
layout Dashboard
sidebar
struktur section utama
navigasi aplikasi
Yang berubah berdasarkan onboarding
headline utama
isi quick actions
checklist kesiapan
status aset awal
CTA utama
draft halaman publik awal

Jadi bukan tiap user punya app berbeda.
Yang benar:

shell sama, isi dipersonalisasi secara rule-based
11. Struktur Dashboard awal

Aku rekomendasikan Dashboard punya 6 section utama.

1. Header sambutan

Contoh copy:

Selamat datang kembali, Daffa
Workspace kamu sudah siap dilanjutkan
Tinggal 3 langkah lagi sebelum halamanmu siap dipublikasikan
2. Kartu progress utama

Isi:

persentase kesiapan
status workspace
tujuan utama user
tombol aksi utama

Contoh tombol:

Lanjutkan setup
Edit halaman
Lihat draft
3. Aksi cepat

4 kartu prioritas berdasarkan template.

Contoh untuk mode jasa:

Tambahkan penawaran pertama
Lengkapi deskripsi singkat
Aktifkan tombol kontak
Siapkan halaman publik
4. Status aset

Menampilkan hal-hal seperti:

Halaman publik
Penawaran utama
Tombol CTA
Form kontak
Portfolio

Status:

Belum dibuat
Draft
Hampir siap
Siap dipublikasikan
5. Langkah berikutnya

Bukan insight AI dulu, tapi arahan sederhana:

Lengkapi penawaran pertamamu
Tambahkan 1 project unggulan
Pilih CTA utama
Selesaikan setup profil
6. Area metrik

Untuk user baru, metriknya bukan performa bisnis.
Yang tampil adalah:

Progress setup
Status halaman
Kesiapan publish
Kelengkapan profil

Jika user sudah publish, nanti area ini bisa berkembang ke:

Pengunjung
Klik CTA
Leads masuk
12. Tampilan untuk user yang belum punya bisnis

Ini penting.

Kalau user masih eksplorasi, Dashboard tidak boleh membuat mereka merasa tertinggal.

Jadi mode ini harus menampilkan:

Hero copy
Kamu belum perlu bisnis yang sepenuhnya jadi untuk mulai
Mari susun fondasi halaman dan arah bisnismu dulu
Fokus metrik
Progress setup
Kejelasan profil
Status penawaran
Kesiapan publish
Aksi cepat
Tentukan fokus halamanmu
Tulis deskripsi singkat
Pilih CTA awal
Buat draft halaman pertamamu

Jadi Lynknov terasa ramah untuk user nol, bukan hanya untuk user matang.

13. End-to-end flow fitur pertama

Berikut alur lengkap dari awal sampai goal fitur pertama tercapai.

Tahap 1 — User berhasil login / sign up

Sistem mendeteksi:

apakah ini user baru,
atau user lama.
Tahap 2 — Jika user baru, masuk onboarding

User mengisi form singkat bertahap.

Alur yang disarankan:

pilih tipe user
pilih tujuan utama
isi nama brand / nama tampilan
isi deskripsi singkat
pilih fokus halaman
pilih CTA awal
Tahap 3 — Sistem memproses hasil onboarding

Sistem:

menyimpan data profil,
menyimpan preferensi workspace,
menjalankan rule mapping,
menentukan template awal.
Tahap 4 — Sistem membuat starter workspace

Yang dibuat:

draft halaman publik
draft penawaran utama
CTA awal
progress setup awal
mode Dashboard
Tahap 5 — User diarahkan ke Dashboard

Dashboard menampilkan:

sapaan personal
progress setup
status aset
langkah prioritas
tombol lanjutkan
Tahap 6 — User menyelesaikan langkah pertama utama

Contoh langkah prioritas pertama:

melengkapi penawaran utama
atau
menyelesaikan draft halaman publik
Tahap 7 — Goal fitur pertama tercapai

Goal minimum fase ini adalah:

user punya workspace aktif,
user punya draft halaman awal,
user tahu langkah berikutnya,
user tidak merasa masuk ke sistem kosong.
14. Goal produk untuk fitur pertama

Fitur pertama dianggap berhasil kalau user setelah login pertama:

tidak bingung harus mulai dari mana,
melihat Dashboard yang relevan,
punya draft awal nyata,
dan terdorong menyelesaikan langkah berikutnya.
Goal pengalaman

“User merasa Lynknov membantu menyiapkan fondasi bisnis digital mereka.”

Goal produk

“User berhasil mencapai kondisi siap lanjut, bukan berhenti di layar kosong.”

15. Kriteria berhasil untuk v1
Secara UX
onboarding terasa singkat
hasil onboarding terasa nyata di Dashboard
Dashboard tidak kosong
user paham langkah berikutnya
Secara produk
user profile tersimpan
workspace template terbentuk
draft halaman tercipta
progress setup berjalan
Secara positioning
Lynknov terasa seperti workspace bisnis
bukan sekadar bio tool editor
16. Struktur halaman yang perlu dibuat di fase ini

Minimal halaman/route yang dibutuhkan:

/login atau auth flow
/onboarding
/dashboard
/my-page atau halaman publik draft editor sederhana
API/action untuk create starter workspace

Kalau mau disederhanakan untuk build awal:

auth sudah ada
fokus build:
onboarding
template mapping
workspace generation
Dashboard
halaman draft publik sederhana
17. Bahasa produk yang direkomendasikan

Karena target awal Indonesia, gunakan campuran yang natural.

Menu yang boleh tetap Inggris
Dashboard
Offers
Leads
Analytics
Settings
Copy dan helper text pakai Indonesia

Contoh:

Selamat datang kembali
Lengkapi workspace kamu
Tinggal 3 langkah lagi
Halaman publikmu masih draft
Penawaran pertamamu belum dibuat
Siap dipublikasikan

Ini akan terasa lebih dekat ke user awal.

Karena kalau Lynknov memang mau bantu ngembangin bisnis user, maka kita tidak boleh berasumsi semua user sudah siap jualan. Akan ada 3 tipe user:

Belum punya bisnis sama sekali
Baru punya ide kasar
Sudah punya offer/bisnis, tapi belum rapi

Kalau semua dipaksa masuk ke dashboard yang isinya:

page views
conversion
leads
revenue

padahal mereka belum punya apa-apa, itu bikin mereka merasa:
“produk ini bukan buat saya”
atau
“saya masih terlalu nol untuk masuk ke sini.”

Padahal harusnya Lynknov terasa:
“justru saya dibantu mulai dari nol.”

Jadi prinsip UX yang benar

Untuk user yang belum punya bisnis, Lynknov jangan menampilkan dashboard performa, tapi dashboard readiness.

Artinya, yang ditampilkan di awal bukan:

hasil bisnis

tapi:

kesiapan fondasi bisnis

Jadi fokusnya bergeser dari:

performance dashboard
menjadi
setup / readiness dashboard

Cara berpikirnya

Lynknov sebaiknya punya 2 mode besar secara UX:

1. Build Mode

Untuk user yang masih membangun fondasi

2. Growth Mode

Untuk user yang sudah publish dan mulai jalan

Jadi bukan semua user dipaksa lihat metrik growth dari hari pertama.

Kalau user belum punya bisnis, tampilan awalnya seperti apa?

Menurutku halaman Dashboard tetap sama secara struktur, tapi isi section-nya berubah.

Yang ditampilkan di awal:
1. Hero utama

Bukan “your business is growing”
tapi semacam:

Let’s build your first business foundation
Turn your skills, ideas, or passion into a clear digital offer.

Atau:

You don’t need a full business to start
We’ll help you shape your first page, offer, and direction.

Jadi dari copy pertama saja user sudah merasa diterima.

2. Setup progress, bukan business performance

Contoh progress:

Profile created
Direction chosen
First offer drafted
Public page started
CTA selected
Ready to publish

Ini jauh lebih relevan daripada conversion rate kosong.

3. Action cards yang membimbing

Bukan action yang terlalu advanced, tapi langkah dasar seperti:

Define what you want to offer
Choose your page direction
Write your first headline
Add your first contact button
Create your starter page

Ini membuat Lynknov terasa seperti mentor/tool builder, bukan analytics tool.

Jadi metrik apa yang ditampilkan?

Untuk user nol, jangan tampilkan metrik bisnis dulu.

Ganti dengan metrik/fokus seperti ini:

A. Readiness Metrics

Ini metrik paling cocok untuk early-stage user.

Contoh:

Workspace setup: 40%
Profile clarity: Basic
Offer status: Not created
Page status: Draft
Publish readiness: Not ready

Ini bukan metrik vanity, tapi metrik progres.

B. Foundation Metrics

Metrik tentang fondasi bisnis digital mereka.

Contoh:

Main offer: Missing
CTA: Not selected
Lead capture: Inactive
Positioning: Incomplete
Social proof: Empty

Ini bagus karena memberi arah konkret.

C. Creation Metrics

Bisa juga tampilkan metrik berbasis aktivitas build.

Contoh:

1 page draft created
0 offers published
1 headline saved
0 forms connected
2 sections completed

Ini terasa lebih hidup untuk user baru.

Yang jangan ditampilkan di awal

Untuk user yang belum punya bisnis, hindari dulu:

revenue
conversion rate
customer lifetime style metrics
traffic charts besar
lead funnel kompleks
analytics kosong yang bikin minder

Karena itu premature.

Kalau mau tetap ada area analytics, buat dalam bentuk empty state yang sehat:

No performance data yet
Publish your page first, and Lynknov will start tracking visitors, clicks, and leads here.

Jadi tidak terasa “gagal”, tapi “belum sampai tahap itu.”

Solusi UX terbaik: bedakan maturity stage user

Menurutku Lynknov harus punya konsep internal:

Stage 1 — Explore

User baru coba-coba, belum jelas mau jual apa

Stage 2 — Build

User mulai menyusun page, offer, CTA

Stage 3 — Launch

User siap publish

Stage 4 — Grow

User sudah live dan mulai dapat activity

Nah dashboardnya tinggal menyesuaikan isi berdasarkan stage ini.

Kalau user masih coba-coba, apa yang ditampilkan?

Kalau user masih eksplorasi, dashboard jangan terlalu “business-heavy”.
Lebih baik tampilkan kombinasi:

1. Direction card

Contoh:

Pick your starting direction

Showcase your portfolio
Sell a digital product
Offer a service
Build a personal brand page

Ini membantu user yang bahkan belum tahu mau mulai dari mana.

2. Starter path

Bukan “leads” dulu, tapi “path”.

Contoh:

Path 1: Start as Freelancer
Path 2: Build a Creator Storefront
Path 3: Launch a Simple Business Page

Jadi user tidak harus datang dengan bisnis matang.

3. Guided empty states

Setiap area kosong diberi arahan.

Contoh:

No offer yet → Create your first offer
No page yet → Start with a guided page template
No CTA yet → Choose how people can contact you
No niche yet → Use a simple starter positioning prompt

Ini powerful banget secara UX.

Gambaran layout untuk user yang masih nol

Ini contoh susunan dashboard yang cocok.

Bagian atas

Welcome
You’re at the beginning — let’s build your first digital business foundation.

Card utama besar

Your setup progress

Profile: done
Direction: in progress
Offer: not started
Page: draft
Publish: locked

Tombol:

Continue setup
Explore templates
Section tengah kiri

Choose your next step

Define your first offer
Create your starter page
Set your main CTA
Write your page headline
Section tengah kanan

Starter suggestions

Best for freelancers
Best for creators
Best for consultants
Section bawah kiri

Your assets

Page: Draft
Offer: Empty
CTA: Missing
Contact form: Not active
Section bawah kanan

What unlocks after publishing

Visitor tracking
Click analytics
Leads
Growth insights

Nah ini bagus karena user ngerti:
“oh, analytics nanti muncul setelah saya publish.”

Jadi pembeda UX-nya apa?

Pembeda Lynknov justru ada di sini:

Bio tools biasa sering mengasumsikan user sudah siap taruh link.

Sedangkan Lynknov harus bisa berkata:
“Kalau kamu belum punya bisnis yang jelas pun, kami bantu susun pondasinya dulu.”

Itu jauh lebih kuat.

Jadi Lynknov bukan cuma tool untuk orang yang sudah jadi,
tapi juga tool untuk orang yang sedang becoming.

Rekomendasi istilah metrik untuk user awal

Daripada metrik bisnis klasik, pakai istilah seperti:

Setup Progress
Offer Readiness
Page Status
Publish Readiness
Brand Clarity
Contact Readiness
Workspace Completion

Ini jauh lebih relevan di fase awal.

Kapan metrik bisnis mulai muncul?

Begitu user memenuhi kondisi tertentu, misalnya:

page published
CTA aktif
atau form/contact sudah siap

barulah dashboard bisa mulai menampilkan:

visitors
clicks
leads
top CTA
conversion signals

Jadi transisinya natural.

Fase awal:

“build your foundation”

Fase setelah publish:

“track your growth”

Ini alur UX yang sehat.

Kesimpulan paling penting

Kalau user belum punya bisnis atau masih coba-coba, Lynknov jangan menampilkan dashboard growth, tapi dashboard readiness.

Jadi yang ditampilkan adalah:

progress setup
kejelasan arah
status offer
status page
CTA readiness
langkah berikutnya

Bukan:

revenue
conversion
leads kosong
analytics yang belum relevan

Dengan begitu, Lynknov terasa tetap berguna bahkan untuk user yang masih nol.
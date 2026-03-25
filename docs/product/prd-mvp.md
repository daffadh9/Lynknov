# Lynknov — PRD MVP

## Document Metadata

| Field | Value |
|---|---|
| Product | Lynknov |
| Code | OPS-01 |
| Type | Product Requirements Document |
| Status | Execution-ready v1 |
| Objective | Mendefinisikan MVP Lynknov yang cukup sempit untuk dibangun cepat, tetapi cukup kuat untuk membuktikan value produk |

## 1. Executive Summary

MVP Lynknov bukan ditujukan untuk membuktikan semua visi jangka panjang. MVP ditujukan untuk membuktikan satu hal utama:

**seorang user dapat membuat business identity page yang terlihat profesional, menampilkan proof, mempublikasikan penawaran, dan menangkap lead secara terstruktur dari satu sistem yang sederhana.**

Jika MVP berhasil, Lynknov membuktikan dirinya bukan sekadar bio tool, tetapi **mesin trust dan conversion ringan** untuk freelancer, creator profesional, consultant, dan small business owner.

## 2. Product Goal

### Primary Goal
Membantu user membuat satu halaman publik yang:
- menjelaskan siapa mereka
- menunjukkan bukti kerja atau proof
- memuat CTA yang jelas
- menangkap inquiry atau lead
- memberi insight dasar tentang interaksi visitor

### Secondary Goal
Membuktikan bahwa kombinasi **identity + portfolio + action capture** lebih bernilai daripada bio page biasa.

## 3. Success Criteria

MVP dianggap berhasil bila dalam fase internal testing dan early usage:
- user bisa onboarding sampai publish tanpa bantuan teknis berat
- user bisa mengisi profil dan menampilkan minimal 1 project
- user bisa menerima minimal 1 inquiry dari public page
- user bisa melihat basic page views dan CTA/form activity
- user merasa halaman publik mereka “layak dibagikan ke calon klien”

## 4. Target User untuk MVP

### Primary user
Freelancer / solo operator yang menjual skill atau jasa.

Contoh:
- UI/UX designer
- web developer
- brand designer
- copywriter
- product manager freelance
- consultant
- video editor

### Secondary user
Creator profesional atau small business owner yang butuh halaman ringkas untuk presentasi bisnis.

### Bukan target utama di MVP
- tim besar multi-seat
- marketplace seller kompleks
- agency workflow multi-client penuh
- enterprise buyer

## 5. Core User Problem

User saat ini sering memakai stack terpisah:
- bio link untuk identitas
- PDF atau Notion untuk portfolio
- DM atau WhatsApp untuk inquiry
- payment link di tempat lain
- analytics tidak jelas

Akibatnya:
- trust terpecah
- conversion friksi tinggi
- tidak ada sistem lead sederhana
- sulit mengetahui apa yang actually bekerja

## 6. MVP Thesis

Jika Lynknov menyediakan satu flow sederhana untuk:
1. setup identity
2. susun proof
3. tampilkan offer / CTA
4. publish public page
5. tangkap lead
6. lihat analytics dasar

maka user akan merasa lebih siap secara bisnis dan lebih mudah mengubah attention menjadi opportunity.

## 7. MVP Scope

## In Scope

### A. User auth and onboarding
- sign up
- sign in
- session persistence
- onboarding awal
- pilih use case utama
- isi profil dasar

### B. Identity setup
- display name
- professional headline
- short bio
- avatar / image
- social links
- primary CTA

### C. Portfolio / proof
- tambah project cards
- project title
- short summary
- role
- result / outcome singkat
- thumbnail / cover image
- project link opsional
- testimonials sederhana

### D. Public page publishing
- custom slug Lynknov
- status draft / published
- publish dan unpublish
- public page render
- SEO title / description dasar

### E. Lead capture
- contact / inquiry form bawaan
- form submit ke dashboard
- basic lead fields
- status lead default
- source page reference

### F. Basic analytics
- page views
- CTA clicks
- form submissions
- latest activity summary di dashboard

### G. Founder dashboard
- profile completeness
- page status
- total views
- CTA clicks
- leads masuk

## Out of Scope

### Tidak dibangun di fase MVP
- multi-page complex website builder
- drag-and-drop builder kompleks
- custom domain penuh
- team collaboration
- full checkout native
- subscription billing logic produksi penuh
- AI writing assistant kompleks
- automation CRM lanjutan
- public template marketplace
- advanced lead scoring
- inbox omnichannel

## 8. Killer Feature for Launch

**Business Identity Page yang terasa jauh lebih actionable daripada bio link biasa.**

Komponen pembeda launch:
- positioning headline yang kuat
- project proof cards
- offer / CTA yang jelas
- inquiry form yang benar-benar menyimpan lead
- analytics dasar yang membantu user tahu ada interest

Killer feature bukan “builder yang indah”, tapi **halaman bisnis yang terasa siap pakai untuk closing peluang.**

## 9. Core User Stories

### Freelancer
- Sebagai freelancer, saya ingin membuat halaman yang menjelaskan siapa saya dan jasa apa yang saya tawarkan, agar calon klien cepat paham value saya.
- Sebagai freelancer, saya ingin menampilkan project terbaik saya, agar visitor percaya pada kualitas saya.
- Sebagai freelancer, saya ingin menerima inquiry lewat form, agar saya tidak kehilangan lead dari traffic yang datang.

### Creator professional
- Sebagai creator, saya ingin punya halaman yang menggabungkan identitas, proof, dan CTA, agar brand deal atau peluang kolaborasi lebih mudah masuk.

### Small business owner
- Sebagai owner, saya ingin punya satu halaman bisnis ringkas yang menampilkan profile, layanan, dan jalur kontak, agar bisnis saya terlihat lebih profesional tanpa bikin website besar.

## 10. Functional Requirements

### Auth
- user dapat sign up dengan email
- user dapat sign in
- user tetap login saat kembali

### Onboarding
- user diarahkan ke setup awal setelah sign up
- onboarding mengumpulkan data minimum untuk membuat public page

### Profile
- user dapat mengedit display name, headline, bio, avatar, social links, CTA

### Projects
- user dapat create, edit, delete, reorder project cards

### Testimonials
- user dapat menambah testimonial sederhana dengan nama, role, quote

### Public page
- user dapat preview halaman
- user dapat publish halaman ke slug publik
- visitor dapat membuka halaman tanpa login

### Lead capture
- visitor dapat mengirim form inquiry
- submission masuk ke dashboard user
- submission menyimpan page source

### Analytics
- sistem menyimpan page view event
- sistem menyimpan CTA click event
- sistem menyimpan form submission event
- dashboard menampilkan angka ringkas

## 11. Non-Functional Requirements

- public page harus cepat dibuka
- dashboard harus terasa ringan
- slug publik harus unik
- form submission harus aman terhadap spam dasar
- content rendering harus cukup fleksibel untuk future expansion
- schema data harus mudah diperluas ke commerce dan lead engine berikutnya

## 12. Information Objects in MVP

Objek utama yang perlu ada:
- user
- workspace
- profile
- page
- section
- project
- testimonial
- lead form
- lead submission
- analytics event

## 13. User Journey Ringkas

### Journey 1 — Setup to publish
1. user sign up
2. user isi profile dasar
3. user tambah 1–3 project
4. user setup CTA
5. user preview
6. user publish ke slug publik

### Journey 2 — Visitor to lead
1. visitor buka public page
2. visitor membaca headline dan proof
3. visitor klik CTA atau isi form
4. sistem menyimpan event dan lead
5. owner melihat lead di dashboard

## 14. UX Priorities

Urutan prioritas UX:
1. clarity
2. speed to publish
3. trust-building layout
4. low friction editing
5. easy action capture

## 15. Risks

### Risk 1 — Terlalu mirip bio tool biasa
Mitigasi: tonjolkan proof, structured CTA, dan lead capture.

### Risk 2 — Builder terlalu kompleks terlalu awal
Mitigasi: gunakan opinionated sections, bukan full custom page builder.

### Risk 3 — User tidak melihat value analytics
Mitigasi: dashboard harus langsung menunjukkan “ada yang melihat / klik / menghubungi”.

### Risk 4 — Scope creep ke commerce dan AI terlalu cepat
Mitigasi: lock MVP hanya pada business identity + lead capture.

## 16. Launch Readiness Checklist

MVP layak diluncurkan internal bila:
- auth stabil
- onboarding selesai
- page publish berhasil
- inquiry tersimpan dengan benar
- analytics dasar tampil
- minimal 1 real founder page live

## 17. Post-MVP Expansion Candidates

Setelah MVP valid, prioritas berikutnya:
- offers yang lebih kuat
- booking link / appointment layer
- payment integration
- templates / themes
- AI copy assist
- advanced lead management
- commerce blocks
- custom domain

## 18. Final Product Decision

MVP Lynknov harus diposisikan sebagai:

**business identity and conversion starter system**

bukan:
- full website builder
- marketplace penuh
- CRM penuh
- all-in-one business suite dari hari pertama

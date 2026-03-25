# Lynknov — Screen Map & User Flow Detail

## Document Metadata

| Field | Value |
|---|---|
| Product | Lynknov |
| Code | OPS-03 |
| Type | UX / Product Delivery |
| Status | Execution-ready v1 |
| Objective | Memecah MVP menjadi screen inventory, user flow, dan interaction logic yang siap dipakai desain dan build |

## 1. Executive Summary

Dokumen ini menerjemahkan strategi Lynknov menjadi alur nyata di produk. Fokus utama MVP adalah mempercepat user dari nol sampai punya public page yang layak dibagikan dan bisa menangkap lead.

## 2. Screen Map Overview

## Public-facing screens
1. landing page
2. auth — sign up
3. auth — sign in
4. public profile page `/p/[slug]`
5. optional not found / inactive page

## Private product screens
6. onboarding — welcome
7. onboarding — use case selection
8. onboarding — profile setup
9. onboarding — add first project
10. onboarding — setup CTA & inquiry
11. onboarding — publish success
12. dashboard overview
13. builder / page editor
14. projects manager
15. testimonials manager
16. leads inbox
17. analytics summary
18. settings / profile settings

## 3. Screen Priority for Design and Build

Build order:
1. sign up / sign in
2. onboarding flow
3. dashboard overview
4. builder / editor
5. public page
6. leads inbox
7. analytics summary
8. settings

## 4. Main User Flow

## Flow A — New User Activation
1. user arrives at landing page
2. user clicks get started
3. user signs up
4. system creates workspace
5. user enters onboarding
6. user fills profile basics
7. user adds first project
8. user configures CTA / form
9. user previews page
10. user publishes page
11. user lands on publish success state
12. user is redirected to dashboard

### Goal
Dalam satu sesi, user merasa “saya sudah punya business page yang bisa dipakai.”

## Flow B — Returning User Management
1. user sign in
2. user opens dashboard
3. user sees page status + metrics
4. user edits sections / projects
5. user republishes or keeps live
6. user checks leads and analytics

## Flow C — Visitor to Lead
1. visitor opens public page
2. visitor understands identity within seconds
3. visitor scrolls through proof
4. visitor sees CTA / offer
5. visitor fills inquiry form or clicks CTA
6. system records interaction
7. owner sees submission in dashboard

## 5. Detailed Screen Inventory

## 5.1 Landing Page
### Purpose
Menjelaskan value Lynknov dengan cepat.

### Key blocks
- headline
- product explanation
- proof of value
- who it is for
- CTA to sign up

### Primary actions
- get started
- sign in

## 5.2 Sign Up
### Purpose
Mengubah visitor menjadi user terdaftar.

### Fields
- email
- password
- optional confirm password

### Success state
- route to onboarding

## 5.3 Sign In
### Purpose
Masuk kembali ke dashboard.

### Fields
- email
- password

## 5.4 Onboarding — Welcome
### Purpose
Memberi konteks singkat bahwa Lynknov akan membantu user membuat business page yang siap dipakai.

### Content
- quick explanation of outcome
- estimated setup steps
- CTA continue

## 5.5 Onboarding — Use Case Selection
### Purpose
Menyesuaikan arah page awal.

### Options
- freelancer
- creator
- consultant
- small business owner

### Output
Menyimpan `workspace persona/use_case` untuk prefill copy atau layout rules di masa depan.

## 5.6 Onboarding — Profile Setup
### Purpose
Mengumpulkan identity minimum.

### Fields
- display name
- headline
- bio
- avatar
- main social link
- primary CTA label

### UX note
Harus terasa sederhana, bukan seperti form panjang yang melelahkan.

## 5.7 Onboarding — Add First Project
### Purpose
Memaksa proof masuk sejak awal.

### Fields
- title
- role
- summary
- outcome
- thumbnail
- project link optional

### Reason
Proof adalah pembeda utama Lynknov dari bio tool biasa.

## 5.8 Onboarding — Setup CTA & Inquiry
### Purpose
Menentukan next action yang akan ditawarkan ke visitor.

### Fields
- CTA label
- CTA type
- inquiry form enabled/disabled
- form success message

## 5.9 Onboarding — Publish Success
### Purpose
Memberi momentum emosional dan langsung menunjukkan hasil.

### Content
- page URL
- share CTA
- go to dashboard
- view live page

## 5.10 Dashboard Overview
### Purpose
Menyajikan snapshot bisnis ringan.

### Modules
- page status
- profile completion
- views summary
- CTA clicks
- recent leads
- quick actions

### Primary actions
- edit page
- view live page
- view leads
- update projects

## 5.11 Builder / Page Editor
### Purpose
Tempat mengatur struktur halaman publik.

### MVP editing model
Bukan drag-and-drop bebas. Gunakan list of sections yang bisa:
- enable / disable
- edit content
- reorder

### Sections in MVP
- hero
- about
- projects
- testimonials
- offers / CTA
- contact form

### UX layout suggestion
- left sidebar: sections list
- main panel: form editor
- top bar: preview / publish

## 5.12 Projects Manager
### Purpose
Mengelola proof cards.

### Actions
- create
- edit
- delete
- reorder
- mark featured

## 5.13 Testimonials Manager
### Purpose
Menambah trust signals.

### Actions
- create
- edit
- delete
- reorder

## 5.14 Leads Inbox
### Purpose
Tempat owner melihat incoming inquiries.

### Data shown
- lead name
- email
- project type
- budget range
- message preview
- status
- submission date

### Actions
- view detail
- update lead status
- copy email

## 5.15 Analytics Summary
### Purpose
Memberi insight sederhana yang langsung bisa ditindaklanjuti.

### Metrics MVP
- total page views
- total CTA clicks
- total form submissions
- recent activity

### Future note
Belum perlu funnel analytics kompleks di MVP.

## 5.16 Settings
### Purpose
Mengelola data dasar account / profile.

### Include
- profile basics
- public slug
- account preferences

## 6. Public Page Structure

Urutan render yang disarankan:
1. hero identity
2. short about
3. featured projects
4. testimonials
5. offers or CTA band
6. contact / inquiry form

### Reasoning
Urutan ini mengikuti logika:
**identity → trust → proof → action**

## 7. UX States to Design Explicitly

Desain harus mencakup state berikut:
- empty state profile
- empty state projects
- no testimonials yet
- draft page not published
- published successfully
- no leads yet
- analytics still empty
- slug already taken
- save success
- publish failed

## 8. Critical User Frictions to Avoid

- onboarding terlalu panjang
- user bingung apa yang harus diisi dulu
- editor terlalu rumit
- user publish tanpa proof
- dashboard terlalu sepi dan tidak informatif
- visitor tidak melihat CTA yang jelas

## 9. Interaction Rules

### Rule 1
Jika profile belum cukup lengkap, dashboard harus menampilkan progress completion.

### Rule 2
Jika belum ada project, builder harus mendorong user menambah proof dulu.

### Rule 3
Jika page belum published, public URL tidak boleh aktif untuk umum.

### Rule 4
Setelah lead masuk, dashboard harus menonjolkan recent activity agar user merasakan value.

## 10. Founder Test Flow

Flow yang harus kamu tes sendiri:
1. create account
2. isi profile sebagai founder
3. tambah minimal 2 project
4. publish page
5. buka page dari browser lain
6. isi form inquiry test
7. cek apakah lead masuk ke dashboard
8. cek apakah page view dan form submission tercatat

Jika flow ini terasa mulus, MVP sudah berada di jalur yang benar.

## 11. Deliverables for Design Stage

Turunan dari dokumen ini:
- wireframe onboarding
- wireframe dashboard
- wireframe builder
- wireframe public page
- wireframe leads inbox
- UI states inventory

## 12. Final UX Decision

MVP Lynknov harus didesain untuk satu outcome utama:

**user bisa bergerak dari “belum punya business hub” menjadi “punya halaman live yang siap menangkap peluang” secepat mungkin.**

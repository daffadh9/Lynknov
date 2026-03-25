# Lynknov — Build Backlog & Sprint Breakdown

## Document Metadata

| Field | Value |
|---|---|
| Product | Lynknov |
| Code | OPS-04 |
| Type | Delivery / Execution |
| Status | Execution-ready v1 |
| Objective | Mengubah scope MVP menjadi backlog kerja nyata yang siap dibangun sprint demi sprint |

## 1. Executive Summary

Dokumen ini adalah jembatan dari strategi ke eksekusi. Isinya bukan teori produk, tetapi daftar kerja nyata yang bisa dipakai untuk membangun Lynknov MVP secara terstruktur.

## 2. Delivery Principle

Backlog Lynknov harus mengikuti logika ini:
- bangun fondasi dulu
- pastikan user bisa activate
- pastikan user bisa publish
- pastikan visitor bisa convert
- pastikan owner bisa melihat hasil

## 3. MVP Outcome Milestones

Milestone yang benar untuk Lynknov:
1. user bisa sign up dan sign in
2. user bisa menyelesaikan onboarding
3. user bisa mengisi profile dan project
4. user bisa publish public page
5. visitor bisa mengirim lead
6. owner bisa melihat lead dan analytics dasar

## 4. Epic Overview

- Epic 01 — Project Foundation
- Epic 02 — Auth & Workspace Setup
- Epic 03 — Onboarding Activation
- Epic 04 — Profile & Identity Management
- Epic 05 — Projects & Testimonials
- Epic 06 — Public Page Builder
- Epic 07 — Publishing System
- Epic 08 — Lead Capture
- Epic 09 — Analytics Basics
- Epic 10 — Dashboard Overview
- Epic 11 — QA, Hardening, and Founder Validation

## 5. Detailed Backlog

## Epic 01 — Project Foundation
### Goal
Menyiapkan repo dan fondasi teknis.

### Tasks
- initialize Next.js app with TypeScript and App Router
- install Tailwind and UI primitives
- setup Supabase project
- setup environment variables
- define folder architecture
- setup linting and formatting
- setup base layout and route groups
- create docs folder inside repo

### Definition of done
- app runs locally
- repo structure locked
- Supabase connected

## Epic 02 — Auth & Workspace Setup
### Goal
Menyediakan access layer user.

### Tasks
- implement sign up
- implement sign in
- implement sign out
- implement auth guard for private routes
- create workspace on first sign up
- create initial profile record
- route authenticated user to onboarding or dashboard

### Definition of done
- new user can register and get workspace automatically
- returning user can access dashboard

## Epic 03 — Onboarding Activation
### Goal
Membawa user dari account kosong menjadi siap setup halaman.

### Tasks
- build onboarding welcome screen
- build use case selection step
- build profile setup step
- build add first project step
- build CTA/form setup step
- build onboarding progress indicator
- persist onboarding data across steps
- build publish success step

### Definition of done
- user can complete all onboarding steps without manual intervention

## Epic 04 — Profile & Identity Management
### Goal
Memberi tempat untuk mengelola profile publik.

### Tasks
- build profile editor form
- support avatar upload
- support short bio and headline
- support social links CRUD
- support primary CTA config
- build profile completeness calculation

### Definition of done
- user can fully edit core public identity

## Epic 05 — Projects & Testimonials
### Goal
Menyediakan proof layer.

### Tasks
- build project CRUD
- build project image upload
- support project ordering
- support featured project flag
- build testimonial CRUD
- support testimonial ordering

### Definition of done
- user can add and manage proof blocks

## Epic 06 — Public Page Builder
### Goal
Menyusun halaman publik secara opinionated.

### Tasks
- build builder layout shell
- create sections list UI
- support enable/disable section
- support reorder sections
- build section editors for hero, about, projects, testimonials, CTA, contact
- build preview mode
- persist section content to database

### Definition of done
- user can structure and edit a complete public page without coding

## Epic 07 — Publishing System
### Goal
Membuat page dapat diakses publik.

### Tasks
- implement slug generation and uniqueness check
- implement draft/published state
- build publish action
- build unpublish action
- render public page route `/p/[slug]`
- build SEO title and description support
- build not-found/inactive page state

### Definition of done
- published pages are publicly accessible and draft pages are not

## Epic 08 — Lead Capture
### Goal
Menangkap peluang dari visitor.

### Tasks
- build inquiry form UI on public page
- validate form submission
- store lead in database
- save source page reference
- build leads inbox list
- build lead detail view
- build lead status update action

### Definition of done
- visitor can submit inquiry and owner can see it in dashboard

## Epic 09 — Analytics Basics
### Goal
Memberi sinyal value ke owner.

### Tasks
- capture page view events
- capture CTA click events
- capture form submission events
- create analytics query helpers
- build summary cards for dashboard
- build recent activity feed

### Definition of done
- dashboard shows basic page and action metrics

## Epic 10 — Dashboard Overview
### Goal
Menyatukan operasional inti.

### Tasks
- build dashboard overview screen
- show profile completion
- show page status
- show analytics summary
- show recent leads
- add quick action cards

### Definition of done
- dashboard feels like operational home, not empty admin page

## Epic 11 — QA, Hardening, and Founder Validation
### Goal
Menjamin flow utama layak dipakai.

### Tasks
- test onboarding flow end-to-end
- test publish flow end-to-end
- test lead submission end-to-end
- test analytics event recording
- test mobile responsiveness
- test empty/loading/error states
- fix critical UX friction
- create founder profile and publish real page

### Definition of done
- founder can use product for real scenario

## 6. Suggested Sprint Breakdown

## Sprint 0 — Setup and Architecture
### Focus
Foundation only.

### Target output
- repo initialized
- Supabase connected
- auth pattern chosen
- schema migration draft ready

## Sprint 1 — Auth + Onboarding Base
### Focus
Activation.

### Target output
- sign up/sign in works
- workspace auto-created
- onboarding skeleton works

## Sprint 2 — Profile + Projects
### Focus
Identity and proof.

### Target output
- profile editor works
- project CRUD works
- testimonial CRUD basic works

## Sprint 3 — Builder + Public Page
### Focus
Publishing core.

### Target output
- sections editable
- preview works
- public page route renders
- publish action works

## Sprint 4 — Leads + Analytics + Dashboard
### Focus
Business signal loop.

### Target output
- inquiry form works
- leads inbox works
- analytics basics work
- dashboard overview works

## Sprint 5 — QA + Founder Live Test
### Focus
Stabilization.

### Target output
- founder live page published
- critical bugs fixed
- MVP ready for early showcase

## 7. Build Order Recommendation

Jangan bangun berdasarkan komponen paling keren. Bangun berdasarkan chain berikut:

**auth → onboarding → profile → projects → builder → publish → leads → analytics → polish**

## 8. Task Format for Daily Execution

Gunakan format task seperti ini di repo atau project board:

```md
## Task
Build project CRUD for workspace owner

## Why
Projects are core proof blocks for MVP trust-building

## Input
- schema: projects
- screen: projects manager
- flow: onboarding add first project

## Done when
- create/edit/delete works
- image upload works
- records only visible to owner
```

## 9. Acceptance Criteria per Outcome

### Outcome A — Activation
- user can create account
- user gets workspace automatically
- user can complete onboarding

### Outcome B — Publishability
- user can build page sections
- page can be published to slug
- public page displays correct content

### Outcome C — Conversion Capture
- visitor can submit inquiry
- owner can see inquiry in dashboard
- CTA clicks and submissions are tracked

### Outcome D — Perceived Value
- dashboard shows enough signal for user to feel product is useful

## 10. What To Defer If Time Is Tight

Jika harus memangkas lagi, tunda dulu:
- testimonial manager lengkap
- offer cards kompleks
- advanced analytics visualization
- theme customization luas
- settings yang terlalu dalam

Jangan tunda:
- auth
- onboarding
- project proof
- publish flow
- lead capture
- dashboard summary

## 11. Recommended Tools for Execution

### Product / docs
- markdown docs inside repo
- simple kanban or task tracker

### Design
- Figma atau langsung low-fidelity in code

### Build
- Next.js
- Supabase
- Vercel

### Testing
- founder manual QA
- seeded demo content

## 12. Founder Weekly Rhythm

Ritme yang disarankan:
- awal minggu: pilih sprint target
- tengah minggu: fokus build outcome utama
- akhir minggu: founder QA di flow nyata
- tutup minggu: update backlog dan putuskan scope minggu depan

## 13. Immediate Next Actions

Setelah dokumen ini selesai, yang perlu kamu lakukan:
1. create clean repo folder `E:\Lynknov`
2. masukkan seluruh docs ke repo
3. setup Next.js app
4. setup Supabase project
5. buat migration awal untuk core schema
6. mulai Sprint 0

## 14. Final Execution Decision

Lynknov harus dibangun sebagai produk yang **cepat mencapai page live dan cepat menghasilkan signal bisnis**, bukan sebagai sistem besar yang lama jadi tetapi tidak segera memberi value.

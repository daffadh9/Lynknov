# Technical Architecture

## Document Metadata

| Field | Value |
|---|---|
| Product | Lynknov |
| Code | DOC-06 |
| Type | Engineering Foundation |
| Status | Founder-ready v2 |
| Objective | Menentukan stack, arsitektur aplikasi, auth, data, infra, dan direction implementasi |

## Executive Summary

Technical architecture Lynknov harus sejalan dengan positioning produk: modular, cepat dibangun, mudah diiterasi, dan cukup kuat untuk tumbuh dari MVP ke business OS ringan.

Prioritas fase awal:
- shipping speed
- maintainability
- clean data model
- scalable enough, not overengineered
- mendukung public pages + dashboard + lead capture + analytics events

## 1. Recommended Stack

### Frontend
- Next.js
- TypeScript
- App Router
- Tailwind CSS
- component system internal atau shadcn/ui style approach

### Backend / BaaS
- Supabase
- Postgres
- Supabase Auth
- Storage
- Row Level Security

### Deployment
- Vercel untuk web app
- Supabase untuk database, auth, storage

### Payments Direction
- Stripe sebagai arah global
- Midtrans / Xendit bisa dipertimbangkan kemudian jika fokus pasar Indonesia sangat kuat

### Analytics Direction
- event table internal + optional external analytics
- jangan bergantung total pada analytics pihak ketiga untuk core product signals

## 2. Architecture Principles

### Modular
Pisahkan domain berdasarkan capability:
- identity
- portfolio
- commerce
- leads
- analytics
- billing

### Product-first schema
Schema harus mengikuti produk, bukan mengikuti tabel generik yang membingungkan.

### Public/private separation
Public pages harus cepat dan aman, dashboard harus punya boundary yang jelas.

### Event-conscious
Dari awal, tracking event dasar perlu disiapkan karena Lynknov punya arah ke lead intelligence.

## 3. Recommended App Structure

```text
app/
├── (marketing)/
├── onboarding/
├── dashboard/
├── builder/
├── p/
│   └── [slug]/
├── checkout/
└── api/
```

### Notes
- `p/[slug]` untuk public profile pages
- `builder/` untuk editor
- `dashboard/` untuk operational views
- `onboarding/` untuk activation flow

## 4. Domain Modules

### Identity module
- profile basics
- hero content
- social links
- trust stats

### Portfolio module
- projects
- testimonials
- proof blocks

### Commerce module
- offers
- CTA definitions
- payment/booking links

### Leads module
- form definitions
- submissions
- lead status
- source metadata

### Analytics module
- page view events
- CTA events
- form events

## 5. Supabase Schema Overview

### Core tables
- `users`
- `workspaces`
- `profiles`
- `pages`
- `page_sections`
- `projects`
- `testimonials`
- `offers`
- `lead_forms`
- `lead_submissions`
- `lead_events`
- `analytics_events`
- `domains`
- `subscriptions`

### Example data relationships
- satu `user` bisa punya satu atau beberapa `workspaces`
- satu `workspace` punya satu `profile`
- satu `profile` punya satu atau beberapa `pages`
- satu `page` punya banyak `page_sections`
- satu `workspace` punya banyak `projects`, `offers`, `lead_submissions`

## 6. Suggested Minimal Schema Definitions

### profiles
- id
- workspace_id
- display_name
- headline
- bio
- avatar_url
- primary_cta_label
- primary_cta_type
- theme_settings
- created_at
- updated_at

### pages
- id
- workspace_id
- slug
- title
- status
- seo_title
- seo_description
- published_at

### page_sections
- id
- page_id
- section_type
- position
- is_enabled
- content_json

### lead_submissions
- id
- workspace_id
- page_id
- form_id
- name
- email
- project_type
- budget_range
- timeline
- message
- source_ref
- status
- submitted_at

### analytics_events
- id
- workspace_id
- page_id
- event_type
- visitor_id
- metadata_json
- created_at

## 7. Auth Strategy

### Early stage
Gunakan Supabase Auth dengan:
- email magic link
- Google login optional
- session management standar

### Why
- cepat diimplementasikan
- mengurangi friksi onboarding
- aman untuk MVP
- cukup untuk dashboard + builder

## 8. Storage Strategy

Gunakan Supabase Storage untuk:
- avatars
- project thumbnails
- page assets
- downloadable files ringan

Atur bucket terpisah jika perlu:
- `avatars`
- `projects`
- `public-assets`
- `workspace-assets`

## 9. Public Rendering Strategy

### Recommended
Public pages di-render cepat dan stabil.
Pilihan awal yang masuk akal:
- server rendering atau static generation with revalidation untuk public pages
- dashboard tetap dynamic

### Why
- public pages butuh performance
- SEO lebih baik
- pengalaman visitor lebih meyakinkan

## 10. API / Server Actions Direction

Gunakan pattern yang sederhana dan maintainable:
- server actions untuk operasi kecil yang dekat dengan UI
- route handlers untuk webhook, public endpoints, dan event ingestion
- validasi dengan schema validation

## 11. Analytics Event Direction

Event dasar yang harus ada:
- `page_view`
- `cta_click`
- `offer_click`
- `form_open`
- `form_submit`

Ini penting karena nanti Lynknov ingin bergerak ke lead intelligence dan AI recommendations.

## 12. AI Layer Direction

Jangan terlalu dini membuat AI jadi pusat produk.
Gunakan AI pertama kali untuk:
- copy suggestions
- headline suggestions
- section improvement prompts
- CTA suggestions
- page diagnostics ringan

Fokus AI harus membantu hasil, bukan menjadi gimmick.

## 13. Billing Direction

Billing bisa dimulai dengan:
- subscription status di tabel `subscriptions`
- webhook sync dari provider payment
- feature gating di application layer

Jangan bangun billing engine custom dari nol untuk MVP.

## 14. Environment Strategy

Gunakan minimal:
- local
- preview
- production

### Needs
- env variables yang rapi
- service role key aman
- public env dipisah jelas
- migration discipline

## 15. Security Notes

- pakai RLS di tabel sensitif
- batasi query public
- sanitasi slug dan custom input
- validasi semua input form
- lindungi webhook endpoints
- logging error secukupnya tanpa bocor data sensitif

## 16. What Not To Overengineer Early

- microservices
- queue kompleks kecuali benar-benar perlu
- workflow engine custom
- internal CMS besar
- over-abstracted package system
- dynamic theming berlebihan

## 17. Technical Success Criteria

Arsitektur dianggap berhasil jika:
- build cepat
- struktur kode bersih
- data model mendukung iterasi produk
- public page cepat
- lead submission stabil
- analytics events tercatat
- monetization hooks mudah ditambahkan

## 18. Final Engineering Statement

**Arsitektur Lynknov harus memaksimalkan kecepatan build dan kualitas fondasi sekaligus, agar MVP bisa cepat meluncur tanpa mengorbankan arah jangka panjang menuju Interactive Business OS.**

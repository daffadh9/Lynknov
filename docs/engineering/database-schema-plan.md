# Lynknov — Database Schema Plan

## Document Metadata

| Field | Value |
|---|---|
| Product | Lynknov |
| Code | OPS-02 |
| Type | Engineering Data Plan |
| Status | Execution-ready v1 |
| Objective | Menentukan rancangan schema database MVP yang bersih, modular, dan siap diperluas |

## 1. Executive Summary

Schema Lynknov harus mendukung tiga kebutuhan sejak fase awal:
- public page publishing
- lead capture
- analytics dasar

Karena arah jangka panjang Lynknov adalah Interactive Business OS, struktur schema harus cukup modular agar identity, portfolio, commerce, dan lead engine bisa tumbuh tanpa refactor brutal.

## 2. Design Principles

### Single source of truth per domain
Setiap domain punya tabel inti yang jelas.

### Workspace-first
Semua data bisnis sebaiknya terikat ke `workspace_id` agar mudah berkembang ke multi-project atau team mode di masa depan.

### Flexible content via structured JSON where appropriate
Untuk section content, gunakan `content_json` agar MVP bisa bergerak cepat tanpa menambah terlalu banyak tabel granular.

### Strict enough for reporting
Event dan lead submissions tetap harus punya field penting yang eksplisit agar analytics dasar dan filtering tidak sulit.

## 3. Domain Overview

Domain data MVP:
- identity
- portfolio
- public page
- leads
- analytics
- publishing
- subscriptions placeholder

## 4. Recommended Core Tables

### 4.1 users
Mewakili user auth dari Supabase.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key, mirror auth.users.id |
| email | text | unique |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### 4.2 workspaces
Container utama untuk data user.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| owner_user_id | uuid | references users.id |
| name | text | workspace display name |
| plan_type | text | free, pro, future |
| status | text | active, paused, archived |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### 4.3 profiles
Representasi identity publik utama.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| workspace_id | uuid | references workspaces.id |
| display_name | text | nama utama |
| headline | text | positioning statement |
| bio | text | ringkasan singkat |
| avatar_url | text | storage path / public url |
| location_label | text | optional |
| email_public | text | optional |
| primary_cta_label | text | contoh: Book a Project |
| primary_cta_type | text | inquiry, external_link, email |
| primary_cta_value | text | target CTA |
| theme_settings | jsonb | warna, style mode, layout preference |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### 4.4 social_links
Social links dipisah agar mudah diatur dan diurutkan.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| workspace_id | uuid | references workspaces.id |
| platform | text | linkedin, instagram, github, x, dribbble |
| label | text | optional custom label |
| url | text | full URL |
| position | int | urutan |
| is_enabled | boolean | default true |
| created_at | timestamptz | default now() |

### 4.5 pages
Entitas public page.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| workspace_id | uuid | references workspaces.id |
| profile_id | uuid | references profiles.id |
| slug | text | unique |
| title | text | page title |
| status | text | draft, published, archived |
| seo_title | text | optional |
| seo_description | text | optional |
| published_at | timestamptz | nullable |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### 4.6 page_sections
Sections untuk render halaman secara opinionated.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| page_id | uuid | references pages.id |
| workspace_id | uuid | references workspaces.id |
| section_type | text | hero, about, projects, testimonials, cta, contact |
| position | int | urutan render |
| is_enabled | boolean | default true |
| content_json | jsonb | payload content |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### 4.7 projects
Proof utama user.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| workspace_id | uuid | references workspaces.id |
| title | text | project title |
| slug | text | optional |
| client_name | text | optional |
| role_label | text | contoh: Product Designer |
| summary | text | short summary |
| outcome | text | result / impact singkat |
| thumbnail_url | text | image path |
| project_url | text | optional external link |
| tags | text[] | optional |
| is_featured | boolean | default false |
| position | int | urutan |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### 4.8 testimonials
Testimonial sederhana.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| workspace_id | uuid | references workspaces.id |
| name | text | pemberi testimonial |
| role_or_company | text | optional |
| quote | text | isi testimonial |
| avatar_url | text | optional |
| position | int | urutan |
| is_enabled | boolean | default true |
| created_at | timestamptz | default now() |

### 4.9 offers
Placeholder offer cards awal untuk CTA komersial ringan.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| workspace_id | uuid | references workspaces.id |
| title | text | nama layanan / offer |
| short_description | text | deskripsi ringkas |
| price_label | text | optional, starting at... |
| cta_label | text | contoh: Inquire Now |
| cta_type | text | inquiry, external_link |
| cta_value | text | target action |
| is_enabled | boolean | default true |
| position | int | urutan |
| created_at | timestamptz | default now() |

### 4.10 lead_forms
Definisi form per page bila kelak perlu variasi.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| workspace_id | uuid | references workspaces.id |
| page_id | uuid | references pages.id |
| name | text | internal name |
| form_type | text | inquiry_default |
| success_message | text | optional |
| is_enabled | boolean | default true |
| created_at | timestamptz | default now() |

### 4.11 lead_submissions
Lead masuk dari visitor.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| workspace_id | uuid | references workspaces.id |
| page_id | uuid | references pages.id |
| form_id | uuid | references lead_forms.id |
| name | text | visitor name |
| email | text | visitor email |
| company | text | optional |
| project_type | text | optional |
| budget_range | text | optional |
| timeline | text | optional |
| message | text | inquiry body |
| source_ref | text | optional campaign/source |
| lead_status | text | new, contacted, qualified, closed |
| visitor_id | text | anonymous visitor key |
| user_agent | text | optional |
| submitted_at | timestamptz | default now() |

### 4.12 analytics_events
Event mentah untuk page insights.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| workspace_id | uuid | references workspaces.id |
| page_id | uuid | references pages.id |
| event_type | text | page_view, cta_click, form_submit |
| event_name | text | optional human-readable event |
| visitor_id | text | anonymous id |
| session_id | text | optional |
| referrer | text | optional |
| pathname | text | path/page slug |
| metadata_json | jsonb | event details |
| created_at | timestamptz | default now() |

### 4.13 domains
Placeholder untuk custom domain future.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| workspace_id | uuid | references workspaces.id |
| domain_name | text | unique |
| verification_status | text | pending, verified, failed |
| connected_page_id | uuid | nullable |
| created_at | timestamptz | default now() |

### 4.14 subscriptions
Placeholder monetization.

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| workspace_id | uuid | references workspaces.id |
| provider | text | stripe, xendit, manual |
| provider_customer_id | text | optional |
| provider_subscription_id | text | optional |
| plan_code | text | free, pro |
| status | text | active, trialing, canceled |
| current_period_end | timestamptz | nullable |
| created_at | timestamptz | default now() |

## 5. Recommended Relationships

```text
users (1) ── (N) workspaces
workspaces (1) ── (1) profiles
workspaces (1) ── (N) social_links
workspaces (1) ── (N) pages
pages (1) ── (N) page_sections
workspaces (1) ── (N) projects
workspaces (1) ── (N) testimonials
workspaces (1) ── (N) offers
pages (1) ── (N) lead_forms
lead_forms (1) ── (N) lead_submissions
pages (1) ── (N) analytics_events
workspaces (1) ── (N) subscriptions
```

## 6. Minimal Enum Direction

Gunakan enum database atau check constraint untuk field penting berikut:
- `pages.status`: draft, published, archived
- `profiles.primary_cta_type`: inquiry, external_link, email
- `page_sections.section_type`: hero, about, projects, testimonials, offers, cta, contact
- `lead_submissions.lead_status`: new, contacted, qualified, won, lost, archived
- `analytics_events.event_type`: page_view, cta_click, form_submit
- `workspaces.plan_type`: free, pro

## 7. Suggested Indexing

Tambahkan indexing untuk:
- `pages.slug`
- `projects.workspace_id`
- `testimonials.workspace_id`
- `lead_submissions.workspace_id`
- `lead_submissions.page_id`
- `lead_submissions.submitted_at`
- `analytics_events.workspace_id`
- `analytics_events.page_id`
- `analytics_events.created_at`
- kombinasi `analytics_events(page_id, event_type, created_at)`

## 8. RLS Direction

### Private tables
Hanya owner workspace yang bisa read/write:
- profiles
- social_links
- pages
- page_sections
- projects
- testimonials
- offers
- lead_forms
- lead_submissions
- subscriptions
- domains

### Public-safe actions
- insert ke `lead_submissions` dari public form dengan guard tertentu
- insert event ke `analytics_events` untuk event publik tertentu melalui API route / server action, bukan akses bebas langsung dari client publik

## 9. Storage Plan

Bucket yang disarankan:
- `avatars`
- `project-covers`
- `testimonial-avatars`
- `workspace-assets`

Naming approach:
- `{workspace_id}/avatars/main-{timestamp}.webp`
- `{workspace_id}/projects/{project_id}/cover.webp`

## 10. Derived Views yang Berguna

Setelah MVP dasar stabil, buat materialized view atau SQL views ringan:
- `workspace_lead_summary`
- `page_analytics_summary`
- `workspace_profile_completion`

Contoh `page_analytics_summary`:
- total page views
- unique visitors kasar
- total CTA clicks
- total form submissions
- conversion sederhana

## 11. Example JSON for page_sections.content_json

### Hero section
```json
{
  "eyebrow": "Product Designer & Builder",
  "headline": "I help digital products feel clearer, sharper, and more conversion-ready.",
  "subheadline": "Available for freelance projects, design systems, and product strategy work.",
  "primaryCta": {
    "label": "Start a Project",
    "type": "inquiry"
  },
  "secondaryCta": {
    "label": "View Projects",
    "type": "scroll_to",
    "value": "projects"
  }
}
```

### Contact section
```json
{
  "title": "Let’s discuss your project",
  "description": "Share your goals, timeline, and budget range.",
  "showFields": ["name", "email", "project_type", "budget_range", "message"]
}
```

## 12. Migration Priority Order

Urutan migrasi awal yang disarankan:
1. users sync helper
2. workspaces
3. profiles
4. social_links
5. pages
6. page_sections
7. projects
8. testimonials
9. offers
10. lead_forms
11. lead_submissions
12. analytics_events
13. domains
14. subscriptions

## 13. What Not To Overbuild Yet

Belum perlu di MVP:
- polymorphic relational monster untuk semua jenis section
- event warehouse kompleks
- full CRM relational graph
- multi-tenant seat permission matrix yang rumit
- checkout line items dan invoices penuh

## 14. Final Schema Decision

Untuk MVP, schema terbaik adalah:
- **workspace-first**
- **opinionated page structure**
- **events and leads explicitly modeled**
- **future commerce and custom domain ready, but not overbuilt**

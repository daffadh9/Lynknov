# Lynknov Documentation & Execution Master Index

## Tujuan
File ini adalah navigator utama untuk seluruh fondasi Lynknov.
Gunakan file ini sebagai source of orientation sebelum membaca dokumen lain atau memberi prompt ke agent.

---

## Product Identity
**Lynknov** adalah **Interactive Business OS** untuk founder, freelancer, creator, dan business owner.

Pilar utamanya:
1. Identity
2. Portfolio
3. Commerce
4. Lead Engine

Produk ini **bukan sekadar bio tool** dan **bukan sekadar page builder**.
Arah besarnya adalah menjadi sistem operasional identitas bisnis digital yang membantu user membangun presence, menunjukkan value, menangkap peluang, dan berkembang menjadi mesin bisnis.

---

## Folder Map

```text
docs/
├── foundation/
├── strategy/
├── product/
├── engineering/
├── execution/
└── delivery/

prompts/
├── sprint-0-setup.md
├── sprint-1-core-build.md
├── sprint-2-builder-completion-founder-usability.md
├── sprint-3-publish-polish-lead-review-mvp-readiness.md
├── sprint-4-founder-validation-improvements-mvp-refinement.md
└── sprint-5-pre-beta-readiness-early-monetization-layer.md
```

---

## Recommended Reading Order

### Phase 1 — Foundation
Baca ini dulu:
1. `docs/foundation/index.md`
2. `docs/foundation/folder-architecture-guide.md`
3. `docs/foundation/repo-structure.md`
4. `docs/foundation/document-placement-guide.md`

### Phase 2 — Strategic Thinking
Lanjut ke:
1. `docs/strategy/brand-identity-positioning.md`
2. `docs/strategy/product-master-blueprint.md`
3. `docs/strategy/business-model-monetization.md`

### Phase 3 — Product Definition
Lanjut ke:
1. `docs/product/mvp-scope-feature-prioritization.md`
2. `docs/product/ux-flow-information-architecture.md`
3. `docs/product/prd-mvp.md`
4. `docs/product/screen-map-user-flow-detail.md`

### Phase 4 — Build Foundation
Lanjut ke:
1. `docs/engineering/technical-architecture.md`
2. `docs/engineering/database-schema-plan.md`

### Phase 5 — Execution
Lanjut ke:
1. `docs/execution/90-day-build-roadmap.md`
2. `docs/execution/build-backlog-sprint-breakdown.md`
3. `docs/execution/next-steps-after-docs.md`

### Phase 6 — Sprint Delivery
Saat mulai coding, pakai:
1. `prompts/sprint-0-setup.md`
2. `prompts/sprint-1-core-build.md`
3. `prompts/sprint-2-builder-completion-founder-usability.md`
4. `prompts/sprint-3-publish-polish-lead-review-mvp-readiness.md`
5. `prompts/sprint-4-founder-validation-improvements-mvp-refinement.md`
6. `prompts/sprint-5-pre-beta-readiness-early-monetization-layer.md`

---

## Best Build Sequence

### Sprint 0
Goal:
- setup repo
- setup Next.js
- setup Supabase
- setup auth skeleton
- setup onboarding/dashboard skeleton

### Sprint 1
Goal:
- auth
- onboarding
- profile persistence
- default draft page
- public page render by slug
- lead form submit
- analytics basic

### Sprint 2
Goal:
- builder usable
- section editing complete
- dashboard more useful
- portfolio management basic

### Sprint 3
Goal:
- publish flow complete
- public page polish
- lead inbox basic
- analytics summary
- MVP readiness

### Sprint 4
Goal:
- founder validation improvements
- friction reduction
- refinement based on real usage

### Sprint 5
Goal:
- pre-beta readiness
- release quality uplift
- monetization-aware foundation ringan

---

## What Counts as Success

### MVP success
Lynknov dianggap hidup ketika:
- user bisa login
- user bisa onboarding
- user bisa bikin / edit page
- user bisa publish
- user bisa menerima lead
- user bisa melihat signal performa dasar

### Founder validation success
Lynknov dianggap layak lanjut ketika:
- founder mau pakai untuk dirinya sendiri
- page hasil publish terasa kredibel
- lead flow terasa nyata
- dashboard membantu pengambilan tindakan
- friction utama sudah terlihat jelas

### Pre-beta success
Lynknov dianggap siap trusted usage ketika:
- flow stabil
- UX cukup jelas
- quality baseline cukup kuat
- repo cukup rapi
- MVP tidak melebar liar

---

## Rules During Build

### Wajib
- jadikan `docs/` sebagai source of truth
- build per sprint
- review hasil agent setiap sprint
- jaga scope tetap MVP
- prioritaskan flow yang menghasilkan value

### Jangan
- jangan tambah marketplace terlalu awal
- jangan tambah AI suite terlalu awal
- jangan tambah billing terlalu awal
- jangan polish visual sebelum flow inti stabil
- jangan lompat sprint kalau sprint sebelumnya belum stabil

---

## Quick Start for You

Saat repo sudah siap:
1. extract semua pack ke `E:\Lynknov`
2. baca file ini
3. cek `docs/foundation/`
4. cek `docs/strategy/`
5. setup repo dan Supabase
6. jalankan migration awal
7. kasih agent prompt Sprint 0
8. review hasil
9. lanjut Sprint 1
10. teruskan bertahap

---

## Repo Audit Intake
Kalau mau audit repo dengan akurat, siapkan salah satu:
1. hasil `tree /F` dari root project
2. zip project
3. screenshot struktur folder IDE
4. link repo / file source yang bisa dibaca

Yang paling ideal:
- `tree /F`
- daftar file root
- folder `src` atau `app/features/lib/docs/supabase`

---

## Recommended Root Structure

```text
E:\Lynknov
├── docs/
├── prompts/
├── app/
├── components/
├── features/
├── lib/
├── public/
├── supabase/
├── scripts/
├── types/
├── package.json
├── tsconfig.json
├── next.config.ts
└── .env.local
```

---

## Final Principle
Lynknov harus dibangun sebagai:
- tajam
- founder-first
- operational
- scalable
- disciplined

Bukan sekadar keren, tapi harus terasa seperti sistem bisnis yang benar-benar bisa dipakai.

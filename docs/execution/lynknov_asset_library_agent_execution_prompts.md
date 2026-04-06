# Lynknov Asset Library — Agent Execution Prompts (File-by-File)

## 1) Tujuan dokumen

Dokumen ini dibuat untuk langsung dipakai saat eksekusi coding menggunakan agent seperti Claude Code, Gemini, Codex, atau agent lain.

Berbeda dari dokumen sebelumnya yang berfokus pada arah produk, UX, dan arsitektur, dokumen ini jauh lebih praktis:
- prompt sudah dibagi per fase
- prompt sudah dibagi per area file
- prompt sudah diarahkan agar agent tidak keluar jalur
- prompt sudah disusun supaya implementasi bertahap, rapi, dan scalable

Dokumen ini harus dipakai sebagai **paket prompt operasional**.

Artinya, kamu tidak perlu lagi memberi arahan dari nol setiap kali pindah task. Tinggal pilih prompt sesuai fase pengerjaan.

---

## 2) Aturan umum sebelum eksekusi ke agent

Sebelum memakai prompt mana pun di bawah ini, pastikan agent selalu memahami aturan inti berikut:

### Rule 1 — Asset Library adalah sistem global
Asset Library **bukan fitur upload milik editor**. Ia adalah fitur global di level workspace Lynknov.

### Rule 2 — Editor hanya consumer
Public Page Editor, Portfolio, Commercial Hub, dan pillar lain hanya mengonsumsi sistem ini lewat Asset Picker atau contextual asset access.

### Rule 3 — UI harus premium
Hasil visual harus tetap mengikuti kualitas Lynknov:
- dark premium graphite
- tidak flat monoton
- spacing lega
- hierarki jelas
- tidak generic SaaS uploader

### Rule 4 — Bangun modular
Pisahkan page shell, browser, cards, filters, dialogs, hooks, actions, dan types.

### Rule 5 — Jangan overbuild
Kerjakan yang termasuk MVP dulu. Struktur boleh siap berkembang, tapi jangan langsung membuat sistem terlalu besar sebelum fondasi stabil.

---

## 3) Global system prompt yang sebaiknya selalu ditempel di awal

Gunakan prompt ini sebagai pembuka sebelum semua prompt task di bawah.

```md
You are helping build Lynknov, a premium dark-mode Interactive Business OS.

We are implementing a core system called Asset Library.

Important product rules:
- Asset Library is a GLOBAL workspace-level feature, not an editor-only upload tool.
- Public Page Editor, Portfolio, Commercial Hub, and future modules must consume this system, not create separate upload systems.
- The result must feel premium, structured, calm, and scalable.
- Avoid generic SaaS uploader UI, flat black emptiness, and messy component logic.
- Build modularly with reusable components, domain hooks, and clear separation between UI and logic.
- Prioritize MVP correctness over overbuilding.

Visual direction:
- dark graphite / charcoal surfaces
- subtle gradients and premium depth
- refined borders
- clean spacing
- elegant hierarchy
- business-class UI

Architectural direction:
- strong component separation
- global Asset Library page
- reusable Asset Picker
- prepared for usage mapping

When making changes, preserve existing Lynknov premium direction and avoid regressions in unrelated areas.
```

---

# PART A — PHASE-BY-PHASE MASTER EXECUTION PROMPTS

## 4) Phase 1 Prompt — Types, constants, dan utility foundation

Gunakan prompt ini untuk membangun fondasi bahasa sistem sebelum UI besar dibuat.

```md
Using the existing Lynknov codebase, implement the foundation for the new global Asset Library system.

Your scope in this task is ONLY to create the type, constant, and utility foundation.
Do not build the full page UI yet.

Create or update the following domain-level structure for Asset Library:
- asset types
- folder types
- usage types
- source types
- sort options
- filter options
- asset-type grouping helpers
- card-mapping helpers
- formatting helpers if needed

Requirements:
1. Create clear TypeScript types for:
   - AssetType
   - AssetSourceType
   - AssetStatus
   - AssetItem
   - AssetFolder
   - AssetUsageRecord
   - AssetFiltersState
2. Prepare type coverage for:
   - image
   - video
   - audio
   - document
   - embed
   - folder
   - animation
   - font
   - other
3. Add sorting and filtering constants for MVP.
4. Add helper utilities to determine which card component should render which asset type.
5. Keep everything modular and ready for later UI integration.
6. Do not trap logic inside page files.
7. Do not over-engineer with unnecessary abstractions.

Expected output:
- clean domain types
- clear constants
- simple reusable helpers
- no broken imports
- no UI regressions

At the end, summarize:
- files created
- files updated
- type decisions made
- anything intentionally deferred
```

---

## 5) Phase 2 Prompt — Data actions dasar

Gunakan prompt ini untuk menyiapkan action layer yang bisa dipakai UI.

```md
Implement the core data action layer for Lynknov’s global Asset Library MVP.

This task is focused on actions and data access only, not full UI.

Create or update the Asset Library action layer to support:
- get assets list
- get single asset detail
- upload asset
- create folder
- rename asset
- move asset
- delete asset

Important rules:
- Asset Library is a global workspace system.
- Keep actions modular and reusable.
- Separate action logic from presentational UI.
- Prepare architecture for future usage mapping, even if the full feature is not implemented yet.

Requirements:
1. Build action files and supporting query/mutation utilities.
2. Keep naming explicit and consistent.
3. Ensure upload flow is structured to support metadata extraction later.
4. Ensure move and rename are generic enough to be reused from page view and picker contexts.
5. Delete flow should be written so a usage check can be inserted cleanly.
6. Avoid overcomplicating integrations that are not in MVP yet.

Focus on a robust MVP action layer.

At the end, report:
- files created/updated
- action responsibilities
- assumptions made about storage/data access
- what is ready now vs what is prepared for later
```

---

## 6) Phase 3 Prompt — Hooks state management

```md
Implement the state-management hooks for Lynknov’s global Asset Library MVP.

This task is ONLY about hooks and local interaction state.
Do not build the final full page UI yet.

Create hooks for:
- filter management
- asset selection
- upload state handling
- asset picker state

Requirements:
1. Create reusable hooks such as:
   - useAssetLibraryFilters
   - useAssetLibrarySelection
   - useAssetUpload
   - useAssetPicker
2. Keep the API of each hook clean and easy to consume in UI components.
3. Separate filter state from selection state.
4. Support both single selection and future bulk mode.
5. Prepare the picker hook so it can enforce allowed asset types per context.
6. Keep the implementation MVP-friendly and not overly abstract.

Important:
- Hooks must support a global Asset Library page and a contextual Asset Picker.
- Avoid mixing remote fetch logic and UI rendering concerns.

At the end, summarize:
- hook APIs
- key state handled by each hook
- how these hooks will be consumed later by page and picker components
```

---

## 7) Phase 4 Prompt — Shared UI primitives

```md
Build the shared small UI primitives for Lynknov’s Asset Library.

This task is focused on reusable presentational components only.

Create the shared components needed by the Asset Library page and Asset Picker, such as:
- search input
- view toggle
- sort menu
- stat card
- format badge
- usage badge
- compact reusable action triggers if needed

Requirements:
1. Match Lynknov’s premium dark graphite visual direction.
2. Avoid generic component styling.
3. Keep spacing, borders, and typography refined.
4. Components must be reusable across page and modal contexts.
5. Do not hardcode business logic into these components.

Expected result:
- elegant, reusable building blocks
- visually aligned with Lynknov
- ready to plug into the page shell

At the end, summarize the visual decisions and files changed.
```

---

## 8) Phase 5 Prompt — Page shell global Asset Library

```md
Implement the global Asset Library page shell for Lynknov.

Important:
This page must exist as a GLOBAL workspace-level page, not inside the Public Page Editor.

Build the high-level page structure only in this task:
- page shell
- header
- stats summary
- toolbar
- content layout containers

Do not yet spend most of the effort on detailed asset cards or dialogs.

Requirements:
1. Create the global page entry for Asset Library.
2. Build a premium header with:
   - large heading: Asset Library
   - supporting copy
   - stat cards
   - upload and folder CTA area
3. Build a command toolbar with placeholders or working controls for:
   - Upload
   - New Folder
   - Integrations
   - Search
   - Grid/List
   - Sort
   - Bulk Select
4. Build the main content layout with:
   - left filter area
   - center browser area
   - right detail area placeholder
5. Use Lynknov premium dark styling with more depth than a flat black page.
6. Preserve clean hierarchy and spacious layout.

Important:
The page should already feel like a premium workspace, not a simple uploader.

At the end, summarize:
- files created/updated
- page structure decisions
- anything left as placeholder for later phases
```

---

## 9) Phase 6 Prompt — Browser area dan type-aware cards

```md
Implement the Asset Library browser area and its type-aware asset cards for Lynknov.

This phase is focused on the center browsing experience.

Build:
- AssetBrowser
- AssetGrid
- AssetList
- AssetEmptyState
- AssetNoResultsState
- type-aware asset cards

Required card variants:
- AssetCardImage
- AssetCardVideo
- AssetCardAudio
- AssetCardDocument
- AssetCardEmbed
- AssetCardFolder
- AssetCardGeneric

Requirements:
1. Grid and list must both be supported.
2. Do NOT use one generic card for every asset type.
3. Use a shared card anatomy but render metadata according to asset type.
4. Keep the cards visually consistent while still differentiating file formats.
5. Support selected states and action menu hooks.
6. Implement empty state and no results state properly.
7. Make the browser feel premium, organized, and scalable.

Important design note:
Grid is the container system. The inner card rendering should adapt to file type.

At the end, summarize:
- card architecture
- files created/updated
- how type mapping works
- anything deferred
```

---

## 10) Phase 7 Prompt — Filter panel

```md
Implement the left filter panel for Lynknov’s global Asset Library.

This task is focused on filter UX and its presentation.

Build the filter panel and filter groups for:
- file type
- usage status
- date
- source
- optional basic tags structure if already prepared

Requirements:
1. Keep the filter rail clean and not too visually heavy.
2. Make the most important groups expanded by default.
3. Some secondary groups can be collapsible.
4. Show counts when useful.
5. Reflect selected states clearly but elegantly.
6. Integrate with the filter hook/state system already built.
7. Keep the UI premium and consistent with Lynknov.

At the end, summarize:
- files created/updated
- filter groups implemented
- any filter groups intentionally simplified for MVP
```

---

## 11) Phase 8 Prompt — Detail panel asset

```md
Implement the right-side asset detail panel for Lynknov’s global Asset Library.

This panel should appear when an asset is selected.

Build the detail panel with sections for:
- preview
- overview metadata
- usage summary
- organization info
- actions

Requirements:
1. Keep the detail panel rich but visually calm.
2. Use hierarchy and spacing so it does not feel crowded.
3. Show:
   - file name
   - type/format
   - size
   - dimensions or duration when relevant
   - created/updated info
   - folder
   - source
   - usage count or usage state
4. Include action entry points for:
   - rename
   - move
   - duplicate placeholder if needed
   - replace placeholder if needed
   - delete
5. Architecture should be ready to expand usage details later.
6. Use refined panel styling aligned with Lynknov premium UI.

At the end, summarize:
- panel structure
- files created/updated
- data used in detail view
- what is MVP-ready vs future-ready
```

---

## 12) Phase 9 Prompt — Dialogs dan action flows

```md
Implement the main dialogs and action flows for Lynknov’s Asset Library MVP.

Build these dialogs:
- upload asset dialog
- create folder dialog
- rename asset dialog
- move asset dialog
- delete asset dialog

Requirements:
1. Dialogs must be visually consistent and premium.
2. They must connect to the action layer already created.
3. Validation should be clear and user-friendly.
4. Delete dialog should be structured so a stronger usage-warning version can be added cleanly.
5. Upload dialog should support a solid MVP upload flow.
6. Rename and move must update both list and detail panel states correctly.
7. Keep the interactions tight and not overcomplicated.

At the end, summarize:
- files created/updated
- which action flows are fully wired
- what warnings/placeholders exist for future expansion
```

---

## 13) Phase 10 Prompt — Asset Picker reusable

```md
Implement the reusable Asset Picker for Lynknov.

Important:
This must be a reusable contextual component, not a second separate asset system.
It should consume the same Asset Library data and logic.

Build:
- AssetPickerModal
- picker toolbar
- picker grid
- recent assets strip or section

Requirements:
1. Picker must feel lighter than the full Asset Library page.
2. Support:
   - search
   - recent assets
   - browse library
   - upload new asset
3. Picker must support allowed-type constraints per context.
4. Picker must support single-select for hero image usage.
5. Keep the architecture reusable for future contexts.
6. Avoid copy-pasting the entire main page logic.
7. Use shared components where appropriate.

Expected result:
- a clean reusable modal for contextual asset selection
- directly usable later in Hero section and other modules

At the end, summarize:
- files created/updated
- reuse strategy
- how allowed type constraints are enforced
```

---

## 14) Phase 11 Prompt — Integrasi ke Hero section

```md
Integrate Lynknov’s new reusable Asset Picker into the Public Page Hero image flow.

Important product rule:
Do NOT create a separate hero-only upload system.
The Hero section must consume the global Asset Library system.

Scope:
- connect Hero image field to Asset Picker
- allow selecting existing image assets
- allow uploading a new image through the picker flow
- update Hero image reference
- prepare or create minimal usage mapping readiness

Requirements:
1. Hero image chooser must open the Asset Picker.
2. Picker must be constrained to valid image asset types.
3. Selecting an asset should update the hero image immediately.
4. Uploading a new asset through the picker should also work.
5. Keep the existing preview experience stable.
6. Avoid regressions in the Hero section layout.
7. Keep the code reusable so the same picker can later be used elsewhere.

At the end, summarize:
- files created/updated
- how hero now consumes the Asset Library system
- whether usage mapping is fully recorded or minimally prepared
- any follow-up needed
```

---

# PART B — SPECIALIZED PROMPTS PER AREA

## 15) Prompt khusus untuk visual polish tanpa mengubah logic besar

```md
Refine the visual design of Lynknov’s Asset Library without changing its core architecture.

Goal:
Make the page feel more premium, calm, and business-class.

Focus only on:
- spacing
- visual hierarchy
- surface depth
- border refinement
- subtle gradients
- selected states
- better header presence
- calmer browser composition

Do not:
- rewrite the action system
- restructure the whole architecture
- introduce new product scope
- break existing working flows

The result should feel less flat, less generic, and more aligned with Lynknov’s premium dark aesthetic.

At the end, summarize the visual refinements made.
```

---

## 16) Prompt khusus untuk debugging regressions

```md
Audit and fix regressions inside Lynknov’s Asset Library implementation.

Focus on:
- broken imports
- type errors
- mismatched props
- card rendering issues
- detail panel state issues
- picker integration bugs
- broken rename/move/delete/update refresh behavior

Rules:
- preserve the global Asset Library architecture
- do not revert the system back into an editor-only upload feature
- avoid unnecessary refactors outside the broken areas
- keep changes precise and minimal where possible

At the end, report:
- root causes found
- files fixed
- whether lint/type/build should now pass
```

---

## 17) Prompt khusus untuk responsive/layout polish

```md
Refine the layout responsiveness of Lynknov’s Asset Library page.

Focus on:
- desktop balance between filter rail, browser area, and detail panel
- tablet adaptation
- graceful collapsing behavior
- no cramped content
- premium spacing and proportions

Rules:
- do not simplify the experience into a generic stacked layout unless needed
- preserve the workspace feel
- keep the browser area dominant
- detail panel should not destroy the usability of the main area

At the end, summarize the responsive/layout improvements.
```

---

# PART C — MINI PROMPTS PER FILE GROUP

## 18) Prompt untuk `src/app/asset/page.tsx`

```md
Implement or refine `src/app/asset/page.tsx` as the entry page for Lynknov’s GLOBAL Asset Library.

This file should:
- act as the top-level page entry
- compose the page shell and major sections
- avoid containing too much business logic directly

Important:
This page must represent a workspace-level Asset Library, not an editor tab.

Keep the file clean, compositional, and premium in structure.
```

---

## 19) Prompt untuk folder `components/asset-library/page/`

```md
Build or refine the page-level components inside `components/asset-library/page/` for Lynknov’s Asset Library.

Focus on:
- page shell
- header
- toolbar
- content layout

Requirements:
- premium composition
- clean separation of structure and visual hierarchy
- reusable enough for future evolution
- no heavy data logic trapped in presentation components
```

---

## 20) Prompt untuk folder `components/asset-library/browser/`

```md
Build or refine the browser components inside `components/asset-library/browser/`.

Focus on:
- browser switching between empty/no-results/grid/list
- clean visual browsing experience
- scalable rendering for larger asset libraries

Make sure the browser architecture stays modular and can support file-type-aware cards cleanly.
```

---

## 21) Prompt untuk folder `components/asset-library/cards/`

```md
Build or refine the asset card system inside `components/asset-library/cards/`.

Requirements:
- shared visual system
- type-aware rendering
- premium card feel
- support for selection and quick actions

Do not collapse all asset types into a single oversimplified card.
```

---

## 22) Prompt untuk folder `components/asset-library/detail/`

```md
Build or refine the selected asset detail panel components inside `components/asset-library/detail/`.

Focus on:
- rich but calm detail presentation
- preview
- metadata grouping
- usage/organization/action sections

Keep the panel elegant and not overloaded.
```

---

## 23) Prompt untuk folder `components/asset-library/dialogs/`

```md
Build or refine the dialog components inside `components/asset-library/dialogs/` for Asset Library actions.

Dialogs should be:
- premium
- concise
- clear
- tightly connected to existing action logic

Focus on the MVP actions first:
- upload
- create folder
- rename
- move
- delete
```

---

## 24) Prompt untuk folder `components/asset-library/picker/`

```md
Build or refine the reusable Asset Picker components inside `components/asset-library/picker/`.

Important:
This is not a second asset system. It must consume the same global Asset Library architecture.

Keep it lighter than the main page, but still premium and functional.
```

---

## 25) Prompt untuk folder `features/asset-library/hooks/`

```md
Build or refine the domain hooks inside `features/asset-library/hooks/` for Lynknov’s Asset Library.

Focus on:
- filter state
- selection state
- upload state
- picker state

Hooks should have clean APIs and be easy to consume across both page and picker contexts.
```

---

## 26) Prompt untuk folder `features/asset-library/actions/`

```md
Build or refine the asset action layer inside `features/asset-library/actions/`.

Focus on the MVP actions:
- get assets
- get asset detail
- upload asset
- create folder
- rename asset
- move asset
- delete asset

Keep the action layer reusable and prepared for future usage mapping and integrations.
```

---

## 27) Prompt untuk integrasi akhir ke editor

```md
Integrate the new Lynknov Asset Picker into the editor context without turning the asset system back into an editor-owned feature.

The editor must consume the global Asset Library.

Focus on:
- replacing local upload assumptions
- using the picker for asset selection
- keeping preview updates stable
- preserving editor UX quality
```

---

# PART D — FINAL MASTER PROMPT SUPER-LENGKAP

## 28) Prompt all-in-one untuk agent yang kuat

Gunakan ini kalau kamu ingin sekali kirim prompt besar untuk agent yang memang sanggup mengerjakan task luas dengan disiplin.

```md
You are working inside Lynknov, a premium dark-mode Interactive Business OS.

We are implementing a new core system called Asset Library.

## Critical product rules
- Asset Library is a GLOBAL workspace-level system.
- It must NOT be treated as an editor-only upload feature.
- Public Page Editor, Portfolio Showcase, Commercial Hub, and future modules must consume this system through reusable contextual access.
- The first contextual consumer we will integrate is the Hero image flow.

## Visual direction
The UI must feel premium, calm, structured, and business-class.
Use Lynknov’s dark graphite / charcoal direction with subtle depth, refined borders, elegant hierarchy, and no generic SaaS uploader feeling.

## Architectural direction
Build this modularly with clear separation between:
- app entry page
- page-level components
- browser components
- type-aware cards
- filter panel
- detail panel
- dialogs
- picker components
- hooks
- action layer
- types/constants/utils

## Target file structure
Use a structure like:
- src/app/asset/page.tsx
- components/asset-library/page/*
- components/asset-library/browser/*
- components/asset-library/cards/*
- components/asset-library/detail/*
- components/asset-library/dialogs/*
- components/asset-library/picker/*
- components/asset-library/shared/*
- features/asset-library/actions/*
- features/asset-library/hooks/*
- features/asset-library/types/*
- features/asset-library/constants/*
- features/asset-library/utils/*
- lib/asset-library/*

## MVP scope
Implement the following in a stable way:
1. Global Asset Library page
2. Upload file flow
3. Create folder flow
4. Search basic
5. File type filter basic
6. Grid/list toggle
7. Rename asset
8. Move asset
9. Delete asset
10. Asset detail panel
11. Reusable Asset Picker
12. Initial Hero image integration using Asset Picker
13. Prepare minimal architecture for usage mapping

## Asset types to support in architecture
- image
- video
- audio
- document
- embed
- folder
- animation
- font
- other

## Browser requirements
Support both grid and list.
Do not use one generic card for all file types.
Use type-aware card components with a shared visual system.

## Detail panel requirements
When an asset is selected, show:
- preview
- file name
- type/format
- size
- dimensions/duration where relevant
- source
- folder
- usage state/count
- actions: rename, move, delete

## Picker requirements
The Asset Picker must:
- be reusable
- feel lighter than the full page
- support search
- support recent assets
- support upload new asset
- support allowed-type constraints
- be used in Hero image selection

## Hero integration requirements
- Hero image field opens Asset Picker
- Picker constrained to valid image types
- Selecting an asset updates hero preview immediately
- Uploading through picker also works
- Avoid regressions in Hero layout or preview stability
- Do not create a separate hero-only upload system

## Implementation style requirements
- Keep business logic out of presentational components
- Use reusable hooks for filters, selection, upload, and picker behavior
- Use clear TS types and constants
- Keep code readable and scalable
- Avoid overbuilding late-phase integrations like full Google Drive support unless scaffolding is needed

## Deliverables
Please:
1. inspect the current codebase structure
2. implement the MVP scope cleanly
3. create/update files in a modular way
4. wire the page and picker flows
5. integrate Hero image consumption of the global Asset Library
6. summarize files changed, architecture decisions, and deferred items

## Safety rule for this task
Do not degrade unrelated Lynknov premium UI. Make precise changes and preserve working areas unless they must be updated for the new asset system.
```

---

## 29) Cara pakai dokumen ini yang paling efektif

Supaya hasil agent lebih stabil, urutan pakainya sebaiknya seperti ini:

### Opsi paling aman
- mulai dari **global system prompt**
- lalu kirim **Phase 1 prompt**
- lanjut bertahap sampai **Phase 11**

Ini paling aman untuk agent yang suka ngaco kalau task terlalu besar.

### Opsi lebih cepat
- mulai dari **global system prompt**
- lalu kirim **all-in-one master prompt**
- setelah itu pakai prompt khusus debugging atau visual polish kalau ada yang kurang

Ini cocok kalau kamu pakai agent yang kuat dan cukup stabil.

### Opsi campuran
- kirim global system prompt
- kerjakan 3 phase pertama sekaligus
- cek hasil
- lanjut phase berikutnya

Ini biasanya paling balance.

---

## 30) Penutup

Dengan dokumen ini, kamu sekarang sudah punya prompt eksekusi yang jauh lebih siap tempur.

Artinya, kamu tidak perlu lagi menjelaskan dari nol soal:
- positioning global Asset Library
- kenapa bukan fitur editor doang
- kualitas visual yang diinginkan
- struktur komponen
- urutan pengerjaan
- cara integrasi ke Hero

Semua sudah disusun agar agent tinggal mengikuti jalurnya.

Kalau dipakai dengan disiplin, ini akan sangat membantu menjaga implementasi tetap:
- premium
- rapi
- tidak melebar
- tidak salah arah
- dan tetap sejalan dengan visi Lynknov sebagai **Interactive Business OS**.


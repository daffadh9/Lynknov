# Prompt — Sprint 2 Builder Completion & Founder Usability

Continue Lynknov MVP build.

## Current product framing
Lynknov is an Interactive Business OS built on:
1. Identity
2. Portfolio
3. Commerce
4. Lead Engine

For now, stay strictly inside MVP.
Do not build phase-2 or phase-3 systems.

## Assumption
Sprint 0 and Sprint 1 are already completed:
- repo structure exists
- auth works
- onboarding works
- profile persistence exists
- default draft page exists
- basic builder exists
- public page by slug exists
- lead form submit exists
- analytics events basic exist

## Goal of Sprint 2
Make the builder actually usable for founder self-testing.

## Build priorities
1. Improve builder editing experience
2. Complete section editing for hero/about/portfolio/cta
3. Add save/update flows
4. Add draft vs published state clarity
5. Add page settings basics
6. Add portfolio management basics
7. Improve dashboard overview usefulness
8. Tighten error states and empty states

## Required modules

### A. Builder UX
Implement:
- section list/sidebar
- selected section editor panel
- reorder section positions
- toggle section visibility
- save changes reliably
- unsaved changes awareness if practical

### B. Section editing
Support these section types properly:
- hero
- about
- portfolio
- cta

Each section should have editable content fields stored in `page_sections.content`.

### C. Portfolio management
Implement:
- create portfolio item
- edit portfolio item
- delete portfolio item
- feature/unfeature project
- sort order support if practical
- attach portfolio items to public page rendering

### D. Page settings
Implement:
- title
- subtitle
- slug management with validation
- seo title
- seo description
- status visibility in dashboard

### E. Dashboard usability
Improve dashboard so founder can understand:
- current page status
- number of leads
- number of views
- CTA clicks if available
- quick actions: edit page, preview page, publish page

## Technical constraints
- Keep architecture domain-based
- Avoid over-abstraction
- Prefer clear server actions or route handlers where appropriate
- Use TypeScript types clearly
- Keep Supabase usage clean and centralized when practical
- Maintain MVP scope only

## UX principles
- premium
- minimal
- serious
- founder-first
- practical over decorative
- dark modern product feel

## Important rules
- Do not add marketplace
- Do not add advanced commerce
- Do not add AI writer
- Do not add CRM pipeline complexity
- Do not add team collaboration
- Do not redesign everything from scratch

## Deliverables
Return:
1. updated route list
2. updated file tree
3. module-by-module implementation summary
4. code for important files
5. database changes if any
6. QA checklist
7. risks or TODOs kept for later

## Success criteria
At the end of Sprint 2, founder should be able to:
- log in
- finish onboarding
- manage profile basics
- edit page sections meaningfully
- manage projects
- preview page
- publish page
- see useful dashboard signals

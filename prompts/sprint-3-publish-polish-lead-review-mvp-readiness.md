# Prompt — Sprint 3 Publish Polish, Lead Review, and MVP Readiness

Continue Lynknov MVP build.

## Context
Sprint 0–2 are already done.
We now want to make Lynknov ready for internal founder usage and early MVP validation.

## Main goal of Sprint 3
Strengthen the end-to-end founder loop:
identity -> page -> publish -> lead -> review -> iterate

## Build priorities
1. Publish flow completion
2. Public page polish for MVP readiness
3. Lead inbox/review basics
4. Analytics summary improvements
5. Founder QA hardening
6. MVP readiness checklist

## Required modules

### A. Publish flow completion
Implement:
- explicit publish action
- explicit unpublish or revert to draft if practical
- publish confirmation state
- preview mode if practical
- protect invalid publish attempts
- validation before publish:
  - slug exists
  - hero section has minimum required content
  - CTA exists or contact path exists

### B. Public page quality
Improve public page with:
- better content hierarchy
- better rendering consistency across hero/about/portfolio/cta
- proper empty fallback handling
- metadata basics for SEO/Open Graph if practical
- not-found handling for invalid slugs
- published-only public visibility

### C. Lead inbox basics
Implement:
- owner-only leads list
- lead detail view or expandable rows
- lead status update:
  - new
  - contacted
  - qualified
  - closed
- basic filtering if practical

### D. Analytics summary
Implement founder-useful summaries:
- total views
- total CTA clicks
- total leads
- simple conversion ratios if practical
- recent activity summary

### E. QA hardening
Check:
- route protection
- unauthorized write prevention
- slug uniqueness
- empty state handling
- loading state handling
- form validation
- published page access behavior
- dashboard behavior with zero data

## Constraints
- Stay inside MVP
- No advanced CRM
- No team system
- No billing system yet
- No marketplace
- No big redesign detour

## Output format
Return:
1. final route map
2. final module status
3. created/updated files
4. important code
5. QA checklist
6. known gaps before public beta
7. next recommended sprint after MVP

## Success criteria
At the end of Sprint 3, I should be able to:
- use Lynknov for myself
- publish my own page
- receive leads
- review leads from dashboard/app
- observe basic performance signals
- identify what should be improved before external beta

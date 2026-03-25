# Prompt — Sprint 4 Founder Validation Improvements & MVP Refinement

Continue Lynknov after Sprint 3.

## Product context
Lynknov is an Interactive Business OS built on:
1. Identity
2. Portfolio
3. Commerce
4. Lead Engine

We are still not building the full long-term vision.
This sprint is about making the founder-first MVP stronger after internal usage.

## Assumption
Sprint 0–3 are complete and stable enough for founder testing.

## Main goal of Sprint 4
Refine the MVP based on founder friction and improve the product's usability, clarity, and confidence.

## What this sprint is about
This is not a feature explosion sprint.
This is a refinement sprint.

Focus on:
1. friction removal
2. confidence-building UX
3. better information clarity
4. stronger founder workflow
5. light monetization readiness foundations if needed

## Build priorities

### A. Founder workflow refinement
Improve friction in these loops:
- onboarding -> dashboard
- dashboard -> builder
- builder -> preview
- preview -> publish
- published page -> leads review
- dashboard -> analytics understanding

Look for:
- confusing labels
- unclear empty states
- poor navigation transitions
- weak feedback states
- missing quick actions

### B. Dashboard refinement
Improve dashboard usefulness:
- clearer hierarchy
- better quick actions
- recent leads visibility
- simple performance summary
- page health/status indication
- founder next-step guidance

### C. Builder refinement
Improve:
- better section editing clarity
- better save feedback
- clearer draft/published distinction
- more stable portfolio editing experience
- safer destructive actions if delete exists

### D. Public page refinement
Improve:
- CTA visibility
- page readability
- portfolio section quality
- contact experience
- premium but minimal presentation
- mobile responsiveness if weak

### E. Validation and QA hardening
Check:
- edge cases
- empty states
- slow loading states
- malformed content handling
- invalid slug handling
- dashboard with no analytics
- dashboard with no leads
- user with unpublished page only

### F. Light monetization readiness foundation (optional, only if repo is stable)
Do not implement billing.
Only prepare the foundation for future monetization, such as:
- plan enum in profile or account model if appropriate
- feature gating strategy notes in code comments or architecture
- free plan assumption in current UX

Keep it very light and future-facing.

## What not to build
- no payments yet
- no marketplace yet
- no advanced CRM yet
- no AI content generation yet
- no collaboration yet
- no theme marketplace yet

## Output format
Return:
1. friction issues addressed
2. route/file changes
3. important code
4. UX improvements made
5. QA checklist
6. known limitations still left
7. recommendation for Sprint 5

## Success criteria
At the end of Sprint 4:
- the product feels less fragile
- the founder flow feels smoother
- the dashboard feels more actionable
- the page feels more credible
- the MVP feels more testable in a real scenario

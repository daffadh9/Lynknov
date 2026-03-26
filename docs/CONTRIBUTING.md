# Contributing to Lynknov

Thank you for contributing to Lynknov.

This project is being built as both a real product and a portfolio-grade system. Contributions should therefore support not only functional progress, but also clarity, maintainability, and professional presentation.

---

## Contribution Philosophy

Every contribution should improve at least one of the following:
- product clarity,
- user experience,
- code quality,
- system maintainability,
- documentation quality,
- or team readiness.

Contributions that add complexity without improving clarity should be avoided.

---

## Before You Start

Before working on any meaningful change:
1. Understand the current product direction
2. Read the relevant documentation
3. Confirm the scope of the task
4. Avoid making architectural changes casually
5. Keep the change as focused as possible

Start with:
- `README.md`
- `PROJECT_STATUS.md`
- `docs/documentation/README.md`

---

## Recommended Reading by Work Type

### Product or UX work
- `docs/documentation/product/LYNKNOV_PRODUCT_OVERVIEW.md`
- `docs/documentation/product/LYNKNOV_MVP_SCOPE.md`
- `docs/documentation/brand/LYNKNOV_BRAND_GUIDE.md`

### Technical or architecture work
- `docs/documentation/architecture/LYNKNOV_SYSTEM_ARCHITECTURE.md`
- `docs/documentation/architecture/LYNKNOV_FRONTEND_ARCHITECTURE.md`
- `docs/documentation/workflows/LYNKNOV_BUILD_SYSTEM.md`

### Team and process work
- `docs/documentation/team/LYNKNOV_DEVELOPMENT_TEAM_GUIDE.md`
- `docs/documentation/workflows/LYNKNOV_SPRINT_OPERATING_SYSTEM.md`

---

## Branching and Scope

Contributors should work in focused units.

Examples:
- one feature
- one documentation improvement
- one UI section
- one refactor pass
- one bug fix

Avoid combining unrelated changes in a single commit or branch.

---

## Commit Message Style

Use clear and consistent commit prefixes:
- `feat:` — new features
- `fix:` — bug fixes
- `docs:` — documentation updates
- `refactor:` — code restructuring without behavior change
- `chore:` — maintenance and setup tasks
- `style:` — formatting and presentation updates

Examples:
- `feat: add landing page hero section`
- `docs: improve documentation index`
- `refactor: split dashboard shell into layout modules`

---

## Coding Expectations

All code contributions should aim for:
- readability,
- consistency,
- maintainability,
- and alignment with product direction.

### Key rules
- Prefer clear naming over clever naming
- Keep components focused
- Avoid deeply tangled file responsibilities
- Document non-obvious technical decisions
- Do not leave experimental code in committed production paths
- Keep the UI aligned with the Lynknov design direction

---

## Documentation Expectations

Documentation is part of the product system.

Contributors should update docs when changes affect:
- architecture,
- workflows,
- product direction,
- team roles,
- or execution strategy.

If a change is big enough to alter how people understand the product, it probably deserves a documentation update.

---

## Pull Request Guidance

A strong contribution should answer:
- What changed?
- Why did it change?
- What part of the product does it affect?
- Are there any follow-up actions or risks?

Good PRs are focused, well-scoped, and easy to review.

---

## UI and Product Quality Standard

Lynknov should feel:
- clean,
- intentional,
- premium,
- modern,
- and strategically designed.

Avoid decisions that make the product feel:
- cluttered,
- template-like,
- visually noisy,
- or generic.

---

## Security and Environment Rules

Do not commit:
- `.env.local`
- secrets or API keys
- generated build output
- machine-specific temporary files

Use `.env.example` for safe environment variable templates.

---

## Final Principle

Contribute in a way that makes the project easier to build, easier to understand, and easier to trust.

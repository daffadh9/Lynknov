# Lynknov Frontend Architecture

## Goal

This document describes the recommended frontend structure for Lynknov so the UI can grow without becoming visually inconsistent or structurally messy.

---

## Frontend Priorities

The frontend should support:
- premium presentation,
- reusable layouts,
- readable component boundaries,
- and scalable feature growth.

---

## Frontend Surface Areas

### Marketing frontend
This includes:
- landing page
- feature sections
- pricing sections
- use-case pages
- public promotional components

### Auth frontend
This includes:
- sign-in page
- sign-up page
- onboarding transitions

### Application frontend
This includes:
- dashboard layout
- internal navigation
- module screens
- management views
- empty states and loading states

---

## Component Strategy

Recommended component levels:

### 1. Primitives
Small reusable UI pieces such as buttons, inputs, badges, wrappers, and text treatments.

### 2. Shared application components
Reusable modules that appear across the dashboard, such as cards, shells, sidebars, headers, and metric blocks.

### 3. Feature components
Components tied to one domain such as offers, leads, analytics, or pages.

### 4. Route-level composition
Pages should primarily compose smaller modules rather than contain all UI logic inline.

---

## Design Consistency Rules

The frontend should maintain consistency in:
- spacing,
- typography,
- color hierarchy,
- surface treatment,
- border usage,
- and interaction rhythm.

Avoid building sections in isolation without checking alignment against the overall design language.

---

## Layout Direction

### Public product layout
- strong hero hierarchy
- clear content rhythm
- high readability
- premium visual pacing

### Dashboard layout
- stable sidebar system
- clear top-level information hierarchy
- modular cards and panels
- scalable section framing

---

## Code Hygiene Rules

- avoid oversized components
- avoid mixing business logic and presentation excessively
- avoid duplicate visual patterns without abstraction
- prefer predictable naming
- document unusual UI patterns if they become system-level patterns

---

## Frontend Quality Standard

Every screen should answer:
- Is the hierarchy clear?
- Is the product identity visible?
- Is the interface too generic?
- Is the implementation likely to scale?
- Does this feel like Lynknov?

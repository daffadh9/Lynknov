/**
 * Lynknov constants — single source of truth for shared values
 */

export const APP_NAME = 'Lynknov'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
export const APP_TAGLINE = 'Your Interactive Business OS'

export const PAGE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const

export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  CLOSED: 'closed',
} as const

export const EVENT_TYPES = {
  PAGE_VIEW: 'page_view',
  CTA_CLICK: 'cta_click',
  LEAD_SUBMIT: 'lead_submit',
} as const

export const SECTION_TYPES = {
  HERO: 'hero',
  ABOUT: 'about',
  PORTFOLIO: 'portfolio',
  CTA: 'cta',
} as const

export const ONBOARDING_USE_CASES = [
  { id: 'freelancer', label: 'Freelancer / Solo Operator' },
  { id: 'creator', label: 'Creator / Artist' },
  { id: 'consultant', label: 'Consultant / Advisor' },
  { id: 'business', label: 'Small Business Owner' },
] as const

export const SOCIAL_PLATFORMS = [
  'linkedin',
  'instagram',
  'twitter',
  'github',
  'dribbble',
  'behance',
  'youtube',
] as const

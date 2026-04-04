// Lynknov — Database Types
// Aligned with supabase/migrations/0001_initial_schema.sql

export type PageStatus = 'draft' | 'published' | 'archived'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed'
export type AnalyticsEventType = 'page_view' | 'cta_click' | 'lead_submit'
export type SectionType =
  | 'hero'
  | 'about'
  | 'digital_presence'
  | 'showcase'
  | 'storyboard'
  | 'portfolio'
  | 'link_hub'
  | 'testimonials'
  | 'contact'
  | 'footer'

export interface Profile {
  id: string // uuid, mirrors auth.users.id
  username: string | null
  full_name: string | null
  headline: string | null
  bio: string | null
  avatar_url: string | null
  primary_cta_label: string | null
  primary_cta_url: string | null
  contact_email: string | null
  is_onboarded: boolean
  created_at: string
  updated_at: string
}

export interface PublicPage {
  id: string
  owner_id: string
  slug: string
  title: string
  subtitle: string | null
  theme_key: string | null
  settings: Record<string, unknown>
  status: PageStatus
  is_primary: boolean
  seo_title: string | null
  seo_description: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface PageSection {
  id: string
  page_id: string
  section_type: SectionType
  position: number
  is_visible: boolean
  content: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface PortfolioProject {
  id: string
  owner_id: string
  page_id: string | null
  title: string
  short_description: string | null
  category: string | null
  thumbnail_url: string | null
  project_url: string | null
  case_study_url: string | null
  sort_order: number
  is_featured: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  page_id: string
  owner_id: string
  name: string
  email: string
  company: string | null
  message: string
  source: string | null
  status: LeadStatus
  created_at: string
}

export interface AnalyticsEvent {
  id: string
  page_id: string | null
  owner_id: string | null
  event_type: AnalyticsEventType
  session_id: string | null
  metadata: Record<string, unknown>
  created_at: string
}

// Utility: Profile completeness check
export type ProfileCompleteness = {
  hasName: boolean
  hasHeadline: boolean
  hasBio: boolean
  hasAvatar: boolean
  hasCta: boolean
  score: number // 0–100
}

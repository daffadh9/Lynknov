// Auth utility functions — server-side only
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Profile } from '@/types/database'

/**
 * Get current user session. Redirects to /auth/login if not authenticated.
 */
export async function requireAuth() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  return user
}

/**
 * Get current user profile. Returns null if not found.
 */
export async function getUserProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return data ?? null
}

/**
 * Calculate profile completeness score (0-100).
 */
export function getProfileCompleteness(profile: Profile | null) {
  if (!profile) {
    return { hasName: false, hasHeadline: false, hasBio: false, hasAvatar: false, hasCta: false, score: 0 }
  }

  const hasName = Boolean(profile.full_name?.trim())
  const hasHeadline = Boolean(profile.headline?.trim())
  const hasBio = Boolean(profile.bio?.trim())
  const hasAvatar = Boolean(profile.avatar_url?.trim())
  const hasCta = Boolean(profile.primary_cta_url?.trim())

  const checks = [hasName, hasHeadline, hasBio, hasAvatar, hasCta]
  const score = Math.round((checks.filter(Boolean).length / checks.length) * 100)

  return { hasName, hasHeadline, hasBio, hasAvatar, hasCta, score }
}

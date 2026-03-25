'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { generateSlug } from '@/lib/utils'

interface OnboardingData {
  full_name: string
  headline: string
  username: string
  use_case: string
}

/**
 * Generate a unique slug by appending a short random suffix on collision.
 */
async function resolveUniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  baseSlug: string,
): Promise<string> {
  let slug = baseSlug
  let attempts = 0

  while (attempts < 5) {
    const { data } = await supabase
      .from('public_pages')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    if (!data) return slug // slug is free

    // Append a short suffix and try again
    slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`
    attempts++
  }

  // Last resort: timestamp suffix
  return `${baseSlug}-${Date.now().toString(36)}`
}

export async function completeOnboarding(
  data: OnboardingData,
): Promise<{ error: string } | void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated. Please sign in again.' }
  }

  const baseSlug = generateSlug(data.username || data.full_name)
  const slug = await resolveUniqueSlug(supabase, baseSlug)

  // Upsert profile — handles both new and existing rows safely
  const { error: profileError } = await supabase.from('profiles').upsert(
    {
      id: user.id,
      full_name: data.full_name,
      headline: data.headline,
      username: data.username,
      is_onboarded: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' },
  )

  if (profileError) {
    return { error: profileError.message }
  }

  // Create default primary page only if one doesn't exist yet
  const { data: existingPage } = await supabase
    .from('public_pages')
    .select('id')
    .eq('owner_id', user.id)
    .eq('is_primary', true)
    .maybeSingle()

  if (!existingPage) {
    const { error: pageError } = await supabase.from('public_pages').insert({
      owner_id: user.id,
      slug,
      title: data.full_name || 'My Page',
      status: 'draft',
      is_primary: true,
    })

    if (pageError) {
      return { error: pageError.message }
    }
  }

  redirect('/dashboard')
}

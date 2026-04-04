'use server'

import { createClient } from '@/lib/supabase/server'
import type { EditorSection, EditorWorkspaceState } from '@/types/editor'
import { initialWorkspaceState, initialSections } from '@/lib/editor-mock-data'

export async function getPublicProfile(username: string): Promise<{
  profile: any
  sections: EditorSection[]
  workspaceState: EditorWorkspaceState
  error?: string
} | null> {
  const supabase = await createClient()

  // 1. Fetch profile by username
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .maybeSingle()

  if (profileError || !profile) {
    return null
  }

  // 2. Fetch primary public page (Draft or Published for now during dev)
  const { data: page, error: pageError } = await supabase
    .from('public_pages')
    .select('*')
    .eq('owner_id', profile.id)
    .eq('is_primary', true)
    .maybeSingle()

  // FALLBACK: If no page or sections found, return initial mock data
  if (pageError || !page) {
    return { 
      profile, 
      sections: initialSections, 
      workspaceState: initialWorkspaceState 
    }
  }

  // 3. Fetch sections
  const { data: dbSections, error: sectionsError } = await supabase
    .from('page_sections')
    .select('*')
    .eq('page_id', page.id)
    .order('position', { ascending: true })

  if (sectionsError || !dbSections || dbSections.length === 0) {
    return { 
      profile, 
      sections: initialSections, 
      workspaceState: initialWorkspaceState 
    }
  }

  // Map DB sections to EditorSection types
  const sections: EditorSection[] = dbSections.map((s: any) => ({
    id: s.id,
    type: s.section_type,
    label: s.section_type.charAt(0).toUpperCase() + s.section_type.slice(1).replace('_', ' '),
    order: s.position,
    isEnabled: s.is_visible,
    content: s.content as any,
    style: (s.content as any).style || {},
    settings: (s.content as any).settings || {},
  }))

  // Construct workspaceState
  const workspaceState: EditorWorkspaceState = {
    page: {
      status: page.status as any,
      slug: page.slug,
      pageTitle: page.title,
      metaTitle: page.seo_title || '',
      metaDescription: page.seo_description || '',
      socialTitle: (page.settings as any)?.page?.socialTitle || '',
      socialDescription: (page.settings as any)?.page?.socialDescription || '',
      visibility: (page.settings as any)?.page?.visibility || 'public',
      seoIndexable: (page.settings as any)?.page?.seoIndexable ?? true,
    },
    theme: (page.settings as any)?.theme || initialWorkspaceState.theme,
    audio: (page.settings as any)?.audio || initialWorkspaceState.audio,
  }

  return {
    profile,
    sections,
    workspaceState
  }
}

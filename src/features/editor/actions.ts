'use server'

import { createClient } from '@/lib/supabase/server'
import type { EditorSection, EditorWorkspaceState } from '@/types/editor'
import type { PageSection } from '@/types/database'
import {
  officialDemoSections,
  officialDemoWorkspaceState,
} from '@/features/profile/official-demo'

type PageSettings = {
  theme?: EditorWorkspaceState['theme']
  audio?: EditorWorkspaceState['audio']
  page?: Partial<EditorWorkspaceState['page']>
}

function getOfficialDemoSeed() {
  return {
    sections: structuredClone(officialDemoSections),
    workspaceState: structuredClone(officialDemoWorkspaceState),
  }
}

export async function getEditorData(): Promise<{
  sections: EditorSection[]
  workspaceState: EditorWorkspaceState
  error?: string
}> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const officialDemoSeed = getOfficialDemoSeed()

  if (!user) {
    return {
      ...officialDemoSeed,
      error: 'Not authenticated',
    }
  }

  // Fetch primary page
  const { data: page, error: pageError } = await supabase
    .from('public_pages')
    .select('*')
    .eq('owner_id', user.id)
    .eq('is_primary', true)
    .maybeSingle()

  if (pageError) {
    return {
      ...officialDemoSeed,
      error: pageError.message,
    }
  }

  if (!page) {
    return officialDemoSeed
  }

  // Fetch sections
  const { data: dbSections, error: sectionsError } = await supabase
    .from('page_sections')
    .select('*')
    .eq('page_id', page.id)
    .order('position', { ascending: true })

  if (sectionsError) {
    return {
      ...officialDemoSeed,
      error: sectionsError.message,
    }
  }

  const pageSettings = (page.settings ?? {}) as PageSettings

  // Map DB sections to EditorSection types
  const sections: EditorSection[] = (dbSections ?? []).map((section: PageSection) => {
    const content = section.content

    // Restore original type if we used the constraint workaround
    const actualType = content._original_type || section.section_type

    return {
      id: section.id,
      type: actualType as EditorSection["type"],
      label: actualType.charAt(0).toUpperCase() + actualType.slice(1).replace('_', ' '),
      order: section.position,
      isEnabled: section.is_visible,
      content,
      style: (content.style as Record<string, unknown>) || {},
      settings: (content.settings as Record<string, unknown>) || {},
    }
  })

  // Construct workspaceState from page settings
  const workspaceState: EditorWorkspaceState = {
    page: {
      status: page.status,
      slug: page.slug,
      pageTitle: page.title,
      metaTitle: page.seo_title || '',
      metaDescription: page.seo_description || '',
      socialTitle: pageSettings.page?.socialTitle || '',
      socialDescription: pageSettings.page?.socialDescription || '',
      visibility: pageSettings.page?.visibility || 'public',
      seoIndexable: pageSettings.page?.seoIndexable ?? true,
    },
    theme: pageSettings.theme || officialDemoSeed.workspaceState.theme,
    audio: pageSettings.audio || officialDemoSeed.workspaceState.audio,
  }

  return { 
    sections: sections.length > 0 ? sections : officialDemoSeed.sections, 
    workspaceState 
  }
}

export async function saveEditorData(
  sections: EditorSection[],
  workspaceState: EditorWorkspaceState
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false, error: 'Not authenticated' }

  // Get primary page ID
  const { data: page } = await supabase
    .from('public_pages')
    .select('id')
    .eq('owner_id', user.id)
    .eq('is_primary', true)
    .maybeSingle()

  if (!page) return { success: false, error: 'Primary page not found' }

  // 1. Update page settings
  const { error: pageError } = await supabase
    .from('public_pages')
    .update({
      title: workspaceState.page.pageTitle,
      slug: workspaceState.page.slug,
      status: workspaceState.page.status,
      seo_title: workspaceState.page.metaTitle,
      seo_description: workspaceState.page.metaDescription,
      settings: {
        theme: workspaceState.theme,
        audio: workspaceState.audio,
        page: {
          socialTitle: workspaceState.page.socialTitle,
          socialDescription: workspaceState.page.socialDescription,
          visibility: workspaceState.page.visibility,
          seoIndexable: workspaceState.page.seoIndexable,
        }
      },
      updated_at: new Date().toISOString()
    })
    .eq('id', page.id)

  if (pageError) return { success: false, error: pageError.message }

  // 2. Replace sections (Delete & Insert to handle temporary IDs gracefully without returning new IDs)
  const { error: deleteError } = await supabase
    .from('page_sections')
    .delete()
    .eq('page_id', page.id)

  if (deleteError) return { success: false, error: deleteError.message }

  const sectionsToInsert = sections.map((s, index) => ({
    id: s.id.startsWith('section-') ? crypto.randomUUID() : s.id,
    page_id: page.id,
    // Database constraint (0001_initial_schema.sql) only allows 'hero', 'about', 'portfolio', 'cta'.
    // If the type is unsupported, map it to 'cta' to bypass constraint temporarily.
    section_type: ['hero', 'about', 'portfolio', 'cta'].includes(s.type) ? s.type : 'cta',
    position: index,
    is_visible: s.isEnabled,
    content: {
      ...s.content,
      _original_type: s.type, // Store real type here
      style: s.style,
      settings: s.settings
    }
  }))

  const { error: sectionsError } = await supabase
    .from('page_sections')
    .insert(sectionsToInsert)

  if (sectionsError) return { success: false, error: sectionsError.message }

  return { success: true }
}

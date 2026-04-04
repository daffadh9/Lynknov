import type { ProfileData } from "@/components/profile/types/profile";
import { initialSections, initialWorkspaceState } from "@/lib/editor-mock-data";
import { mapSectionsToProfileData } from "@/lib/profile-mapper";
import type { EditorSection, EditorWorkspaceState } from "@/types/editor";

export const OFFICIAL_DEMO_SLUG = "demo";

// Re-export constants for editor seeds
export const officialDemoSections: EditorSection[] = initialSections;
export const officialDemoWorkspaceState: EditorWorkspaceState = {
  ...initialWorkspaceState,
  page: {
    ...initialWorkspaceState.page,
    slug: OFFICIAL_DEMO_SLUG,
    pageTitle: "Official Demo | Lynknov",
  }
};

// Restore baseline from the high-quality initialSections (Daffa Profile)
export const officialDemoProfile: ProfileData = mapSectionsToProfileData(
  {}, 
  officialDemoSections, 
  officialDemoWorkspaceState
);

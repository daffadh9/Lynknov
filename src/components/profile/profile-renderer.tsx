import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { type EditorSection, type SectionType } from "@/types/editor";
import { HeroSection } from "./sections/hero-section";
import { AboutSection } from "./sections/about-section";
import { ShowcaseSection } from "./sections/showcase-section";
import { ProjectPortfolioSection } from "./sections/project-portfolio";
import { LinkHubSection } from "./sections/link-hub";
import { TestimonialsSection } from "./sections/testimonials-section";
import { StoryboardSection } from "./sections/storyboard-section";
import { ConnectSection } from "./sections/connect-section";
import { GallerySection } from "./sections/gallery-section";
import { SpotlightSection } from "./sections/spotlight-section";
import type { ProfileData } from "./types/profile";

interface ProfileRendererProps {
  profile: ProfileData;
  previewMode?: boolean;
  sectionDescriptors?: Array<Pick<EditorSection, "id" | "type" | "isEnabled">>;
  activeSectionId?: string | null;
}

function SectionSlot({
  children,
  previewMode,
  active,
  sectionId,
  sectionType,
}: {
  children: ReactNode;
  previewMode: boolean;
  active: boolean;
  sectionId?: string;
  sectionType: string;
}) {
  return (
    <div
      data-section-id={sectionId}
      data-section-type={sectionType}
      data-preview-mode={previewMode ? "true" : "false"}
      data-section-active={active ? "true" : "false"}
      className={cn(
        "relative",
        previewMode && active && "z-10 rounded-[28px] ring-1 ring-emerald-400/40 ring-inset",
      )}
    >
      {children}
    </div>
  );
}

export function ProfileRenderer({
  profile,
  previewMode = false,
  sectionDescriptors,
  activeSectionId,
}: ProfileRendererProps) {
  const sectionMap = new Map(
    sectionDescriptors?.map((section) => [section.type as SectionType, section]) ?? [],
  );

  const sectionMeta = (sectionType: string) => sectionMap.get(sectionType as SectionType);

  return (
    <div className="flex w-full flex-col overflow-x-hidden">
      <SectionSlot
        previewMode={previewMode}
        active={activeSectionId === sectionMeta("hero")?.id}
        sectionId={sectionMeta("hero")?.id}
        sectionType="hero"
      >
        <HeroSection profile={profile} previewMode={previewMode} />
      </SectionSlot>

      {profile.about.statement && (
        <SectionSlot
          previewMode={previewMode}
          active={activeSectionId === sectionMeta("about")?.id}
          sectionId={sectionMeta("about")?.id}
          sectionType="about"
        >
          <AboutSection profile={profile} />
        </SectionSlot>
      )}

      {profile.spotlights && profile.spotlights.length > 0 && (
        <SectionSlot previewMode={previewMode} active={false} sectionType="spotlights">
          <SpotlightSection profile={profile} />
        </SectionSlot>
      )}

      {profile.gallery && profile.gallery.length > 0 && (
        <SectionSlot previewMode={previewMode} active={false} sectionType="gallery">
          <GallerySection profile={profile} />
        </SectionSlot>
      )}

      {profile.socialLinks && profile.socialLinks.length > 0 && (
        <SectionSlot
          previewMode={previewMode}
          active={activeSectionId === sectionMeta("digital_presence")?.id}
          sectionId={sectionMeta("digital_presence")?.id}
          sectionType="digital_presence"
        >
          <ConnectSection profile={profile} />
        </SectionSlot>
      )}

      {profile.showcaseOffers && profile.showcaseOffers.length > 0 && (
        <SectionSlot
          previewMode={previewMode}
          active={activeSectionId === sectionMeta("showcase")?.id}
          sectionId={sectionMeta("showcase")?.id}
          sectionType="showcase"
        >
          <ShowcaseSection profile={profile} />
        </SectionSlot>
      )}

      {profile.storyboard && profile.storyboard.length > 0 && (
        <SectionSlot
          previewMode={previewMode}
          active={activeSectionId === sectionMeta("storyboard")?.id}
          sectionId={sectionMeta("storyboard")?.id}
          sectionType="storyboard"
        >
          <StoryboardSection profile={profile} />
        </SectionSlot>
      )}

      {profile.highlights && profile.highlights.length > 0 && (
        <SectionSlot
          previewMode={previewMode}
          active={activeSectionId === sectionMeta("portfolio")?.id}
          sectionId={sectionMeta("portfolio")?.id}
          sectionType="portfolio"
        >
          <ProjectPortfolioSection profile={profile} />
        </SectionSlot>
      )}

      {profile.linkHub && profile.linkHub.length > 0 && (
        <SectionSlot
          previewMode={previewMode}
          active={activeSectionId === sectionMeta("link_hub")?.id}
          sectionId={sectionMeta("link_hub")?.id}
          sectionType="link_hub"
        >
          <LinkHubSection profile={profile} />
        </SectionSlot>
      )}

      {profile.testimonials && profile.testimonials.length > 0 && (
        <SectionSlot
          previewMode={previewMode}
          active={activeSectionId === sectionMeta("testimonials")?.id}
          sectionId={sectionMeta("testimonials")?.id}
          sectionType="testimonials"
        >
          <TestimonialsSection profile={profile} />
        </SectionSlot>
      )}
    </div>
  );
}

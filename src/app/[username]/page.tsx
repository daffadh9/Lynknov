import { getProfileByUsername } from "@/components/profile/data/mock-profile";
import { ProfileShell } from "@/components/profile/ui/profile-shell";
import { HeroSection } from "@/components/profile/sections/hero-section";
import { ConnectSection } from "@/components/profile/sections/connect-section";
import { AboutSection } from "@/components/profile/sections/about-section";
import { ShowcaseSection } from "@/components/profile/sections/showcase-section";
import { ProjectPortfolioSection } from "@/components/profile/sections/project-portfolio";
import { GallerySection } from "@/components/profile/sections/gallery-section";
import { LinkHubSection } from "@/components/profile/sections/link-hub";
import { TestimonialsSection } from "@/components/profile/sections/testimonials-section";
import { ContactSection } from "@/components/profile/sections/contact-section";
import { SpotlightSection } from "@/components/profile/sections/spotlight-section";
import { StoryboardSection } from "@/components/profile/sections/storyboard-section";
import { ScrollProgress } from "@/components/profile/ui/scroll-progress";
import { Metadata } from "next";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const profile = getProfileByUsername(resolvedParams.username);

  if (!profile) {
    return {
      title: "Profile Not Found | Lynknov",
    };
  }

  return {
    title: `${profile.name} — ${profile.role}`,
    description: profile.headline,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params;
  const profile = getProfileByUsername(resolvedParams.username);

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center text-[#FAFAFA]">
        <div className="text-center px-6">
          <h1 className="text-3xl font-semibold mb-4">Profile not found</h1>
          <p className="text-[#A1A1AA]">The digital stage you are looking for does not exist or has been moved.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <ScrollProgress />
      <ProfileShell>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SpotlightSection profile={profile} />
        <GallerySection profile={profile} />
        <ConnectSection profile={profile} />
        <ShowcaseSection profile={profile} />
        <StoryboardSection profile={profile} />
        <ProjectPortfolioSection profile={profile} />
        <LinkHubSection profile={profile} />
        <TestimonialsSection profile={profile} />
        <ContactSection profile={profile} />
      </ProfileShell>
    </>
  );
}

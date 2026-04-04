import { ProfileShell } from "@/components/profile/ui/profile-shell";
import { ContactSection } from "@/components/profile/sections/contact-section";
import { ScrollProgress } from "@/components/profile/ui/scroll-progress";
import { ProfileRenderer } from "@/components/profile/profile-renderer";
import { Metadata } from "next";
import { getPublicProfile } from "@/features/profile/actions";
import { mapSectionsToProfileData } from "@/lib/profile-mapper";
import { mockProfile } from "@/components/profile/data/mock-profile";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getPublicProfile(resolvedParams.username);

  if (!data) {
    if (resolvedParams.username === 'daffa') {
      return {
        title: `${mockProfile.name} — ${mockProfile.role}`,
        description: mockProfile.headline,
      };
    }
    return {
      title: "Profile Not Found | Lynknov",
    };
  }

  const profile = mapSectionsToProfileData(data.profile, data.sections, data.workspaceState);

  return {
    title: `${profile.name} — ${profile.role}`,
    description: profile.headline,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params;
  const data = await getPublicProfile(resolvedParams.username);
  
  const profile = data 
    ? mapSectionsToProfileData(data.profile, data.sections, data.workspaceState)
    : (resolvedParams.username === 'daffa' ? mockProfile : null);

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
        <ProfileRenderer profile={profile} />
        <ContactSection profile={profile} />
      </ProfileShell>
    </>
  );
}

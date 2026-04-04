import type { Metadata } from "next";
import { ScrollProgress } from "@/components/profile/ui/scroll-progress";
import { ProfileShell } from "@/components/profile/ui/profile-shell";
import { ProfileRenderer } from "@/components/profile/profile-renderer";
import { ContactSection } from "@/components/profile/sections/contact-section";
import { mockProfile } from "@/components/profile/data/mock-profile";

export const metadata: Metadata = {
  title: "Official Demo | Lynknov",
  description:
    "The official Lynknov demo page used as the baseline for public-page visuals.",
  alternates: {
    canonical: "/demo",
  },
};

export default function DemoPage() {
  return (
    <>
      <ScrollProgress />
      <ProfileShell>
        <ProfileRenderer profile={mockProfile} />
        <ContactSection profile={mockProfile} />
      </ProfileShell>
    </>
  );
}

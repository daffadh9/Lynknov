import type {
  AboutSection,
  EditorSection,
  EditorWorkspaceState,
  HeroSection,
  LinkHubSection,
  PortfolioSection,
  ShowcaseSection,
  StoryboardSection,
  TestimonialsSection,
} from "@/types/editor";
import type { LinkGroup, ProfileData, SocialLink } from "@/components/profile/types/profile";

type ProfileRecord = Partial<ProfileData> & {
  username?: string | null;
  full_name?: string | null;
  role?: string | null;
  headline?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  primary_cta_label?: string | null;
  primary_cta_url?: string | null;
  secondary_cta_label?: string | null;
  secondary_cta_url?: string | null;
};

function getSection<T extends EditorSection["type"]>(
  sections: EditorSection[],
  type: T,
) {
  return sections.find((section) => section.type === type) as Extract<EditorSection, { type: T }> | undefined;
}

function cloneProfile(baseProfile: ProfileData) {
  return structuredClone(baseProfile);
}

function buildBaseProfileData(
  profile: ProfileRecord,
  workspaceState: EditorWorkspaceState,
): ProfileData {
  const name =
    profile.name ||
    profile.full_name ||
    workspaceState.page.pageTitle ||
    workspaceState.page.slug ||
    "Anonymous";

  const username = profile.username || workspaceState.page.slug || "profile";

  return {
    username,
    name,
    role: profile.role || "Professional",
    headline: profile.headline || "Welcome to my profile",
    bio: profile.bio || "",
    heroImage: profile.heroImage || profile.avatar_url || "/images/Foto Profile.jpg",
    availability: profile.availability || {
      status: "available",
      text: "Open for collab",
    },
    onlineStatus: profile.onlineStatus || {
      isOnline: true,
      text: "Active now",
    },
    hasStory: profile.hasStory ?? false,
    primaryCta: profile.primaryCta || {
      label: profile.primary_cta_label || "Hubungi Saya",
      url: profile.primary_cta_url || "#",
    },
    secondaryCta:
      profile.secondaryCta ||
      (profile.secondary_cta_label && profile.secondary_cta_url
        ? {
            label: profile.secondary_cta_label,
            url: profile.secondary_cta_url,
          }
        : undefined),
    socialLinks: profile.socialLinks ? structuredClone(profile.socialLinks) : [],
    digitalPresence: profile.digitalPresence ? structuredClone(profile.digitalPresence) : undefined,
    about: profile.about
      ? structuredClone(profile.about)
      : {
          statement: "",
          base: "",
          notes: [],
        },
    showcaseOffers: profile.showcaseOffers ? structuredClone(profile.showcaseOffers) : [],
    highlights: profile.highlights ? structuredClone(profile.highlights) : [],
    spotlights: profile.spotlights ? structuredClone(profile.spotlights) : [],
    storyboard: profile.storyboard ? structuredClone(profile.storyboard) : [],
    kickstart: profile.kickstart ? structuredClone(profile.kickstart) : undefined,
    linkHub: profile.linkHub ? structuredClone(profile.linkHub) : [],
    testimonials: profile.testimonials ? structuredClone(profile.testimonials) : [],
    gallery: profile.gallery ? structuredClone(profile.gallery) : [],
    closingCta: profile.closingCta
      ? structuredClone(profile.closingCta)
      : {
          badge: "Design your success",
          heading: "Build a page\nthat feels\nmore serious.",
          supportingText: "Use Lynknov to present identity, proof, and action in one place.",
          labelPrimary: "Start Building",
          urlPrimary: "/register",
          labelSecondary: "See Features",
          urlSecondary: "/features",
        },
    footerNote: profile.footerNote || `${new Date().getFullYear()} ${name} - built with Lynknov`,
  };
}

function mergeSocialLinks(
  baseLinks: SocialLink[],
  stats:
    | Array<{
        platform: string;
        value: string;
        label: string;
        url?: string;
      }>
    | undefined,
) {
  if (!stats || stats.length === 0) return baseLinks;

  const baseByPlatform = new Map(
    baseLinks.map((item) => [item.platform.toLowerCase(), item]),
  );

  return stats.map((stat, index) => {
    const fallback =
      baseByPlatform.get(stat.platform.toLowerCase()) ?? baseLinks[index];

    return {
      platform: stat.platform,
      url: stat.url || fallback?.url || "#",
      icon: fallback?.icon || stat.platform.toLowerCase(),
      username:
        fallback?.username ||
        `@${stat.platform.toLowerCase().replace(/\s+/g, "")}`,
      lastSync: fallback?.lastSync || "Updated recently",
      themeColor: fallback?.themeColor,
      stats: [
        { label: stat.label, value: stat.value },
        ...(fallback?.stats?.slice(1) ?? []),
      ],
    } satisfies SocialLink;
  });
}

function mapLinkGroups(baseGroups: LinkGroup[], section: LinkHubSection) {
  return section.content.groups.map((group, index) => {
    const fallback = baseGroups.find((item) => item.id === group.id) || baseGroups[index];

    return {
      id: group.id,
      title: group.title,
      mode: fallback?.mode,
      links: group.links.map((link, linkIndex) => {
        const fallbackLink = fallback?.links[linkIndex];

        return {
          label: link.label,
          url: link.url,
          icon: link.icon || fallbackLink?.icon,
          badge: link.subtitle || fallbackLink?.badge,
          isPinned: fallbackLink?.isPinned,
        };
      }),
    } satisfies LinkGroup;
  });
}

export function applySectionsToProfileData(
  baseProfile: ProfileData,
  sections: EditorSection[],
  workspaceState?: EditorWorkspaceState,
): ProfileData {
  const profile = cloneProfile(baseProfile);

  if (workspaceState?.page.slug) {
    profile.username = workspaceState.page.slug;
  }

  const hero = getSection(sections, "hero") as HeroSection | undefined;
  if (hero?.isEnabled !== false) {
    profile.name = hero?.content.name || profile.name;
    profile.role = hero?.content.role || profile.role;
    profile.headline = hero?.content.headline || profile.headline;
    profile.bio = hero?.content.description || profile.bio;
    profile.heroImage = hero?.content.avatarUrl || profile.heroImage;
    profile.primaryCta = hero?.content.primaryCta || profile.primaryCta;
    profile.secondaryCta = hero?.content.secondaryCta || profile.secondaryCta;
    profile.availability = {
      status: profile.availability?.status || "available",
      text: hero?.content.badgeText || profile.availability?.text || "Open for collab",
    };
  }

  const about = getSection(sections, "about") as AboutSection | undefined;
  if (about) {
    if (!about.isEnabled) {
      profile.about.statement = "";
      profile.about.notes = [];
    } else {
      profile.about = {
        ...profile.about,
        statement: about.content.description || profile.about.statement,
        base: about.content.sideCardLabel || profile.about.base,
        notes:
          about.content.bulletPoints?.length
            ? about.content.bulletPoints.map((point, index) => ({
                title:
                  index === 0
                    ? about.content.sideCardTitle || "Key point"
                    : `Point ${index + 1}`,
                content: point,
              }))
            : profile.about.notes,
      };
    }
  }

  const digitalPresence = getSection(sections, "digital_presence");
  if (digitalPresence) {
    if (!digitalPresence.isEnabled) {
      profile.socialLinks = [];
    } else {
      profile.socialLinks = mergeSocialLinks(
        profile.socialLinks,
        digitalPresence.content.stats,
      );
    }
  }

  const showcase = getSection(sections, "showcase") as ShowcaseSection | undefined;
  if (showcase) {
    if (!showcase.isEnabled) {
      profile.showcaseOffers = [];
    } else {
      profile.showcaseOffers = showcase.content.items.map((item, index) => {
        const fallback =
          profile.showcaseOffers.find((offer) => offer.id === item.id) ||
          profile.showcaseOffers[index];

        return {
          id: item.id,
          type: item.type,
          title: item.title,
          pricing: item.price || fallback?.pricing,
          description: item.description || fallback?.description || "",
          ctaText: item.ctaText || fallback?.ctaText || "Learn more",
          imageUrl: item.imageUrl || fallback?.imageUrl || "",
          link: item.link || fallback?.link || "#",
          tags: fallback?.tags,
          isFeatured: fallback?.isFeatured,
        };
      });
    }
  }

  const storyboard = getSection(sections, "storyboard") as StoryboardSection | undefined;
  if (storyboard) {
    if (!storyboard.isEnabled) {
      profile.storyboard = [];
    } else {
      profile.storyboard = storyboard.content.items.map((item, index) => {
        const fallback =
          profile.storyboard?.find((entry) => entry.id === item.id) ||
          profile.storyboard?.[index];

        return {
          id: item.id,
          date: item.date,
          title: item.title,
          content: item.content,
          status: item.status || fallback?.status || "completed",
        };
      });
    }
  }

  const portfolio = getSection(sections, "portfolio") as PortfolioSection | undefined;
  if (portfolio) {
    if (!portfolio.isEnabled) {
      profile.highlights = [];
    } else {
      profile.highlights = portfolio.content.items.map((item, index) => {
        const fallback =
          profile.highlights.find((entry) => entry.id === item.id) ||
          profile.highlights[index];

        return {
          id: item.id,
          title: item.title,
          category: item.category,
          description: item.description,
          imageUrl: item.imageUrl || fallback?.imageUrl || "",
          link: item.link || fallback?.link || "#",
          date: fallback?.date,
          metadata: fallback?.metadata,
        };
      });
    }
  }

  const linkHub = getSection(sections, "link_hub") as LinkHubSection | undefined;
  if (linkHub) {
    if (!linkHub.isEnabled) {
      profile.linkHub = [];
    } else {
      profile.linkHub = mapLinkGroups(profile.linkHub, linkHub);
    }
  }

  const testimonials = getSection(sections, "testimonials") as TestimonialsSection | undefined;
  if (testimonials) {
    if (!testimonials.isEnabled) {
      profile.testimonials = [];
    } else {
      profile.testimonials = testimonials.content.items.map((item, index) => {
        const fallback =
          profile.testimonials.find((entry) => entry.id === item.id) ||
          profile.testimonials[index];

        return {
          id: item.id,
          quote: item.quote,
          author: item.author,
          role: item.role || fallback?.role || "",
        };
      });
    }
  }

  if (!profile.footerNote) {
    profile.footerNote = `${new Date().getFullYear()} ${profile.name} - built with Lynknov`;
  }

  return profile;
}

export function mapSectionsToProfileData(
  profile: ProfileRecord,
  sections: EditorSection[],
  workspaceState: EditorWorkspaceState,
): ProfileData {
  const baseProfile = buildBaseProfileData(profile, workspaceState);
  return applySectionsToProfileData(baseProfile, sections, workspaceState);
}

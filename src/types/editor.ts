export type SectionType =
  | "hero"
  | "about"
  | "digital_presence"
  | "showcase"
  | "storyboard"
  | "portfolio"
  | "link_hub"
  | "testimonials"
  | "contact"
  | "footer";

export interface BaseSection {
  id: string;
  type: SectionType;
  label: string;
  order: number;
  isEnabled: boolean;
  content: Record<string, unknown>;
  style: Record<string, unknown>;
  settings: Record<string, unknown>;
}

export interface HeroSection extends BaseSection {
  type: "hero";
  content: {
    name: string;
    role: string;
    headline: string;
    description: string;
    primaryCta?: { label: string; url: string; };
    secondaryCta?: { label: string; url: string; };
    avatarUrl?: string;
    badgeText?: string;
    trustText?: string;
  };
  style: {
    alignment: "left" | "center" | "right";
    backgroundVariant: "solid" | "gradient" | "premium-grid" | "mesh";
    avatarShape: "circle" | "rounded-xl" | "rounded-2xl";
    cardVariant: "flat" | "glass" | "glass-dark";
  };
  settings: {
    showBadge: boolean;
    showAvatar: boolean;
    showSecondaryCta: boolean;
    animation: "none" | "fade-up" | "fade-in";
  };
}

export interface AboutSection extends BaseSection {
  type: "about";
  content: {
    title: string;
    description: string;
    bulletPoints?: string[];
    sideCardTitle?: string;
    sideCardLabel?: string;
  };
  style: {
    layout: "simple" | "split" | "card";
    textAlignment?: "left" | "center";
  };
  settings: {
    showTitle: boolean;
    showSideCard: boolean;
    fullWidth: boolean;
  };
}

export interface DigitalPresenceSection extends BaseSection {
  type: "digital_presence";
  content: {
    title: string;
    description?: string;
    stats?: { platform: string; value: string; label: string; url?: string }[];
  };
  style: {
    layout: "grid" | "list" | "pills";
    columns: 1 | 2 | 3 | 4;
  };
  settings: {
    showTitle: boolean;
    showMetrics: boolean;
    maxVisible: number;
  };
}

export interface ShowcaseSection extends BaseSection {
  type: "showcase";
  content: {
    title: string;
    description: string;
    items: { id: string; title: string; type: string; price?: string; description?: string; ctaText?: string; imageUrl?: string; link?: string }[];
  };
  style: {
    layout: "cards" | "list" | "grid";
    columns: 1 | 2;
  };
  settings: {
    showTitle: boolean;
    showPrice: boolean;
    showCategory: boolean;
    showCta: boolean;
    maxVisible: number;
  };
}

export interface StoryboardSection extends BaseSection {
  type: "storyboard";
  content: {
    title: string;
    description?: string;
    items: { id: string; date: string; title: string; content: string; status: string; imageUrl?: string }[];
  };
  style: {
    layout: "timeline" | "cards";
  };
  settings: {
    showTitle: boolean;
    showDates: boolean;
    showMedia: boolean;
    maxVisible: number;
  };
}

export interface PortfolioSection extends BaseSection {
  type: "portfolio";
  content: {
    title: string;
    description: string;
    items: { id: string; title: string; category: string; description: string; imageUrl?: string; link?: string }[];
  };
  style: {
    layout: "featured" | "grid" | "list";
  };
  settings: {
    showTitle: boolean;
    showCategory: boolean;
    showDescription: boolean;
    maxVisible: number;
    featuredMode: boolean;
  };
}

export interface LinkHubSection extends BaseSection {
  type: "link_hub";
  content: {
    title: string;
    description?: string;
    groups: { id: string; title: string; links: { id: string; label: string; url: string; icon?: string; subtitle?: string }[] }[];
  };
  style: {
    layout: "accordion" | "cards" | "list";
  };
  settings: {
    showTitle: boolean;
    showIcons: boolean;
    showGroups: boolean;
    openInNewTab: boolean;
  };
}

export interface TestimonialsSection extends BaseSection {
  type: "testimonials";
  content: {
    title: string;
    description?: string;
    items: { id: string; quote: string; author: string; role: string; company?: string; avatarUrl?: string }[];
  };
  style: {
    layout: "carousel" | "grid" | "masonry";
  };
  settings: {
    showTitle: boolean;
    showAvatar: boolean;
    showRole: boolean;
    showCompany: boolean;
    maxVisible: number;
  };
}

export type EditorSection =
  | BaseSection
  | HeroSection
  | AboutSection
  | DigitalPresenceSection
  | ShowcaseSection
  | StoryboardSection
  | PortfolioSection
  | LinkHubSection
  | TestimonialsSection;

export type EditorWorkspaceKey =
  | "sections"
  | "uploads"
  | "audio"
  | "theme"
  | "settings";

export interface EditorPageSettings {
  status: "draft" | "published";
  slug: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  socialTitle: string;
  socialDescription: string;
  visibility: "public" | "unlisted" | "private";
  seoIndexable: boolean;
}

export interface EditorThemeSettings {
  accent: "emerald" | "ocean" | "gold";
  background: "solid" | "grid" | "mesh" | "glow";
  surface: "soft" | "glass" | "contrast";
  typography: "refined" | "editorial" | "compact";
  spacing: "relaxed" | "balanced" | "compact";
}

export interface EditorAudioSettings {
  trackName: string;
  duration: string;
  widgetEnabled: boolean;
  loopEnabled: boolean;
  volume: number;
  placement: "floating" | "inline";
}

export interface EditorWorkspaceState {
  page: EditorPageSettings;
  theme: EditorThemeSettings;
  audio: EditorAudioSettings;
}

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
  };
  style: {
    alignment: "left" | "center" | "right";
    backgroundVariant: "solid" | "gradient" | "premium-grid" | "mesh";
    avatarShape: "circle" | "rounded-xl" | "rounded-2xl";
    cardVariant: "flat" | "glass" | "glass-dark";
  };
  settings: {
    showBadge: boolean;
    animation: "none" | "fade-up" | "fade-in";
  };
}

export interface AboutSection extends BaseSection {
  type: "about";
  content: {
    title: string;
    description: string;
    bulletPoints?: string[];
  };
  style: {
    layout: "simple" | "split" | "card";
  };
  settings: {
    showTitle: boolean;
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
  };
}

export interface StoryboardSection extends BaseSection {
  type: "storyboard";
  content: {
    title: string;
    description?: string;
    items: { id: string; date: string; title: string; content: string; status: string }[];
  };
  style: {
    layout: "timeline" | "cards";
  };
  settings: {
    showTitle: boolean;
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
  };
}

export interface LinkHubSection extends BaseSection {
  type: "link_hub";
  content: {
    title: string;
    description?: string;
    groups: { id: string; title: string; links: { id: string; label: string; url: string; icon?: string }[] }[];
  };
  style: {
    layout: "accordion" | "cards" | "list";
  };
  settings: {
    showTitle: boolean;
  };
}

export interface TestimonialsSection extends BaseSection {
  type: "testimonials";
  content: {
    title: string;
    description?: string;
    items: { id: string; quote: string; author: string; role: string; avatarUrl?: string }[];
  };
  style: {
    layout: "carousel" | "grid" | "masonry";
  };
  settings: {
    showTitle: boolean;
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


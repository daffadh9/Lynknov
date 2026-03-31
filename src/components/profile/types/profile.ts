export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username: string;
  followers?: string; // Legacy optional, maybe keep it 
  views?: string;   // Legacy optional
  lastSync?: string;
  avatarUrl?: string;
  // New flexible stats for Connect section
  stats?: { label: string; value: string }[];
  themeColor?: string;
}

export interface DigitalPresence {
  featuredPost?: {
    platform: "YouTube" | "Instagram" | "X" | "TikTok" | "LinkedIn" | string;
    type: "video" | "image" | "text" | "article";
    title: string;
    mediaUrl?: string;
    url: string;
    postedAt: string;
  };
}

export interface ShowcaseOffer {
  id: string;
  type: string; // Will just use string to be loose, e.g. "Produk" | "Jasa"
  title: string;
  pricing?: string;
  description: string;
  ctaText: string;
  imageUrl: string;
  link: string;
  tags?: string[];
  isFeatured?: boolean;
}

export interface Highlight {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link: string;
  status?: string;
  date?: string; // new display date field
  metadata?: {
    role?: string;
    timeline?: string;
    impact?: string;
  };
}

export interface LinkGroupItem {
  label: string;
  url: string;
  icon?: string;
  isPinned?: boolean;
  badge?: string;
  previewUrl?: string;
}

export interface LinkGroup {
  id: string;
  title: string; // Jualan, Work, Pribadi, dll
  mode?: "personal" | "work" | "product";
  links: LinkGroupItem[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface Spotlight {
  id: string;
  title: string;
  coverUrl: string;
  items?: { id: string; type: "image" | "video"; url: string }[];
}

export interface StoryboardItem {
  id: string;
  date: string;
  title: string;
  content: string;
  status: "completed" | "in-progress" | "planned" | string;
}

export interface AboutItem {
  title: string;
  content: string;
}

export interface ProfileData {
  username: string;
  name: string;
  role: string;
  headline: string;
  bio: string;
  heroImage: string;
  availability?: {
    status: "available" | "limited" | "busy";
    text: string;
  };
  onlineStatus?: {
    isOnline: boolean;
    text: string;
    lastActive?: string;
  };
  hasStory?: boolean;
  primaryCta: {
    label: string;
    url: string;
  };
  secondaryCta?: { // Made secondary CTA for the hero
    label: string;
    url: string;
  };
  socialLinks: SocialLink[];
  digitalPresence?: DigitalPresence;
  about: {
    statement: string;
    focus?: string; // Keep for backwards compatibility
    approach?: string; 
    experience?: string;
    base: string;
    notes?: AboutItem[]; // New adaptable items
  };
  showcaseOffers: ShowcaseOffer[];
  highlights: Highlight[];
  spotlights?: Spotlight[];
  storyboard?: StoryboardItem[];
  kickstart?: {
    heading: string;
    description: string;
    options: string[];
    ctaText: string;
  };
  linkHub: LinkGroup[];
  testimonials: Testimonial[];
  gallery?: {
    id: string;
    url: string;
    ratio: 'portrait' | 'landscape' | 'square';
  }[];
  closingCta: {
    badge: string;
    heading: string;
    supportingText: string;
    labelPrimary: string;
    urlPrimary: string;
    labelSecondary: string;
    urlSecondary: string;
  };
  footerNote: string;
}

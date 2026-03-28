export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ShowcaseOffer {
  id: string;
  type: 'service' | 'product';
  title: string;
  pricing: string;
  description: string;
  ctaText: string;
  imageUrl: string;
  link: string;
}

export interface Highlight {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link: string;
  metadata?: {
    role?: string;
    timeline?: string;
    impact?: string;
  };
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
}

export interface ProfileData {
  username: string;
  name: string;
  role: string;
  headline: string;
  bio: string;
  heroImage: string;
  primaryCta: {
    label: string;
    url: string;
  };
  socialLinks: SocialLink[];
  about: string;
  showcaseOffers: ShowcaseOffer[];
  highlights: Highlight[];
  testimonials: Testimonial[];
  closingCta: {
    heading: string;
    supportingText: string;
    label: string;
    url: string;
  };
  contactNote: {
    email: string;
    location: string;
    availability: string;
  };
}

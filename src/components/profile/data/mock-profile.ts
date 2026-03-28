import { ProfileData } from "../types/profile";

export const mockProfile: ProfileData = {
  username: "alex",
  name: "Alex Rivera",
  role: "Digital Product Designer",
  headline: "Crafting digital experiences for modern brands.",
  bio: "Designing end-to-end user journeys for visionary founders.",
  heroImage: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=2080&auto=format&fit=crop", // Polished professional portrait placeholder
  primaryCta: {
    label: "Start a Conversation",
    url: "mailto:hello@example.com",
  },
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { platform: "Dribbble", url: "https://dribbble.com", icon: "dribbble" },
  ],
  about: "Over the past 8 years, I've partnered with seed-stage startups and Fortune 500 companies alike to build products that people actually want to use. My approach is rooted in deep user empathy, rigorous systemic thinking, and a relentless pursuit of visual perfection.",
  showcaseOffers: [
    {
      id: "so1",
      type: "service",
      title: "UI/UX Design Retainer",
      pricing: "From $3k / month",
      description: "End-to-end product design, from wireframing to high-fidelity prototypes and design systems.",
      ctaText: "Inquire Availability",
      imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
      link: "#",
    },
    {
      id: "so2",
      type: "product",
      title: "Design System Boilerplate",
      pricing: "$129 one-time",
      description: "A comprehensive Figma UI kit and React component library to kickstart your next SaaS product.",
      ctaText: "Get the Kit",
      imageUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop",
      link: "#",
    }
  ],
  highlights: [
    {
      id: "h1",
      title: "Fintech Dashboard OS",
      category: "Product Design",
      description: "A complete overhaul of a B2B financial operating system, increasing task efficiency by 40%.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      metadata: {
        role: "Lead Designer",
        timeline: "6 Months",
        impact: "+40% Efficiency"
      }
    },
    {
      id: "h2",
      title: "Lumina AI Platform",
      category: "UX/UI & Branding",
      description: "Zero-to-one design for a generative AI tool focused on enterprise knowledge management.",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
      link: "#",
      metadata: {
        role: "Product Designer",
        timeline: "4 Months",
        impact: "$2M Seed Raised"
      }
    },
    {
      id: "h3",
      title: "Aura Commerce",
      category: "Mobile App Design",
      description: "Premium mobile shopping experience for a luxury consumer tech brand.",
      imageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      metadata: {
        role: "UI/UX Lead",
        timeline: "3 Months",
        impact: "4.9 App Store Rating"
      }
    }
  ],
  testimonials: [
    {
      id: "t1",
      quote: "Alex transformed our complex financial logic into a genuinely enjoyable user experience. The clarity of thought is unmatched.",
      author: "Sarah Jenkins",
      role: "CEO, FinFlow",
    },
    {
      id: "t2",
      quote: "Working with Alex felt like having a co-founder who speaks fluently in design. The end result exceeded our wildest expectations.",
      author: "Marcus Chen",
      role: "Founder, Lumina AI",
    },
    {
      id: "t3",
      quote: "Exceptional taste, rigorous process, and a rare ability to balance business goals with user empathy.",
      author: "Elena Rodriguez",
      role: "VP Product, Aura",
    }
  ],
  closingCta: {
    heading: "Ready to elevate your product?",
    supportingText: "Let's build something exceptional together.",
    label: "Discuss a Project",
    url: "mailto:hello@example.com",
  },
  contactNote: {
    email: "hello@alexrivera.design",
    location: "Based in San Francisco, CA",
    availability: "Available for Q3 2026",
  }
};

export function getProfileByUsername(username: string): ProfileData | null {
  // In a real app, this would be a DB call
  if (username.toLowerCase() === mockProfile.username) {
    return mockProfile;
  }
  return null;
}

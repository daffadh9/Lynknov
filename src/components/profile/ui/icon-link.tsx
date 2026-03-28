import Link from "next/link";
import { Mail, Link as LinkIcon } from "lucide-react";
import { SocialLink } from "../types/profile";

interface IconLinkProps {
  social: SocialLink;
}

export function IconLink({ social }: IconLinkProps) {
  const getIcon = (iconName: string) => {
    const className = "w-5 h-5";
    const strokeWidth = 1.5;
    
    switch (iconName.toLowerCase()) {
      case "linkedin": 
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        );
      case "twitter": 
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
        );
      case "dribbble": 
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.65-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
          </svg>
        );
      case "github": 
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        );
      case "mail": 
        return <Mail className={className} strokeWidth={strokeWidth} />;
      default: 
        return <LinkIcon className={className} strokeWidth={strokeWidth} />;
    }
  };

  return (
    <Link
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-12 w-12 items-center justify-center rounded-full text-[#A1A1AA] transition-colors duration-300 hover:bg-white/5 hover:text-white"
      aria-label={social.platform}
    >
      {getIcon(social.icon)}
    </Link>
  );
}

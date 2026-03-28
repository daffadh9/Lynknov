import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

interface PrimaryButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function PrimaryButton({ href, children, className, ...props }: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-14 items-center justify-center rounded-2xl bg-[#FAFAFA] px-8 text-base font-semibold text-[#050505] transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-[0.98] ${className || ""}`}
      {...props}
    >
      {children}
    </Link>
  );
}

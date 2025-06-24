"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  href?: string;
  hideText?: boolean;
  onClick?: () => void;
}

// SVG icon component representing 'Terra' (stability) and 'Flow' (dynamic movement)
const LogoIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("text-primary", className)}
    {...props}
  >
    <path d="M3 20h18" stroke="hsl(var(--muted-foreground))" strokeWidth="2.5" />
    <path d="M7 16s-2-4 0-6 4-2 6 0" stroke="hsl(var(--primary))" />
    <path d="M11 16s-2-4 0-6 4-2 6 0" stroke="hsl(var(--primary))" opacity="0.7" />
    <path d="M15 16s-2-4 0-6 4-2 6 0" stroke="hsl(var(--primary))" opacity="0.4" />
  </svg>
);


export const Logo = ({ className, href = '/', hideText = false, onClick }: LogoProps) => {
  return (
    <Link href={href} className={cn("flex items-center gap-3 group", className)} onClick={onClick}>
      <div className="relative w-10 h-10">
         <LogoIcon className="w-full h-full" />
      </div>
      {!hideText && (
        <span className="font-bold text-2xl text-foreground group-hover:text-primary/90 transition-colors">
          TerraFlow
        </span>
      )}
    </Link>
  );
};


"use client";

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  href?: string;
  hideText?: boolean;
  onClick?: () => void;
}

export const Logo = ({ className, href = '/', hideText = false, onClick }: LogoProps) => {
  return (
    <Link href={href} className={cn("flex items-center gap-2 group", className)} onClick={onClick}>
      <div className="relative w-8 h-8">
        <Image 
          src="/logo.png"
          alt="TerraFlow Logo"
          fill
          sizes="32px"
          priority
          className="object-contain"
        />
      </div>
      {!hideText && (
        <span className="font-bold text-xl text-foreground group-hover:text-primary/90 transition-colors">
          TerraFlow
        </span>
      )}
    </Link>
  );
};

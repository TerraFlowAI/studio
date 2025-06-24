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
    <Link href={href} className={cn("flex items-center gap-3 group", className)} onClick={onClick}>
      <div className="relative w-10 h-10">
        <Image 
          src="/logo.png"
          alt="TerraFlow Logo"
          fill
          sizes="40px"
          priority
          className="object-contain"
        />
      </div>
      {!hideText && (
        <span className="font-bold text-2xl text-foreground group-hover:text-primary/90 transition-colors">
          TerraFlow
        </span>
      )}
    </Link>
  );
};

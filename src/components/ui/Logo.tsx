// src/components/ui/Logo.tsx
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  href?: string;
  size?: number; 
  hideText?: boolean;
  onClick?: () => void;
}

export const Logo = ({ className, href = '/', size = 40, hideText = false, onClick }: LogoProps) => {
  return (
    <Link href={href} className={cn("flex items-center gap-3 group", className)} onClick={onClick}>
      <div 
        className="relative shrink-0" 
        style={{ width: size, height: size }}
      >
        {/* The src path now correctly points to the file in /public */}
        <Image 
          src="/terraflow-logo.png" 
          alt="TerraFlow Logo"
          fill
          sizes={`${size}px`}
          priority // Load the logo quickly as it's important
        />
      </div>
      {!hideText && (
        <span className="font-bold text-xl lg:text-2xl text-foreground group-hover:text-primary/90 transition-colors">
          TerraFlow
        </span>
      )}
    </Link>
  );
};

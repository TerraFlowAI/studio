// src/components/ui/Logo.tsx
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  href?: string;
  size?: number; // The new size prop
  hideText?: boolean; // Maintained for sidebar compatibility
  onClick?: () => void; // Maintained for sidebar compatibility
}

export const Logo = ({ className, href = '/', size = 36, hideText = false, onClick }: LogoProps) => {
  return (
    <Link href={href} className={cn("flex items-center gap-3", className)} onClick={onClick}>
      {/* The div now uses the dynamic 'size' prop for its dimensions */}
      <div 
        className="relative shrink-0" 
        style={{ width: size, height: size }}
      >
        <Image 
          src="/logo.png"
          alt="TerraFlow Logo"
          fill
          sizes={`${size}px`} // Tells the browser the image's rendered size
          priority
        />
      </div>
      {/* Increased the text size for better visibility */}
      {!hideText && (
        <span className="font-bold text-xl lg:text-2xl text-slate-900 dark:text-white">
          TerraFlow
        </span>
      )}
    </Link>
  );
};
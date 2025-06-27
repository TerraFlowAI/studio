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
  layout?: 'horizontal' | 'vertical';
}

export const Logo = ({ className, href = '/', size = 40, hideText = false, onClick, layout = 'horizontal' }: LogoProps) => {
  return (
    <Link 
        href={href} 
        className={cn(
            "flex items-center group", 
            layout === 'horizontal' ? 'flex-row gap-3' : 'flex-col gap-2',
            className
        )} 
        onClick={onClick}
    >
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
        <span className="font-bold text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-600 group-hover:opacity-90 transition-opacity">
          TerraFlow
        </span>
      )}
    </Link>
  );
};


import { MountainSnow } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function Logo({ size = 'md', showIcon = true }: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors group">
      {showIcon && <MountainSnow className={`h-6 w-6 ${size === 'lg' ? 'md:h-8 md:w-8' : '' } group-hover:animate-pulse`} />}
      <span className={`font-headline font-semibold ${sizeClasses[size]}`}>
        TerraFlowAI
      </span>
    </Link>
  );
}

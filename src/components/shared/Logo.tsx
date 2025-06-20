import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  hideText?: boolean;
  className?: string;
}

const textSizeClasses = {
  sm: 'text-lg', // Adjusted for better fit with icon
  md: 'text-xl',
  lg: 'text-2xl',
};

const iconDimensionsConfig = {
  sm: { width: 20, height: 20 },
  md: { width: 24, height: 24 },
  lg: { width: 28, height: 28 },
};

export function Logo({ size = 'md', showIcon = true, hideText = false, className }: LogoProps) {
  const iconDims = iconDimensionsConfig[size] || iconDimensionsConfig.md;

  return (
    <div className={cn("flex items-center gap-2 text-primary group", className)}>
      {showIcon && (
        <Image
          src="https://placehold.co/100x100.png" 
          alt="TerraFlowAI Logo"
          width={iconDims.width}
          height={iconDims.height}
          className="group-hover:opacity-90 transition-opacity object-contain"
          data-ai-hint="TerraFlow logo T green"
        />
      )}
      {!hideText && (
        <span className={cn(
          `font-headline font-semibold`,
          textSizeClasses[size],
          "text-foreground group-hover:text-primary/90 transition-colors"
        )}>
          TerraFlowAI
        </span>
      )}
    </div>
  );
}


import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  hideText?: boolean;
  className?: string;
}

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
};

const iconDimensionsConfig = {
  sm: { width: 20, height: 20 },
  md: { width: 24, height: 24 },
  lg: { width: 28, height: 28 },
};

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


export function Logo({ size = 'md', showIcon = true, hideText = false, className }: LogoProps) {
  const iconDims = iconDimensionsConfig[size] || iconDimensionsConfig.md;

  return (
    <div className={cn("flex items-center gap-2 group", className)}>
      {showIcon && (
        <LogoIcon
          width={iconDims.width}
          height={iconDims.height}
          className="group-hover:opacity-90 transition-opacity"
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

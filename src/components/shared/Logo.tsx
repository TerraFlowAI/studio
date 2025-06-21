
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

// The new SVG icon component based on your design prompt
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
    <path d="M3,7 Q9,2 12,7 T21,7" />
    <path d="M3,12 Q9,7 12,12 T21,12" opacity="0.8" />
    <path d="M3,17 Q9,12 12,17 T21,17" opacity="0.6" />
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

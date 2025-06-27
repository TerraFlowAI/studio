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
  variant?: 'default' | 'on-dark';
}

export const Logo = ({ className, href = '/', size = 40, hideText = false, onClick, layout = 'horizontal', variant = 'default' }: LogoProps) => {
  return (
    <Link
        href={href}
        className={cn(
            "flex items-center group",
            layout === 'horizontal' ? 'flex-row gap-3' : 'flex-col gap-0 -mt-2',
            className
        )}
        onClick={onClick}
    >
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src="/terraflow-logo.png"
          alt="TerraFlow Logo"
          fill
          sizes={`${size}px`}
          priority
        />
      </div>
      {!hideText && (
        <div className={cn(
            "font-bold -mt-2",
            size > 60 ? "text-4xl" : "text-2xl lg:text-3xl"
        )}>
            <span className={cn(
              "text-primary transition-colors duration-300",
              variant === 'default' && "group-hover:text-foreground",
              variant === 'on-dark' && "group-hover:text-white"
            )}>Terra</span>
            <span className={cn(
              "group-hover:text-primary transition-colors duration-300",
              variant === 'default' && "text-foreground",
              variant === 'on-dark' && "text-white"
            )}>Flow</span>
        </div>
      )}
    </Link>
  );
};

// src/components/ui/Logo.tsx
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// New SVG icon component based on the provided image
const LogoIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100" // A 100x100 viewbox for easier path creation
    fill="none"
    className={className}
    {...props}
  >
    <defs>
      <linearGradient id="terraflow-gradient" x1="0.5" y1="0" x2="0.5" y2="1">
        {/* Using green shades from the image */}
        <stop offset="0%" stopColor="#53F37E" />
        <stop offset="100%" stopColor="#22C55E" />
      </linearGradient>
      {/* Adding a gradient for the inner shadow to create depth */}
      <linearGradient id="terraflow-shadow-gradient" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#16A34A" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
    </defs>
    
    {/* Main logo shape with gradient */}
    <path 
      d="M50 90 L50 38 C50 35 48 35 45 35 L25 35 C15 35 12 30 15 20 C18 10 28 5 40 5 L60 5 C72 5 82 10 85 20 C88 30 85 35 75 35 L55 35 C52 35 50 35 50 38 Z"
      fill="url(#terraflow-gradient)"
    />
    
    {/* Inner path to create the 3D / shadow effect */}
    <path 
      d="M50 90 L50 38 C50 35 52 35 55 35 L75 35 C85 35 88 30 85 20 C82 10 72 5 60 5 L50 5 Z"
      fill="url(#terraflow-shadow-gradient)"
      opacity="0.7"
    />
  </svg>
);


interface LogoProps {
  className?: string;
  href?: string;
  size?: number; 
  hideText?: boolean;
  onClick?: () => void;
}

export const Logo = ({ className, href = '/', size = 36, hideText = false, onClick }: LogoProps) => {
  return (
    <Link href={href} className={cn("flex items-center gap-3 group", className)} onClick={onClick}>
       <LogoIcon
        style={{ width: size, height: size }}
        className="group-hover:opacity-90 transition-opacity"
      />
      {!hideText && (
        <span className="font-bold text-xl lg:text-2xl text-foreground group-hover:text-primary/90 transition-colors">
          TerraFlow
        </span>
      )}
    </Link>
  );
};

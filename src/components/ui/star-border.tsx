
"use client";

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';

interface StarBorderProps extends Omit<ButtonProps, 'variant' | 'size'> {
  as?: 'button' | 'a';
  children: React.ReactNode;
  className?: string;
}

export const StarBorder = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  StarBorderProps
>(({ as = 'button', children, className, ...props }, ref) => {
  const Comp = as === 'a' ? 'a' : Slot;

  const baseClasses = "relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-primary rounded-lg shadow-md group hover:shadow-lg";
  const spanClasses = "absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease";
  const starCommonClasses = "absolute MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-accent css-1x5jdml transition-opacity duration-300 ease-in-out";

  // Wrap the internal visual elements in a single span
  // This span will be the direct child of the Button (or Slot)
  const buttonInternalContent = (
    <span className="relative w-full h-full flex items-center justify-center"> {/* Added relative positioning for absolute children */}
      <span className={cn(spanClasses, "bg-accent group-hover:bg-primary")}>
        <svg className={cn(starCommonClasses, "opacity-0 group-hover:opacity-100 left-2 top-1/2 -translate-y-1/2")} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="StarIcon">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      </span>
      <span className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease group-hover:text-primary-foreground">
        {children}
      </span>
      <span className="relative invisible">{children}</span>
    </span>
  );

  return (
    <Button
      variant="outline"
      className={cn(
        baseClasses,
        "border-accent hover:border-primary hover:bg-transparent text-foreground", // Adjusted for primary/accent theme
        className
      )}
      ref={ref as React.Ref<HTMLButtonElement>} 
      {...(Comp === Slot ? { asChild: true } : {})}
      {...props}
    >
      {buttonInternalContent}
    </Button>
  );
});

StarBorder.displayName = 'StarBorder';


"use client";

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Star } from 'lucide-react'; // Import Star from lucide-react

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

  // Removed font-medium from baseClasses to allow children to control font-weight
  const baseClasses = "relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-primary transition duration-300 ease-out border-2 border-primary rounded-lg shadow-md group hover:shadow-lg";
  const spanClasses = "absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-accent group-hover:bg-primary ease";
  // Adjusted starCommonClasses for Lucide icon
  const starIconClasses = "h-5 w-5 text-accent transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100";

  const buttonInternalContent = (
    <span className="relative w-full h-full flex items-center justify-center">
      <span className={cn(spanClasses)}>
        <Star className={cn(starIconClasses, "absolute left-3 top-1/2 -translate-y-1/2")} />
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
        "border-accent hover:border-primary hover:bg-transparent text-foreground", 
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

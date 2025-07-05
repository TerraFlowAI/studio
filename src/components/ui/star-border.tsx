"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import Link, { type LinkProps } from "next/link";

// Update props to extend LinkProps for type safety.
interface StarBorderProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  speed?: string;
}

export function StarBorder({
  className,
  children,
  href,
  speed = "6s",
  ...props
}: StarBorderProps) {
  const starBottomRef = useRef<HTMLDivElement>(null);
  const starTopRef = useRef<HTMLDivElement>(null);
  // Hardcode the color to prevent server-side crash from trying to resolve CSS variables.
  // This color corresponds to hsl(var(--primary)) from your theme.
  const fixedColor = "#14998D"; 

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    if (starBottomRef.current) {
      starBottomRef.current.style.background = `radial-gradient(circle, ${fixedColor}, transparent 10%)`;
      starBottomRef.current.style.animationDuration = speed;
    }
    if (starTopRef.current) {
      starTopRef.current.style.background = `radial-gradient(circle, ${fixedColor}, transparent 10%)`;
      starTopRef.current.style.animationDuration = speed;
    }
    // We only need to run this once on mount, or if speed changes.
  }, [speed, fixedColor]);

  return (
    <Link
      href={href}
      className={cn(
        "relative inline-block py-[1px] overflow-hidden rounded-[20px]",
        className
      )}
      {...props}
    >
      <div
        ref={starBottomRef}
        className={cn(
          "absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0",
          "opacity-20 dark:opacity-70"
        )}
      />
      <div
        ref={starTopRef}
        className={cn(
          "absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0",
          "opacity-20 dark:opacity-70"
        )}
      />
      <div
        className={cn(
          "relative z-1 border text-foreground text-center text-base py-4 px-6 rounded-[20px]",
          "bg-gradient-to-b from-background/90 to-muted/90 border-border/40",
          "dark:from-background dark:to-muted dark:border-border",
          "transition-all duration-300"
        )}
      >
        {children}
      </div>
    </Link>
  );
}

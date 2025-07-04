"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { Menu, X, Users, Code, Building, Zap, BarChart3, PenSquare, ShieldCheck } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Solutions", href: "#solutions", dropdown: true },
  { name: "Pricing", href: "/pricing" },
  { name: "Company", href: "/about" },
];

const solutionsDropdownLinks = {
  byRole: [
    { name: "For Agents", description: "AI tools to boost individual agent productivity.", href: "/solutions/agents", icon: Users },
    { name: "For Developers", description: "Streamline project management and sales cycles.", href: "/solutions/developers", icon: Code },
    { name: "For Brokerages", description: "Scale your business with an end-to-end OS.", href: "/solutions/brokerages", icon: Building },
  ],
  byService: [
    { name: "TerraLead™", href: "#", icon: Zap, description: "Capture, qualify, and nurture leads automatically." },
    { name: "TerraValuate™ & MarketIntel™", href: "#", icon: BarChart3, description: "Get precise, data-driven property valuations." },
    { name: "TerraScribe™ & TerraVision™", href: "#", icon: PenSquare, description: "Generate content and immersive VR tours." },
    { name: "TerraSmartFlow™ & TerraSecure™", href: "#", icon: ShieldCheck, description: "Automate workflows with bank-grade security." },
  ],
};

export function LandingPageNavigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide on scroll down, show on scroll up for non-mobile
    setHidden(latest > previous && latest > 150);
    // Change style after scrolling past a small threshold
    setScrolled(latest > 50);
  });
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 z-50 w-full"
      >
        <div className={cn("container mx-auto transition-all duration-300", scrolled ? "py-2" : "py-4")}>
          <div className={cn(
            "flex items-center justify-between transition-all duration-300",
            scrolled ? "bg-background/80 backdrop-blur-lg shadow-md border border-slate-200/50 px-4 py-2 rounded-full" : "bg-transparent px-2 py-1"
          )}>
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Logo href="/" size={40} />
            </div>

            {/* Center: Desktop Nav */}
            <nav className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="#features" className={cn(navigationMenuTriggerStyle(), "rounded-full bg-transparent text-sm font-medium")}>
                        Features
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="rounded-full bg-transparent text-sm font-medium">Solutions</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-2 gap-4 p-4 w-[600px]">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-xs text-primary px-3">BY ROLE</h3>
                          {solutionsDropdownLinks.byRole.map(({ name, description, href, icon: Icon }) => (
                            <DropdownListItem key={name} href={href} title={name} icon={Icon}>{description}</DropdownListItem>
                          ))}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-xs text-primary px-3">BY SERVICE</h3>
                          {solutionsDropdownLinks.byService.map(({ name, description, href, icon: Icon }) => (
                            <DropdownListItem key={name} href={href} title={name} icon={Icon}>{description}</DropdownListItem>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/pricing" className={cn(navigationMenuTriggerStyle(), "rounded-full bg-transparent text-sm font-medium")}>
                        Pricing
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/about" className={cn(navigationMenuTriggerStyle(), "rounded-full bg-transparent text-sm font-medium")}>
                        Company
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Right: CTAs */}
            <div className="hidden md:flex items-center space-x-2">
              <Button asChild variant="ghost" className="rounded-full text-sm font-semibold">
                <Link href="/login">Login</Link>
              </Button>
               <Button asChild className="rounded-full text-sm font-semibold bg-slate-800 hover:bg-slate-900 text-white shadow-md">
                <Link href="/#contact">Get Started</Link>
              </Button>
            </div>

            {/* Mobile: Hamburger Menu */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && <MobileMenu onDismiss={toggleMobileMenu} />}
      </AnimatePresence>
    </>
  );
}

const DropdownListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string, children?: React.ReactNode, icon: React.ElementType }
>(({ href, title, children, icon: Icon, ...props }, ref) => (
  <NavigationMenuLink asChild>
    <Link href={href} ref={ref} className="group block rounded-lg p-3 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-800" {...props}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
          {children && <p className="text-slate-500 dark:text-slate-400 text-xs leading-snug">{children}</p>}
        </div>
      </div>
    </Link>
  </NavigationMenuLink>
));
DropdownListItem.displayName = "DropdownListItem";

const mobileMenuVariants = {
  hidden: { opacity: 0, y: "-20%" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: "-20%", transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const MobileMenu = ({ onDismiss }: { onDismiss: () => void }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={mobileMenuVariants}
    className="fixed inset-0 z-40 h-screen w-screen bg-background/95 backdrop-blur-xl p-4 md:hidden"
  >
    <div className="flex h-16 items-center justify-between">
      <Logo />
      <Button variant="ghost" size="icon" onClick={onDismiss}>
        <X className="h-6 w-6" />
      </Button>
    </div>
    <nav className="mt-8 flex flex-col space-y-2">
      {navLinks.map((link) => (
        <Link 
          key={link.name} 
          href={link.href}
          onClick={onDismiss}
          className="rounded-lg px-4 py-3 text-lg font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {link.name}
        </Link>
      ))}
    </nav>
    <div className="mt-8 space-y-4 border-t border-slate-200 pt-6 dark:border-slate-800">
      <Button asChild className="w-full text-lg py-3 bg-slate-800 hover:bg-slate-900 text-white">
        <Link href="#contact" onClick={onDismiss}>
          Get Started
        </Link>
      </Button>
      <Button asChild variant="ghost" className="w-full justify-center py-3 text-lg">
        <Link href="/login" onClick={onDismiss}>Login</Link>
      </Button>
    </div>
  </motion.div>
);
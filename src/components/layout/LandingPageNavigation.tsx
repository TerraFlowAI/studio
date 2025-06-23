
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared/Logo';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export const LandingPageNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const solutionsLinks = [
    { title: "For Agents", href: "/solutions/agents", description: "Tailored AI tools for individual real estate agents." },
    { title: "For Developers", href: "/solutions/developers", description: "Solutions for property developers and builders." },
    { title: "For Brokerages", href: "/solutions/brokerages", description: "Platform features for real estate brokerage firms." },
  ];

  const platformLinks = [
    { title: "TerraLead™ AI Suite", href: "/platform/terralead", description: "Advanced AI for lead scoring and nurturing." },
    { title: "TerraValuate™ Pro", href: "/platform/terravaluate", description: "Precision property valuation with AI." },
    { title: "TerraScribe™", href: "/platform/terrascribe", description: "AI-powered content generation for listings." },
    { title: "MarketIntel™", href: "/platform/marketintel", description: "Real-time market analysis and insights." },
    { title: "SmartFlow™", href: "/platform/smartflow", description: "Automate your real estate workflows." },
  ];

  const resourcesLinks = [
    { title: "Blog", href: "/blog", description: "Latest articles and insights from TerraFlow." },
    { title: "Case Studies", href: "/case-studies", description: "Success stories from our clients." },
    { title: "Webinars", href: "/webinars", description: "Join our live sessions and learn more." },
  ];

  const navItemBaseClass = "bg-transparent hover:bg-slate-100 focus:bg-slate-100 text-foreground data-[active]:bg-slate-100/50 data-[state=open]:bg-slate-100/50";

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={navItemBaseClass}>
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {solutionsLinks.map((component) => (
                        <ListItem key={component.title} title={component.title} href={component.href}>
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), navItemBaseClass)}>
                    <Link href="/pricing">
                      Pricing
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                 <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), navItemBaseClass)}>
                    <Link href="/company">
                      Company
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden lg:flex items-center space-x-4">            
            <Button asChild variant="ghost" className="text-foreground hover:bg-slate-100">
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md hover:shadow-lg transition-shadow">
                Request a Demo
            </Button>
          </div>

          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary ml-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="space-y-2 px-2">
              <Link href="#solutions" className={cn("block px-3 py-2 rounded-md", navItemBaseClass)} onClick={() => setIsOpen(false)}>Solutions</Link>
              <Link href="/pricing" className={cn("block px-3 py-2 rounded-md", navItemBaseClass)} onClick={() => setIsOpen(false)}>Pricing</Link>
              <Link href="/company" className={cn("block px-3 py-2 rounded-md", navItemBaseClass)} onClick={() => setIsOpen(false)}>Company</Link>
              <Button asChild variant="ghost" className="w-full justify-start px-3 py-2 text-foreground hover:bg-accent hover:text-accent-foreground">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </Button>
              <Button className="w-full mt-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                Request a Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
});
ListItem.displayName = "ListItem";

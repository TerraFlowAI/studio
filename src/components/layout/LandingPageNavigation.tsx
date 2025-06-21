
"use client";

import React, { useState } from 'react';
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
import { StarBorder } from '@/components/ui/star-border';
import { Logo } from '@/components/shared/Logo';

export const LandingPageNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const navItemBaseClass = "bg-transparent hover:bg-accent/50 focus:bg-accent/50 text-foreground hover:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50";

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
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
                  <NavigationMenuTrigger className={navItemBaseClass}>
                    Platform
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {platformLinks.map((component) => (
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
                  <NavigationMenuTrigger className={navItemBaseClass}>
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                       {resourcesLinks.map((component) => (
                        <ListItem key={component.title} title={component.title} href={component.href}>
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden lg:flex items-center space-x-2">            
            <Link href="/login" passHref>
              <Button variant="ghost" className="text-foreground hover:bg-accent/50 hover:text-accent-foreground">Login</Button>
            </Link>
            <StarBorder
              as="button" 
              className="font-semibold" 
              data-cta-click="nav-demo-request"
            >
              <span className="animate-text-shimmer text-sm">Request Free Demo</span>
            </StarBorder>
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
              <Link href="#platform" className={cn("block px-3 py-2 rounded-md", navItemBaseClass)} onClick={() => setIsOpen(false)}>Platform</Link>
              <Link href="/pricing" className={cn("block px-3 py-2 rounded-md", navItemBaseClass)} onClick={() => setIsOpen(false)}>Pricing</Link>
              <Link href="#resources" className={cn("block px-3 py-2 rounded-md", navItemBaseClass)} onClick={() => setIsOpen(false)}>Resources</Link>
              <Link href="/login" passHref>
                <Button
                  variant="ghost" 
                  className="w-full justify-start px-3 py-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsOpen(false)} 
                >
                  Login
                </Button>
              </Link>
              <StarBorder
                as="button" 
                className="w-full mt-2 font-semibold"
                onClick={() => {
                  setIsOpen(false);
                  // Potentially trigger demo request action here
                }}
                data-cta-click="nav-mobile-demo-request"
              >
                <span className="animate-text-shimmer text-sm">Request Free Demo</span>
              </StarBorder>
            </div>
          </div>
        )}
      </div>
    </nav>
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
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
});
ListItem.displayName = "ListItem";


"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Send } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const footerLinks = {
  platform: [
    { name: "TerraLead™ AI", href: "/platform/terralead" },
    { name: "TerraValuate™ Pro", href: "/platform/terravaluate" },
    { name: "TerraScribe™", href: "/platform/terrascribe" },
    { name: "MarketIntel™", href: "/platform/marketintel" },
    { name: "SmartFlow™ Automation", href: "/platform/smartflow" },
  ],
  solutions: [
    { name: "For Agents", href: "/solutions/agents" },
    { name: "For Developers", href: "/solutions/developers" },
    { name: "For Brokerages", href: "/solutions/brokerages" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Webinars", href: "/webinars" },
    { name: "API Documentation", href: "/docs" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/terraflowai" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/terraflowai" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/terraflowai" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/terraflowai" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/c/terraflowai" },
];

export function Footer() {
  return (
    <footer className="bg-muted/40 dark:bg-slate-800 text-muted-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 xl:gap-12">
          {/* Logo & Newsletter */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Logo size="lg" />
            </Link>
            <p className="text-sm mb-4 max-w-xs">
              TerraFlowAI: Revolutionizing real estate with intelligent automation and data-driven insights.
            </p>
            <form className="flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Enter your email for updates" className="bg-background border-border focus:border-primary" />
              <Button type="submit" variant="default" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>

          {/* Link Columns */}
          <div>
            <h5 className="font-semibold text-foreground mb-4">Platform</h5>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-4">Solutions</h5>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-foreground mb-4">Resources</h5>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-4">Company</h5>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} TerraFlowAI Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}
                      className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

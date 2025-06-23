
"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Send } from "lucide-react";

const footerLinks = {
  platform: [
    { name: "TerraLead™ AI", href: "#" },
    { name: "TerraValuate™ Pro", href: "#" },
    { name: "TerraScribe™", href: "#" },
    { name: "MarketIntel™", href: "#" },
    { name: "SmartFlow™", href: "#" },
  ],
  solutions: [
    { name: "For Agents", href: "#" },
    { name: "For Developers", href: "#" },
    { name: "For Brokerages", href: "#" },
  ],
  resources: [
    { name: "Blog", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Webinars", href: "#" },
    { name: "API Docs", href: "#" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-600 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 xl:gap-12">
          {/* Logo & Newsletter */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Logo size="lg" />
            </Link>
            <p className="text-sm mb-4 max-w-xs text-slate-500">
              The AI Operating System for Modern Real Estate.
            </p>
            <h6 className="font-semibold text-slate-800 mb-2">Stay Updated</h6>
            <form className="flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Your email" className="bg-white border-slate-300 focus:border-primary" />
              <Button type="submit" variant="default" size="icon" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white flex-shrink-0">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>

          {/* Link Columns */}
          <div>
            <h5 className="font-bold text-slate-800 mb-4">Platform</h5>
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
            <h5 className="font-bold text-slate-800 mb-4">Solutions</h5>
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
            <h5 className="font-bold text-slate-800 mb-4">Resources</h5>
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
            <h5 className="font-bold text-slate-800 mb-4">Company</h5>
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

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} TerraFlowAI Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}
                      className="text-slate-500 hover:text-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

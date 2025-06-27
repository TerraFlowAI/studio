
"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Linkedin, Twitter, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Updated footer links structure
const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "TerraLead™", href: "#" },
    { name: "TerraValuate™", href: "#" },
    { name: "TerraScribe™", href: "#" },
    { name: "Pricing", href: "/pricing" },
    { name: "Request a Demo", href: "#contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "#" },
    { name: "Contact Us", href: "#contact" },
  ],
  resources: [
    { name: "Blog", href: "#" },
    { name: "Help & Support", href: "/help-support" },
    { name: "Case Studies", href: "#" },
    { name: "API Documentation", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export function Footer() {
  const { toast } = useToast();

  const handleSubscription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    if (email) {
      console.log("Newsletter subscription for:", email);
      toast({
        title: "Subscribed!",
        description: "Thanks for joining our newsletter. You'll hear from us soon.",
      });
      e.currentTarget.reset();
    }
  };

  return (
    <footer className="bg-slate-900 text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand & Newsletter */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo href="/" size={64} variant="on-dark" className="mb-4" layout="vertical" />
            <p className="text-sm max-w-xs">
              The AI Operating System for Real Estate.
            </p>
            <form className="mt-6 space-y-2" onSubmit={handleSubscription}>
              <label htmlFor="footer-newsletter-email" className="text-sm font-medium text-gray-300">
                Join our newsletter
              </label>
              <div className="flex gap-2">
                <Input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  className="bg-slate-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-primary focus:border-primary"
                  required
                />
                <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
            </form>
          </div>

          {/* Column 2: Product */}
          <div>
            <h5 className="font-bold text-white mb-4">Product</h5>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h5 className="font-bold text-white mb-4">Company</h5>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Resources */}
          <div>
            <h5 className="font-bold text-white mb-4">Resources</h5>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h5 className="font-bold text-white mb-4">Legal</h5>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} TerraFlow Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}
                      className="text-gray-500 hover:text-white transition-colors">
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

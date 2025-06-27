
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { Menu, X, Users, Code, Building, Zap, BarChart3, PenSquare } from "lucide-react";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Solutions", href: "#solutions", dropdown: true },
  { name: "Pricing", href: "/pricing" },
  { name: "Company", href: "/about" },
];

const solutionsDropdownLinks = {
  byRole: [
    { name: "For Agents", description: "AI tools to boost individual agent productivity.", href: "#", icon: Users },
    { name: "For Developers", description: "Streamline project management and sales cycles.", href: "#", icon: Building },
    { name: "For Brokerages", description: "Scale your business with an end-to-end OS.", href: "#", icon: Code },
  ],
  byService: [
    { name: "TerraLead™", href: "#", icon: Zap },
    { name: "TerraValuate™", href: "#", icon: BarChart3 },
    { name: "TerraScribe™", href: "#", icon: PenSquare },
  ],
};


export function LandingPageNavigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredSolution, setHoveredSolution] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 150);
    setScrolled(latest > 50);
  });
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled ? "border-b border-slate-200/50 bg-background/80 backdrop-blur-lg" : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Logo href="/" />
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <div
                key={link.name}
                onMouseEnter={() => link.dropdown && setHoveredSolution(true)}
                onMouseLeave={() => link.dropdown && setHoveredSolution(false)}
                className="relative"
              >
                <Link href={link.href} className="group relative px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                    {link.name}
                    <span className="absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 bg-primary transition-transform group-hover:scale-x-100"></span>
                </Link>
                {link.dropdown && (
                  <AnimatePresence>
                    {hoveredSolution && <SolutionsDropdown />}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right: CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild className="animate-shimmering-border rounded-lg bg-slate-900 text-white hover:shadow-primary/20 hover:shadow-lg transition-shadow">
               <Link href="#contact">
                    <span className="relative">Request a Demo</span>
                </Link>
            </Button>
            <Button asChild variant="ghost" className="text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
              <Link href="/login">Login</Link>
            </Button>
          </div>

          {/* Mobile: Hamburger Menu */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6" />
            </Button>
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

const SolutionsDropdown = () => (
    <motion.div 
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-screen max-w-md"
    >
        <div className="overflow-hidden rounded-xl bg-white/80 shadow-lg ring-1 ring-slate-900/5 backdrop-blur-lg dark:bg-slate-900/80 dark:ring-white/10">
            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="space-y-1">
                    <h3 className="font-semibold text-sm text-primary">By Role</h3>
                    {solutionsDropdownLinks.byRole.map(({ name, description, href, icon: Icon }) => (
                       <DropdownListItem key={name} href={href} title={name} icon={Icon}>{description}</DropdownListItem>
                    ))}
                </div>
                 <div className="space-y-1">
                    <h3 className="font-semibold text-sm text-primary">By Service</h3>
                    {solutionsDropdownLinks.byService.map(({ name, href, icon: Icon }) => (
                       <DropdownListItem key={name} href={href} title={name} icon={Icon} />
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
);

const DropdownListItem: React.FC<{ href: string; title: string; children?: React.ReactNode; icon: React.ElementType }> = ({ href, title, children, icon: Icon }) => (
  <Link href={href} className="group block rounded-lg p-3 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
    <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <Icon className="h-5 w-5" />
        </div>
        <div>
            <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
            {children && <p className="text-slate-500 dark:text-slate-400">{children}</p>}
        </div>
    </div>
  </Link>
);


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
    <div className="flex h-20 items-center justify-between">
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
        <Button asChild className="w-full py-3 text-lg animate-shimmering-border rounded-lg bg-slate-900 text-white">
            <Link href="#contact" onClick={onDismiss}><span className="relative">Request a Demo</span></Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-center py-3 text-lg">
            <Link href="/login" onClick={onDismiss}>Login</Link>
        </Button>
    </div>
  </motion.div>
);

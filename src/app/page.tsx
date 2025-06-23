
"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Bot, 
  Brain, 
  PenSquare, 
  Shield, 
  Linkedin, 
  Twitter,
  Menu,
  X
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";

const NoiseTexture = () => (
  <div 
    className="absolute inset-0 w-full h-full opacity-[0.03] z-0"
    style={{
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
    }}
  />
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Login", href: "/login" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
    >
      <div className="container mx-auto flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-2 pl-4 pr-2 backdrop-blur-md">
        <Logo className="[&>span]:text-white" />
        <div className="hidden md:flex items-center gap-2">
          {navLinks.slice(0, 2).map((link) => (
            <Button key={link.name} variant="ghost" asChild className="text-gray-300 hover:text-white hover:bg-white/10">
              <Link href={link.href}>{link.name}</Link>
            </Button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2">
           <Button variant="ghost" asChild className="text-gray-300 hover:text-white hover:bg-white/10">
              <Link href="/login">Login</Link>
            </Button>
          <Button className="bg-white text-black hover:bg-gray-200">
            Request a Demo
          </Button>
        </div>
        <div className="md:hidden">
          <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="icon" className="text-white">
            {isOpen ? <X/> : <Menu />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 rounded-lg border border-white/10 bg-black/50 p-4 backdrop-blur-md">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
               <li key={link.name}><Link href={link.href} className="text-gray-300 hover:text-white block" onClick={() => setIsOpen(false)}>{link.name}</Link></li>
            ))}
            <li>
              <Button className="bg-white text-black hover:bg-gray-200 w-full">
                Request a Demo
              </Button>
            </li>
          </ul>
        </div>
      )}
    </motion.nav>
  );
};


const useParallax = (value: MotionValue<number>, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

const HeroSection = () => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = (ref.current as HTMLElement).getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };
  
  const rotateX = useTransform(mouseY, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative flex h-screen min-h-[700px] flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] pt-20"
      style={{ perspective: '1000px' }}
    >
      <NoiseTexture />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(37,99,235,0.1),#0A0A0A)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl font-headline"
        >
          The AI Operating System
          <br />
          for Real Estate
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-lg text-[#A1A1A1] font-body"
        >
          TerraFlow integrates predictive analytics, workflow automation, and compliance tools to give elite agents and developers an unparalleled competitive edge.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" className="bg-white text-black hover:bg-gray-200">
            Request a Demo
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
            View Pricing
          </Button>
        </motion.div>
      </div>

      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute bottom-[-20%] sm:bottom-[-25%] md:bottom-[-30%] lg:bottom-[-40%] w-[150%] max-w-[1200px]"
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative rounded-t-xl border-t border-x border-white/10 p-2 pb-0 shadow-[0_0_100px_rgba(37,99,235,0.2)]"
        >
          <div className="h-[2px] w-[60%] mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <video
            src="/hero-animation.mp4"
            className="w-full h-auto rounded-t-lg"
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

const SocialProofSection = () => {
    const logos = [
        "DLF", "Prestige", "Godrej Properties", "Sobha Ltd", "Lodha",
        "Brigade Group", "Indiabulls Real Estate", "Omaxe", "Ansal API", "Hiranandani"
    ];

    return (
        <section className="bg-[#0A0A0A] py-12 md:py-20">
            <div className="container mx-auto text-center">
                <p className="font-semibold uppercase tracking-widest text-[#A1A1A1] font-body">
                    POWERING THE MOST AMBITIOUS TEAMS IN INDIAN REAL ESTATE
                </p>
                <div className="relative mt-8 w-full overflow-hidden">
                    <motion.div
                        className="flex"
                        animate={{ x: ['-0%', '-100%'] }}
                        transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
                    >
                        {[...logos, ...logos].map((logo, index) => (
                            <div key={index} className="flex-shrink-0 w-48 h-12 flex items-center justify-center mx-6">
                                <span className="text-2xl font-bold text-gray-600 opacity-60 font-headline">{logo}</span>
                            </div>
                        ))}
                    </motion.div>
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent"></div>
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent"></div>
                </div>
            </div>
        </section>
    );
};

const InteractiveShowcaseSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"],
  });

  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
        const featureIndex = Math.min(Math.floor(latest * 3), 2);
        setActiveFeature(featureIndex);
    });
  }, [scrollYProgress]);

  const features = [
    { title: "AI-Powered Intel", description: "Get instant, actionable insights on every lead, from AI-generated scores to their likely budget and timeline.", highlightClass: "top-[15%] left-[2%] w-[45%] h-[20%]" },
    { title: "Full Activity History", description: "Never miss a beat with a complete, chronological timeline of every email, call, note, and system update.", highlightClass: "top-[38%] left-[52%] w-[46%] h-[58%]" },
    { title: "Contextual Documents", description: "Access KYC docs, compliance forms, and property brochures directly within the lead's profile for seamless context.", highlightClass: "top-[64%] left-[2%] w-[45%] h-[32%]" },
  ];

  return (
    <section ref={targetRef} id="features" className="relative bg-[#0A0A0A] py-20 md:py-32">
       <NoiseTexture />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-transparent font-headline">From Manual Chaos to AI-Powered Clarity</h2>
          <p className="mt-4 text-lg text-[#A1A1A1] max-w-2xl mx-auto font-body">TerraFlow centralizes every piece of client information into one intelligent, actionable view.</p>
        </div>
        <div className="sticky top-20 grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-24">
                {features.map((feature, index) => (
                    <motion.div key={index} style={{ opacity: useTransform(scrollYProgress, [(index / 3) - 0.1, index / 3, (index / 3) + 0.1], [0.3, 1, 0.3])}}>
                        <h3 className="text-2xl font-bold text-white font-headline">{feature.title}</h3>
                        <p className="mt-2 text-lg text-[#A1A1A1] font-body">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
            <div className="hidden lg:block relative">
                <Image
                    src="https://placehold.co/1200x900/111111/444444.png"
                    alt="TerraFlow Lead Detail Page"
                    width={1200}
                    height={900}
                    className="rounded-xl border border-white/10"
                    data-ai-hint="dashboard ui detail"
                />
                {features.map((feature, index) => (
                     <motion.div
                        key={index}
                        className={cn("absolute rounded-lg border-2 border-blue-500 bg-blue-500/10 transition-opacity duration-300", feature.highlightClass)}
                        style={{ opacity: activeFeature === index ? 1 : 0 }}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

const ServicesGridSection = () => {
    const services = [
      { icon: Bot, title: "Intelligent Sales Automation", description: "Automate lead capture, scoring, and follow-ups with SmartFlow™ workflows.", name: "TerraLead™" },
      { icon: Brain, title: "Predictive Market Intelligence", description: "Access real-time market data, trend forecasting, and AI-powered CMA reports.", name: "MarketIntel™" },
      { icon: PenSquare, title: "Automated Content & Contracts", description: "Generate compelling property listings, emails, and compliant contract drafts in seconds.", name: "TerraScribe™" },
      { icon: Shield, title: "Compliance & Security", description: "Verify documents, monitor transactions for fraud, and ensure RERA compliance automatically.", name: "TerraSecure™" },
    ];
    
    return (
        <section className="bg-[#0A0A0A] py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-transparent font-headline">An Entirely New Class of Real Estate Tooling</h2>
                  <p className="mt-4 text-lg text-[#A1A1A1] max-w-2xl mx-auto font-body">Each component of TerraFlow is designed to give you a distinct advantage in the market.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {services.map((service, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="relative p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-white/20 transition-all group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-lg bg-white/10">
                                    <service.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white/80 font-headline">{service.name}</h4>
                                    <h3 className="text-xl font-bold text-white font-headline">{service.title}</h3>
                                </div>
                            </div>
                            <p className="text-md text-[#A1A1A1] font-body">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const WorkflowSection = () => {
    return (
        <section className="bg-[#0A0A0A] py-20 md:py-32">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-transparent font-headline">Your Business, Automated.</h2>
                  <p className="mt-4 text-lg text-[#A1A1A1] max-w-2xl mx-auto font-body">Visually build powerful workflows with SmartFlow™. Connect triggers to actions and let AI handle the repetitive work.</p>
                </div>
                <div className="relative flex items-center justify-center h-96">
                    <svg viewBox="0 0 400 150" className="w-full max-w-3xl">
                        {/* Nodes */}
                        <g>
                            <rect x="20" y="50" width="100" height="50" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" />
                            <text x="70" y="78" textAnchor="middle" fill="white" fontSize="10" className="font-headline">New Lead</text>
                        </g>
                         <g>
                            <rect x="150" y="50" width="100" height="50" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" />
                            <text x="200" y="72" textAnchor="middle" fill="#60a5fa" fontSize="10" className="font-headline">AI Qualify</text>
                             <text x="200" y="86" textAnchor="middle" fill="white" fontSize="8" className="font-body">score {'>'} 75</text>
                        </g>
                         <g>
                            <rect x="280" y="50" width="100" height="50" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" />
                            <text x="330" y="78" textAnchor="middle" fill="white" fontSize="10" className="font-headline">Notify Agent</text>
                        </g>
                        {/* Animated Connectors */}
                         <motion.path
                            d="M 120 75 Q 135 75, 150 75"
                            fill="none"
                            stroke="url(#grad1)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M 250 75 Q 265 75, 280 75"
                            fill="none"
                            stroke="url(#grad1)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                        />
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{stopColor:"#60a5fa", stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor:"#3b82f6", stopOpacity:1}} />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </section>
    )
}

const FinalCTASection = () => {
    return (
        <section className="relative bg-[#0A0A0A] py-20 md:py-32 text-center overflow-hidden">
             <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_10%,rgba(37,99,235,0.15),#0A0A0A)]" />
            <div className="container mx-auto px-4 relative z-10">
                 <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-transparent font-headline">Define Your Market.</h2>
                 <p className="mt-6 text-lg text-[#A1A1A1] max-w-xl mx-auto font-body">Stop adapting. Start leading. Schedule your personalized demo and see the future of real estate firsthand.</p>
                 <Button size="lg" className="bg-white text-black hover:bg-gray-200 mt-8 px-8 py-6 text-lg">
                    Request Your Demo
                </Button>
            </div>
        </section>
    )
};


const Footer = () => {
  const footerLinks = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Demo", href: "#" },
    ],
    Company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#contact" },
    ],
    Resources: [
      { name: "Blog", href: "#" },
      { name: "Help Center", href: "#" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: "#" },
    { icon: Twitter, href: "#" },
  ];

  return (
    <footer className="bg-[#111111] border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
             <Logo className="[&>span]:text-white" />
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 font-headline">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[#A1A1A1] hover:text-white transition-colors font-body">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-[#A1A1A1] font-body">&copy; {new Date().getFullYear()} TerraFlow. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
                {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                        <Link key={index} href={social.href} className="text-[#A1A1A1] hover:text-white">
                            <Icon className="w-5 h-5"/>
                        </Link>
                    )
                })}
            </div>
        </div>
      </div>
    </footer>
  );
};


export default function LandingPage() {
  return (
    <div className="bg-[#0A0A0A] text-white selection:bg-blue-500/30">
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
        <InteractiveShowcaseSection />
        <ServicesGridSection />
        <WorkflowSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}

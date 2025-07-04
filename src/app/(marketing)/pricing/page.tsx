"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Confetti from 'react-confetti';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, ClipboardCheck, Plug, Zap } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { PricingCard, type PricingPlan } from "@/components/pricing/PricingCard";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ContactFormPricing } from "@/components/pricing/ContactFormPricing";
import { FaqSection } from "@/components/shared/FaqSection";


const monthlyPlans: PricingPlan[] = [
  {
    name: "Professional",
    price: "₹9,999",
    priceFrequency: "/month/user",
    description: "For individual agents and small teams looking to supercharge their productivity.",
    features: [
      "TerraLead™ AI Suite (Inc. 500 leads)",
      "TerraScribe™ Content Generation",
      "Basic SmartFlow™ Automation",
      "Standard Analytics & Reporting",
      "Email & Chat Support",
    ],
    ctaText: "Get Started",
    ctaLink: "/signup?plan=professional-monthly",
    variant: 'outline'
  },
  {
    name: "Business",
    price: "₹24,999",
    priceFrequency: "/month (inc. 5 users)",
    description: "For growing brokerages and development teams needing advanced tools and collaboration.",
    features: [
      "Everything in Professional, plus:",
      "TerraLead™ AI Suite (Inc. 2,000 leads)",
      "TerraValuate™ Pro CMA Reports",
      "Advanced SmartFlow™ Automation",
      "Predictive MarketIntel™ Analytics",
      "API Access & Basic Integrations",
      "Priority Support",
    ],
    ctaText: "Choose Business",
    ctaLink: "/signup?plan=business-monthly",
    isPopular: true,
    variant: 'default'
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceFrequency: "Annual Billing",
    description: "Tailor-made solutions for large-scale operations with specific needs.",
    features: [
      "Everything in Business, plus:",
      "Unlimited Leads & Users",
      "TerraSecure™ Document Analysis",
      "TerraVision™ VR Tour Hosting",
      "Custom Workflow Automation",
      "White-labeling & Custom Branding",
      "Dedicated Account Manager",
      "On-site/Virtual Training",
    ],
    ctaText: "Contact Sales",
    ctaLink: "#contact",
    isEnterprise: true,
    variant: 'dark'
  },
];

const annualPlans: PricingPlan[] = [
    {
    name: "Professional",
    price: "₹8,333",
    priceFrequency: "/month/user, billed annually",
    description: "For individual agents and small teams looking to supercharge their productivity.",
    features: [
      "TerraLead™ AI Suite (Inc. 500 leads)",
      "TerraScribe™ Content Generation",
      "Basic SmartFlow™ Automation",
      "Standard Analytics & Reporting",
      "Email & Chat Support",
    ],
    ctaText: "Get Started Annually",
    ctaLink: "/signup?plan=professional-annual",
    variant: 'outline'
  },
  {
    name: "Business",
    price: "₹20,833",
    priceFrequency: "/month (inc. 5 users), billed annually",
    description: "For growing brokerages and development teams needing advanced tools and collaboration.",
    features: [
      "Everything in Business, plus:",
      "TerraLead™ AI Suite (Inc. 2,000 leads)",
      "TerraValuate™ Pro CMA Reports",
      "Advanced SmartFlow™ Automation",
      "Predictive MarketIntel™ Analytics",
      "API Access & Basic Integrations",
      "Priority Support",
    ],
    ctaText: "Choose Business Annually",
    ctaLink: "/signup?plan=business-annual",
    isPopular: true,
    variant: 'default'
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceFrequency: "Annual Billing",
    description: "Tailor-made solutions for large-scale operations with specific needs.",
    features: [
      "Everything in Business, plus:",
      "Unlimited Leads & Users",
      "TerraSecure™ Document Analysis",
      "TerraVision™ VR Tour Hosting",
      "Custom Workflow Automation",
      "White-labeling & Custom Branding",
      "Dedicated Account Manager",
      "On-site/Virtual Training",
    ],
    ctaText: "Contact Sales",
    ctaLink: "#contact",
    isEnterprise: true,
    variant: 'dark'
  },
]

const includedFeatures = [
    "AI-Powered Lead Scoring", "Automated Follow-ups", "AI Content Generation",
    "Real-time Market Data", "Client Management", "RERA Compliance Checks",
    "E-Khata Integration Hooks", "24/7 AI Chatbot", "Task & Project Management",
    "Secure Document Vault", "Customizable Dashboards", "Mobile Access"
];

const testimonials = [
  {
    text: "TerraFlowAI revolutionized our lead generation. The AI scoring is a game-changer, and we're closing deals faster than ever.",
    image: "https://placehold.co/40x40.png",
    name: "Briana Patton",
    role: "Operations Manager, ACME Realty",
  },
  {
    text: "Implementing TerraFlowAI was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image: "https://placehold.co/40x40.png",
    name: "Bilal Ahmed",
    role: "IT Manager, Globex Properties",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://placehold.co/40x40.png",
    name: "Saman Malik",
    role: "Customer Support Lead, Initech Homes",
  },
  {
    text: "TerraScribe's AI content generation has saved us countless hours. We now produce high-quality listings in a fraction of the time.",
    image: "https://placehold.co/40x40.png",
    name: "Omar Raza",
    role: "CEO, Massive Dynamics Estates",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://placehold.co/40x40.png",
    name: "Zainab Hussain",
    role: "Project Manager, Umbrella Estates",
  },
  {
    text: "The SmartFlow automation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://placehold.co/40x40.png",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our agents' productivity improved with a user-friendly design and positive customer feedback from the AI chatbot.",
    image: "https://placehold.co/40x40.png",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our client management.",
    image: "https://placehold.co/40x40.png",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Using TerraFlowAI, our online presence and conversions significantly improved, boosting our revenue.",
    image: "https://placehold.co/40x40.png",
    name: "Hassan Ali",
    role: "Lead Developer",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const pricingPageFaqs = [
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day, no-obligation free trial for our Professional and Business plans. You can explore the full suite of features and see the value for yourself before committing. No credit card required to start."
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer: "Of course. You can easily change your plan directly from your account settings. When you upgrade, you'll be charged a prorated amount for the remainder of the billing cycle. Downgrades take effect at the end of your current cycle."
  },
  {
    question: "What happens if I exceed the limits of my plan (e.g., lead count)?",
    answer: "We believe in flexible growth. If you approach your plan's limits, we will notify you with clear options to upgrade to the next tier. We never cut off your service unexpectedly."
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer: "Yes! We offer a significant discount, equivalent to getting two months free, when you choose to pay annually. This is a great option for users who are ready to commit and want the best value."
  }
];


export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const plansToDisplay = isAnnual ? annualPlans : monthlyPlans;

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  
  const OnboardingProcessSection = () => {
    const steps = [
      { icon: ClipboardCheck, title: "1. Choose Your Plan", description: "Select the plan that fits your business. Start with a 14-day free trial—no credit card required." },
      { icon: Plug, title: "2. Connect Your Data", description: "Easily import your property listings and leads. Our guided setup gets you running in minutes." },
      { icon: Zap, title: "3. Activate Your AI", description: "Enable your AI co-pilots and start automating workflows, generating content, and closing deals." }
    ];
  
    return (
      <section className="mt-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800 mb-4">
            Get Started in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Minutes</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Launch your journey to higher conversions and streamlined operations. TerraFlow is designed for a seamless onboarding experience.
          </p>
        </div>
        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Animated Gradient Line */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-16 right-16 h-0.5">
              {/* Base dashed line */}
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, hsl(var(--border)), hsl(var(--border)) 4px, transparent 4px, transparent 8px)",
                }}
              />
              {/* Animated gradient overlay */}
              <div
                className="absolute inset-0 w-full h-full animate-gradient-sweep"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, transparent, hsl(var(--primary)), transparent)",
                  backgroundSize: "40% 100%", // The size of the gradient "comet"
                  backgroundRepeat: "no-repeat",
                }}
              />
          </div>
  
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <Card className="h-full text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-background/80 backdrop-blur-sm border-border z-10 relative">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex items-center justify-center p-3 bg-primary/10 rounded-full border-2 border-primary/20">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-headline text-xl text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  };


  return (
    <div className="bg-background">
      <div className="container mx-auto py-12 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl font-headline">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Flexible Pricing</span>
              <span className="text-foreground"> for Every Real Estate Professional</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that fits your business needs and scales as you grow. All plans are backed by our powerful AI engine, designed to deliver a clear return on investment.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="flex items-center justify-center gap-4 my-8"
        >
            <Label htmlFor="pricing-toggle" className={cn("font-medium", !isAnnual && "text-primary")}>Monthly</Label>
            <Switch 
                id="pricing-toggle" 
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                aria-label="Toggle between monthly and annual pricing"
            />
            <Label htmlFor="pricing-toggle" className={cn("font-medium", isAnnual && "text-primary")}>Annually</Label>
            {isAnnual && (
              <span className="text-sm font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">2 months free!</span>
            )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="grid lg:grid-cols-3 gap-8 mt-12 items-start"
        >
          {plansToDisplay.map((plan) => (
             <motion.div key={plan.name} variants={sectionVariants}>
                 <PricingCard plan={plan} />
             </motion.div>
          ))}
        </motion.div>
        
        <OnboardingProcessSection />

        <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
             variants={sectionVariants}
             className="mt-24"
        >
            <Card className="shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-headline">
                        Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Feature</span> Comparison
                    </CardTitle>
                    <CardDescription>All our plans come packed with industry-leading features.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                        {includedFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-muted-foreground">
                                <CheckCircle className="h-5 w-5 text-green-500 shrink-0"/>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </motion.div>

        <motion.section 
            className="mt-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
        >
            <div className="container z-10 mx-auto">
                <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800 mb-4">
                        Why Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Leaders</span> are Choosing TerraFlow
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600">
                        See how professionals and developers are leveraging TerraFlowAI to grow their business.
                    </p>
                </div>

                <div className="relative flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </div>
        </motion.section>
        
        <FaqSection title="Pricing & Billing Questions" faqs={pricingPageFaqs} />

        <motion.div
            id="contact" 
            className="mt-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
        >
           <div className="grid lg:grid-cols-2 gap-12 items-center">
               <div className="text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800 mb-4">
                        Ready for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Custom Solution</span>?
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                        Let's build a plan tailored to your brokerage or development team. Get a personalized demo and a custom ROI analysis to see how TerraFlowAI can transform your business at scale.
                    </p>
                    <ul className="space-y-3 text-left max-w-md mx-auto lg:mx-0">
                        <li className="flex items-center gap-3">
                            <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                            <span className="text-slate-700 font-medium">Unlimited Users & Properties</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                            <span className="text-slate-700 font-medium">Dedicated Account Manager</span>
                        </li>
                         <li className="flex items-center gap-3">
                            <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                            <span className="text-slate-700 font-medium">Custom Workflows & Integrations</span>
                        </li>
                         <li className="flex items-center gap-3">
                            <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                            <span className="text-slate-700 font-medium">On-site & Virtual Team Training</span>
                        </li>
                    </ul>
               </div>
               <div>
                  <ContactFormPricing />
               </div>
           </div>
        </motion.div>
      </div>
      
    </div>
  );
}

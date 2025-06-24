
"use client";

import { useState } from "react";
import { PricingCard, type PricingPlan } from "@/components/pricing/PricingCard";
import { ContactFormPricing } from "@/components/pricing/ContactFormPricing";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const plansToDisplay = isAnnual ? annualPlans : monthlyPlans;

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

        <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
             variants={sectionVariants}
             className="mt-24"
        >
            <Card className="shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-headline">Full Feature Comparison</CardTitle>
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
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Have Custom Requirements?</h2>
                <p className="text-lg text-muted-foreground mt-2">Our team is ready to design a bespoke package for your unique business needs. Let's discuss your goals.</p>
             </div>
             <div>
                <ContactFormPricing />
             </div>
           </div>
        </motion.div>
      </div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <TestimonialsSection />
      </motion.div>

    </div>
  );
}

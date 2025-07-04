
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Bot, Target, PenSquare, Calculator, Loader2, Send, Mail, Building, Phone, GanttChartSquare, ShieldCheck, AreaChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingCard, type PricingPlan } from "@/components/pricing/PricingCard";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FaqSection } from "@/components/shared/FaqSection";


// --- PAGE-SPECIFIC DATA ---

const developerFeatureBlocks = [
  {
    suiteName: "TerraLead™ Voice Agent for Projects",
    headline: "Scale Your Project Outreach Instantly.",
    description: "Handle thousands of inquiries for a new project launch without hiring a call center. Terra can be configured to call every interested prospect, provide key project details, answer FAQs, and schedule site visits or sales calls for your team.",
    checklist: [
      "High-Volume Outbound Calling: Handle thousands of inquiries automatically.",
      "Custom Calling Scripts: Tailor Terra's conversation for each project.",
      "Bulk Appointment Scheduling: Efficiently manage site visits and sales calls.",
      "24/7 Chatbot Qualification",
    ],
    layout: "text-right",
    visual: (
       <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
        <video key="/videos/terralead-showcase.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/videos/terralead-showcase.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      </div>
    ),
  },
  {
    suiteName: "MarketIntel™ & TerraValuate™",
    headline: "De-risk Your Investments with Predictive Analytics.",
    description: "From site acquisition to final pricing, leverage AI to analyze market viability, forecast demand, and determine the optimal pricing strategy for maximum ROI.",
    checklist: [
      "Hyper-local Market Analysis",
      "Predictive Demand Forecasting",
      "AI-Powered Land Valuation",
      "Optimal Unit Mix & Pricing Strategy",
    ],
    layout: "text-left",
    visual: (
       <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
        <video key="/videos/terravaluate-showcase.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/videos/terravaluate-showcase.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      </div>
    ),
  },
  {
    suiteName: "SmartFlow™ & TerraSecure™",
    headline: "Automate Project Management & Ensure Compliance.",
    description: "Our integrated OS helps you track project milestones, manage resources, and automate compliance checks. Generate RERA-compliant documents and detect risks before they impact your timeline.",
    checklist: [
      "Automated Milestone Tracking",
      "Resource & Budget Management",
      "AI-Powered RERA Document Generation",
      "E-Khata & Compliance Verification",
    ],
    layout: "text-right",
    visual: (
       <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
        <video key="/videos/smartflow-showcase.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/videos/smartflow-showcase.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      </div>
    ),
  },
];

const monthlyDeveloperPricingPlans: PricingPlan[] = [
  {
    name: "Business",
    price: "₹24,999",
    priceFrequency: "/month (inc. 5 users)",
    description: "For growing development teams needing advanced tools and collaboration.",
    features: [
      "TerraLead™ AI Suite (Inc. 2,000 leads)",
      "TerraValuate™ Pro CMA Reports",
      "Advanced SmartFlow™ Automation",
      "Predictive MarketIntel™ Analytics",
      "API Access & Basic Integrations",
      "Priority Support",
    ],
    ctaText: "Start Free Trial",
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
    ctaText: "Schedule a Consultation",
    ctaLink: "#contact",
    isEnterprise: true,
    variant: 'dark'
  },
];

const annualDeveloperPricingPlans: PricingPlan[] = [
  {
    name: "Business",
    price: "₹20,833",
    priceFrequency: "/month (inc. 5 users), billed annually",
    description: "For growing development teams needing advanced tools and collaboration.",
    features: [
      "TerraLead™ AI Suite (Inc. 2,000 leads)",
      "TerraValuate™ Pro CMA Reports",
      "Advanced SmartFlow™ Automation",
      "Predictive MarketIntel™ Analytics",
      "API Access & Basic Integrations",
      "Priority Support",
    ],
    ctaText: "Start Free Trial Annually",
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
    ctaText: "Schedule a Consultation",
    ctaLink: "#contact",
    isEnterprise: true,
    variant: 'dark'
  },
];


const developerTestimonials = [
    {
      text: "TerraFlow's project management automation is phenomenal. We're tracking milestones more efficiently and have reduced delays by 15%.",
      image: "https://placehold.co/40x40.png",
      name: "Rohan Mehta",
      role: "Project Head, UrbanSpace Developers",
    },
    {
      text: "The ability to generate and verify RERA documents with TerraSecure has saved our legal team hundreds of hours. It's an essential compliance tool.",
      image: "https://placehold.co/40x40.png",
      name: "Aditi Sharma",
      role: "CEO, Prestige Construction Group",
    },
    {
      text: "MarketIntel's predictive analytics gave us the confidence to acquire a new site. The data was spot-on, and the project is already oversubscribed.",
      image: "https://placehold.co/40x40.png",
      name: "Vikram Reddy",
      role: "Managing Director, Landmark Builders",
    },
];

const firstColumn = developerTestimonials.slice(0, 1);
const secondColumn = developerTestimonials.slice(1, 2);
const thirdColumn = developerTestimonials.slice(2, 3);

const developersPageFaqs = [
  {
    question: "Can TerraFlow handle the legal complexities of the Indian market?",
    answer: "Yes, this is one of our core strengths. Our TerraScribe™ and TerraSecure™ suites are specifically designed to help you generate RERA-compliant documents and verify land documents like E-Khata, mitigating risk significantly."
  },
  {
    question: "How does the Project Management feature work?",
    answer: "Our SmartFlow™ suite includes a project management dashboard with tools like Gantt charts and automated milestone tracking. It gives you a high-level, real-time overview of your project's health, helping you identify bottlenecks before they become costly problems."
  },
  {
    question: "Can I get market data for a potential new site?",
    answer: "Absolutely. Our MarketIntel™ suite is built for this. You can analyze demand hotspots, check historical price trends, and even get AI-powered predictive forecasts on the future growth potential of a specific locality to inform your acquisition decisions."
  }
];


// --- REUSABLE COMPONENTS (LOCALIZED) ---

const FeatureBlock = ({ block }: { block: any }) => {
  const isTextLeft = block.layout === 'text-left';
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-12"
    >
      <div className={cn("grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-24")}>
        <div className={cn("space-y-6", !isTextLeft && "md:col-start-2")}>
          <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold bg-primary/10 text-primary">{block.suiteName}</span>
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-slate-800">{block.headline}</h2>
          <p className="text-lg text-slate-600">{block.description}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {block.checklist.map((item: string, index: number) => (
              <li key={index} className="flex items-center gap-2 text-slate-700">
                <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn("flex items-center justify-center", !isTextLeft && "md:col-start-1 md:row-start-1")}>
            {block.visual}
        </div>
      </div>
    </motion.div>
  );
};

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  workEmail: z.string().email({ message: "A valid work email is required." }),
  companyName: z.string().min(1, { message: "Company name is required." }),
  message: z.string().optional(),
});
type FormValues = z.infer<typeof formSchema>;


// --- MAIN PAGE COMPONENT ---

export default function DevelopersSolutionPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const plansToDisplay = isAnnual ? annualDeveloperPricingPlans : monthlyDeveloperPricingPlans;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", workEmail: "", companyName: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const dataToSend = {
        firstName: values.firstName, lastName: values.lastName, email: values.workEmail, companyName: values.companyName, companySize: "Developer", message: values.message,
    };
    try {
      const functionUrl = process.env.NEXT_PUBLIC_SUPABASE_CONTACT_FORM_URL;
      if (!functionUrl) throw new Error("Contact form URL not configured.");
      const response = await fetch(functionUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dataToSend) });
      if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
      toast({ title: "Request Sent!", description: "Our team will be in touch shortly to schedule your consultation." });
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({ variant: "destructive", title: "Submission Failed", description: error instanceof Error ? error.message : "An unknown error occurred." });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="bg-background">

      {/* 1. Hero Section */}
      <section className="py-16 md:py-24 bg-slate-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground mb-4">
                        Build, Market, and <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Sell Your Projects Faster.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                       From site acquisition to final sale, TerraFlow integrates project management, compliance automation, and market analytics into a single OS for developers.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Link href="#contact">Schedule a Consultation</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="#features">Explore Platform</Link>
                        </Button>
                    </div>
                </motion.div>

                {/* Right Column: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <Image src="https://placehold.co/800x450.png" alt="Blueprint turning into 3D model with data overlays" width={800} height={450} className="rounded-lg shadow-2xl object-cover" data-ai-hint="blueprint 3d model" />
                </motion.div>
            </div>
        </div>
      </section>

      {/* 2. Pain Point / Solution Section */}
      <section className="py-16 md:py-24 bg-background relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20 dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-slate-800">Your End-to-End Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">OS</span></h2>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Address your biggest challenges with targeted AI solutions.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: GanttChartSquare, title: "Project Delays & Cost Overruns?", solution: "SmartFlow™", description: "Manage timelines, resources, and budgets with our AI-powered project management dashboard. Proactively identify bottlenecks." },
                    { icon: ShieldCheck, title: "Navigating RERA Compliance?", solution: "TerraSecure™", description: "Automate RERA document generation and verification. Mitigate legal risks with AI-powered compliance checks." },
                    { icon: AreaChart, title: "Uncertain Market Viability?", solution: "MarketIntel™", description: "Use predictive analytics for site selection, demand forecasting, and data-driven pricing strategies to maximize your ROI." },
                ].map((item, index) => (
                    <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                       <Card className="h-full text-left shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-background/80 backdrop-blur-sm border-border">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary transition-colors duration-300">
                                        <item.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="font-headline text-xl text-slate-800 dark:text-slate-100">{item.title}</h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300">
                                  <span className="font-bold text-primary">{item.solution}</span>: {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
             </div>
          </div>
      </section>

      {/* 3. Feature Deep Dive */}
      <section id="features" className="bg-slate-50/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800">
                The End-to-End AI Platform for <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Real Estate Developers</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4">
                From predictive site analysis and project management to automated sales and compliance, TerraFlow provides the tools to build and sell smarter.
              </p>
            </motion.div>
            <div className="divide-y divide-slate-200">
                {developerFeatureBlocks.map((block, index) => ( <FeatureBlock key={index} block={block} /> ))}
            </div>
        </div>
      </section>

      {/* 4. Pricing Spotlight */}
      <section id="pricing" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-slate-800">A <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Bespoke Solution</span> for Your Projects</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Powerful plans designed to scale with your development portfolio.</p>
             </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className="flex items-center justify-center gap-4 my-8"
              >
                  <Label htmlFor="pricing-toggle-dev" className={cn("font-medium", !isAnnual && "text-primary")}>Monthly</Label>
                  <Switch 
                      id="pricing-toggle-dev" 
                      checked={isAnnual}
                      onCheckedChange={setIsAnnual}
                      aria-label="Toggle between monthly and annual pricing"
                  />
                  <Label htmlFor="pricing-toggle-dev" className={cn("font-medium", isAnnual && "text-primary")}>Annually</Label>
                  {isAnnual && (
                    <span className="text-sm font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full dark:bg-green-900/50 dark:text-green-300">2 months free!</span>
                  )}
              </motion.div>
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } }, }} className="grid md:grid-cols-2 gap-8 mt-12 items-start max-w-4xl mx-auto">
              {plansToDisplay.map((plan) => (
                 <motion.div key={plan.name} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                     <PricingCard plan={plan} />
                 </motion.div>
              ))}
            </motion.div>
          </div>
      </section>

      {/* 5. Testimonials */}
       <section className="bg-slate-50/50 py-16 md:py-24 relative">
        <div className="container z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
               <h2 className="text-3xl md:text-4xl font-bold font-headline text-slate-800 mb-4">
                Trusted by Leading Developers
              </h2>
              <p className="text-lg md:text-xl text-slate-600">
                Hear how development firms are leveraging TerraFlow to build the future.
              </p>
            </motion.div>
            <div className="relative flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[420px] overflow-hidden">
              <TestimonialsColumn testimonials={firstColumn} duration={18} />
              <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
              <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
            </div>
        </div>
      </section>

      <FaqSection title="Questions from Developers & Builders" faqs={developersPageFaqs} />

      {/* 6. Final CTA */}
      <section id="contact" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800 mb-4">
                        Let's Build the Future, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Together.</span>
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                       Schedule a consultation with our enterprise team. We'll provide a personalized demo and a custom ROI analysis to show how TerraFlow can transform your development lifecycle.
                    </p>
                </div>
                <div>
                  <Card className="shadow-2xl bg-white border border-slate-200">
                    <CardHeader><CardTitle className="text-2xl font-headline text-center text-primary">Schedule a Consultation</CardTitle></CardHeader>
                    <CardContent>
                      {isSubmitted ? (
                        <>
                          <div className="flex flex-col items-center justify-center text-center h-80">
                            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800">Request Sent!</h3>
                            <p className="text-slate-600 mt-2">Our team will be in touch shortly to schedule your consultation.</p>
                          </div>
                        </>
                      ) : (
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                             <div className="grid sm:grid-cols-2 gap-4">
                                <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                            <FormField control={form.control} name="workEmail" render={({ field }) => (<FormItem><FormLabel>Work Email</FormLabel><FormControl><Input type="email" placeholder="john.doe@developer.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="companyName" render={({ field }) => (<FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="e.g. Landmark Builders" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel>Message (Optional)</FormLabel><FormControl><Textarea placeholder="Tell us about your upcoming projects or specific challenges..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                                {isLoading ? "Submitting..." : "Schedule Consultation"}
                            </Button>
                          </form>
                        </Form>
                      )}
                    </CardContent>
                  </Card>
                </div>
            </motion.div>
          </div>
      </section>
    </div>
  );
}

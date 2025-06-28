
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Confetti from 'react-confetti';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Bot, Target, PenSquare, Calculator, Loader2, Send, Mail, Building, Phone, GanttChartSquare, ShieldCheck, AreaChart, Users, BarChart3, Star, Zap } from "lucide-react";
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


// --- PAGE-SPECIFIC DATA ---

const brokerageFeatureBlocks = [
  {
    suiteName: "TerraLead™ with Voice Agent",
    headline: "Centralize & Distribute Qualified Leads, Automatically.",
    description: "Let Terra be your brokerage's front line. The AI voice agent calls and qualifies every lead, then our SmartFlow engine routes the hot, appointment-ready prospects to the right agent based on your custom rules. No more lead disputes, just a pipeline full of opportunities.",
    checklist: [
      "Autonomous Lead Qualification & Calling",
      "Rules-based Lead Assignment & Routing",
      "Real-time Agent Performance Analytics",
      "Centralized Nurturing Campaigns",
    ],
    layout: "text-left",
    videoSrc: "/videos/terralead-showcase.mp4",
  },
  {
    suiteName: "TerraScribe™ & Brand Hub",
    headline: "Ensure Brand Consistency Across Every Agent and Listing.",
    description: "Create and share pre-approved marketing templates—from property descriptions to email campaigns—ensuring every communication reflects your brokerage's brand standards.",
    checklist: [
      "Shared Content & Email Templates",
      "One-Click Brand-Approved Listings",
      "Team-wide Content Style Guides",
      "White-labeling & Custom Branding",
    ],
    layout: "text-right",
    image: {
      src: "https://placehold.co/600x450.png",
      alt: "System showing a library of shared content templates for a team",
      hint: "template library interface"
    },
  },
    {
    suiteName: "SmartFlow™ & Admin Controls",
    headline: "Standardize Your Processes. Scale Your Operations.",
    description: "Build and enforce standard operating procedures with our workflow automation. From onboarding new agents to managing deal checklists, ensure every process is followed perfectly.",
    checklist: [
      "Standardized Deal Workflows",
      "Agent Onboarding Automation",
      "Team Task Management",
      "Role-based Permissions & Access",
    ],
    layout: "text-left",
    image: {
      src: "https://placehold.co/600x450.png",
      alt: "Workflow automation canvas showing a team process",
      hint: "workflow automation canvas"
    },
  },
];

const monthlyBrokeragePricingPlans: PricingPlan[] = [
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
    ctaText: "Book a Team Demo",
    ctaLink: "#contact",
    isEnterprise: true,
    variant: 'dark'
  },
];

const annualBrokeragePricingPlans: PricingPlan[] = [
  {
    name: "Business",
    price: "₹20,833",
    priceFrequency: "/month (inc. 5 users), billed annually",
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
    ctaText: "Book a Team Demo",
    ctaLink: "#contact",
    isEnterprise: true,
    variant: 'dark'
  },
];


const brokerageTestimonials = [
    {
      text: "TerraFlow brought our entire team onto one page. The performance analytics give me the visibility I need to effectively manage and coach my agents.",
      image: "https://placehold.co/40x40.png",
      name: "Sanjay Gupta",
      role: "Owner, Metro Homes Realty",
    },
    {
      text: "Automated lead assignment is flawless. No more disputes, and leads are actioned in record time. Our team's response rate has improved by over 300%.",
      image: "https://placehold.co/40x40.png",
      name: "Priya Desai",
      role: "Managing Broker, Elite Properties Group",
    },
    {
      text: "The shared content templates in TerraScribe are a lifesaver for maintaining brand consistency. Every listing looks professional and on-brand.",
      image: "https://placehold.co/40x40.png",
      name: "Amit Patel",
      role: "Founder, Urban Nest Brokerage",
    },
];

const firstColumn = brokerageTestimonials.slice(0, 1);
const secondColumn = brokerageTestimonials.slice(1, 2);
const thirdColumn = brokerageTestimonials.slice(2, 3);


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
            {block.videoSrc ? (
                 <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                    <video key={block.videoSrc} className="w-full h-full object-cover" autoPlay loop muted playsInline>
                        <source src={block.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                </div>
            ) : (
                <div className="p-8 bg-slate-100 rounded-2xl shadow-inner">
                    <Image src={block.image.src} alt={block.image.alt} width={600} height={450} className="rounded-lg shadow-2xl object-cover" data-ai-hint={block.image.hint} />
                </div>
            )}
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
  companySize: z.string().min(1, { message: "Please select your company size." }),
  message: z.string().optional(),
});
type FormValues = z.infer<typeof formSchema>;


// --- MAIN PAGE COMPONENT ---

export default function BrokeragesSolutionPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const plansToDisplay = isAnnual ? annualBrokeragePricingPlans : monthlyBrokeragePricingPlans;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", workEmail: "", companyName: "", companySize: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const dataToSend = {
        firstName: values.firstName, lastName: values.lastName, email: values.workEmail, companyName: values.companyName, companySize: values.companySize, message: values.message,
    };
    try {
      const functionUrl = process.env.NEXT_PUBLIC_SUPABASE_CONTACT_FORM_URL;
      if (!functionUrl) throw new Error("Contact form URL not configured.");
      const response = await fetch(functionUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dataToSend) });
      if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
      toast({ title: "Request Sent!", description: "Our team will be in touch shortly to schedule your demo." });
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground mb-4">
                    The OS for Your Entire <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Real Estate Brokerage.</span>
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
                   Empower your team, standardize your processes, and gain complete visibility into your agency's performance with TerraFlow's end-to-end platform.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Link href="#contact">Book a Team Demo</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="#pricing">View Pricing</Link>
                    </Button>
                </div>
                 <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} className="relative mt-12">
                    <Image src="https://placehold.co/800x450.png" alt="Admin dashboard showing performance charts for multiple agents" width={800} height={450} className="rounded-lg shadow-2xl object-cover mx-auto" data-ai-hint="team dashboard chart" />
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* 2. Pain Point / Solution Section */}
      <section className="py-16 md:py-24 bg-background relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20 dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-bold font-headline text-slate-800 dark:text-slate-100">Your Command Center for <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Growth</span></h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Solve your brokerage's biggest operational headaches with targeted AI.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: BarChart3, title: "Inconsistent Agent Performance?", solution: "Team Analytics", description: "Get a bird's-eye view of your team's KPIs. Identify top performers and coach those who need a boost with data-driven insights." },
                    { icon: Zap, title: "Leads Falling Through Cracks?", solution: "TerraLead™ Automation", description: "Implement intelligent lead routing to instantly assign new leads to the right agent, ensuring zero lead leakage." },
                    { icon: Star, title: "Lack of Brand Consistency?", solution: "Brand Hub", description: "Use shared templates in TerraScribe™ to ensure every listing and email is professional and on-brand." },
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
                The Complete Platform to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Scale Your Brokerage</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4">
                From automated lead distribution and brand control to team analytics and standardized workflows, TerraFlow provides the tools to manage and grow your agency.
              </p>
            </motion.div>
            <div className="divide-y divide-slate-200">
                {brokerageFeatureBlocks.map((block, index) => ( <FeatureBlock key={index} block={block} /> ))}
            </div>
        </div>
      </section>

      {/* 4. Pricing Spotlight */}
      <section id="pricing" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-slate-800">Plans Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Scaling Your Team</span></h2>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Powerful solutions designed to grow with your brokerage.</p>
             </div>
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className="flex items-center justify-center gap-4 my-8"
              >
                  <Label htmlFor="pricing-toggle-broker" className={cn("font-medium", !isAnnual && "text-primary")}>Monthly</Label>
                  <Switch 
                      id="pricing-toggle-broker" 
                      checked={isAnnual}
                      onCheckedChange={setIsAnnual}
                      aria-label="Toggle between monthly and annual pricing"
                  />
                  <Label htmlFor="pricing-toggle-broker" className={cn("font-medium", isAnnual && "text-primary")}>Annually</Label>
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
                The Choice of Top-Performing Brokerages
              </h2>
              <p className="text-lg md:text-xl text-slate-600">
                Hear from owners who have scaled their agencies with TerraFlow.
              </p>
            </motion.div>
            <div className="relative flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[420px] overflow-hidden">
              <TestimonialsColumn testimonials={firstColumn} duration={16} />
              <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={20} />
              <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={18} />
            </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section id="contact" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800 mb-4">
                        Ready to Empower Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Entire Team</span>?
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                       Schedule a personalized demo for your brokerage. We'll show you how TerraFlow can be tailored to your team's specific needs and provide a clear ROI analysis to demonstrate the impact on your bottom line.
                    </p>
                </div>
                <div>
                  <Card className="shadow-2xl bg-white border border-slate-200">
                    <CardHeader><CardTitle className="text-2xl font-headline text-center text-primary">Book a Team Demo</CardTitle></CardHeader>
                    <CardContent>
                      {isSubmitted ? (
                        <>
                          <Confetti recycle={false} numberOfPieces={250} />
                          <div className="flex flex-col items-center justify-center text-center h-80">
                            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800">Request Sent!</h3>
                            <p className="text-slate-600 mt-2">Our team will be in touch shortly to schedule your demo.</p>
                          </div>
                        </>
                      ) : (
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                             <div className="grid sm:grid-cols-2 gap-4">
                                <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                            <FormField control={form.control} name="workEmail" render={({ field }) => (<FormItem><FormLabel>Work Email</FormLabel><FormControl><Input type="email" placeholder="john.doe@realty.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="companyName" render={({ field }) => (<FormItem><FormLabel>Brokerage Name</FormLabel><FormControl><Input placeholder="e.g., ACME Realty" {...field} /></FormControl><FormMessage /></FormItem>)} />
                             <FormField control={form.control} name="companySize" render={({ field }) => (
                                <FormItem><FormLabel>Number of Agents</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                      <SelectItem value="2-10">2-10 Agents</SelectItem>
                                      <SelectItem value="11-50">11-50 Agents</SelectItem>
                                      <SelectItem value="51+">51+ Agents</SelectItem>
                                    </SelectContent>
                                  </Select>
                                <FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel>Message (Optional)</FormLabel><FormControl><Textarea placeholder="What are your brokerage's biggest challenges right now?" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                                {isLoading ? "Submitting..." : "Schedule My Demo"}
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

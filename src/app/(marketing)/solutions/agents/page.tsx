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
import { FaqSection } from "@/components/shared/FaqSection";


// --- PAGE-SPECIFIC DATA ---

const agentSpecificFeatureBlocks = [
  {
    badge: "TerraLead™ Suite with AI Voice Agent",
    headline: "Never Make a Cold Call Again.",
    description: "Imagine an assistant that works for you even when you're on the move. Terra calls every new lead, asks the right questions, and books qualified meetings for you. You just show up to the appointments that appear on your calendar.",
    checklist: [
      "Automated Prospect Calling: Let your AI handle the first touch.",
      "Intelligent Appointment Setting: Fills your calendar with promising clients.",
      "AI Lead Scoring: Know who to focus on before you even meet.",
    ],
    visual: (
      <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
        <video key="/videos/terralead-showcase.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/videos/terralead-showcase.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      </div>
    ),
    layout: "text-left",
  },
  {
    badge: "TerraScribe™ Suite",
    headline: "Create Stunning Listings in Seconds",
    description: "Eliminate writer's block forever. Generate professional, compelling, and SEO-optimized property descriptions, marketing emails, and social media posts with a single click.",
    checklist: [
      "AI Property Descriptions: Turn key features into captivating narratives.",
      "Email & Social Media Templates: Generate engaging content for any channel.",
      "RERA-Compliant Clauses: Ensure your documentation is professional and compliant.",
    ],
    visual: (
       <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
        <video key="/videos/terrascribe-showcase.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/videos/terrascribe-showcase.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      </div>
    ),
    layout: "text-right",
  },
  {
    badge: "TerraValuate™ & MarketIntel™",
    headline: "Win More Listings with Data-Driven Valuations",
    description: "Walk into every client meeting with confidence. Generate accurate, hyper-local valuation reports and CMAs in minutes, backed by real-time market data and predictive analytics.",
    checklist: [
      "Instant Property Valuations: Get a data-backed price estimate anytime.",
      "Professional CMA Reports: Impress sellers and justify your pricing strategy.",
      "Neighborhood Trend Analysis: Become the undisputed local market expert.",
    ],
     visual: (
       <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
        <video key="/videos/terravaluate-showcase.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/videos/terravaluate-showcase.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      </div>
    ),
    layout: "text-left",
  },
];


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
    ctaText: "Start Free Trial",
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
    ctaText: "Start Free Trial",
    ctaLink: "/signup?plan=business-monthly",
    isPopular: true,
    variant: 'default'
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
    ctaText: "Start Free Trial Annually",
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
    ctaText: "Start Free Trial Annually",
    ctaLink: "/signup?plan=business-annual",
    isPopular: true,
    variant: 'default'
  },
];


const agentTestimonials = [
    {
      text: "As a solo agent, TerraFlow is like having a full-time assistant. The lead scoring and automated follow-ups have doubled my closing rate.",
      image: "https://placehold.co/40x40.png",
      name: "Priya Singh",
      role: "Independent Real Estate Agent",
    },
    {
      text: "TerraScribe is a lifesaver. I used to spend hours writing property descriptions. Now, I generate better-quality content in minutes.",
      image: "https://placehold.co/40x40.png",
      name: "Rajesh Kumar",
      role: "Realty ONE Group Agent",
    },
    {
      text: "The market analytics help me price properties perfectly and advise my clients with confidence. I feel like I'm ten steps ahead of the competition.",
      image: "https://placehold.co/40x40.png",
      name: "Anjali Sharma",
      role: "Top Agent, SK Properties",
    },
];

const firstColumn = agentTestimonials.slice(0, 1);
const secondColumn = agentTestimonials.slice(1, 2);
const thirdColumn = agentTestimonials.slice(2, 3);

const agentsPageFaqs = [
  {
    question: "How quickly can I get started with lead automation?",
    answer: "You can be up and running in minutes. Our platform includes pre-built SmartFlow™ templates for common tasks like welcoming new leads and sending follow-ups. You can activate them with a single click."
  },
  {
    question: "Will the AI-generated content sound like me?",
    answer: "Yes. TerraScribe™ is designed to be your co-pilot. You can provide it with key points and then use simple commands to refine the tone—whether you want it to be more professional, luxurious, or urgent—to match your personal brand."
  },
  {
    question: "How does the AI Voice Agent help me as a solo agent?",
    answer: "Terra acts as your personal assistant. It can make those initial, time-consuming calls to new leads to gauge their interest, freeing you up to focus only on conversations with pre-qualified, high-intent prospects."
  }
];


// --- REUSABLE COMPONENTS (LOCALIZED) ---

const AgentFeatureBlock = ({ block }: { block: any }) => {
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
          <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold bg-primary/10 text-primary">{block.badge}</span>
          <h3 className="text-3xl md:text-4xl font-bold font-headline text-slate-800">{block.headline}</h3>
          <p className="text-lg text-slate-600">{block.description}</p>
          <ul className="space-y-3">
            {block.checklist.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3 text-slate-700">
                <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0 mt-1" />
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

const AgentFeaturesSection = () => {
    return (
        <section id="features" className="bg-slate-50/50 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800">
                       Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">AI Co-Pilot</span> for Every Step of the Sale.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4">
                       More than a CRM, TerraFlow offers intelligent AI tools for real estate agents to automate busywork, gain data-driven insights, and close more deals.
                    </p>
                </motion.div>
                <div className="divide-y divide-slate-200">
                    {agentSpecificFeatureBlocks.map((block, index) => ( <AgentFeatureBlock key={index} block={block} /> ))}
                </div>
            </div>
        </section>
    )
}

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  workEmail: z.string().email({ message: "A valid work email is required." }),
  message: z.string().optional(),
});
type FormValues = z.infer<typeof formSchema>;


// --- MAIN PAGE COMPONENT ---

export default function AgentsSolutionPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const plansToDisplay = isAnnual ? annualPlans : monthlyPlans;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", workEmail: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const dataToSend = {
        firstName: values.firstName, lastName: values.lastName, email: values.workEmail, companyName: "Individual Agent", companySize: "Just Myself", message: values.message,
    };
    try {
      const functionUrl = process.env.NEXT_PUBLIC_SUPABASE_CONTACT_FORM_URL;
      if (!functionUrl) throw new Error("Contact form URL not configured.");
      const response = await fetch(functionUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dataToSend) });
      if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
      toast({ title: "Trial Request Sent!", description: "We'll be in touch shortly to set up your free trial." });
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
                {/* Left Column: Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <Image src="https://placehold.co/800x600.png" alt="Screenshot of the TerraFlow agent dashboard showing leads and analytics" width={800} height={600} className="rounded-lg shadow-2xl object-cover" data-ai-hint="agent dashboard" />
                </motion.div>

                {/* Right Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-foreground mb-4">
                        Supercharge Your Productivity. <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Close More Deals.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        TerraFlow provides individual agents with the AI-powered tools to automate daily tasks, intelligently nurture leads, and compete with larger firms.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Link href="#cta-form">Start Free Trial</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="#pricing">View Pricing</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* 2. Pain Point / Solution Section */}
      <section className="py-16 md:py-24 bg-background relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20 dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-slate-800 dark:text-slate-100">Stop Juggling, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Start Closing.</span></h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Here’s how TerraFlow solves your biggest daily challenges.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Target, title: "Tired of Cold Leads?", solution: "TerraLead™", description: "Our AI scores every lead, so you focus only on the prospects ready to convert. Stop wasting time on dead ends." },
                    { icon: PenSquare, title: "Hours Spent on Paperwork?", solution: "TerraScribe™", description: "Generate compelling property descriptions, emails, and social posts in seconds. Reclaim your day." },
                    { icon: Calculator, title: "Struggling with Pricing?", solution: "TerraValuate™", description: "Create accurate, professional CMA reports with AI-powered market data to price properties perfectly." },
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
      <AgentFeaturesSection />

      {/* 4. Pricing Spotlight */}
      <section id="pricing" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-slate-800 dark:text-slate-100">Pricing That <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Grows With You</span></h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Simple, transparent plans designed for the individual agent.</p>
             </div>
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
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
                Don't Just Take Our Word For It
              </h2>
              <p className="text-lg md:text-xl text-slate-600">
                Hear from agents who have transformed their business with TerraFlow.
              </p>
            </motion.div>
            <div className="relative flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[420px] overflow-hidden">
              <TestimonialsColumn testimonials={firstColumn} duration={15} />
              <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
              <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
            </div>
        </div>
      </section>
      
      <FaqSection title="Questions from Agents Like You" faqs={agentsPageFaqs} />

      {/* 6. Final CTA */}
      <section id="cta-form" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800 dark:text-slate-100 mb-4">
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Start Winning?</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                       Fill out the form to begin your free 14-day trial. No credit card required. Experience firsthand how TerraFlow's AI can streamline your workflow and boost your sales.
                    </p>
                </div>
                <div>
                  <Card className="shadow-2xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader><CardTitle className="text-2xl font-headline text-center text-primary">Start Your 14-Day Free Trial</CardTitle></CardHeader>
                    <CardContent>
                      {isSubmitted ? (
                        <>
                          <Confetti recycle={false} numberOfPieces={250} />
                          <div className="flex flex-col items-center justify-center text-center h-80">
                            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Request Sent!</h3>
                            <p className="text-slate-600 dark:text-slate-300 mt-2">Thank you! We'll be in touch to set up your trial.</p>
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
                            <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel>Message (Optional)</FormLabel><FormControl><Textarea placeholder="Tell us what you're most excited to try..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                                {isLoading ? "Submitting..." : "Claim My Free Trial"}
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

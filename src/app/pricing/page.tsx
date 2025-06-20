
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { PricingCard, type PricingPlan } from "@/components/pricing/PricingCard";
import { TestimonialCard, type Testimonial } from "@/components/pricing/TestimonialCard";
import { ContactFormPricing } from "@/components/pricing/ContactFormPricing";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const pricingPlansData: PricingPlan[] = [
  {
    name: "Agent Pro",
    price: "₹2,999",
    priceFrequency: "/month",
    description: "Supercharge your individual productivity with core AI tools.",
    features: [
      "TerraScribe™ Basic (100 gen/mo)",
      "TerraLead™ Scoring",
      "SmartFlow™ Basic (5 flows)",
      "Standard Market Reports",
      "Document Verification (10/mo)",
      "Email Support",
    ],
    ctaText: "Get Started with Agent Pro",
    ctaLink: "/register?plan=agent_pro",
  },
  {
    name: "Team Growth",
    price: "₹7,999",
    priceFrequency: "/month",
    description: "Empower your team with collaborative AI and advanced automation.",
    features: [
      "TerraScribe™ Pro (500 gen/mo)",
      "TerraLead™ Advanced + Chatbot",
      "SmartFlow™ Pro (20 flows)",
      "Predictive Market Intel™",
      "Document Verification (50/mo)",
      "Team Collaboration Tools",
      "Priority Email & Chat Support",
    ],
    ctaText: "Choose Team Growth",
    ctaLink: "/register?plan=team_growth",
    isPopular: true,
  },
  {
    name: "Enterprise Suite",
    price: "Custom",
    priceFrequency: "Tailored for you",
    description: "Bespoke AI solutions for large organizations and unique requirements.",
    features: [
      "Unlimited TerraScribe™",
      "Full TerraLead™ Suite",
      "Unlimited SmartFlows™",
      "Bespoke MarketIntel™ Dashboards",
      "Unlimited Document Verification",
      "API Access & Integrations",
      "Dedicated Account Manager",
      "24/7 Premium Support",
    ],
    ctaText: "Contact Sales",
    ctaLink: "#contact-sales", // Link to contact form section
    isEnterprise: true,
  },
];

const testimonialsData: Testimonial[] = [
  {
    id: "1",
    quote: "TerraFlowAI has revolutionized how I manage leads. My conversion rates have skyrocketed, and I'm closing deals faster than ever!",
    authorName: "Riya Sharma",
    authorTitle: "Top Agent, PropTech Realty",
    authorAvatarUrl: "https://placehold.co/60x60.png?text=RS",
    aiHint: "woman professional"
  },
  {
    id: "2",
    quote: "The AI-generated property descriptions are a lifesaver. They save me hours each week and are incredibly effective in attracting buyers.",
    authorName: "Amit Patel",
    authorTitle: "Founder, Dream Homes Developers",
    authorAvatarUrl: "https://placehold.co/60x60.png?text=AP",
    aiHint: "man architect"
  },
  {
    id: "3",
    quote: "Our entire brokerage is more efficient thanks to SmartFlow™ automations. It's a genuine game-changer for our operations and client satisfaction.",
    authorName: "Priya Singh",
    authorTitle: "CEO, Urban Nest Estates",
    authorAvatarUrl: "https://placehold.co/60x60.png?text=PS",
    aiHint: "woman ceo"
  },
];

const faqsData = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and direct bank transfers for annual subscriptions."
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated for the current billing cycle."
  },
  {
    question: "Is there a free trial available?",
    answer: "We offer a 14-day free trial for the Agent Pro and Team Growth plans. No credit card required to get started!"
  },
  {
    question: "How does the 'per user' billing work for Team Growth?",
    answer: "The Team Growth plan is priced based on bundles of users (e.g., up to 3 users). You can add more user bundles as your team expands."
  },
  {
    question: "What kind of support is included?",
    answer: "All plans include email support. Team Growth includes priority email and chat support, while Enterprise Suite comes with a dedicated account manager and 24/7 premium support."
  }
];


export default function PricingPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-16 md:py-24 text-center bg-gradient-to-br from-primary/5 via-background to-background"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-primary mb-4">
            Find Your Perfect AI Edge
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transparent pricing for every scale. Unlock powerful AI tools designed to elevate your real estate business, from individual agents to large enterprises.
          </p>
          <div className="flex justify-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1.5 text-green-500"/> No Hidden Fees</span>
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1.5 text-green-500"/> Cancel Anytime</span>
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1.5 text-green-500"/> Dedicated Support</span>
          </div>
        </div>
      </motion.section>

      {/* Pricing Plans Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {pricingPlansData.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PricingCard plan={plan} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Overview Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4">Core AI Capabilities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Every TerraFlowAI plan is packed with powerful features to streamline your workflow and boost results.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Smart Automation", description: "Automate lead follow-ups, marketing tasks, and data entry with SmartFlow™." },
              { icon: Shield, title: "Secure Documents", description: "Verify legal documents and manage contracts with TerraSecure™." },
              { icon: CheckCircle, title: "AI Content Creation", description: "Generate compelling listings and marketing copy with TerraScribe™." },
            ].map(feature => (
              <Card key={feature.title} className="text-left shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg inline-block mb-3">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center text-primary mb-12">
            Loved by Real Estate Innovators
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-sales" className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">
              Have Questions or Need a Custom Plan?
            </h2>
            <p className="text-lg text-muted-foreground">
              Our team is ready to assist you with enterprise solutions, custom integrations, or any other inquiries you may have.
            </p>
          </div>
          <ContactFormPricing />
        </div>
      </section>
    </div>
  );
}

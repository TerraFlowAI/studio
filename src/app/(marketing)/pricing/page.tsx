
import { PageHeader } from "@/components/shared/PageHeader";
import { PricingCard, type PricingPlan } from "@/components/pricing/PricingCard";
import { ContactFormPricing } from "@/components/pricing/ContactFormPricing";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CheckCircle } from "lucide-react";

const pricingPlans: PricingPlan[] = [
  {
    name: "Professional",
    price: "₹7,999",
    priceFrequency: "/month per user",
    description: "For individual agents and small teams looking to supercharge their productivity.",
    features: [
      "TerraLead™ AI Suite (Up to 500 leads)",
      "TerraScribe™ Content Generation",
      "Basic SmartFlow™ Automation",
      "Standard Analytics & Reporting",
      "Email & Chat Support",
    ],
    ctaText: "Get Started",
    ctaLink: "/signup?plan=professional",
  },
  {
    name: "Business",
    price: "₹14,999",
    priceFrequency: "/month per user",
    description: "For growing brokerages and development firms needing advanced tools and collaboration.",
    features: [
      "Everything in Professional, plus:",
      "TerraLead™ AI Suite (Up to 2,500 leads)",
      "TerraValuate™ Pro CMA Reports",
      "Advanced SmartFlow™ Automation",
      "Predictive MarketIntel™ Analytics",
      "API Access & Basic Integrations",
      "Priority Support",
    ],
    ctaText: "Choose Business",
    ctaLink: "/signup?plan=business",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceFrequency: "yıllık faturalandırma",
    description: "Tailor-made solutions for large-scale operations with specific needs.",
    features: [
      "Everything in Business, plus:",
      "Unlimited Leads & Users",
      "TerraSecure™ Document Analysis",
      "Custom Workflow Automation",
      "White-labeling & Custom Branding",
      "Dedicated Account Manager",
      "On-site/Virtual Training",
    ],
    ctaText: "Contact Sales",
    ctaLink: "#contact",
    isEnterprise: true,
  },
];

const includedFeatures = [
    "AI-Powered Lead Scoring", "Automated Follow-ups", "AI Content Generation",
    "Real-time Market Data", "Client Management", "RERA Compliance Checks",
    "E-Khata Integration Hooks", "24/7 AI Chatbot", "Task & Project Management",
    "Secure Document Vault", "Customizable Dashboards", "Mobile Access"
];

export default function PricingPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-12 md:py-24">
        <PageHeader
          title="Flexible Pricing for Every Real Estate Professional"
          description="Choose the plan that fits your business needs and scale as you grow. All plans are backed by our powerful AI engine."
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <Card className="mt-24 shadow-lg">
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
        
        <div id="contact" className="mt-24">
           <PageHeader
            title="Have Custom Requirements?"
            description="Our team is ready to design a bespoke package for your enterprise needs. Let's discuss your goals."
          />
          <ContactFormPricing />
        </div>
      </div>
      
       <TestimonialsSection />

    </div>
  );
}

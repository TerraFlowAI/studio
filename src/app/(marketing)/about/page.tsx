
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 md:py-24">
      <PageHeader
        title="About TerraFlowAI"
        description="Revolutionizing real estate with intelligent automation and data-driven insights."
      />
      <Card className="shadow-lg mt-8">
        <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-3xl font-bold font-headline text-primary mb-4">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        At TerraFlowAI, our mission is to empower real estate professionals—agents, developers, and brokerages—with the most advanced AI-powered tools. We believe that by automating workflows, providing predictive analytics, and enhancing client interactions, we can help our users close deals faster, reduce manual errors, and achieve unprecedented growth. We are committed to building an end-to-end operating system that becomes the backbone of the modern real estate industry.
                    </p>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <Image 
                        src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnaG91c2UlMjBwbGFuc3xlbnwwfHx8fDE3NTM3NjE4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="Modern house blueprint"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                        data-ai-hint="house plans blueprint"
                    />
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}


'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare, Calculator, Zap, ArrowRight, Users } from "lucide-react";
import Link from 'next/link';

const coPilots = [
    {
        icon: Users,
        title: "TerraLead™",
        description: "Capture, score, and automatically nurture leads with an AI-powered CRM.",
        href: "/leads",
        color: "text-green-500",
        bgColor: "bg-green-500/10"
    },
    {
        icon: PenSquare,
        title: "TerraScribe™",
        description: "Generate compelling property descriptions, emails, and social media posts in seconds.",
        href: "/scribe",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10"
    },
    {
        icon: Calculator,
        title: "TerraValuate™",
        description: "Create AI-powered Comparative Market Analysis (CMA) reports for accurate valuations.",
        href: "/terravaluate",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10"
    },
    {
        icon: Zap,
        title: "SmartFlow™",
        description: "Automate your workflows, from lead follow-ups to contract reminders.",
        href: "/smartflow",
        color: "text-orange-500",
        bgColor: "bg-orange-500/10"
    },
];

export function AiCoPilots() {
    return (
        <div>
            <h2 className="text-2xl font-bold font-headline mb-4 text-foreground">Your AI Co-Pilots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coPilots.map((pilot) => {
                    const Icon = pilot.icon;
                    return (
                        <Card key={pilot.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${pilot.bgColor}`}>
                                        <Icon className={`h-6 w-6 ${pilot.color}`} />
                                    </div>
                                    <CardTitle className="font-headline text-lg text-primary">{pilot.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription>{pilot.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="pt-4">
                                <Button variant="outline" asChild className="w-full">
                                    <Link href={pilot.href}>
                                        Launch {pilot.title} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}

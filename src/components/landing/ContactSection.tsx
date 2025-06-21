
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Building2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

// A more styled Info Card
const InfoCard: React.FC<{icon: React.ElementType, title: string, content: string, href?: string}> = ({ icon: Icon, title, content, href }) => {
    const contentEl = <p className="text-base text-muted-foreground break-words">{content}</p>;
    
    return (
        <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                {href ? <a href={href} className="hover:underline">{contentEl}</a> : contentEl}
            </div>
        </div>
    );
};


export const ContactSection = () => {
    const { toast } = useToast();

    return (
        <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-teal-50/20 dark:from-slate-900 dark:to-teal-900/20" data-section-view="contact">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-headline text-slate-800 dark:text-slate-100">
                        Get in Touch
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Have a question or want to see a personalized demo? We're here to help you unlock the power of AI for your business.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                    {/* Contact Info Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 lg:col-span-2"
                    >
                        <InfoCard 
                            icon={Mail} 
                            title="Email Us" 
                            content="sales@terraflow.ai" 
                            href="mailto:sales@terraflow.ai"
                        />
                         <InfoCard 
                            icon={Phone} 
                            title="Call Us" 
                            content="+91 91234 56789" 
                            href="tel:+919123456789"
                        />
                         <InfoCard 
                            icon={Building2} 
                            title="Our Headquarters" 
                            content="123 AI Avenue, Tech Park, Bangalore, 560001, India"
                        />
                        <div className="rounded-lg overflow-hidden shadow-lg border border-border">
                            <Image 
                                src="https://images.unsplash.com/photo-1598436053225-b8c1b69335f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8YmFuZ2Fsb3JlJTIwbWFwfGVufDB8fHx8MTc1MDk5Mjk3Mnww&ixlib=rb-4.1.0&q=80&w=1080" 
                                alt="Map of Bangalore" 
                                width={800} 
                                height={600} 
                                className="w-full h-64 object-cover"
                                data-ai-hint="city map"
                            />
                        </div>
                    </motion.div>

                    {/* Contact Form Column */}
                     <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3"
                    >
                        <Card className="p-6 md:p-8 shadow-2xl bg-background border border-border">
                            <CardContent className="p-0">
                                <form 
                                    className="space-y-6" 
                                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                                        e.preventDefault(); 
                                        toast({
                                            title: "Message Sent!",
                                            description: "Thank you for reaching out. We'll get back to you shortly."
                                        });
                                        (e.target as HTMLFormElement).reset();
                                    }}
                                >
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="sr-only">Name</label>
                                            <Input id="name" name="name" type="text" placeholder="Your Name" required className="h-12 bg-muted/50" />
                                        </div>
                                        <div>
                                            <label htmlFor="email-contact" className="sr-only">Email</label>
                                            <Input id="email-contact" name="email" type="email" placeholder="Your Email" required className="h-12 bg-muted/50" />
                                        </div>
                                    </div>
                                    <div>
                                         <label htmlFor="subject" className="sr-only">Subject</label>
                                         <Input id="subject" name="subject" type="text" placeholder="Subject" required className="h-12 bg-muted/50" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="sr-only">Message</label>
                                        <Textarea id="message" name="message" placeholder="Your Message" rows={5} required className="bg-muted/50" />
                                    </div>
                                    <Button type="submit" size="lg" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                                        <Send className="mr-2 h-5 w-5"/>
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

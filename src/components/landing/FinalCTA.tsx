
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

// Form Validation Schema
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  workEmail: z.string().email({ message: "A valid work email is required." }),
  companyName: z.string().min(1, { message: "Company name is required." }),
  companySize: z.string().min(1, { message: "Please select your company size." }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const checklistItems = [
  "Personalized 1-on-1 Demo",
  "Custom ROI & Efficiency Analysis",
  "Answers to All Your Questions",
  "Exclusive Early Adopter Pricing",
];

export function FinalCTA() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      workEmail: "",
      companyName: "",
      companySize: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setIsSubmitted(false); // Allow for re-submission attempts after an error

    const dataToSend = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.workEmail,
        companyName: values.companyName,
        companySize: values.companySize,
        message: values.message,
    };

    try {
      const functionUrl = process.env.NEXT_PUBLIC_SUPABASE_CONTACT_FORM_URL;
      if (!functionUrl) {
          throw new Error("The contact form URL is not configured. Please contact support.");
      }
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        // Try to parse a more specific error from the function's response body
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || `Request failed with status ${response.status}.`;
        throw new Error(errorMessage);
      }

      toast({
        title: "Request Sent!",
        description: "We've received your demo request and will be in touch shortly.",
      });

      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: CTA */}
          <div className="text-center lg:text-left">
            <Logo href="/" className="justify-center lg:justify-start mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800 mb-4">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Redefine</span> Your Real Estate Business?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              You've seen the features, now see the impact. Schedule a personalized, no-obligation demo with one of our AI specialists. We'll walk you through the platform and build a custom ROI projection for your specific business needs.
            </p>
            <ul className="space-y-3 text-left max-w-md mx-auto lg:mx-0">
              {checklistItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Form */}
          <div>
            <Card className="shadow-2xl bg-white border border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-center text-primary">Schedule Your Demo</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center h-96">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-slate-800">Thank You!</h3>
                    <p className="text-slate-600 mt-2">We've received your request and will be in touch shortly to schedule your demo.</p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="firstName" render={({ field }) => (
                          <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => (
                          <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="workEmail" render={({ field }) => (
                        <FormItem><FormLabel>Work Email</FormLabel><FormControl><Input type="email" placeholder="john.doe@realty.com" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="companyName" render={({ field }) => (
                        <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="e.g. ACME Realty" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="companySize" render={({ field }) => (
                        <FormItem><FormLabel>Company Size</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="myself">Just Myself</SelectItem>
                              <SelectItem value="2-10">2-10 Agents</SelectItem>
                              <SelectItem value="11-50">11-50 Agents</SelectItem>
                              <SelectItem value="51+">51+ Agents</SelectItem>
                              <SelectItem value="developer">Developer</SelectItem>
                            </SelectContent>
                          </Select>
                        <FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem><FormLabel>Message (Optional)</FormLabel><FormControl><Textarea placeholder="Tell us a bit about your business and what you're hoping to achieve..." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="submit" className="w-full text-lg py-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md hover:shadow-lg transition-shadow" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                        {isLoading ? "Submitting..." : "Submit Request"}
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
  );
}

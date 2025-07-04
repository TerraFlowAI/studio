
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  workEmail: z.string().email({ message: "A valid work email is required." }),
  companyName: z.string().optional(),
  companySize: z.string().min(1, { message: "Please select a company size." }),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof formSchema>;

export function ContactFormPricing() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const form = useForm<ContactFormValues>({
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

  async function onSubmit(values: ContactFormValues) {
    setIsLoading(true);

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
        let errorMessage = `Request failed with status ${response.status}.`;
        if (response.status === 404) {
            errorMessage = "Submission endpoint not found (404). Please ensure the Supabase function is deployed and the URL in your environment variables is correct.";
        } else {
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorMessage;
            } catch (e) {
                // Ignore if response is not JSON
            }
        }
        
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: errorMessage,
        });
        return; 
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll be in touch shortly.",
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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
       >
        <Card className="max-w-2xl mx-auto shadow-xl border-primary/20">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                    Schedule Your Demo
                </CardTitle>
            </CardHeader>
          <CardContent className="p-6 md:p-8 pt-2">
             {isSubmitted ? (
                  <>
                    <div className="flex flex-col items-center justify-center text-center h-[480px]">
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-2xl font-bold text-slate-800">Thank You!</h3>
                      <p className="text-slate-600 mt-2 mb-6">We've received your request and will be in touch shortly.</p>
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Submit Another Request
                      </Button>
                    </div>
                  </>
                ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} className="bg-slate-50"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} className="bg-slate-50"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="workEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@realty.com" {...field} className="bg-slate-50"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. ACME Realty" {...field} className="bg-slate-50"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companySize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger className="bg-slate-50"><SelectValue placeholder="Select an option" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="myself">Just Myself</SelectItem>
                                <SelectItem value="2-10">2-10 Agents</SelectItem>
                                <SelectItem value="11-50">11-50 Agents</SelectItem>
                                <SelectItem value="51+">51+ Agents</SelectItem>
                                <SelectItem value="developer">Developer</SelectItem>
                              </SelectContent>
                            </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a bit about your business and what you're hoping to achieve..."
                              rows={4}
                              {...field}
                              className="bg-slate-50"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full text-white text-lg py-6 bg-gradient-to-r from-teal-500 to-blue-500"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                      {isLoading ? "Submitting..." : "Submit Request"}
                    </Button>
                  </form>
                </Form>
            )}
          </CardContent>
        </Card>
      </motion.div>
  );
}

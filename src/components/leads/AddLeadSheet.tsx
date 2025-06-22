
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LEAD_SOURCES, LEAD_STATUSES } from "@/lib/constants";
import type { Lead } from "./LeadsTable";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// The form schema now only contains fields the user will fill out.
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "A valid email is required." }),
  phone: z.string().optional(),
  source: z.string().min(1, { message: "Source is required." }),
  status: z.string().min(1, { message: "Status is required." }),
  propertyOfInterest: z.string().optional(),
});

type AddLeadFormValues = z.infer<typeof formSchema>;

// The component's props now expect the specific fields from the form
interface AddLeadSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddLead: (leadData: AddLeadFormValues) => Promise<void> | void;
}

export function AddLeadSheet({ isOpen, onOpenChange, onAddLead }: AddLeadSheetProps) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<AddLeadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      source: "Manual Entry",
      status: "New",
      propertyOfInterest: "",
    },
  });

  async function onSubmit(values: AddLeadFormValues) {
    setIsSaving(true);
    await onAddLead(values);
    setIsSaving(false);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-headline text-primary">Add New Lead</SheetTitle>
          <SheetDescription>
            Enter the details for the new lead. Required fields are marked with an asterisk.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Aarav Sharma" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="e.g., aarav@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., +91 98765 43210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lead Source *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LEAD_SOURCES.map(source => (
                        <SelectItem key={source.id} value={source.label}>{source.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select initial status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LEAD_STATUSES.map(status => (
                        <SelectItem key={status.id} value={status.label}>{status.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="propertyOfInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property of Interest</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Luxury Apartment in Bandra" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="mt-2">
              <SheetClose asChild>
                <Button type="button" variant="outline" disabled={isSaving}>Cancel</Button>
              </SheetClose>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isSaving ? 'Saving...' : 'Save Lead'}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}


"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.string().min(1, { message: "Please select a role." }),
});

type RoleFormValues = z.infer<typeof formSchema>;

export default function AdminPage() {
  const { isAdmin, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", role: "customer" },
  });

  // Redirect if user is not an admin after auth state is resolved
  React.useEffect(() => {
    if (!isAuthLoading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, isAuthLoading, router]);


  const onSubmit = async (values: RoleFormValues) => {
    setIsSubmitting(true);
    try {
      const functions = getFunctions();
      const setAdminRole = httpsCallable(functions, 'setAdminRole');
      const result = await setAdminRole({ email: values.email, role: values.role });
      
      toast({
        title: "Success!",
        description: (result.data as { message: string }).message,
      });
      form.reset();
    } catch (error: any) {
      console.error("Error setting role:", error);
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description: error.message || "An unknown error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Render nothing or a redirect message if not admin, effect will handle redirect
  if (!isAdmin) {
    return null; 
  }

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Admin: User Role Management"
        description="Grant or revoke roles for users in the system."
      />
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Set User Role</CardTitle>
          <CardDescription>
            Enter a user's email and select the desired role. This will grant them the associated permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role to Assign</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ShieldCheck className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? "Updating Role..." : "Update Role"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

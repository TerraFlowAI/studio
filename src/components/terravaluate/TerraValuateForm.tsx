"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateCmaReport, GenerateCmaReportInput, GenerateCmaReportOutput } from "@/ai/flows/generate-cma-report";
import { useState } from "react";
import { Loader2, BarChartBig } from "lucide-react";

const formSchema = z.object({
  propertyAddress: z.string().min(1, "Property address is required."),
  propertyDetails: z.string().min(1, "Property details are required (e.g., size, features, condition)."),
  marketTrends: z.string().min(1, "Current market trends are required."),
  comparableProperties: z.string().min(1, "Comparable properties information is required."),
});

export function TerraValuateForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<GenerateCmaReportOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyAddress: "",
      propertyDetails: "",
      marketTrends: "",
      comparableProperties: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedReport(null);
    try {
      const input: GenerateCmaReportInput = values;
      const result = await generateCmaReport(input);
      setGeneratedReport(result);
      toast({
        title: "CMA Report Generated!",
        description: "Your Comparative Market Analysis report is ready.",
      });
    } catch (error) {
      console.error("Error generating CMA report:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate CMA report. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Property &amp; Market Information</CardTitle>
          <CardDescription>Provide details to generate an AI-powered CMA report.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="propertyAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Address</FormLabel>
                    <FormControl><Input placeholder="e.g., 123 Main St, Anytown, USA" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="propertyDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Details</FormLabel>
                    <FormControl><Textarea placeholder="e.g., 3 bed, 2 bath, 1500 sqft, renovated kitchen, new roof" {...field} rows={3} /></FormControl>
                    <FormDescription>Include size, features, condition, etc.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketTrends"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market Trends</FormLabel>
                    <FormControl><Textarea placeholder="e.g., Prices up 5% YoY, average 30 days on market, high demand for family homes" {...field} rows={3} /></FormControl>
                    <FormDescription>Current market conditions in the area.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comparableProperties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comparable Properties (Comps)</FormLabel>
                    <FormControl><Textarea placeholder="e.g., 125 Main St sold for $500k (3bd/2ba, 1450sqft), 10 Oak Ave listed at $520k (3bd/2.5ba, 1600sqft)" {...field} rows={3} /></FormControl>
                    <FormDescription>Recent sales and active listings nearby.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <BarChartBig className="mr-2 h-5 w-5" />}
                {isLoading ? "Generating Report..." : "Generate CMA Report"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Generated CMA Report</CardTitle>
          <CardDescription>AI-powered Comparative Market Analysis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
           {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p>Generating your CMA report... This may take a moment.</p>
            </div>
          )}
          {!isLoading && !generatedReport && (
             <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10 border-2 border-dashed rounded-lg">
              <BarChartBig className="h-16 w-16 text-primary/30 mb-4" />
              <p>Your generated CMA report will appear here.</p>
            </div>
          )}
          {generatedReport && (
            <>
              <div>
                <h3 className="text-md font-semibold font-headline text-primary mb-1">Executive Summary:</h3>
                <p className="text-sm bg-muted/50 p-3 rounded-md">{generatedReport.executiveSummary}</p>
              </div>
              <div>
                <h3 className="text-md font-semibold font-headline text-primary mb-1">Property Valuation:</h3>
                <p className="text-sm bg-muted/50 p-3 rounded-md">{generatedReport.propertyValuation}</p>
              </div>
              <div>
                <h3 className="text-md font-semibold font-headline text-primary mb-1">Market Analysis:</h3>
                <p className="text-sm bg-muted/50 p-3 rounded-md">{generatedReport.marketAnalysis}</p>
              </div>
              <div>
                <h3 className="text-md font-semibold font-headline text-primary mb-1">Comparable Property Analysis:</h3>
                <p className="text-sm bg-muted/50 p-3 rounded-md">{generatedReport.comparablePropertyAnalysis}</p>
              </div>
              <div>
                <h3 className="text-md font-semibold font-headline text-primary mb-1">Recommendation:</h3>
                <p className="text-sm bg-muted/50 p-3 rounded-md">{generatedReport.recommendation}</p>
              </div>
               <Button 
                onClick={() => {
                  const reportText = `
Executive Summary: ${generatedReport.executiveSummary}\n
Property Valuation: ${generatedReport.propertyValuation}\n
Market Analysis: ${generatedReport.marketAnalysis}\n
Comparable Property Analysis: ${generatedReport.comparablePropertyAnalysis}\n
Recommendation: ${generatedReport.recommendation}\n
                  `;
                  navigator.clipboard.writeText(reportText.trim());
                  toast({ title: "Report copied to clipboard!"});
                }}
                variant="outline"
                className="w-full mt-4"
              >
                Copy Full Report
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

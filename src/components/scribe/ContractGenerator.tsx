
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileSignatureIcon, Construction, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export function ContractGenerator() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <FileSignatureIcon className="mr-2 h-5 w-5 text-primary" /> Contract Generation (TerraSecure™)
        </CardTitle>
        <CardDescription>
          Generate various real estate contract templates with AI assistance and risk analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert variant="destructive" className="border-yellow-500/50 text-yellow-700 dark:border-yellow-600/70 dark:text-yellow-400 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400">
          <ShieldAlert className="h-5 w-5" />
          <AlertTitle className="font-semibold">Important Disclaimer</AlertTitle>
          <AlertDescription className="text-xs">
            TerraFlow provides AI-generated templates for informational purposes only. These are not a substitute for professional legal advice. Always consult with a qualified legal professional before finalizing or using any contract.
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
          <Construction className="h-16 w-16 text-primary/80 mb-4" />
          <p className="text-lg font-semibold text-muted-foreground">Feature Coming Soon!</p>
          <p className="text-sm text-muted-foreground max-w-md">
            Securely generate and analyze contracts for rental agreements, sales, NDAs, and more, with AI-powered risk detection.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

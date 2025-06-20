
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, BookOpen, MessageSquare, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpSupportPage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Help & Support" 
        description="Find answers, learn more, and get assistance from the TerraFlow team." 
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Support Center</CardTitle>
          <CardDescription>
            This section is under development. It will provide access to our knowledge base, 
            FAQs, tutorials, product updates, and a way to contact our support team directly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Construction className="h-16 w-16 text-primary mb-4" />
          <p className="text-lg font-semibold text-muted-foreground">Coming Soon!</p>
          <p className="text-sm text-muted-foreground">
            The Help & Support page is currently being built.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
            <Button variant="outline" className="opacity-50 cursor-not-allowed">
              <BookOpen className="mr-2 h-4 w-4" /> Knowledge Base
            </Button>
            <Button variant="outline" className="opacity-50 cursor-not-allowed">
              <HelpCircle className="mr-2 h-4 w-4" /> FAQs
            </Button>
            <Button variant="outline" className="opacity-50 cursor-not-allowed">
              <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

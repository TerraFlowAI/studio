
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyDescriptionGenerator } from "@/components/scribe/PropertyDescriptionGenerator";
import { MarketingEmailGenerator } from "@/components/scribe/MarketingEmailGenerator";
import { SocialMediaPostGenerator } from "@/components/scribe/SocialMediaPostGenerator";
import { BlogPostGenerator } from "@/components/scribe/BlogPostGenerator";
import { ContractGenerator } from "@/components/scribe/ContractGenerator";
import { PenSquare, Mail, Share2, FileTextIcon, FileSignature } from "lucide-react";

export default function ScribePage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="TerraScribe™ AI Content Studio" 
        description="Your central hub for generating all types of real estate content with AI." 
      />
      <Tabs defaultValue="property-description" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto">
          <TabsTrigger value="property-description" className="py-2"><PenSquare className="mr-2 h-4 w-4" /> Property Listing</TabsTrigger>
          <TabsTrigger value="marketing-email" className="py-2"><Mail className="mr-2 h-4 w-4" /> Marketing Email</TabsTrigger>
          <TabsTrigger value="social-media" className="py-2"><Share2 className="mr-2 h-4 w-4" /> Social Media Post</TabsTrigger>
          <TabsTrigger value="blog-post" className="py-2"><FileTextIcon className="mr-2 h-4 w-4" /> Blog Post</TabsTrigger>
          <TabsTrigger value="contract" className="py-2"><FileSignature className="mr-2 h-4 w-4" /> Contract</TabsTrigger>
        </TabsList>
        <TabsContent value="property-description" className="mt-6">
          <PropertyDescriptionGenerator />
        </TabsContent>
        <TabsContent value="marketing-email" className="mt-6">
          <MarketingEmailGenerator />
        </TabsContent>
        <TabsContent value="social-media" className="mt-6">
          <SocialMediaPostGenerator />
        </TabsContent>
        <TabsContent value="blog-post" className="mt-6">
          <BlogPostGenerator />
        </TabsContent>
        <TabsContent value="contract" className="mt-6">
           <ContractGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}

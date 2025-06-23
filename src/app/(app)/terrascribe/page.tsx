
import { PageHeader } from "@/components/shared/PageHeader";
import { TerraScribeForm } from "@/components/terrascribe/TerraScribeForm";

export default function TerraScribePage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="TerraScribe™ AI" 
        description="Generate compelling property descriptions and marketing headlines effortlessly using AI." 
      />
      <TerraScribeForm />
    </div>
  );
}

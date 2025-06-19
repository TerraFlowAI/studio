import { PageHeader } from "@/components/shared/PageHeader";
import { TerraValuateForm } from "@/components/terravaluate/TerraValuateForm";

export default function TerraValuatePage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="TerraValuate™ Pro" 
        description="Generate AI-powered Comparative Market Analysis (CMA) reports for accurate property valuation." 
      />
      <TerraValuateForm />
    </div>
  );
}

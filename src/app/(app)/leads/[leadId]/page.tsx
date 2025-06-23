// src/app/(app)/leads/[leadId]/page.tsx
export default function LeadDetailPage({ params }: { params: { leadId: string } }) {
    return <h1>Details for Lead: {params.leadId}</h1>
}

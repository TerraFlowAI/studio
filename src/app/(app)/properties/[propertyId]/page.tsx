// src/app/(app)/properties/[propertyId]/page.tsx
export default function PropertyDetailPage({ params }: { params: { propertyId: string } }) {
    return <h1>Details for Property: {params.propertyId}</h1>
}

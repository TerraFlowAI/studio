
// This file was intentionally removed to disconnect from Firebase.
// The dashboard page now uses static mock data.
// This file can be replaced with a Supabase-specific hook later.

// Added a dummy export to prevent breaking other potential imports, though none exist right now.
export type Property = {
  id: string;
  title: string;
  locality: string;
  price: string;
  imageUrl: string;
  aiHint: string;
};

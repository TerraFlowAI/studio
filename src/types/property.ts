
import type { PropertyStatusId, PropertyTypeId } from "@/lib/constants";

export interface Property {
  id: string;
  title: string;
  address: string;
  locality: string;
  imageUrl: string;
  aiHint: string;
  status: Extract<PropertyStatusId, string> | 'Active' | 'Draft' | 'Pending' | 'Sold' | 'Archived'; // More flexible for mock data
  hasVrTour: boolean;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  views: number;
  leadsGenerated: number;
  dateAdded: string;
  propertyType: Extract<PropertyTypeId, string> | 'Apartment' | 'Villa' | 'Land' | 'Commercial' | 'House'; // More flexible for mock data
}

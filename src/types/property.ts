import type { PropertyStatusId, PropertyTypeId } from "@/lib/constants";

// Represents a property listing in the application
export interface Property {
  // Core Identifiers
  id: string;
  ownerId?: string; // ID of the user who owns this listing

  // Basic Information
  title: string;
  description?: string;
  status: PropertyStatusId | 'Active' | 'Draft' | 'Pending' | 'Sold' | 'Archived';
  listingFor: 'Sale' | 'Rent';
  
  // Location
  address: string;
  locality: string;
  city: string;

  // Details
  propertyType: PropertyTypeId | 'Apartment' | 'Villa' | 'Land' | 'Commercial' | 'House' | 'Other';
  price: string; // Stored as a formatted string e.g., "₹50,00,000"
  beds: number;
  baths: number;
  sqft: number;
  furnishingStatus?: 'Unfurnished' | 'Semi-Furnished' | 'Fully-Furnished';

  // Media & Engagement
  imageUrl: string;
  imageUrls?: string[];
  aiHint: string; // For AI image search hints
  hasVrTour: boolean;
  vrTourUrl?: string;

  // Performance Metrics
  views: number;
  leadsGenerated: number;
  
  // Timestamps
  dateAdded: string; // ISO string date
  dateSold?: string; // ISO string date
}

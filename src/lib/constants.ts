export const LEAD_STATUSES = [
  { id: 'new', label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-700/30 dark:text-blue-200 dark:border-blue-600' },
  { id: 'contacted', label: 'Contacted', color: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-700/30 dark:text-amber-200 dark:border-amber-600' },
  { id: 'viewing_scheduled', label: 'Viewing Scheduled', color: 'bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-cyan-700/30 dark:text-cyan-200 dark:border-cyan-600' },
  { id: 'offer_made', label: 'Offer Made', color: 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-700/30 dark:text-purple-200 dark:border-purple-600' },
  { id: 'qualified', label: 'Qualified', color: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-700/30 dark:text-green-200 dark:border-green-600' },
  { id: 'unqualified', label: 'Unqualified', color: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-700/30 dark:text-slate-200 dark:border-slate-600' },
] as const;

export type LeadStatusId = typeof LEAD_STATUSES[number]['id'];

export const LEAD_SOURCES = [
  { id: 'website_chatbot', label: 'Website Chatbot' },
  { id: 'property_listing', label: 'Property Listing' },
  { id: 'google_ads', label: 'Google Ads' },
  { id: 'social_media', label: 'Social Media' },
  { id: 'referral', label: 'Referral' },
  { id: 'manual_entry', label: 'Manual Entry' },
  { id: 'other', label: 'Other' },
] as const;

export type LeadSourceId = typeof LEAD_SOURCES[number]['id'];

export const AI_SMART_VIEWS = [
  { id: 'all', label: 'All Leads' },
  { id: 'hot', label: 'Hot Leads' }, 
  { id: 'new', label: 'New Leads' }, 
  { id: 'needs_attention', label: 'Needs Attention' },
] as const;

export type AiSmartViewId = typeof AI_SMART_VIEWS[number]['id'];


// Constants for Properties Page
export const PROPERTY_STATUSES = [
  { id: 'active', label: 'Active' },
  { id: 'draft', label: 'Draft' },
  { id: 'pending', label: 'Pending' },
  { id: 'sold', label: 'Sold' },
  { id: 'archived', label: 'Archived' },
] as const;

export type PropertyStatusId = typeof PROPERTY_STATUSES[number]['id'];

export const PROPERTY_TYPES = [
  { id: 'apartment', label: 'Apartment' },
  { id: 'villa', label: 'Villa' },
  { id: 'house', label: 'House' },
  { id: 'land', label: 'Land' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'other', label: 'Other' }
] as const;

export type PropertyTypeId = typeof PROPERTY_TYPES[number]['id'];

// For styling status badges/dots consistently
export const PROPERTY_STATUSES_CONFIG = {
  active: { dotColor: 'hsl(var(--chart-1))', badgeColor: 'bg-green-500' },
  draft: { dotColor: 'hsl(var(--muted-foreground))', badgeColor: 'bg-slate-500' },
  pending: { dotColor: 'hsl(var(--chart-3))', badgeColor: 'bg-yellow-500' },
  sold: { dotColor: 'hsl(var(--primary))', badgeColor: 'bg-blue-500' },
  archived: { dotColor: 'hsl(var(--destructive))', badgeColor: 'bg-red-500' },
  default: { dotColor: 'hsl(var(--border))', badgeColor: 'bg-gray-400' }
} as const;

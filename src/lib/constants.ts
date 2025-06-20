
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
  { id: 'hot', label: 'Hot Leads' }, // Emoji added in component
  { id: 'new', label: 'New Leads' }, // Emoji added in component
  { id: 'needs_attention', label: 'Needs Attention' },
] as const;

export type AiSmartViewId = typeof AI_SMART_VIEWS[number]['id'];


export const LEAD_STATUSES = [
  { id: 'new', label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { id: 'contacted', label: 'Contacted', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { id: 'viewing_scheduled', label: 'Viewing Scheduled', color: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
  { id: 'offer_made', label: 'Offer Made', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { id: 'qualified', label: 'Qualified', color: 'bg-green-100 text-green-700 border-green-300' },
  { id: 'unqualified', label: 'Unqualified', color: 'bg-slate-100 text-slate-700 border-slate-300' },
] as const;

export type LeadStatusId = typeof LEAD_STATUSES[number]['id'];

export const LEAD_SOURCES = [
  { id: 'website_chatbot', label: 'Website Chatbot' },
  { id: 'property_listing', label: 'Property Listing' },
  { id: 'google_ads', label: 'Google Ads' },
  { id: 'social_media', label: 'Social Media' },
  { id: 'referral', label: 'Referral' },
  { id: 'manual_entry', label: 'Manual Entry' },
] as const;

export type LeadSourceId = typeof LEAD_SOURCES[number]['id'];

export const AI_SMART_VIEWS = [
  { id: 'all', label: 'All Leads' },
  { id: 'hot', label: '🔥 Hot Leads' },
  { id: 'new', label: '🆕 New Leads' },
  { id: 'needs_attention', label: 'Needs Attention' },
] as const;

export type AiSmartViewId = typeof AI_SMART_VIEWS[number]['id'];

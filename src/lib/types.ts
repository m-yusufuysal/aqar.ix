export type LeadStatus =
  | 'new'
  | 'enriching'
  | 'ready_to_call'
  | 'calling'
  | 'meeting_booked'
  | 'listing_agreed'
  | 'eoi_booked'
  | 'follow_up'
  | 'not_interested';

export type CampaignMode = 'secondary_listing_hunter' | 'offplan_investor_closer';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  area: string; // e.g., Downtown Dubai, Dubai Marina, JVC, Dubai South
  buildingName?: string;
  propertyType: 'Apartment' | 'Villa' | 'Townhouse' | 'Penthouse';
  bedrooms: number;
  estimatedSqft?: number;
  askingPrice?: number;
  motivation?: string;
  status: LeadStatus;
  campaignMode?: CampaignMode;
  createdAt: string;
  lastCalledAt?: string;
  callCount: number;
  dossierSummary?: string;
  extractedStrategy?: {
    suggestedPriceRange: string;
    keyObjections: string[];
    openingHook: string;
    compsInsight: string;
    offPlanProjectMatch?: string;
    paymentPlanSummary?: string;
  };
}

export type CallOutcome =
  | 'listing_agreed'
  | 'meeting_booked'
  | 'eoi_booked'
  | 'soft_interest'
  | 'callback_requested'
  | 'not_interested'
  | 'no_answer';

export interface CallRecord {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  area: string;
  campaignMode: CampaignMode;
  timestamp: string;
  durationSeconds: number;
  outcome: CallOutcome;
  sentimentScore: number; // 0 to 100
  sellerMotivationScore: number; // 1 to 10
  recordingUrl?: string;
  transcript: {
    speaker: 'agent' | 'prospect';
    text: string;
    timestamp: string;
  }[];
  keyTakeaways: string[];
  extractedData: {
    agreedMeetingTime?: string;
    targetPriceAED?: number;
    desiredCommission?: string;
    eoiDepositAED?: number;
    offPlanProject?: string;
    floorViewInfo?: string;
    urgentTimeline?: boolean;
    whatsappSent: boolean;
    telegramAlertSent: boolean;
  };
}

export interface DubaiComp {
  id: string;
  area: string;
  building: string;
  propertyType: string;
  avgPricePerSqft: number;
  avgRentPerSqft: number;
  rentalYieldPercentage: number;
  recentSales: {
    unitType: string;
    soldPriceAED: number;
    sizeSqft: number;
    date: string;
  }[];
  topDevelopers: string[];
  goldenVisaEligible: boolean;
  keyHighlights: string[];
}

export interface SystemMetrics {
  totalCallsMade: number;
  listingsAgreed: number;
  meetingsBooked: number;
  eoisBooked: number;
  avgCallDuration: number;
  conversionRate: number;
  activeCampaigns: number;
}

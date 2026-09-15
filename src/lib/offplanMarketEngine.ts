export interface OffPlanProject {
  id: string;
  projectName: string;
  developer: string;
  location: string;
  startingPriceAED: number;
  paymentPlanStructure: string; // e.g. "80/20 (20% Down, 60% during construction, 20% on Handover)"
  eoiBookingDepositAED: number; // e.g. 50,000 AED
  handoverDate: string; // e.g. Q4 2028
  expectedYieldROI: number; // e.g. 9.2%
  capitalGrowthProjectionPct: number; // e.g. 35% by handover
  goldenVisaEligible: boolean;
  developerTrackRecord: string;
  keyHighlights: string[];
}

export const DUBAI_OFFPLAN_DATABASE: OffPlanProject[] = [
  {
    id: 'offplan-emaar-grand',
    projectName: 'Emaar Grand Club Resort',
    developer: 'Emaar Properties',
    location: 'Dubai South / Al Maktoum Airport Corridor',
    startingPriceAED: 1850000,
    paymentPlanStructure: '80/20 (10% Down, 70% during construction, 20% on Handover)',
    eoiBookingDepositAED: 50000,
    handoverDate: 'Q4 2028',
    expectedYieldROI: 9.2,
    capitalGrowthProjectionPct: 38,
    goldenVisaEligible: true,
    developerTrackRecord: 'Emaar: 100% On-time delivery record across Downtown & Dubai Marina',
    keyHighlights: [
      'Located 7 mins from world largest Al Maktoum International Airport expansion ($35B investment)',
      '18-hole Championship Golf Course & Wellness Resort Lagoon',
      'High investor demand with 38% projected capital growth before 2028 handover',
    ],
  },
  {
    id: 'offplan-sobha-hartland2',
    projectName: 'Sobha Hartland II - Riverside Crescent',
    developer: 'Sobha Realty',
    location: 'Meydan / MBR City',
    startingPriceAED: 1650000,
    paymentPlanStructure: '60/40 (20% Down, 40% construction, 40% on Handover)',
    eoiBookingDepositAED: 50000,
    handoverDate: 'Q2 2028',
    expectedYieldROI: 8.8,
    capitalGrowthProjectionPct: 30,
    goldenVisaEligible: true,
    developerTrackRecord: 'Sobha: In-house backward integrated construction (highest quality build rating in UAE)',
    keyHighlights: [
      '5 mins from Downtown Dubai & Ras Al Khor Wildlife Sanctuary',
      'Fully fitted German kitchen appliances & smart home automation included',
      'Flexible 60/40 payment plan with low construction milestones',
    ],
  },
  {
    id: 'offplan-binghatti-skyrise',
    projectName: 'Binghatti Skyrise',
    developer: 'Binghatti',
    location: 'Business Bay Waterfront Canal',
    startingPriceAED: 1450000,
    paymentPlanStructure: '70/30 (20% Down, 50% construction, 30% on Handover)',
    eoiBookingDepositAED: 35000,
    handoverDate: 'Q4 2027',
    expectedYieldROI: 10.2,
    capitalGrowthProjectionPct: 32,
    goldenVisaEligible: true,
    developerTrackRecord: 'Binghatti: Hyper-fast construction speed, iconic architectural branding',
    keyHighlights: [
      'Direct Business Bay Canal front with Burj Khalifa skyline views',
      'High short-term holiday home ROI potential (10.2% projected yield)',
      'Resell eligible after paying 30% of purchase price',
    ],
  },
  {
    id: 'offplan-damac-islands',
    projectName: 'Damac Islands',
    developer: 'Damac Properties',
    location: 'Dubailand / Al Qudra Road Corridor',
    startingPriceAED: 2250000,
    paymentPlanStructure: '75/25 (20% Down, 55% construction, 25% on Handover)',
    eoiBookingDepositAED: 100000,
    handoverDate: 'Q1 2029',
    expectedYieldROI: 8.5,
    capitalGrowthProjectionPct: 40,
    goldenVisaEligible: true,
    developerTrackRecord: 'Damac: Global luxury master developer with 45,000+ delivered units',
    keyHighlights: [
      'Tropical island themed master resort community with crystal lagoons',
      'Spacious 4 & 5 Bedroom waterfront townhouses & luxury villas',
      'Highest capital appreciation potential for long-term land value',
    ],
  },
];

export function getOffPlanData(locationOrProject?: string) {
  if (!locationOrProject) return DUBAI_OFFPLAN_DATABASE[0];
  const normalized = locationOrProject.toLowerCase();

  return (
    DUBAI_OFFPLAN_DATABASE.find(
      (p) =>
        p.projectName.toLowerCase().includes(normalized) ||
        p.developer.toLowerCase().includes(normalized) ||
        p.location.toLowerCase().includes(normalized)
    ) || DUBAI_OFFPLAN_DATABASE[0]
  );
}

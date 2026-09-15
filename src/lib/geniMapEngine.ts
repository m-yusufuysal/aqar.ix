export interface GeniMapLocation {
  id: string;
  zoneName: string;
  metroProximityMins: number; // minutes walk/drive
  airportProximityMins: number; // DXB or DWC Al Maktoum
  downtownProximityMins: number;
  beachProximityMins: number;
  viewTypes: string[]; // e.g. "Burj Khalifa & Skyline", "Full Sea", "Lagoon", "Golf Course"
  topOffPlanRecommendation: string;
  topSecondaryRecommendation: string;
  growthDriver: string;
}

export const GENIMAP_DUBAI_LOCATIONS: GeniMapLocation[] = [
  {
    id: 'loc-downtown',
    zoneName: 'Downtown Dubai / Business Bay Corridor',
    metroProximityMins: 3,
    airportProximityMins: 15,
    downtownProximityMins: 0,
    beachProximityMins: 15,
    viewTypes: ['Burj Khalifa Skyline', 'Dubai Water Canal', 'Fountain View'],
    topOffPlanRecommendation: 'Binghatti Skyrise (Business Bay Canal - 70/30 Plan)',
    topSecondaryRecommendation: 'Burj Crown 2-Bed (AED 3.45M - Fountain View)',
    growthDriver: 'DIFC Financial District expansion & luxury short-term Airbnb demand',
  },
  {
    id: 'loc-dubaisouth',
    zoneName: 'Dubai South / Al Maktoum Airport Corridor',
    metroProximityMins: 8,
    airportProximityMins: 5,
    downtownProximityMins: 25,
    beachProximityMins: 20,
    viewTypes: ['Golf Course', 'Lagoon Resort', 'Park View'],
    topOffPlanRecommendation: 'Emaar Grand Club Resort (AED 1.85M - 80/20 Plan)',
    topSecondaryRecommendation: 'Expo Golf Villas (AED 2.1M - High Rent Demand)',
    growthDriver: '$35 Billion Al Maktoum International Airport expansion (World Largest Airport)',
  },
  {
    id: 'loc-meydan',
    zoneName: 'Meydan / MBR City Corridor',
    metroProximityMins: 6,
    airportProximityMins: 12,
    downtownProximityMins: 7,
    beachProximityMins: 18,
    viewTypes: ['Downtown Skyline', 'Crystal Lagoon', 'Meydan Racecourse'],
    topOffPlanRecommendation: 'Sobha Hartland II - Riverside Crescent (AED 1.65M - 60/40 Plan)',
    topSecondaryRecommendation: 'Wilton Terraces by Ellington (AED 1.95M)',
    growthDriver: 'Crystal Lagoon master community & 7-minute proximity to Downtown',
  },
  {
    id: 'loc-palm',
    zoneName: 'Palm Jumeirah / Emaar Beachfront',
    metroProximityMins: 10,
    airportProximityMins: 25,
    downtownProximityMins: 20,
    beachProximityMins: 0,
    viewTypes: ['Full Arabian Gulf Sea View', 'Palm Monorail', 'Skyline Marina'],
    topOffPlanRecommendation: 'Ellington Beach House (AED 4.9M - 50/50 Plan)',
    topSecondaryRecommendation: 'Shoreline 3-Bed Penthouse (AED 14.5M - Private Beach)',
    growthDriver: 'Ultra-high-net-worth cash buyer trophy asset exclusivity',
  },
];

export function findBestGeniMapMatch(preferences: {
  maxBudgetAED?: number;
  desiredYieldPct?: number;
  preferredView?: string;
  locationFocus?: string;
}) {
  const normalizedLoc = (preferences.locationFocus || '').toLowerCase();

  const matchedZone = GENIMAP_DUBAI_LOCATIONS.find(
    (l) => l.zoneName.toLowerCase().includes(normalizedLoc) || normalizedLoc.includes(l.zoneName.toLowerCase())
  ) || GENIMAP_DUBAI_LOCATIONS[0];

  return {
    matchedZone,
    recommendedOption: matchedZone.topOffPlanRecommendation,
    secondaryAlternative: matchedZone.topSecondaryRecommendation,
    locationReasoning: `Proximity: ${matchedZone.downtownProximityMins} mins to Downtown, ${matchedZone.airportProximityMins} mins to Airport. Major growth driver: ${matchedZone.growthDriver}.`,
  };
}

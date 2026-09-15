import { DubaiComp } from './types';

export const DUBAI_MARKET_DATABASE: DubaiComp[] = [
  {
    id: 'comp-downtown',
    area: 'Downtown Dubai',
    building: 'Burj Crown / Opera Grand / Address Residences',
    propertyType: 'Apartment',
    avgPricePerSqft: 2850,
    avgRentPerSqft: 185,
    rentalYieldPercentage: 6.8,
    recentSales: [
      { unitType: '2 Bedroom', soldPriceAED: 3450000, sizeSqft: 1210, date: '2026-08-28' },
      { unitType: '1 Bedroom', soldPriceAED: 2150000, sizeSqft: 780, date: '2026-09-02' },
      { unitType: '3 Bedroom', soldPriceAED: 5900000, sizeSqft: 1950, date: '2026-09-10' },
    ],
    topDevelopers: ['Emaar Properties'],
    goldenVisaEligible: true,
    keyHighlights: [
      'Burj Khalifa & Fountain Views command 22% premium',
      'High short-term Airbnb demand (82% occupancy rate)',
      'DLD transaction volume up 14% YoY in prime Downtown towers',
    ],
  },
  {
    id: 'comp-marina',
    area: 'Dubai Marina',
    building: 'Marina Gate / LIV Marina / Stella Maris',
    propertyType: 'Apartment',
    avgPricePerSqft: 2200,
    avgRentPerSqft: 155,
    rentalYieldPercentage: 7.2,
    recentSales: [
      { unitType: '1 Bedroom', soldPriceAED: 1720000, sizeSqft: 760, date: '2026-09-01' },
      { unitType: '2 Bedroom', soldPriceAED: 2780000, sizeSqft: 1250, date: '2026-09-05' },
      { unitType: 'Penthouse', soldPriceAED: 9800000, sizeSqft: 4100, date: '2026-08-15' },
    ],
    topDevelopers: ['Select Group', 'Emaar', 'Omniyat'],
    goldenVisaEligible: true,
    keyHighlights: [
      'Full Sea & Marina Walk view units sell 18 days faster than city views',
      'Rental demand driven by tech & finance expat executives',
      'Strong secondary market liquidity',
    ],
  },
  {
    id: 'comp-jvc',
    area: 'Jumeirah Village Circle (JVC)',
    building: 'Binghatti Amber / Ellington Belgravia / Imtiaz Westwood',
    propertyType: 'Apartment',
    avgPricePerSqft: 1280,
    avgRentPerSqft: 105,
    rentalYieldPercentage: 8.4,
    recentSales: [
      { unitType: 'Studio', soldPriceAED: 680000, sizeSqft: 450, date: '2026-09-11' },
      { unitType: '1 Bedroom', soldPriceAED: 920000, sizeSqft: 720, date: '2026-09-12' },
      { unitType: '2 Bedroom', soldPriceAED: 1450000, sizeSqft: 1150, date: '2026-09-08' },
    ],
    topDevelopers: ['Ellington', 'Binghatti', 'Imtiaz', 'Danube'],
    goldenVisaEligible: true,
    keyHighlights: [
      'Highest gross rental yield in Dubai (8.4% - 9.1%)',
      'Strong capital appreciation along Al Khail Road corridor',
      'High buyer demand for designer furnished boutique units',
    ],
  },
  {
    id: 'comp-palm',
    area: 'Palm Jumeirah',
    building: 'Royal Atlantis / Shoreline / One Palm',
    propertyType: 'Penthouse',
    avgPricePerSqft: 4500,
    avgRentPerSqft: 280,
    rentalYieldPercentage: 5.9,
    recentSales: [
      { unitType: '3 Bedroom', soldPriceAED: 14200000, sizeSqft: 2800, date: '2026-08-30' },
      { unitType: 'Signature Villa', soldPriceAED: 48000000, sizeSqft: 8500, date: '2026-09-04' },
    ],
    topDevelopers: ['Nakheel', 'Omniyat', 'Kerzner International'],
    goldenVisaEligible: true,
    keyHighlights: [
      'Ultra-luxury trophy asset market, low inventory, high cash buyers',
      'Private beach access adds 35% premium over mainland Dubai',
    ],
  },
  {
    id: 'comp-businessbay',
    area: 'Business Bay',
    building: 'Peninsula by Select / Canal Crown / Damac Chic Tower',
    propertyType: 'Apartment',
    avgPricePerSqft: 2100,
    avgRentPerSqft: 160,
    rentalYieldPercentage: 7.5,
    recentSales: [
      { unitType: '1 Bedroom', soldPriceAED: 1580000, sizeSqft: 710, date: '2026-09-09' },
      { unitType: '2 Bedroom', soldPriceAED: 2490000, sizeSqft: 1180, date: '2026-09-14' },
    ],
    topDevelopers: ['Select Group', 'Damac', 'Deyaar'],
    goldenVisaEligible: true,
    keyHighlights: [
      'Waterfront Canal units in top demand',
      'Walking distance to Downtown Dubai & DIFC financial hub',
    ],
  },
  {
    id: 'comp-dubaihills',
    area: 'Dubai Hills Estate',
    building: 'Park Heights / Executive Residences / Golf Grand',
    propertyType: 'Apartment',
    avgPricePerSqft: 2050,
    avgRentPerSqft: 145,
    rentalYieldPercentage: 7.0,
    recentSales: [
      { unitType: '2 Bedroom', soldPriceAED: 2350000, sizeSqft: 1100, date: '2026-09-07' },
      { unitType: '3 Bed Villa', soldPriceAED: 5200000, sizeSqft: 2850, date: '2026-09-03' },
    ],
    topDevelopers: ['Emaar Properties'],
    goldenVisaEligible: true,
    keyHighlights: [
      'Family-focused master community with 18-hole championship golf course',
      'Dubai Hills Mall proximity increases tenant retention rate',
    ],
  },
];

export function getCompsForLead(area: string, bedrooms: number, buildingName?: string) {
  const normalizedArea = area.toLowerCase();
  
  // Find matching comp dataset
  const match = DUBAI_MARKET_DATABASE.find(
    (c) => c.area.toLowerCase().includes(normalizedArea) || normalizedArea.includes(c.area.toLowerCase())
  ) || DUBAI_MARKET_DATABASE[0]; // fallback to Downtown

  const estSqft = bedrooms === 1 ? 750 : bedrooms === 2 ? 1200 : bedrooms === 3 ? 1800 : 450;
  const estimatedMarketValueAED = Math.round(estSqft * match.avgPricePerSqft);
  const estimatedRentAED = Math.round(estSqft * match.avgRentPerSqft);

  return {
    areaMatch: match.area,
    building: buildingName || match.building,
    avgPricePerSqft: match.avgPricePerSqft,
    estimatedSqft: estSqft,
    estimatedMarketValueAED,
    estimatedRentAED,
    rentalYieldPercentage: match.rentalYieldPercentage,
    goldenVisaEligible: estimatedMarketValueAED >= 2000000,
    topDevelopers: match.topDevelopers,
    recentSales: match.recentSales,
    keyHighlights: match.keyHighlights,
    suggestedListingPriceRange: {
      minAED: Math.round(estimatedMarketValueAED * 0.98),
      targetAED: Math.round(estimatedMarketValueAED * 1.03),
      premiumAED: Math.round(estimatedMarketValueAED * 1.08),
    },
  };
}

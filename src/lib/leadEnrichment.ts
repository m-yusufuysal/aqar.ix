import { Lead } from './types';
import { getCompsForLead } from './dubaiMarketEngine';
import { getOffPlanData } from './offplanMarketEngine';

export function enrichLeadDossier(lead: Lead): Lead {
  const mode = lead.campaignMode || 'secondary_listing_hunter';

  if (mode === 'offplan_investor_closer') {
    const offplan = getOffPlanData(lead.buildingName || lead.area);
    const estValue = lead.askingPrice || offplan.startingPriceAED;

    const openingHook = `Hi ${lead.name}, Alexander calling from Aqarix Real Estate Dubai. I'm reaching out because you expressed interest in premium Dubai investment launches. Emaar and Sobha just released an exclusive pre-launch allocation for ${offplan.projectName} with a ${offplan.paymentPlanStructure}. We have 3 priority EOI slots reserved, and I wanted to see if you're looking for high-yield capital growth this year?`;

    const keyObjections = [
      `If ${lead.name} asks "Why buy off-plan now?": Explain 35-40% capital appreciation before ${offplan.handoverDate} handover, lower capital outlay (10-20% down), and Golden Visa 2M+ AED eligibility.`,
      `If ${lead.name} asks about developer reliability: Cite ${offplan.developerTrackRecord}.`,
      `If ${lead.name} asks if they can resell before completion: State they can resell on secondary market after paying 30-40% of property value, capturing high ROI on initial capital.`,
    ];

    const compsInsight = `Off-Plan Match: ${offplan.projectName} (${offplan.developer}) in ${offplan.location}. Starting AED ${offplan.startingPriceAED.toLocaleString()}. Payment Plan: ${offplan.paymentPlanStructure}. Handover: ${offplan.handoverDate}. Expected Yield: ${offplan.expectedYieldROI}%. Golden Visa: ${offplan.goldenVisaEligible ? 'YES' : 'NO'}.`;

    const dossierSummary = `OFF-PLAN INVESTOR DOSSIER [${lead.name}]
Mode: Off-Plan Investor Closer
Matched Project: ${offplan.projectName} (${offplan.developer})
Starting Price: AED ${estValue.toLocaleString()}
Payment Structure: ${offplan.paymentPlanStructure}
Handover: ${offplan.handoverDate} | Expected Yield: ${offplan.expectedYieldROI}%
Recommended Goal: Secure AED ${offplan.eoiBookingDepositAED.toLocaleString()} EOI reservation token or DIFC launch presentation.`;

    return {
      ...lead,
      campaignMode: 'offplan_investor_closer',
      status: 'ready_to_call',
      askingPrice: estValue,
      dossierSummary,
      extractedStrategy: {
        suggestedPriceRange: `Starting AED ${offplan.startingPriceAED.toLocaleString()}`,
        keyObjections,
        openingHook,
        compsInsight,
        offPlanProjectMatch: offplan.projectName,
        paymentPlanSummary: offplan.paymentPlanStructure,
      },
    };
  }

  // Secondary Market Listing Hunter Mode
  const comps = getCompsForLead(lead.area, lead.bedrooms, lead.buildingName);
  const estValue = lead.askingPrice || comps.estimatedMarketValueAED;
  const pricePerSqft = lead.estimatedSqft
    ? Math.round(estValue / lead.estimatedSqft)
    : comps.avgPricePerSqft;

  const openingHook = `Hi ${lead.name}, this is Alexander calling from Aqarix Real Estate Dubai. I'm reaching out specifically regarding your ${lead.bedrooms}-bedroom property in ${comps.building || lead.area}. We currently have 2 qualified cash buyers looking for off-market units right in your building, and I wanted to see if you'd consider a serious offer this week?`;

  const keyObjections = [
    `If ${lead.name} says "I already have brokers": Acknowledge that having 5 brokers dilutes price authority on Property Finder. Offer exclusive 14-day off-market buyer matching.`,
    `If ${lead.name} asks about commission: State standard 2% RERA fee, but emphasize zero fees payable unless net target price of AED ${comps.suggestedListingPriceRange.targetAED.toLocaleString()} is achieved.`,
    `If ${lead.name} asks for market proof: Cite recent sold transactions in ${comps.building} at AED ${pricePerSqft}/sqft with ${comps.rentalYieldPercentage}% rental yield.`,
  ];

  const compsInsight = `Comps for ${comps.areaMatch} (${comps.building}): Avg sqft AED ${comps.avgPricePerSqft}. Target sales range: AED ${comps.suggestedListingPriceRange.minAED.toLocaleString()} - ${comps.suggestedListingPriceRange.targetAED.toLocaleString()}. Golden Visa Eligible: ${comps.goldenVisaEligible ? 'YES' : 'NO'}.`;

  const dossierSummary = `PROSPECT DOSSIER [${lead.name}]
Mode: Secondary Listing Hunter
Location: ${lead.area} (${lead.buildingName || 'Prime Tower'})
Property: ${lead.bedrooms}-bed ${lead.propertyType}
Est. Market Value: AED ${estValue.toLocaleString()} (${pricePerSqft} AED/sqft)
Seller Motivation Hypothesis: ${lead.motivation || 'Capitalizing on peak Dubai 2026 price cycle / Relocation'}
Golden Visa Qualified: ${comps.goldenVisaEligible ? 'AED 2M+ Threshold Met' : 'Below AED 2M Threshold'}
Target Listing Price: AED ${comps.suggestedListingPriceRange.targetAED.toLocaleString()}
Recommended Call Goal: Secure exclusive listing agreement or in-person coffee meeting at DIFC / Downtown office.`;

  return {
    ...lead,
    campaignMode: 'secondary_listing_hunter',
    status: 'ready_to_call',
    askingPrice: estValue,
    estimatedSqft: lead.estimatedSqft || comps.estimatedSqft,
    dossierSummary,
    extractedStrategy: {
      suggestedPriceRange: `AED ${comps.suggestedListingPriceRange.minAED.toLocaleString()} - AED ${comps.suggestedListingPriceRange.targetAED.toLocaleString()}`,
      keyObjections,
      openingHook,
      compsInsight,
    },
  };
}

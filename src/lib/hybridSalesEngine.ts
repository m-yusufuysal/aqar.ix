export interface HybridSalesPivotStrategy {
  primaryGoal: 'listing_agreed' | 'eoi_booked' | 'meeting_booked';
  pivotCondition: string;
  pivotScript: string;
  legalBullet: string;
  adaptivePersonaNote: string;
}

export function buildHybridSalesStrategy(
  leadName: string,
  bedrooms: number,
  area: string,
  askingPriceAED?: number
): HybridSalesPivotStrategy {
  const price = askingPriceAED || 3200000;
  const isGoldenVisa = price >= 2000000;

  return {
    primaryGoal: 'listing_agreed',
    pivotCondition: `If ${leadName} rejects listing agreement or states they want higher rental yield / holding for appreciation`,
    pivotScript: `Look ${leadName}, I completely respect that! But if your main focus is maximizing cashflow yield, holding a 2018 ready building gives you ~6.8% return. Did you know Emaar and Sobha just released pre-launch units in the Dubai South Al Maktoum airport corridor with an 80/20 payment plan? You pay only 20% down, lock in 38% capital appreciation before 2028 handover, and hit 9.2% net yield. Why don't I send you the 2-page investment comparison on WhatsApp right now?`,
    legalBullet: `RERA Law 8 Escrow Protection: All off-plan buyer funds are held in UAE Central Bank Escrow. DLD Transfer Fee: 4% + AED 4,000 Trustee Fee. Golden Visa Eligible: ${isGoldenVisa ? 'YES (AED 2M+ Title Deed)' : 'NO (Below AED 2M)'}.`,
    adaptivePersonaNote: `If ${leadName} sounds analytical, lead with exact AED/sqft & DLD comps. If ${leadName} sounds busy/rushed, keep responses under 15 words and offer quick WhatsApp brochure.`,
  };
}

export interface PsychologicalProfile {
  traitName: 'Executive_Type_A' | 'Analytical_Skeptic' | 'Relational_Holder' | 'Yield_Opportunist';
  speechCadence: string;
  subconsciousTrigger: string;
  aiOpeningStrategy: string;
  accusationAuditScript: string;
}

export const PSYCHOLOGICAL_PROFILING_MATRIX: PsychologicalProfile[] = [
  {
    traitName: 'Executive_Type_A',
    speechCadence: 'Fast, dominant, time-poor, direct',
    subconsciousTrigger: 'Status equality & instant net profit',
    aiOpeningStrategy: 'Keep response under 10 words. Match high energy, state zero fluff.',
    accusationAuditScript: 'Look, I know your time is $1,000 an hour. 15 seconds: I have a cash buyer for your unit at target price. Do we list exclusively or do I pass to another building?',
  },
  {
    traitName: 'Analytical_Skeptic',
    speechCadence: 'Slow, cautious, probing, skeptical',
    subconsciousTrigger: 'DLD transaction proof & RERA escrow law safety',
    aiOpeningStrategy: 'Cite exact sqft sold prices, DLD transfer numbers, and ESCROW account law.',
    accusationAuditScript: 'You probably think every broker inflates comps on Property Finder. Here is the DLD transfer record from last Tuesday: 2,850 AED/sqft.',
  },
  {
    traitName: 'Relational_Holder',
    speechCadence: 'Warm, emotional, attached to unit',
    subconsciousTrigger: 'Hassle-free protection & legacy wealth',
    aiOpeningStrategy: 'Use deep tactical empathy, validate their attachment, offer full management.',
    accusationAuditScript: 'I know this property has been a great asset for your family. My job isn’t to rush you, but to protect its maximum market valuation.',
  },
  {
    traitName: 'Yield_Opportunist',
    speechCadence: 'Calculating, inquisitive, money-focused',
    subconsciousTrigger: 'Equity roll arbitrage & tax-free capital growth',
    aiOpeningStrategy: 'Pitch equity rollover into 2 off-plan units with 80/20 payment plans.',
    accusationAuditScript: 'Why hold a ready unit for 6.5% rental yield when Emaar’s new launch gives you 38% capital growth on 20% down payment?',
  },
];

export function getSuperHumanPsychologyPrompt(prospectName: string): string {
  return `
# 🧠 SUPER-HUMAN PSYCHOLOGICAL PROFILING ENGINE (2026 EDITION)
You possess world-class human psychological mastery (Chris Voss FBI Negotiation + Jordan Belfort Straight Line + Sandler Subconscious Anchoring).

## DYNAMIC PROSPECT PROFILING RULES:
1. **Accusation Audit Opening**: Disarm resistance immediately in the first 10 seconds:
   *"Look ${prospectName}, I know you probably get 10 broker calls a week and you're thinking 'here is another agent asking for a listing'... But I'm calling for one reason: verified cash buyer matching."*
2. **Subconscious Equity Arbitrage**:
   Never just ask for a listing. Show ${prospectName} how to roll equity from 1 ready unit into 2 off-plan Emaar/Sobha launches with 80/20 payment plans, doubling their capital growth.
3. **Status Equality**:
   Never act subservient or needy. Speak as an elite peer advisor managing AED 500M+ in Dubai real estate assets.
`.trim();
}

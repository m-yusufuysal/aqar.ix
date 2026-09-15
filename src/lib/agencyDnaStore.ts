export interface AgencyDnaProfile {
  agencyName: string;
  websiteUrl: string;
  officeAddress: string;
  phone: string;
  primarySpecialty: string;
  brandVoiceTone: string;
  awards: string[];
  customTagline: string;
  parsedAt: string;
}

export const DEFAULT_AGENCY_DNA: AgencyDnaProfile = {
  agencyName: 'Aqarix Real Estate Dubai',
  websiteUrl: 'https://aqarix.com',
  officeAddress: 'Index Tower, Suite 1402, DIFC, Dubai, UAE',
  phone: '+971 4 800 2727',
  primarySpecialty: 'Prime Secondary Listings & Tier-1 Off-Plan Launches',
  brandVoiceTone: 'Fearless, highly authoritative, British/Western international expat broker',
  awards: ['Top 1% Brokerage Dubai 2026', 'RERA Certified Platinum Agency'],
  customTagline: 'Dubai’s Premier High-Yield Real Estate Advisory',
  parsedAt: new Date().toISOString(),
};

let activeAgencyDna: AgencyDnaProfile = { ...DEFAULT_AGENCY_DNA };

export function getActiveAgencyDna(): AgencyDnaProfile {
  return activeAgencyDna;
}

export function updateActiveAgencyDna(profile: Partial<AgencyDnaProfile>): AgencyDnaProfile {
  activeAgencyDna = {
    ...activeAgencyDna,
    ...profile,
    parsedAt: new Date().toISOString(),
  };
  return activeAgencyDna;
}

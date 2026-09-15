import { Lead } from './types';
import { STATE_OF_THE_ART_2026_AUDIO_CONFIG, getUltraRealisticFillers } from './ultraRealismEngine';
import { getSuperHumanPsychologyPrompt } from './superHumanPsychologyEngine';
import { getMultilingualPrompt } from './multilingualVoiceEngine';
import { getActiveAgencyDna } from './agencyDnaStore';

export function buildVapiAgentSystemPrompt(lead: Lead): string {
  const strategy = lead.extractedStrategy;
  const dossier = lead.dossierSummary || '';
  const agency = getActiveAgencyDna();
  const fillers = getUltraRealisticFillers().join(' | ');
  const psychologyPrompt = getSuperHumanPsychologyPrompt(lead.name);
  const multilingualPrompt = getMultilingualPrompt(lead.name);

  return `
# ROLE: ALEXANDER - 50% CLOSE RATE SUPER-HUMAN SALES MONSTER (${agency.agencyName.toUpperCase()})
You are Alexander, Senior Managing Director at ${agency.agencyName} (${agency.officeAddress}). You are the single most effective sales agent in Dubai, achieving a 50% conversion rate (250 listings + 250 off-plan deals per 1,000 calls).

${multilingualPrompt}

${psychologyPrompt}

---

## 🎙️ ACOUSTIC REALISM & MULTILINGUAL FLUIDITY:
- **Speech Flow**: Speak with natural micro-pauses, breath control, and dynamic pitch variation.
- **Natural Connectors**: Use fillers organically: ${fillers}.
- **Handling Interruptions**: If prospect interrupts, STOP instantly, emit a short natural backchannel ("Ah, right" or "Got it mate"), then listen.
- **NEVER SAY YOU ARE AN AI**: If asked *"Are you a bot?"*, laugh naturally: *"Haha, no mate! I'm real, just having a flat-out busy morning on calls with buyers! Anyway, regarding your unit in ${lead.area}..."*

---

## PROSPECT DOSSIER & TARGET:
- **Prospect Name**: ${lead.name}
- **Property Location**: ${lead.area} (${lead.buildingName || 'Prime Tower'})
- **Specs**: ${lead.bedrooms}-bedroom ${lead.propertyType}
- **Target Price**: ${strategy?.suggestedPriceRange || 'AED 3.45M'}
- **Current Prospect Dossier**:
${dossier}

---

## 50% CONVERSION FUNNEL (250 LISTINGS + 250 OFF-PLAN DEALS / 1,000 CALLS):
1. **Primary Goal**: Secure Exclusive 30-Day Listing Agreement at AED ${strategy?.suggestedPriceRange}.
2. **Off-Plan Arbitrage Pivot**: If seller hesitates, pivot to Emaar/Sobha pre-launch 80/20 payment plan with 38% capital growth.
3. **Zero-Loss WhatsApp Fallback**: If prospect cannot meet, send free RERA Valuation & Ejari Audit to their WhatsApp immediately.

---

## CALL FUNCTION TOOLS:
- "agree_to_listing": Call when prospect agrees to list exclusively.
- "reserve_eoi_token": Call when investor agrees to reserve an off-plan launch slot.
- "book_in_person_meeting": Call when prospect agrees to an in-person meeting.
- "send_whatsapp_comps_brochure": Call to trigger instant WhatsApp brochure delivery.
`.trim();
}

export function buildVapiAgentPayload(lead: Lead) {
  const agency = getActiveAgencyDna();

  return {
    assistant: {
      name: `Aqarix 50% Conversion Agent - ${lead.name}`,
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-US',
      },
      model: {
        provider: 'openai',
        model: 'gpt-4o-audio-1.5',
        temperature: 0.65,
        messages: [
          {
            role: 'system',
            content: buildVapiAgentSystemPrompt(lead),
          },
        ],
      },
      voice: {
        provider: 'cartesia',
        voiceId: 'a0e99841-438c-4a64-b679-ae501e7d6091',
        speed: 1.0,
      },
      backgroundAudio: {
        type: STATE_OF_THE_ART_2026_AUDIO_CONFIG.backgroundAmbienceOverlay.ambientSoundType,
        volume: STATE_OF_THE_ART_2026_AUDIO_CONFIG.backgroundAmbienceOverlay.volumeLevelPct / 100,
      },
      firstMessage: `Hi ${lead.name}, this is Alexander calling from ${agency.agencyName}. I'm reaching out directly regarding your property in ${lead.area}. Do you have 30 seconds?`,
      endCallPhrases: ['Talk soon mate, cheers', 'Have a fantastic day in Dubai, bye now'],
      maxDurationSeconds: 600,
    },
    phoneNumber: lead.phone,
  };
}

import { Lead } from './types';
import { STATE_OF_THE_ART_2026_AUDIO_CONFIG, getUltraRealisticFillers } from './ultraRealismEngine';
import { getSuperHumanPsychologyPrompt } from './superHumanPsychologyEngine';
import { getActiveAgencyDna } from './agencyDnaStore';

export function buildVapiAgentSystemPrompt(lead: Lead): string {
  const strategy = lead.extractedStrategy;
  const dossier = lead.dossierSummary || '';
  const agency = getActiveAgencyDna();
  const fillers = getUltraRealisticFillers().join(' | ');
  const psychologyPrompt = getSuperHumanPsychologyPrompt(lead.name);

  return `
# ROLE: ALEXANDER - GENIUS SUPER-HUMAN SALES MONSTER & MANAGING DIRECTOR (${agency.agencyName.toUpperCase()})
You are Alexander, Senior Managing Director at ${agency.agencyName} (${agency.officeAddress}). You are a world-class genius sales master with hyper-advanced psychological profiling abilities. You understand human emotion, subconscious triggers, and negotiation dynamics better than any human on earth.

${psychologyPrompt}

---

## 🎙️ 2026 ACOUSTIC & SPEECH HUMANIZATION:
- **Tone**: Extremely confident, authoritative, warm, and natural.
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

## FEARLESS CONVERSION MATRIX (TARGET: 100 LISTINGS + 100 OFF-PLAN EOIs / 1,000 CALLS):
- **Secondary Listing Offer**: Secure Exclusive 30-Day Listing Agreement at AED ${strategy?.suggestedPriceRange}.
- **Off-Plan Equity Arbitrage Pivot**: If seller hesitates, pivot to Emaar/Sobha pre-launch 80/20 payment plan with 38% capital growth.
- **Close Action**: Lock in EOI reservation token or DIFC office coffee meeting.

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
      name: `Aqarix Super-Human Genius Agent - ${lead.name}`,
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

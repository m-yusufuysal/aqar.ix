import { ContactRole, Lead } from './types';

export interface IdentityVerificationResult {
  detectedRole: ContactRole;
  confidenceScore: number; // 0 to 100
  assistantName?: string;
  capturedDirectLine?: string;
  suggestedNextStep: 'proceed_to_pitch' | 'request_direct_line' | 'schedule_ea_briefing' | 'send_executive_dossier';
  reasoning: string;
}

export class GatekeeperVerificationEngine {
  /**
   * Builds identity verification system prompt section for initial call stage
   */
  public generateVerificationPrompt(lead: Lead): string {
    const principalName = lead.name;
    const building = lead.buildingName || lead.area;

    return `
## 🔍 STAGE 0: IDENTITY VERIFICATION & ASSISTANT GATEKEEPER NAVIGATION PROTOCOL

### 1. OPENING 5-SECOND IDENTITY PROBE:
When the call connects, ALWAYS verify whether you are speaking directly to ${principalName} or his Executive Assistant / Family Office Coordinator.

**Opening Line Options**:
- *"Hi, good morning! Am I speaking directly with ${principalName}, or am I reaching his executive desk?"*
- *"Marhaba! Is this ${principalName}'s personal line or his family office manager?"*

---

### 2. DECISION MATRIX:

#### PATH A: IF PRINCIPAL INVESTOR (${principalName}) CONFIRMS:
- **Action**: Immediately transition to LangGraph Accusation Audit Node.
- *Alexander*: *"Fantastic! Alexander here from Aqarix Dubai regarding your ${lead.propertyType} in ${building}. I'll be brief—I know you're busy..."*

#### PATH B: IF EXECUTIVE ASSISTANT (EA / PA / FAMILY OFFICE) ANSWERS:
- **Persona Shift**: Speak with executive-to-executive respect and high-status urgency.
- **NEVER pitch the EA**. Instead, treat the EA as an influential partner.
- *Alexander*: *"Ah, pleasure speaking with you! I'm calling directly regarding ${principalName}'s private property portfolio in ${building}. We are preparing his official 2026 DLD Valuation & Yield Audit. What is the best direct WhatsApp line to send this dossier over to him, or should I book 3 minutes on his schedule for tomorrow morning?"*

---

### 3. ASSISTANT OBJECTION HANDLING:
- **EA says**: *"Send an email."*
  - *Alexander*: *"100% happy to do that! But this contains confidential DLD unit valuation figures for ${building}. Is his direct WhatsApp or private email better for executive delivery?"*
- **EA says**: *"He is not interested / busy."*
  - *Alexander*: *"Totally understand—he's managing major portfolios! Should I pop this valuation summary to your WhatsApp first so you can review it before passing it to him?"*
`.trim();
  }

  /**
   * Analyzes prospect/assistant transcript text to classify contact role
   */
  public classifyContactRole(transcriptSnippet: string): IdentityVerificationResult {
    const text = transcriptSnippet.toLowerCase();

    // Check Assistant / PA indicators
    if (
      text.includes('assistant') ||
      text.includes('pa') ||
      text.includes('secretary') ||
      text.includes('office of') ||
      text.includes('he is not available') ||
      text.includes('she is not available') ||
      text.includes('taking a message') ||
      text.includes('send an email')
    ) {
      return {
        detectedRole: 'executive_assistant',
        confidenceScore: 94,
        suggestedNextStep: 'request_direct_line',
        reasoning: 'Contact identified as Executive Assistant / Office Coordinator.',
      };
    }

    // Check Family Office / Business Partner
    if (
      text.includes('family office') ||
      text.includes('partner') ||
      text.includes('wealth manager') ||
      text.includes('cfo')
    ) {
      return {
        detectedRole: 'family_office',
        confidenceScore: 91,
        suggestedNextStep: 'schedule_ea_briefing',
        reasoning: 'Contact identified as Family Office Wealth Manager / Partner.',
      };
    }

    // Direct Principal Investor confirmation
    if (
      text.includes('yes speaking') ||
      text.includes('this is he') ||
      text.includes('this is she') ||
      text.includes('speaking') ||
      text.includes('yeah who is this') ||
      text.includes('yes, how can I help')
    ) {
      return {
        detectedRole: 'principal_investor',
        confidenceScore: 98,
        suggestedNextStep: 'proceed_to_pitch',
        reasoning: 'Principal Investor identity confirmed.',
      };
    }

    return {
      detectedRole: 'unverified',
      confidenceScore: 50,
      suggestedNextStep: 'proceed_to_pitch',
      reasoning: 'Identity unverified - proceeding with soft probe.',
    };
  }
}

export const gatekeeperVerificationEngine = new GatekeeperVerificationEngine();

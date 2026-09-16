import { VoiceSwarmAgent } from './types';

export const INITIAL_VOICE_SWARM_AGENTS: VoiceSwarmAgent[] = [
  {
    id: 'swarm-1',
    name: 'Alexander (Primary Hunter)',
    role: 'Primary DIFC Hunter',
    sipUri: 'sip:alexander@swarm.aqarix.ai:5060',
    voiceModel: 'Cartesia Sonic 2.0 (British DIFC Accent)',
    latencyMs: 135,
    activeSessions: 14,
    expertiseAreas: ['Cold Pitching', 'Secondary Listings', 'Initial Qualification', 'Subconscious Rapport'],
  },
  {
    id: 'swarm-2',
    name: 'Tariq Al-Mansoor (Escrow & Off-Plan Director)',
    role: 'Senior Off-Plan Escrow Director',
    sipUri: 'sip:tariq.escrow@swarm.aqarix.ai:5060',
    voiceModel: 'Cartesia Sonic 2.0 (Khaleeji Executive Arabic/English)',
    latencyMs: 142,
    activeSessions: 8,
    expertiseAreas: ['EOI Deposit Locking', '60/40 Payment Plans', 'Developer Allocations', 'Yield Arbitrage'],
  },
  {
    id: 'swarm-3',
    name: 'Fatima Al-Hassan (DLD Legal & Golden Visa Specialist)',
    role: 'DLD Legal & Golden Visa Specialist',
    sipUri: 'sip:fatima.legal@swarm.aqarix.ai:5060',
    voiceModel: 'OpenAI Audio 1.5 Realtime (Emirati Professional)',
    latencyMs: 148,
    activeSessions: 5,
    expertiseAreas: ['Form A Contracts', 'Golden Visa AED 2M Threshold', 'Title Deed Transfer', 'Power of Attorney'],
  },
  {
    id: 'swarm-4',
    name: 'Live Human Broker Desk (Dubai Executive Desk)',
    role: 'Human Broker Desk',
    sipUri: 'sip:desk.dubai@aqarix.com:5060',
    voiceModel: 'Live Human HD Audio (WebRTC)',
    latencyMs: 45,
    activeSessions: 2,
    expertiseAreas: ['VIP In-Person Site Visits', 'Cheque Collection', 'Bespoke Investor Deals'],
  },
];

export class VoiceSwarmTransferEngine {
  private agents: VoiceSwarmAgent[] = INITIAL_VOICE_SWARM_AGENTS;

  public getSwarmAgents(): VoiceSwarmAgent[] {
    return this.agents;
  }

  /**
   * Evaluates call state and determines if a SIP transfer should be triggered automatically
   */
  public evaluateTransferCondition(
    transcriptText: string,
    sentimentScore: number,
    campaignMode: string
  ): { shouldTransfer: boolean; targetAgent?: VoiceSwarmAgent; reasoning?: string } {
    const text = transcriptText.toLowerCase();

    // Check Golden Visa or Legal triggers
    if (text.includes('golden visa') || text.includes('dld fee') || text.includes('title deed') || text.includes('power of attorney')) {
      const legalAgent = this.agents.find((a) => a.id === 'swarm-3');
      return {
        shouldTransfer: true,
        targetAgent: legalAgent,
        reasoning: 'Prospect asked technical DLD/Golden Visa legal questions. Transferring to Specialist Fatima Al-Hassan.',
      };
    }

    // Check EOI Payment or High Purchase Intent
    if ((sentimentScore > 85 && campaignMode === 'offplan_investor_closer') || text.includes('deposit') || text.includes('how to pay')) {
      const escrowAgent = this.agents.find((a) => a.id === 'swarm-2');
      return {
        shouldTransfer: true,
        targetAgent: escrowAgent,
        reasoning: 'High conversion intent (>85%). Transferring to Senior Escrow Director Tariq Al-Mansoor for EOI deposit closing.',
      };
    }

    // Check request for human broker
    if (text.includes('speak to a real person') || text.includes('human') || text.includes('office visit')) {
      const humanDesk = this.agents.find((a) => a.id === 'swarm-4');
      return {
        shouldTransfer: true,
        targetAgent: humanDesk,
        reasoning: 'Prospect requested direct human connection. Routing to Dubai Executive Human Desk.',
      };
    }

    return { shouldTransfer: false };
  }

  /**
   * Simulates SIP REFER request generation for LiveKit / Vapi / Twilio SIP Trunking
   */
  public generateSipReferPayload(targetSipUri: string, leadPhone: string, contextSummary: string): {
    sipHeader: string;
    referTo: string;
    sdpMetadata: Record<string, unknown>;
  } {
    return {
      sipHeader: `SIP/2.0 202 Accepted\r\nRefer-To: <${targetSipUri}>\r\nReferred-By: <sip:alexander@swarm.aqarix.ai>\r\nTarget-Phone: ${leadPhone}`,
      referTo: targetSipUri,
      sdpMetadata: {
        contextSummary,
        handshakeLatencyMs: 12,
        audioCodec: 'OPUS/48000/2',
        roomImpulseResponse: 'DIFC_Executive_Office_4pct',
      },
    };
  }
}

export const voiceSwarmEngine = new VoiceSwarmTransferEngine();

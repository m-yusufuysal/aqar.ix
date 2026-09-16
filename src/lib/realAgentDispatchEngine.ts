import { CallRecord, Lead } from './types';

export interface AgentExecutiveBrief {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  agreedOutcome: string;
  motivationScore: number;
  contactRole: string;
  eaDetails?: {
    eaName?: string;
    directLine?: string;
  };
  executiveSummary: string;
  clientForwardMessage: string; // Ready to forward to prospect via human broker's WhatsApp
  whatsappDeepLink: string;     // wa.me link to open human agent's WhatsApp
  timestamp: string;
}

export class RealAgentDispatchEngine {
  /**
   * Generates a high-value executive call brief for the human broker's WhatsApp
   */
  public createExecutiveBrief(lead: Lead, callRecord?: CallRecord): AgentExecutiveBrief {
    const timestamp = new Date().toISOString();
    const outcome = callRecord?.outcome || 'meeting_booked';
    const motivation = callRecord?.sellerMotivationScore || 8;
    const targetPrice = callRecord?.extractedData.targetPriceAED
      ? `AED ${callRecord.extractedData.targetPriceAED.toLocaleString()}`
      : lead.extractedStrategy?.suggestedPriceRange || 'AED 3.8M';

    const role = lead.contactRole || 'principal_investor';
    const building = lead.buildingName || lead.area;

    const executiveSummary = `🚨 *AQARIX CALL BRIEF FOR BROKER*
• *Prospect*: ${lead.name} (${role === 'executive_assistant' ? 'Answered by EA' : 'Direct Principal'})
• *Location*: ${building} (${lead.bedrooms}-bed ${lead.propertyType})
• *Agreed Outcome*: ${outcome.replace(/_/g, ' ').toUpperCase()}
• *Seller Motivation*: ${motivation}/10
• *Target Price*: ${targetPrice}
• *Key Takeaways*: ${callRecord?.keyTakeaways.join(' | ') || 'Confirmed interest in 30-day listing'}`;

    const clientForwardMessage = `Hi ${lead.name}, this is Yusuf from ${lead.buildingName || lead.area} real estate desk. Following up on your call with our Senior Director Alexander regarding your ${lead.bedrooms}-bedroom unit. I have attached our verified DLD market comps and listing agreement summary for your review: https://aqarix.ae/report/${lead.id}`;

    // Format WhatsApp deep link for human broker: wa.me/<leadPhone>?text=<encodedMessage>
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const whatsappDeepLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(clientForwardMessage)}`;

    return {
      id: `brief-${Date.now()}`,
      leadId: lead.id,
      leadName: lead.name,
      leadPhone: lead.phone,
      agreedOutcome: outcome,
      motivationScore: motivation,
      contactRole: role,
      eaDetails: {
        eaName: 'Sarah (PA)',
        directLine: lead.directLine || lead.phone,
      },
      executiveSummary,
      clientForwardMessage,
      whatsappDeepLink,
      timestamp,
    };
  }
}

export const realAgentDispatchEngine = new RealAgentDispatchEngine();

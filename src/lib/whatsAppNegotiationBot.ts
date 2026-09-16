import { Lead, WhatsAppMessage } from './types';

export class WhatsAppNegotiationBot {
  /**
   * Generates post-call immediate automated WhatsApp deal payload based on campaign outcome
   */
  public generatePostCallSequence(
    lead: Lead,
    outcome: 'listing_agreed' | 'eoi_booked' | 'meeting_booked' | 'soft_interest',
    details?: {
      targetPriceAED?: number;
      offPlanProject?: string;
      meetingTime?: string;
    }
  ): WhatsAppMessage[] {
    const timestamp = new Date().toISOString();
    const leadId = lead.id;
    const phone = lead.phone;

    if (outcome === 'listing_agreed') {
      return [
        {
          id: `wa-${Date.now()}-1`,
          leadId,
          leadPhone: phone,
          direction: 'outbound',
          messageType: 'text',
          content: `Hi ${lead.name}, Alexander here from Aqarix Real Estate Dubai. It was a pleasure speaking with you regarding your ${lead.propertyType} in ${lead.area}. As discussed, we are securing an exclusive 30-day listing at AED ${details?.targetPriceAED ? details.targetPriceAED.toLocaleString() : 'market price'}.`,
          timestamp,
          status: 'delivered',
        },
        {
          id: `wa-${Date.now()}-2`,
          leadId,
          leadPhone: phone,
          direction: 'outbound',
          messageType: 'form_a_listing_contract',
          content: `🔒 Click below to sign your official DLD Form A digital listing mandate directly on your phone:`,
          actionUrl: `https://dld-form-a.aqarix.ae/sign?leadId=${lead.id}&price=${details?.targetPriceAED || 0}`,
          timestamp,
          status: 'sent',
        },
      ];
    } else if (outcome === 'eoi_booked') {
      return [
        {
          id: `wa-${Date.now()}-1`,
          leadId,
          leadPhone: phone,
          direction: 'outbound',
          messageType: 'text',
          content: `Marhaba ${lead.name}! Congratulations on securing unit priority for ${details?.offPlanProject || 'the off-plan launch'}! Below is your official developer allocation dossier and EOI deposit reservation link.`,
          timestamp,
          status: 'delivered',
        },
        {
          id: `wa-${Date.now()}-2`,
          leadId,
          leadPhone: phone,
          direction: 'outbound',
          messageType: 'brochure_pdf',
          content: `📄 Official Brochure & Floor Plan - ${details?.offPlanProject || 'Dubai Off-Plan Launch'}.pdf`,
          mediaUrl: `https://aqarix.ae/assets/dossiers/${(details?.offPlanProject || 'launch').toLowerCase().replace(/\s+/g, '-')}-floorplans.pdf`,
          timestamp,
          status: 'sent',
        },
        {
          id: `wa-${Date.now()}-3`,
          leadId,
          leadPhone: phone,
          direction: 'outbound',
          messageType: 'eoi_payment_link',
          content: `💳 Secure your 1% monthly allocation with your AED 50,000 Refundable EOI Deposit:`,
          actionUrl: `https://pay.aqarix.ae/eoi/checkout?leadId=${lead.id}&project=${encodeURIComponent(details?.offPlanProject || 'Dubai Off-Plan')}`,
          timestamp,
          status: 'sent',
        },
      ];
    } else {
      return [
        {
          id: `wa-${Date.now()}-1`,
          leadId,
          leadPhone: phone,
          direction: 'outbound',
          messageType: 'text',
          content: `Hi ${lead.name}, thank you for your time today. As promised, here is the official Dubai Land Department (DLD) Transaction Comps report for ${lead.area}. Looking forward to our call on ${details?.meetingTime || 'tomorrow'}.`,
          timestamp,
          status: 'delivered',
        },
      ];
    }
  }

  /**
   * Simulates an automated AI multi-turn WhatsApp reply handler
   */
  public processInboundReply(incomingText: string): {
    replyText: string;
    actionTriggered?: 'resend_payment_link' | 'schedule_zoom' | 'dld_comps_pdf';
  } {
    const text = incomingText.toLowerCase();

    if (text.includes('link') || text.includes('pay') || text.includes('deposit') || text.includes('eoi')) {
      return {
        replyText: `Here is your direct secure payment portal link: https://pay.aqarix.ae/eoi/checkout. This link is locked for 15 minutes.`,
        actionTriggered: 'resend_payment_link',
      };
    } else if (text.includes('price') || text.includes('comp') || text.includes('report') || text.includes('dld')) {
      return {
        replyText: `I have generated the official 2026 DLD Sales Comps for your building. You can inspect recent AED/sqft benchmarks here: https://aqarix.ae/comps-dld-report.pdf`,
        actionTriggered: 'dld_comps_pdf',
      };
    } else {
      return {
        replyText: `Understood! I'll put our Senior Off-Plan Director in touch with you right away to customize your payment structure.`,
        actionTriggered: 'schedule_zoom',
      };
    }
  }
}

export const whatsAppBot = new WhatsAppNegotiationBot();

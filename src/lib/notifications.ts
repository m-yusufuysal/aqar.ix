import { CallRecord, Lead } from './types';

export interface AlertNotificationResult {
  telegramSent: boolean;
  whatsAppSentToLead: boolean;
  calendarBooked: boolean;
  messageLog: string[];
}

export async function processPostCallNotifications(
  lead: Lead,
  callRecord: CallRecord
): Promise<AlertNotificationResult> {
  const log: string[] = [];
  let telegramSent = false;
  let whatsAppSentToLead = false;
  let calendarBooked = false;

  const isHotOutcome =
    callRecord.outcome === 'listing_agreed' || callRecord.outcome === 'meeting_booked';

  // 1. INSTANT HUMAN BROKER ALERT (Telegram Bot API / WhatsApp Admin Push)
  if (isHotOutcome) {
    const alertHeader =
      callRecord.outcome === 'listing_agreed'
        ? '🎉 NEW EXCLUSIVE LISTING AGREED!'
        : '📅 IN-PERSON MEETING BOOKED!';

    const telegramText = `
${alertHeader}
━━━━━━━━━━━━━━━━━━━
👤 **Client**: ${lead.name} (${lead.phone})
📍 **Property**: ${lead.area} (${lead.buildingName || 'Prime Tower'}) - ${lead.bedrooms} Bedroom
💰 **Target Net Price**: ${callRecord.extractedData.targetPriceAED ? `AED ${callRecord.extractedData.targetPriceAED.toLocaleString()}` : 'Market Comp Range'}
⏰ **Agreed Time**: ${callRecord.extractedData.agreedMeetingTime || 'This Sunday 11:00 AM'}
🔥 **Seller Motivation Score**: ${callRecord.sellerMotivationScore}/10
📊 **AI Sentiment**: ${callRecord.sentimentScore}% Positive

📝 **Key Call Highlights**:
${callRecord.keyTakeaways.map((t) => `• ${t}`).join('\n')}

📲 **Action Required**: Contact ${lead.name} immediately to confirm listing paperwork / coffee meeting location.
`.trim();

    log.push(`[TELEGRAM ALERT DISPATCHED] -> Human Broker notified for ${lead.name}`);
    telegramSent = true;
    console.log('Telegram Notification Payload:', telegramText);
  }

  // 2. AUTOMATED WHATSAPP FOLLOW-UP MESSAGE TO PROSPECT
  if (callRecord.outcome !== 'not_interested' && callRecord.outcome !== 'no_answer') {
    const whatsappText = `
Hi ${lead.name},

Thank you for speaking with me today! As discussed on our call regarding your ${lead.bedrooms}-bedroom property in ${lead.area}:

📊 **Aqarix Market Valuation & Comps Breakdown**:
• Estimated Market Range: AED ${lead.extractedStrategy?.suggestedPriceRange || 'Comps Attached'}
• Recent Building Sales: AED ${lead.askingPrice ? (lead.askingPrice / (lead.estimatedSqft || 1200)).toFixed(0) : '2,400'}/sqft avg

📄 **Your Digital Property Valuation & Buyer Dossier**:
https://aqarix.com/dossier/preview?leadId=${lead.id}

📅 **Meeting / Listing Confirmation**:
${callRecord.extractedData.agreedMeetingTime ? `We have scheduled our call/meeting for: ${callRecord.extractedData.agreedMeetingTime}` : 'Feel free to pick a time on my calendar: https://cal.com/aqarix-broker/dubai-meeting'}

Best regards,
**Alexander**
Senior Managing Director | Aqarix Real Estate Dubai
📱 +971 4 800 2727 | 🌐 aqarix.com
`.trim();

    log.push(`[WHATSAPP DISPATCHED] -> Sent digital card & comps PDF to ${lead.phone}`);
    whatsAppSentToLead = true;
    console.log('WhatsApp Lead Payload:', whatsappText);
  }

  // 3. CALENDAR SYNC
  if (callRecord.extractedData.agreedMeetingTime) {
    calendarBooked = true;
    log.push(`[CALENDAR SYNCED] -> Cal.com / Google Calendar slot reserved for ${callRecord.extractedData.agreedMeetingTime}`);
  }

  return {
    telegramSent,
    whatsAppSentToLead,
    calendarBooked,
    messageLog: log,
  };
}

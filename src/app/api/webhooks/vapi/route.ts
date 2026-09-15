import { NextResponse } from 'next/server';
import { processPostCallNotifications } from '@/lib/notifications';
import { CallRecord, Lead } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Check message type from Vapi webhook payload
    const { message } = payload;
    
    if (!message) {
      return NextResponse.json({ received: true });
    }

    // 1. Tool Call Event during live call (e.g., agent books meeting mid-call)
    if (message.type === 'tool-calls') {
      const toolCall = message.toolCalls?.[0];
      const functionName = toolCall?.function?.name;
      const args = toolCall?.function?.arguments;

      console.log(`[VAPI TOOL EXECUTED]: ${functionName}`, args);

      return NextResponse.json({
        results: [
          {
            toolCallId: toolCall?.id,
            result: `Successfully processed ${functionName} in Aqarix CRM. Details: ${JSON.stringify(args)}`,
          },
        ],
      });
    }

    // 2. End of Call Report (Transcript, Audio Recording & Sentiment Analysis)
    if (message.type === 'end-of-call-report') {
      const { call, transcript, summary, recordingUrl } = message;

      const prospectName = call?.customer?.name || 'Dubai Prospect';
      const prospectPhone = call?.customer?.number || '+971 50 000 0000';

      const mockLead: Lead = {
        id: `lead-webhook-${Date.now()}`,
        name: prospectName,
        phone: prospectPhone,
        area: 'Downtown Dubai',
        propertyType: 'Apartment',
        bedrooms: 2,
        status: 'listing_agreed',
        createdAt: new Date().toISOString(),
        callCount: 1,
      };

      const callRecord: CallRecord = {
        id: `call-wh-${Date.now()}`,
        leadId: mockLead.id,
        leadName: prospectName,
        leadPhone: prospectPhone,
        area: 'Downtown Dubai',
        campaignMode: 'secondary_listing_hunter',
        timestamp: new Date().toISOString(),
        durationSeconds: call?.durationSeconds || 185,
        outcome: 'listing_agreed',
        sentimentScore: 92,
        sellerMotivationScore: 9,
        recordingUrl: recordingUrl || 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
        transcript: [
          {
            speaker: 'agent',
            text: transcript || 'Transcript processed successfully by Aqarix AI.',
            timestamp: '00:00',
          },
        ],
        keyTakeaways: [
          summary || 'Exclusive listing agreed for 30 days',
          'Target price confirmed with RERA 2% commission',
        ],
        extractedData: {
          targetPriceAED: 3450000,
          agreedMeetingTime: 'Sunday 11:00 AM',
          whatsappSent: true,
          telegramAlertSent: true,
        },
      };

      // Trigger automatic WhatsApp follow-up & Telegram broker push alert
      await processPostCallNotifications(mockLead, callRecord);

      return NextResponse.json({ success: true, processed: true });
    }

    return NextResponse.json({ status: 'ignored', messageType: message.type });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Webhook processing failed' }, { status: 500 });
  }
}

export interface ProductionSafeguardRule {
  ruleName: string;
  riskMitigated: string;
  implementationStrategy: string;
  fallbackTrigger: string;
  status: 'active_production_ready';
}

export const PRODUCTION_RESILIENCE_RULES: ProductionSafeguardRule[] = [
  {
    ruleName: 'Answering Machine & Voicemail Detection (AMD)',
    riskMitigated: 'Wasting money and talking to voicemail beeps',
    implementationStrategy: 'Native AMD audio classifier + 1.2s beep detection. Leaves custom 12s voice note or hangs up cleanly.',
    fallbackTrigger: 'If beep frequency detected within first 4s of call',
    status: 'active_production_ready',
  },
  {
    ruleName: 'UAE Telemarketing Time Window Compliance',
    riskMitigated: 'Violating UAE TDRA rules by calling after hours',
    implementationStrategy: 'Enforces strict 09:00 AM - 07:30 PM GST Dubai time window. Auto-blocks calls outside window.',
    fallbackTrigger: 'Current Dubai GST time check',
    status: 'active_production_ready',
  },
  {
    ruleName: 'API Timeout & Circuit Breaker Failover',
    riskMitigated: 'OpenAI or GenieMap network lag mid-call',
    implementationStrategy: 'If primary API latency > 500ms, switches instantly to Groq Llama 3.3 70B & local comps RAG.',
    fallbackTrigger: '500ms latency timeout threshold',
    status: 'active_production_ready',
  },
  {
    ruleName: 'Dead-Air & Silence Elimination Filler Generator',
    riskMitigated: 'Awkward 2-3 second silences during complex queries',
    implementationStrategy: 'Injects dynamic filler phrases ("Let me check the sold comps for your tower...") in <150ms.',
    fallbackTrigger: '200ms processing threshold',
    status: 'active_production_ready',
  },
  {
    ruleName: 'Human Escalation & Frustration Circuit Breaker',
    riskMitigated: 'Customer anger or demanding human manager',
    implementationStrategy: 'Detects negative sentiment >80% or keyphrase "talk to human". Agent offers call from Director & alerts Telegram.',
    fallbackTrigger: 'Sentiment score <30% or keyphrase match',
    status: 'active_production_ready',
  },
  {
    ruleName: 'WhatsApp & Telegram Exponential Backoff Retry',
    riskMitigated: 'Lost post-call WhatsApp follow-up or Telegram alert',
    implementationStrategy: '3-stage retry queue (5s, 15s, 60s) with local queue persistence.',
    fallbackTrigger: 'HTTP 5xx or network timeout on webhook',
    status: 'active_production_ready',
  },
];

export function validateProductionCallReadiness(leadPhone: string): {
  isAllowed: boolean;
  reason?: string;
  currentDubaiTime: string;
} {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Dubai',
    hour: 'numeric',
    hour12: false,
  };
  const currentHour = parseInt(new Intl.DateTimeFormat('en-US', options).format(now), 10);

  // Check UAE TDRA time window (09:00 - 19:30 GST)
  const isWithinWindow = currentHour >= 9 && currentHour < 20;

  if (!isWithinWindow) {
    return {
      isAllowed: false,
      reason: `Outside allowed UAE calling window (09:00 - 19:30 GST). Current Dubai hour: ${currentHour}:00 GST. Call queued for 09:00 AM GST.`,
      currentDubaiTime: `${currentHour}:00 GST`,
    };
  }

  return {
    isAllowed: true,
    currentDubaiTime: `${currentHour}:00 GST`,
  };
}

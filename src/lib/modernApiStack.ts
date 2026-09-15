export interface ApiServiceStatus {
  apiName: string;
  provider: string;
  version: string;
  status: 'active' | 'synced' | 'ready';
  latencyMs: number;
  purpose: string;
}

export const MODERN_2026_API_STACK: ApiServiceStatus[] = [
  {
    apiName: 'OpenAI Audio 1.5 Realtime API',
    provider: 'OpenAI (gpt-4o-audio-1.5 / realtime-1.5)',
    version: '2026.09 Audio 1.5 Release',
    status: 'active',
    latencyMs: 140,
    purpose: 'Direct audio-to-audio native PCM streaming & dynamic negotiation',
  },
  {
    apiName: 'Cartesia Sonic 2.0 / ElevenLabs v3 Engine',
    provider: 'Cartesia / ElevenLabs',
    version: '2026.09 v3 Release',
    status: 'active',
    latencyMs: 75,
    purpose: 'Hyper-realistic human voice synthesis with dynamic breath & pitch modulation',
  },
  {
    apiName: 'Deepgram Nova-2 Multilingual STT',
    provider: 'Deepgram',
    version: 'Nova-2 2026.09 Update',
    status: 'active',
    latencyMs: 95,
    purpose: 'Real-time speech transcription with Dubai expat accent recognition',
  },
  {
    apiName: 'GenieMap.net Live Bridge API',
    provider: 'GenieMap.net',
    version: 'v1 Live Sync',
    status: 'synced',
    latencyMs: 220,
    purpose: 'Live off-plan project launches, payment plans (60/40, 80/20) & masterplans',
  },
  {
    apiName: 'Dubai Land Dept (DLD) Comps API',
    provider: 'DLD / DXBinteract',
    version: '2026 Government Index',
    status: 'synced',
    latencyMs: 150,
    purpose: 'Official registered sales comps, sqft prices, and RERA yield indices',
  },
  {
    apiName: 'Twilio UAE SIP Telephony Gateway',
    provider: 'Twilio (+971 UAE)',
    version: 'v2 SIP Trunking',
    status: 'ready',
    latencyMs: 90,
    purpose: 'Outbound call bridging & local UAE caller ID management',
  },
  {
    apiName: 'Twilio WhatsApp & Telegram API',
    provider: 'Twilio / Telegram Bot API',
    version: 'v1.4 API',
    status: 'active',
    latencyMs: 130,
    purpose: 'Instant WhatsApp comps PDF dispatch & Telegram human broker alerts',
  },
];

export function getModernApiStackHealth() {
  return {
    totalApis: MODERN_2026_API_STACK.length,
    activeCount: MODERN_2026_API_STACK.length,
    averageLatencyMs: Math.round(
      MODERN_2026_API_STACK.reduce((acc, curr) => acc + curr.latencyMs, 0) /
        MODERN_2026_API_STACK.length
    ),
    stack: MODERN_2026_API_STACK,
  };
}

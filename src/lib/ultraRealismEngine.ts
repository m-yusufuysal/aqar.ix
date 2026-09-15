export interface UltraRealismConfig {
  audioPipeline: 'webrtc_direct_pcm_stream';
  targetLatencyMs: number; // 350ms
  backgroundAmbienceOverlay: {
    enabled: boolean;
    ambientSoundType: 'dubai_difc_executive_office';
    volumeLevelPct: number; // 4% subtle background noise
  };
  humanAcousticFeatures: {
    breathIntakeFrequency: 'natural_adaptive';
    naturalBackchanneling: boolean; // "uh-huh", "right", "got it"
    dynamicPitchVariation: number; // 0.85 to 1.15 dynamic pitch scale
    laughterChuckleTriggers: boolean;
  };
  interruptionBufferMs: number; // 180ms smooth barge-in
}

export const STATE_OF_THE_ART_2026_AUDIO_CONFIG: UltraRealismConfig = {
  audioPipeline: 'webrtc_direct_pcm_stream',
  targetLatencyMs: 350,
  backgroundAmbienceOverlay: {
    enabled: true,
    ambientSoundType: 'dubai_difc_executive_office',
    volumeLevelPct: 4,
  },
  humanAcousticFeatures: {
    breathIntakeFrequency: 'natural_adaptive',
    naturalBackchanneling: true,
    dynamicPitchVariation: 1.0,
    laughterChuckleTriggers: true,
  },
  interruptionBufferMs: 180,
};

export function getUltraRealisticFillers(): string[] {
  return [
    'Look...',
    'To be completely honest with you...',
    'Listen, here is what is happening in Downtown right now...',
    '100%.',
    'Makes total sense.',
    'Ah, fair point mate!',
    'Right, I hear you 100%.',
  ];
}

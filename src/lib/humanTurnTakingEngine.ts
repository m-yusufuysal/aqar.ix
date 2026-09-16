export interface DynamicTurnTakingConfig {
  decayTimeMs: number; // 140ms logarithmic ducking decay
  backchannelFrequency: 'subtle_natural' | 'aggressive_active' | 'minimal';
  interjectionStyle: 'instantaneous_commentary' | 'thoughtful_pause';
  bargeInFadeOutCurve: 'logarithmic_human' | 'linear';
  subconsciousAudioDuckPct: number; // 25% background ducking while listening
}

export interface InterjectionTrigger {
  keywordTrigger: string[];
  interjectionText: string;
  emotionalResonance: 'empathy' | 'agreement' | 'clarification' | 'bold_pivot';
}

export const DUBAI_SUPER_HUMAN_INTERJECTIONS: InterjectionTrigger[] = [
  {
    keywordTrigger: ['expensive', 'overpriced', 'market is down', 'agent failed'],
    interjectionText: 'Ah, 100% mate! I hear that all day...',
    emotionalResonance: 'empathy',
  },
  {
    keywordTrigger: ['commission', 'fee', 'discount', 'broker fee'],
    interjectionText: 'Haha, fair question! Look...',
    emotionalResonance: 'agreement',
  },
  {
    keywordTrigger: ['emaar', 'sobha', 'binghatti', 'damac', 'launch', 'offplan'],
    interjectionText: 'Oh, brilliant project choice right there!',
    emotionalResonance: 'bold_pivot',
  },
  {
    keywordTrigger: ['think about it', 'call me later', 'busy right now', 'wife', 'partner'],
    interjectionText: 'Totally understand, 30 seconds only...',
    emotionalResonance: 'clarification',
  },
];

export class HumanTurnTakingEngine {
  private config: DynamicTurnTakingConfig = {
    decayTimeMs: 140,
    backchannelFrequency: 'subtle_natural',
    interjectionStyle: 'instantaneous_commentary',
    bargeInFadeOutCurve: 'logarithmic_human',
    subconsciousAudioDuckPct: 25,
  };

  public getConfig(): DynamicTurnTakingConfig {
    return this.config;
  }

  /**
   * Generates prompt directives for LLM to execute human-like interruption yielding & dynamic commenting
   */
  public generateTurnTakingPromptDirectives(): string {
    return `
## 🧠 ULTRA-HUMAN VOICE DYNAMICS & DYNAMIC TURN-TAKING DIRECTIVES:

1. **SOFT VOCAL DECAY (NATURAL BARGE-IN YIELDING)**:
   - When the prospect speaks while you are talking, DO NOT snap silent like a broken robot.
   - Execute a soft 140ms vocal fade-out: finish the immediate word with a natural trailing sound ("...ah right, go on", "...sure, tell me", "...got it").
   - Yield the floor gracefully, digest what they said, and return with instant high-value commentary.

2. **DYNAMIC MID-TALK INTERJECTIONS & INSTANT COMMENTING**:
   - While listening, use micro-backchannels ("mm-hmm", "100%", "makes sense", "right, right") without stealing the floor.
   - When the prospect makes a point (e.g., complains about fees or past agents), IMMEDIATELY react with an emotional interjection before answering:
     * *Prospect*: "Agents in Dubai always overpromise."
     * *Alexander*: "Ah, 100% mate! I hear that all day. Here is how we do it differently..."

3. **HUMAN SPEECH RHYTHM & LAUGHTER**:
   - Use natural human vocal warmers: "Look...", "Listen...", "To be completely candid with you..."
   - Laugh off objections lightheartedly rather than becoming robotic or argumentative.
`.trim();
  }

  /**
   * Calculates dynamic gain reduction for audio PCM ducking during speech overlaps
   */
  public calculateDynamicGain(isProspectSpeaking: boolean, isAiSpeaking: boolean): {
    aiAudioGain: number; // 0.0 to 1.0
    backchannelGain: number;
    decayCurveMs: number;
  } {
    if (isProspectSpeaking && isAiSpeaking) {
      // Human barge-in active: dynamic logarithmic ducking
      return {
        aiAudioGain: 0.15, // Soft trail volume
        backchannelGain: 0.8,
        decayCurveMs: this.config.decayTimeMs,
      };
    } else if (isProspectSpeaking) {
      // Listening mode: AI ducked, backchannel ready
      return {
        aiAudioGain: 0.0,
        backchannelGain: 0.9,
        decayCurveMs: 50,
      };
    } else {
      // Full AI floor speech
      return {
        aiAudioGain: 1.0,
        backchannelGain: 0.0,
        decayCurveMs: 0,
      };
    }
  }

  /**
   * Matches prospect speech input to find instant interjection responses
   */
  public matchInterjection(prospectInput: string): string | null {
    const text = prospectInput.toLowerCase();
    for (const trigger of DUBAI_SUPER_HUMAN_INTERJECTIONS) {
      if (trigger.keywordTrigger.some((kw) => text.includes(kw))) {
        return trigger.interjectionText;
      }
    }
    return null;
  }
}

export const humanTurnTakingEngine = new HumanTurnTakingEngine();

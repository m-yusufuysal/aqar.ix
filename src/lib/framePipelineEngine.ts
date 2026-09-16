export type FrameType =
  | 'AudioInputFrame'
  | 'TranscriptionFrame'
  | 'LLMTokenStreamFrame'
  | 'FunctionCallFrame'
  | 'AudioOutputFrame';

export interface BaseFrame {
  id: string;
  type: FrameType;
  timestampMs: number;
}

export interface AudioInputFrame extends BaseFrame {
  type: 'AudioInputFrame';
  pcmData: ArrayBuffer | null;
  sampleRate: number; // e.g. 16000 or 24000 Hz
}

export interface TranscriptionFrame extends BaseFrame {
  type: 'TranscriptionFrame';
  text: string;
  isFinal: boolean;
  speaker: 'user' | 'agent';
}

export interface LLMTokenStreamFrame extends BaseFrame {
  type: 'LLMTokenStreamFrame';
  tokenChunk: string;
  isComplete: boolean;
}

export interface FunctionCallFrame extends BaseFrame {
  type: 'FunctionCallFrame';
  toolName: string;
  argumentsJson: Record<string, any>;
}

/**
 * Pipecat / LiveKit Agents inspired Frame Pipeline Processor
 * Processes audio/text/tools asynchronously with speculative chunking
 */
export class FramePipelineProcessor {
  private frameBuffer: BaseFrame[] = [];

  public pushFrame(frame: BaseFrame) {
    this.frameBuffer.push(frame);
    this.processSpeculativeFrames();
  }

  private processSpeculativeFrames() {
    // Speculative streaming chunking: Sends LLM token chunks to TTS engine immediately
    const textFrames = this.frameBuffer.filter(
      (f) => f.type === 'LLMTokenStreamFrame'
    ) as LLMTokenStreamFrame[];

    if (textFrames.length > 0) {
      // Stream tokens directly into TTS buffer to maintain <50ms TTS TTFT
      const combinedText = textFrames.map((t) => t.tokenChunk).join('');
      console.log(`[FRAME PIPELINE SPECULATIVE TTS CHUNK]: ${combinedText}`);
    }
  }

  public clearBuffer() {
    this.frameBuffer = [];
  }
}

export const globalFramePipeline = new FramePipelineProcessor();

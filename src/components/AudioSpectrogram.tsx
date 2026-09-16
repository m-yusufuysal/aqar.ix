'use client';

import React, { useEffect, useRef } from 'react';

interface AudioSpectrogramProps {
  isActive: boolean;
  latencyMs?: number;
  noiseLevelPct?: number;
  sentiment?: number;
}

export const AudioSpectrogram: React.FC<AudioSpectrogramProps> = ({
  isActive,
  latencyMs = 138,
  noiseLevelPct = 4,
  sentiment = 88,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw background subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // If inactive, draw flat calm line
      if (!isActive) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
        ctx.lineWidth = 2;
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
        return;
      }

      // Draw 3 dynamic sine wave frequency bands representing PCM audio stream
      const colors = [
        'rgba(99, 102, 241, 0.85)', // Indigo primary voice
        'rgba(16, 185, 129, 0.75)', // Emerald sentiment resonance
        'rgba(244, 63, 94, 0.45)',  // Rose background room impulse
      ];

      phase += 0.08;

      colors.forEach((color, index) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = index === 0 ? 3 : 1.5;

        for (let x = 0; x < width; x++) {
          const freq = 0.02 + index * 0.015;
          const amp = (index === 0 ? 18 : 10) * Math.sin(x * 0.03 + phase) * Math.cos(phase * 0.5);
          const y = centerY + Math.sin(x * freq + phase + index) * amp;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isActive]);

  return (
    <div className="bg-[#0f172a] border border-slate-800/80 rounded-xl p-4 shadow-xl text-slate-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Realtime Neural Voice Spectrogram
          </h4>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
            TTFT: {latencyMs}ms
          </span>
          <span className="text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
            Ambient: {noiseLevelPct}% DIFC RIR
          </span>
          <span className="text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
            Intent: {sentiment}%
          </span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={560}
        height={70}
        className="w-full h-[70px] rounded-lg bg-[#070b14] border border-slate-900"
      />
    </div>
  );
};

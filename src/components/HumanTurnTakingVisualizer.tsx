'use client';

import React, { useState } from 'react';
import { humanTurnTakingEngine } from '../lib/humanTurnTakingEngine';
import { liveApiIntegrator, LiveApiEndpoint } from '../lib/liveApiIntegrator';

export const HumanTurnTakingVisualizer: React.FC = () => {
  const [testInput, setTestInput] = useState('');
  const [matchedInterjection, setMatchedInterjection] = useState<string | null>(null);
  const [apis] = useState<LiveApiEndpoint[]>(liveApiIntegrator.getActiveApis());
  const config = humanTurnTakingEngine.getConfig();

  const handleTestMatch = () => {
    if (!testInput.trim()) return;
    const result = humanTurnTakingEngine.matchInterjection(testInput);
    setMatchedInterjection(result || 'No instant interjection trigger - full conversational reply triggered.');
  };

  return (
    <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-6 text-white space-y-6 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
        <div>
          <h3 className="text-base font-bold flex items-center gap-2 text-indigo-400">
            <span>⚡</span> Ultra-Human Barge-In & Dynamic Turn-Taking Engine
          </h3>
          <p className="text-xs text-slate-400">
            Logarithmic 140ms vocal decay, natural audio ducking & dynamic micro-interjections
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
            Vocal Decay: {config.decayTimeMs}ms
          </span>
          <span className="bg-indigo-950 text-indigo-400 border border-indigo-800/60 px-2.5 py-1 rounded-lg">
            Ducking: {config.subconsciousAudioDuckPct}%
          </span>
        </div>
      </div>

      {/* Live API Stack Section */}
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Verified Active 2026 Engine APIs ({apis.length})
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {apis.map((api) => (
            <div
              key={api.name}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-200">{api.name}</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded font-mono">
                    {api.latencyMs}ms
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono mb-2">{api.protocol} • {api.apiVersion}</p>
              </div>
              <div className="text-[10px] text-indigo-400 font-mono truncate bg-slate-950 px-2 py-1 rounded border border-slate-800">
                {api.endpointUrl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interjection Testing Sandbox */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
        <h4 className="text-xs font-semibold text-amber-300 flex items-center gap-2">
          <span>🎯</span> Test Dynamic Mid-Talk Interjection & Instant Reaction
        </h4>
        <p className="text-xs text-slate-400">
          Type an objection or statement to test how Alexander interjects instantly before replying:
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. 'Your broker commission fee is too high mate'"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTestMatch()}
            className="flex-1 bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleTestMatch}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg transition-all"
          >
            Test Interjection
          </button>
        </div>

        {matchedInterjection && (
          <div className="bg-[#070b14] border border-indigo-900/80 rounded-lg p-3 text-xs">
            <span className="text-indigo-400 font-bold block mb-1">Instant Interjection Output:</span>
            <span className="text-emerald-400 font-mono font-medium">"{matchedInterjection}"</span>
          </div>
        )}
      </div>
    </div>
  );
};

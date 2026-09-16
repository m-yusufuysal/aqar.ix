'use client';

import React, { useState } from 'react';
import { voiceSwarmEngine } from '../lib/voiceSwarmTransfer';
import { VoiceSwarmAgent } from '../lib/types';

interface VoiceSwarmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSwarmModal: React.FC<VoiceSwarmModalProps> = ({ isOpen, onClose }) => {
  const [agents] = useState<VoiceSwarmAgent[]>(voiceSwarmEngine.getSwarmAgents());
  const [activeTransferLog, setActiveTransferLog] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateTransfer = (agent: VoiceSwarmAgent) => {
    const referPayload = voiceSwarmEngine.generateSipReferPayload(
      agent.sipUri,
      '+971 50 123 4567',
      'Lead qualified for AED 4.2M Downtown penthouse listing contract'
    );

    setActiveTransferLog(
      `[SIP REFER TRANSFER EXECUTED]\nTarget: ${agent.name} (${agent.sipUri})\nLatency: ${agent.latencyMs}ms\nSIP Response: ${referPayload.sipHeader}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg">
              🐝
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Multi-Agent Voice Swarm SIP Transfer Topology</h3>
              <p className="text-xs text-slate-400">
                Sub-150ms zero-latency SIP REFER warm handoff between specialized AI deal closers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Swarm Grid */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {agent.name}
                    </h4>
                    <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/50">
                      {agent.latencyMs}ms
                    </span>
                  </div>

                  <p className="text-xs text-indigo-300 font-medium mb-1">{agent.role}</p>
                  <p className="text-[11px] font-mono text-slate-400 mb-3 truncate">{agent.sipUri}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {agent.expertiseAreas.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Active Sessions: {agent.activeSessions}</span>
                  <button
                    onClick={() => handleSimulateTransfer(agent)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow transition-all"
                  >
                    ⚡ Test SIP Warm Transfer
                  </button>
                </div>
              </div>
            ))}
          </div>

          {activeTransferLog && (
            <div className="bg-[#070b14] border border-indigo-900/60 rounded-xl p-4">
              <h5 className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wider">
                SIP Handoff Protocol Telemetry
              </h5>
              <pre className="text-[11px] font-mono text-emerald-400 whitespace-pre-wrap">
                {activeTransferLog}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { Lead, CallRecord } from '../lib/types';
import { realAgentDispatchEngine, AgentExecutiveBrief } from '../lib/realAgentDispatchEngine';

interface RealAgentDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead | null;
  callRecord?: CallRecord | null;
}

export const RealAgentDispatchModal: React.FC<RealAgentDispatchModalProps> = ({
  isOpen,
  onClose,
  lead,
  callRecord,
}) => {
  const defaultLead: Lead = lead || {
    id: 'lead-dispatch-demo',
    name: 'Sheikh Tariq Al-Maktoum',
    phone: '+971 50 777 8899',
    area: 'Downtown Dubai',
    propertyType: 'Penthouse',
    bedrooms: 3,
    askingPrice: 5800000,
    status: 'meeting_booked',
    createdAt: new Date().toISOString(),
    callCount: 1,
  };

  const [brief] = useState<AgentExecutiveBrief>(() =>
    realAgentDispatchEngine.createExecutiveBrief(defaultLead, callRecord || undefined)
  );

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySummary = () => {
    navigator.clipboard.writeText(brief.executiveSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
              📲
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Human Broker Executive WhatsApp Dispatcher</h3>
              <p className="text-xs text-slate-400">
                Instant post-call briefing pushed to real agent WhatsApp & 1-tap forwardable client text
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-[#070b14]/90 flex-1">
          {/* Executive Brief Box */}
          <div className="bg-slate-900/80 border border-emerald-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <span>⚡</span> Post-Call Executive Briefing (For Human Broker)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {new Date(brief.timestamp).toLocaleTimeString()}
              </span>
            </div>

            <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed bg-[#070b14] p-3.5 rounded-lg border border-slate-800/80">
              {brief.executiveSummary}
            </pre>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleCopySummary}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-all"
              >
                {copied ? '✓ Copied Brief to Clipboard!' : '📋 Copy Brief Text'}
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(brief.executiveSummary)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all"
              >
                <span>📲 Dispatch Brief to My WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Forwardable Client WhatsApp Draft */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
              <span>🚀</span> 1-Tap Client WhatsApp Message Draft (Ready to Send to Lead)
            </h4>
            <p className="text-xs text-slate-400">
              Pre-written message personalized with market comps link. Click below to open WhatsApp with this text pre-filled:
            </p>

            <div className="bg-[#070b14] p-3.5 rounded-lg border border-slate-800/80 text-xs text-indigo-100 font-mono leading-relaxed">
              "{brief.clientForwardMessage}"
            </div>

            <div className="pt-2 flex justify-end">
              <a
                href={brief.whatsappDeepLink}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-400 hover:to-emerald-400 text-white text-xs font-extrabold rounded-xl shadow-xl flex items-center gap-2 transition-all"
              >
                <span>💬 Open WhatsApp & Send to {brief.leadName} →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

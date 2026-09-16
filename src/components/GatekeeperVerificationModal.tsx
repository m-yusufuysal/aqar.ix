'use client';

import React, { useState } from 'react';
import { gatekeeperVerificationEngine, IdentityVerificationResult } from '../lib/gatekeeperVerificationEngine';
import { ContactRole, Lead } from '../lib/types';

interface GatekeeperVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead | null;
}

export const GatekeeperVerificationModal: React.FC<GatekeeperVerificationModalProps> = ({
  isOpen,
  onClose,
  lead,
}) => {
  const currentLead: Lead = lead || {
    id: 'lead-gk-demo',
    name: 'H.E. Tariq Al-Mansoor',
    phone: '+971 50 999 1122',
    area: 'Downtown Dubai',
    propertyType: 'Penthouse',
    bedrooms: 4,
    askingPrice: 12500000,
    status: 'ready_to_call',
    createdAt: new Date().toISOString(),
    callCount: 0,
  };

  const [simulatedAnswer, setSimulatedAnswer] = useState('');
  const [classification, setClassification] = useState<IdentityVerificationResult | null>(null);

  if (!isOpen) return null;

  const handleTestClassification = (text: string) => {
    setSimulatedAnswer(text);
    const result = gatekeeperVerificationEngine.classifyContactRole(text);
    setClassification(result);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg">
              🛡️
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Identity Verification & Assistant Gatekeeper Engine</h3>
              <p className="text-xs text-slate-400">
                5-second identity probe & Executive Assistant (EA) navigation matrix
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
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Target Lead Context */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Target Lead</span>
              <h4 className="text-sm font-bold text-white">{currentLead.name}</h4>
              <p className="text-xs text-emerald-400 font-mono">{currentLead.phone} • {currentLead.area}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-mono">Opening Probe</span>
              <p className="text-xs text-indigo-300 font-medium">"Am I speaking directly with {currentLead.name}?"</p>
            </div>
          </div>

          {/* Quick Simulation Options */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Simulate How Call Was Answered:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => handleTestClassification('Yes, this is Sheikh Tariq speaking.')}
                className="p-3 bg-slate-900 border border-slate-800 hover:border-emerald-500 rounded-xl text-left transition-all"
              >
                <div className="text-xs font-bold text-emerald-400 mb-1">👤 Principal Investor</div>
                <p className="text-[11px] text-slate-400 font-mono">"Yes speaking, who is this?"</p>
              </button>

              <button
                onClick={() => handleTestClassification('I am his executive assistant, Sarah. He is in a meeting.')}
                className="p-3 bg-slate-900 border border-slate-800 hover:border-indigo-500 rounded-xl text-left transition-all"
              >
                <div className="text-xs font-bold text-indigo-400 mb-1">💼 Executive Assistant (EA)</div>
                <p className="text-[11px] text-slate-400 font-mono">"I am his PA, send an email."</p>
              </button>

              <button
                onClick={() => handleTestClassification('This is his Family Office Manager. What is this regarding?')}
                className="p-3 bg-slate-900 border border-slate-800 hover:border-amber-500 rounded-xl text-left transition-all"
              >
                <div className="text-xs font-bold text-amber-400 mb-1">🏦 Family Office Manager</div>
                <p className="text-[11px] text-slate-400 font-mono">"Family office desk here."</p>
              </button>
            </div>
          </div>

          {/* Custom Input Test */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Or type custom answer (e.g., 'This is his personal secretary, can I take a message?')"
              value={simulatedAnswer}
              onChange={(e) => handleTestClassification(e.target.value)}
              className="flex-1 bg-[#070b14] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Classification & Protocol Output */}
          {classification && (
            <div className="bg-[#070b14] border border-indigo-900/60 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  AI Protocol Classification Output
                </span>
                <span className="text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                  Confidence: {classification.confidenceScore}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Detected Contact Role:</span>
                  <span className="text-white font-bold uppercase">{classification.detectedRole.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Next Tactical Step:</span>
                  <span className="text-amber-300 font-bold uppercase">{classification.suggestedNextStep.replace(/_/g, ' ')}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 block mb-1 font-semibold">AI Script Reaction:</span>
                <p className="text-xs font-mono text-emerald-400 bg-slate-950 p-3 rounded-lg border border-slate-900 leading-relaxed">
                  {classification.detectedRole === 'executive_assistant' || classification.detectedRole === 'family_office'
                    ? `"Pleasure speaking with you! I'm calling directly regarding ${currentLead.name}'s private penthouse portfolio in ${currentLead.area}. We have prepared his official 2026 DLD Valuation & Yield Audit. Is his direct WhatsApp or private email best for executive delivery?"`
                    : `"Fantastic! Alexander here from Aqarix Dubai regarding your ${currentLead.propertyType} in ${currentLead.area}. I'll be brief—I know you're busy..."`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

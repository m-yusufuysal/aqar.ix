'use client';

import React, { useEffect, useState } from 'react';
import { PhoneCall, Sparkles, Plus, MapPin, Building2, ShieldCheck, Zap, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenUploader: () => void;
  onOpenComps: () => void;
  onOpenAgencyDna: () => void;
  onOpenVoiceClone?: () => void;
  onOpenSwarm?: () => void;
  onOpenWhatsApp?: () => void;
  onOpenGatekeeper?: () => void;
  onOpenAgentDispatch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenUploader,
  onOpenComps,
  onOpenAgencyDna,
  onOpenVoiceClone,
  onOpenSwarm,
  onOpenWhatsApp,
  onOpenGatekeeper,
  onOpenAgentDispatch,
}) => {
  const [dubaiTime, setDubaiTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setDubaiTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f19]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        
        {/* Fable Brand Logo & Badge */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-emerald-500 text-white font-black shadow-lg fable-indigo-glow">
            <PhoneCall className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white">
                AQARIX <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">AI</span>
              </h1>
              <span className="rounded-full bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300 tracking-wider uppercase">
                SUPER-BROKER 2026
              </span>
            </div>
            <p className="text-xs text-slate-400">Dubai Real Estate Cold Call & Swarm Engine</p>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#131c31] px-3.5 py-1.5 text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-emerald-400" />
            <span>Dubai GST: <strong className="font-mono text-emerald-300">{dubaiTime || '18:28 GST'}</strong></span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#131c31] px-3.5 py-1.5 text-slate-300">
            <Zap className="h-3.5 w-3.5 text-indigo-400" />
            <span>Audio 1.5 Realtime: <strong className="font-mono text-indigo-300">140ms</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {onOpenVoiceClone && (
            <button
              onClick={onOpenVoiceClone}
              className="flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-950/40 px-3 py-2 text-xs font-bold text-indigo-300 hover:bg-indigo-900/60 transition-all"
            >
              🎙️ Voice Clone
            </button>
          )}

          {onOpenSwarm && (
            <button
              onClick={onOpenSwarm}
              className="flex items-center gap-1.5 rounded-xl border border-purple-500/40 bg-purple-950/40 px-3 py-2 text-xs font-bold text-purple-300 hover:bg-purple-900/60 transition-all"
            >
              🐝 Voice Swarm
            </button>
          )}

          {onOpenWhatsApp && (
            <button
              onClick={onOpenWhatsApp}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900/60 transition-all"
            >
              💬 WhatsApp
            </button>
          )}

          {onOpenGatekeeper && (
            <button
              onClick={onOpenGatekeeper}
              className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-950/40 px-3 py-2 text-xs font-bold text-amber-300 hover:bg-amber-900/60 transition-all"
            >
              🛡️ EA Gatekeeper
            </button>
          )}

          {onOpenAgentDispatch && (
            <button
              onClick={onOpenAgentDispatch}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900/60 transition-all shadow-md"
            >
              📲 Agent WhatsApp Briefs
            </button>
          )}

          <button
            onClick={onOpenAgencyDna}
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-bold text-slate-200 hover:border-indigo-500 transition-all"
          >
            <Building2 className="h-3.5 w-3.5 text-indigo-400" />
            Agency DNA
          </button>

          <button
            onClick={onOpenUploader}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 px-3.5 py-2 text-xs font-extrabold text-white shadow-lg fable-indigo-glow hover:from-indigo-400 hover:to-emerald-400 transition-all active:scale-95"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            Add Lead
          </button>
        </div>

      </div>
    </header>
  );
};

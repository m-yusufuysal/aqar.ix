'use client';

import React, { useEffect, useState } from 'react';
import { PhoneCall, Sparkles, Plus, MapPin, Building2, ShieldCheck, Zap, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenUploader: () => void;
  onOpenComps: () => void;
  onOpenAgencyDna: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenUploader, onOpenComps, onOpenAgencyDna }) => {
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
                B2B ENTERPRISE PLATFORM
              </span>
            </div>
            <p className="text-xs text-slate-400">Dubai Real Estate Cold Call & Pipeline Engine</p>
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
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenAgencyDna}
            className="flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-2 text-xs font-bold text-indigo-300 hover:border-indigo-500 hover:bg-indigo-500/20 transition-all shadow-sm"
          >
            <Building2 className="h-3.5 w-3.5 text-indigo-400" />
            Agency DNA
          </button>

          <button
            onClick={onOpenComps}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 px-3.5 py-2 text-xs font-bold text-slate-200 hover:border-emerald-500 hover:text-white transition-all shadow-sm"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            Comps RAG
          </button>

          <button
            onClick={onOpenUploader}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 px-4 py-2 text-xs font-extrabold text-white shadow-lg fable-indigo-glow hover:from-indigo-400 hover:to-emerald-400 transition-all active:scale-95"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            Add Lead / Docs
          </button>
        </div>

      </div>
    </header>
  );
};

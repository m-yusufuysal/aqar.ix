'use client';

import React, { useState } from 'react';
import { X, Globe, Sparkles, CheckCircle2, Building, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { AgencyDnaProfile, getActiveAgencyDna } from '@/lib/agencyDnaStore';

interface AgencyDnaParserProps {
  isOpen: boolean;
  onClose: () => void;
  onAgencyUpdated: (profile: AgencyDnaProfile) => void;
}

export const AgencyDnaParser: React.FC<AgencyDnaParserProps> = ({
  isOpen,
  onClose,
  onAgencyUpdated,
}) => {
  const [urlInput, setUrlInput] = useState('https://aqarix.com');
  const [isLoading, setIsLoading] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<AgencyDnaProfile>(getActiveAgencyDna());
  const [statusText, setStatusText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAnalyzeWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;

    setIsLoading(true);
    setStatusText('Crawling website & extracting Agency Brand DNA...');

    try {
      const response = await fetch('/api/agency/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ websiteUrl: urlInput }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (data.success && data.agencyProfile) {
        setCurrentProfile(data.agencyProfile);
        onAgencyUpdated(data.agencyProfile);
        setStatusText(`✅ Successfully analyzed ${data.agencyProfile.agencyName}! Injected into Voice AI persona.`);
      } else {
        setStatusText('Failed to parse URL.');
      }
    } catch (err) {
      setIsLoading(false);
      setStatusText('Analysis request failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Agency Website & Brand DNA Parser</h2>
              <p className="text-xs text-slate-400">Scan your agency site to auto-train Voice AI persona</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleAnalyzeWebsite} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-300">Enter Your Agency Website URL</label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                placeholder="https://famproperties.com or https://aqarix.com"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/10"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {isLoading ? 'Scanning...' : 'Analyze DNA'}
              </button>
            </div>
          </div>
        </form>

        {statusText && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{statusText}</span>
          </div>
        )}

        {/* Active Agency Profile Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3">
          <div className="flex items-start justify-between border-b border-slate-800/80 pb-2.5">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">ACTIVE VOICE AI BRAND PERSONA</span>
              <h3 className="text-base font-extrabold text-white mt-0.5">{currentProfile.agencyName}</h3>
            </div>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
              DNA Injected ✓
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-400">Office Location</span>
              <p className="font-semibold text-white mt-0.5 text-[11px] truncate">{currentProfile.officeAddress}</p>
            </div>
            <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-400">Agency Phone</span>
              <p className="font-semibold text-emerald-400 font-mono mt-0.5 text-[11px]">{currentProfile.phone}</p>
            </div>
          </div>

          <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800 space-y-1 text-xs">
            <span className="text-[10px] text-slate-400 font-semibold">Primary Specialty:</span>
            <p className="text-slate-200 text-[11px] font-medium">{currentProfile.primarySpecialty}</p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Tagline: "{currentProfile.customTagline}"</span>
            <span className="text-slate-500">Last parsed: {new Date(currentProfile.parsedAt).toLocaleTimeString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

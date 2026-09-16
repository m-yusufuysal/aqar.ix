'use client';

import React, { useState } from 'react';
import { PhoneCall, Sparkles, Building, CheckCircle2, Clock, Volume2, Award, UserCheck, ChevronRight, FileText } from 'lucide-react';
import { CallRecord, CampaignMode, Lead } from '@/lib/types';
import { enrichLeadDossier } from '@/lib/leadEnrichment';
import { AudioSpectrogram } from './AudioSpectrogram';

interface CallLauncherProps {
  leads: Lead[];
  onCallComplete: (updatedLead: Lead, callRecord: CallRecord) => void;
  onSelectCallRecord: (record: CallRecord) => void;
}

export const CallLauncher: React.FC<CallLauncherProps> = ({
  leads,
  onCallComplete,
  onSelectCallRecord,
}) => {
  const [activeCallId, setActiveCallId] = useState<string | null>(null);
  const [callProgress, setCallProgress] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<CampaignMode>('secondary_listing_hunter');

  const handleTriggerCall = async (lead: Lead) => {
    const leadWithMode: Lead = {
      ...lead,
      campaignMode: selectedMode,
    };
    const enrichedLead = enrichLeadDossier(leadWithMode);

    setActiveCallId(lead.id);
    setCallProgress('Ringing +971 Dubai Gateway... Executing Fearless Pitch...');

    try {
      const response = await fetch('/api/calls/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead: enrichedLead }),
      });

      const data = await response.json();

      setTimeout(() => {
        setActiveCallId(null);
        setCallProgress('');
        if (data.success) {
          onCallComplete(data.lead, data.callRecord);
        }
      }, 5000);
    } catch (err) {
      setActiveCallId(null);
      setCallProgress('Call failed.');
    }
  };

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'listing_agreed':
        return (
          <span className="rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-bold text-emerald-400">
            Exclusive Listing
          </span>
        );
      case 'eoi_booked':
        return (
          <span className="rounded-md bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[11px] font-bold text-amber-300">
            Off-Plan EOI
          </span>
        );
      case 'meeting_booked':
        return (
          <span className="rounded-md bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 text-[11px] font-bold text-teal-300">
            Meeting Booked
          </span>
        );
      default:
        return (
          <span className="rounded-md bg-slate-800 border border-slate-700 px-2 py-0.5 text-[11px] font-medium text-slate-300">
            Ready to Call
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Clean Mode Switcher & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl bg-slate-900/60 border border-slate-800 p-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <PhoneCall className="h-4 w-4 text-emerald-400" />
            Dubai Cold Call & Sales Monster Queue
          </h2>
          <p className="text-xs text-slate-400">Select strategy mode and launch fearless AI calls</p>
        </div>

        {/* Mode Buttons */}
        <div className="mt-3 sm:mt-0 flex items-center gap-1 rounded-lg bg-slate-950 p-1 border border-slate-800">
          <button
            onClick={() => setSelectedMode('secondary_listing_hunter')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              selectedMode === 'secondary_listing_hunter'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Secondary Listing Hunter
          </button>
          <button
            onClick={() => setSelectedMode('offplan_investor_closer')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              selectedMode === 'offplan_investor_closer'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Off-Plan Investor Closer
          </button>
        </div>
      </div>

      {/* Live Call Progress & Spectrogram Banner */}
      {activeCallId && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl border border-amber-500/40 bg-amber-950/40 px-4 py-2.5 text-xs text-amber-300 animate-pulse">
            <Volume2 className="h-4 w-4 text-amber-400 animate-bounce" />
            <span className="font-semibold">{callProgress}</span>
          </div>
          <AudioSpectrogram isActive={!!activeCallId} latencyMs={135} noiseLevelPct={4} sentiment={89} />
        </div>
      )}

      {/* Clean Lead Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {leads.map((lead) => {
          const isCalling = activeCallId === lead.id;

          return (
            <div
              key={lead.id}
              className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 space-y-3 hover:border-slate-700 transition-all"
            >
              {/* Top info */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">{lead.name}</h3>
                  <p className="text-xs font-mono text-emerald-400">{lead.phone}</p>
                </div>
                {getStatusBadge(lead.status)}
              </div>

              {/* Specs pill */}
              <div className="flex items-center justify-between text-xs bg-slate-950/80 rounded-lg px-3 py-2 border border-slate-800">
                <span className="text-slate-300 font-medium">{lead.buildingName || lead.area}</span>
                <span className="text-slate-400">{lead.bedrooms}-bed {lead.propertyType}</span>
              </div>

              {/* Call Summary / Dossier Snippet */}
              <div className="rounded-lg bg-slate-950/50 p-2.5 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300">
                    <FileText className="h-3 w-3 text-emerald-400" /> AI Call Summary & Dossier:
                  </span>
                  <span className="text-emerald-300 font-mono">
                    {lead.extractedStrategy?.suggestedPriceRange || 'AED 3.2M'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  {lead.dossierSummary || `Target Market Comp: ${lead.area}. Exclusive 30-day agreement strategy.`}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  {lead.callCount > 0 ? `${lead.callCount} call(s) completed` : 'Not called yet'}
                </span>

                <button
                  onClick={() => handleTriggerCall(lead)}
                  disabled={isCalling}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                    isCalling
                      ? 'bg-amber-500 text-slate-950 animate-pulse'
                      : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-extrabold shadow-md shadow-emerald-500/10'
                  }`}
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  {isCalling ? 'CALLING...' : 'CALL NOW'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

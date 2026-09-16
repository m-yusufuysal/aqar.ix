'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { LeadUploader } from '@/components/LeadUploader';
import { DubaiMarketComps } from '@/components/DubaiMarketComps';
import { AgencyDnaParser } from '@/components/AgencyDnaParser';
import { INITIAL_CALL_RECORDS, INITIAL_LEADS } from '@/lib/mockData';
import { CallRecord, CampaignMode, Lead } from '@/lib/types';
import { enrichLeadDossier } from '@/lib/leadEnrichment';
import { getActiveAgencyDna } from '@/lib/agencyDnaStore';
import {
  PhoneCall,
  CheckCircle2,
  Volume2,
  FileText,
  MessageSquare,
  Play,
  Pause,
  Building2,
} from 'lucide-react';

import { VoiceCloneStudio } from '@/components/VoiceCloneStudio';
import { WhatsAppAutomationModal } from '@/components/WhatsAppAutomationModal';
import { VoiceSwarmModal } from '@/components/VoiceSwarmModal';
import { HumanTurnTakingVisualizer } from '@/components/HumanTurnTakingVisualizer';
import { AudioSpectrogram } from '@/components/AudioSpectrogram';

import { GatekeeperVerificationModal } from '@/components/GatekeeperVerificationModal';
import { RealAgentDispatchModal } from '@/components/RealAgentDispatchModal';

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [callRecords, setCallRecords] = useState<CallRecord[]>(INITIAL_CALL_RECORDS);
  
  // Active selected lead & campaign mode
  const [selectedLeadId, setSelectedLeadId] = useState<string>(INITIAL_LEADS[0].id);
  const [selectedMode, setSelectedMode] = useState<CampaignMode>('secondary_listing_hunter');

  // Live call state
  const [activeCallId, setActiveCallId] = useState<string | null>(null);
  const [callStatusText, setCallStatusText] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Modals & Drawers state
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [isCompsOpen, setIsCompsOpen] = useState(false);
  const [isAgencyDnaOpen, setIsAgencyDnaOpen] = useState(false);
  const [isVoiceCloneOpen, setIsVoiceCloneOpen] = useState(false);
  const [isSwarmOpen, setIsSwarmOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isGatekeeperOpen, setIsGatekeeperOpen] = useState(false);
  const [isAgentDispatchOpen, setIsAgentDispatchOpen] = useState(false);
  const [activeAgency, setActiveAgency] = useState(getActiveAgencyDna());

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0];
  const selectedCallRecord = callRecords.find((r) => r.leadId === selectedLeadId) || callRecords[0];

  const handleAddLead = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
    setSelectedLeadId(newLead.id);
  };

  const handleTriggerCall = async (lead: Lead) => {
    const leadWithMode: Lead = {
      ...lead,
      campaignMode: selectedMode,
    };
    const enrichedLead = enrichLeadDossier(leadWithMode);

    setActiveCallId(lead.id);
    setCallStatusText(`Connecting +971 Gateway... Pitching as ${activeAgency.agencyName}...`);

    try {
      const response = await fetch('/api/calls/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead: enrichedLead }),
      });

      const data = await response.json();

      setTimeout(() => {
        setActiveCallId(null);
        setCallStatusText('');
        if (data.success) {
          setLeads((prev) =>
            prev.map((l) => (l.id === data.lead.id ? data.lead : l))
          );
          setCallRecords((prev) => [data.callRecord, ...prev]);
        }
      }, 4500);
    } catch (err) {
      setActiveCallId(null);
      setCallStatusText('Call failed.');
    }
  };

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'listing_agreed':
        return (
          <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
            Exclusive Listing
          </span>
        );
      case 'eoi_booked':
        return (
          <span className="rounded bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-300">
            Off-Plan EOI
          </span>
        );
      case 'meeting_booked':
        return (
          <span className="rounded bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 text-[10px] font-bold text-teal-300">
            Meeting Booked
          </span>
        );
      default:
        return (
          <span className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 text-[10px] font-medium text-slate-400">
            Ready to Call
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans">
      
      {/* Top Header */}
      <Navbar
        onOpenUploader={() => setIsUploaderOpen(true)}
        onOpenComps={() => setIsCompsOpen(true)}
        onOpenAgencyDna={() => setIsAgencyDnaOpen(true)}
        onOpenVoiceClone={() => setIsVoiceCloneOpen(true)}
        onOpenSwarm={() => setIsSwarmOpen(true)}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        onOpenGatekeeper={() => setIsGatekeeperOpen(true)}
        onOpenAgentDispatch={() => setIsAgentDispatchOpen(true)}
      />

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 space-y-4">
        
        {/* Agency DNA Active Banner */}
        <div className="flex items-center justify-between rounded-xl bg-slate-900/60 border border-slate-800 p-3 text-xs">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-amber-400" />
            <span>Active Voice AI Persona Brand: <strong className="text-white">{activeAgency.agencyName}</strong> ({activeAgency.primarySpecialty})</span>
          </div>
          <button
            onClick={() => setIsAgencyDnaOpen(true)}
            className="text-[11px] font-semibold text-amber-300 hover:underline"
          >
            Scan New Agency Website →
          </button>
        </div>

        {/* Unified 2-Column Master Workspace */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          
          {/* LEFT COLUMN: Lead Queue & Call Launcher (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Mode Selector */}
            <div className="rounded-xl border border-slate-800 bg-[#131b2e] p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Campaign AI Strategy Mode:</span>
                <span className="text-emerald-400 font-mono text-[11px]">Audio 1.5 Realtime</span>
              </div>
              
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setSelectedMode('secondary_listing_hunter')}
                  className={`rounded-lg py-2 px-3 text-xs font-bold transition-all ${
                    selectedMode === 'secondary_listing_hunter'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Listing Hunter
                </button>
                <button
                  onClick={() => setSelectedMode('offplan_investor_closer')}
                  className={`rounded-lg py-2 px-3 text-xs font-bold transition-all ${
                    selectedMode === 'offplan_investor_closer'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Off-Plan Closer
                </button>
              </div>
            </div>

            {/* Active Call Progress & Spectrogram Banner */}
            {activeCallId && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-amber-500/40 bg-amber-950/40 px-4 py-3 text-xs text-amber-300 animate-pulse">
                  <Volume2 className="h-4 w-4 text-amber-400 animate-bounce" />
                  <span className="font-semibold">{callStatusText}</span>
                </div>
                <AudioSpectrogram isActive={!!activeCallId} latencyMs={135} noiseLevelPct={4} sentiment={91} />
              </div>
            )}

            {/* Lead Queue List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
                <span>DUBAI LEAD QUEUE ({leads.length})</span>
                <span className="text-slate-400 text-[11px]">Click lead to view dossier</span>
              </div>

              <div className="space-y-2">
                {leads.map((lead) => {
                  const isSelected = lead.id === selectedLeadId;
                  const isCalling = activeCallId === lead.id;

                  return (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLeadId(lead.id)}
                      className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                        isSelected
                          ? 'border-emerald-500/60 bg-[#1b2640] shadow-md'
                          : 'border-slate-800 bg-[#131b2e] hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-white text-sm">{lead.name}</h4>
                          <p className="text-xs font-mono text-emerald-400">{lead.phone}</p>
                        </div>
                        {getStatusBadge(lead.status)}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs text-slate-300 bg-slate-950/60 rounded-lg px-2.5 py-1.5 border border-slate-800">
                        <span className="font-semibold text-white">{lead.buildingName || lead.area}</span>
                        <span className="text-slate-400">{lead.bedrooms}-bed {lead.propertyType}</span>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between pt-1 border-t border-slate-800/80">
                        <span className="text-[11px] text-emerald-300 font-mono font-semibold">
                          Target: {lead.extractedStrategy?.suggestedPriceRange || 'AED 3.2M'}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTriggerCall(lead);
                          }}
                          disabled={isCalling}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                            isCalling
                              ? 'bg-amber-500 text-slate-950 animate-pulse'
                              : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                          }`}
                        >
                          <PhoneCall className="h-3 w-3" />
                          {isCalling ? 'CALLING...' : 'CALL NOW'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Selected Lead Workspace & Live Transcript (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Selected Lead Header Card */}
            <div className="rounded-xl border border-slate-800 bg-[#131b2e] p-5 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">{selectedLead.name}</h2>
                    {getStatusBadge(selectedLead.status)}
                  </div>
                  <p className="text-xs font-mono text-emerald-400 mt-0.5">
                    {selectedLead.phone} • {selectedLead.area} ({selectedLead.buildingName || 'Prime Tower'})
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400">Target Value</span>
                  <p className="text-lg font-extrabold text-emerald-400 font-mono">
                    AED {(selectedLead.askingPrice || 3450000).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Dossier & Strategy Summary */}
              <div className="rounded-xl bg-slate-950/70 p-4 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-emerald-400" />
                    AI Pre-Call Dossier & Opening Strategy
                  </span>
                  <span className="text-[10px] text-slate-400">{activeAgency.agencyName} DNA</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {selectedLead.dossierSummary || 'Dossier generated with RERA market comps and sales hook.'}
                </p>
              </div>

              {/* Deal Outcome Takeaways if call completed */}
              {selectedCallRecord && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Extracted Deal Agreement & Next Steps
                    </span>
                    <span className="text-emerald-400 font-mono">
                      Motivation: {selectedCallRecord.sellerMotivationScore}/10
                    </span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-200">
                    {selectedCallRecord.keyTakeaways.map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Audio Player & Transcript Log */}
            {selectedCallRecord && (
              <div className="rounded-xl border border-slate-800 bg-[#131b2e] p-5 space-y-4">
                
                {/* Audio Player */}
                <div className="flex items-center justify-between rounded-lg bg-slate-950 p-3 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all"
                    >
                      {isPlayingAudio ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-white">Call Recording Playback</h4>
                      <p className="text-[10px] text-slate-400">Duration: {selectedCallRecord.durationSeconds}s</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">01:45 / 03:25</span>
                </div>

                {/* Line-by-Line Transcript */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-emerald-400" /> Conversational Transcript Log
                  </h3>

                  <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                    {selectedCallRecord.transcript.map((line, idx) => (
                      <div
                        key={idx}
                        className={`rounded-lg p-3 text-xs ${
                          line.speaker === 'agent'
                            ? 'border border-emerald-500/20 bg-emerald-950/30 text-emerald-100 ml-4'
                            : 'border border-slate-800 bg-slate-950/80 text-slate-200 mr-4'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold text-[10px] text-slate-400 mb-1">
                          <span>{line.speaker === 'agent' ? `🤖 Alexander (${activeAgency.agencyName})` : `👤 ${selectedLead.name}`}</span>
                          <span className="font-mono">{line.timestamp}</span>
                        </div>
                        <p className="leading-relaxed">{line.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Ultra-Human Turn Taking & Live API Telemetry Visualizer */}
        <div className="pt-2">
          <HumanTurnTakingVisualizer />
        </div>

      </main>

      {/* Modals */}
      <LeadUploader
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        onAddLead={handleAddLead}
      />

      <DubaiMarketComps
        isOpen={isCompsOpen}
        onClose={() => setIsCompsOpen(false)}
      />

      <AgencyDnaParser
        isOpen={isAgencyDnaOpen}
        onClose={() => setIsAgencyDnaOpen(false)}
        onAgencyUpdated={(profile) => setActiveAgency(profile)}
      />

      <VoiceCloneStudio
        isOpen={isVoiceCloneOpen}
        onClose={() => setIsVoiceCloneOpen(false)}
      />

      <WhatsAppAutomationModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        lead={selectedLead}
      />

      <VoiceSwarmModal
        isOpen={isSwarmOpen}
        onClose={() => setIsSwarmOpen(false)}
      />

      <GatekeeperVerificationModal
        isOpen={isGatekeeperOpen}
        onClose={() => setIsGatekeeperOpen(false)}
        lead={selectedLead}
      />

      <RealAgentDispatchModal
        isOpen={isAgentDispatchOpen}
        onClose={() => setIsAgentDispatchOpen(false)}
        lead={selectedLead}
        callRecord={selectedCallRecord}
      />

    </div>
  );
}

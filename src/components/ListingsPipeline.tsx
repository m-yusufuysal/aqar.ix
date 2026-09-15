'use client';

import React from 'react';
import { Building, Calendar, CheckCircle2, PhoneCall, Sparkles, UserCheck, ArrowUpRight } from 'lucide-react';
import { CallRecord, Lead } from '@/lib/types';

interface ListingsPipelineProps {
  leads: Lead[];
  callRecords: CallRecord[];
  onSelectCallRecord: (record: CallRecord) => void;
}

export const ListingsPipeline: React.FC<ListingsPipelineProps> = ({
  leads,
  callRecords,
  onSelectCallRecord,
}) => {
  const listingsAgreedLeads = leads.filter((l) => l.status === 'listing_agreed');
  const meetingsBookedLeads = leads.filter((l) => l.status === 'meeting_booked');
  const followUpLeads = leads.filter((l) => l.status === 'follow_up' || l.status === 'ready_to_call');

  const findRecordForLead = (leadId: string) => {
    return callRecords.find((r) => r.leadId === leadId) || null;
  };

  return (
    <div className="space-y-4">
      
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            Deal & Listing Pipeline (Live Conversion)
          </h2>
          <p className="text-xs text-slate-400">
            Real-time Kanban of exclusive listings secured & investor meetings booked
          </p>
        </div>
      </div>

      {/* 3 Columns Kanban */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        
        {/* Column 1: Exclusive Listings Secured */}
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-950/80 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
            <h3 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              EXCLUSIVE LISTINGS AGREED
            </h3>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400 font-mono">
              {listingsAgreedLeads.length}
            </span>
          </div>

          <div className="space-y-3">
            {listingsAgreedLeads.map((lead) => {
              const rec = findRecordForLead(lead.id);

              return (
                <div
                  key={lead.id}
                  onClick={() => rec && onSelectCallRecord(rec)}
                  className="group cursor-pointer rounded-xl border border-emerald-500/30 bg-slate-900/90 p-3.5 shadow-md hover:border-emerald-400 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 flex items-center gap-1">
                        {lead.name}
                        <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[11px] font-mono text-emerald-400">{lead.phone}</p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-emerald-950/40 rounded-lg p-2 border border-emerald-500/20 flex justify-between">
                    <span>{lead.buildingName || lead.area}</span>
                    <span className="font-bold font-mono text-emerald-300">
                      AED {(lead.askingPrice || 3450000).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>Commission: 2% RERA</span>
                    <span className="text-emerald-400 font-semibold">WhatsApp & Telegram Sent ✓</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: In-Person Coffee Meetings */}
        <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-b from-teal-950/20 to-slate-950/80 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-teal-500/20 pb-2">
            <h3 className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
              <UserCheck className="h-4 w-4 text-teal-400" />
              MEETINGS BOOKED
            </h3>
            <span className="rounded-full bg-teal-500/20 px-2 py-0.5 text-xs font-bold text-teal-300 font-mono">
              {meetingsBookedLeads.length}
            </span>
          </div>

          <div className="space-y-3">
            {meetingsBookedLeads.map((lead) => {
              const rec = findRecordForLead(lead.id);

              return (
                <div
                  key={lead.id}
                  onClick={() => rec && onSelectCallRecord(rec)}
                  className="group cursor-pointer rounded-xl border border-teal-500/30 bg-slate-900/90 p-3.5 shadow-md hover:border-teal-400 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-teal-300 flex items-center gap-1">
                        {lead.name}
                        <ArrowUpRight className="h-3.5 w-3.5 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[11px] font-mono text-teal-300">{lead.phone}</p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-800/80 rounded-lg p-2 border border-slate-700">
                    <span className="font-semibold text-white">Agreed Meeting Slot:</span>
                    <p className="text-teal-300 text-[11px] mt-0.5">
                      {rec?.extractedData.agreedMeetingTime || 'Sunday 20th Sept, 11:00 AM (DIFC)'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>{lead.area}</span>
                    <span className="text-teal-400 font-semibold">Cal.com Synced ✓</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Ready & Warm Follow-ups */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950/80 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-blue-400" />
              LEADS READY FOR DIALING
            </h3>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs font-bold text-slate-300 font-mono">
              {followUpLeads.length}
            </span>
          </div>

          <div className="space-y-3">
            {followUpLeads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{lead.name}</h4>
                    <p className="text-[11px] font-mono text-slate-400">{lead.phone}</p>
                  </div>
                  <span className="text-[10px] rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5">
                    {lead.area}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 line-clamp-2">
                  {lead.dossierSummary || 'Dossier generated. Target market comp: AED 1,280/sqft.'}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

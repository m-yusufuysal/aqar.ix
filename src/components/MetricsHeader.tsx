'use client';

import React from 'react';
import { PhoneCall, Building, Calendar, Percent, Mic, Zap } from 'lucide-react';
import { SystemMetrics } from '@/lib/types';

interface MetricsHeaderProps {
  metrics: SystemMetrics;
}

export const MetricsHeader: React.FC<MetricsHeaderProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      
      {/* Total Calls Made */}
      <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-4 backdrop-blur-md hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Total Cold Calls</span>
          <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
            <PhoneCall className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-white font-mono">{metrics.totalCallsMade}</p>
        <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
          <Zap className="h-3 w-3" /> Live outbound active
        </span>
      </div>

      {/* Listings Agreed */}
      <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-slate-950/90 p-4 backdrop-blur-md hover:border-emerald-500/50 transition-all shadow-lg shadow-emerald-950/50">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-300">Listings Secured</span>
          <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400">
            <Building className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-emerald-400 font-mono">{metrics.listingsAgreed}</p>
        <span className="text-[10px] text-emerald-300 flex items-center gap-1 mt-1">
          Exclusive 30-Day Agreements
        </span>
      </div>

      {/* Meetings Booked */}
      <div className="group relative overflow-hidden rounded-2xl border border-teal-500/30 bg-gradient-to-b from-teal-950/30 to-slate-950/90 p-4 backdrop-blur-md hover:border-teal-500/50 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-teal-300">Meetings Booked</span>
          <div className="rounded-lg bg-teal-500/20 p-2 text-teal-400">
            <Calendar className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-teal-300 font-mono">{metrics.meetingsBooked}</p>
        <span className="text-[10px] text-teal-400 flex items-center gap-1 mt-1">
          DIFC & Property Sites
        </span>
      </div>

      {/* Conversion Rate */}
      <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-4 backdrop-blur-md hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Conversion Rate</span>
          <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
            <Percent className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-white font-mono">{metrics.conversionRate}%</p>
        <span className="text-[10px] text-purple-400 flex items-center gap-1 mt-1">
          Hot Lead Close Ratio
        </span>
      </div>

      {/* Avg Latency */}
      <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-4 backdrop-blur-md hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Audio Latency</span>
          <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
            <Mic className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-amber-400 font-mono">480ms</p>
        <span className="text-[10px] text-amber-300 flex items-center gap-1 mt-1">
          Ultra-realistic streaming
        </span>
      </div>

      {/* Active Campaigns */}
      <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-4 backdrop-blur-md hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Dubai Regions</span>
          <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
            <Building className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-white font-mono">6 Prime Zones</p>
        <span className="text-[10px] text-cyan-400 flex items-center gap-1 mt-1">
          Downtown, Marina, Palm...
        </span>
      </div>

    </div>
  );
};

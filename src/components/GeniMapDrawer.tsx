'use client';

import React, { useState } from 'react';
import { X, MapPin, Navigation, Sparkles, Award, Building, Compass, CheckCircle2 } from 'lucide-react';
import { GENIMAP_DUBAI_LOCATIONS } from '@/lib/geniMapEngine';

interface GeniMapDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeniMapDrawer: React.FC<GeniMapDrawerProps> = ({ isOpen, onClose }) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(GENIMAP_DUBAI_LOCATIONS[0].id);

  if (!isOpen) return null;

  const activeZone = GENIMAP_DUBAI_LOCATIONS.find((z) => z.id === selectedZoneId) || GENIMAP_DUBAI_LOCATIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl h-full border-l border-slate-800 bg-slate-900 p-6 overflow-y-auto shadow-2xl space-y-6">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400">
              <Compass className="h-5 w-5 animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                GENIMAP Dubai Spatial Intelligence
              </h2>
              <p className="text-xs text-slate-400">GIS Location Proximity & Best Option Matcher</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Zone Selector Pills */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {GENIMAP_DUBAI_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedZoneId(loc.id)}
              className={`rounded-xl border p-2.5 text-left text-xs font-semibold transition-all ${
                selectedZoneId === loc.id
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-lg shadow-emerald-500/10'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="truncate">{loc.zoneName.split('/')[0]}</div>
            </button>
          ))}
        </div>

        {/* Active Zone GIS Analysis Card */}
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-950 to-slate-900 p-5 space-y-4 shadow-xl">
          
          <div className="flex items-start justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">GENIMAP ANALYZED ZONE</span>
              <h3 className="text-lg font-extrabold text-white mt-0.5">{activeZone.zoneName}</h3>
            </div>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300 font-mono">
              AI MATCH SCORE: 98%
            </span>
          </div>

          {/* Proximity Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="rounded-xl bg-slate-900/80 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-400">Metro Walk</span>
              <p className="font-extrabold text-white font-mono mt-0.5">{activeZone.metroProximityMins} mins</p>
            </div>
            <div className="rounded-xl bg-slate-900/80 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-400">Airport</span>
              <p className="font-extrabold text-amber-300 font-mono mt-0.5">{activeZone.airportProximityMins} mins</p>
            </div>
            <div className="rounded-xl bg-slate-900/80 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-400">Downtown</span>
              <p className="font-extrabold text-teal-300 font-mono mt-0.5">{activeZone.downtownProximityMins} mins</p>
            </div>
            <div className="rounded-xl bg-slate-900/80 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-400">Beach / Coast</span>
              <p className="font-extrabold text-cyan-300 font-mono mt-0.5">{activeZone.beachProximityMins} mins</p>
            </div>
          </div>

          {/* Growth Driver & Views */}
          <div className="rounded-xl bg-slate-900/60 p-3.5 space-y-2 text-xs border border-slate-800">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Primary Capital Growth Driver:</span>
            </div>
            <p className="text-slate-200 text-xs">{activeZone.growthDriver}</p>

            <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">View Types:</span>
              <div className="flex flex-wrap gap-1">
                {activeZone.viewTypes.map((v, idx) => (
                  <span key={idx} className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] text-emerald-300">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Recommended Best Options */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Award className="h-4 w-4 text-emerald-400" />
              GENIMAP Optimized Client Offer Options
            </h4>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3.5 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                <span>🌟 OPTION 1: Top Off-Plan Match</span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full">High Capital Growth</span>
              </div>
              <p className="text-xs font-semibold text-white">{activeZone.topOffPlanRecommendation}</p>
            </div>

            <div className="rounded-xl border border-teal-500/30 bg-teal-950/30 p-3.5 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-teal-300">
                <span>🏠 OPTION 2: Top Secondary Market Match</span>
                <span className="text-[10px] bg-teal-500/20 px-2 py-0.5 rounded-full">Immediate Cashflow</span>
              </div>
              <p className="text-xs font-semibold text-white">{activeZone.topSecondaryRecommendation}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

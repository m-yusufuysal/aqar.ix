'use client';

import React, { useState } from 'react';
import { X, Search, Building2, TrendingUp, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { DUBAI_MARKET_DATABASE } from '@/lib/dubaiMarketEngine';

interface DubaiMarketCompsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DubaiMarketComps: React.FC<DubaiMarketCompsProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredComps = DUBAI_MARKET_DATABASE.filter(
    (c) =>
      c.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.building.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl h-full border-l border-slate-800 bg-slate-900 p-6 overflow-y-auto shadow-2xl space-y-6">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Dubai Real Estate Comps Engine</h2>
              <p className="text-xs text-slate-400">RERA & DLD Benchmark transaction database</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Dubai Area (e.g. Downtown, Marina, JVC, Palm Jumeirah)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-10 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Cards List */}
        <div className="space-y-4">
          {filteredComps.map((comp) => (
            <div
              key={comp.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-4 hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {comp.area}
                  </h3>
                  <p className="text-xs text-slate-400">{comp.building}</p>
                </div>
                {comp.goldenVisaEligible && (
                  <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
                    <Award className="h-3 w-3 text-amber-400" /> Golden Visa Qualified (2M+ AED)
                  </span>
                )}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-slate-900 p-2.5 text-center">
                  <span className="text-[10px] text-slate-400">Avg Price/sqft</span>
                  <p className="text-sm font-bold text-white font-mono">AED {comp.avgPricePerSqft}</p>
                </div>
                <div className="rounded-xl bg-slate-900 p-2.5 text-center">
                  <span className="text-[10px] text-slate-400">Avg Rent/sqft</span>
                  <p className="text-sm font-bold text-teal-300 font-mono">AED {comp.avgRentPerSqft}</p>
                </div>
                <div className="rounded-xl bg-emerald-950/40 border border-emerald-500/30 p-2.5 text-center">
                  <span className="text-[10px] text-emerald-300">Rental Yield (ROI)</span>
                  <p className="text-sm font-bold text-emerald-400 font-mono">{comp.rentalYieldPercentage}%</p>
                </div>
              </div>

              {/* Recent Sales Table */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> Recent DLD Transactions
                </h4>
                <div className="space-y-1 text-xs">
                  {comp.recentSales.map((sale, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-slate-900/80 px-3 py-1.5 text-[11px]"
                    >
                      <span className="text-slate-300">{sale.unitType} ({sale.sizeSqft} sqft)</span>
                      <span className="font-mono font-semibold text-emerald-400">AED {sale.soldPriceAED.toLocaleString()}</span>
                      <span className="text-slate-500">{sale.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="rounded-lg bg-slate-900/40 p-3 space-y-1">
                <span className="text-[10px] font-semibold text-slate-400">Key AI Selling Points:</span>
                <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5">
                  {comp.keyHighlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

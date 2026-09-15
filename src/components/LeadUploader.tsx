'use client';

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, X, Sparkles, Plus } from 'lucide-react';
import { Lead } from '@/lib/types';
import { enrichLeadDossier } from '@/lib/leadEnrichment';

interface LeadUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Lead) => void;
}

export const LeadUploader: React.FC<LeadUploaderProps> = ({ isOpen, onClose, onAddLead }) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'csv' | 'pdf'>('manual');
  
  // Manual Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('Downtown Dubai');
  const [buildingName, setBuildingName] = useState('');
  const [bedrooms, setBedrooms] = useState(2);
  const [propertyType, setPropertyType] = useState<'Apartment' | 'Villa' | 'Townhouse' | 'Penthouse'>('Apartment');
  const [askingPrice, setAskingPrice] = useState<number>(3200000);

  // Status message
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setStatusMessage('Please enter prospect name and phone number.');
      return;
    }

    const rawLead: Lead = {
      id: `lead-usr-${Date.now()}`,
      name,
      phone,
      area,
      buildingName: buildingName || 'Prime Tower',
      bedrooms,
      propertyType,
      askingPrice,
      status: 'new',
      createdAt: new Date().toISOString(),
      callCount: 0,
    };

    const enriched = enrichLeadDossier(rawLead);
    onAddLead(enriched);
    setStatusMessage(`✅ ${name} added & enriched with Dubai Comps strategy! Ready for AI Cold Call.`);
    
    // Reset form
    setName('');
    setPhone('');
    setBuildingName('');
    setTimeout(() => {
      setStatusMessage(null);
      onClose();
    }, 1500);
  };

  const handleSimulatedFileUpload = (fileType: string) => {
    // Simulated CSV/PDF lead parsing
    const mockLead: Lead = {
      id: `lead-doc-${Date.now()}`,
      name: fileType === 'pdf' ? 'Sheikh Ahmed Al-Qasimi' : 'Dave Richardson',
      phone: fileType === 'pdf' ? '+971 50 882 1199' : '+971 56 771 2233',
      area: fileType === 'pdf' ? 'Palm Jumeirah' : 'Dubai Marina',
      buildingName: fileType === 'pdf' ? 'Shoreline Apartments' : 'LIV Marina',
      bedrooms: fileType === 'pdf' ? 3 : 2,
      propertyType: fileType === 'pdf' ? 'Penthouse' : 'Apartment',
      askingPrice: fileType === 'pdf' ? 7800000 : 2650000,
      status: 'new',
      createdAt: new Date().toISOString(),
      callCount: 0,
    };

    const enriched = enrichLeadDossier(mockLead);
    onAddLead(enriched);
    setStatusMessage(`✅ Parsed ${fileType.toUpperCase()} document! Extracted: ${mockLead.name} (${mockLead.area}). Strategy dossier generated.`);
    
    setTimeout(() => {
      setStatusMessage(null);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Lead & Area Document Ingestion</h2>
              <p className="text-xs text-slate-400">Add prospects or upload title deeds / area PDFs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex border-b border-slate-800">
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'manual'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Single Lead Entry
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'csv'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            CSV Lead Sheet Batch
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'pdf'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            PDF Title Deed / Area Doc
          </button>
        </div>

        {statusMessage && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Tab 1: Manual Entry */}
        {activeTab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-300">Prospect Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Tariq Al-Mansoor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-300">Phone Number (+971...) *</label>
                <input
                  type="text"
                  placeholder="+971 50 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-300">Dubai Area</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Downtown Dubai">Downtown Dubai</option>
                  <option value="Dubai Marina">Dubai Marina</option>
                  <option value="Palm Jumeirah">Palm Jumeirah</option>
                  <option value="Business Bay">Business Bay</option>
                  <option value="Jumeirah Village Circle (JVC)">Jumeirah Village Circle (JVC)</option>
                  <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-300">Building / Tower Name</label>
                <input
                  type="text"
                  placeholder="e.g. Burj Crown"
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-300">Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value={1}>1 Bedroom</option>
                  <option value={2}>2 Bedrooms</option>
                  <option value={3}>3 Bedrooms</option>
                  <option value={4}>Penthouse / 4+ Bed</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-300">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as any)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Penthouse">Penthouse</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-300">Target Price (AED)</label>
                <input
                  type="number"
                  value={askingPrice}
                  onChange={(e) => setAskingPrice(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all"
              >
                <Plus className="h-4 w-4" />
                Add & Generate Strategy Dossier
              </button>
            </div>
          </form>
        )}

        {/* Tab 2 & 3: File Drop */}
        {(activeTab === 'csv' || activeTab === 'pdf') && (
          <div className="mt-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/50 p-8 text-center hover:border-emerald-500/50 transition-all">
            <Upload className="h-10 w-10 text-emerald-400 animate-bounce" />
            <p className="mt-3 text-sm font-semibold text-white">
              Drop your {activeTab.toUpperCase()} document here
            </p>
            <p className="mt-1 text-xs text-slate-400 max-w-xs">
              AI RAG engine automatically extracts lead phone numbers, property floorplans, DLD title deeds, and area comps.
            </p>
            <button
              onClick={() => handleSimulatedFileUpload(activeTab)}
              className="mt-4 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-all"
            >
              Parse Sample {activeTab.toUpperCase()} File Now
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

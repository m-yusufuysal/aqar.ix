'use client';

import React from 'react';
import { X, Play, Pause, Volume2, CheckCircle2, MessageSquare, Send, Sparkles, Building, Calendar, PhoneCall } from 'lucide-react';
import { CallRecord } from '@/lib/types';

interface CallTranscriptViewerProps {
  callRecord: CallRecord | null;
  onClose: () => void;
}

export const CallTranscriptViewer: React.FC<CallTranscriptViewerProps> = ({ callRecord, onClose }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  if (!callRecord) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl h-full border-l border-slate-800 bg-slate-900 p-6 overflow-y-auto shadow-2xl space-y-6">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
              {callRecord.outcome.replace('_', ' ').toUpperCase()}
            </span>
            <h2 className="text-xl font-bold text-white mt-2 flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-emerald-400" />
              {callRecord.leadName}
            </h2>
            <p className="text-xs text-slate-400 font-mono">{callRecord.leadPhone} • {callRecord.area}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Audio Player Bar */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2 font-medium text-slate-200">
              <Volume2 className="h-4 w-4 text-emerald-400" /> Live Call Recording Playback
            </span>
            <span>Duration: {callRecord.durationSeconds}s</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-all"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>
            <div className="flex-1">
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 ${
                    isPlaying ? 'w-3/4 animate-pulse' : 'w-1/3'
                  }`}
                />
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">01:45 / 03:25</span>
          </div>
        </div>

        {/* Intelligence Score Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
            <span className="text-[11px] text-slate-400">Seller Motivation Score</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xl font-black text-emerald-400 font-mono">
                {callRecord.sellerMotivationScore}/10
              </span>
              <span className="text-[10px] text-emerald-300">High Urgency Seller</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
            <span className="text-[11px] text-slate-400">Voice AI Sentiment Score</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xl font-black text-teal-300 font-mono">
                {callRecord.sentimentScore}%
              </span>
              <span className="text-[10px] text-teal-400">Highly Receptive</span>
            </div>
          </div>
        </div>

        {/* Extracted Data Highlights */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
          <h3 className="text-xs font-bold text-emerald-300 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            AI Extracted Deal Agreement
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-200">
            {callRecord.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Multi-channel notification log */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2 text-xs">
          <h3 className="font-bold text-slate-300 flex items-center gap-2">
            <Send className="h-4 w-4 text-teal-400" /> Automated Multi-Channel Actions Executed
          </h3>
          <div className="space-y-1 text-slate-400 font-mono text-[11px]">
            <p className="text-emerald-400">✓ Instant Telegram Alert pushed to Human Broker phone</p>
            <p className="text-emerald-400">✓ WhatsApp Valuation Comps & Business Card sent to {callRecord.leadPhone}</p>
            <p className="text-teal-300">✓ Cal.com Meeting Slot reserved</p>
          </div>
        </div>

        {/* Full Dialogue Transcript */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-emerald-400" /> Full Conversational Transcript
          </h3>

          <div className="space-y-3">
            {callRecord.transcript.map((line, idx) => (
              <div
                key={idx}
                className={`flex flex-col rounded-xl p-3 text-xs ${
                  line.speaker === 'agent'
                    ? 'border border-emerald-500/20 bg-emerald-950/30 text-emerald-100 ml-4'
                    : 'border border-slate-800 bg-slate-950/80 text-slate-200 mr-4'
                }`}
              >
                <div className="flex items-center justify-between font-semibold text-[10px] text-slate-400 mb-1">
                  <span>{line.speaker === 'agent' ? '🤖 Alexander (AI Broker)' : `👤 ${callRecord.leadName}`}</span>
                  <span className="font-mono">{line.timestamp}</span>
                </div>
                <p className="leading-relaxed">{line.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

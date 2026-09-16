'use client';

import React, { useState } from 'react';
import { Lead, WhatsAppMessage } from '../lib/types';
import { whatsAppBot } from '../lib/whatsAppNegotiationBot';

interface WhatsAppAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead | null;
}

export const WhatsAppAutomationModal: React.FC<WhatsAppAutomationModalProps> = ({
  isOpen,
  onClose,
  lead,
}) => {
  const mockLead: Lead = lead || {
    id: 'lead-wa-demo',
    name: 'Sheikh Hamdan Al-Maktoum',
    phone: '+971 50 888 9900',
    area: 'Downtown Dubai',
    propertyType: 'Apartment',
    bedrooms: 2,
    askingPrice: 4200000,
    status: 'meeting_booked',
    createdAt: new Date().toISOString(),
    callCount: 1,
  };

  const [messages, setMessages] = useState<WhatsAppMessage[]>(() =>
    whatsAppBot.generatePostCallSequence(mockLead, 'eoi_booked', {
      offPlanProject: 'Mercedes-Benz Places by Binghatti',
      targetPriceAED: 4200000,
    })
  );

  const [inboundInput, setInboundInput] = useState('');

  if (!isOpen) return null;

  const handleSendInboundText = () => {
    if (!inboundInput.trim()) return;

    const userMessage: WhatsAppMessage = {
      id: `wa-in-${Date.now()}`,
      leadId: mockLead.id,
      leadPhone: mockLead.phone,
      direction: 'inbound',
      messageType: 'text',
      content: inboundInput,
      timestamp: new Date().toISOString(),
      status: 'delivered',
    };

    const botResponse = whatsAppBot.processInboundReply(inboundInput);

    const botMessage: WhatsAppMessage = {
      id: `wa-out-reply-${Date.now()}`,
      leadId: mockLead.id,
      leadPhone: mockLead.phone,
      direction: 'outbound',
      messageType: 'text',
      content: botResponse.replyText,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInboundInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
              💬
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Post-Call WhatsApp Deal Closing Engine</h3>
              <p className="text-xs text-slate-400">
                Automated multi-turn text/voice note negotiation & EOI deposit checkout link
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Chat Area */}
        <div className="p-6 overflow-y-auto space-y-4 bg-[#070b14]/90 flex-1 min-h-[360px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.direction === 'outbound' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs shadow-md ${
                  msg.direction === 'outbound'
                    ? 'bg-indigo-950/80 border border-indigo-800/60 text-slate-100 rounded-tr-none'
                    : 'bg-slate-800/90 border border-slate-700/80 text-white rounded-tl-none'
                }`}
              >
                <div className="font-semibold mb-1 text-[11px] text-indigo-300">
                  {msg.direction === 'outbound' ? '🤖 Aqarix Autonomous Sales Agent' : mockLead.name}
                </div>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                {/* Interactive Action Buttons */}
                {msg.actionUrl && (
                  <div className="mt-3">
                    <a
                      href={msg.actionUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-lg shadow-lg transition-all"
                    >
                      ⚡ Secure Payment Gateway Link (AED 50,000) →
                    </a>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} •{' '}
                {msg.status}
              </span>
            </div>
          ))}
        </div>

        {/* Input Bar Simulator */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-3">
          <input
            type="text"
            placeholder="Simulate inbound WhatsApp reply from lead (e.g. 'Can you send the payment link again?')"
            value={inboundInput}
            onChange={(e) => setInboundInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendInboundText()}
            className="flex-1 bg-[#070b14] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleSendInboundText}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all"
          >
            Send WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

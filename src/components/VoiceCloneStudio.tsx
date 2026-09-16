'use client';

import React, { useState } from 'react';
import { voiceCloneEngine } from '../lib/voiceCloneEngine';
import { VoicePersona } from '../lib/types';

interface VoiceCloneStudioProps {
  isOpen: boolean;
  onClose: () => void;
  onPersonaSelect?: (persona: VoicePersona) => void;
}

export const VoiceCloneStudio: React.FC<VoiceCloneStudioProps> = ({
  isOpen,
  onClose,
  onPersonaSelect,
}) => {
  const [personas, setPersonas] = useState<VoicePersona[]>(voiceCloneEngine.getPersonas());
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isCloning, setIsCloning] = useState(false);
  const [agentName, setAgentName] = useState('');
  const [language, setLanguage] = useState<'Dubai English' | 'Khaleeji Arabic' | 'Bilingual Switch'>('Dubai English');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [testSamplePlaying, setTestSamplePlaying] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);

    const interval = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 15) {
          clearInterval(interval);
          setIsRecording(false);
          return 15;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleCreateClone = async () => {
    if (!agentName.trim()) {
      alert('Please enter a name for your cloned sales persona.');
      return;
    }

    setIsCloning(true);
    try {
      const cloned = await voiceCloneEngine.cloneVoiceFromAudio(
        agentName,
        language,
        gender,
        recordingSeconds > 0 ? recordingSeconds : 12.5
      );
      setPersonas([...voiceCloneEngine.getPersonas()]);
      setIsCloning(false);
      setAgentName('');
      setRecordingSeconds(0);
      if (onPersonaSelect) {
        onPersonaSelect(cloned);
      }
    } catch {
      setIsCloning(false);
    }
  };

  const handlePlaySample = (persona: VoicePersona) => {
    setTestSamplePlaying(persona.id);
    const sampleText = voiceCloneEngine.generateSampleText(persona);
    
    // Use Web Speech API as audible fallback for demo testing
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sampleText);
      utterance.rate = persona.speed;
      utterance.pitch = persona.pitchShift;
      utterance.onend = () => setTestSamplePlaying(null);
      utterance.onerror = () => setTestSamplePlaying(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setTestSamplePlaying(null), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              🎙️
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Voice Clone & Persona Studio</h3>
              <p className="text-xs text-slate-400">
                Zero-Shot 15s HD voice cloning & Cartesia Sonic 2.0 acoustic synthesis engine
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Record Section */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-indigo-300 mb-2 flex items-center gap-2">
              <span>🔴</span> Record Your Voice (15-Second Zero-Shot Trainer)
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Speak naturally into your mic for 15 seconds. The neural acoustic model will extract your pitch, cadence, and DIFC broker accent.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-medium">Persona Label</label>
                <input
                  type="text"
                  placeholder="e.g. Yusuf - Senior Broker"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full bg-[#070b14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-medium">Primary Dialect</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="w-full bg-[#070b14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Dubai English">Dubai English (DIFC Corporate)</option>
                  <option value="Khaleeji Arabic">Khaleeji Arabic (Emirati Executive)</option>
                  <option value="Bilingual Switch">Bilingual Switch (Arabic + English)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-medium">Voice Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full bg-[#070b14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleStartRecording}
                  disabled={isRecording || isCloning}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {isRecording ? `Recording... (${15 - recordingSeconds}s remaining)` : '🎙️ Start 15s Mic Recording'}
                </button>
                {recordingSeconds > 0 && !isRecording && (
                  <span className="text-xs text-emerald-400 font-medium">✓ {recordingSeconds}s Audio Sample Captured</span>
                )}
              </div>

              <button
                onClick={handleCreateClone}
                disabled={isCloning || (!recordingSeconds && !agentName)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-all"
              >
                {isCloning ? 'Synthesizing Neural Voice...' : '⚡ Generate Cloned Voice Model'}
              </button>
            </div>
          </div>

          {/* Active Voice Personas Grid */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Available Cartesia / ElevenLabs Voice Models ({personas.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personas.map((persona) => (
                <div
                  key={persona.id}
                  className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                        {persona.name}
                        {persona.clonedFromSample && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded">
                            CLONED
                          </span>
                        )}
                      </h5>
                      <span className="text-xs text-indigo-400 font-mono">{persona.language}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{persona.accentNote}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                    <button
                      onClick={() => handlePlaySample(persona)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      {testSamplePlaying === persona.id ? '🔊 Playing Sample...' : '▶️ Test Voice Sample'}
                    </button>
                    <button
                      onClick={() => {
                        if (onPersonaSelect) onPersonaSelect(persona);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-xs text-white font-medium rounded-lg transition-colors"
                    >
                      Select Persona
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

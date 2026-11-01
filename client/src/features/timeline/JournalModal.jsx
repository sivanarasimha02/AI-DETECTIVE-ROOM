import React, { useState } from 'react';
import { X, BookOpen, Users, CheckCircle2, Circle } from 'lucide-react';

export default function JournalModal({ isOpen, onClose, objectives = [], suspects = [], notes = '', onSaveNotes }) {
  const [activeTab, setActiveTab] = useState('objectives');
  const [localNotes, setLocalNotes] = useState(notes);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-detective-panel border border-detective-border rounded-2xl max-w-2xl w-full p-6 text-detective-text shadow-2xl relative max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-detective-border">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Detective Field Journal</h2>
          </div>
          <button onClick={onClose} className="p-1 text-detective-muted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-2 pt-3 pb-2 border-b border-detective-border/60 text-xs">
          <button
            onClick={() => setActiveTab('objectives')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'objectives'
                ? 'bg-amber-500 text-black font-semibold'
                : 'text-detective-muted hover:text-white'
            }`}
          >
            Case Objectives
          </button>
          <button
            onClick={() => setActiveTab('suspects')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'suspects'
                ? 'bg-amber-500 text-black font-semibold'
                : 'text-detective-muted hover:text-white'
            }`}
          >
            Suspect Profiles
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'notes'
                ? 'bg-amber-500 text-black font-semibold'
                : 'text-detective-muted hover:text-white'
            }`}
          >
            Detective Notes
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto py-4 text-xs">
          {activeTab === 'objectives' && (
            <div className="space-y-3">
              {objectives.map((obj) => (
                <div
                  key={obj.id}
                  className="p-3 rounded-xl bg-detective-charcoal border border-detective-border flex items-start gap-3"
                >
                  <Circle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">{obj.title}</div>
                    <p className="text-detective-muted mt-0.5 leading-relaxed">{obj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'suspects' && (
            <div className="space-y-3">
              {suspects.map((s) => (
                <div key={s.id} className="p-4 rounded-xl bg-detective-charcoal border border-detective-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{s.name}</span>
                    <span className="text-[11px] font-mono text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded">
                      {s.role}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed"><strong className="text-white">Alibi:</strong> {s.alibi}</p>
                  <p className="text-slate-300 leading-relaxed"><strong className="text-white">Statement:</strong> "{s.statement}"</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="h-full flex flex-col space-y-2">
              <textarea
                value={localNotes}
                onChange={(e) => setLocalNotes(e.target.value)}
                placeholder="Log your theories, timeline timestamps, suspect contradictions, or unanswered questions..."
                className="w-full flex-1 min-h-[220px] bg-detective-dark border border-detective-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => onSaveNotes && onSaveNotes(localNotes)}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs"
                >
                  Save Notes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


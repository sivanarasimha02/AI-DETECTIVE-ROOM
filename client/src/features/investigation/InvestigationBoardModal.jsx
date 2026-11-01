import React, { useState } from 'react';
import { X, Pin, Sparkles, Plus, Trash2 } from 'lucide-react';

export default function InvestigationBoardModal({ isOpen, onClose, discoveredEvidence = [], suspects = [] }) {
  const [pinnedItems, setPinnedItems] = useState([
    { id: 'p_1', title: 'Suspect: Marcus Finch', note: 'Claims he was in surveillance booth. But what about the limp?', x: 40, y: 50, type: 'suspect' },
    { id: 'p_2', title: 'Door Log (E-02)', note: 'Curator badge entered 23:42. But Vance left at 22:00.', x: 320, y: 120, type: 'evidence' },
    { id: 'p_3', title: 'Janitor Eyewitness (E-03)', note: 'Saw green coat + right leg limp.', x: 580, y: 60, type: 'evidence' },
  ]);

  if (!isOpen) return null;

  function addClue(ev) {
    if (pinnedItems.some((p) => p.title.includes(ev.evidenceCode))) return;
    setPinnedItems((prev) => [
      ...prev,
      {
        id: `p_${Date.now()}`,
        title: `${ev.title} (${ev.evidenceCode})`,
        note: ev.observations?.[0] || ev.description.slice(0, 80),
        x: 100 + (prev.length * 30) % 400,
        y: 100 + (prev.length * 40) % 250,
        type: 'evidence',
      },
    ]);
  }

  function removePin(id) {
    setPinnedItems((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#b08968] border-8 border-[#5c3d2e] rounded-2xl max-w-5xl w-full h-[85vh] shadow-2xl relative flex flex-col overflow-hidden text-zinc-900 select-none">
        {/* Corkboard Toolbar */}
        <div className="bg-[#4a3024] text-amber-100 p-3 flex items-center justify-between border-b-2 border-[#3b261c]">
          <div className="flex items-center gap-2">
            <Pin className="w-5 h-5 text-red-500 fill-current" />
            <h2 className="font-mono font-bold text-sm uppercase tracking-wider">
              Investigation Corkboard & Deduction Web
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-amber-200/70 font-mono">
              {pinnedItems.length} Clues Pinned • Red Strings Active
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-amber-200 hover:text-white hover:bg-black/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Board Canvas Area */}
        <div className="flex-1 relative overflow-hidden bg-[radial-gradient(#936c4f_1px,transparent_1px)] [background-size:16px_16px] p-6">
          {/* Simulated Red yarn string connecting cards */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-red-600 stroke-[2] opacity-80">
            <line x1="180" y1="120" x2="400" y2="180" />
            <line x1="420" y1="210" x2="660" y2="140" />
          </svg>

          {/* Pinned Note Cards */}
          {pinnedItems.map((pin) => (
            <div
              key={pin.id}
              style={{ left: `${pin.x}px`, top: `${pin.y}px` }}
              className="absolute w-60 bg-[#fef3c7] border border-amber-300 p-3 rounded shadow-xl shadow-black/30 transform -rotate-1 hover:rotate-0 transition-transform cursor-move"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow border border-red-800" />
              <div className="flex items-start justify-between gap-1 mb-1.5 pt-1">
                <div className="font-bold text-xs text-zinc-900 leading-tight">{pin.title}</div>
                <button
                  onClick={() => removePin(pin.id)}
                  className="text-zinc-400 hover:text-red-700 p-0.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="font-mono text-[11px] text-zinc-700 leading-relaxed border-t border-amber-200 pt-1.5">
                {pin.note}
              </p>
            </div>
          ))}

          {/* Unpinned Tray */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-3 border border-amber-900/60 flex items-center justify-between">
            <span className="text-xs font-mono text-amber-200">
              Pin Discovered Clues to Corkboard:
            </span>
            <div className="flex gap-2 overflow-x-auto">
              {discoveredEvidence.map((ev) => (
                <button
                  key={ev.evidenceCode}
                  onClick={() => addClue(ev)}
                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-semibold font-mono text-xs flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>{ev.evidenceCode}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


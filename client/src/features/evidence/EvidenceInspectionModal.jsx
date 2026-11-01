import React from 'react';
import { X, FileText, MapPin, CheckCircle, PlusCircle } from 'lucide-react';

export default function EvidenceInspectionModal({ evidence, onClose, onAddToBoard }) {
  if (!evidence) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-detective-panel border border-detective-border rounded-2xl max-w-2xl w-full p-6 text-detective-text shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-detective-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                {evidence.evidenceCode}
              </span>
              <span className="text-xs text-detective-muted flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {evidence.location}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">{evidence.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-detective-muted hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-4 space-y-4 text-sm flex-1">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-detective-muted mb-1">Overview</h4>
            <p className="text-slate-300 leading-relaxed">{evidence.description}</p>
          </div>

          {evidence.extractedText && (
            <div className="p-4 rounded-xl bg-black/50 border border-detective-border/80 font-mono text-xs text-amber-100/90 leading-relaxed whitespace-pre-wrap">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-2 text-[11px] uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>Extracted Forensic Document Content</span>
              </div>
              {evidence.extractedText}
            </div>
          )}

          {evidence.observations && evidence.observations.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-detective-muted mb-2">Key Observations</h4>
              <ul className="space-y-1.5">
                {evidence.observations.map((obs, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-detective-border flex justify-end gap-3">
          <button
            onClick={() => {
              if (onAddToBoard) onAddToBoard(evidence);
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Pin to Investigation Board</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-detective-charcoal hover:bg-detective-border text-white text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


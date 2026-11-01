import React, { useState } from 'react';
import { X, Award, ShieldCheck, CheckSquare, Square, AlertCircle, ArrowRight } from 'lucide-react';
import { submitVerdict } from '../../services/api.js';

export default function VerdictModal({ isOpen, onClose, suspects = [], evidence = [], investigationId = '001' }) {
  const [selectedSuspect, setSelectedSuspect] = useState('');
  const [selectedEvidence, setSelectedEvidence] = useState([]);
  const [reasoning, setReasoning] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  if (!isOpen) return null;

  function toggleEvidence(code) {
    setSelectedEvidence((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }

  async function handleSubmit() {
    if (!selectedSuspect) return;
    setSubmitting(true);

    try {
      const res = await submitVerdict(investigationId, {
        suspectId: selectedSuspect,
        evidenceIds: selectedEvidence,
        reasoning,
      });
      setResults(res.data);
    } catch {
      // Fallback
      setResults({
        isCorrect: selectedSuspect === 'suspect_1',
        finalScore: selectedSuspect === 'suspect_1' ? 90 : 25,
        feedback: selectedSuspect === 'suspect_1'
          ? 'Case Solved! Marcus Finch was the culprit.'
          : 'Incorrect indictment. Re-examine the janitor report and staff ankle injury roster.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-detective-panel border border-detective-border rounded-2xl max-w-2xl w-full p-6 text-detective-text shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-detective-border">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              Submit Official Indictment & Verdict
            </h2>
            <p className="text-xs text-detective-muted">Authoritative Server Scoring & Reconstruction</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-detective-muted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Screen */}
        {results ? (
          <div className="py-6 text-center space-y-5 overflow-y-auto">
            <div
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold border-2 ${
                results.isCorrect
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : 'bg-red-500/20 border-red-500 text-red-400'
              }`}
            >
              {results.finalScore}%
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${results.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                {results.isCorrect ? 'CASE SOLVED!' : 'CASE UNSOLVED'}
              </h3>
              <p className="text-xs text-detective-muted mt-1">Final Detective Evaluation Score: {results.finalScore}/100</p>
            </div>

            <div className="p-4 rounded-xl bg-detective-charcoal border border-detective-border text-left text-xs leading-relaxed space-y-3">
              <div className="font-semibold text-white">Case Evaluation:</div>
              <p className="text-slate-300">{results.feedback}</p>
              {results.canonicalSummary && (
                <div className="pt-2 border-t border-detective-border text-[11px] text-amber-300/90 font-mono">
                  <strong>Reconstruction:</strong> {results.canonicalSummary}
                </div>
              )}
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  setResults(null);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs"
              >
                Close Docket
              </button>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <div className="overflow-y-auto py-4 space-y-5 text-xs flex-1">
            {/* 1. Prime Suspect */}
            <div>
              <label className="block font-mono uppercase tracking-wider text-detective-muted mb-2 font-semibold">
                1. Identify the Prime Suspect
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {suspects.map((s) => {
                  const isSel = selectedSuspect === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSuspect(s.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSel
                          ? 'bg-amber-500/20 border-amber-500 text-white'
                          : 'bg-detective-charcoal border-detective-border text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="font-bold text-xs">{s.name}</div>
                      <div className="text-[10px] text-detective-muted">{s.role}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Supporting Evidence */}
            <div>
              <label className="block font-mono uppercase tracking-wider text-detective-muted mb-2 font-semibold">
                2. Select Key Corroborating Evidence
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {evidence.map((ev) => {
                  const isChecked = selectedEvidence.includes(ev.evidenceCode);
                  return (
                    <button
                      key={ev.evidenceCode}
                      type="button"
                      onClick={() => toggleEvidence(ev.evidenceCode)}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                        isChecked
                          ? 'bg-amber-500/15 border-amber-500/80 text-white'
                          : 'bg-detective-charcoal border-detective-border text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-detective-muted shrink-0" />
                      )}
                      <div>
                        <span className="font-mono text-[10px] text-amber-400 font-bold mr-1.5">
                          {ev.evidenceCode}
                        </span>
                        <span className="text-[11px]">{ev.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Logical Hypothesis / Reasoning */}
            <div>
              <label className="block font-mono uppercase tracking-wider text-detective-muted mb-1.5 font-semibold">
                3. Forensic Reasoning & Reconstruction
              </label>
              <textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                rows={3}
                placeholder="Explain how the culprit committed the theft, how they bypassed security, and how specific physical markers or alibis exposed them..."
                className="w-full bg-detective-dark border border-detective-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed font-mono"
              />
            </div>

            {/* Action */}
            <div className="pt-2 flex justify-end gap-3 border-t border-detective-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-detective-charcoal hover:bg-detective-border text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || !selectedSuspect}
                className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors flex items-center gap-2 disabled:opacity-40"
              >
                <span>Submit Indictment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


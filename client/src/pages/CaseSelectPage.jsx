import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Shield, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

const CASES = [
  {
    id: '001',
    caseNumber: 'CASE #001',
    title: 'The Missing Diamond',
    difficulty: 'Medium',
    time: '25-35 min',
    setting: 'Museum Exhibition Room at Night',
    description: 'A priceless sapphire-cut diamond vanished from a locked, sensor-guarded display case during the midnight guard rotation. Uncover who broke security protocols and identify the thief.',
    status: 'available',
    evidenceCount: 6,
    suspectCount: 3,
  },
  {
    id: '002',
    caseNumber: 'CASE #002',
    title: 'The Alchemist\'s Ledger',
    difficulty: 'Hard',
    time: '40-50 min',
    setting: 'Victorian Antiquities Study',
    description: 'An encrypted ledger containing sensitive chemical formulations was destroyed in an apparent office fire. Decrypt the remains and establish whether it was arson or foul play.',
    status: 'locked',
    evidenceCount: 8,
    suspectCount: 4,
  }
];

export default function CaseSelectPage() {
  return (
    <div className="min-h-screen bg-detective-dark text-detective-text p-6 sm:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Top navigation */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-detective-border">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-detective-muted hover:text-amber-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Briefing HQ</span>
          </Link>
          <span className="font-mono text-xs uppercase tracking-wider text-amber-500/80">Archived Case Dockets</span>
        </div>

        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Active Case Files</h1>
          <p className="text-detective-muted text-sm sm:text-base">
            Select an open docket to review initial incident reports and deploy to the 3D crime investigation chamber.
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CASES.map((c) => {
            const isLocked = c.status === 'locked';

            return (
              <div
                key={c.id}
                className={`relative flex flex-col justify-between rounded-xl border p-6 transition-all ${
                  isLocked
                    ? 'bg-detective-charcoal/40 border-detective-border/50 opacity-60'
                    : 'bg-detective-charcoal border-detective-border hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5'
                }`}
              >
                <div>
                  {/* Case Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded">
                      {c.caseNumber}
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-detective-dark border border-detective-border text-detective-muted">
                        {c.difficulty}
                      </span>
                      {isLocked ? (
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">Locked</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Available
                        </span>
                      )}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-2">{c.title}</h2>
                  <p className="text-xs font-mono text-amber-300/80 mb-3">{c.setting}</p>
                  <p className="text-detective-muted text-sm leading-relaxed mb-6">{c.description}</p>
                </div>

                {/* Footer details */}
                <div>
                  <div className="flex items-center gap-4 text-xs text-detective-muted py-3 border-t border-detective-border/60 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {c.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      {c.evidenceCount} Clues
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-amber-300" />
                      {c.suspectCount} Suspects
                    </span>
                  </div>

                  {isLocked ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-lg bg-detective-border text-zinc-500 text-sm font-semibold cursor-not-allowed"
                    >
                      Classified - Solve Case #001 to Unlock
                    </button>
                  ) : (
                    <Link
                      to={`/game/${c.id}`}
                      className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold text-center block transition-all shadow-md shadow-amber-500/20"
                    >
                      Open Case Docket & Enter 3D Room
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


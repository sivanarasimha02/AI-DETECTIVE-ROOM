import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldAlert, Sparkles, BookOpen, KeyRound, Play } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-detective-dark text-detective-text flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono font-bold text-xl">
            AD
          </div>
          <span className="font-mono tracking-widest text-lg font-semibold uppercase text-amber-400">
            AI Detective Room
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-detective-muted">
          <span className="px-3 py-1 rounded bg-detective-charcoal border border-detective-border">v2.0.0</span>
        </div>
      </header>

      {/* Hero Content */}
      <main className="max-w-4xl mx-auto my-auto z-10 text-center py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-detective-charcoal border border-detective-border text-xs text-amber-400 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-time 3D Scene + Grounded Gemini AI</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Enter the Crime Scene.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
            Uncover the Truth.
          </span>
        </h1>
        <p className="text-detective-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Step into a fully navigable 3D detective office. Inspect physical evidence, link clues on your corkboard, interrogative suspects, and reason through mysteries with an evidence-grounded AI mentor.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/game/001"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group"
          >
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span>Start Investigation (Case #001)</span>
          </Link>
          <Link
            to="/cases"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-detective-charcoal hover:bg-detective-border border border-detective-border text-white font-medium transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-detective-muted" />
            <span>Browse Case Files</span>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-left">
          <div className="p-5 rounded-xl bg-detective-charcoal/80 border border-detective-border">
            <Compass className="w-6 h-6 text-amber-400 mb-3" />
            <h3 className="font-semibold text-white mb-1">Playable 3D Space</h3>
            <p className="text-xs text-detective-muted leading-relaxed">
              Explore desk files, open filing cabinets, and interact with forensic clues in real-time.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-detective-charcoal/80 border border-detective-border">
            <ShieldAlert className="w-6 h-6 text-cyan-400 mb-3" />
            <h3 className="font-semibold text-white mb-1">Authoritative Scoring</h3>
            <p className="text-xs text-detective-muted leading-relaxed">
              Deductions and evidence chains are validated by server-side logic to protect canonical solutions.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-detective-charcoal/80 border border-detective-border">
            <KeyRound className="w-6 h-6 text-amber-300 mb-3" />
            <h3 className="font-semibold text-white mb-1">Grounded AI Mentor</h3>
            <p className="text-xs text-detective-muted leading-relaxed">
              Google Gemini assists your reasoning using verified evidence without prematurely leaking solutions.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center text-xs text-detective-muted z-10 pt-6 border-t border-detective-border/50">
        <p>© 2026 AI Detective Room. Master Specification v2.0.0 compliant.</p>
        <p className="mt-2 sm:mt-0 font-mono text-amber-500/80">MERN + Three.js + React Three Fiber + Gemini</p>
      </footer>
    </div>
  );
}


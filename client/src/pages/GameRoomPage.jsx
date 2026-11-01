import React, { useState, useEffect, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import {
  Sparkles,
  BookOpen,
  Pin,
  ShieldCheck,
  ArrowLeft,
  Eye,
  CheckCircle2,
  FolderOpen,
  Loader2,
  Camera,
} from 'lucide-react';

import RoomLighting from '../game/lighting/RoomLighting.jsx';
import PlayerControls from '../game/controls/PlayerControls.jsx';
import {
  RoomStructure,
  DetectiveDesk,
  InvestigationCorkboard,
  SecurityTerminal,
  FilingCabinet,
  ForensicStation,
  VerdictStation,
} from '../game/objects/Furniture.jsx';

import EvidenceInspectionModal from '../features/evidence/EvidenceInspectionModal.jsx';
import GeminiAssistantModal from '../features/assistant/GeminiAssistantModal.jsx';
import InvestigationBoardModal from '../features/investigation/InvestigationBoardModal.jsx';
import VerdictModal from '../features/verdict/VerdictModal.jsx';
import JournalModal from '../features/timeline/JournalModal.jsx';

import { getCaseDetails, recordEvidenceDiscovery } from '../services/api.js';

export default function GameRoomPage() {
  const { caseId = '001' } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Active Camera Station View
  const [activeCameraView, setActiveCameraView] = useState('overview');

  // Modals & Inspection State
  const [inspectedEvidence, setInspectedEvidence] = useState(null);
  const [discoveredEvidenceList, setDiscoveredEvidenceList] = useState([]);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const [isVerdictOpen, setIsVerdictOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);

  // Load Case Details
  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getCaseDetails(caseId);
      setCaseData(data);
      setLoading(false);
    }
    load();
  }, [caseId]);

  // Object Interaction Handler from 3D Scene
  async function handleObjectSelect(objectInfo) {
    if (objectInfo.id === 'safe_verdict') {
      setIsVerdictOpen(true);
      return;
    }

    if (objectInfo.id === 'corkboard') {
      // Find E-03 or open board
      const ev = caseData?.evidence?.find((e) => e.evidenceCode === 'E-03');
      if (ev) handleInspectEvidence(ev);
      return;
    }

    if (objectInfo.evidenceCode) {
      const ev = caseData?.evidence?.find((e) => e.evidenceCode === objectInfo.evidenceCode);
      if (ev) handleInspectEvidence(ev);
    }
  }

  function handleInspectEvidence(ev) {
    setInspectedEvidence(ev);
    if (!discoveredEvidenceList.some((d) => d.evidenceCode === ev.evidenceCode)) {
      setDiscoveredEvidenceList((prev) => [...prev, ev]);
      recordEvidenceDiscovery(`inv_${caseId}`, ev.evidenceCode);
    }
  }

  if (loading || !caseData) {
    return (
      <div className="min-h-screen bg-detective-dark flex flex-col items-center justify-center text-detective-text gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
        <p className="font-mono text-sm tracking-wider uppercase text-amber-400">
          Loading 3D Detective Crime Scene...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-[#070a0f] overflow-hidden select-none font-sans">
      {/* 3D Scene Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 2.2, 3.2], fov: 60 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <RoomLighting />
          <RoomStructure />

          {/* Interactive Room Objects */}
          <DetectiveDesk onSelect={handleObjectSelect} />
          <InvestigationCorkboard onSelect={handleObjectSelect} />
          <SecurityTerminal onSelect={handleObjectSelect} />
          <FilingCabinet onSelect={handleObjectSelect} />
          <ForensicStation onSelect={handleObjectSelect} />
          <VerdictStation onSelect={handleObjectSelect} />

          {/* Camera Controller */}
          <PlayerControls activeView={activeCameraView} />
        </Suspense>
      </Canvas>

      {/* TOP HUD BAR */}
      <header className="absolute top-0 inset-x-0 p-4 pointer-events-none flex items-center justify-between z-20">
        <div className="flex items-center gap-3 pointer-events-auto bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-xl border border-detective-border shadow-2xl">
          <Link
            to="/cases"
            className="p-1 rounded-lg text-detective-muted hover:text-white hover:bg-white/10 transition-colors"
            title="Return to Case Files"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-amber-400">{caseData.caseNumber}:</span>
              <span className="text-sm font-bold text-white">{caseData.title}</span>
            </div>
            <div className="text-[11px] text-detective-muted flex items-center gap-2">
              <span>{caseData.setting}</span>
              <span>•</span>
              <span className="text-amber-400 font-mono">
                {discoveredEvidenceList.length} / {caseData.evidence.length} Evidence Found
              </span>
            </div>
          </div>
        </div>

        {/* Quick Camera Navigation Buttons */}
        <div className="hidden md:flex items-center gap-1.5 pointer-events-auto bg-black/75 backdrop-blur-md p-1.5 rounded-xl border border-detective-border shadow-2xl text-xs">
          <span className="px-2 text-[10px] uppercase font-mono tracking-wider text-detective-muted flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            Station:
          </span>
          {[
            { id: 'overview', label: 'Room' },
            { id: 'desk', label: 'Desk (E-01)' },
            { id: 'corkboard', label: 'Board (E-03)' },
            { id: 'terminal', label: 'Terminal (E-02)' },
            { id: 'cabinet', label: 'Cabinet (E-05)' },
            { id: 'verdict', label: 'Verdict' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveCameraView(st.id)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-colors ${
                activeCameraView === st.id
                  ? 'bg-amber-500 text-black font-bold'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </header>

      {/* BOTTOM EVIDENCE INVENTORY DOCK */}
      <footer className="absolute bottom-4 inset-x-4 pointer-events-none flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
        {/* Evidence Discovered Carousel */}
        <div className="pointer-events-auto bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-detective-border shadow-2xl flex items-center gap-3 max-w-full overflow-x-auto">
          <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5 uppercase shrink-0">
            <FolderOpen className="w-4 h-4" />
            <span>Discovered Evidence:</span>
          </div>

          <div className="flex items-center gap-2">
            {caseData.evidence.map((ev) => {
              const isFound = discoveredEvidenceList.some((d) => d.evidenceCode === ev.evidenceCode);

              return (
                <button
                  key={ev.evidenceCode}
                  onClick={() => handleInspectEvidence(ev)}
                  className={`px-3 py-1.5 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-all ${
                    isFound
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-200 hover:bg-amber-500/30'
                      : 'bg-detective-charcoal/50 border-detective-border/50 text-zinc-500 hover:border-zinc-500'
                  }`}
                >
                  {isFound ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 opacity-40" />
                  )}
                  <span>{ev.evidenceCode}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: AI Assistant, Board, Journal, Verdict */}
        <div className="pointer-events-auto flex items-center gap-2 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-detective-border shadow-2xl">
          <button
            onClick={() => setIsAiOpen(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>Gemini AI Mentor</span>
          </button>

          <button
            onClick={() => setIsBoardOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-detective-charcoal hover:bg-detective-border text-white text-xs font-medium flex items-center gap-1.5 border border-detective-border transition-colors"
          >
            <Pin className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span className="hidden sm:inline">Corkboard</span>
          </button>

          <button
            onClick={() => setIsJournalOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-detective-charcoal hover:bg-detective-border text-white text-xs font-medium flex items-center gap-1.5 border border-detective-border transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Journal</span>
          </button>

          <button
            onClick={() => setIsVerdictOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-red-600/90 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-red-600/30"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verdict</span>
          </button>
        </div>
      </footer>

      {/* OVERLAY MODALS */}
      <EvidenceInspectionModal
        evidence={inspectedEvidence}
        onClose={() => setInspectedEvidence(null)}
        onAddToBoard={() => setIsBoardOpen(true)}
      />

      <GeminiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        investigationId={`inv_${caseId}`}
        discoveredEvidence={discoveredEvidenceList}
      />

      <InvestigationBoardModal
        isOpen={isBoardOpen}
        onClose={() => setIsBoardOpen(false)}
        discoveredEvidence={discoveredEvidenceList}
        suspects={caseData.suspects}
      />

      <JournalModal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        objectives={caseData.objectives}
        suspects={caseData.suspects}
      />

      <VerdictModal
        isOpen={isVerdictOpen}
        onClose={() => setIsVerdictOpen(false)}
        suspects={caseData.suspects}
        evidence={caseData.evidence}
        investigationId={`inv_${caseId}`}
      />
    </div>
  );
}


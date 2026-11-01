import React, { useState } from 'react';
import { X, Send, Sparkles, HelpCircle, Bot, User, AlertCircle } from 'lucide-react';
import { askGemini, requestHint } from '../../services/api.js';

export default function GeminiAssistantModal({ isOpen, onClose, investigationId = '001', discoveredEvidence = [] }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Greetings, Detective. I am your Gemini AI investigation partner. I will help analyze evidence, evaluate suspect statements, and provide logical hints without giving away the final culprit prematurely. How can I assist your deductions?',
      citedEvidence: [],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hintLevel, setHintLevel] = useState(1);

  if (!isOpen) return null;

  async function handleSend(e) {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    try {
      const data = await askGemini(investigationId, userText);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply,
          citedEvidence: data.citedEvidence || [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I had trouble connecting to the crime database. However, cross-referencing your medical roster with the janitor statement remains your most logical lead.',
          citedEvidence: ['E-03', 'E-05'],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleGetHint(level) {
    setLoading(true);
    try {
      const res = await requestHint(investigationId, level);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `💡 [Hint Level ${level}]: ${res.hint.text}`,
          citedEvidence: [],
        },
      ]);
      setHintLevel(Math.min(3, level + 1));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-detective-panel border-l border-detective-border shadow-2xl flex flex-col text-detective-text backdrop-blur-md">
      {/* Header */}
      <div className="p-4 border-b border-detective-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              Gemini Detective Assistant
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-1.5 py-0.5 rounded">
                Grounded
              </span>
            </h3>
            <p className="text-[11px] text-detective-muted">Logical mentor • Non-spoiling analysis</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-detective-muted hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progressive Hint Bar */}
      <div className="bg-detective-charcoal/80 border-b border-detective-border px-4 py-2.5 flex items-center justify-between text-xs">
        <span className="text-detective-muted flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          Stuck? Progressive Hints:
        </span>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleGetHint(lvl)}
              disabled={loading}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                hintLevel === lvl
                  ? 'bg-amber-500 text-black font-semibold shadow'
                  : 'bg-detective-border/80 text-detective-muted hover:text-white'
              }`}
            >
              Lvl {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="w-6 h-6 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`max-w-[82%] rounded-xl p-3 leading-relaxed ${
                m.role === 'user'
                  ? 'bg-amber-500 text-black font-medium'
                  : 'bg-detective-charcoal border border-detective-border text-slate-200'
              }`}
            >
              <p>{m.content}</p>
              {m.citedEvidence && m.citedEvidence.length > 0 && (
                <div className="mt-2 pt-2 border-t border-detective-border/60 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-amber-400 font-mono">Citations:</span>
                  {m.citedEvidence.map((ev, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-detective-border text-amber-300 font-mono text-[9px]"
                    >
                      {ev}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {m.role === 'user' && (
              <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center shrink-0 text-white mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-detective-muted text-xs italic">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>Analyzing case files...</span>
          </div>
        )}
      </div>

      {/* Prompt Suggestions */}
      <div className="px-4 py-2 bg-detective-charcoal/40 border-t border-detective-border/60 flex gap-2 overflow-x-auto text-[11px]">
        <button
          onClick={() => setInput('Could Elena Vance have done this without limping?')}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-detective-border/70 hover:bg-detective-border text-slate-300"
        >
          Check Elena's alibi
        </button>
        <button
          onClick={() => setInput('Who entered the laser override PIN 8821?')}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-detective-border/70 hover:bg-detective-border text-slate-300"
        >
          PIN 8821 suspects
        </button>
        <button
          onClick={() => setInput('What does the night janitor statement prove?')}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-detective-border/70 hover:bg-detective-border text-slate-300"
        >
          Janitor statement
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-detective-border flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Gemini about clues, alibis, or contradictions..."
          className="flex-1 bg-detective-dark border border-detective-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors disabled:opacity-40"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}


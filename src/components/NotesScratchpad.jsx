import React, { useState } from 'react';
import { FileText, Sparkles, Copy, Check, RefreshCw } from 'lucide-react';
import { playClick } from '../utils/sound';

export default function NotesScratchpad() {
  const [notes, setNotes] = useState(
`### ⚡ Sprint Architecture RFC
- [x] Set up Vite + React template with clean component tree
- [ ] Connect WebSocket telemetry for real-time cognitive bio-sync
- [ ] Review PR #42: Distributed event streaming latency reduction

> "The true cost of multitasking is cognitive re-orientation latency."`
  );
  const [copied, setCopied] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);

  const handleCopy = () => {
    playClick();
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAIPolish = () => {
    playClick();
    setIsPolishing(true);
    setTimeout(() => {
      setIsPolishing(false);
      setNotes(
`### ⚡ Sprint Architecture RFC (AI Synthesized)
#### Key Deliverables & Status:
- [x] Initialized modern Vite + React structure & dark glassmorphic tokens
- [ ] Implement event-driven telemetry stream for cognitive flow monitoring
- [ ] Review PR #42: Reduce inter-service messaging latency (<12ms target)

#### Actionable Next Steps:
1. Conduct stress tests on audio synthesizer and Pomodoro loop.
2. Finalize GitHub repo deployment checklist.

> "Deep focus is a compounding asset; defend uninterrupted blocks."`
      );
    }, 700);
  };

  const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;

  return (
    <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={18} color="#a5b4fc" />
          <h2 style={{ fontSize: '1.15rem', margin: 0 }}>Scratchpad & Notes</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            id="ai-polish-notes-btn"
            onClick={handleAIPolish}
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
            disabled={isPolishing}
            title="Polish notes into structured Markdown"
          >
            {isPolishing ? <RefreshCw size={13} className="animate-spin-slow" /> : <Sparkles size={13} color="#818cf8" />}
            <span>AI Polish</span>
          </button>

          <button
            id="copy-notes-btn"
            onClick={handleCopy}
            className="btn-icon"
            style={{ width: '30px', height: '30px' }}
            title="Copy notes to clipboard"
          >
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        id="scratchpad-textarea"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={6}
        style={{
          width: '100%',
          padding: '0.85rem',
          borderRadius: 'var(--sm-radius)',
          background: 'rgba(10, 14, 23, 0.7)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-bright)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          lineHeight: 1.6,
          resize: 'vertical',
          outline: 'none'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
        <span>Markdown supported</span>
        <span>{wordCount} words | {notes.length} characters</span>
      </div>
    </div>
  );
}

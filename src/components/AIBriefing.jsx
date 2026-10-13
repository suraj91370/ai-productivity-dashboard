import React, { useState } from 'react';
import { Sparkles, Brain, ArrowUpDown, Send, Lightbulb, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';
import { playClick } from '../utils/sound';

export default function AIBriefing({ onAutoPrioritize, tasks }) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  const quickPrompts = [
    { label: '🎯 Next High-Impact Task', text: 'Which task should I tackle right now for maximum impact?' },
    { label: '🧘 5-Min Reset Protocol', text: 'Give me a rapid 5-minute cognitive reset protocol to overcome fatigue.' },
    { label: '📋 Backlog Deconstruction', text: 'How should I break down complex engineering tasks today?' },
    { label: '📈 Day Summary', text: 'Analyze my current completion velocity and energy curve.' },
  ];

  const handleAskAI = (queryText) => {
    const q = queryText || prompt;
    if (!q.trim()) return;

    playClick();
    setIsThinking(true);
    setResponse(null);

    setTimeout(() => {
      setIsThinking(false);
      if (q.toLowerCase().includes('next') || q.toLowerCase().includes('impact')) {
        const topTask = tasks.find(t => !t.completed && t.priority === 'Critical') || tasks.find(t => !t.completed);
        setResponse({
          title: 'Optimal Task Recommendation',
          text: topTask 
            ? `Your peak cognitive window is active right now. Lock in on "${topTask.title}". It has high architectural gravity. Disable notifications and dedicate 2 Pomodoro sprints.`
            : 'All critical items are cleared! Shift focus to forward-looking exploratory research or code review.',
          tag: 'Deep Work'
        });
      } else if (q.toLowerCase().includes('reset') || q.toLowerCase().includes('fatigue')) {
        setResponse({
          title: '5-Minute Physiological Reset',
          text: '1. Step away from display. 2. Practice 4-7-8 box breathing for 2 minutes. 3. Hydrate with 300ml cold water. 4. Stretch spine & shoulders. Your dopamine baseline will recover by 40%.',
          tag: 'Bio-Flow'
        });
      } else if (q.toLowerCase().includes('break') || q.toLowerCase().includes('backlog')) {
        setResponse({
          title: 'Cognitive Task Breakdown Strategy',
          text: 'Apply the Rule of 3: Slice deliverables into (1) Interface Contract, (2) Core Implementation, (3) Boundary Validation. Avoid multitasking during active execution phases.',
          tag: 'Strategy'
        });
      } else {
        setResponse({
          title: 'Executive AI Analysis',
          text: `Analyzing: "${q}" — Based on your current velocity of ${tasks.filter(t => t.completed).length} items completed, maintain single-task continuity. You are trending 18% faster than your weekly baseline.`,
          tag: 'Productivity Matrix'
        });
      }
    }, 600);
  };

  return (
    <section className="glass-panel" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative gradient blur in corner */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Top Banner Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            background: 'rgba(99, 102, 241, 0.2)',
            padding: '0.5rem',
            borderRadius: '10px',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Brain size={20} color="#818cf8" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', margin: 0 }}>
              AI Cognitive Briefing
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Live telemetry & predictive workload optimization
            </p>
          </div>
        </div>

        {/* Auto Prioritize button */}
        <button
          id="ai-auto-prioritize-btn"
          onClick={() => {
            playClick();
            onAutoPrioritize();
          }}
          className="btn-primary"
          style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}
        >
          <ArrowUpDown size={14} />
          Auto-Prioritize Matrix
        </button>
      </div>

      {/* Quick stats pills */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0.85rem',
        marginBottom: '1.15rem'
      }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Daily Flow Index</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.2rem' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>94%</span>
            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>+8% vs avg</span>
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Cognitive Prime Time</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.2rem' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#a5b4fc', fontFamily: 'var(--font-mono)' }}>09:30 — 12:45</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Peak state</span>
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Workload Status</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.2rem' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34d399' }}>Balanced</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>~3.5h deep work</span>
          </div>
        </div>
      </div>

      {/* Quick Prompts Chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600, marginRight: '0.25rem' }}>Ask Copilot:</span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleAskAI(qp.text)}
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem', borderRadius: '999px', background: 'rgba(255, 255, 255, 0.03)' }}
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div style={{ display: 'flex', gap: '0.65rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            id="ai-briefing-input"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
            placeholder="Ask AI Copilot for prioritization, focus strategies, or project breakdowns..."
            style={{
              width: '100%',
              padding: '0.65rem 1rem',
              borderRadius: 'var(--sm-radius)',
              background: 'rgba(10, 14, 23, 0.7)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-bright)',
              fontSize: '0.88rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>
        <button
          id="ai-submit-prompt-btn"
          onClick={() => handleAskAI()}
          className="btn-primary"
          style={{ padding: '0.65rem 1.15rem' }}
          disabled={isThinking}
        >
          {isThinking ? <RefreshCw size={16} className="animate-spin-slow" /> : <Send size={16} />}
        </button>
      </div>

      {/* AI Response Card */}
      {response && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem 1.25rem',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.06) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Sparkles size={16} color="#818cf8" />
              <strong style={{ fontSize: '0.88rem', color: '#e0e7ff' }}>{response.title}</strong>
            </div>
            <span className="badge badge-cyan">{response.tag}</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.55 }}>
            {response.text}
          </p>
        </div>
      )}
    </section>
  );
}

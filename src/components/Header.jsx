import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, Moon, Sun, GitBranch, ShieldCheck, Zap } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { playClick } from '../utils/sound';

export default function Header({ isDeepFlow, setIsDeepFlow, onOpenGitModal, tasksCount, completedCount }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <header className="glass-panel" style={{ padding: '0.85rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
      {/* Brand & Tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 18px rgba(99, 102, 241, 0.4)'
        }}>
          <Zap size={22} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.35rem', margin: 0, fontWeight: '800' }}>
              Apex<span className="gradient-text-accent">Flow</span>
            </h1>
            <span className="badge badge-indigo">AI Studio</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', margin: 0 }}>
            Cognitive Deep Work & Intelligent Flow Dashboard
          </p>
        </div>
      </div>

      {/* Center Metrics & Live Clock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        {/* Streak */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(245, 158, 11, 0.1)', padding: '0.35rem 0.75rem', borderRadius: '999px', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
          <Flame size={16} color="#f59e0b" />
          <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fbbf24' }}>14-Day Streak</span>
        </div>

        {/* Task Velocity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.35rem 0.75rem', borderRadius: '999px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
          <ShieldCheck size={16} color="#10b981" />
          <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6ee7b7' }}>
            {completedCount}/{tasksCount} Tasks Done
          </span>
        </div>

        {/* Digital Clock */}
        <div style={{ textAlign: 'right', minWidth: '120px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: '600', color: 'var(--text-bright)', letterSpacing: '0.05em' }}>
            {formattedTime}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {formattedDate}
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Deep Flow Toggle */}
        <button
          id="toggle-deep-flow-btn"
          onClick={() => {
            playClick();
            setIsDeepFlow(!isDeepFlow);
          }}
          className={isDeepFlow ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.82rem', padding: '0.5rem 0.95rem' }}
          title="Toggle Deep Flow Focus Mode"
        >
          <Sparkles size={15} />
          {isDeepFlow ? 'Deep Flow: Active' : 'Enable Deep Flow'}
        </button>

        {/* Git Upload / Sync Button */}
        <button
          id="open-git-modal-btn"
          onClick={() => {
            playClick();
            onOpenGitModal();
          }}
          className="btn-secondary"
          style={{
            fontSize: '0.82rem',
            padding: '0.5rem 0.95rem',
            borderColor: 'rgba(99, 102, 241, 0.4)',
            background: 'rgba(99, 102, 241, 0.12)'
          }}
          title="Open Git & GitHub Upload Hub"
        >
          <GithubIcon size={15} color="#818cf8" />
          <span style={{ color: '#c7d2fe', fontWeight: '600' }}>Git Push Hub</span>
        </button>
      </div>
    </header>
  );
}

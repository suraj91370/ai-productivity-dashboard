import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Zap } from 'lucide-react';

export default function AnalyticsPanel() {
  const weeklyData = [
    { day: 'Mon', hours: 4.8, active: false },
    { day: 'Tue', hours: 6.2, active: false },
    { day: 'Wed', hours: 5.5, active: false },
    { day: 'Thu', hours: 7.1, active: true },
    { day: 'Fri', hours: 6.8, active: false },
    { day: 'Sat', hours: 3.2, active: false },
    { day: 'Sun', hours: 2.4, active: false },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  const categories = [
    { label: 'Engineering & Code', percent: 48, color: '#6366f1' },
    { label: 'System Architecture', percent: 26, color: '#06b6d4' },
    { label: 'AI Review & Research', percent: 16, color: '#8b5cf6' },
    { label: 'Decompression & Health', percent: 10, color: '#10b981' },
  ];

  return (
    <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} color="#06b6d4" />
          <h2 style={{ fontSize: '1.15rem', margin: 0 }}>Focus Telemetry & Insights</h2>
        </div>
        <span className="badge badge-cyan">36.0h this week</span>
      </div>

      {/* Weekly Hours Bar Chart */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Daily Deep Flow Hours</span>
          <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <TrendingUp size={13} /> +14% vs last week
          </span>
        </div>

        {/* CSS Bar Chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '110px', gap: '0.5rem', padding: '0 0.5rem' }}>
          {weeklyData.map((d, i) => {
            const heightPercent = (d.hours / maxHours) * 100;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1 }}>
                <span style={{ fontSize: '0.7rem', color: d.active ? '#38bdf8' : 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  {d.hours}h
                </span>
                <div style={{
                  width: '100%',
                  maxWidth: '28px',
                  height: `${heightPercent}%`,
                  borderRadius: '6px 6px 2px 2px',
                  background: d.active 
                    ? 'linear-gradient(180deg, #38bdf8 0%, #6366f1 100%)' 
                    : 'linear-gradient(180deg, rgba(99, 102, 241, 0.4) 0%, rgba(99, 102, 241, 0.15) 100%)',
                  boxShadow: d.active ? '0 0 12px rgba(56, 189, 248, 0.5)' : 'none',
                  transition: 'height 0.4s ease'
                }} />
                <span style={{ fontSize: '0.72rem', color: d.active ? 'var(--text-bright)' : 'var(--text-dim)', fontWeight: d.active ? 700 : 500 }}>
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Progress Bars */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
          Focus Allocation by Domain
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {categories.map((c, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                <span style={{ color: 'var(--text-main)' }}>{c.label}</span>
                <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{c.percent}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                  width: `${c.percent}%`,
                  height: '100%',
                  background: c.color,
                  borderRadius: '999px',
                  boxShadow: `0 0 8px ${c.color}66`
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

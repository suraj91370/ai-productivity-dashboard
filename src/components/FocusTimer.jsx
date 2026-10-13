import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX, Sparkles, Coffee, Target, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChime, playClick, setAmbientNoise } from '../utils/sound';

export default function FocusTimer({ onSessionComplete }) {
  const [mode, setMode] = useState('work'); // 'work' | 'shortBreak' | 'longBreak'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [ambientSound, setAmbientSound] = useState('none');
  const [sessionsCompleted, setSessionsCompleted] = useState(2);

  const timerRef = useRef(null);

  const MODES = {
    work: { label: 'Deep Work', duration: 25 * 60, color: '#6366f1', glow: 'rgba(99, 102, 241, 0.4)' },
    shortBreak: { label: 'Short Break', duration: 5 * 60, color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)' },
    longBreak: { label: 'Long Break', duration: 15 * 60, color: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' }
  };

  const currentDuration = MODES[mode].duration;
  const progressPercent = ((currentDuration - timeLeft) / currentDuration) * 100;

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, mode]);

  const handleComplete = () => {
    setIsRunning(false);
    playChime();

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b']
    });

    if (mode === 'work') {
      const nextCount = sessionsCompleted + 1;
      setSessionsCompleted(nextCount);
      if (onSessionComplete) onSessionComplete();

      if (nextCount % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(MODES.longBreak.duration);
      } else {
        setMode('shortBreak');
        setTimeLeft(MODES.shortBreak.duration);
      }
    } else {
      setMode('work');
      setTimeLeft(MODES.work.duration);
    }
  };

  const switchMode = (newMode) => {
    playClick();
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(MODES[newMode].duration);
  };

  const toggleTimer = () => {
    playClick();
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    playClick();
    setIsRunning(false);
    setTimeLeft(MODES[mode].duration);
  };

  const skipTimer = () => {
    playClick();
    handleComplete();
  };

  const handleAmbientChange = (type) => {
    playClick();
    setAmbientSound(type);
    setAmbientNoise(type);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // SVG circular properties
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Mode Navigation Tabs */}
      <div style={{
        display: 'flex',
        background: 'rgba(10, 14, 23, 0.7)',
        padding: '0.3rem',
        borderRadius: '999px',
        border: '1px solid var(--border-subtle)',
        marginBottom: '1.5rem',
        gap: '0.25rem'
      }}>
        <button
          id="mode-work-btn"
          onClick={() => switchMode('work')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            background: mode === 'work' ? 'var(--accent-primary)' : 'transparent',
            color: mode === 'work' ? '#ffffff' : 'var(--text-muted)'
          }}
        >
          Deep Focus
        </button>
        <button
          id="mode-short-btn"
          onClick={() => switchMode('shortBreak')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            background: mode === 'shortBreak' ? 'var(--accent-secondary)' : 'transparent',
            color: mode === 'shortBreak' ? '#080b11' : 'var(--text-muted)'
          }}
        >
          Short Break
        </button>
        <button
          id="mode-long-btn"
          onClick={() => switchMode('longBreak')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            background: mode === 'longBreak' ? 'var(--accent-emerald)' : 'transparent',
            color: mode === 'longBreak' ? '#080b11' : 'var(--text-muted)'
          }}
        >
          Long Break
        </button>
      </div>

      {/* Circular Progress Ring */}
      <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="220" height="220" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="10"
          />
          {/* Animated gradient progress circle */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke={MODES[mode].color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease',
              filter: `drop-shadow(0 0 10px ${MODES[mode].glow})`
            }}
          />
        </svg>

        {/* Center Countdown Info */}
        <div style={{ position: 'absolute', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: MODES[mode].color,
            fontWeight: 700,
            marginBottom: '0.2rem'
          }}>
            {isRunning ? 'Flow Active' : 'Paused'}
          </span>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '2.8rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text-bright)'
          }}>
            {displayTime}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Sprint {sessionsCompleted + 1} of 4
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: '1.5rem' }}>
        <button
          id="reset-timer-btn"
          onClick={resetTimer}
          className="btn-icon"
          title="Reset Timer"
        >
          <RotateCcw size={17} />
        </button>

        <button
          id="toggle-timer-btn"
          onClick={toggleTimer}
          className="btn-primary"
          style={{
            padding: '0.8rem 1.8rem',
            fontSize: '1rem',
            borderRadius: '999px',
            background: isRunning 
              ? 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' 
              : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            boxShadow: isRunning 
              ? '0 4px 20px rgba(244, 63, 94, 0.4)' 
              : '0 4px 20px rgba(99, 102, 241, 0.4)'
          }}
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
          {isRunning ? 'Pause Flow' : 'Start Focus'}
        </button>

        <button
          id="skip-timer-btn"
          onClick={skipTimer}
          className="btn-icon"
          title="Skip to next session"
        >
          <SkipForward size={17} />
        </button>
      </div>

      {/* Cycle Progress dots */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
        {[0, 1, 2, 3].map((idx) => {
          const filled = (sessionsCompleted % 4) > idx || (sessionsCompleted > 0 && sessionsCompleted % 4 === 0);
          return (
            <div
              key={idx}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: filled ? '#6366f1' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: filled ? '0 0 8px #6366f1' : 'none',
                transition: 'all 0.3s ease'
              }}
              title={`Sprint ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* Ambient Sound Synthesizer Selector */}
      <div style={{
        marginTop: '1.5rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border-subtle)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <Radio size={14} color="#06b6d4" />
            <span>Ambient Focus Synth</span>
          </div>
          {ambientSound !== 'none' && (
            <div className="sound-wave">
              <div className="sound-bar" />
              <div className="sound-bar" />
              <div className="sound-bar" />
              <div className="sound-bar" />
              <div className="sound-bar" />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.35rem', width: '100%' }}>
          {[
            { id: 'none', label: 'Off' },
            { id: 'cyber', label: 'Cyber Drone' },
            { id: 'rain', label: 'Zen Rain' },
            { id: 'white', label: 'White Noise' },
          ].map((snd) => (
            <button
              key={snd.id}
              onClick={() => handleAmbientChange(snd.id)}
              style={{
                flex: 1,
                padding: '0.35rem 0.2rem',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 500,
                background: ambientSound === snd.id ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                color: ambientSound === snd.id ? '#67e8f9' : 'var(--text-dim)',
                border: ambientSound === snd.id ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent'
              }}
            >
              {snd.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Header from './components/Header';
import AIBriefing from './components/AIBriefing';
import FocusTimer from './components/FocusTimer';
import TaskManager from './components/TaskManager';
import AnalyticsPanel from './components/AnalyticsPanel';
import NotesScratchpad from './components/NotesScratchpad';
import GitModal from './components/GitModal';
import { playClick } from './utils/sound';
import './App.css';

const INITIAL_TASKS = [
  {
    id: 't-1',
    title: 'Refactor Auth Middleware to Edge Functions',
    priority: 'Critical',
    category: 'Code',
    estPomodoros: 3,
    completed: false,
    subtasks: [
      { id: '1-1', title: 'Audit JWT validation latency on cold starts', completed: true },
      { id: '1-2', title: 'Implement edge-compatible crypto token verifier', completed: false },
      { id: '1-3', title: 'Write integration regression benchmarks', completed: false },
    ]
  },
  {
    id: 't-2',
    title: 'Design Vector DB Schema for RAG Knowledge Store',
    priority: 'High',
    category: 'Architecture',
    estPomodoros: 2,
    completed: false,
    subtasks: [
      { id: '2-1', title: 'Benchmark HNSW vs IVF indexing cosine metrics', completed: true },
      { id: '2-2', title: 'Configure chunk metadata filtering schema', completed: false },
    ]
  },
  {
    id: 't-3',
    title: 'Configure GitHub Actions CI/CD Release Pipeline',
    priority: 'High',
    category: 'Code',
    estPomodoros: 2,
    completed: true,
    subtasks: [
      { id: '3-1', title: 'Create .github/workflows/deploy.yml', completed: true },
      { id: '3-2', title: 'Store repository secrets securely', completed: true },
    ]
  },
  {
    id: 't-4',
    title: 'Physiological Spinal Stretch & Hydration Break',
    priority: 'Medium',
    category: 'Health',
    estPomodoros: 1,
    completed: true,
    subtasks: [
      { id: '4-1', title: '500ml electrolyte water intake', completed: true },
      { id: '4-2', title: 'Shoulder mobility stretches', completed: true },
    ]
  },
  {
    id: 't-5',
    title: 'Synthesize Telemetry Metrics into Weekly Report',
    priority: 'Low',
    category: 'Product',
    estPomodoros: 2,
    completed: false,
    subtasks: [
      { id: '5-1', title: 'Extract LCP & interaction latency quartiles', completed: false },
      { id: '5-2', title: 'Format executive summary bullet points', completed: false },
    ]
  }
];

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isDeepFlow, setIsDeepFlow] = useState(false);
  const [isGitModalOpen, setIsGitModalOpen] = useState(false);

  // Auto Prioritize tasks
  const handleAutoPrioritize = () => {
    const priorityWeight = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    const sorted = [...tasks].sort((a, b) => {
      // Completed items sink to bottom
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      // Higher priority first
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    });
    setTasks(sorted);
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div style={{
      minHeight: '100vh',
      padding: '1.25rem 2rem',
      maxWidth: '1440px',
      margin: '0 auto',
      position: 'relative',
      filter: isDeepFlow ? 'contrast(1.05)' : 'none',
      transition: 'all 0.5s ease'
    }}>
      {/* Deep Flow Backdrop Glow */}
      {isDeepFlow && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          boxShadow: 'inset 0 0 100px rgba(99, 102, 241, 0.25)',
          zIndex: 99
        }} />
      )}

      {/* Main Header */}
      <Header
        isDeepFlow={isDeepFlow}
        setIsDeepFlow={setIsDeepFlow}
        onOpenGitModal={() => setIsGitModalOpen(true)}
        tasksCount={tasks.length}
        completedCount={completedCount}
      />

      {/* AI Cognitive Briefing */}
      <AIBriefing
        onAutoPrioritize={handleAutoPrioritize}
        tasks={tasks}
      />

      {/* Main Grid Layout */}
      <main style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 380px) 1fr',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Focus Timer & Analytics */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <FocusTimer
            onSessionComplete={() => {
              // Could notify or increment stats
            }}
          />
          <AnalyticsPanel />
        </section>

        {/* Right Column: Task Manager & Scratchpad */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <TaskManager
            tasks={tasks}
            setTasks={setTasks}
          />
          <NotesScratchpad />
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: '2.5rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        fontSize: '0.75rem',
        color: 'var(--text-dim)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
            Vite Dev Engine Online
          </span>
          <span>Git Local Workspace Active</span>
        </div>
        <div>
          ApexFlow AI Studio &bull; Next-Gen Deep Work Environment
        </div>
      </footer>

      {/* Git Upload Guide Modal */}
      <GitModal
        isOpen={isGitModalOpen}
        onClose={() => setIsGitModalOpen(false)}
      />
    </div>
  );
}

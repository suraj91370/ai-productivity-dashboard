import React, { useState } from 'react';
import { Check, Trash2, Plus, Sparkles, Filter, Search, ChevronDown, ChevronUp, Layers, Clock } from 'lucide-react';
import { playClick, playChime } from '../utils/sound';

export default function TaskManager({ tasks, setTasks }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('High');
  const [newCategory, setNewCategory] = useState('Code');
  const [newEst, setNewEst] = useState(2);
  const [expandedTask, setExpandedTask] = useState(null);

  const toggleComplete = (id) => {
    playClick();
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextState = !t.completed;
        if (nextState) playChime();
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  const deleteTask = (id, e) => {
    e.stopPropagation();
    playClick();
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    playClick();

    const newTask = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      priority: newPriority,
      category: newCategory,
      estPomodoros: Number(newEst),
      completed: false,
      subtasks: [
        { id: '1', title: 'Phase 1: Requirements & Interface spec', completed: false },
        { id: '2', title: 'Phase 2: Core implementation', completed: false },
        { id: '3', title: 'Phase 3: Verification & Edge cases', completed: false },
      ]
    };

    setTasks([newTask, ...tasks]);
    setNewTitle('');
  };

  const toggleSubtask = (taskId, subtaskId) => {
    playClick();
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextSubtasks = t.subtasks.map(st => 
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );
        return { ...t, subtasks: nextSubtasks };
      }
      return t;
    }));
  };

  // Filter & Search logic
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.category.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'active') return !t.completed;
    if (filter === 'critical') return t.priority === 'Critical';
    if (filter === 'completed') return t.completed;
    return true;
  });

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'Critical': return <span className="badge badge-rose">Critical</span>;
      case 'High': return <span className="badge badge-amber">High</span>;
      case 'Medium': return <span className="badge badge-indigo">Medium</span>;
      default: return <span className="badge badge-cyan">Low</span>;
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
      {/* Title & Filter Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={18} color="#818cf8" />
          <h2 style={{ fontSize: '1.15rem', margin: 0 }}>Smart Task Matrix</h2>
          <span className="badge badge-indigo">{tasks.filter(t => !t.completed).length} pending</span>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(10, 14, 23, 0.6)', padding: '0.25rem', borderRadius: '8px' }}>
          {['all', 'active', 'critical', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => { playClick(); setFilter(f); }}
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                background: filter === f ? 'var(--accent-primary)' : 'transparent',
                color: filter === f ? '#fff' : 'var(--text-muted)'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Quick Add Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            id="task-search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks, categories, or keywords..."
            style={{
              width: '100%',
              padding: '0.55rem 0.85rem 0.55rem 2.4rem',
              borderRadius: 'var(--sm-radius)',
              background: 'rgba(10, 14, 23, 0.5)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-bright)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Add Task Input Row */}
        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input
            id="new-task-title-input"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Capture new task or milestone..."
            style={{
              flex: '1 1 200px',
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--sm-radius)',
              background: 'rgba(10, 14, 23, 0.8)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-bright)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />

          <select
            id="new-task-priority-select"
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            style={{
              padding: '0.55rem 0.75rem',
              borderRadius: 'var(--sm-radius)',
              background: 'rgba(18, 24, 38, 0.9)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          >
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            id="new-task-category-select"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={{
              padding: '0.55rem 0.75rem',
              borderRadius: 'var(--sm-radius)',
              background: 'rgba(18, 24, 38, 0.9)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          >
            <option value="Code">Code</option>
            <option value="Architecture">Architecture</option>
            <option value="Product">Product</option>
            <option value="Health">Health</option>
          </select>

          <button
            id="add-task-submit-btn"
            type="submit"
            className="btn-primary"
            style={{ fontSize: '0.82rem', padding: '0.55rem 1rem' }}
          >
            <Plus size={15} /> Add Task
          </button>
        </form>
      </div>

      {/* Task Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', overflowY: 'auto', maxHeight: '420px', paddingRight: '0.2rem' }}>
        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            No matching tasks found. Click "Add Task" to initiate a new flow.
          </div>
        ) : (
          filteredTasks.map((t) => {
            const isExpanded = expandedTask === t.id;
            return (
              <div
                key={t.id}
                style={{
                  background: t.completed ? 'rgba(10, 14, 23, 0.4)' : 'rgba(255, 255, 255, 0.025)',
                  border: t.completed ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  opacity: t.completed ? 0.65 : 1
                }}
              >
                {/* Main Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleComplete(t.id)}
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        border: t.completed ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.2)',
                        background: t.completed ? '#10b981' : 'rgba(10, 14, 23, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                      title="Toggle completed"
                    >
                      {t.completed && <Check size={14} color="#080b11" strokeWidth={3} />}
                    </button>

                    {/* Title */}
                    <span style={{
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      color: t.completed ? 'var(--text-dim)' : 'var(--text-bright)',
                      textDecoration: t.completed ? 'line-through' : 'none'
                    }}>
                      {t.title}
                    </span>
                  </div>

                  {/* Badges & Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', background: 'rgba(255, 255, 255, 0.04)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      {t.category}
                    </span>
                    {getPriorityBadge(t.priority)}

                    {/* AI Subtasks expand toggle */}
                    {t.subtasks && (
                      <button
                        onClick={() => {
                          playClick();
                          setExpandedTask(isExpanded ? null : t.id);
                        }}
                        style={{
                          background: 'rgba(99, 102, 241, 0.1)',
                          color: '#a5b4fc',
                          padding: '0.2rem 0.45rem',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.72rem'
                        }}
                        title="AI Subtask Breakdown"
                      >
                        <Sparkles size={11} />
                        <span>AI Steps</span>
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    )}

                    {/* Delete */}
                    <button
                      onClick={(e) => deleteTask(t.id, e)}
                      style={{ background: 'transparent', color: 'var(--text-dim)', padding: '0.2rem' }}
                      title="Delete Task"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Subtask Breakdown Container */}
                {isExpanded && t.subtasks && (
                  <div style={{
                    marginTop: '0.4rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    background: 'rgba(10, 14, 23, 0.6)',
                    border: '1px dashed rgba(99, 102, 241, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}>
                    <div style={{ fontSize: '0.72rem', color: '#a5b4fc', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Sparkles size={12} />
                      <span>AI Autonomous Breakdown Steps</span>
                    </div>

                    {t.subtasks.map((st) => (
                      <div
                        key={st.id}
                        onClick={() => toggleSubtask(t.id, st.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          color: st.completed ? 'var(--text-dim)' : 'var(--text-main)',
                          textDecoration: st.completed ? 'line-through' : 'none'
                        }}
                      >
                        <div style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '3px',
                          border: st.completed ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.3)',
                          background: st.completed ? '#10b981' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {st.completed && <Check size={10} color="#000" strokeWidth={3} />}
                        </div>
                        <span>{st.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

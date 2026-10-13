import { X, Copy, Check, Terminal, ExternalLink, GitBranch, ArrowRight, ShieldCheck } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { playClick } from '../utils/sound';

export default function GitModal({ isOpen, onClose }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [username, setUsername] = useState('suraj913708');
  const [repoName, setRepoName] = useState('ai-productivity-dashboard');

  if (!isOpen) return null;

  const remoteHttps = `https://github.com/${username}/${repoName}.git`;
  const remoteSsh = `git@github.com:${username}/${repoName}.git`;

  const copyCommand = (text, idx) => {
    playClick();
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: '1. Create a Repository on GitHub',
      desc: 'Head to GitHub and create an empty repository (do NOT check "Add a README" or ".gitignore" since our project already has them).',
      link: 'https://github.com/new',
      linkText: 'Open GitHub: Create New Repo'
    },
    {
      title: '2. Link Remote Repository',
      desc: 'Connect your local Git workspace to your newly created GitHub repository.',
      cmd: `git remote add origin ${remoteHttps}`
    },
    {
      title: '3. Set Branch to main & Push',
      desc: 'Rename default branch to main and upload all code and history.',
      cmd: `git branch -M main\ngit push -u origin main`
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 7, 12, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '650px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '1.75rem',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.25)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          id="close-git-modal-btn"
          onClick={() => { playClick(); onClose(); }}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-muted)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            background: 'rgba(99, 102, 241, 0.2)',
            padding: '0.65rem',
            borderRadius: '12px',
            border: '1px solid rgba(99, 102, 241, 0.4)'
          }}>
            <GithubIcon size={24} color="#818cf8" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Upload Project to GitHub
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Step-by-step instructions and one-click commands to push your project
            </p>
          </div>
        </div>

        {/* Config Summary Card */}
        <div style={{
          background: 'rgba(10, 14, 23, 0.7)',
          padding: '1rem',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.75rem'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Detected User</div>
            <div style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{username}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Repository Target</div>
            <div style={{ fontSize: '0.9rem', color: '#a5b4fc', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{repoName}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Local Git Status</div>
            <div style={{ fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <ShieldCheck size={14} /> Initialized & Ready
            </div>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              border: '1px solid var(--border-subtle)'
            }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '0.35rem', color: 'var(--text-bright)' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                {step.desc}
              </p>

              {step.link && (
                <a
                  href={step.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ textDecoration: 'none', fontSize: '0.82rem', padding: '0.5rem 1rem', display: 'inline-flex' }}
                >
                  <ExternalLink size={14} />
                  {step.linkText}
                </a>
              )}

              {step.cmd && (
                <div style={{
                  position: 'relative',
                  background: 'rgba(7, 9, 14, 0.95)',
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: '#67e8f9',
                  whiteSpace: 'pre-wrap'
                }}>
                  <code>{step.cmd}</code>
                  <button
                    onClick={() => copyCommand(step.cmd, idx)}
                    style={{
                      position: 'absolute',
                      top: '0.65rem',
                      right: '0.65rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: 'var(--text-main)',
                      borderRadius: '6px',
                      padding: '0.3rem 0.6rem',
                      fontSize: '0.72rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    {copiedIndex === idx ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    {copiedIndex === idx ? 'Copied' : 'Copy'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', margin: 0 }}>
            Once pushed, your code will be live on GitHub at: <span style={{ color: '#38bdf8' }}>https://github.com/{username}/{repoName}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

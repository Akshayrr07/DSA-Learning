import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Editor from '@monaco-editor/react';
import { History, X, Cpu, HardDrive, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface Submission {
  id: number;
  problem_id: number;
  problem_title: string;
  problem_slug: string;
  problem_difficulty: string;
  language: string;
  code: string;
  status: string;
  runtime: number;
  memory: number;
  error_message: string;
  passed_cases: number;
  total_cases: number;
  created_at: string;
}

export const SubmissionsList: React.FC = () => {
  const { user, fetchWithAuth } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);

  const fetchSubmissions = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await fetchWithAuth('/api/submissions');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (e) {
      console.error('Failed to fetch submissions:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [user]);

  if (!user) {
    return (
      <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
        <History size={48} style={{ color: 'var(--text-dim)', marginBottom: '16px' }} />
        <h3>Submission History</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Please sign in to view your past coding submissions.
        </p>
      </div>
    );
  }

  return (
    <div className="practice-container" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      
      {loading ? (
        <div className="glass-panel" style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Loader2 className="auth-spinner" style={{ display: 'inline', marginRight: '8px' }} /> Fetching submissions...
        </div>
      ) : submissions.length === 0 ? (
        <div className="glass-panel" style={{ padding: '80px', textAlign: 'center', color: 'var(--text-dim)' }}>
          You have not made any code submissions yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {submissions.map(sub => (
            <div 
              key={sub.id} 
              className="problem-card" 
              style={{ padding: '16px 24px', cursor: 'pointer' }}
              onClick={() => setSelectedSub(sub)}
            >
              <div className="problem-card-left">
                <div className={`problem-status-icon ${sub.status === 'Accepted' ? 'status-solved' : 'status-unsolved'}`} style={{ marginRight: '8px' }}>
                  {sub.status === 'Accepted' ? <CheckCircle2 size={18} /> : <XCircle size={18} style={{ color: '#ef4444' }} />}
                </div>

                <div className="problem-info-block">
                  <div className="problem-title-row">
                    <h3 style={{ fontSize: '16px' }}>{sub.problem_title}</h3>
                    <span className={`difficulty-badge ${
                      sub.problem_difficulty === 'Easy' ? 'diff-easy' : 
                      sub.problem_difficulty === 'Medium' ? 'diff-medium' : 'diff-hard'
                    }`} style={{ fontSize: '9px', padding: '1px 6px' }}>
                      {sub.problem_difficulty}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                    <span>Language: <strong>{sub.language.toUpperCase()}</strong></span>
                    <span style={{ margin: '0 8px' }}>•</span>
                    <span>Passed: <strong>{sub.passed_cases}/{sub.total_cases}</strong> cases</span>
                  </div>
                </div>
              </div>

              <div className="problem-card-right">
                <div style={{ display: 'flex', gap: '20px', fontSize: '12px', marginRight: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{sub.runtime} ms</span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '10px' }}>Runtime</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{sub.memory} MB</span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '10px' }}>Memory</span>
                  </div>
                </div>
                
                <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                  {new Date(sub.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submission details Popup Modal */}
      {selectedSub && (
        <div className="submission-detail-overlay" onClick={() => setSelectedSub(null)}>
          <div className="submission-detail-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="submission-detail-header">
              <div>
                <h3 style={{ fontSize: '18px' }}>{selectedSub.problem_title}</h3>
                <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                  Submitted on {new Date(selectedSub.created_at).toLocaleString()}
                </span>
              </div>
              <button className="btn-icon-only" onClick={() => setSelectedSub(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="submission-detail-body">
              
              {/* Verdict header metrics */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {selectedSub.status === 'Accepted' ? (
                    <span style={{ color: 'var(--success)', fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={20} /> Accepted
                    </span>
                  ) : (
                    <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <XCircle size={20} /> {selectedSub.status}
                    </span>
                  )}
                  <span style={{ color: 'var(--text-dim)' }}>•</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Passed {selectedSub.passed_cases}/{selectedSub.total_cases} test cases
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <Cpu size={14} /> {selectedSub.runtime} ms
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <HardDrive size={14} /> {selectedSub.memory} MB
                  </span>
                </div>
              </div>

              {/* Compilation/WA Error Message */}
              {selectedSub.error_message && (
                <div>
                  <div className="console-label">Error Details:</div>
                  <div className="console-code-block" style={{ borderLeft: '3px solid #ef4444', background: '#1c1010', color: '#ffb3b3' }}>
                    {selectedSub.error_message}
                  </div>
                </div>
              )}

              {/* Submitted Code Viewer in Monaco */}
              <div>
                <div className="console-label">Submitted Code ({selectedSub.language.toUpperCase()}):</div>
                <div className="read-only-editor-container">
                  <Editor
                    height="100%"
                    language={selectedSub.language === 'javascript' ? 'javascript' : selectedSub.language === 'cpp' ? 'cpp' : selectedSub.language}
                    value={selectedSub.code}
                    theme="vs-dark"
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 13,
                      lineNumbers: 'on',
                      folding: true,
                      automaticLayout: true,
                      padding: { top: 8 }
                    }}
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default SubmissionsList;

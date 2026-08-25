import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, Play, Send, ZoomIn, ZoomOut, Maximize2, Minimize2, 
  Loader2, RotateCcw, Star, History, FileText, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SplitPane } from './SplitPane';

interface TestCase {
  input: string;
  expected_output: string;
}

interface ProblemDetail {
  id: number;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance_rate: number;
  tags: string[];
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  hints: string[];
  sample_test_cases: TestCase[];
  starter_code: Record<string, string>;
}

interface WorkspaceProps {
  problemSlug: string;
  onBack: () => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({ problemSlug, onBack }) => {
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Left Panel state
  const [leftTab, setLeftTab] = useState<'desc' | 'submissions'>('desc');
  const [problemSubmissions, setProblemSubmissions] = useState<any[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  
  // Monaco states
  const [language, setLanguage] = useState<string>('python');
  const [code, setCode] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(14);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // Console state
  const [consoleTab, setConsoleTab] = useState<'cases' | 'result'>('cases');
  const [activeTestCaseIdx, setActiveTestCaseIdx] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>('');
  const [isCustomRun, setIsCustomRun] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [runResults, setRunResults] = useState<any | null>(null);
  const [submitResult, setSubmitResult] = useState<any | null>(null);
  
  const { user, fetchWithAuth } = useAuth();
  
  // Keep track of drafts saved to server to avoid spamming POSTs
  const autoSaveTimeout = useRef<any>(null);

  // Load problem details
  const loadProblemDetails = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth(`/api/problems/${problemSlug}`);
      if (res.ok) {
        const data = await res.json();
        setProblem(data.problem);
        setBookmarked(data.bookmarked);
        
        // Load starter code or draft code
        const drafts = data.drafts || {};
        const defaultLang = 'python';
        setLanguage(defaultLang);
        
        if (drafts[defaultLang]) {
          setCode(drafts[defaultLang]);
        } else if (data.problem.starter_code && data.problem.starter_code[defaultLang]) {
          setCode(data.problem.starter_code[defaultLang]);
        }
      }
    } catch (err) {
      console.error('Failed to load problem details:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch local submissions for this problem
  const fetchSubmissions = async () => {
    if (!user || !problem) return;
    try {
      setLoadingSubmissions(true);
      const res = await fetchWithAuth('/api/submissions');
      if (res.ok) {
        const data = await res.json();
        // Filter submissions for this problem only
        const filtered = (data.submissions || []).filter((s: any) => s.problem_id === problem.id);
        setProblemSubmissions(filtered);
      }
    } catch (e) {
      console.error('Failed to load submissions:', e);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    loadProblemDetails();
  }, [problemSlug, user]);

  useEffect(() => {
    if (leftTab === 'submissions') {
      fetchSubmissions();
    }
  }, [leftTab, problem]);

  // Handle switching language (loads either draft or starter template)
  const handleLanguageChange = (newLang: string) => {
    if (!problem) return;
    
    // Save current draft first
    saveDraft(language, code);

    setLanguage(newLang);

    // Fetch new template/draft
    fetchWithAuth(`/api/problems/${problemSlug}`)
      .then(res => res.json())
      .then(data => {
        const drafts = data.drafts || {};
        if (drafts[newLang]) {
          setCode(drafts[newLang]);
        } else if (problem.starter_code && problem.starter_code[newLang]) {
          setCode(problem.starter_code[newLang]);
        } else {
          setCode('');
        }
      });
  };

  // Auto-save drafts
  const handleCodeChange = (newVal: string) => {
    setCode(newVal);
    
    // Auto-save local draft to localStorage immediately
    localStorage.setItem(`draft_${problemSlug}_${language}`, newVal);

    // Debounce backend save
    if (autoSaveTimeout.current) clearTimeout(autoSaveTimeout.current);
    autoSaveTimeout.current = setTimeout(() => {
      saveDraft(language, newVal);
    }, 2000);
  };

  const saveDraft = async (lang: string, draftCode: string) => {
    if (!user || !problem) return;
    try {
      await fetchWithAuth(`/api/problems/${problemSlug}/draft`, {
        method: 'POST',
        body: JSON.stringify({ language: lang, code: draftCode })
      });
    } catch (e) {
      console.error('Failed to auto-save draft to server:', e);
    }
  };

  const handleResetTemplate = () => {
    if (!problem) return;
    const confirmReset = window.confirm("Are you sure you want to reset the editor to the starter template? Your current edits in this language will be cleared.");
    if (confirmReset && problem.starter_code && problem.starter_code[language]) {
      setCode(problem.starter_code[language]);
      saveDraft(language, problem.starter_code[language]);
    }
  };

  const handleToggleBookmark = async () => {
    if (!user) {
      alert('Please sign in to bookmark problems.');
      return;
    }
    try {
      const res = await fetchWithAuth(`/api/problems/${problemSlug}/bookmark`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setBookmarked(data.bookmarked);
      }
    } catch (e) {
      console.error('Failed to toggle bookmark:', e);
    }
  };

  const handleRunCode = async () => {
    if (!problem) return;
    try {
      setIsExecuting(true);
      setConsoleTab('result');
      setRunResults(null);
      setSubmitResult(null);

      const res = await fetchWithAuth(`/api/problems/${problemSlug}/run`, {
        method: 'POST',
        body: JSON.stringify({
          code,
          language,
          isCustom: isCustomRun,
          customInput: isCustomRun ? customInput : ''
        })
      });

      if (res.ok) {
        const data = await res.json();
        setRunResults(data.results || []);
      }
    } catch (e) {
      console.error('Run failed:', e);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!user) {
      alert('Please sign in to submit your solution.');
      return;
    }
    if (!problem) return;
    try {
      setIsExecuting(true);
      setConsoleTab('result');
      setRunResults(null);
      setSubmitResult(null);

      const res = await fetchWithAuth(`/api/problems/${problemSlug}/submit`, {
        method: 'POST',
        body: JSON.stringify({ code, language })
      });

      if (res.ok) {
        const data = await res.json();
        setSubmitResult(data);
        
        // Confetti celebrate if Accepted!
        if (data.verdict === 'Accepted') {
          confetti({
            particleCount: 160,
            spread: 90,
            origin: { y: 0.6 }
          });
        }
      }
    } catch (e) {
      console.error('Submit failed:', e);
    } finally {
      setIsExecuting(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-panel" style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <Loader2 className="auth-spinner" style={{ display: 'inline', marginRight: '8px' }} /> Loading Workspace...
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="glass-panel" style={{ padding: '80px', textAlign: 'center' }}>
        <h3>Problem not found.</h3>
        <button className="btn btn-secondary" onClick={onBack} style={{ marginTop: '16px' }}>
          <ArrowLeft size={14} /> Back to Library
        </button>
      </div>
    );
  }

  // Resizable split panes definition
  const LeftPanel = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="workspace-tabs">
        <button 
          className={`workspace-tab-btn ${leftTab === 'desc' ? 'active' : ''}`}
          onClick={() => setLeftTab('desc')}
        >
          <FileText size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> Description
        </button>
        <button 
          className={`workspace-tab-btn ${leftTab === 'submissions' ? 'active' : ''}`}
          onClick={() => setLeftTab('submissions')}
        >
          <History size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> Submissions
        </button>
      </div>

      <div className="workspace-content-scroller">
        {leftTab === 'desc' ? (
          <div className="problem-description-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span className={`difficulty-badge ${
                problem.difficulty === 'Easy' ? 'diff-easy' : 
                problem.difficulty === 'Medium' ? 'diff-medium' : 'diff-hard'
              }`}>
                {problem.difficulty}
              </span>

              <button 
                className={`btn-bookmark ${bookmarked ? 'bookmarked' : ''}`}
                onClick={handleToggleBookmark}
                title={bookmarked ? "Remove bookmark" : "Bookmark problem"}
              >
                <Star size={18} fill={bookmarked ? "#fbbf24" : "none"} />
              </button>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800 }}>{problem.title}</h2>
            <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '24px' }}>
              Acceptance Rate: <strong>{problem.acceptance_rate}%</strong>
            </div>

            {/* Description HTML/Markdown */}
            <div style={{ fontSize: '14.5px', lineHeight: 1.7, color: 'var(--text-main)' }}>
              {problem.description.split('\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Examples */}
            {problem.examples && problem.examples.map((ex, idx) => (
              <div key={idx} style={{ marginTop: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700 }}>Example {idx + 1}:</h4>
                <div className="workspace-example-box">
                  <div className="workspace-example-title">Input:</div>
                  <div style={{ color: 'var(--text-main)', marginBottom: '8px' }}>{ex.input}</div>
                  <div className="workspace-example-title">Output:</div>
                  <div style={{ color: 'var(--text-main)', marginBottom: '8px' }}>{ex.output}</div>
                  {ex.explanation && (
                    <>
                      <div className="workspace-example-title">Explanation:</div>
                      <div style={{ color: 'var(--text-muted)' }}>{ex.explanation}</div>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Constraints */}
            {problem.constraints && problem.constraints.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700 }}>Constraints:</h4>
                <div className="workspace-constraints-list">
                  {problem.constraints.map((c, idx) => (
                    <div key={idx} className="workspace-constraint-item">{c}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Hints */}
            {problem.hints && problem.hints.length > 0 && (
              <div className="hints-accordion-wrapper">
                {problem.hints.map((hint, idx) => (
                  <details key={idx} className="hint-item-details">
                    <summary className="hint-summary">💡 Hint {idx + 1}</summary>
                    <div className="hint-content">{hint}</div>
                  </details>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Submissions List */
          <div className="submission-history-list">
            {!user ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-dim)' }}>
                Please sign in to view your submission history.
              </div>
            ) : loadingSubmissions ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-dim)' }}>
                <Loader2 className="auth-spinner" style={{ display: 'inline', marginRight: '6px' }} /> Loading history...
              </div>
            ) : problemSubmissions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-dim)' }}>
                No submissions found for this problem yet.
              </div>
            ) : (
              problemSubmissions.map(sub => (
                <div key={sub.id} className="submission-history-item">
                  <div className="submission-details-row">
                    <span className={`submission-verdict-tag ${sub.status === 'Accepted' ? 'verdict-accepted' : 'verdict-error'}`}>
                      {sub.status === 'Accepted' ? '✓ Accepted' : `✗ ${sub.status}`}
                    </span>
                    <span className="submission-meta-line">
                      {sub.language.toUpperCase()} • {sub.runtime} ms • {sub.memory} MB
                    </span>
                  </div>
                  <span className="submission-timestamp">
                    {new Date(sub.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );

  const RightPanel = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Editor toolbar */}
      <div className="editor-toolbar">
        <div className="editor-toolbar-left">
          <select 
            value={language} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="editor-select"
          >
            <option value="python">🐍 Python</option>
            <option value="javascript">🟨 JavaScript</option>
            <option value="cpp">🟦 C++</option>
            <option value="java">☕ Java</option>
            <option value="go">🐹 Go</option>
            <option value="rust">🦀 Rust</option>
          </select>

          <button className="btn-icon-only" onClick={handleResetTemplate} title="Reset starter template">
            <RotateCcw size={14} />
          </button>
        </div>

        <div className="editor-toolbar-right">
          <button className="btn-icon-only" onClick={() => setFontSize(Math.min(24, fontSize + 2))} title="Zoom In">
            <ZoomIn size={14} />
          </button>
          <button className="btn-icon-only" onClick={() => setFontSize(Math.max(10, fontSize - 2))} title="Zoom Out">
            <ZoomOut size={14} />
          </button>
          <button className="btn-icon-only" onClick={() => setIsFullscreen(!isFullscreen)} title="Fullscreen Editor">
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Editor component */}
      <div className={`monaco-editor-pane ${isFullscreen ? 'fullscreen' : ''}`}>
        {isFullscreen && (
          <button className="btn btn-secondary fullscreen-close-btn" onClick={() => setIsFullscreen(false)}>
            <Minimize2 size={14} /> Exit Fullscreen
          </button>
        )}
        <Editor
          height="100%"
          language={language === 'javascript' ? 'javascript' : language === 'cpp' ? 'cpp' : language}
          value={code}
          theme="vs-dark"
          onChange={(val) => handleCodeChange(val || '')}
          options={{
            fontSize: fontSize,
            minimap: { enabled: false },
            automaticLayout: true,
            padding: { top: 12 },
            tabSize: 4,
            cursorBlinking: 'smooth',
            smoothScrolling: true
          }}
        />
      </div>

      {/* Console output */}
      <div className="workspace-console-pane">
        <div className="console-tabs">
          <div className="console-tabs-left">
            <button 
              className={`console-tab-btn ${consoleTab === 'cases' ? 'active' : ''}`}
              onClick={() => setConsoleTab('cases')}
            >
              Test Cases
            </button>
            <button 
              className={`console-tab-btn ${consoleTab === 'result' ? 'active' : ''}`}
              onClick={() => setConsoleTab('result')}
            >
              Execution Result
            </button>
          </div>

          <div className="console-actions-right">
            <button 
              className="btn btn-secondary" 
              onClick={handleRunCode}
              disabled={isExecuting}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              {isExecuting && consoleTab === 'result' && !submitResult ? (
                <Loader2 className="auth-spinner" size={12} />
              ) : (
                <Play size={12} />
              )}
              Run Code
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleSubmitCode}
              disabled={isExecuting}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              {isExecuting && consoleTab === 'result' && submitResult ? (
                <Loader2 className="auth-spinner" size={12} />
              ) : (
                <Send size={12} />
              )}
              Submit
            </button>
          </div>
        </div>

        <div className="console-content-area">
          {consoleTab === 'cases' ? (
            /* Test Cases Input */
            <div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                <button 
                  className={`console-case-btn ${!isCustomRun ? 'active' : ''}`}
                  onClick={() => setIsCustomRun(false)}
                >
                  Sample Cases
                </button>
                <button 
                  className={`console-case-btn ${isCustomRun ? 'active' : ''}`}
                  onClick={() => setIsCustomRun(true)}
                >
                  Custom Test Case
                </button>
              </div>

              {!isCustomRun ? (
                <>
                  <div className="console-testcases-tabs">
                    {problem.sample_test_cases.map((_, idx) => (
                      <button
                        key={idx}
                        className={`console-case-btn ${activeTestCaseIdx === idx ? 'active' : ''}`}
                        onClick={() => setActiveTestCaseIdx(idx)}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>
                  {problem.sample_test_cases[activeTestCaseIdx] && (
                    <div>
                      <div className="console-label">Input:</div>
                      <div className="console-code-block">
                        {problem.sample_test_cases[activeTestCaseIdx].input}
                      </div>
                      <div className="console-label">Expected Output:</div>
                      <div className="console-code-block">
                        {problem.sample_test_cases[activeTestCaseIdx].expected_output}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <div className="console-label">Enter Custom Input (stdin):</div>
                  <textarea 
                    className="console-textarea" 
                    placeholder="E.g., [2,7,11,15]\n9"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                  />
                </div>
              )}
            </div>
          ) : (
            /* Results Panel */
            <div style={{ fontSize: '13.5px' }}>
              {isExecuting ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 0', color: 'var(--text-muted)' }}>
                  <Loader2 className="auth-spinner" size={24} style={{ marginBottom: '8px' }} />
                  <span>Evaluating code submissions... Please wait...</span>
                </div>
              ) : submitResult ? (
                /* Submit Verdict Output */
                <div>
                  <div className="verdict-header-block">
                    <span className={`verdict-title ${submitResult.verdict === 'Accepted' ? 'verdict-accepted' : 'verdict-error'}`}>
                      {submitResult.verdict === 'Accepted' ? '✓ Accepted' : `✗ ${submitResult.verdict}`}
                    </span>
                    <span style={{ color: 'var(--text-dim)' }}>•</span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      Passed {submitResult.passed_cases}/{submitResult.total_cases} cases
                    </span>
                  </div>

                  <div className="metrics-row" style={{ marginBottom: '16px' }}>
                    <div className="metric-card-block">
                      <span className="metric-label">Runtime</span>
                      <span className="metric-value">{submitResult.runtime} ms</span>
                    </div>
                    <div className="metric-card-block">
                      <span className="metric-label">Memory</span>
                      <span className="metric-value">{submitResult.memory} MB</span>
                    </div>
                  </div>

                  {submitResult.error_message && (
                    <div>
                      <div className="console-label">Execution details / Errors:</div>
                      <div className="console-code-block" style={{ borderLeftColor: '#ef4444' }}>
                        {submitResult.error_message}
                      </div>
                    </div>
                  )}
                </div>
              ) : runResults ? (
                /* Run Result cases Output */
                <div>
                  <div className="console-testcases-tabs">
                    {runResults.map((res: any, idx: number) => (
                      <button
                        key={idx}
                        className={`console-case-btn ${activeTestCaseIdx === idx ? 'active' : ''}`}
                        onClick={() => setActiveTestCaseIdx(idx)}
                      >
                        Case {idx + 1} 
                        <span className={`case-result-badge ${res.passed ? 'case-passed' : 'case-failed'}`}>
                          {res.passed ? 'AC' : 'WA'}
                        </span>
                      </button>
                    ))}
                  </div>

                  {runResults[activeTestCaseIdx] && (
                    <div>
                      <div className="metrics-row" style={{ marginBottom: '12px' }}>
                        <div className="metric-card-block" style={{ padding: '4px 12px' }}>
                          <span className="metric-label">Runtime</span>
                          <span className="metric-value" style={{ fontSize: '13px' }}>{runResults[activeTestCaseIdx].time} ms</span>
                        </div>
                        <div className="metric-card-block" style={{ padding: '4px 12px' }}>
                          <span className="metric-label">Memory</span>
                          <span className="metric-value" style={{ fontSize: '13px' }}>{runResults[activeTestCaseIdx].memory} MB</span>
                        </div>
                        <div className="metric-card-block" style={{ padding: '4px 12px' }}>
                          <span className="metric-label">Status</span>
                          <span className="metric-value" style={{ fontSize: '13px', color: runResults[activeTestCaseIdx].passed ? 'var(--success)' : '#ef4444' }}>
                            {runResults[activeTestCaseIdx].status}
                          </span>
                        </div>
                      </div>

                      <div className="side-comparison-grid">
                        <div>
                          <div className="console-label">Expected Output:</div>
                          <div className="console-code-block">{runResults[activeTestCaseIdx].expected || '(none)'}</div>
                        </div>
                        <div>
                          <div className="console-label">Actual Output:</div>
                          <div className="console-code-block" style={{ borderColor: runResults[activeTestCaseIdx].passed ? 'var(--success-glow)' : 'rgba(239,68,68,0.2)' }}>
                            {runResults[activeTestCaseIdx].actual || '(none)'}
                          </div>
                        </div>
                      </div>

                      {runResults[activeTestCaseIdx].stdout && (
                        <div>
                          <div className="console-label">Stdout:</div>
                          <div className="console-code-block">{runResults[activeTestCaseIdx].stdout}</div>
                        </div>
                      )}
                      
                      {runResults[activeTestCaseIdx].stderr && (
                        <div>
                          <div className="console-label">Stderr / Compilation details:</div>
                          <div className="console-code-block" style={{ color: '#ef4444' }}>{runResults[activeTestCaseIdx].stderr}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-dim)' }}>
                  Submit code or run tests to view execution results.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Workspace Top Row Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Arena
        </button>

        <h3 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
          <ChevronRight size={16} /> {problem.title}
        </h3>
      </div>

      {/* Resizable panels container */}
      <SplitPane left={LeftPanel} right={RightPanel} />
    </div>
  );
};

export default Workspace;

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Compass,
  Gamepad2,
  Sparkles,
  Sun,
  Moon,
  Info,
  GraduationCap,
  User,
  LogOut,
  Code2,
  History
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// Import our custom sub-components
import { Roadmap } from './components/Roadmap';
import { ModuleDetail } from './components/ModuleDetail';
import { AlgorithmSimulator } from './components/AlgorithmSimulator';
import { AuthModal } from './components/AuthModal';
import { useAuth } from './context/AuthContext';

// Import our new competitive programming components
import { ProblemArena } from './components/ProblemArena';
import { Workspace } from './components/Workspace';
import { Profile } from './components/Profile';
import { SubmissionsList } from './components/SubmissionsList';
import './practice.css';

// Import our parsed static JSON dataset
import dsaDataRaw from './data/dsa-data.json';

interface CodeFile {
  name: string;
  content: string;
}

interface LanguageData {
  python?: CodeFile[];
  cpp?: CodeFile[];
  java?: CodeFile[];
  js?: CodeFile[];
}

interface Module {
  id: string;
  title: string;
  readme: string;
  topics: Record<string, LanguageData>;
}

interface DsaDataset {
  masterReadme: string;
  modules: Module[];
}

const dsaData = dsaDataRaw as unknown as DsaDataset;

function App() {
  const [activeView, setActiveView] = useState<'roadmap' | 'simulator' | 'about' | 'module' | 'practice' | 'workspace' | 'submissions' | 'profile'>('roadmap');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedProblemSlug, setSelectedProblemSlug] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const { user, logout, loading: authLoading, fetchWithAuth } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('dsa_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
    }
  }, []);

  // Sync completion status when user status changes (mount / login / logout)
  useEffect(() => {
    const syncUserProgress = async () => {
      if (user) {
        try {
          const res = await fetchWithAuth('/api/progress');
          if (res.ok) {
            const data = await res.json();
            setCompletedModules(data.completedModules || []);
            localStorage.setItem('dsa_completed_modules', JSON.stringify(data.completedModules || []));
          }
        } catch (e) {
          console.error('Failed to sync progress with server:', e);
        }
      } else {
        // Fallback to guest mode
        const savedCompleted = localStorage.getItem('dsa_completed_modules');
        if (savedCompleted) {
          try {
            setCompletedModules(JSON.parse(savedCompleted));
          } catch (e) {
            console.error('Failed to parse cached progress:', e);
          }
        } else {
          setCompletedModules([]);
        }
      }
    };

    syncUserProgress();
  }, [user]);

  const handleToggleComplete = async (moduleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isAlreadyCompleted = completedModules.includes(moduleId);
    let newCompleted: string[];

    if (isAlreadyCompleted) {
      newCompleted = completedModules.filter(id => id !== moduleId);
    } else {
      newCompleted = [...completedModules, moduleId];
      // Celebrate completion!
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981']
      });
    }

    setCompletedModules(newCompleted);
    localStorage.setItem('dsa_completed_modules', JSON.stringify(newCompleted));

    // Save to server if authenticated
    if (user) {
      try {
        await fetchWithAuth('/api/progress', {
          method: 'POST',
          body: JSON.stringify({ completedModules: newCompleted })
        });
      } catch (err) {
        console.error('Failed to update progress on server:', err);
      }
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('dsa_theme', nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  const handleSelectModule = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setActiveView('module');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeModule = dsaData.modules.find(m => m.id === selectedModuleId) || null;

  // 1. Initial Session Verification Screen
  if (authLoading) {
    return (
      <div className="auth-page-container" style={{ gap: '16px' }}>
        <GraduationCap size={48} style={{ color: 'var(--primary)' }} />
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: 0 }}>DSA Learning</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
          <Loader2 size={18} className="auth-spinner" style={{ color: 'var(--primary)' }} /> Verifying session...
        </div>
      </div>
    );
  }

  // 2. Mandatory Authentication Gate: User MUST log in or sign up before accessing the webpage
  if (!user) {
    return (
      <div className="auth-page-container">
        <div style={{ marginBottom: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <GraduationCap size={40} style={{ color: 'var(--primary)' }} />
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', margin: 0 }}>DSA</h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0, maxWidth: '400px' }}>
            Interactive Multi-Language Algorithm Learning & Progress Tracker
          </p>
        </div>
        <AuthModal isStandalone={true} />
      </div>
    );
  }

  // 3. User is authenticated -> Render full web application
  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-section">
          <GraduationCap size={32} style={{ color: 'var(--primary)' }} />
          <h2 className="logo-title">DSA</h2>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-nav-btn ${activeView === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveView('roadmap')}
          >
            <Compass size={18} /> Roadmap Dashboard
          </button>
          <button
            className={`sidebar-nav-btn ${activeView === 'simulator' ? 'active' : ''}`}
            onClick={() => setActiveView('simulator')}
          >
            <Gamepad2 size={18} /> Concept Simulator
          </button>
          <button
            className={`sidebar-nav-btn ${activeView === 'practice' || activeView === 'workspace' ? 'active' : ''}`}
            onClick={() => setActiveView('practice')}
          >
            <Code2 size={18} /> Practice Arena
          </button>
          <button
            className={`sidebar-nav-btn ${activeView === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveView('submissions')}
          >
            <History size={18} /> My Submissions
          </button>
          <button
            className={`sidebar-nav-btn ${activeView === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveView('profile')}
          >
            <User size={18} /> User Profile
          </button>
          <button
            className={`sidebar-nav-btn ${activeView === 'about' ? 'active' : ''}`}
            onClick={() => setActiveView('about')}
          >
            <Info size={18} /> About DSA
          </button>
        </nav>

        {/* Quick modules list */}
        <div className="sidebar-module-list">
          <h3 className="sidebar-module-heading">Learning Modules</h3>
          {dsaData.modules.map(m => {
            const isCompleted = completedModules.includes(m.id);
            const isActive = activeView === 'module' && selectedModuleId === m.id;
            return (
              <div
                key={m.id}
                className={`sidebar-module-item ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectModule(m.id)}
                title={m.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}
              >
                <span>{m.title.replace(/^\d{2}\.\s/, '')}</span>
                {isCompleted && (
                  <span style={{
                    fontSize: '10px',
                    color: 'var(--success)',
                    background: 'var(--success-glow)',
                    padding: '1px 4px',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer info in sidebar */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'var(--text-dim)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> Repository
            </a>
          </div>
          <span>Built for Akshay</span>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="main-workspace">
        {/* Top Header Dashboard Panel */}
        <header className="dashboard-header">
          <div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              INTERACTIVE DSA
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800 }}>
              {activeView === 'roadmap' && "Curriculum Roadmap"}
              {activeView === 'simulator' && "Algorithm Visual Playground"}
<<<<<<< HEAD
  { activeView === 'practice' && "Coding Practice Arena" }
  { activeView === 'workspace' && "Problem Solving Arena" }
  { activeView === 'submissions' && "My Submission Logs" }
  { activeView === 'profile' && "User Profile Dashboard" }
  { activeView === 'about' && "About Vault & Ecosystem" }
=======
              {activeView === 'about' && "About DSA & Ecosystem"}
>>>>>>> 067bda4f19deebc96549f5079edd415645609115
  { activeView === 'module' && activeModule && activeModule.title }
            </h2 >
          </div >

    <div className="header-actions">
      {/* Theme Toggle Button */}
      <button className="btn-icon-only" onClick={toggleTheme} title="Toggle Theme mode">
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Celebrate Button */}
      <button
        className="btn btn-secondary"
        onClick={() => {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
        }}
        title="Celebrate progress!"
      >
        <Sparkles size={16} /> Celebrate
      </button>

      {/* Auth / Profile Actions */}
      {!authLoading && (
        user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="user-profile-btn"
              title={`Logged in as ${user?.username || user?.email || 'User'}`}
              style={{ cursor: 'default' }}
            >
              <User size={14} />
              <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.username || (user?.email ? user.email.split('@')[0] : 'User')}
              </span>
            </button>
            <button
              className="btn btn-secondary"
              onClick={logout}
              title="Sign Out"
              style={{ padding: '8px' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => setIsAuthModalOpen(true)}
            title="Sign in to save progress"
          >
            <User size={16} /> Sign In
          </button>
        )
      )}
    </div>
        </header >

    {/* Dynamic Route Switcher */ }
  {
    activeView === 'roadmap' && (
      <Roadmap
        modules={dsaData.modules}
        completedModules={completedModules}
        activeModuleId={selectedModuleId}
        onSelectModule={handleSelectModule}
        onToggleComplete={handleToggleComplete}
      />
    )
  }

  {
    activeView === 'simulator' && (
      <AlgorithmSimulator />
    )
  }

  {
    activeView === 'practice' && (
      <ProblemArena
        onSelectProblem={(slug) => {
          setSelectedProblemSlug(slug);
          setActiveView('workspace');
        }}
      />
    )
  }

  {
    activeView === 'workspace' && selectedProblemSlug && (
      <Workspace
        problemSlug={selectedProblemSlug}
        onBack={() => setActiveView('practice')}
      />
    )
  }

  {
    activeView === 'submissions' && (
      <SubmissionsList />
    )
  }

  {
    activeView === 'profile' && (
      <Profile
        onSelectProblem={(slug) => {
          setSelectedProblemSlug(slug);
          setActiveView('workspace');
        }}
      />
    )
  }

  {
    activeView === 'about' && (
      <div className="glass-panel markdown-body" style={{ padding: '40px', textAlign: 'left' }}>
        {dsaData.masterReadme ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {dsaData.masterReadme}
          </ReactMarkdown>
        ) : (
          <div>
            <h2>Multi-Language DSA Learning</h2>
            <p>Welcome to your learning dashboard. Use the sidebar to navigate topics, run code simulations, and keep track of your curriculum progression.</p>
          </div>
        )}
      </div>
    )
  }

  {
    activeView === 'module' && activeModule && (
      <ModuleDetail
        module={activeModule}
        onBack={() => setActiveView('roadmap')}
        isCompleted={completedModules.includes(activeModule.id)}
        onToggleComplete={(e) => handleToggleComplete(activeModule.id, e)}
      />
    )
  }
      </main >

    {/* Authentication Modal */ }
    < AuthModal
  isOpen = { isAuthModalOpen }
  onClose = {() => setIsAuthModalOpen(false)
} 
      />
    </div >
  );
}

export default App;

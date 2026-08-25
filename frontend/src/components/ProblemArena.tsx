import React, { useState, useEffect } from 'react';
import { Search, Star, CheckCircle, HelpCircle, Trophy, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance_rate: number;
  tags: string[];
  solved: boolean;
  bookmarked: boolean;
}

interface ProblemArenaProps {
  onSelectProblem: (slug: string) => void;
}

export const ProblemArena: React.FC<ProblemArenaProps> = ({ onSelectProblem }) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [allTags, setAllTags] = useState<string[]>([]);
  
  const { user, fetchWithAuth } = useAuth();

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth('/api/problems');
      if (res.ok) {
        const data = await res.json();
        setProblems(data.problems || []);

        // Extract all unique tags
        const tagsSet = new Set<string>();
        (data.problems || []).forEach((p: Problem) => {
          p.tags.forEach(t => tagsSet.add(t));
        });
        setAllTags(Array.from(tagsSet));
      }
    } catch (e) {
      console.error('Failed to load problems:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [user]);

  const handleToggleBookmark = async (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      alert('Please sign in to bookmark problems.');
      return;
    }

    try {
      const res = await fetchWithAuth(`/api/problems/${slug}/bookmark`, {
        method: 'POST'
      });
      if (res.ok) {
        const data = await res.json();
        // Update local problems state
        setProblems(prev => prev.map(p => {
          if (p.slug === slug) {
            return { ...p, bookmarked: data.bookmarked };
          }
          return p;
        }));
      }
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

  // Stats calculations
  const stats = {
    total: problems.length,
    solved: problems.filter(p => p.solved).length,
    Easy: {
      solved: problems.filter(p => p.difficulty === 'Easy' && p.solved).length,
      total: problems.filter(p => p.difficulty === 'Easy').length
    },
    Medium: {
      solved: problems.filter(p => p.difficulty === 'Medium' && p.solved).length,
      total: problems.filter(p => p.difficulty === 'Medium').length
    },
    Hard: {
      solved: problems.filter(p => p.difficulty === 'Hard' && p.solved).length,
      total: problems.filter(p => p.difficulty === 'Hard').length
    }
  };

  // Filter problems
  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag);

    return matchesSearch && matchesDifficulty && matchesTag;
  });

  return (
    <div className="practice-container">
      {/* Search and Filters */}
      <div className="search-filters-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-pos" />
          <input 
            type="text" 
            placeholder="Search problems by name or tag..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select 
          value={selectedDifficulty} 
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="editor-select"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">🟢 Easy</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Hard">🔴 Hard</option>
        </select>

        <select 
          value={selectedTag} 
          onChange={(e) => setSelectedTag(e.target.value)}
          className="editor-select"
        >
          <option value="All">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        {user && (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <strong>Session Active:</strong> Solved {stats.solved}/{stats.total}
          </div>
        )}
      </div>

      <div className="practice-header-grid">
        {/* Main Problems List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-dim)' }}>
              Loading problem library...
            </div>
          ) : filteredProblems.length === 0 ? (
            <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-dim)' }}>
              No problems found matching search criteria.
            </div>
          ) : (
            <div className="problems-list-grid">
              {filteredProblems.map(p => (
                <div 
                  key={p.id} 
                  className="problem-card"
                  onClick={() => onSelectProblem(p.slug)}
                >
                  <div className="problem-card-left">
                    <div className={`problem-status-icon ${p.solved ? 'status-solved' : 'status-unsolved'}`}>
                      {p.solved ? <CheckCircle size={18} /> : <HelpCircle size={18} />}
                    </div>

                    <div className="problem-info-block">
                      <div className="problem-title-row">
                        <h3>{p.title}</h3>
                        <span className={`difficulty-badge ${
                          p.difficulty === 'Easy' ? 'diff-easy' : 
                          p.difficulty === 'Medium' ? 'diff-medium' : 'diff-hard'
                        }`}>
                          {p.difficulty}
                        </span>
                      </div>
                      
                      <div className="problem-tags-row">
                        {p.tags.map(t => (
                          <span key={t} className="problem-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="problem-card-right">
                    <div className="problem-stat-item">
                      <span className="problem-stat-val">{p.acceptance_rate}%</span>
                      <span className="problem-stat-lbl">Acceptance</span>
                    </div>

                    <button 
                      className={`btn-bookmark ${p.bookmarked ? 'bookmarked' : ''}`}
                      onClick={(e) => handleToggleBookmark(p.slug, e)}
                      title={p.bookmarked ? "Remove Bookmark" : "Bookmark Problem"}
                    >
                      <Star size={16} fill={p.bookmarked ? "#fbbf24" : "none"} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Statistics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Trophy size={18} style={{ color: '#fbbf24' }} /> Progress Tracker
            </h3>

            <div className="profile-progress-block">
              {/* Easy Progress */}
              <div className="profile-progress-row">
                <div className="profile-progress-header">
                  <span style={{ color: 'var(--success)' }}>Easy</span>
                  <span>{stats.Easy.solved} / {stats.Easy.total}</span>
                </div>
                <div className="progress-track-bar">
                  <div 
                    className="progress-fill-bar fill-easy" 
                    style={{ width: `${stats.Easy.total > 0 ? (stats.Easy.solved / stats.Easy.total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Medium Progress */}
              <div className="profile-progress-row">
                <div className="profile-progress-header">
                  <span style={{ color: '#f59e0b' }}>Medium</span>
                  <span>{stats.Medium.solved} / {stats.Medium.total}</span>
                </div>
                <div className="progress-track-bar">
                  <div 
                    className="progress-fill-bar fill-medium" 
                    style={{ width: `${stats.Medium.total > 0 ? (stats.Medium.solved / stats.Medium.total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Hard Progress */}
              <div className="profile-progress-row">
                <div className="profile-progress-header">
                  <span style={{ color: '#ef4444' }}>Hard</span>
                  <span>{stats.Hard.solved} / {stats.Hard.total}</span>
                </div>
                <div className="progress-track-bar">
                  <div 
                    className="progress-fill-bar fill-hard" 
                    style={{ width: `${stats.Hard.total > 0 ? (stats.Hard.solved / stats.Hard.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={16} /> Guidelines
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Select any problem to enter the coding sandbox. Write code, execute against sample cases, and submit to verify solution validity.
            </p>
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '12px', fontSize: '12px', color: 'var(--text-dim)' }}>
              🔑 Sign in to persist submission history and bookmarks across browser sessions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemArena;

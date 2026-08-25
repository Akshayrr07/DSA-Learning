import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, BookMarked, Code2, Award, Calendar, Loader2 } from 'lucide-react';

interface ProfileStats {
  difficultyStats: {
    Easy: { solved: number; total: number };
    Medium: { solved: number; total: number };
    Hard: { solved: number; total: number };
  };
  bookmarks: Array<{ id: number; title: string; slug: string; difficulty: string; acceptance_rate: number }>;
  activityHeatmap: Record<string, number>;
  skillTags: Record<string, number>;
}

interface ProfileProps {
  onSelectProblem: (slug: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onSelectProblem }) => {
  const { user, fetchWithAuth } = useAuth();
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfileStats = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await fetchWithAuth('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error('Failed to load profile stats:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileStats();
  }, [user]);

  if (!user) {
    return (
      <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
        <User size={48} style={{ color: 'var(--text-dim)', marginBottom: '16px' }} />
        <h3>Profile Dashboard</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Please sign in to view your progress, solved stats, bookmarks, and contribution history.
        </p>
      </div>
    );
  }

  if (loading || !stats) {
    return (
      <div className="glass-panel" style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <Loader2 className="auth-spinner" style={{ display: 'inline', marginRight: '8px' }} /> Loading Profile Stats...
      </div>
    );
  }

  // Calculate overall metrics
  const totalSolved = stats.difficultyStats.Easy.solved + 
                      stats.difficultyStats.Medium.solved + 
                      stats.difficultyStats.Hard.solved;
  
  const totalProblems = stats.difficultyStats.Easy.total + 
                        stats.difficultyStats.Medium.total + 
                        stats.difficultyStats.Hard.total;

  // Generate last 365 days of activity cells
  const generateHeatmapDays = () => {
    const today = new Date();
    const days = [];
    
    // We want to align the grid starting exactly 364 days ago (52 weeks)
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = stats.activityHeatmap[dateStr] || 0;
      
      let level = 'level-0';
      if (count > 0 && count <= 2) level = 'level-1';
      else if (count > 2 && count <= 4) level = 'level-2';
      else if (count > 4 && count <= 7) level = 'level-3';
      else if (count > 7) level = 'level-4';

      days.push({
        date: dateStr,
        count,
        level,
        dayOfWeek: d.getDay(),
        month: d.toLocaleString('default', { month: 'short' }),
        dateNum: d.getDate()
      });
    }
    return days;
  };

  const heatmapDays = generateHeatmapDays();

  // Pick out month labels at beginning of weeks (Sundays)
  const getMonthLabels = () => {
    const labels: Array<{ index: number; label: string }> = [];
    let prevMonth = '';
    
    heatmapDays.forEach((day, idx) => {
      // Look for sunday cells to start new column labels
      if (day.dayOfWeek === 0) {
        if (day.month !== prevMonth) {
          labels.push({ index: Math.floor(idx / 7), label: day.month });
          prevMonth = day.month;
        }
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <div className="practice-container" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <div className="profile-stats-grid">
        
        {/* User profile Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel profile-card-container">
            <div className="profile-avatar-circle">
              <User size={36} />
            </div>
            
            <span className="profile-email-text">{user.email.split('@')[0]}</span>
            <span className="profile-role-badge">Premium Vault Coder</span>

            <div className="profile-stats-summary-card">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--secondary)' }}>
                  {totalSolved} <span style={{ fontSize: '14px', color: 'var(--text-dim)', fontWeight: 500 }}>/ {totalProblems}</span>
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Solved
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>
                  {stats.bookmarks.length}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Bookmarks
                </span>
              </div>
            </div>
          </div>

          {/* Solved details by difficulty */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Award size={16} style={{ color: 'var(--primary)' }} /> Solved Breakdown
            </h3>
            
            <div className="profile-progress-block">
              {/* Easy Progress */}
              <div className="profile-progress-row">
                <div className="profile-progress-header">
                  <span style={{ color: 'var(--success)' }}>Easy</span>
                  <span>{stats.difficultyStats.Easy.solved} / {stats.difficultyStats.Easy.total}</span>
                </div>
                <div className="progress-track-bar">
                  <div 
                    className="progress-fill-bar fill-easy" 
                    style={{ width: `${stats.difficultyStats.Easy.total > 0 ? (stats.difficultyStats.Easy.solved / stats.difficultyStats.Easy.total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Medium Progress */}
              <div className="profile-progress-row">
                <div className="profile-progress-header">
                  <span style={{ color: '#f59e0b' }}>Medium</span>
                  <span>{stats.difficultyStats.Medium.solved} / {stats.difficultyStats.Medium.total}</span>
                </div>
                <div className="progress-track-bar">
                  <div 
                    className="progress-fill-bar fill-medium" 
                    style={{ width: `${stats.difficultyStats.Medium.total > 0 ? (stats.difficultyStats.Medium.solved / stats.difficultyStats.Medium.total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Hard Progress */}
              <div className="profile-progress-row">
                <div className="profile-progress-header">
                  <span style={{ color: '#ef4444' }}>Hard</span>
                  <span>{stats.difficultyStats.Hard.solved} / {stats.difficultyStats.Hard.total}</span>
                </div>
                <div className="progress-track-bar">
                  <div 
                    className="progress-fill-bar fill-hard" 
                    style={{ width: `${stats.difficultyStats.Hard.total > 0 ? (stats.difficultyStats.Hard.solved / stats.difficultyStats.Hard.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar heatmap & details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Submission Heatmap */}
          <div className="glass-panel glow-effect" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Calendar size={16} style={{ color: 'var(--secondary)' }} /> Submission Activity Heatmap
            </h3>

            <div className="heatmap-container">
              <div className="heatmap-scroll-wrapper">
                
                {/* Month labels at top */}
                <div style={{ display: 'flex', position: 'relative', height: '16px', marginLeft: '28px', fontSize: '10px', color: 'var(--text-dim)', marginBottom: '4px' }}>
                  {monthLabels.map((lbl, idx) => (
                    <span 
                      key={idx} 
                      style={{ 
                        position: 'absolute', 
                        left: `${lbl.index * 13}px`,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {lbl.label}
                    </span>
                  ))}
                </div>

                {/* Day labels + cell grid */}
                <div style={{ display: 'flex' }}>
                  {/* Left Column Labels */}
                  <div className="heatmap-day-label-column">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>

                  {/* Grid blocks */}
                  <div className="heatmap-grid-layout">
                    {heatmapDays.map((day, idx) => (
                      <div 
                        key={idx} 
                        className={`heatmap-cell ${day.level}`}
                        title={`${day.date}: ${day.count} submissions`}
                      />
                    ))}
                  </div>
                </div>

                {/* Heatmap Legend */}
                <div className="heatmap-legend-row">
                  <span>Less</span>
                  <div className="heatmap-cell level-0" />
                  <div className="heatmap-cell level-1" />
                  <div className="heatmap-cell level-2" />
                  <div className="heatmap-cell level-3" />
                  <div className="heatmap-cell level-4" />
                  <span>More</span>
                </div>

              </div>
            </div>
          </div>

          {/* Bookmarks & Skill Tags */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            {/* Bookmarked lists */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <BookMarked size={16} /> Bookmarked Problems
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto', flex: 1 }}>
                {stats.bookmarks.length === 0 ? (
                  <span style={{ fontSize: '13px', color: 'var(--text-dim)', padding: '20px 0', textAlign: 'center' }}>
                    No bookmarked problems.
                  </span>
                ) : (
                  stats.bookmarks.map(bm => (
                    <div 
                      key={bm.id} 
                      className="sidebar-module-item" 
                      onClick={() => onSelectProblem(bm.slug)}
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '10px 12px',
                        cursor: 'pointer',
                        borderRadius: '6px'
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: '13px' }}>{bm.title}</span>
                      <span className={`difficulty-badge ${
                        bm.difficulty === 'Easy' ? 'diff-easy' : 
                        bm.difficulty === 'Medium' ? 'diff-medium' : 'diff-hard'
                      }`} style={{ fontSize: '9px', padding: '1px 4px' }}>
                        {bm.difficulty}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Skill tags list */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Code2 size={16} /> Top Concept Skills
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '250px', overflowY: 'auto', alignContent: 'flex-start', flex: 1 }}>
                {Object.keys(stats.skillTags).length === 0 ? (
                  <span style={{ fontSize: '13px', color: 'var(--text-dim)', padding: '20px 0', textAlign: 'center', width: '100%' }}>
                    Solve problems to build up skill tags.
                  </span>
                ) : (
                  Object.entries(stats.skillTags)
                    .sort((a, b) => b[1] - a[1])
                    .map(([tag, count]) => (
                      <span key={tag} className="skill-tag-pill">
                        {tag} <span className="skill-tag-count">{count}</span>
                      </span>
                    ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { BookOpen, Code2, ArrowLeft, CheckCircle } from 'lucide-react';
import { CodeViewer } from './CodeViewer';

interface Module {
  id: string;
  title: string;
  readme: string;
  topics: Record<string, any>;
}

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
  isCompleted: boolean;
  onToggleComplete: (e: React.MouseEvent) => void;
}

export const ModuleDetail: React.FC<ModuleDetailProps> = ({
  module,
  onBack,
  isCompleted,
  onToggleComplete
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'code'>('notes');

  return (
    <div className="module-layout">
      {/* Back button and status heading */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Roadmap
        </button>
        
        <button 
          onClick={onToggleComplete}
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
          style={{
            borderColor: isCompleted ? 'var(--success)' : 'transparent',
            color: isCompleted ? 'var(--success)' : '#fff'
          }}
        >
          <CheckCircle size={16} />
          {isCompleted ? 'Module Completed' : 'Mark as Completed'}
        </button>
      </div>

      {/* Module Title Box */}
      <div className="module-header-box glass-panel glow-effect">
        <div className="module-title-row">
          <h2 style={{ fontSize: '28px' }}>{module.title}</h2>
          <span style={{ 
            fontSize: '12px', 
            background: 'var(--primary-glow)', 
            color: 'var(--primary)', 
            padding: '4px 10px', 
            borderRadius: '6px',
            fontWeight: 700 
          }}>
            {Object.keys(module.topics).length} Topics Available
          </span>
        </div>
        <p className="module-desc">
          Browse conceptual explanations, runtime complexities, and multi-language file implementations.
        </p>

        {/* View switching tabs */}
        <div className="module-tabs">
          <button 
            className={`module-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            <BookOpen size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
            Concept Notes (README)
          </button>
          <button 
            className={`module-tab-btn ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <Code2 size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
            Code Implementations
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div style={{ marginTop: '8px' }}>
        {activeTab === 'notes' ? (
          <div className="glass-panel markdown-body" style={{ padding: '32px' }}>
            {module.readme ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {module.readme}
              </ReactMarkdown>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
                No concept notes README available for this module.
              </div>
            )}
          </div>
        ) : (
          <CodeViewer topics={module.topics} />
        )}
      </div>
    </div>
  );
};

export default ModuleDetail;

import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Columns, Eye } from 'lucide-react';

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

interface CodeViewerProps {
  topics: Record<string, LanguageData>;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ topics }) => {
  const topicList = Object.keys(topics);
  
  // State for active selections
  const [selectedTopic, setSelectedTopic] = useState<string>(topicList[0] || '');
  const [activeLang, setActiveLang] = useState<'python' | 'cpp' | 'java' | 'js'>('python');
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  
  // Side-by-side comparison state
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [compareLang, setCompareLang] = useState<'python' | 'cpp' | 'java' | 'js'>('cpp');
  const [compareFileIndex, setCompareFileIndex] = useState<number>(0);

  // Copy success states
  const [copiedMain, setCopiedMain] = useState<boolean>(false);
  const [copiedCompare, setCopiedCompare] = useState<boolean>(false);

  // Auto-reset selection when topic changes
  useEffect(() => {
    if (topicList.length > 0 && !selectedTopic) {
      setSelectedTopic(topicList[0]);
    }
  }, [topics, topicList, selectedTopic]);

  useEffect(() => {
    setSelectedFileIndex(0);
    setCompareFileIndex(0);
  }, [selectedTopic]);

  const activeTopicData = topics[selectedTopic] || {};

  // Helper to get files for a given language in active topic
  const getFilesForLang = (lang: 'python' | 'cpp' | 'java' | 'js'): CodeFile[] => {
    return activeTopicData[lang] || [];
  };

  const mainFiles = getFilesForLang(activeLang);
  const mainFile = mainFiles[selectedFileIndex] || null;

  const compareFiles = getFilesForLang(compareLang);
  const compareFile = compareFiles[compareFileIndex] || null;

  const handleCopy = (text: string, isCompare: boolean) => {
    navigator.clipboard.writeText(text);
    if (isCompare) {
      setCopiedCompare(true);
      setTimeout(() => setCopiedCompare(false), 2000);
    } else {
      setCopiedMain(true);
      setTimeout(() => setCopiedMain(false), 2000);
    }
  };

  const languages: { key: 'python' | 'cpp' | 'java' | 'js'; label: string }[] = [
    { key: 'python', label: '🐍 Python' },
    { key: 'cpp', label: '🟦 C++' },
    { key: 'java', label: '☕ Java' },
    { key: 'js', label: '🟨 JavaScript' }
  ];

  if (topicList.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        No implementations found in this module.
      </div>
    );
  }

  return (
    <div className="code-viewer-panel glass-panel">
      {/* Top selector row */}
      <div className="topic-selector">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label className="sim-label">Select Subtopic</label>
          <select 
            value={selectedTopic} 
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="select-input"
          >
            {topicList.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>

        <button 
          className={`btn ${comparisonMode ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setComparisonMode(!comparisonMode)}
          style={{ marginTop: '20px' }}
        >
          {comparisonMode ? <Eye size={16} /> : <Columns size={16} />}
          {comparisonMode ? "Single View" : "Compare Code"}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: comparisonMode ? '1fr 1fr' : '1fr', gap: '24px' }}>
        {/* Main Code Window */}
        <div style={{ minWidth: 0 }}>
          <div className="code-tabs-header">
            <div className="code-lang-tabs">
              {languages.map(lang => (
                <button
                  key={lang.key}
                  className={`lang-tab-btn ${activeLang === lang.key ? 'active' : ''}`}
                  onClick={() => {
                    setActiveLang(lang.key);
                    setSelectedFileIndex(0);
                  }}
                  disabled={getFilesForLang(lang.key).length === 0}
                  style={{ opacity: getFilesForLang(lang.key).length === 0 ? 0.3 : 1 }}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {mainFiles.length > 1 && (
              <select
                value={selectedFileIndex}
                onChange={(e) => setSelectedFileIndex(Number(e.target.value))}
                className="select-input"
                style={{ padding: '4px 8px', fontSize: '12px' }}
              >
                {mainFiles.map((file, idx) => (
                  <option key={file.name} value={idx}>{file.name}</option>
                ))}
              </select>
            )}
          </div>

          {mainFile ? (
            <div className="code-pre-box">
              <button 
                className="code-copy-btn" 
                onClick={() => handleCopy(mainFile.content, false)}
              >
                {copiedMain ? <Check size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
                {copiedMain ? ' Copied!' : ' Copy'}
              </button>
              <SyntaxHighlighter
                language={activeLang === 'js' ? 'javascript' : activeLang === 'cpp' ? 'cpp' : activeLang}
                style={atomDark}
                customStyle={{ margin: 0, padding: '24px', fontSize: '13.5px', background: '#090d16' }}
              >
                {mainFile.content}
              </SyntaxHighlighter>
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)', border: '1px dashed var(--border-glass)', borderRadius: '12px' }}>
              No implementation file available for {languages.find(l => l.key === activeLang)?.label}.
            </div>
          )}
        </div>

        {/* Comparison Code Window */}
        {comparisonMode && (
          <div style={{ minWidth: 0 }}>
            <div className="code-tabs-header">
              <div className="code-lang-tabs">
                {languages.map(lang => (
                  <button
                    key={`comp-${lang.key}`}
                    className={`lang-tab-btn ${compareLang === lang.key ? 'active' : ''}`}
                    onClick={() => {
                      setCompareLang(lang.key);
                      setCompareFileIndex(0);
                    }}
                    disabled={getFilesForLang(lang.key).length === 0}
                    style={{ opacity: getFilesForLang(lang.key).length === 0 ? 0.3 : 1 }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {compareFiles.length > 1 && (
                <select
                  value={compareFileIndex}
                  onChange={(e) => setCompareFileIndex(Number(e.target.value))}
                  className="select-input"
                  style={{ padding: '4px 8px', fontSize: '12px' }}
                >
                  {compareFiles.map((file, idx) => (
                    <option key={`comp-file-${file.name}`} value={idx}>{file.name}</option>
                  ))}
                </select>
              )}
            </div>

            {compareFile ? (
              <div className="code-pre-box">
                <button 
                  className="code-copy-btn" 
                  onClick={() => handleCopy(compareFile.content, true)}
                >
                  {copiedCompare ? <Check size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
                  {copiedCompare ? ' Copied!' : ' Copy'}
                </button>
                <SyntaxHighlighter
                  language={compareLang === 'js' ? 'javascript' : compareLang === 'cpp' ? 'cpp' : compareLang}
                  style={atomDark}
                  customStyle={{ margin: 0, padding: '24px', fontSize: '13.5px', background: '#090d16' }}
                >
                  {compareFile.content}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)', border: '1px dashed var(--border-glass)', borderRadius: '12px' }}>
                No implementation file available for comparison in {languages.find(l => l.key === compareLang)?.label}.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default CodeViewer;

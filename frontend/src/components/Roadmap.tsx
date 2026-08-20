import React from 'react';
import { CheckCircle2, Circle, Trophy, ArrowRight, Sparkles } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  readme: string;
  topics: Record<string, any>;
}

interface RoadmapProps {
  modules: Module[];
  completedModules: string[];
  activeModuleId: string | null;
  onSelectModule: (id: string) => void;
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
}

const MODULE_SUMMARIES: Record<string, string> = {
  '00-Foundations-and-Complexity': 'Big-O notation, Time/Space complexities, Recursion trees, and memory layout basics.',
  '01-Arrays-and-Strings': '1D/2D array storage, multi-pointers, sliding windows, and string matching techniques.',
  '02-Linked-Lists': 'Singly, Doubly, and Circular Linked Lists, node manipulation, and fast/slow pointer strategies.',
  '03-Stacks-and-Queues': 'LIFO/FIFO structures, Monotonic stacks, Deques, and expression evaluations.',
  '04-Trees-and-BST': 'Hierarchical trees, DFS/BFS traversals, Binary Search Trees, and height-balance algorithms.',
  '05-Heaps-and-Priority-Queues': 'Min/Max Heap representation, array-based binary trees, Heapify, and priority scheduling.',
  '06-Hashing-and-Tries': 'Hash maps, collision resolutions, sets, and prefix trees for fast dictionary searches.',
  '07-Graphs-and-Disjoint-Set': 'Node connections, representations, BFS/DFS searches, and cycle detection via DSU.',
  '08-Sorting-and-Searching': 'Divide-and-conquer sorting (Merge/Quick), binary searches, and order statistics.',
  '09-Greedy-Algorithms': 'Locally optimal choices, interval scheduling, fractional knapsack, and Huffman coding.',
  '10-Dynamic-Programming': 'Overlapping subproblems, recursion memoization, iterative tabulation, and sequence alignments.',
  '11-Backtracking-and-Bit-Manipulation': 'Exhaustive state-space search (N-Queens), subset generation, and bitwise math.',
  '12-Advanced-Data-Structures': 'Range queries, Segment Trees, and Fenwick Trees (Binary Indexed Trees) implementation.'
};

const getCategoryInfo = (index: number) => {
  if (index <= 3) return { text: 'Foundations & Linear', className: 'roadmap-tag' };
  if (index <= 6) return { text: 'Hierarchical & Hash', className: 'roadmap-tag roadmap-tag-cyan' };
  if (index <= 8) return { text: 'Algorithms & Search', className: 'roadmap-tag roadmap-tag-pink' };
  return { text: 'Optimization & Advanced', className: 'roadmap-tag roadmap-tag-pink' }; // Use pink or other color
};

export const Roadmap: React.FC<RoadmapProps> = ({
  modules,
  completedModules,
  activeModuleId,
  onSelectModule,
  onToggleComplete
}) => {
  const percentComplete = Math.round((completedModules.length / modules.length) * 100) || 0;

  return (
    <div className="roadmap-container">
      <div className="roadmap-hero glass-panel glow-effect">
        <Sparkles style={{ color: 'var(--secondary)', marginBottom: '8px' }} size={32} />
        <h1>DSA Mastery Roadmap</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '600px', margin: '0 auto 24px' }}>
          Traverse the ultimate topic-driven curriculum designed to take you from core algorithmic foundations to advanced tree query optimizations.
        </p>
        
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trophy size={16} style={{ color: 'gold' }} /> Completion Progress
            </span>
            <span>{completedModules.length} / {modules.length} Modules ({percentComplete}%)</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${percentComplete}%` }}></div>
          </div>
        </div>
      </div>

      <div className="roadmap-grid">
        {modules.map((m, index) => {
          const isCompleted = completedModules.includes(m.id);
          const isActive = activeModuleId === m.id;
          const summary = MODULE_SUMMARIES[m.id] || 'Explore key data structures and algorithmic implementations in this module.';
          const category = getCategoryInfo(index);
          const orderStr = m.id.substring(0, 2);

          return (
            <div 
              key={m.id} 
              className={`roadmap-card ${isCompleted ? 'completed' : ''}`}
              onClick={() => onSelectModule(m.id)}
            >
              <div className="roadmap-number-node">
                {orderStr}
              </div>

              <div className="roadmap-content glass-panel glow-effect">
                <div className="roadmap-card-header">
                  <span className={category.className}>{category.text}</span>
                  <button 
                    onClick={(e) => onToggleComplete(m.id, e)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: isCompleted ? 'var(--success)' : 'var(--text-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'var(--transition-fast)'
                    }}
                    title={isCompleted ? "Mark incomplete" : "Mark complete"}
                  >
                    {isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </button>
                </div>

                <div className="roadmap-card-body">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {m.title.replace(/^\d{2}\.\s/, '')}
                    {isActive && (
                      <span style={{ 
                        fontSize: '11px', 
                        background: 'var(--primary-glow-strong)', 
                        color: 'var(--primary)', 
                        padding: '2px 6px', 
                        borderRadius: '4px',
                        fontFamily: 'var(--font-sans)'
                      }}>
                        Currently Viewing
                      </span>
                    )}
                  </h3>
                  <p>{summary}</p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginTop: '16px',
                    fontSize: '13px',
                    color: 'var(--secondary)',
                    fontWeight: 600
                  }}>
                    <span>{Object.keys(m.topics).length} Core Topics</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Learn Module <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Roadmap;

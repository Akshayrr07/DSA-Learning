import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Plus, Minus, HelpCircle } from 'lucide-react';

type ConceptType = 'array' | 'linkedlist' | 'stack' | 'queue' | 'tree' | 'sorting';

interface BSTNode {
  val: number;
  left?: BSTNode;
  right?: BSTNode;
  id: string;
}

export const AlgorithmSimulator: React.FC = () => {
  const [activeConcept, setActiveConcept] = useState<ConceptType>('sorting');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Select an operation below to see the animation.');
  
  // Concept 1: Sorting states
  const [sortArray, setSortArray] = useState<number[]>([45, 23, 89, 12, 67, 34, 55, 18]);
  const [activeIdxs, setActiveIdxs] = useState<number[]>([]);
  const [sortedIdxs, setSortedIdxs] = useState<number[]>([]);
  const sortingTimer = useRef<any>(null);

  // Concept 2: Stack states
  const [stackItems, setStackItems] = useState<number[]>([10, 25, 42]);
  const [newValue, setNewValue] = useState<string>('');

  // Concept 3: Queue states
  const [queueItems, setQueueItems] = useState<number[]>([5, 12, 19, 26]);

  // Concept 4: Array states
  const [arrayElements, setArrayElements] = useState<{ val: number; state: 'normal' | 'active' | 'shifting' | 'found' }[]>([
    { val: 15, state: 'normal' },
    { val: 32, state: 'normal' },
    { val: 45, state: 'normal' },
    { val: 8, state: 'normal' },
    { val: 64, state: 'normal' },
  ]);

  // Concept 5: Linked List states
  const [llNodes, setLLNodes] = useState<{ id: string; val: number; state: 'normal' | 'active' | 'deleted' }[]>([
    { id: '1', val: 8, state: 'normal' },
    { id: '2', val: 19, state: 'normal' },
    { id: '3', val: 42, state: 'normal' },
    { id: '4', val: 77, state: 'normal' }
  ]);

  // Concept 6: BST states
  const [bstHighlighted, setBstHighlighted] = useState<string[]>([]);
  const bstRoot: BSTNode = {
    val: 50, id: 'n50',
    left: {
      val: 30, id: 'n30',
      left: { val: 20, id: 'n20' },
      right: { val: 40, id: 'n40' }
    },
    right: {
      val: 70, id: 'n70',
      left: { val: 60, id: 'n60' },
      right: { val: 80, id: 'n80' }
    }
  };

  // Clean up timers on switch
  useEffect(() => {
    if (sortingTimer.current) clearInterval(sortingTimer.current);
    setIsPlaying(false);
    setActiveIdxs([]);
    setSortedIdxs([]);
    setStatusMessage('Concept loaded. Try the control actions to interact.');
  }, [activeConcept]);

  // 1. Array Operations
  const handleArraySearch = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const target = 8;
    setStatusMessage(`Searching for target value: ${target}...`);
    
    let temp = [...arrayElements];
    for (let i = 0; i < temp.length; i++) {
      temp = temp.map((el, idx) => ({
        ...el,
        state: idx === i ? 'active' : 'normal'
      }));
      setArrayElements(temp);
      setStatusMessage(`Checking index ${i}: Value ${temp[i].val}...`);
      await new Promise(r => setTimeout(r, 1000));
      
      if (temp[i].val === target) {
        temp[i].state = 'found';
        setArrayElements([...temp]);
        setStatusMessage(`FOUND target ${target} at index ${i}!`);
        setIsPlaying(false);
        return;
      }
    }
    setStatusMessage(`Value ${target} not found.`);
    setIsPlaying(false);
  };

  const handleArrayInsert = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setStatusMessage('Inserting value 99 at index 2 (Requires shifting elements to the right)...');
    
    // Step 1: highlight index 2 and end
    let temp = arrayElements.map(el => ({ ...el, state: 'normal' as const }));
    setArrayElements(temp);
    await new Promise(r => setTimeout(r, 800));

    // Shift animation step-by-step
    const insertionIndex = 2;
    const insertedValue = 99;
    
    // We add a new placeholder at the end first
    let currentArray = [...arrayElements, { val: 0, state: 'shifting' as const }];
    setArrayElements(currentArray);
    
    for (let i = currentArray.length - 1; i > insertionIndex; i--) {
      setStatusMessage(`Shifting value ${currentArray[i-1].val} from index ${i-1} to ${i}...`);
      currentArray[i] = { val: currentArray[i-1].val, state: 'shifting' as const };
      setArrayElements([...currentArray]);
      await new Promise(r => setTimeout(r, 900));
    }

    setStatusMessage(`Inserting ${insertedValue} at index ${insertionIndex}...`);
    currentArray[insertionIndex] = { val: insertedValue, state: 'active' as const };
    setArrayElements([...currentArray]);
    await new Promise(r => setTimeout(r, 1000));

    setArrayElements(currentArray.map(el => ({ ...el, state: 'normal' as const })));
    setStatusMessage(`Insertion complete! Array length is now ${currentArray.length}.`);
    setIsPlaying(false);
  };

  // 2. Linked List Operations
  const handleLLDeleteNode = async () => {
    if (isPlaying || llNodes.length <= 2) return;
    setIsPlaying(true);
    setStatusMessage('Deleting Node with Value 42 (requires changing pointer of Value 19 directly to Value 77)...');

    // Highlight node to delete (Val: 42, Id: 3)
    let temp = llNodes.map(el => el.id === '3' ? { ...el, state: 'active' as const } : el);
    setLLNodes(temp);
    await new Promise(r => setTimeout(r, 1000));

    setStatusMessage('Rerouting pointer from Node(19) to Node(77)...');
    // Animate arrow shifting (using active styles on the preceding node)
    setLLNodes(llNodes.map(el => el.id === '2' ? { ...el, state: 'active' as const } : el));
    await new Promise(r => setTimeout(r, 1200));

    // Animate deletion fade out
    setLLNodes(llNodes.map(el => el.id === '3' ? { ...el, state: 'deleted' as const } : el));
    await new Promise(r => setTimeout(r, 800));

    // Remove from array
    setLLNodes(llNodes.filter(el => el.id !== '3').map(el => ({ ...el, state: 'normal' as const })));
    setStatusMessage('Node 42 removed. Pointers updated successfully.');
    setIsPlaying(false);
  };

  // 3. Stack Operations
  const handleStackPush = () => {
    const val = newValue ? parseInt(newValue) : Math.floor(Math.random() * 90) + 10;
    if (isNaN(val)) return;
    setStackItems([...stackItems, val]);
    setNewValue('');
    setStatusMessage(`Pushed element ${val} onto top of the stack (LIFO).`);
  };

  const handleStackPop = () => {
    if (stackItems.length === 0) {
      setStatusMessage('Stack Underflow! Stack is empty.');
      return;
    }
    const popped = stackItems[stackItems.length - 1];
    setStackItems(stackItems.slice(0, -1));
    setStatusMessage(`Popped element ${popped} from the top of the stack.`);
  };

  // 4. Queue Operations
  const handleQueueEnqueue = () => {
    const val = newValue ? parseInt(newValue) : Math.floor(Math.random() * 90) + 10;
    if (isNaN(val)) return;
    setQueueItems([...queueItems, val]);
    setNewValue('');
    setStatusMessage(`Enqueued element ${val} to the rear (FIFO).`);
  };

  const handleQueueDequeue = () => {
    if (queueItems.length === 0) {
      setStatusMessage('Queue Underflow! Queue is empty.');
      return;
    }
    const dequeued = queueItems[0];
    setQueueItems(queueItems.slice(1));
    setStatusMessage(`Dequeued element ${dequeued} from the front of the queue.`);
  };

  // 5. BST Traversals
  const handleBSTTraversal = async (type: 'pre' | 'in' | 'post' | 'bfs') => {
    if (isPlaying) return;
    setIsPlaying(true);
    setBstHighlighted([]);
    
    const visitOrder: string[] = [];
    const traversalLabels: string[] = [];

    // Local traversal implementations
    const preOrder = (node: BSTNode) => {
      visitOrder.push(node.id);
      traversalLabels.push(String(node.val));
      if (node.left) preOrder(node.left);
      if (node.right) preOrder(node.right);
    };

    const inOrder = (node: BSTNode) => {
      if (node.left) inOrder(node.left);
      visitOrder.push(node.id);
      traversalLabels.push(String(node.val));
      if (node.right) inOrder(node.right);
    };

    const postOrder = (node: BSTNode) => {
      if (node.left) postOrder(node.left);
      if (node.right) postOrder(node.right);
      visitOrder.push(node.id);
      traversalLabels.push(String(node.val));
    };

    const bfs = () => {
      const q: BSTNode[] = [bstRoot];
      while (q.length > 0) {
        const curr = q.shift()!;
        visitOrder.push(curr.id);
        traversalLabels.push(String(curr.val));
        if (curr.left) q.push(curr.left);
        if (curr.right) q.push(curr.right);
      }
    };

    if (type === 'pre') preOrder(bstRoot);
    else if (type === 'in') inOrder(bstRoot);
    else if (type === 'post') postOrder(bstRoot);
    else bfs();

    setStatusMessage(`Starting traversal: ${type.toUpperCase()}. Queue order generated.`);
    
    // Highlight step-by-step
    for (let i = 0; i < visitOrder.length; i++) {
      const currentId = visitOrder[i];
      const visitedValues = traversalLabels.slice(0, i + 1).join(' -> ');
      setStatusMessage(`Visiting node: ${traversalLabels[i]}. Path: ${visitedValues}`);
      setBstHighlighted(prev => [...prev, currentId]);
      await new Promise(r => setTimeout(r, 1000));
    }
    
    setStatusMessage(`Traversal complete! Visited nodes sequence: ${traversalLabels.join(' -> ')}`);
    setIsPlaying(false);
  };

  // 6. Bubble Sort Steps
  const handleBubbleSortStep = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setStatusMessage('Executing Bubble Sort: Scanning array and swapping adjacent elements...');
    
    let arr = [...sortArray];
    let n = arr.length;


    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIdxs([j, j + 1]);
        setStatusMessage(`Comparing index ${j} (${arr[j]}) and index ${j+1} (${arr[j+1]})...`);
        await new Promise(r => setTimeout(r, 600));

        if (arr[j] > arr[j + 1]) {
          // Swap
          setStatusMessage(`Swap: ${arr[j]} > ${arr[j+1]}. Swapping!`);
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setSortArray([...arr]);

          await new Promise(r => setTimeout(r, 600));
        }
      }
      setSortedIdxs(prev => [...prev, n - i - 1]);
    }
    setSortedIdxs(Array.from({ length: n }, (_, idx) => idx));
    setActiveIdxs([]);
    setStatusMessage('Bubble Sort completed! Array is now sorted.');
    setIsPlaying(false);
  };

  // Resets
  const resetAllSimulators = () => {
    setSortArray([45, 23, 89, 12, 67, 34, 55, 18]);
    setActiveIdxs([]);
    setSortedIdxs([]);
    setStackItems([10, 25, 42]);
    setQueueItems([5, 12, 19, 26]);
    setArrayElements([
      { val: 15, state: 'normal' },
      { val: 32, state: 'normal' },
      { val: 45, state: 'normal' },
      { val: 8, state: 'normal' },
      { val: 64, state: 'normal' },
    ]);
    setLLNodes([
      { id: '1', val: 8, state: 'normal' },
      { id: '2', val: 19, state: 'normal' },
      { id: '3', val: 42, state: 'normal' },
      { id: '4', val: 77, state: 'normal' }
    ]);
    setBstHighlighted([]);
    setStatusMessage('All simulators have been reset to initial values.');
  };

  return (
    <div className="simulator-layout">
      {/* Sidebar Controls Panel */}
      <div className="simulator-controls glass-panel">
        <h3 className="sim-title">Select Concept</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button 
            className={`sidebar-nav-btn ${activeConcept === 'sorting' ? 'active' : ''}`}
            onClick={() => setActiveConcept('sorting')}
            disabled={isPlaying}
          >
            📊 Sorting Algorithms
          </button>
          <button 
            className={`sidebar-nav-btn ${activeConcept === 'stack' ? 'active' : ''}`}
            onClick={() => setActiveConcept('stack')}
            disabled={isPlaying}
          >
            🥞 Stack (LIFO)
          </button>
          <button 
            className={`sidebar-nav-btn ${activeConcept === 'queue' ? 'active' : ''}`}
            onClick={() => setActiveConcept('queue')}
            disabled={isPlaying}
          >
            ⏳ Queue (FIFO)
          </button>
          <button 
            className={`sidebar-nav-btn ${activeConcept === 'array' ? 'active' : ''}`}
            onClick={() => setActiveConcept('array')}
            disabled={isPlaying}
          >
            🔢 1D Array Shifter
          </button>
          <button 
            className={`sidebar-nav-btn ${activeConcept === 'linkedlist' ? 'active' : ''}`}
            onClick={() => setActiveConcept('linkedlist')}
            disabled={isPlaying}
          >
            🔗 Linked List Nodes
          </button>
          <button 
            className={`sidebar-nav-btn ${activeConcept === 'tree' ? 'active' : ''}`}
            onClick={() => setActiveConcept('tree')}
            disabled={isPlaying}
          >
            🌿 Binary Search Tree
          </button>
        </div>

        {/* Action button grouping depending on active view */}
        <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
          <h4 className="sim-label" style={{ marginBottom: '12px' }}>Simulator Actions</h4>
          
          {activeConcept === 'sorting' && (
            <div className="sim-controls-group">
              <button className="btn btn-primary" onClick={handleBubbleSortStep} disabled={isPlaying}>
                <Play size={14} /> Run Bubble Sort
              </button>
            </div>
          )}

          {activeConcept === 'stack' && (
            <div className="col-flex gap-sm">
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="number"
                  placeholder="Val"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="select-input"
                  style={{ width: '80px', padding: '8px' }}
                />
                <button className="btn btn-primary" style={{ flexGrow: 1 }} onClick={handleStackPush}>
                  <Plus size={14} /> Push
                </button>
              </div>
              <button className="btn btn-secondary" onClick={handleStackPop}>
                <Minus size={14} /> Pop (LIFO)
              </button>
            </div>
          )}

          {activeConcept === 'queue' && (
            <div className="col-flex gap-sm">
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="number"
                  placeholder="Val"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="select-input"
                  style={{ width: '80px', padding: '8px' }}
                />
                <button className="btn btn-primary" style={{ flexGrow: 1 }} onClick={handleQueueEnqueue}>
                  <Plus size={14} /> Enqueue
                </button>
              </div>
              <button className="btn btn-secondary" onClick={handleQueueDequeue}>
                <Minus size={14} /> Dequeue (FIFO)
              </button>
            </div>
          )}

          {activeConcept === 'array' && (
            <div className="col-flex gap-sm">
              <button className="btn btn-primary" onClick={handleArraySearch} disabled={isPlaying}>
                🔍 Search for target '8'
              </button>
              <button className="btn btn-secondary" onClick={handleArrayInsert} disabled={isPlaying}>
                ➕ Insert 99 at Index 2
              </button>
            </div>
          )}

          {activeConcept === 'linkedlist' && (
            <div className="sim-controls-group">
              <button className="btn btn-primary" onClick={handleLLDeleteNode} disabled={isPlaying}>
                🗑️ Delete Node (42)
              </button>
            </div>
          )}

          {activeConcept === 'tree' && (
            <div className="col-flex gap-sm">
              <button className="btn btn-primary" onClick={() => handleBSTTraversal('pre')} disabled={isPlaying}>
                Pre-order Traversal (N-L-R)
              </button>
              <button className="btn btn-primary" onClick={() => handleBSTTraversal('in')} disabled={isPlaying}>
                In-order Traversal (L-N-R)
              </button>
              <button className="btn btn-primary" onClick={() => handleBSTTraversal('post')} disabled={isPlaying}>
                Post-order Traversal (L-R-N)
              </button>
              <button className="btn btn-secondary" onClick={() => handleBSTTraversal('bfs')} disabled={isPlaying}>
                Level-order (BFS)
              </button>
            </div>
          )}

          <button 
            className="btn btn-secondary" 
            style={{ marginTop: '24px', width: '100%' }}
            onClick={resetAllSimulators}
            disabled={isPlaying}
          >
            <RotateCcw size={14} /> Reset Simulator
          </button>
        </div>
      </div>

      {/* Main Canvas Workspace */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
        <div className="simulator-canvas-box glass-panel">
          
          {/* Sorting Visualizer */}
          {activeConcept === 'sorting' && (
            <div className="sim-bars-container">
              {sortArray.map((val, idx) => {
                const isActive = activeIdxs.includes(idx);
                const isSorted = sortedIdxs.includes(idx);
                return (
                  <div 
                    key={idx} 
                    className={`sim-bar ${isActive ? 'active' : ''} ${isSorted ? 'sorted' : ''}`}
                    style={{ height: `${val * 2.2}px` }}
                  >
                    <span className="sim-bar-val">{val}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Stack Visualizer */}
          {activeConcept === 'stack' && (
            <div className="sim-stack-container">
              {stackItems.length === 0 ? (
                <div style={{ color: 'var(--text-dim)', textAlign: 'center', marginBottom: '80px', fontSize: '14px' }}>
                  EMPTY STACK
                </div>
              ) : (
                stackItems.map((val, idx) => (
                  <div key={idx} className="sim-stack-item">
                    {val}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Queue Visualizer */}
          {activeConcept === 'queue' && (
            <div className="sim-queue-container">
              {queueItems.length === 0 ? (
                <div style={{ color: 'var(--text-dim)', textAlign: 'center', margin: 'auto', fontSize: '14px' }}>
                  EMPTY QUEUE
                </div>
              ) : (
                queueItems.map((val, idx) => (
                  <div key={idx} className="sim-queue-item">
                    {val}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Array Visualizer */}
          {activeConcept === 'array' && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {arrayElements.map((el, idx) => {
                let border = '1px solid var(--border-glass)';
                let bg = 'var(--bg-surface-elevated)';
                let color = 'var(--text-main)';
                let transform = 'scale(1)';

                if (el.state === 'active') {
                  border = '1px solid var(--primary)';
                  bg = 'var(--primary-glow)';
                  color = 'var(--primary)';
                } else if (el.state === 'shifting') {
                  border = '1px solid var(--secondary)';
                  bg = 'var(--secondary-glow)';
                  color = 'var(--secondary)';
                  transform = 'translateX(5px)';
                } else if (el.state === 'found') {
                  border = '1px solid var(--success)';
                  bg = 'var(--success-glow)';
                  color = 'var(--success)';
                  transform = 'scale(1.15)';
                }

                return (
                  <div 
                    key={idx}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      border,
                      background: bg,
                      color,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      transition: 'all 0.4s ease',
                      transform
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{el.val}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>[{idx}]</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Linked List Visualizer */}
          {activeConcept === 'linkedlist' && (
            <div className="sim-ll-container">
              {llNodes.map((el, idx) => {
                let border = '1px solid var(--border-glass)';
                let bg = 'var(--bg-surface-elevated)';
                let color = 'var(--text-main)';
                let arrowColor = 'var(--secondary)';

                if (el.state === 'active') {
                  border = '1px solid var(--primary)';
                  bg = 'var(--primary-glow)';
                  color = 'var(--primary)';
                } else if (el.state === 'deleted') {
                  border = '1px dashed var(--accent)';
                  bg = 'rgba(236, 72, 153, 0.1)';
                  color = 'var(--accent)';
                  arrowColor = 'var(--accent)';
                }

                return (
                  <React.Fragment key={el.id}>
                    <div className="sim-ll-node" style={{ border, background: bg, color }}>
                      <div className="sim-ll-val">{el.val}</div>
                      <div className="sim-ll-next">next</div>
                    </div>
                    {idx < llNodes.length - 1 && (
                      <span className="sim-ll-arrow" style={{ color: arrowColor }}>➔</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Binary Search Tree Visualizer */}
          {activeConcept === 'tree' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
              {/* Row 1: Root */}
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {renderBSTNode(bstRoot, bstHighlighted)}
              </div>
              
              {/* Connecting Lines helper message */}
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                Nodes will pulse green when visited in the traversal sequence.
              </div>
            </div>
          )}

        </div>

        {/* Logs / Explainer Area */}
        <div className="glass-panel" style={{ padding: '20px 24px', textAlign: 'left' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', color: 'var(--secondary)' }}>
            <HelpCircle size={16} /> Console Output & Tracing
          </h4>
          <p style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
            &gt; {statusMessage}
          </p>
        </div>
      </div>
    </div>
  );

  // Simple recursive helper to draw tree hierarchy in React
  function renderBSTNode(node: BSTNode, highlights: string[]) {
    const isVisited = highlights.includes(node.id);
    const isCurrent = highlights[highlights.length - 1] === node.id;
    
    let border = '1px solid var(--border-glass)';
    let bg = 'var(--bg-surface)';
    let color = 'var(--text-main)';


    if (isCurrent) {
      border = '2px solid var(--accent)';
      bg = 'rgba(236, 72, 153, 0.15)';
      color = 'var(--accent)';
    } else if (isVisited) {
      border = '2px solid var(--success)';
      bg = 'var(--success-glow)';
      color = 'var(--success)';
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div 
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border,
            background: bg,
            color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            fontSize: '14px',
            boxShadow: isVisited ? '0 0 10px rgba(16, 185, 129, 0.3)' : 'none',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
        >
          {node.val}
        </div>
        
        {(node.left || node.right) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px', marginTop: '12px', position: 'relative' }}>
            {/* Draw lines conceptually using border layouts */}
            {node.left && (
              <div style={{ padding: '0 10px' }}>
                {renderBSTNode(node.left, highlights)}
              </div>
            )}
            {node.right && (
              <div style={{ padding: '0 10px' }}>
                {renderBSTNode(node.right, highlights)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default AlgorithmSimulator;

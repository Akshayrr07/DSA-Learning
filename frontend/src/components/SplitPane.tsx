import React, { useState, useRef } from 'react';

interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export const SplitPane: React.FC<SplitPaneProps> = ({ left, right }) => {
  const [leftWidth, setLeftWidth] = useState(45); // Default 45% left, 55% right
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleResize = (e: MouseEvent) => {
    if (!isResizing.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Bounds constraints (prevent shrinking either pane below 25%)
    if (newWidth > 25 && newWidth < 75) {
      setLeftWidth(newWidth);
    }
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  return (
    <div ref={containerRef} className="split-pane-container">
      <div className="split-pane-left" style={{ width: `${leftWidth}%` }}>
        {left}
      </div>
      <div className="split-pane-divider" onMouseDown={startResize} />
      <div className="split-pane-right" style={{ width: `${100 - leftWidth}%` }}>
        {right}
      </div>
    </div>
  );
};

export default SplitPane;

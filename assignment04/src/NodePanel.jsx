// NodePanel.js
import React from 'react';

const NodePanel = () => {
  const handleDragStart = (e, nodeType) => {
    e.dataTransfer.setData('application/node-type', nodeType);
  };

  return (
    <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '10px' }}>
      <h2>Nodes Panel</h2>
      <p>Drag and drop nodes here</p>
      {/* Add different types of nodes here */}
      <div
        style={{ padding: '10px', backgroundColor: '#ccc', margin: '10px 0', cursor: 'move' }}
        draggable
        onDragStart={(e) => handleDragStart(e, 'text')}
      >
        Text Node
      </div>
      <div
        style={{ padding: '10px', backgroundColor: '#ccc', margin: '10px 0', cursor: 'move' }}
        draggable
        onDragStart={(e) => handleDragStart(e, 'image')}
      >
        Image Node
      </div>
      <div
        style={{ padding: '10px', backgroundColor: '#ccc', margin: '10px 0', cursor: 'move' }}
        draggable
        onDragStart={(e) => handleDragStart(e, 'button')}
      >
        Button Node
      </div>
    </div>
  );
};

export default NodePanel;

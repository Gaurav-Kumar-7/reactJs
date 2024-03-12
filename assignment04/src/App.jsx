// App.js
import React, { useState } from 'react';
import ReactFlow, { Controls, Background } from 'react-flow-renderer';
import NodePanel from './NodePanel';

const App = () => {
  const [elements, setElements] = useState([]);

  const onDrop = (event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('application/node-type');

    // Create a new node element based on the dropped node type
    const newNode = {
      id: `${nodeType}-${Date.now()}`,
      type: nodeType,
      data: { label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node` },
      position: { x: event.clientX, y: event.clientY },
    };

    setElements((els) => [...els, newNode]);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
      <NodePanel />
      <div
        style={{ flex: 1, position: 'relative' }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow elements={elements}>
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default App;

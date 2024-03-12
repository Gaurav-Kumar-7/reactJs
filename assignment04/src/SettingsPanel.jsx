// SettingsPanel.js
import React, { useState } from 'react';

const SettingsPanel = ({ nodeId }) => {
  const [text, setText] = useState(''); // Assuming text content of the node

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Fetch node data based on nodeId and set initial state accordingly

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#f0f0f0', padding: '10px' }}>
      <h3>Settings Panel</h3>
      <label htmlFor="text">Text:</label>
      <input type="text" id="text" value={text} onChange={handleTextChange} />
    </div>
  );
};

export default SettingsPanel;

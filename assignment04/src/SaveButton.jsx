// SaveButton.js
import React from 'react';

const SaveButton = ({ onSave }) => {
  return (
    <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
      <button onClick={onSave}>Save</button>
    </div>
  );
};

export default SaveButton;

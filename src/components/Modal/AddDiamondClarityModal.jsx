import React, { useState } from 'react';

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(4px)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalStyle = {
  background: '#F5F7FA',
  borderRadius: '24px',
  padding: '32px',
  minWidth: '500px',
  boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const titleStyle = {
  fontSize: '20px',
  fontWeight: 600,
  marginBottom: '8px',
  color: '#222',
};

const labelStyle = {
  fontSize: '15px',
  fontWeight: 500,
  marginBottom: '6px',
  color: '#222',
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid #D1D5DB',
  fontSize: '15px',
  marginBottom: '16px',
  background: '#fff',
};

const buttonRowStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
};

const cancelButtonStyle = {
  padding: '8px 28px',
  borderRadius: '8px',
  border: 'none',
  background: '#F5F7FA',
  color: '#4B5563',
  fontWeight: 500,
  fontSize: '15px',
  cursor: 'pointer',
  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
};

const saveButtonStyle = {
  padding: '8px 28px',
  borderRadius: '8px',
  border: 'none',
  background: '#263312',
  color: '#fff',
  fontWeight: 500,
  fontSize: '15px',
  cursor: 'pointer',
};

const AddDiamondClarityModal = ({ onClose }) => {
  const [shape, setShape] = useState('');

  const handleSave = () => {
    // TODO: handle save logic
    onClose();
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <div style={titleStyle}>Add Shape</div>
        <div>
          <div style={labelStyle}>Diamond Shape</div>
          <input
            style={inputStyle}
            type="text"
            placeholder="Enter diamond shape"
            value={shape}
            onChange={e => setShape(e.target.value)}
          />
        </div>
        <div style={buttonRowStyle}>
          <button style={cancelButtonStyle} onClick={onClose}>Cancel</button>
          <button style={saveButtonStyle} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddDiamondClarityModal;

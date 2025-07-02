// src/components/Spinner.js
import React from 'react';

const spinnerStyle = {
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid #ffffff',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    animation: 'spin 1s linear infinite',
    display: 'inline-block',
    marginRight: '10px',
};

const keyframes = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

function Spinner() {
    return (
        <>
            <style>{keyframes}</style>
            <div style={spinnerStyle}></div>
        </>
    );
}

export default Spinner;

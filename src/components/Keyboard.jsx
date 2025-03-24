import React from 'react';

function Keyboard({ onKeyPress, keyStates }) {
  const keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
  ];

  // Prevent multiple rapid clicks
  const handleKeyClick = (key) => {
    onKeyPress(key);
  };

  return (
    <div className="keyboard">
      {keyboardRows.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map(key => (
            <button
              key={key}
              className={`keyboard-key ${key.length > 1 ? 'special-key' : ''}`}
              onClick={() => handleKeyClick(key)}
              aria-label={key}
            >
              {key.length === 1 ? (
                <>
                  <div className="keyboard-sections">
                    {[0, 1, 2].map(idx => (
                      <div
                        key={idx}
                        className={`keyboard-section ${keyStates[key]?.[idx] || ''}`}
                      />
                    ))}
                  </div>
                  <span className="keyboard-letter">{key}</span>
                </>
              ) : key === 'Backspace' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
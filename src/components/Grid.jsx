import React from 'react';

function Grid({ guessHistory, currentGuess, feedbackHistory, maxAttempts, solved }) {
  // Calculate the number of rows to show based on available space
  // This helps with the "no scroll" requirement
  const rowsToShow = Math.min(maxAttempts, 8);
  
  // Generate rows for past guesses
  const rows = [];
  
  for (let i = 0; i < guessHistory.length; i++) {
    const guess = guessHistory[i];
    const feedback = feedbackHistory[i];
    
    const row = (
      <div key={`guess-${i}`} className="guess-row">
        {/* For each of the three secret words */}
        {[0, 1, 2].map(wordIndex => (
          <div key={`word-${wordIndex}`} className={`word-grid ${solved[wordIndex] ? 'solved' : ''}`}>
            {/* For each letter in the 5-letter word */}
            {Array(5).fill(0).map((_, letterIndex) => (
              <div 
                key={`letter-${letterIndex}`} 
                className={`letter-box ${feedback[wordIndex][letterIndex]}`}
              >
                {guess[letterIndex]}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
    
    rows.push(row);
  }
  
  // Current guess row (where user is typing)
  if (guessHistory.length < rowsToShow) {
    const row = (
      <div key="current-guess" className="guess-row current">
        {[0, 1, 2].map(wordIndex => (
          <div key={`word-${wordIndex}`} className={`word-grid ${solved[wordIndex] ? 'solved' : ''}`}>
            {Array(5).fill(0).map((_, letterIndex) => (
              <div 
                key={`letter-${letterIndex}`} 
                className="letter-box empty"
              >
                {!solved[wordIndex] ? currentGuess[letterIndex] || '' : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
    
    rows.push(row);
  }
  
  // Add empty rows for future guesses (but limit based on available space)
  for (let i = rows.length; i < rowsToShow; i++) {
    const row = (
      <div key={`empty-${i}`} className="guess-row empty">
        {[0, 1, 2].map(wordIndex => (
          <div key={`word-${wordIndex}`} className={`word-grid ${solved[wordIndex] ? 'solved' : ''}`}>
            {Array(5).fill(0).map((_, letterIndex) => (
              <div 
                key={`letter-${letterIndex}`} 
                className="letter-box empty"
              >
                {''}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
    
    rows.push(row);
  }
  
  return (
    <div className="grid-container">
      {rows}
    </div>
  );
}

export default Grid;
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import { VALID_WORDS, WORD_LIST } from './data/wordList';

function App() {
  // Game state
  const [secretWords, setSecretWords] = useState([]);
  const [solved, setSolved] = useState([false, false, false]);
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(8);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [keyStates, setKeyStates] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Check local storage or prefer dark color scheme by default
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Refs
  const inputRef = useRef(null);
  const processingKeyRef = useRef(false);

  // Initialize game
  useEffect(() => {
    setSecretWords(selectRandomWords(WORD_LIST, 3));
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  // Focus input field
  useEffect(() => {
    if (inputRef.current && !gameOver) {
      inputRef.current.focus();
    }
  }, [gameOver]);

  // Random word selector
  const selectRandomWords = (wordList, count) => {
    return [...wordList].sort(() => Math.random() - 0.5).slice(0, count);
  };

  // Keyboard input handling with debounce to prevent duplicate letters
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || processingKeyRef.current) return;
      
      processingKeyRef.current = true;
      
      if (e.key === 'Enter') {
        submitGuess();
      } else if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < 5) {
        setCurrentGuess(prev => prev + e.key.toLowerCase());
      }
      
      // Reset processing state after a short delay
      setTimeout(() => {
        processingKeyRef.current = false;
      }, 10);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameOver]);

  // Handle key press from virtual keyboard
  const handleKeyPress = (key) => {
    if (gameOver || processingKeyRef.current) return;
    
    processingKeyRef.current = true;

    if (key === 'Enter') {
      submitGuess();
    } else if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
    
    // Refocus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Reset processing state after a short delay
    setTimeout(() => {
      processingKeyRef.current = false;
    }, 10);
  };

  // Submit guess handling
  const submitGuess = () => {
    if (currentGuess.length !== 5) {
      showErrorMessage('Word must be 5 letters');
      return;
    }
    
    if (!VALID_WORDS.includes(currentGuess)) {
      showErrorMessage('Not in word list');
      return;
    }

    const newFeedback = secretWords.map((word, i) => 
      solved[i] ? Array(5).fill('') : checkGuess(currentGuess, word)
    );
    
    const newSolved = secretWords.map((word, i) => 
      solved[i] || newFeedback[i].every(f => f === 'green')
    );

    setGuessHistory([...guessHistory, currentGuess]);
    setFeedbackHistory([...feedbackHistory, newFeedback]);
    setSolved(newSolved);
    setAttempts(a => a + 1);
    setCurrentGuess('');
    updateKeyStates(currentGuess, newFeedback);

    if (newSolved.every(s => s)) {
      setGameOver(true);
      setGameWon(true);
    } else if (attempts + 1 >= maxAttempts) {
      setGameOver(true);
    }
  };

  // Check guess against secret word
  const checkGuess = (guess, secret) => {
    const secretArr = [...secret];
    const feedback = Array(5).fill('ash');

    // Check for correct letters (green)
    guess.split('').forEach((letter, i) => {
      if (letter === secret[i]) {
        feedback[i] = 'green';
        secretArr[i] = null;
      }
    });

    // Check for present letters (yellow)
    guess.split('').forEach((letter, i) => {
      if (feedback[i] === 'green') return;
      const foundIndex = secretArr.indexOf(letter);
      if (foundIndex > -1) {
        feedback[i] = 'yellow';
        secretArr[foundIndex] = null;
      }
    });

    return feedback;
  };

  // Update keyboard color states
  const updateKeyStates = (guess, feedbacks) => {
    setKeyStates(prev => {
      const newStates = { ...prev };
      guess.split('').forEach((letter, i) => {
        if (!newStates[letter]) newStates[letter] = ['', '', ''];
        feedbacks.forEach((fb, wordIdx) => {
          const color = fb[i];
          const current = newStates[letter][wordIdx];
          if (color === 'green') {
            newStates[letter][wordIdx] = 'green';
          } else if (color === 'yellow' && current !== 'green') {
            newStates[letter][wordIdx] = 'yellow';
          } else if (color === 'ash' && !current) {
            newStates[letter][wordIdx] = 'ash';
          }
        });
      });
      return newStates;
    });
  };

  // Error message handling
  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 2000);
  };

  // Reset game
  const resetGame = () => {
    setSecretWords(selectRandomWords(WORD_LIST, 3));
    setSolved([false, false, false]);
    setAttempts(0);
    setCurrentGuess('');
    setGuessHistory([]);
    setFeedbackHistory([]);
    setGameOver(false);
    setGameWon(false);
    setKeyStates({});
    
    // Refocus input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Theme toggle
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDarkTheme ? '🔆' : '🌙'}
      </button>

      <header>
        <h3>TRIDLE - (3-WORDS WORDLE)</h3>
        <p>Guess three 5-letter words in 8 attempts</p>
      </header>

      <div className="game-container">
        <Grid 
          guessHistory={guessHistory}
          currentGuess={currentGuess}
          feedbackHistory={feedbackHistory}
          maxAttempts={maxAttempts}
          solved={solved}
        />

        <div className="input-area">
          {/* This input is focused but visually hidden */}
          <input
            ref={inputRef}
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.toLowerCase().slice(0, 5))}
            maxLength={5}
            disabled={gameOver}
            className="hidden-input"
            aria-label="Word input"
            autoComplete="off"
          />

          {showError && (
            <div className="error-message">{errorMessage}</div>
          )}
        </div>

        <Keyboard 
          onKeyPress={handleKeyPress} 
          keyStates={keyStates} 
        />

        {gameOver && (
          <div className="game-over-modal">
            <div className="modal-content">
              <h2>{gameWon ? 'Congratulations!' : 'Game Over'}</h2>
              {gameWon ? (
                <p>You solved all words in {attempts} attempts!</p>
              ) : (
                <>
                  <p>You've used all your attempts.</p>
                  <p>The secret words were:</p>
                  <ul className="secret-words-list">
                    {secretWords.map((word, i) => (
                      <li key={i}>{word.toUpperCase()}</li>
                    ))}
                  </ul>
                </>
              )}
              <button onClick={resetGame} className="reset-button">
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
# TRIDLE - 3-Word Wordle Game
### Game UI
![image](https://github.com/user-attachments/assets/5a7832a5-455d-4332-81f2-8a10b3495a38)
#### Feedback
![image](https://github.com/user-attachments/assets/643b7c6c-6093-4b88-9982-fc4e3716bfce)
________________
![image](https://github.com/user-attachments/assets/9b34f337-d24e-4a13-9948-64f223ef4111)


TRIDLE is a unique twist on the classic Wordle game where players challenge themselves to guess three secret 5-letter words within 8 attempts. The game provides immediate, color-coded feedback for each guess
- "green" indicates a correct letter in the correct spot, 
- "yellow" shows a correct letter in the wrong position
- "ash" indicates a letter that is not present.

---

## Project Structure

- **logic.ipynb**  
  This Python notebook contains the core game logic. It demonstrates the algorithm for:
  - Selecting three random secret words from a word list.
  - Validating player guesses.
  - Generating feedback based on each guess.
  
  Use this notebook as a reference for understanding the underlying game mechanics or for integrating the logic into other backends.

- **App.jsx**  
  This file is the main React component for the frontend, built using Vite. It includes:
  - Game state management using React hooks (`useState` and `useEffect`).
  - Event handling for both physical and virtual keyboard inputs.
  - Integration of UI components such as the Grid (for displaying guess history and feedback) and the Keyboard (with dynamic color states).
  - Additional features like error handling, theme toggling (dark/light modes), and a modal for game over scenarios.

---

## Key Features

### Game Mechanics
- **Three-Word Challenge:** Guess three secret 5-letter words simultaneously.
- **Limited Attempts:** Players have 8 tries to solve all three words.
- **Feedback System:**  
  - **Green:** Letter is correct and in the right position.  
  - **Yellow:** Letter is correct but in the wrong position.  
  - **Ash:** Letter is not in the secret word.
- **Dynamic Virtual Keyboard:** Reflects feedback by updating key colors based on previous guesses.

### User Experience Enhancements
- **Theme Toggle:** Users can switch between dark and light themes. The chosen theme is saved in local storage, ensuring consistency across sessions.
- **Error Handling:** Instant validation ensures that only valid 5-letter words from the accepted word list are submitted, with immediate error feedback.
- **Accessibility:** A hidden input field maintains focus for keyboard events, enhancing accessibility.

### Code Architecture
- **Modular Components:**  
  - **Grid:** Renders the game board, displaying past guesses and current input with corresponding feedback.
  - **Keyboard:** A virtual keyboard that updates based on the player's progress.
- **State Management & Effects:**  
  - Handles game logic such as secret word selection, attempts tracking, guess validation, and dynamic theming.
  - Debounced key handling to prevent duplicate input processing.
- **Integration of Backend Logic:**  
  The Python notebook (`logic.ipynb`) encapsulates the fundamental logic, which parallels the functionality in the React code for consistency and potential backend reuse.

---

## Setup and Installation

### Prerequisites
- **Node.js** (v12+ recommended) and a package manager like **npm** or **yarn**.
- **Python** installed to run the notebook (Jupyter Notebook or JupyterLab).

### Running the React Application
1. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Start the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. **Build for Production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

### Running the Python Notebook
- Open `logic.ipynb` using Jupyter Notebook or JupyterLab.
- Execute the cells to step through the game logic.
- Use it as a learning tool or a backend engine for further development.

---

## Customization and Contributions
- **Word List Customization:**  
  Edit the `WORD_LIST` and `VALID_WORDS` arrays in both the React code and Python notebook to tailor the game vocabulary.
- **Feature Enhancements:**  
  Contributions are welcome! Feel free to fork the repository, add new features, or improve the current implementation.
- **Bug Reports and Suggestions:**  
  Open an issue in the repository for any bugs or feature requests.

---

Enjoy playing TRIDLE and happy coding!


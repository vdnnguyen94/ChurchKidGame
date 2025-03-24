// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import GamePage from './components/GamePage';
import MemoryGame from './components/MemoryGame';
import BackgroundMusic from './BackgroundMusic';
function App() {
  return (
    <Router>
      <BackgroundMusic />
      <div>
        <nav style={styles.nav}>
          <Link style={styles.link} to="/">Home</Link>
          <Link style={styles.link} to="/game/game1">Game 1</Link>
          <Link style={styles.link} to="/game/game2">Game 2</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:gameId" element={<GamePage />} />
          <Route path="/memory/:gameId" element={<MemoryGame />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  nav: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    display: 'flex',
    justifyContent: 'space-around',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px'
  }
};

export default App;

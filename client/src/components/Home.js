// client/src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import StartMusicButton from '../StartMusicButton';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Church Kid Game</h1>
      <p>Please select a game:</p>
      <div>
        <Link style={styles.button} to="/game/game1">Game 1</Link>
        <Link style={styles.button} to="/game/game2">Game 2</Link>
      </div>
      {/* Include the button to enable background music */}
      <StartMusicButton />
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px'
  },
  button: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '18px'
  }
};

export default Home;

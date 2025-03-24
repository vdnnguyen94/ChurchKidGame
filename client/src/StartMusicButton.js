// client/src/StartMusicButton.js
import React, { useRef } from 'react';

const StartMusicButton = () => {
  const audioRef = useRef(null);

  const startMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/background.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
    audioRef.current.play().catch(err => console.error('Error playing music:', err));
  };

  return (
    <button onClick={startMusic} style={styles.button}>
      Start Background Music
    </button>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default StartMusicButton;

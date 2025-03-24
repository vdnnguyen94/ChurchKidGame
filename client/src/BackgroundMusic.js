// client/src/BackgroundMusic.js
import { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/background.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(error => {
        console.log('Background music autoplay prevented:', error);
      });
    }
  }, []);

  return null;
};

export default BackgroundMusic;

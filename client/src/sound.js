// client/src/sound.js
export const playSound = (filePath) => {
    const audio = new Audio(filePath);
    audio.currentTime = 0;
    audio.play().catch(err => console.error('Sound play error:', err));
  };
  
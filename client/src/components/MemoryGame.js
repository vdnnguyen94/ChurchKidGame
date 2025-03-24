// client/src/components/MemoryGame.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { playSound } from '../sound';

const MemoryGame = () => {
  const { gameId } = useParams();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]); // indices of currently flipped cards
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    // Fetch images for the game and prepare the deck
    axios.get(`/list/${gameId}`)
      .then(response => {
        const files = response.data.files;
        let cardImages = [];
        files.forEach(file => {
          const imgPath = `/images/${gameId}/${file}`;
          // Add each image twice
          cardImages.push(imgPath);
          cardImages.push(imgPath);
        });
        setCards(shuffleArray(cardImages));
      })
      .catch(error => console.error('Error fetching images:', error));
  }, [gameId]);

  // Helper: shuffle the card images array
  const shuffleArray = (array) => {
    let newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleCardClick = (index) => {
    // If already two cards are flipped or this card is already flipped/matched, do nothing.
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return;
    }

    // Play click sound when a card is clicked
    playSound('/sounds/click.wav');

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [firstIndex, secondIndex] = newFlipped;
        if (cards[firstIndex] === cards[secondIndex]) {
          setMatched([...matched, firstIndex, secondIndex]);
          // Play win sound when a match is found
          playSound('/sounds/win.wav');
        }
        setFlipped([]);
      }, 1000);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Memory Game - {gameId.toUpperCase()}</h1>
      <div style={styles.grid}>
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div 
              key={index} 
              style={styles.card} 
              onClick={() => handleCardClick(index)}
            >
              {isFlipped ? (
                <img src={card} alt="card" style={styles.cardImage} />
              ) : (
                // Display card number (index + 1) on the back
                <div style={styles.cardBack}>{index + 1}</div>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <Link to={`/game/${gameId}`} style={styles.homeLink}>Back to Game Setup</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 150px)',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px'
  },
  card: {
    width: '150px',
    height: '150px',
    border: '2px solid #4CAF50',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '6px'
  },
  cardBack: {
    fontSize: '48px',
    color: '#4CAF50',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  homeLink: {
    marginTop: '20px',
    display: 'inline-block',
    textDecoration: 'none',
    color: '#4CAF50',
    fontSize: '18px'
  }
};

export default MemoryGame;

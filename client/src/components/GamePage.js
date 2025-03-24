// client/src/components/GamePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const GamePage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the list of images for the game
    axios.get(`/list/${gameId}`)
      .then((response) => {
        setImages(response.data.files);
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, [gameId, refresh]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedImage) {
      alert('Please select an image to upload');
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedImage);

    axios.post(`/upload/${gameId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        setMessage('Image uploaded successfully!');
        // Refresh after 2 seconds
        setTimeout(() => {
          setRefresh(!refresh);
          setSelectedImage(null);
          setMessage('');
        }, 2000);
      })
      .catch(error => console.error('Upload error:', error));
  };

  const handleDelete = (filename) => {
    axios.delete(`/delete/${gameId}/${filename}`)
      .then(() => {
        setMessage('Image deleted successfully!');
        setTimeout(() => {
          setRefresh(!refresh);
          setMessage('');
        }, 2000);
      })
      .catch(error => console.error('Delete error:', error));
  };

  return (
    <div style={styles.container}>
      <h1>{gameId.toUpperCase()}</h1>
      {message && <p style={styles.message}>{message}</p>}
      <div style={styles.uploadSection}>
        <input type="file" onChange={handleImageChange} />
        <button style={styles.button} onClick={handleUpload}>Upload Image</button>
      </div>
      <div style={styles.imageList}>
        {images.map((img, index) => (
          <div key={index} style={styles.imageItem}>
            <img src={`/images/${gameId}/${img}`} alt={img} style={styles.image} />
            <button style={styles.deleteButton} onClick={() => handleDelete(img)}>X</button>
          </div>
        ))}
      </div>
      <button style={styles.startButton} onClick={() => navigate(`/memory/${gameId}`)}>
        Start Memory Game
      </button>
      <div>
        <Link to="/" style={styles.homeLink}>Back to Home</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px'
  },
  uploadSection: {
    margin: '20px'
  },
  button: {
    marginLeft: '10px',
    padding: '8px 16px',
    fontSize: '16px'
  },
  imageList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  imageItem: {
    margin: '10px',
    position: 'relative'
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  deleteButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    cursor: 'pointer'
  },
  startButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px'
  },
  homeLink: {
    marginTop: '20px',
    display: 'inline-block',
    textDecoration: 'none',
    color: '#4CAF50',
    fontSize: '16px'
  },
  message: {
    fontSize: '18px',
    color: 'green'
  }
};

export default GamePage;

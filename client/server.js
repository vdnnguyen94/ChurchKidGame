// client/server.js
const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 5000;

// Multer storage settings to upload images into client/public/images/:gameId folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const gameId = req.params.gameId;
    const uploadPath = path.join(__dirname, 'public', 'images', gameId);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Rename file in a friendly manner (picture1, picture2, etc.)
    const gameId = req.params.gameId;
    const uploadPath = path.join(__dirname, 'public', 'images', gameId);
    fs.readdir(uploadPath, (err, files) => {
      let nextNumber = 1;
      if (!err && files.length > 0) {
        nextNumber = files.length + 1;
      }
      const ext = path.extname(file.originalname);
      cb(null, `picture${nextNumber}${ext}`);
    });
  }
});

const upload = multer({ storage });

// Upload endpoint: POST /upload/:gameId
app.post('/upload/:gameId', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Return the path relative to the public folder for use in the client
  res.status(200).send({ imagePath: `/images/${req.params.gameId}/${req.file.filename}` });
});

// Delete endpoint: DELETE /delete/:gameId/:filename
app.delete('/delete/:gameId/:filename', (req, res) => {
  const gameId = req.params.gameId;
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public', 'images', gameId, filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send('Error deleting file.');
    }
    res.status(200).send('File deleted successfully.');
  });
});

// List endpoint: GET /list/:gameId
app.get('/list/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  const dirPath = path.join(__dirname, 'public', 'images', gameId);
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      // Return an empty array if the directory doesn't exist yet
      return res.status(200).json({ files: [] });
    }
    res.status(200).json({ files });
  });
});

// Serve the built React app
app.use(express.static(path.join(__dirname, 'build')));

// Serve images from the public/images folder
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// For any other routes, serve the index.html from the build folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

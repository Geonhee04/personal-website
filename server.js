const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Specific route for pitch deck
app.get('/pitch-deck.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pitch-deck.html'));
});

// Route all other requests to index.html for single-page application behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Add a new book
router.post('/books', async (req, res) => {
  const { title, author, publishedYear, description } = req.body;
  
  try {
    const newBook = new Book({
      title,
      author,
      publishedYear,
      description,
    });
    
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book' });
  }
});

module.exports = router;

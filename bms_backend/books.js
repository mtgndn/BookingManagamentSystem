const express = require('express');
const router = express.Router();

let books = []; // Geçici veri saklama

// Kitap ekleme
router.post('/', (req, res) => {
  const { title, author, year } = req.body;
  const newBook = { id: books.length + 1, title, author, year };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Kitap listeleme
router.get('/', (req, res) => {
  res.json(books);
});

// Belirli bir kitabı listeleme
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// Kitap güncelleme
router.put('/:id', (req, res) => {
  const { title, author, year } = req.body;
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });

  book.title = title;
  book.author = author;
  book.year = year;
  res.json(book);
});

// Kitap silme
router.delete('/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

  books.splice(bookIndex, 1);
  res.status(204).send();
});

module.exports = router;

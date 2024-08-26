const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Kitapları GET et
app.get('/api/books', (req, res) => {
  // Kitapları veritabanından veya local storage'dan çekin
  res.json([
    // Örnek veri
    { id: '1', title: 'Book Title', author: 'Author Name', publishedYear: '2024', description: 'Book Description', timestamp: '2024-08-25 12:00:00' }
  ]);
});

// Kitap ekle
app.post('/api/books', (req, res) => {
  // Kitabı veritabanına veya local storage'a ekleyin
  res.status(201).send();
});

// Kitap sil
app.delete('/api/books/:id', (req, res) => {
  // Kitabı veritabanından veya local storage'dan silin
  res.status(204).send();
});

// Yorum ekle
app.post('/api/comments', (req, res) => {
  // Yorumları ilgili kitabın üzerine ekleyin
  res.status(201).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

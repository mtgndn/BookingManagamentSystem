const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Basit bir GET endpoint'i örneği
app.get('/', (req, res) => {
  res.send('Welcome to the Book API! Use /books to access the book resources.');
});

// Kitap ekleme endpoint'i
app.post('/books', (req, res) => {
  // Bu örnekte, kitap verisini işlemek yerine sadece JSON yanıtı döner
  res.status(201).json({
    message: 'Kitap başarıyla eklendi!',
    data: req.body
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

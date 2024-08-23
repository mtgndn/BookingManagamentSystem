const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/books', (req, res) => {
  const { title, author, publishedYear, description } = req.body;

  if (!title || !author || !publishedYear) {
    return res.status(400).json({ error: 'Title, author, and published year are required' });
  }

  // Veritabanı işlemleri ve diğer işlemler
  // ...

  res.status(201).json({ message: 'Book created successfully' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000, () => console.log('Server running on port 3000'));

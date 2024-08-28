const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const commentRoutes = require('./routes/comments'); // Port numarasını ihtiyacınıza göre ayarlayın

// Middleware
app.use(cors()); // CORS'u etkinleştirir
app.use(bodyParser.json());
app.use('/api/comments', commentRoutes);
 // JSON verilerini işlemek için

// MongoDB bağlantısı
mongoose.connect("mongodb://localhost:27017/bookingmanagament", { // MongoDB bağlantı stringini ihtiyacınıza göre güncelleyin
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Book model
const Book = mongoose.model('Book', new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: String, required: true },
  description: { type: String },
  userId: { type: String, required: true },
  timestamp: { type: String }
}));

// Routes
app.post('/api/books', async (req, res) => {
  try {
    console.log(req.body)
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Unable to add book" });
  }
});

app.get('/api/books/getAllBooks', async (req, res) => {
  try {
    const books = await Book.find(); // Tüm kitapları al
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Unable to fetch books" });
  }
});


app.get('/api/books/getByUserId/:userId', async (req, res) => {
  try {
    console.log(req.params)
    const userId = req.params.userId;
    const books = await Book.find({ userId: userId });
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Unable to fetch books" });
  }
});

app.delete('/api/books/delete/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Unable to delete book" });
  }
});

// Kitap Güncelleme Endpoint'i
app.put('/api/books/update/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const updatedBook = req.body;
    await Book.findByIdAndUpdate(bookId, updatedBook);
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Unable to update book" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// models/Book.js
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: String,
  description: String,
  timestamp: { type: Date, default: Date.now },
  userId: String,
});

module.exports = mongoose.model("Book", BookSchema);

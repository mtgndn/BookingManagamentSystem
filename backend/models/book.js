// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number,
  description: String,
  addedBy: {
    type: String, // Clerk user ID
    required: true
  }
});


module.exports = mongoose.model("Book", BookSchema);

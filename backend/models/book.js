const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: String, required: true },
  description: { type: String },
  userId: { type: String, required: true}
});

module.exports = mongoose.model('Book', bookSchema);

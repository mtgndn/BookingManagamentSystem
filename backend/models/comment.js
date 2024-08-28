const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  prompt: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

module.exports = mongoose.model('Comment', commentSchema);

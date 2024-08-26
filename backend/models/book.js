const mongoose = require("mongoose");

// Define the schema
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

// Export the model
module.exports = mongoose.model("Book", BookSchema);

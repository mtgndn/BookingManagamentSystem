const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Add a new comment
router.post('/', async (req, res) => {
    try {
        const newComment = new Comment({
            name: req.body.name,
            surname: req.body.surname,
            prompt: req.body.prompt,
            timestamp: new Date().toISOString(), // ISO formatta tarih kaydı
          });
          
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bookRoutes = require('./routes/books');
const commentRoutes = require('./routes/comments');

app.use(express.json());
app.use(cors());

app.use('/api/books', bookRoutes);
app.use('/api/comments', commentRoutes);


mongoose.connect('mongodb://localhost:27017/bookingmanagament', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.listen(5000, () => {
    console.log('Server is running on port 5000');
    
});

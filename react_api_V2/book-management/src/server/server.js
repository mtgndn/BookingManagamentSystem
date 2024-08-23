const express = require('express');
const cors = require('cors'); 
const apiUrl = 'http://localhost:5000/api/books';
const cors = require('cors');



app.use(cors()); 



const app = express();
app.use(cors()); 

app.use(express.json());

const bookRoutes = require('./routes/book.routes');
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

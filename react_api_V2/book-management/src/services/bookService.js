import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', 
  timeout: 10000, 
});


export const getBooks = async () => {
  try {
    const response = await instance.get('/books'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addBook = async (book) => {
  try {
    const response = await instance.post('/books', book); 
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    await instance.delete(`/books/${id}`); 
  } catch (error) {
    console.error('Error deleting book:', error.response ? error.response.data : error.message);
    throw error;
  }
};

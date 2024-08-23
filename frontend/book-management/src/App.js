import React, { useEffect, useState } from 'react';
import { getBooks, addBook, deleteBook } from './services/bookService';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

const App = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  const handleAddBook = async (book) => {
    try {
      await addBook(book);
      fetchBooks(); 
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book._id !== id)); 
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book Management System</h1>
      <BookForm addBook={handleAddBook} />
      <BookList books={books} onDelete={handleDeleteBook} />
    </div>
  );
};

export default App;

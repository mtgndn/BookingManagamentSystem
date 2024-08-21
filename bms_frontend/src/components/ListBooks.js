// src/components/ListBooks.js

import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/apiService'; // Servis fonksiyonunu import edin

function ListBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Kitap Listesi</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} ({book.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListBooks;

import React from 'react';
import './BookList.css';

const BookList = ({ books, onDelete, onEdit }) => {
  console.log('Books in BookList:', books); 

  if (books.length === 0) {
    return <div className="empty-message">No books available</div>;
  }

  return (
    <div className="book-list-container">
      <ul className="book-list">
        {books.map((book) => (
          <li key={book._id} className="book-item">
            <div>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Published Year:</strong> {book.publishedYear}</p>
              <p><strong>Description:</strong> {book.description}</p>
            </div>
            <button onClick={() => onDelete(book._id)}>Delete</button>
            <button onClick={() => onEdit(book)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;

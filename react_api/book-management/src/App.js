import React, { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm'; // Import ekleyin

function App() {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleFormSubmit = async (data) => {
    if (selectedBook) {
      // Kitap güncelleme kodu buraya gelecek
      console.log('Updating book:', data);
    } else {
      // Yeni kitap ekleme kodu buraya gelecek
      console.log('Adding book:', data);
    }
    // Form gönderildikten sonra kitap listesini güncelleyin
    
  };

  return (
    <div className="App">
      <BookForm
        onSubmit={handleFormSubmit}
        defaultValues={selectedBook || {}}
      />
      <BookList
        onBookSelect={(book) => setSelectedBook(book)}
      />
    </div>
  );
}

export default App;

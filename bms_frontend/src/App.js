// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListBooks from './components/ListBooks';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook'; // Güncelleme bileşenini import edin

function App() {
  return (
    <Router>
      <div>
        <h1>Kitap Yönetim Sistemi</h1>
        <Routes>
          <Route path="/" element={<ListBooks />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/update/:id" element={<UpdateBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

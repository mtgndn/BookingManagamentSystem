// src/services/apiService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000'; // API'nizin URL'si

// Kitapları almak için GET isteği
export const getBooks = () => axios.get(`${API_URL}/books`);

// Belirli bir kitabı almak için GET isteği
export const getBookById = (id) => axios.get(`${API_URL}/books/${id}`);

// Yeni bir kitap eklemek için POST isteği
export const addBook = (book) => axios.post(`${API_URL}/books`, book);

// Var olan bir kitabı güncellemek için PUT isteği
export const updateBook = (id, book) => axios.put(`${API_URL}/books/${id}`, book);

// Bir kitabı silmek için DELETE isteği
export const deleteBook = (id) => axios.delete(`${API_URL}/books/${id}`);

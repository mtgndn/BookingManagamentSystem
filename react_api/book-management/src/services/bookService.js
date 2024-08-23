import axios from 'axios';

const API_URL = 'http://localhost:3000/books'; // Backend API URL'inizi buraya yazın

export const getBooks = () => {
  return axios.get(API_URL);
};

export const getBook = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const addBook = (book) => {
  return axios.post(API_URL, book);
};

export const updateBook = (id, book) => {
  return axios.put(`${API_URL}/${id}`, book);
};

export const deleteBook = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// src/components/AddBook.js

import React from 'react';
import { useForm } from 'react-hook-form';
import { addBook } from '../services/apiService'; // Servis fonksiyonunu import edin

function AddBook() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await addBook(data);
      // Başarıyla ekledikten sonra gerekli işlemleri yapın (örn. yönlendirme)
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <h2>Yeni Kitap Ekle</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Başlık</label>
          <input
            id="title"
            {...register('title', { required: 'Başlık gereklidir' })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="author">Yazar</label>
          <input
            id="author"
            {...register('author', { required: 'Yazar gereklidir' })}
          />
          {errors.author && <p>{errors.author.message}</p>}
        </div>
        <div>
          <label htmlFor="year">Yıl</label>
          <input
            id="year"
            type="number"
            {...register('year', { required: 'Yıl gereklidir' })}
          />
          {errors.year && <p>{errors.year.message}</p>}
        </div>
        <button type="submit">Kitap Ekle</button>
      </form>
    </div>
  );
}

export default AddBook;

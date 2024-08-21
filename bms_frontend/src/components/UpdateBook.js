import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../services/apiService';

function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const titleRef = useRef(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        const book = response.data;
        setValue('title', book.title);
        setValue('author', book.author);
        setValue('year', book.year);
        titleRef.current.focus(); // Başlık input alanına odaklan
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateBook(id, data);
      navigate('/');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <h2>Kitap Güncelle</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Başlık</label>
          <input
            id="title"
            {...register('title', { required: 'Başlık gereklidir' })}
            ref={titleRef} // useRef ile referans atama
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
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
}

export default UpdateBook;

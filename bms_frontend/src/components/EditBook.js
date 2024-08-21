import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/books/${id}`);
        const book = response.data;
        setValue('title', book.title);
        setValue('author', book.author);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/books/${id}`, data);
      history.push('/');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Kitap Güncelle</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Başlık:
          <input {...register('title', { required: 'Başlık gerekli' })} />
          {errors.title && <p>{errors.title.message}</p>}
        </label>
        <br />
        <label>
          Yazar:
          <input {...register('author', { required: 'Yazar gerekli' })} />
          {errors.author && <p>{errors.author.message}</p>}
        </label>
        <br />
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
};

export default EditBook;

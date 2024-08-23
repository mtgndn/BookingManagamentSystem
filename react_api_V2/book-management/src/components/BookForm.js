import React from 'react';
import { useForm } from 'react-hook-form';
import './BookForm.css'; 

const BookForm = ({ addBook }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await addBook(data);
      alert('Book added successfully');
    } catch (error) {
      alert('Failed to add book');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="title"
          {...register('title', { required: 'Title is required' })}
          placeholder="Title"
        />
        {errors.title && <p>{errors.title.message}</p>}

        <input
          name="author"
          {...register('author', { required: 'Author is required' })}
          placeholder="Author"
        />
        {errors.author && <p>{errors.author.message}</p>}

        <input
          name="publishedYear"
          type="text"
          {...register('publishedYear', {
            required: 'Published Year is required',
            pattern: {
              value: /^\d{4}$/,
              message: 'Published Year must be a 4-digit number'
            }
          })}
          placeholder="Published Year"
        />
        {errors.publishedYear && <p>{errors.publishedYear.message}</p>}

        <textarea
          name="description"
          {...register('description')}
          placeholder="Description"
        />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;

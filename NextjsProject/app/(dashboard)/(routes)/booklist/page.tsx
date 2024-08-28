"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Heading } from "@/components/heading";
import { List } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface Book {
  _id: string;
  title: string;
  author: string;
  publishedYear: string;
  description?: string;
  userId: string;
}

const BookListPage = () => {
  const { user } = useUser();
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [description, setDescription] = useState("");
  const booksPerPage = 10;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (user?.id) {
          const userId = user.id;
          const response = await axios.get(`http://localhost:5000/api/books/getByUserId/${userId}`);
          setBooks(response.data);
        } else {
          setError("User information not available.");
        }
      } catch (error) {
        setError("Error fetching books.");
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [user?.id]);

  const handleDelete = async (bookId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/delete/${bookId}`);
      setBooks(books.filter(book => book._id !== bookId));
    } catch (error) {
      setError("Error deleting book.");
      console.error("Error deleting book:", error);
    }
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setPublishedYear(book.publishedYear);
    setDescription(book.description || "");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      try {
        await axios.put(`http://localhost:5000/api/books/update/${editingBook._id}`, {
          title,
          author,
          publishedYear,
          description
        });
        // Güncellenmiş kitabı state'e yansıt
        setBooks(books.map(book =>
          book._id === editingBook._id
            ? { ...book, title, author, publishedYear, description }
            : book
        ));
        setEditingBook(null);
      } catch (error) {
        setError("Error updating book.");
        console.error("Error updating book:", error);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = books.slice(startIndex, startIndex + booksPerPage);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div>
      <Heading
        title="My Book List"
        description="View the books you've added."
        icon={List}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
      />
      <div className="px-4 lg:px-8">
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-4">
          {currentBooks.length === 0 ? (
            <p className="text-gray-500">You haven't added any books yet.</p>
          ) : (
            currentBooks.map((book) => (
              <div key={book._id} className="border p-4 rounded-lg">
                <h2 className="text-xl font-bold">{book.title}</h2>
                <p className="text-gray-700">{book.author}</p>
                <p className="text-gray-600">Published Year: {book.publishedYear}</p>
                {book.description && <p className="text-gray-500 mt-2">{book.description}</p>}
                {book.userId === user?.id && (
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleEditClick(book)}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border rounded ${currentPage === page ? "bg-green-500 text-white" : "bg-white text-green-500"}`}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ))}
        </div>
        {/* Modal for Editing */}
        {editingBook && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
              <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium">Title</label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="author" className="block text-sm font-medium">Author</label>
                  <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="publishedYear" className="block text-sm font-medium">Published Year</label>
                  <input
                    id="publishedYear"
                    type="text"
                    value={publishedYear}
                    onChange={(e) => setPublishedYear(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingBook(null)}
                    className="px-4 py-2 bg-gray-300 text-black rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Update Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookListPage;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Heading } from "@/components/heading";
import { List } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  author: string;
  publishedYear: string;
  description?: string;
  userId: string;
}

const SocialBookPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const booksPerPage = 10;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books/getAllBooks");
        setBooks(response.data);
      } catch (error) {
        setError("Error fetching books.");
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []); // Bağımlılık dizisinde hiçbir şey olmadığı için sadece bir kez çalışır

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = books.slice(startIndex, startIndex + booksPerPage);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div>
      <Heading
        title="All Books"
        description="View the books added by all users."
        icon={List}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
      />
      <div className="px-4 lg:px-8">
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-4">
          {currentBooks.length === 0 ? (
            <p className="text-gray-500">No books available.</p>
          ) : (
            currentBooks.map((book) => (
              <div key={book._id} className="border p-4 rounded-lg">
                <h2 className="text-xl font-bold">{book.title}</h2>
                <p className="text-gray-700">{book.author}</p>
                <p className="text-gray-600">Published Year: {book.publishedYear}</p>
                {book.description && <p className="text-gray-500 mt-2">{book.description}</p>}
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialBookPage;

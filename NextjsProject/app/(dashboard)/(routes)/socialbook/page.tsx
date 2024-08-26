"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Heading } from "@/components/heading";
import { BookOpen } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: string;
  description?: string;
  timestamp: string;
  userId: string;
}

const SocialBookPage = () => {
  const { user } = useUser();
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        const otherUsersBooks = response.data.filter(
          (book: Book) => book.userId !== user?.id
        );
        setBooks(otherUsersBooks);
      } catch (error) {
        setError("Unable to fetch books.");
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [user?.id]);

  return (
    <div>
      <Heading
        title="Social Book"
        description="View books added by other users."
        icon={BookOpen}
        iconColor="text-purple-500"
        bgColor="bg-purple-500/10"
      />
      <div className="px-4 lg:px-8">
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-4 mt-4">
          {books.length === 0 && (
            <p className="text-gray-500">No books added by other users yet.</p>
          )}
          {books.map((book) => (
            <div key={book.id} className="border p-4 rounded-lg">
              <div className="font-bold">
                {book.title} - {book.author} ({book.publishedYear})
              </div>
              <div>{book.description}</div>
              <div className="text-gray-500 text-sm mt-2">
                Added on: {book.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialBookPage;

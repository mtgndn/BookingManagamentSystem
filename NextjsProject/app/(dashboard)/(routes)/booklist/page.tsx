"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Heading } from "@/components/heading";
import { List } from "lucide-react";
import { useUser } from "@clerk/nextjs"; // Kullanıcı bilgilerini almak için Clerk kullanılıyor

// Kitap bilgilerini temsil eden arayüz
interface Book {
  _id: string;
  title: string;
  author: string;
  publishedYear: string;
  description?: string;
  userId: string; // Kullanıcıya ait kitaplar için userId alanı
}

const BookListPage = () => {
  const { user } = useUser(); // Şu anki giriş yapmış kullanıcıyı alır
  const [books, setBooks] = useState<Book[]>([]); // Kitapları tutan durum
  const [error, setError] = useState<string | null>(null); // Hata mesajlarını tutan durum

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (user?.id) {
          // Kullanıcının kendi eklediği kitapları filtrele
          const response = await axios.get("http://localhost:5000/api/books", {
            params: { userId: user.id } // Kullanıcı ID'sine göre kitapları filtrele
          });
          setBooks(response.data); // Filtrelenmiş kitapları duruma ayarla
        } else {
          setError("User information not available.");
        }
      } catch (error) {
        setError("Error fetching books.");
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks(); // Component mount olduğunda kitapları getirir
  }, [user?.id]); // Kullanıcının ID'si değişirse efekti tekrar çalıştırır

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
        {error && <p className="text-red-500">{error}</p>} {/* Hata mesajlarını gösterir */}
        <div className="space-y-4">
          {books.length === 0 ? (
            <p className="text-gray-500">You haven't added any books yet.</p> 
          ) : (
            books.map((book) => (
              <div key={book._id} className="border p-4 rounded-lg">
                <h2 className="text-xl font-bold">{book.title}</h2> {/* Kitap başlığı */}
                <p className="text-gray-700">{book.author}</p> {/* Kitap yazarı */}
                <p className="text-gray-600">Published Year: {book.publishedYear}</p> {/* Yayın yılı */}
                {book.description && <p className="text-gray-500 mt-2">{book.description}</p>} {/* Açıklama varsa */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookListPage;

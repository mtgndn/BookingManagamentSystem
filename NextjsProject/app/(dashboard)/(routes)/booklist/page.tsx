"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Heading } from "@/components/heading";
import { BookOpen } from "lucide-react";
import { useUser } from "@clerk/nextjs"; // Kullanıcı doğrulama için Clerk'i kullanıyoruz

// Kitap bilgilerini temsil eden TypeScript arayüzü
interface Book {
  _id: string;
  title: string;
  author: string;
  publishedYear: string;
  description?: string;
}

const BookListPage = () => {
  const { user } = useUser(); // Şu anda giriş yapmış olan kullanıcıyı alıyoruz
  const [books, setBooks] = useState<Book[]>([]); // Kitapları tutacak durum (state)
  const [error, setError] = useState<string | null>(null); // Hata durumunu tutacak değişken

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) {
        setError("Kullanıcı doğrulanmadı."); // Kullanıcı doğrulanmamışsa hata mesajı göster
        return;
      }

      try {
        // Kullanıcının kitaplarını getirmek için API'ye istek gönderiyoruz
        const response = await axios.get(`http://localhost:5000/api/books?userId=${user.id}`);
        setBooks(response.data); // Gelen kitapları duruma (state) kaydediyoruz
      } catch (error) {
        setError("Kitapları getirme hatası."); // Hata durumunda mesaj göster
        console.error("Kitapları getirme hatası:", error);
      }
    };

    fetchBooks();
  }, [user]); // Kullanıcı değiştiğinde fetchBooks fonksiyonu çalışacak

  return (
    <div>
      <Heading
        title="Book List"
        description="Kendi kitaplarınızı görün."
        icon={BookOpen}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
      />
      <div className="px-4 lg:px-8">
        {error && <p className="text-red-500">{error}</p>} {/* Hata varsa göster */}
        <div className="space-y-4">
          {books.length === 0 && (
            <p className="text-gray-500">Henüz eklenmiş kitap yok.</p> 
          )}
          {books.map((book) => (
            <div key={book._id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-bold">{book.title}</h2> {/* Kitap başlığı */}
              <p className="text-gray-700">{book.author}</p> {/* Kitap yazarı */}
              <p className="text-gray-600">Yayın Yılı: {book.publishedYear}</p> {/* Yayın yılı */}
              {book.description && <p className="text-gray-500 mt-2">{book.description}</p>} {/* Açıklama varsa göster */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookListPage;

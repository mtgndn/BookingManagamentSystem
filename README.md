# Book Management System
## Projenin amacı
-Bu proje, temel CRUD işlemleri (Create, Read, Update, Delete) için bir kitap yönetim sistemi uygulamasıdır. Kullanıcılar kitapları ekleyebilir, güncelleyebilir, silebilir ve listeleyebilir. Proje, MongoDB, Express.js, React, Node.js kullanılarak geliştirilmiştir.
### Özellikler
-Kitapları listeleme

-Kitap ekleme

-Kitap güncelleme

-Kitap silme

### Teknolojiler
-Frontend: React.js

-Backend: Node.js ve Express.js

-Database: MongoDB

-CSS: Bootstrap ve özelleştirilmiş stiller

## Kurulum
### Gereksinimler
-Node.js (>=14.x.x)

-MongoDB

### Projeyi Klonlama
- git clone https://github.com/mtgndn/BookingManagamentSystem.git

### Backend Kurulumu
1) Backend dizinine gidin : cd server

2) Gerekli paketleri yükleyin: npm install
   

4) MongoDB bağlantı ayarlarını yapın: 'server/config/db.js dosyasında MongoDB URI'nizi güncelleyin.

5) Sunucuyu başlatın: npm start

### Frontend Kurulumu

1) Frontend dizinine gidin: cd client

2) Gerekli paketleri yükleyin: npm install

3) Uygulamayı başlatın: npm start
   - Tarayıcınızda http://localhost:3000 adresine giderek uygulamayı görüntüleyebilirsiniz.

### Kullanım

- Kitap Ekleme: Kitap formunu kullanarak yeni kitaplar ekleyebilirsiniz.

- Kitap Güncelleme: Kitap listesinde "Edit" butonuna tıklayarak kitap bilgilerini güncelleyebilirsiniz.

- Kitap Silme: Kitap listesinde "Delete" butonuna tıklayarak kitapları silebilirsiniz.

### API Endpoints
-GET /api/books - Tüm kitapları listele

-POST /api/books - Yeni bir kitap ekle

-PUT /api/books/:id - Kitap bilgilerini güncelle

-DELETE /api/books/:id - Bir kitabı sil

# Katkıda Bulunma
Eğer bu projeye katkıda bulunmak isterseniz, lütfen aşağıdaki adımları izleyin:

-Fork repo

-Yeni bir feature branch oluşturun (git checkout -b feature/AmazingFeature)

-Değişikliklerinizi yapın ve commit edin (git commit -am 'Add some AmazingFeature')

-Branch'inizi push edin (git push origin feature/AmazingFeature)

-Pull request oluşturun

# Lisans
Bu proje MIT Lisansı altında lisanslanmıştır.




# Aji Mitra Statistika — Website Edukasi Statistik

Website multi-page untuk platform edukasi statistika, metodologi penelitian, dan riset by **PT. Amanah Jana Insani**.

---

## Prasyarat

- [Node.js](https://nodejs.org/) (v18+ direkomendasikan)
- npm (termasuk bersama Node.js)

---

## Cara Menjalankan Lokal

### 1. Install Dependensi

```bash
npm install
```

### 2. Jalankan Backend Server

```bash
node server.js
```

Server akan berjalan di: **http://localhost:3000**

Website dapat diakses di browser dengan membuka:
- Homepage: http://localhost:3000
- Bootcamp: http://localhost:3000/bootcamp.html
- Short Class: http://localhost:3000/short-class.html
- Private Class: http://localhost:3000/private-class.html
- Konsultasi: http://localhost:3000/konsultasi.html
- Detail Program: http://localhost:3000/program/1 (ganti angka sesuai ID)

---

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/programs` | Semua program |
| GET | `/api/programs?type=bootcamp` | Filter bootcamp |
| GET | `/api/programs?type=short-class` | Filter short class |
| GET | `/api/programs?search=SPSS` | Cari program |
| GET | `/api/programs/:id` | Detail satu program |
| GET | `/api/testimonials` | Semua testimoni |
| POST | `/api/inquiry` | Simpan form inquiry |

---

## Cara Expose ke URL Publik (untuk Presentasi)

### Opsi 1: ngrok (Direkomendasikan)

```bash
# Pastikan node server.js sudah berjalan di terminal lain
npx ngrok http 3000
```

Salin URL yang muncul (contoh: `https://abc123.ngrok.io`) dan bagikan.

### Opsi 2: localtunnel (Tanpa akun)

```bash
npx localtunnel --port 3000
```

---

## Struktur File

```
aji-mitra-statistika/
├── server.js              # Backend Express
├── package.json
├── README.md
├── data/
│   ├── programs.json      # 12 program (6 bootcamp + 6 short class)
│   ├── testimonials.json  # 5 testimoni
│   └── inquiries.json     # Penyimpanan form
└── public/
    ├── index.html         # Homepage
    ├── bootcamp.html      # Halaman bootcamp
    ├── short-class.html   # Halaman short class
    ├── private-class.html # Halaman private class
    ├── konsultasi.html    # Halaman konsultasi
    ├── program-detail.html # Detail program (dinamis)
    ├── css/style.css      # Stylesheet global
    ├── js/main.js         # JavaScript frontend
    └── assets/logo.png    # Logo brand
```

---

## Brand Identity

- **Brand:** Aji Mitra Statistika
- **Perusahaan:** PT. Amanah Jana Insani
- **Tagline:** *"Mitra Terpercaya untuk Riset dan Statistika Anda"*
- **Warna Utama:** Deep Blue `#1B3A6B`, Medium Blue `#2E6DB4`, Gold `#F0A500`

---

## Teknologi

- **Backend:** Node.js + Express.js
- **Frontend:** HTML5 + Vanilla CSS + Vanilla JS
- **Database:** JSON file (`/data/`)
- **Font:** Poppins + Inter (Google Fonts)

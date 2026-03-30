# Struktur Ulang Alur Layanan dan Program Lintas Divisi

Sesuai permintaan Anda, kita akan merombak bagaimana program (Bootcamp, Short Class, Private Class) ditampilkan di berbagai halaman agar pengunjung diarahkan ke **Halaman Detail Produk** alih-alih langsung dialihkan ke WhatsApp. Pengalihan WhatsApp hanya dikhususkan untuk tombol "Konsultasi".

## User Review Required

> [!IMPORTANT]
> **Perubahan Alur UX yang Signifikan:**
> Saat ini, di halaman `AjiBiz`, tombol "Bootcamp AjiBiz" langsung membuka WhatsApp. Setelah perubahan ini, akan ada bagian **"Program Tersedia"** yang menampilkan kartu produk (mirip halaman Bootcamp), yang jika diklik akan membuka halaman `/program/bootcamp-ajibiz-xxx`. Saya butuh persetujuan Anda apakah konsep *grouping* ini yang Anda harapkan.

## Proposed Changes

---

### Bagian 1: Halaman Ekosistem Program (Hub Pages)
Menghapus bagian statis "Format Belajar" yang me-link ke WhatsApp, dan menggantinya dengan fetching API dinamis yang memunculkan `<ProgramCard />` khusus untuk divisi tersebut.

#### [MODIFY] [program-ajistat/page.tsx](file:///d:/Aji%20Mitra%20Statistika%20%28Faiz%29/Website%20dummy%20Aji%20Mitra%20Statistika/frontend/src/app/program-ajistat/page.tsx)
#### [MODIFY] [program-ajibiz/page.tsx](file:///d:/Aji%20Mitra%20Statistika%20%28Faiz%29/Website%20dummy%20Aji%20Mitra%20Statistika/frontend/src/app/program-ajibiz/page.tsx)
#### [MODIFY] [program-ajipr/page.tsx](file:///d:/Aji%20Mitra%20Statistika%20%28Faiz%29/Website%20dummy%20Aji%20Mitra%20Statistika/frontend/src/app/program-ajipr/page.tsx)
#### [MODIFY] [program-ajidigi/page.tsx](file:///d:/Aji%20Mitra%20Statistika%20%28Faiz%29/Website%20dummy%20Aji%20Mitra%20Statistika/frontend/src/app/program-ajidigi/page.tsx)
#### [MODIFY] [program-ajilanguage/page.tsx](file:///d:/Aji%20Mitra%20Statistika%20%28Faiz%29/Website%20dummy%20Aji%20Mitra%20Statistika/frontend/src/app/program-ajilanguage/page.tsx)
*   **Aksi:** 
    1. Import `programsApi` dan `useQuery`.
    2. Hapus variabel `FORMATS` beserta section-nya.
    3. Tambahkan section baru yang me-render list program tempat `tags` sesuai dengan nama halaman (misal: "AjiBiz"). Jika load, tampilkan `<ProgramCardSkeleton />`.

---

### Bagian 2: Halaman Kategori Layanan (Bootcamp, Short Class, Private Class)
Agar pengunjung tidak bingung melihat kelas *AjiBiz* berjejer di samping kelas *AjiStat* tanpa pembatas.

#### [MODIFY] [bootcamp/page.tsx](file:///d:/Aji%20Mitra%20Statistika%20%28Faiz%29/Website%20dummy%20Aji%20Mitra%20Statistika/frontend/src/app/bootcamp/page.tsx)
#### [MODIFY] [short-class/page.tsx](file:///d:/Aji%20Mitra%20Statistika%20%28Faiz%29/Website%20dummy%20Aji%20Mitra%20Statistika/frontend/src/app/short-class/page.tsx)
#### [MODIFY] [private-class/page.tsx](file:///d:/Aji%20Mitra%20Statistika%20%28Faiz%29/Website%20dummy%20Aji%20Mitra%20Statistika/frontend/src/app/private-class/page.tsx)
*   **Aksi:**
    1. Update tombol filter `TAGS` untuk juga memiliki opsi (AjiStat, AjiBiz, AjiPR, dll).
    2. Tambahkan logika *Grouping/Pembagian Section* saat mapping produk (Misalnya: Ada Sub-Header "Program dari AjiBiz" lalu produknya, dst).

## Open Questions

> [!NOTE]
> 1. Karena datanya masih *mock/dummy* dengan sedikit program untuk non-AjiStat (1-2 dari file JSON yang saya buat), apakah tampilan *layout grid* yang sedikit lowong untuk divisi lain tidak apa-apa untuk sementara ini?
> 2. Apakah Anda setuju jika di halaman Bootcamp, kita kelopokkan menjadi (Bootcamp AjiStat, Bootcamp AjiBiz, dst)?

## Verification Plan

### Manual Verification
- Navigasi ke `/program-ajibiz`, periksa apakah program Bootcamp Business Plan dan Short Class Digital Marketing otomatis muncul sebagai *Card* dan bukannya link statis WA.
- Klik produk dari `/program-ajibiz`, dan pastikan berpindah ke halaman detail produk `/program/slug`. 
- Kunjungi `/bootcamp` dan lihat apakah filter divisi & pengelompokan UI sudah bekerja.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Short Class — Belajar Singkat, Hasil Nyata',
  description: 'Kelas singkat 1–3 jam yang padat materi dan langsung dapat dipraktikkan. Topik spesifik mulai dari SPSS, visualisasi data, hingga penulisan artikel ilmiah.',
  keywords: ['short class statistika', 'kelas singkat SPSS', 'short class python', 'belajar data singkat', 'aji institute short class'],
  openGraph: {
    title: 'Short Class — Aji Institute',
    description: 'Kelas singkat padat materi 1–3 jam. Langsung praktik, hasil nyata.',
    type: 'website',
  },
};

export default function ShortClassLayout({ children }: { children: React.ReactNode }) {
  return children;
}

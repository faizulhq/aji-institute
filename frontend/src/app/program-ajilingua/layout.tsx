import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Program AjiLingua — Bahasa Inggris Akademik & Profesional',
  description: 'Program pelatihan AjiLingua: Academic Writing, IELTS/TOEFL, Business English, Speaking, Publication Support, dan Interview Preparation. Untuk mahasiswa, dosen, peneliti, dan profesional.',
  keywords: ['AjiLingua', 'IELTS', 'TOEFL', 'bahasa inggris', 'academic writing', 'business english', 'beasiswa', 'aji institute'],
  openGraph: {
    title: 'Program AjiLingua — Bahasa Inggris Akademik | Aji Institute',
    description: 'Tingkatkan kemampuan bahasa Inggris akademik dan profesional bersama tim expert AjiLingua.',
    type: 'website',
  },
};

export default function ProgramAjiLinguaLayout({ children }: { children: React.ReactNode }) {
  return children;
}

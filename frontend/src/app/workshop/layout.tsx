import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workshop — Pelatihan Singkat Intensif',
  description: 'Workshop Aji Institute: sesi pelatihan singkat dan intensif dengan topik terkini — statistika, bisnis, komunikasi, digital marketing, dan bahasa Inggris. Cocok untuk individu dan organisasi.',
  keywords: ['workshop', 'pelatihan singkat', 'workshop statistika', 'workshop bisnis', 'workshop komunikasi', 'aji institute'],
  openGraph: {
    title: 'Workshop Intensif | Aji Institute',
    description: 'Tingkatkan kompetensi Anda dalam sesi workshop singkat dan intensif bersama Aji Institute.',
    type: 'website',
  },
};

export default function WorkshopLayout({ children }: { children: React.ReactNode }) {
  return children;
}

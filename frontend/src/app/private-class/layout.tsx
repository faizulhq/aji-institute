import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Class — Bimbingan 1-on-1 Personal',
  description: 'Mentoring statistika dan riset secara personal bersama instruktur ahli Aji Institute. Jadwal fleksibel, kurikulum custom, dan cocok untuk skripsi, tesis, dan disertasi.',
  keywords: ['private class statistika', 'bimbingan 1-on-1 SPSS', 'kelas privat SmartPLS', 'bimbingan skripsi', 'aji institute private'],
  openGraph: {
    title: 'Private Class — Aji Institute',
    description: 'Mentoring personal 1-on-1 dengan instruktur ahli. Jadwal 100% fleksibel.',
    type: 'website',
  },
};

export default function PrivateClassLayout({ children }: { children: React.ReactNode }) {
  return children;
}

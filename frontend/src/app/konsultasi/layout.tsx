import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konsultasi Olah Data & Riset',
  description: 'Layanan konsultasi olah data, analisis statistika, dan pendampingan skripsi/tesis/disertasi profesional oleh tim ahli Aji Institute.',
  keywords: ['konsultasi olah data', 'konsultasi statistika', 'jasa analisis SPSS', 'bantuan skripsi', 'konsultasi riset', 'aji institute konsultasi'],
  openGraph: {
    title: 'Konsultasi Data & Riset — Aji Institute',
    description: 'Tim ahli kami siap membantu analisis data, skripsi, tesis, dan disertasi Anda.',
    type: 'website',
  },
};

export default function KonsultasiLayout({ children }: { children: React.ReactNode }) {
  return children;
}

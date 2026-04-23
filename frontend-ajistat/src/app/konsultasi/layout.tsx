import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konsultasi Data — Jasa Olah Data & Analisis Statistik',
  description: 'Layanan konsultasi dan jasa olah data AjiStat: analisis statistik profesional untuk skripsi, tesis, disertasi, jurnal, dan riset institusional. SPSS, SmartPLS, R, Python, NVivo, SEM, Regresi.',
  keywords: ['jasa olah data', 'konsultasi statistik', 'jasa SPSS', 'jasa SmartPLS', 'analisis data skripsi', 'olah data tesis', 'AjiStat', 'konsultasi riset'],
  openGraph: {
    title: 'Konsultasi & Jasa Olah Data Statistik | AjiStat',
    description: 'Layanan konsultasi data profesional untuk skripsi, tesis, disertasi, dan riset institusional.',
    type: 'website',
  },
};

export default function KonsultasiLayout({ children }: { children: React.ReactNode }) {
  return children;
}

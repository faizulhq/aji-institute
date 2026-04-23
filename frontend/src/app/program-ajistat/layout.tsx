import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Program AjiStat — Statistika & Analisis Data',
  description: 'Program pelatihan AjiStat: Bootcamp, Short Class, Private Class, dan Konsultasi Data. Kuasai SPSS, SmartPLS, R, Python, NVivo, EViews, STATA untuk riset akademik dan profesional.',
  keywords: ['AjiStat', 'pelatihan statistika', 'SPSS', 'SmartPLS', 'analisis data', 'konsultasi riset', 'metodologi penelitian', 'skripsi', 'tesis', 'disertasi'],
  openGraph: {
    title: 'Program AjiStat — Statistika & Analisis Data | Aji Institute',
    description: 'Kuasai SPSS, SmartPLS, R, Python, NVivo, dan lebih banyak lagi bersama tim expert AjiStat.',
    type: 'website',
  },
};

export default function ProgramAjiStatLayout({ children }: { children: React.ReactNode }) {
  return children;
}

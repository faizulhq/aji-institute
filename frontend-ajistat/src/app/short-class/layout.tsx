import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Short Class — Kelas Statistika Singkat & Tematik',
  description: 'Short Class AjiStat: kelas statistika singkat 1–2 hari dengan topik spesifik. SPSS, SmartPLS, Uji Hipotesis, Regresi, SEM, NVivo, dan banyak lagi. Cocok untuk yang ingin fokus pada satu topik.',
  keywords: ['short class statistika', 'kelas SPSS', 'kelas SmartPLS', 'uji hipotesis', 'regresi', 'SEM', 'AjiStat', 'olah data'],
  openGraph: {
    title: 'Short Class Statistika | AjiStat',
    description: 'Kelas statistika singkat dan tematik 1–2 hari bersama tim expert AjiStat.',
    type: 'website',
  },
};

export default function ShortClassLayout({ children }: { children: React.ReactNode }) {
  return children;
}

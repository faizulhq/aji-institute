import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Class — Bimbingan Statistika Personal 1-on-1',
  description: 'Private Class AjiStat: bimbingan statistika personal 1-on-1 sesuai kebutuhan dan jadwal Anda. SPSS, SmartPLS, R, Python, NVivo untuk skripsi, tesis, disertasi, dan riset profesional.',
  keywords: ['private class statistika', 'bimbingan statistika', 'les SPSS', 'les SmartPLS', 'olah data privat', 'skripsi', 'tesis', 'AjiStat'],
  openGraph: {
    title: 'Private Class Statistika 1-on-1 | AjiStat',
    description: 'Bimbingan statistika personal sesuai kebutuhan dan jadwal Anda bersama expert AjiStat.',
    type: 'website',
  },
};

export default function PrivateClassLayout({ children }: { children: React.ReactNode }) {
  return children;
}

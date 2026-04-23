import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bootcamp Statistika & Analisis Data',
  description: 'Bootcamp AjiStat: program intensif 3–5 hari menguasai SPSS, SmartPLS, R, Python, NVivo, EViews, STATA. Dipandu fasilitator expert untuk skripsi, tesis, dan disertasi.',
  keywords: ['bootcamp statistika', 'bootcamp SPSS', 'bootcamp SmartPLS', 'bootcamp R', 'bootcamp NVivo', 'olah data', 'AjiStat', 'skripsi', 'tesis'],
  openGraph: {
    title: 'Bootcamp Statistika & Analisis Data | AjiStat',
    description: 'Kuasai SPSS, SmartPLS, R, Python dalam program bootcamp intensif 3–5 hari bersama tim expert AjiStat.',
    type: 'website',
  },
};

export default function BootcampLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bootcamp Intensif Statistika & Riset',
  description: 'Program bootcamp intensif 3–5 hari dengan data riset nyata. SPSS, SmartPLS, Python, R, dan lebih banyak lagi. Dipandu fasilitator berpengalaman via Zoom.',
  keywords: ['bootcamp statistika', 'bootcamp SPSS', 'bootcamp SmartPLS', 'pelatihan riset', 'aji institute bootcamp'],
  openGraph: {
    title: 'Bootcamp Intensif — Aji Institute',
    description: 'Kuasai statistika dan metodologi penelitian dalam 3–5 hari bersama Aji Institute.',
    type: 'website',
  },
};

export default function BootcampLayout({ children }: { children: React.ReactNode }) {
  return children;
}

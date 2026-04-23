import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Program AjiBiz — Bisnis, Manajemen & Kewirausahaan',
  description: 'Program pelatihan AjiBiz: Business Strategy, Manajemen SDM, Financial Planning, Leadership, dan Pengembangan Usaha. Cocok untuk wirausahawan, manajer, UMKM, dan profesional.',
  keywords: ['AjiBiz', 'pelatihan bisnis', 'manajemen', 'kewirausahaan', 'leadership', 'UMKM', 'business strategy', 'aji institute'],
  openGraph: {
    title: 'Program AjiBiz — Bisnis & Manajemen | Aji Institute',
    description: 'Tingkatkan kompetensi bisnis dan manajemen bersama praktisi berpengalaman dari AjiBiz.',
    type: 'website',
  },
};

export default function ProgramAjiBizLayout({ children }: { children: React.ReactNode }) {
  return children;
}

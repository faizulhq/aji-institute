import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proyek Riset — Layanan Penelitian & Survei | Aji Institute',
  description: 'Layanan proyek riset Aji Institute: penelitian sosial budaya, ekonomi, pertahanan keamanan, evaluasi kebijakan, dan survei kepuasan. Didukung tim peneliti berpengalaman dengan metodologi ilmiah yang terstandar.',
  keywords: ['proyek riset', 'jasa penelitian', 'survei sosial', 'riset ekonomi', 'evaluasi kebijakan', 'riset hankam', 'penelitian lapangan', 'aji institute'],
  openGraph: {
    title: 'Proyek Riset | Aji Institute',
    description: 'Mitra riset terpercaya untuk instansi, lembaga, dan korporasi. Metodologi ilmiah, data akurat, laporan komprehensif.',
    type: 'website',
  },
};

export default function ProyekRisetLayout({ children }: { children: React.ReactNode }) {
  return children;
}

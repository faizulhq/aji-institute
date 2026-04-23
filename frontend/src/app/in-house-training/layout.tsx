import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'In-House Training — Pelatihan Khusus untuk Institusi',
  description: 'Layanan In-House Training Aji Institute: program pelatihan eksklusif yang dirancang khusus untuk kebutuhan perusahaan, instansi pemerintah, universitas, dan organisasi.',
  keywords: ['in-house training', 'pelatihan instansi', 'pelatihan perusahaan', 'pelatihan korporat', 'training kantor', 'aji institute'],
  openGraph: {
    title: 'In-House Training | Aji Institute',
    description: 'Program pelatihan eksklusif yang dirancang khusus sesuai kebutuhan institusi dan perusahaan Anda.',
    type: 'website',
  },
};

export default function InHouseTrainingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

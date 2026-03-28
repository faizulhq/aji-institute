import { ComingSoonPage } from '@/components/coming-soon-page';

export const metadata = {
  title: 'Business Class — Aji Institute',
  description: 'Program pelatihan bisnis dan manajemen profesional dari Aji Institute. Segera hadir.',
};

export default function BusinessPage() {
  return (
    <ComingSoonPage brand={{
      icon: '💼',
      name: 'Business Class',
      label: 'Bisnis & Manajemen',
      description: 'Program pengembangan kompetensi bisnis, kewirausahaan, dan manajemen profesional. Dirancang untuk wirausahawan, manajer, dan profesional yang ingin naik level.',
      color: '#16A34A',
      benefit: 'Program akan mencakup topik-topik bisnis terapan yang relevan dengan kebutuhan pasar.',
      topics: [
        'Business Plan & Analisis Kelayakan Usaha',
        'Manajemen Keuangan Bisnis dasar',
        'Digital Marketing untuk UMKM',
        'Leadership & Manajemen Tim',
        'Negosiasi & Komunikasi Bisnis',
        'Strategi Pemasaran & Branding',
        'Analisis Kompetitor & Pasar',
        'Manajemen Risiko Bisnis',
      ],
    }} />
  );
}

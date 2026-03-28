import { ComingSoonPage } from '@/components/coming-soon-page';

export const metadata = {
  title: 'Language Class — Aji Institute',
  description: 'Kelas bahasa Inggris, Arab, dan komunikasi global dari Aji Institute untuk karier internasional.',
};

export default function LanguagePage() {
  return (
    <ComingSoonPage brand={{
      icon: '🌐',
      name: 'Language Class',
      label: 'Bahasa & Komunikasi Global',
      description: 'Kelas bahasa Inggris akademik, bahasa Arab, dan komunikasi internasional yang dirancang untuk mahasiswa dan profesional Indonesia yang ingin bersaing di level global.',
      color: '#B45309',
      benefit: 'Bahasa adalah pintu gerbang menuju peluang global yang tak terbatas.',
      topics: [
        'English for Academic Purposes (EAP)',
        'IELTS & TOEFL Preparation',
        'English for Research & Publication',
        'Bahasa Arab Percakapan Dasar',
        'Business English',
        'Academic Writing dalam Bahasa Inggris',
        'Presentasi Ilmiah dalam Bahasa Inggris',
        'Communication for International Conference',
      ],
    }} />
  );
}

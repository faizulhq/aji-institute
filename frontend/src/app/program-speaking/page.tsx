import { ComingSoonPage } from '@/components/coming-soon-page';

export const metadata = {
  title: 'Public Speaking Class — Aji Institute',
  description: 'Program kelas public speaking, presentasi profesional, dan komunikasi efektif dari Aji Institute.',
};

export default function SpeakingPage() {
  return (
    <ComingSoonPage brand={{
      icon: '🎤',
      name: 'Public Speaking',
      label: 'Komunikasi & Presentasi',
      description: 'Kelas public speaking, presentasi profesional, dan pengembangan komunikasi efektif untuk mahasiswa, dosen, hingga eksekutif perusahaan.',
      color: '#DC2626',
      benefit: 'Dari bicara di depan kelas hingga presentasi di hadapan ribuan orang — kami siapkan Anda.',
      topics: [
        'Dasar-dasar Public Speaking & Kepercayaan Diri',
        'Teknik Bernapas & Kontrol Suara',
        'Storytelling untuk Presentasi',
        'Desain Slide Presentasi yang Efektif',
        'Presentasi Akademik (Seminar & Sidang)',
        'MC & Moderator Profesional',
        'Debat & Argumentasi',
        'Body Language & Komunikasi Non-Verbal',
      ],
    }} />
  );
}

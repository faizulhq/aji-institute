import { ComingSoonPage } from '@/components/coming-soon-page';

export const metadata = {
  title: 'Digital Skills Class — Aji Institute',
  description: 'Program pelatihan digital marketing, tools produktivitas, dan keterampilan teknologi dari Aji Institute.',
};

export default function DigitalPage() {
  return (
    <ComingSoonPage brand={{
      icon: '💻',
      name: 'Digital Skills',
      label: 'Digital & Teknologi',
      description: 'Kuasai keterampilan digital yang paling dicari di era ini — dari digital marketing, tools AI, hingga data visualization. Untuk mahasiswa dan profesional yang ingin relevan.',
      color: '#7C3AED',
      benefit: 'Teknologi terus berkembang. Pastikan kompetensi digital Anda selalu up-to-date.',
      topics: [
        'Digital Marketing & Social Media Strategy',
        'Pembuatan Konten & Copywriting',
        'Canva & Desain Grafis Digital',
        'Google Analytics & Data Tracking',
        'SEO & Content Marketing',
        'AI Tools untuk Produktivitas',
        'Membuat Website Dasar (No-Code)',
        'Email Marketing & Automation',
      ],
    }} />
  );
}

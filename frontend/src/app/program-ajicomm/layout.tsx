import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Program AjiComm — Komunikasi Profesional & Personal Branding',
  description: 'Program pelatihan AjiComm: Public Speaking, Media Relation, Press Release, Crisis Communication, Storytelling, MC, dan Interview. Untuk mahasiswa, profesional, dan organisasi.',
  keywords: ['AjiComm', 'public speaking', 'komunikasi profesional', 'personal branding', 'media relation', 'MC', 'aji institute'],
  openGraph: {
    title: 'Program AjiComm — Komunikasi Profesional | Aji Institute',
    description: 'Kuasai komunikasi profesional dan personal branding bersama tim expert AjiComm.',
    type: 'website',
  },
};

export default function ProgramAjiCommLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Program AjiAI — Digital Marketing & Teknologi',
  description: 'Program pelatihan AjiAI: Social Media Strategy, Content Planning, Copywriting, Google Ads, Meta Ads, SEO, dan Analytics. Untuk pelaku usaha, marketer, dan kreator konten.',
  keywords: ['AjiAI', 'digital marketing', 'SEO', 'social media', 'content strategy', 'Google Ads', 'Meta Ads', 'aji institute'],
  openGraph: {
    title: 'Program AjiAI — Digital Marketing | Aji Institute',
    description: 'Kuasai strategi digital marketing dan teknologi terkini bersama tim expert AjiAI.',
    type: 'website',
  },
};

export default function ProgramAjiAILayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'Aji Institute — Center for Research, Data & Professional Development',
    template: '%s | Aji Institute',
  },
  description: 'Platform pelatihan, pengembangan kompetensi, dan konsultasi profesional. AjiStat, Business Class, Public Speaking, Digital Skills, Language Class.',
  keywords: [
    'aji institute', 'ajistat', 'statistika', 'analisis data', 'SPSS', 'SmartPLS',
    'metodologi penelitian', 'skripsi', 'tesis', 'pelatihan profesional', 'konsultasi riset',
    'bootcamp statistik', 'private class', 'olah data'
  ],
  openGraph: {
    title: 'Aji Institute',
    description: 'Center for Research, Data, and Professional Development',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Providers>
          <Navbar />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

'use client';

/**
 * Halaman Beranda — src/app/page.tsx
 *
 * File ini adalah "daftar isi" halaman beranda.
 * Setiap section telah dipisah ke komponen mandiri di folder _sections/
 * agar lebih mudah dirawat dan dimodifikasi secara independen.
 */

import { HeroSlider }        from './_sections/HeroSlider';
import { StatsStrip }        from './_sections/StatsStrip';
import { AjiStatSpotlight }  from './_sections/AjiStatSpotlight';
import { MaknaAji }          from './_sections/MaknaAji';
import { ProgramGridSection, FeaturedPrograms } from './_sections/FeaturedPrograms';
import { KonsultasiPreview, CtaKerjaSama }      from './_sections/KonsultasiPreview';
import { ToolsGrid }         from './_sections/ToolsGrid';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <StatsStrip />
      <AjiStatSpotlight />
      <MaknaAji />
      <ProgramGridSection />
      <FeaturedPrograms />
      <KonsultasiPreview />
      <ToolsGrid />
      <CtaKerjaSama />
    </>
  );
}

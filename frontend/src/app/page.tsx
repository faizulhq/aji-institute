'use client';

/**
 * Halaman Beranda — src/app/page.tsx
 *
 * AjiStatSpotlight & MaknaAji dihapus dari beranda:
 * - AjiStatSpotlight: Digabung ke halaman /program-ajistat
 * - MaknaAji: Dipindahkan ke halaman /tentang
 */

import { HeroSlider }        from './_sections/HeroSlider';
import { StatsStrip }        from './_sections/StatsStrip';
import { ProgramGridSection, FeaturedPrograms } from './_sections/FeaturedPrograms';
import { KonsultasiPreview, CtaKerjaSama }      from './_sections/KonsultasiPreview';
import { ToolsGrid }         from './_sections/ToolsGrid';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <StatsStrip />
      <ProgramGridSection />
      <FeaturedPrograms />
      <KonsultasiPreview />
      <ToolsGrid />
      <CtaKerjaSama />
    </>
  );
}

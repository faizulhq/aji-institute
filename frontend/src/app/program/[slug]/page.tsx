/**
 * Server Component wrapper untuk /program/[slug]
 *
 * generateStaticParams dipanggil saat `npm run build` untuk menghasilkan
 * HTML statis bagi setiap slug program yang ada di database.
 * Jika slug baru ditambahkan, cukup rebuild dan re-upload folder out/.
 */
import ProgramDetailClient from './program-detail-client';

export async function generateStaticParams() {
  const slugs = [
    "bootcamp-analisis-spss", "bootcamp-smartpls", "bootcamp-rstudio",
    "private-analisis-spss", "private-smartpls", "private-rstudio", "private-python-data",
    "short-uji-instrumen-spss", "short-regresi-spss", "short-visualisasi-python",
    "short-penulisan-artikel", "short-statistika-dasar", "bootcamp-ajibiz-business-plan",
    "short-ajibiz-digital-marketing", "bootcamp-ajipr-corpcomm", "short-ajipr-press-release",
    "bootcamp-ajidigi-mern", "short-ajidigi-uiux", "bootcamp-ajilanguage-toefl",
    "private-ajilanguage-academic"
  ];
  return slugs.map((s) => ({ slug: s }));
}

export default function ProgramDetailPage() {
  return <ProgramDetailClient />;
}

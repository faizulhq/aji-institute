import Link from 'next/link';
import Image from 'next/image';
import { PROGRAMS, WA_LINK } from '@/lib/config';

const LAYANAN_LINKS = [
  { label: 'Bootcamp Intensif',  href: '/bootcamp' },
  { label: 'Short Class',        href: '/short-class' },
  { label: 'Private Class',      href: '/private-class' },
  { label: 'AjiStat ↗', href: 'https://ajistat.aji-institute.com' },
  { label: 'In-House Training',  href: '/in-house-training' },
];

const COMPANY_LINKS = [
  { label: 'Tentang Kami',   href: '/tentang' },
  { label: 'Blog & Artikel', href: '/blog' },
  { label: 'Workshop',       href: '/workshop' },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#162058] to-[#0d1632] border-t-4 border-[#4A72D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl px-4 py-3 inline-block mb-5">
              <Image
                src="/images/logo.png"
                alt="Aji Institute"
                width={180}
                height={55}
                className="h-11 w-auto"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Platform pelatihan, pengembangan kompetensi, dan konsultasi profesional
              dari statistik, bisnis, hingga komunikasi.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {PROGRAMS.map((p) => (
                <Link key={p.code} href={p.href}
                  className="text-[10px] bg-white/10 hover:bg-white/20 text-white/60 hover:text-white px-2.5 py-1 rounded-full transition-colors">
                  {p.code}
                </Link>
              ))}
            </div>
          </div>

          {/* Layanan */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Layanan</p>
            <ul className="space-y-2.5">
              {LAYANAN_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="text-white/50 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Perusahaan</p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="text-white/50 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Kontak</p>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
              <a href="https://wa.me/6285992905592"
                target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition-colors">
                +62 859-9290-5592
              </a>
              </li>
              <li>
                <a href="mailto:info@aji-institute.id"
                  className="hover:text-white transition-colors">
                  info@aji-institute.id
                </a>
              </li>
              <li className="leading-snug">Kompleks Bandung Indah Raya Blok C7 No.1,<br/>Kel. Mekarjaya, Kec. Rancasari, Bandung</li>
            </ul>
            <a href={WA_LINK('Halo Aji Institute, saya ingin bertanya')}
              target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
              Konsultasi Gratis
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            2026 Aji Institute by PT. Amanah Jnana Insani. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Dibuat untuk memajukan pendidikan Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}

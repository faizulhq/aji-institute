import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { TOOLS, WA_LINK } from '@/lib/config';

const FORMAT_BELAJAR = [
  { fmt: 'Bootcamp', desc: 'Intensif 3–5 hari, materi mendalam', href: 'https://ajistat.aji-institute.com/bootcamp' },
  { fmt: 'Private Class', desc: 'Jadwal fleksibel, 1-on-1 mentor', href: 'https://ajistat.aji-institute.com/private-class' },
  { fmt: 'Short Class', desc: 'Topik spesifik, 2–4 jam per sesi', href: 'https://ajistat.aji-institute.com/short-class' },
  { fmt: 'Workshop', desc: 'Hands-on praktik dengan dataset nyata', href: 'https://ajistat.aji-institute.com' },
  { fmt: 'Konsultasi', desc: 'Pendampingan riset personal', href: 'https://ajistat.aji-institute.com/konsultasi' },
];

const STATS_AJISTAT = [
  { val: '500+', label: 'Alumni' },
  { val: '4.9', label: 'Rating' },
  { val: '10+', label: 'Tools' },
];

const FEATURED_TOOLS = ['SPSS', 'SmartPLS', 'NVivo', 'R / RStudio', 'Python', 'AMOS', 'EViews', 'STATA'];

export function AjiStatSpotlight() {
  return (
    <section className="py-0 overflow-hidden">
      <div className="bg-gradient-to-br from-[#162058] via-[#1B3A8C] to-[#2348A8] relative">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div>
                  <span className="text-[#F0A500] text-xs font-bold uppercase tracking-widest">Program Unggulan</span>
                  <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">AjiStat</h2>
                </div>
              </div>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Pusat pelatihan statistik, metodologi penelitian, dan analisis data terlengkap di Indonesia.
                Cocok untuk mahasiswa, peneliti, dosen, dan profesional.
              </p>

              {/* Tool logos */}
              <div className="flex flex-wrap gap-2 mb-8">
                {TOOLS.filter(t => FEATURED_TOOLS.includes(t.name)).map((t) => (
                  <div key={t.name} title={t.name}
                    className="w-9 h-9 rounded-lg overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110 cursor-default">
                    {t.logo ? (
                      <Image src={t.logo} alt={t.name} width={28} height={28} className="object-contain p-0.5" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-black text-[9px]"
                        style={{ backgroundColor: t.color }}>
                        {t.name.slice(0, 2)}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://ajistat.aji-institute.com"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-7 py-3.5 rounded-xl transition-all hover:scale-105">
                  Lihat Semua Program AjiStat <ArrowRight className="w-4 h-4" />
                </a>
                <a href={WA_LINK('Halo, saya ingin tanya tentang program AjiStat')}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:bg-white/10">
                  Hubungi Kami
                </a>
              </div>
            </div>

            {/* Right — Format cards */}
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">Format Belajar Tersedia</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FORMAT_BELAJAR.map((item) => (
                  <a key={item.fmt} href={item.href}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl p-4 transition-all group">
                    <span className="w-2 h-2 rounded-full bg-[#4A72D4] mt-1.5 shrink-0" />
                    <div>
                      <p className="text-white font-bold text-sm group-hover:text-[#F0A500] transition-colors">{item.fmt}</p>
                      <p className="text-white/50 text-xs">{item.desc}</p>
                    </div>
                  </a>
                ))}
                {/* Stats card */}
                <div className="flex items-center justify-around bg-[#F0A500]/20 border border-[#F0A500]/30 rounded-xl p-4">
                  {STATS_AJISTAT.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-[#F0A500] font-black text-lg">{s.val}</p>
                      <p className="text-white/50 text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

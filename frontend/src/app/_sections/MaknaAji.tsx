import { WA_LINK } from '@/lib/config';
import { cn } from '@/lib/utils';

const AJI_PILLARS = [
  {
    letter: 'A',
    name: 'Amanah',
    tagline: 'Integritas & Kepercayaan',
    desc: 'Integritas, kejujuran, dan tanggung jawab dalam setiap layanan kami. Kepercayaan Anda adalah amanah terbesar kami.',
    gradient: 'from-[#054E7A] to-[#0B7AB5]',
    accent: '#47C2EA',
  },
  {
    letter: 'J',
    name: 'Jñāna',
    tagline: 'Ilmiah & Analitis',
    desc: 'Berpikir kritis, ilmiah, analitis, berbasis data dan kebenaran ilmiah. Kami percaya ilmu pengetahuan adalah fondasi kemajuan.',
    gradient: 'from-[#0B7AB5] to-[#1AAEE0]',
    accent: '#F0A500',
  },
  {
    letter: 'I',
    name: 'Insani',
    tagline: 'Humanis & Empatik',
    desc: 'Humanis, empatik, dan pengembangan manusia seutuhnya. Setiap peserta adalah individu yang berhak tumbuh dan berkembang.',
    gradient: 'from-[#1AAEE0] to-[#1090C8]',
    accent: '#4ade80',
  },
];

const KEY_METRICS = [
  { val: '500+', label: 'Alumni Terlatih', sub: 'Dari seluruh Indonesia' },
  { val: '10+', label: 'Fasilitator Ahli', sub: 'Praktisi berpengalaman' },
  { val: '5', label: 'Divisi Program', sub: 'Statistik, Bisnis, Digital, PR, Bahasa' },
  { val: '30+', label: 'Kelas Tersedia', sub: 'Bootcamp, Private, Short Class' },
];

export function MaknaAji() {
  return (
    <section id="tentang" className="py-20 bg-gray-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#1AAEE0] text-sm font-semibold uppercase tracking-widest mb-3">Nilai Inti Kami</p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900">
            Makna di Balik{' '}
            <span className="bg-gradient-to-r from-[#0B7AB5] to-[#1AAEE0] bg-clip-text text-transparent">AJI</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
          {/* Kiri — A / J / I vertikal */}
          <div className="bg-gradient-to-b from-[#054E7A] via-[#0B7AB5] to-[#1090C8] flex flex-col">
            {AJI_PILLARS.map((pillar, idx) => (
              <div key={pillar.letter}
                className={cn('flex items-center gap-6 p-8 md:p-10', idx < AJI_PILLARS.length - 1 && 'border-b border-white/10')}>
                <span className="text-8xl md:text-9xl font-black leading-none w-24 shrink-0 text-center"
                  style={{ color: pillar.accent }}>
                  {pillar.letter}
                </span>
                <div>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">{pillar.tagline}</p>
                  <h3 className="text-2xl font-black text-white">{pillar.name}</h3>
                  <p className="text-white/60 text-sm mt-2 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Kanan — Why AJI? */}
          <div className="bg-white flex flex-col justify-between p-8 md:p-12">
            <div>
              <p className="text-[#1AAEE0] text-xs font-bold uppercase tracking-widest mb-3">Mengapa Aji Institute?</p>
              <h3 className="text-3xl font-black text-gray-900 mb-6 leading-snug">
                Lebih dari Sekadar<br />
                <span className="text-[#1AAEE0]">Tempat Belajar</span>
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                Aji Institute berdiri di atas komitmen untuk mencetak individu yang tidak hanya kompeten secara teknis,
                tetapi juga berintegritas, kritis, dan siap berkontribusi nyata bagi masyarakat.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {KEY_METRICS.map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-2xl font-black text-[#0B7AB5]">{stat.val}</p>
                  <p className="text-gray-800 font-semibold text-sm">{stat.label}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>

            <a href={WA_LINK('Halo, saya ingin tahu lebih lanjut tentang Aji Institute')}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#0B7AB5] hover:bg-[#1AAEE0] text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
              Hubungi Kami Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

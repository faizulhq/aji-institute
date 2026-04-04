import Link from 'next/link';
import { ArrowRight, BarChart3, Database, FileText, BookOpen, Building2, ClipboardList } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

const KONSULTASI_LAYANAN = [
  { icon: BarChart3, title: 'Analisis Data Kuantitatif' },
  { icon: FileText, title: 'Analisis Data Kualitatif (NVivo)' },
  { icon: Database, title: 'Olah & Pengolahan Data' },
  { icon: BookOpen, title: 'Pendampingan Skripsi / Tesis / Disertasi' },
  { icon: Building2, title: 'Riset & Konsultasi Bisnis' },
  { icon: ClipboardList, title: 'Penyusunan Laporan Hasil Analisis' },
];

export function KonsultasiPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#1AAEE0] text-sm font-semibold uppercase tracking-widest mb-3">Layanan Kami</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Apa yang Bisa Kami Bantu?</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">Dari analisis data hingga pendampingan riset — tim ahli kami siap mendampingi Anda.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {KONSULTASI_LAYANAN.map((item) => (
            <div key={item.title}
              className="flex items-center gap-4 p-5 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-[#1AAEE0]/20 rounded-2xl transition-all cursor-default">
              <div className="w-10 h-10 bg-[#EBF4FF] rounded-xl flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-[#1AAEE0]" />
              </div>
              <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/layanan" className="inline-flex items-center gap-2 text-[#1AAEE0] font-semibold hover:underline">
            Lihat Semua Layanan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CtaKerjaSama() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#054E7A] via-[#0B7AB5] to-[#1090C8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#47C2EA] text-sm font-semibold uppercase tracking-widest mb-4">Kolaborasi Institusional</p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Ingin Berkolaborasi dengan Aji Institute?
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          Kami terbuka untuk kemitraan dengan universitas, lembaga riset, dan perusahaan dalam penyelenggaraan pelatihan dan pengembangan kompetensi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/in-house-training"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#054E7A] font-black px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-2xl">
            Ajukan Kerja Sama <ArrowRight className="w-5 h-5" />
          </a>
          <a href={WA_LINK('Halo Aji Institute, saya tertarik untuk berkolaborasi')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all hover:bg-white/10">
            Diskusi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, CheckCircle, BookOpen, Users, Award, Clock } from 'lucide-react';
import { programsApi } from '@/lib/api';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import { TagProgramModal } from '@/components/TagProgramModal';
import { WA_LINK, TOOLS } from '@/lib/config';
import type { Program } from '@/lib/types';


const TOPICS = [
  'Uji Asumsi Klasik', 'Regresi Linear & Logistik', 'Structural Equation Modeling (SEM)',
  'Analisis Faktor (EFA/CFA)', 'Uji Validitas & Reliabilitas', 'Analisis Mediasi & Moderasi',
  'Analisis Klaster & Diskriminan', 'Analisis Data Kualitatif', 'Time Series & Ekonometri',
  'Panel Data', 'Systematic Literature Review (SLR)', 'Statistik Deskriptif',
];

const KEUNGGULAN = [
  { icon: CheckCircle, text: 'Materi berbasis kurikulum akademik dan kebutuhan riset riil' },
  { icon: Award, text: 'Sertifikat kelulusan yang diakui lembaga akademik dan industri' },
  { icon: Users, text: 'Kelas kecil, pendampingan intensif per peserta' },
  { icon: BookOpen, text: 'Akses rekaman sesi seumur hidup' },
  { icon: Clock, text: 'Jadwal fleksibel, bisa malam & weekend' },
  { icon: CheckCircle, text: 'Follow-up konsultasi via WhatsApp setelah program' },
];

export default function AjiStatPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const { data: allDataRaw, isLoading } = useQuery({
    queryKey: ['programs', 'ajistat-all'],
    queryFn: () => programsApi.list().then((r) => {
      const arr = r.data?.data ?? r.data;
      return (Array.isArray(arr) ? arr : []) as Program[];
    }),
  });

  const programs: Program[] = (allDataRaw ?? []).filter((p: Program) =>
    !p.tags.some((t) => ['ajibiz', 'ajipr', 'ajidigi', 'ajilangua'].includes(t.toLowerCase()))
  );

  return (
    <>
      {/* HERO */}
      <div className="bg-gradient-to-br from-[#162058] via-[#162058] to-[#2348A8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div>
                <span className="text-[#F0A500] text-xs font-bold uppercase tracking-widest">Program Unggulan Aji Institute</span>
                <h1 className="text-5xl sm:text-6xl font-black text-white">AjiStat</h1>
              </div>
            </div>
            <p className="text-white/75 text-xl leading-relaxed mb-4">
              Pusat pelatihan <strong className="text-white">statistik, metodologi penelitian, dan analisis data</strong> terlengkap. Untuk mahasiswa S1–S3, peneliti, dosen, dan profesional.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {TOOLS.filter(t => ['SPSS', 'SmartPLS', 'NVivo', 'R / RStudio', 'Python', 'AMOS', 'EViews', 'STATA'].includes(t.name)).map((t) => (
                <button key={t.name} title={t.name} onClick={() => setActiveTag(t.name)}
                  className="w-9 h-9 rounded-lg overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110 cursor-pointer">
                  {t.logo ? (
                    <Image src={t.logo} alt={t.name} width={28} height={28} className="object-contain p-0.5" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-black text-[9px]"
                      style={{ backgroundColor: t.color }}>
                      {t.name.slice(0, 2)}
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_LINK('Halo, saya ingin mendaftar program AjiStat')} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-8 py-4 rounded-2xl text-base transition-all hover:scale-105">
                Daftar Sekarang via WhatsApp <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/konsultasi"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all hover:bg-white/10">
                Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[#162058] border-b border-[#4A72D4]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[{ val: '500+', label: 'Alumni' }, { val: '4.9★', label: 'Rating' }, { val: '8+', label: 'Tools Dikuasai' }, { val: '5', label: 'Format Kelas' }].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-[#F0A500]">{s.val}</p>
                <p className="text-white/50 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* PROGRAM LIST dari API */}
      <section className="py-20 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">Tersedia Saat Ini</p>
            <h2 className="text-3xl font-black text-gray-900 border-b-2 border-dashed border-gray-200 pb-6 inline-block">Program AjiStat Tersedia</h2>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <ProgramCardSkeleton key={i} />)}
            </div>
          ) : programs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="font-bold text-gray-800 text-lg mb-2">Program Segera Hadir!</p>
              <p className="text-gray-500 max-w-sm mx-auto text-sm">Tim AjiStat sedang menyiapkan kelas terbaik untuk Anda. Silakan sampaikan minat Anda pada layanan Konsultasi.</p>
            </div>
          )}
        </div>
      </section>

      {/* TOOLS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">Tools & Software</p>
            <h2 className="text-3xl font-black text-gray-900">Yang Kami Ajarkan</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 mt-10 max-w-4xl mx-auto">
            {TOOLS.map((t) => {
              if (!t.logo) return null;
              return (
                <button key={t.name} title={t.name} onClick={() => setActiveTag(t.name)}
                  className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer">
                  <Image src={t.logo} alt={t.name} width={32} height={32} className="object-contain" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOPIK */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">Topik Program</p>
            <h2 className="text-3xl font-black text-gray-900">Materi yang Tersedia</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TOPICS.map((t) => (
              <button key={t} onClick={() => setActiveTag(t)}
                className="px-4 py-2 bg-white border border-gray-200 hover:border-[#162058] hover:bg-blue-50 text-gray-700 rounded-xl text-sm font-medium transition-colors cursor-pointer">
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">Kenapa AjiStat?</p>
            <h2 className="text-3xl font-black text-gray-900">Keunggulan Program</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEUNGGULAN.map((k, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 p-5">
                <k.icon className="w-5 h-5 text-[#2348A8] mt-0.5 shrink-0" />
                <p className="text-gray-700 text-sm">{k.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#162058] to-[#2348A8]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Siap Bergabung dengan AjiStat?</h2>
          <p className="text-white/70 mb-8">Hubungi kami sekarang dan dapatkan konsultasi gratis untuk menentukan program yang tepat.</p>
          <a href={WA_LINK('Halo, saya ingin mendaftar program AjiStat. Bisa dibantu?')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-2xl">
            Daftar via WhatsApp Sekarang
          </a>
        </div>
      </section>

      <TagProgramModal
        tag={activeTag}
        programs={allDataRaw ?? []}
        onClose={() => setActiveTag(null)}
      />
    </>
  );
}

'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Users, BookOpen, Award, Briefcase, Star, MessageCircle, CheckCircle } from 'lucide-react';
import { programsApi } from '@/lib/api';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import { SUB_BRANDS, WA_LINK, SITE } from '@/lib/config';
import type { Program } from '@/lib/types';

const STATS = [
  { icon: Users, value: '500+', label: 'Alumni Terlatih' },
  { icon: BookOpen, value: '30+', label: 'Program Aktif' },
  { icon: Briefcase, value: '10+', label: 'Fasilitator Expert' },
  { icon: Award, value: '5', label: 'Divisi Program' },
];

const KEUNGGULAN = [
  { icon: '🎓', title: 'Kurikulum Berbasis Riset', desc: 'Materi dirancang langsung dari kebutuhan nyata peneliti dan akademisi Indonesia.' },
  { icon: '👨‍🏫', title: 'Fasilitator Berpengalaman', desc: 'Dipandu oleh praktisi dengan pengalaman riset dan konsultasi bertahun-tahun.' },
  { icon: '📊', title: 'Praktik Data Nyata', desc: 'Setiap sesi menggunakan dataset riset nyata agar pembelajaran langsung berdampak.' },
  { icon: '🏆', title: 'Sertifikasi Resmi', desc: 'Sertifikat kelulusan terverifikasi yang diakui oleh lembaga akademik dan industri.' },
  { icon: '💬', title: 'Konsultasi Lanjutan', desc: 'Akses dukungan via WhatsApp setelah program selesai, tidak meninggalkan peserta.' },
  { icon: '📹', title: 'Rekaman Seumur Hidup', desc: 'Akses ulang rekaman sesi kapan saja, selamanya, tanpa biaya tambahan.' },
];

const TESTIMONIALS = [
  { name: 'Rahma A.', role: 'Mahasiswa S2, UGM', program: 'Bootcamp SmartPLS', rating: 5, comment: 'Bootcamp SmartPLS AjiStat benar-benar mengubah cara saya memandang SEM. Dalam 3 hari saya sudah bisa menganalisis sendiri untuk tesis saya.' },
  { name: 'Dr. Budi S.', role: 'Dosen, Universitas Indonesia', program: 'Bootcamp NVivo', rating: 5, comment: 'Materi NVivo-nya sangat mendalam dan aplikatif. Sekarang saya rutin merekomendasikan AjiStat ke mahasiswa bimbingan saya.' },
  { name: 'Fira N.', role: 'Peneliti, LIPI', rating: 5, program: 'Private Class SPSS', comment: 'Private class-nya sangat personal dan fleksibel. Fasilitatornya sabar sekali menjelaskan analisis yang kompleks sekalipun.' },
];

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['programs', 'featured'],
    queryFn: () => programsApi.list({ featured: true }).then((r) => r.data),
  });

  const featuredPrograms: Program[] = data?.data?.slice(0, 3) ?? [];

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-[#0C1A45] overflow-hidden min-h-[90vh] flex items-center">
        {/* BG decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2568B5]/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4FA8D8]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#4FA8D8]/20 border border-[#4FA8D8]/30 text-[#4FA8D8] text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
              ✦ {SITE.tagline}
            </span>

            <h1 className="font-[family-name:var(--font-poppins)] text-5xl sm:text-6xl font-bold text-white mb-6 leading-[1.1]">
              Tingkatkan{' '}
              <span className="text-[#4FA8D8]">Kompetensi</span>{' '}
              Anda Bersama<br />
              <span className="text-[#F0A500]">Aji Institute</span>
            </h1>

            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-2xl">
              Platform pelatihan profesional, pengembangan kompetensi, dan konsultasi riset — dari statistik & analisis data, bisnis, public speaking, digital skills, hingga bahasa.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/bootcamp"
                className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#F0A500]/20">
                Lihat Semua Program <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={WA_LINK('Halo Aji Institute, saya ingin konsultasi program yang cocok untuk saya')}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-xl transition-all">
                <MessageCircle className="w-4 h-4 text-green-400" /> Konsultasi Gratis
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-white/8 border border-white/12 rounded-2xl p-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2568B5]/40 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#4FA8D8]" />
                </div>
                <div>
                  <p className="text-white font-bold text-xl leading-none">{value}</p>
                  <p className="text-white/45 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SUB-BRAND CARDS ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">5 Divisi Program</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900 mb-4">
              Temukan Program yang Tepat untuk Anda
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Aji Institute hadir dengan lima divisi program yang mencakup seluruh kebutuhan pengembangan kompetensi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {SUB_BRANDS.map((brand) => (
              <Link
                key={brand.id}
                href={brand.href}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-6 flex flex-col"
              >
                <div className="text-3xl mb-4">{brand.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-[#2568B5] transition-colors">
                  {brand.name}
                </h3>
                <p className="text-[#2568B5] text-xs font-medium mb-3">{brand.label}</p>
                <p className="text-gray-500 text-xs leading-relaxed flex-1">{brand.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  {!brand.available ? (
                    <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                      Segera Hadir
                    </span>
                  ) : (
                    <span className="text-[10px] bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                      Tersedia
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#2568B5] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROGRAMS ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-2">Program Unggulan</p>
              <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900">
                Program Terpopuler AjiStat
              </h2>
            </div>
            <Link href="/bootcamp" className="hidden sm:flex items-center gap-1 text-[#2568B5] text-sm font-semibold hover:gap-2 transition-all">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <ProgramCardSkeleton key={i} />)}
            </div>
          ) : featuredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPrograms.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">📚</p>
              <p>Program sedang disiapkan</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── KEUNGGULAN ─── */}
      <section className="py-20 bg-[#0C1A45]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#4FA8D8] text-sm font-semibold uppercase tracking-widest mb-3">Mengapa Aji Institute?</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white mb-4">
              Standar Kualitas yang Tidak Kami Kompromikan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {KEUNGGULAN.map((item) => (
              <div key={item.title} className="bg-white/6 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONI ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">Testimoni</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900">
              Apa Kata Alumni Kami?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F0A500] text-[#F0A500]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed mb-5">"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#162660] to-[#2568B5] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                    <p className="text-xs text-[#2568B5]">{t.program}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LAYANAN ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">Layanan Kami</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900 mb-4">
              Solusi Lengkap untuk Kebutuhan Riset & Kompetensi
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: '🎓', title: 'Bootcamp', desc: '3–5 hari intensif', href: '/bootcamp' },
              { icon: '⚡', title: 'Short Class', desc: '1–3 jam fokus', href: '/short-class' },
              { icon: '🎯', title: 'Private Class', desc: '1-on-1 custom', href: '/private-class' },
              { icon: '📋', title: 'Konsultasi', desc: 'Analisis data riset', href: '/konsultasi' },
              { icon: '🤝', title: 'Kerja Sama', desc: 'Institusional & korporat', href: '/kerja-sama' },
            ].map((item) => (
              <Link key={item.title} href={item.href}
                className="group text-center p-5 rounded-2xl border border-gray-100 hover:border-[#2568B5]/30 hover:bg-blue-50 transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#2568B5]">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA KERJA SAMA ─── */}
      <section className="py-16 bg-gradient-to-br from-[#162660] to-[#1e4fa0]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-[#4FA8D8] text-sm font-semibold uppercase tracking-widest mb-4">Kolaborasi Institusional</p>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white mb-4">
            Wujudkan Program Pelatihan untuk Institusi Anda
          </h2>
          <p className="text-white/65 mb-8 max-w-xl mx-auto">
            Aji Institute membuka kerja sama dengan kampus, sekolah, lembaga pemerintah, dan perusahaan untuk program pelatihan riset dan kompetensi berbasis kebutuhan institusi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kerja-sama"
              className="inline-flex items-center gap-2 bg-white text-[#162660] font-bold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
              <CheckCircle className="w-4 h-4" /> Pelajari Kerja Sama
            </Link>
            <a href={WA_LINK('Halo Aji Institute, kami tertarik untuk kerja sama institusional')}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
              <MessageCircle className="w-4 h-4" /> Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

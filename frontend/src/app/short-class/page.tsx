'use client';

import { useQuery } from '@tanstack/react-query';
import { Zap, Clock, CheckCircle } from 'lucide-react';
import { programsApi } from '@/lib/api';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import type { Program } from '@/lib/types';

const KEUNGGULAN = [
  { icon: '⏱️', title: '1–3 Jam', desc: 'Durasi singkat, fokus pada satu topik spesifik' },
  { icon: '🎯', title: 'Langsung Praktik', desc: 'Materi langsung diterapkan dengan data latihan' },
  { icon: '📹', title: 'Rekaman Seumur Hidup', desc: 'Akses ulang kapan saja setelah sesi selesai' },
];

export default function ShortClassPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['programs', 'short-class'],
    queryFn: () => programsApi.list({ type: 'short-class' }).then((r) => r.data),
  });

  const programs: Program[] = data?.data ?? [];

  const groupedPrograms = [
    { title: 'AjiStat — Statistik & Riset', items: programs.filter(p => !p.tags.some(t => ['ajibiz', 'ajipr', 'ajidigi', 'ajilangua'].includes(t.toLowerCase()))) },
    { title: 'AjiBiz — Bisnis & Manajemen', items: programs.filter(p => p.tags.some(t => t.toLowerCase() === 'ajibiz')) },
    { title: 'AjiPR — Public Relation & Komunikasi', items: programs.filter(p => p.tags.some(t => t.toLowerCase() === 'ajipr')) },
    { title: 'AjiDigi — Digital Marketing & IT', items: programs.filter(p => p.tags.some(t => t.toLowerCase() === 'ajidigi')) },
    { title: 'AjiLangua — Bahasa Asing & Akademik', items: programs.filter(p => p.tags.some(t => t.toLowerCase() === 'ajilangua')) },
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2348A8] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="flex gap-2 text-white/40 text-sm mb-8">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-white/80">Short Class</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              ⚡ AJI Learning — Kelas Singkat Berdampak Besar
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Short Class —<br />
              <span className="text-[#F0A500]">Belajar Singkat,</span>{' '}
              <span className="text-white/80">Hasil Nyata</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
              Kelas singkat 1–3 jam yang padat materi, langsung ke inti topik, dan dapat langsung dipraktikkan.
              Cocok untuk mahasiswa dan profesional yang membutuhkan solusi cepat.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {KEUNGGULAN.map((item) => (
                <div key={item.title} className="bg-white/10 border border-white/15 rounded-xl p-4">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
              {[
                { icon: Zap, text: 'Mulai dari Rp 75.000' },
                { icon: Clock, text: 'Bisa diakses ulang seumur hidup' },
                { icon: CheckCircle, text: 'Materi & dataset disediakan' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#F0A500]" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── LAYANAN LIST ─── */}
      <section className="py-14 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Pilih Short Class</h2>
            <p className="text-gray-500 text-sm">Klik layanan untuk melihat isi materi, jadwal, dan mendaftar.</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <ProgramCardSkeleton key={i} />)}
            </div>
          ) : programs.length > 0 ? (
            <div className="flex flex-col gap-12">
              {groupedPrograms.map((group) => group.items.length > 0 && (
                <div key={group.title}>
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-xl font-bold text-gray-900">{group.title}</h3>
                    <div className="h-px bg-gray-200 flex-1"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.items.map((p) => <ProgramCard key={p.id} program={p} />)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400">
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-medium text-gray-500 mb-1">Tidak ada kelas yang tersedia</p>
              <p className="text-sm">Coba hubungi kami untuk info kelas terbaru</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#F0A500] py-12">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-[#162058] mb-3">Ada topik yang belum tersedia?</h2>
          <p className="text-[#162058]/70 mb-6">Kami menerima permintaan topik khusus via WhatsApp.</p>
          <a href="https://wa.me/6285892605592?text=Halo%20Admin,%20saya%20ingin%20request%20topik%20Short%20Class%20baru"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
            💬 Request Topik via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

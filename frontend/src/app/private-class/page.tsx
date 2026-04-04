'use client';

import { CheckCircle, Clock, MessageSquare, Zap } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { programsApi } from '@/lib/api';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import type { Program } from '@/lib/types';

const WA_LINK_PRIVATE = `https://wa.me/6285892605592?text=${encodeURIComponent('Halo Kak, saya ingin berkonsultasi mengenai layanan Private Class.')}`;

const benefits = [
  'Jadwal 100% fleksibel sesuai waktu Anda',
  'Kurikulum disesuaikan dengan kebutuhan spesifik',
  '1-on-1 langsung dengan instruktur berpengalaman',
  'Rekaman setiap sesi untuk review ulang kapan saja',
  'Konsultasi tambahan via chat selama program berjalan',
  'Sertifikat resmi AJI setelah menyelesaikan program',
];

export default function PrivateClassPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['programs', 'private-class'],
    queryFn: () => programsApi.list({ type: 'private-class' }).then((r) => r.data),
  });

  const programs: Program[] = data?.data ?? [];

  const groupedPrograms = [
    { title: 'AjiStat — Statistik & Riset', items: programs.filter(p => !p.tags.some(t => ['ajibiz', 'ajipr', 'ajidigi', 'ajilanguage'].includes(t.toLowerCase()))) },
    { title: 'AjiBiz — Bisnis & Manajemen', items: programs.filter(p => p.tags.some(t => t.toLowerCase() === 'ajibiz')) },
    { title: 'AjiPR — Public Relation & Komunikasi', items: programs.filter(p => p.tags.some(t => t.toLowerCase() === 'ajipr')) },
    { title: 'AjiDigi — Digital Marketing & IT', items: programs.filter(p => p.tags.some(t => t.toLowerCase() === 'ajidigi')) },
    { title: 'AjiLanguage — Bahasa Asing & Akademik', items: programs.filter(p => p.tags.some(t => t.toLowerCase() === 'ajilanguage')) },
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="bg-[#054E7A] relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex justify-center gap-2 text-white/40 text-sm mb-8">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-white/80">Private Class</span>
          </nav>

          <span className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            🎯 AJI Private Class — Mentoring Personal
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Belajar Lebih Cepat dengan<br />
            <span className="text-[#F0A500]">Bimbingan 1-on-1</span> yang Personal
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Program mentoring personal langsung bersama instruktur ahli AJI.
            Kurikulum, jadwal, dan kecepatan belajar disesuaikan sepenuhnya dengan kebutuhan Anda.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: '🗓️', text: 'Jadwal 100% Fleksibel' },
              { icon: '📋', text: 'Kurikulum Custom' },
              { icon: '🔴', text: 'Sesi Live via Zoom' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5">
                <span>{item.icon}</span>
                <span className="text-white/80 text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── LAYANAN LIST ─── */}
      <section className="py-14 bg-gray-50 border-y border-gray-100 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Pilih Topik Private Class</h2>
            <p className="text-gray-500 text-sm">Pilih layanan bimbingan 1-on-1 sesuai kebutuhan dan bidang Anda.</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <ProgramCardSkeleton key={i} />)}
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
              <p className="font-medium text-gray-500 mb-1">Belum ada kelas private yang tersedia</p>
              <p className="text-sm">Silakan hubungi kami untuk request topik khusus.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── KENAPA PRIVATE CLASS (dipindah ke bawah) ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-[#1AAEE0] uppercase tracking-widest mb-3 block">Kenapa Private Class?</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Belajar Sesuai Ritme &amp; Kebutuhan Anda</h2>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <p className="text-gray-700 text-sm leading-relaxed italic mb-5">
              &ldquo;Private class AJI benar-benar game changer. Dalam 8 sesi saja saya sudah bisa analisis SEM sendiri dan tesis saya selesai tepat waktu. Fasilitatornya sabar dan sangat memahami kebutuhan saya.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0B7AB5] to-[#47C2EA] flex items-center justify-center text-white font-bold text-sm">RA</div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Rina Andriani</p>
                <p className="text-xs text-gray-500">Mahasiswa S2 Manajemen, UGM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#054E7A] py-14">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-[#47C2EA] text-sm font-semibold uppercase tracking-widest mb-3">Masih Ragu?</p>
          <h2 className="text-2xl font-bold text-white mb-4">Konsultasi Gratis Sebelum Mendaftar</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Ceritakan kebutuhan belajar Anda dan tim AJI akan merekomendasikan layanan yang paling tepat.
          </p>
          <a href={WA_LINK_PRIVATE} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#054E7A] font-bold px-8 py-3.5 rounded-xl transition-colors">
            <Zap className="w-4 h-4" />
            Hubungi via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

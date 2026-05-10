'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { programsApi } from '@/lib/api';
import { PROGRAMS } from '@/lib/config';
import { ProgramCard } from '@/components/program-card';
import { ProgramCardSkeleton } from '@/components/program-card-skeleton';
import { cn } from '@/lib/utils';
import type { Program } from '@/lib/types';

export function ProgramGridSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-3">5 Divisi Program</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Pilih Jalur Pengembangan Anda</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {PROGRAMS.map((prog) => (
            <Link key={prog.code} href={prog.href}
              {...(prog.href.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn(
                'group relative rounded-2xl p-6 text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl',
                prog.isFeatured && 'ring-2 ring-[#F0A500]/60'
              )}
              style={{ background: `linear-gradient(135deg, ${prog.color} 0%, ${prog.color}cc 100%)` }}
            >
              {prog.isFeatured && (
                <span className="absolute top-3 right-3 text-[10px] bg-[#F0A500] text-[#162058] font-bold px-2 py-0.5 rounded-full">Unggulan</span>
              )}
              <p className="font-black text-xl mb-1 mt-2">{prog.name}</p>
              <p className="text-white/70 text-xs mb-4 leading-relaxed">{prog.desc}</p>
              <div className="flex flex-wrap gap-1">
                {prog.topics.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full">{t}</span>
                ))}
                {prog.topics.length > 3 && (
                  <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full">+{prog.topics.length - 3}</span>
                )}
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { PromoCard } from '@/components/promo-card';

export function FeaturedPrograms() {
  const { data: featuredData, isLoading } = useQuery({
    queryKey: ['programs', 'featured', 'homepage'],
    queryFn: () => programsApi.list({ featured: true }).then((r) => r.data?.data ?? r.data),
  });

  // Ambil maksimal 3 program unggulan
  const featuredPrograms = Array.isArray(featuredData) ? featuredData.slice(0, 3) : [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-1 bg-[#F0A500] rounded-full"></span>
              <span className="text-[#2348A8] text-sm font-bold uppercase tracking-widest">Program Pilihan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Layanan Spesial Kami</h2>
            <p className="text-gray-500 text-base md:text-lg">Daftar layanan utama kami yang dirancang khusus untuk memenuhi kebutuhan riset dan metodologi Anda secara profesional.</p>
          </div>
          <a href="/bootcamp" className="hidden sm:inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#1B3A8C] text-[#1B3A8C] hover:bg-[#1B3A8C] hover:text-white font-bold rounded-xl transition-all duration-300">
            Lihat Semua Program <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <ProgramCardSkeleton key={i} />)
            : featuredPrograms.map((p) => <PromoCard key={p.id} program={p as Program} />)
          }
        </div>
      </div>
    </section>
  );
}
